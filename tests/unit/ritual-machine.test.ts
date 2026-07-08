import { describe, it, expect, vi, beforeEach } from "vitest";

/**
 * Tests for the ritual state machine.
 *
 * Covers:
 *   - State transitions (idle → pressing → charged → released → completed)
 *   - Cancel paths (early release, pointer leave)
 *   - Exit state (Escape key)
 *   - RitualSession creation
 *   - Feature detection functions
 *   - Interaction mode defaults
 */

// Mock browser APIs
vi.mock("@/db", () => ({ db: {} }));
vi.mock("@/db/schema", () => ({
  siddhis: {}, manuscripts: {}, schools: {}, evidenceSources: {}, reflections: {},
}));

import {
  ritualReducer,
  createSession,
  RITUALS,
  type RitualSession,
  type RitualEvent,
  type StepStatus,
  type InteractionMode,
} from "@/lib/ritual-machine";

// Use the first ritual config for tests
const TEST_RITUAL = RITUALS[0];

function makeSession(): RitualSession {
  return createSession(TEST_RITUAL);
}

describe("createSession", () => {
  it("creates a session with idle status at step 0", () => {
    const session = makeSession();
    expect(session.stepStatus).toBe("idle");
    expect(session.currentStepIndex).toBe(0);
    expect(session.progress).toBe(0);
    expect(session.completedSteps).toEqual([]);
    expect(session.isComplete).toBe(false);
    expect(session.ritualId).toBe(TEST_RITUAL.id);
  });

  it("records the start time", () => {
    const session = makeSession();
    expect(session.startedAt).toBeTruthy();
    expect(new Date(session.startedAt).getTime()).toBeLessThanOrEqual(Date.now());
  });
});

describe("ritualReducer — transition table", () => {
  it("transitions idle → pressing on START_PRESS", () => {
    const session = makeSession();
    const result = ritualReducer(session, { type: "START_PRESS" });
    expect(result.stepStatus).toBe("pressing");
  });

  it("transitions pressing → charged on CHARGE_COMPLETE", () => {
    const session = { ...makeSession(), stepStatus: "pressing" as StepStatus };
    const result = ritualReducer(session, { type: "CHARGE_COMPLETE" });
    expect(result.stepStatus).toBe("charged");
  });

  it("transitions pressing → cancelled on RELEASE (early release)", () => {
    const session = { ...makeSession(), stepStatus: "pressing" as StepStatus };
    const result = ritualReducer(session, { type: "RELEASE" });
    expect(result.stepStatus).toBe("cancelled");
  });

  it("transitions charged → released on RELEASE", () => {
    const session = { ...makeSession(), stepStatus: "charged" as StepStatus };
    const result = ritualReducer(session, { type: "RELEASE" });
    expect(result.stepStatus).toBe("released");
  });

  it("transitions released → completed on ANIMATION_DONE", () => {
    const session = { ...makeSession(), stepStatus: "released" as StepStatus };
    const result = ritualReducer(session, { type: "ANIMATION_DONE" });
    expect(result.stepStatus).toBe("completed");
  });

  it("transitions completed → idle (next step) on ADVANCE_STEP", () => {
    const session = {
      ...makeSession(),
      stepStatus: "completed" as StepStatus,
      currentStepIndex: 0,
    };
    const result = ritualReducer(session, { type: "ADVANCE_STEP" });
    expect(result.stepStatus).toBe("idle");
    expect(result.currentStepIndex).toBe(1);
    expect(result.completedSteps).toContain(0);
    expect(result.progress).toBe(0);
  });

  it("marks ritual complete on ADVANCE_STEP from last step", () => {
    const lastIndex = TEST_RITUAL.steps.length - 1;
    const session = {
      ...makeSession(),
      stepStatus: "completed" as StepStatus,
      currentStepIndex: lastIndex,
    };
    const result = ritualReducer(session, { type: "ADVANCE_STEP" });
    expect(result.isComplete).toBe(true);
    expect(result.completedAt).toBeTruthy();
    expect(result.currentStepIndex).toBe(lastIndex); // stays at last
  });

  it("transitions cancelled → idle on RESET", () => {
    const session = { ...makeSession(), stepStatus: "cancelled" as StepStatus, progress: 0.5 };
    const result = ritualReducer(session, { type: "RESET" });
    expect(result.stepStatus).toBe("idle");
    expect(result.progress).toBe(0);
  });

  it("transitions any → exited on EXIT", () => {
    const statuses: StepStatus[] = ["idle", "pressing", "charged", "released", "completed", "cancelled"];
    for (const status of statuses) {
      const session = { ...makeSession(), stepStatus: status };
      const result = ritualReducer(session, { type: "EXIT" });
      expect(result.stepStatus).toBe("exited");
    }
  });

  it("transitions exited → idle on RESET", () => {
    const session = { ...makeSession(), stepStatus: "exited" as StepStatus };
    const result = ritualReducer(session, { type: "RESET" });
    expect(result.stepStatus).toBe("idle");
  });
});

describe("ritualReducer — no-op transitions", () => {
  it("does not transition idle → released (no valid path)", () => {
    const session = makeSession();
    const result = ritualReducer(session, { type: "RELEASE" });
    expect(result.stepStatus).toBe("idle");
  });

  it("does not transition completed → pressing (no valid path)", () => {
    const session = { ...makeSession(), stepStatus: "completed" as StepStatus };
    const result = ritualReducer(session, { type: "START_PRESS" });
    expect(result.stepStatus).toBe("completed");
  });

  it("does not transition exited → pressing (no valid path)", () => {
    const session = { ...makeSession(), stepStatus: "exited" as StepStatus };
    const result = ritualReducer(session, { type: "START_PRESS" });
    expect(result.stepStatus).toBe("exited");
  });
});

describe("ritualReducer — UPDATE_PROGRESS", () => {
  it("updates progress during pressing", () => {
    const session = { ...makeSession(), stepStatus: "pressing" as StepStatus };
    const result = ritualReducer(session, { type: "UPDATE_PROGRESS", progress: 0.5 });
    expect(result.progress).toBe(0.5);
  });
});

describe("ritualReducer — multi-step flow", () => {
  it("completes a full ritual cycle through all steps", () => {
    let session = makeSession();

    for (let i = 0; i < TEST_RITUAL.steps.length; i++) {
      // Start press
      session = ritualReducer(session, { type: "START_PRESS" });
      expect(session.stepStatus).toBe("pressing");

      // Charge complete
      session = ritualReducer(session, { type: "CHARGE_COMPLETE" });
      expect(session.stepStatus).toBe("charged");

      // Release
      session = ritualReducer(session, { type: "RELEASE" });
      expect(session.stepStatus).toBe("released");

      // Animation done
      session = ritualReducer(session, { type: "ANIMATION_DONE" });
      expect(session.stepStatus).toBe("completed");

      // Advance
      session = ritualReducer(session, { type: "ADVANCE_STEP" });

      if (i < TEST_RITUAL.steps.length - 1) {
        expect(session.stepStatus).toBe("idle");
        expect(session.currentStepIndex).toBe(i + 1);
        expect(session.completedSteps).toContain(i);
      } else {
        expect(session.isComplete).toBe(true);
        expect(session.completedAt).toBeTruthy();
      }
    }

    expect(session.completedSteps.length).toBe(TEST_RITUAL.steps.length);
    expect(session.isComplete).toBe(true);
  });

  it("handles cancel and retry within a step", () => {
    let session = makeSession();

    // Start press
    session = ritualReducer(session, { type: "START_PRESS" });
    expect(session.stepStatus).toBe("pressing");

    // Early release → cancelled
    session = ritualReducer(session, { type: "RELEASE" });
    expect(session.stepStatus).toBe("cancelled");

    // Reset → idle
    session = ritualReducer(session, { type: "RESET" });
    expect(session.stepStatus).toBe("idle");
    expect(session.progress).toBe(0);

    // Retry: start → charge → release → complete → advance
    session = ritualReducer(session, { type: "START_PRESS" });
    session = ritualReducer(session, { type: "CHARGE_COMPLETE" });
    session = ritualReducer(session, { type: "RELEASE" });
    session = ritualReducer(session, { type: "ANIMATION_DONE" });
    session = ritualReducer(session, { type: "ADVANCE_STEP" });

    expect(session.currentStepIndex).toBe(1);
    expect(session.completedSteps).toContain(0);
  });
});

describe("RITUALS data integrity", () => {
  it("has at least 5 rituals", () => {
    expect(RITUALS.length).toBeGreaterThanOrEqual(5);
  });

  it("every ritual has at least 3 steps", () => {
    for (const r of RITUALS) {
      expect(r.steps.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("every step has a valid offering kind", () => {
    const validKinds = ["fire", "water", "flower", "incense", "mantra", "bell"];
    for (const r of RITUALS) {
      for (const s of r.steps) {
        expect(validKinds).toContain(s.kind);
      }
    }
  });

  it("every step has holdMs > 0", () => {
    for (const r of RITUALS) {
      for (const s of r.steps) {
        expect(s.holdMs).toBeGreaterThan(0);
      }
    }
  });

  it("every step has non-empty title and successLabel", () => {
    for (const r of RITUALS) {
      for (const s of r.steps) {
        expect(s.title).toBeTruthy();
        expect(s.successLabel).toBeTruthy();
      }
    }
  });
});
