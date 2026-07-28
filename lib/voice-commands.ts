/**
 * Voice Command System
 *
 * Parses transcribed speech into actionable commands for the app.
 * Supports natural language patterns for common app actions.
 */

export interface RecognizedCommand {
  action: string;
  target?: string;
  params?: Record<string, any>;
  confidence: number;
  matched: boolean;
  originalText: string;
}

export interface CommandAction {
  name: string;
  patterns: RegExp[];
  handler: (match: RegExpMatchArray, text: string) => {
    action: string;
    target?: string;
    params?: Record<string, any>;
  };
}

/**
 * Define all recognizable commands
 */
const COMMAND_REGISTRY: CommandAction[] = [
  // Navigation commands
  {
    name: "navigate-archive",
    patterns: [
      /(?:go to|open|show|visit)?\s*(?:the\s+)?archive/i,
      /search\s+(?:the\s+)?archive/i,
      /browse\s+(?:the\s+)?siddhis/i,
    ],
    handler: () => ({
      action: "navigate",
      target: "/archive",
      params: { type: "archive" }
    })
  },

  // Search commands
  {
    name: "search-archive",
    patterns: [
      /search\s+(?:for\s+)?(.+?)(?:\s+in\s+(?:the\s+)?archive)?$/i,
      /find\s+(?:me\s+)?(.+?)(?:\s+in\s+(?:the\s+)?archive)?$/i,
      /what.*?(?:is|are)\s+(.+?)\?$/i,
    ],
    handler: (match: RegExpMatchArray) => ({
      action: "search",
      target: "/archive",
      params: { query: match[1]?.trim() || "" }
    })
  },

  // Siddhi/Practice commands
  {
    name: "random-siddhi",
    patterns: [
      /(?:show me|give me|recommend|pick|choose)\s+(?:a\s+)?(?:random|cosmic)\s+(?:siddhi|practice)/i,
      /let.*?(?:the universe|cosmos|fate)\s+(?:choose|decide)/i,
      /dice/i,
    ],
    handler: () => ({
      action: "action",
      target: "randomSiddhi",
    })
  },

  // Timer commands
  {
    name: "meditation-timer",
    patterns: [
      /(?:start|begin|open)\s+(?:a\s+)?(?:meditation|timer)(?:\s+for\s+(\d+)\s+(?:minutes|mins))?/i,
      /meditate(?:\s+for\s+(\d+)\s+(?:minutes|mins))?/i,
    ],
    handler: (match: RegExpMatchArray) => ({
      action: "navigate",
      target: "/timer",
      params: { duration: match[1] ? parseInt(match[1]) : 20 }
    })
  },

  // Japa commands
  {
    name: "japa-mala",
    patterns: [
      /(?:start|begin|open)\s+(?:japa|mala|count)/i,
      /(?:do|perform)\s+japa/i,
      /mantra\s+(?:recitation|chanting)/i,
    ],
    handler: () => ({
      action: "navigate",
      target: "/japa",
      params: { type: "japa" }
    })
  },

  // Breath work commands
  {
    name: "breath-work",
    patterns: [
      /(?:start|begin|open)\s+(?:breath|pranayama)/i,
      /breathwork/i,
      /breath\s+(?:practice|exercise|timer)/i,
    ],
    handler: () => ({
      action: "navigate",
      target: "/breath",
      params: { type: "pranayama" }
    })
  },

  // Journal commands
  {
    name: "journal",
    patterns: [
      /(?:open|start|begin)\s+(?:the\s+)?journal/i,
      /(?:record|log|write)\s+(?:my\s+)?(?:practice|experience|insight)/i,
    ],
    handler: () => ({
      action: "navigate",
      target: "/journal",
      params: { mode: "entry" }
    })
  },

  // Locations commands
  {
    name: "sacred-locations",
    patterns: [
      /(?:show|open|visit)\s+(?:sacred\s+)?locations/i,
      /where\s+(?:should I|can I)\s+(?:practice|meditate|study)/i,
      /pilgrimage\s+sites/i,
    ],
    handler: () => ({
      action: "navigate",
      target: "/locations",
    })
  },

  // Oracle commands
  {
    name: "oracle",
    patterns: [
      /(?:consult|ask)\s+(?:the\s+)?oracle/i,
      /card\s+(?:reading|draw)/i,
      /(?:draw|pick)\s+(?:a\s+)?(?:card|tarot)/i,
    ],
    handler: () => ({
      action: "navigate",
      target: "/oracle",
    })
  },

  // Recording commands
  {
    name: "recorder",
    patterns: [
      /(?:start|begin|open)\s+(?:the\s+)?(?:recorder|mantra\s+recorder)/i,
      /record\s+(?:a\s+)?mantra/i,
    ],
    handler: () => ({
      action: "navigate",
      target: "/recorder",
    })
  },

  // Glossary commands
  {
    name: "glossary",
    patterns: [
      /(?:open|show|check)\s+(?:the\s+)?glossary/i,
      /what.*?(?:does|do)\s+(.+?)\s+(?:mean|stand for)\?/i,
    ],
    handler: (match: RegExpMatchArray) => ({
      action: "navigate",
      target: "/glossary",
      params: { search: match[1]?.trim() || "" }
    })
  },

  // Home commands
  {
    name: "home",
    patterns: [
      /(?:go\s+)?home/i,
      /return\s+(?:to\s+)?(?:home|start)/i,
      /main\s+page/i,
    ],
    handler: () => ({
      action: "navigate",
      target: "/",
    })
  },

  // Learning commands
  {
    name: "learning-path",
    patterns: [
      /(?:start|begin|show)\s+(?:the\s+)?(?:learning\s+path|curriculum|course)/i,
      /(?:what\s+)?(?:should I|can I)\s+(?:learn|study|read)\s+(?:next|today)/i,
    ],
    handler: () => ({
      action: "navigate",
      target: "/curriculum",
    })
  },
];

/**
 * Parse transcribed text and recognize commands
 */
export function parseVoiceCommand(text: string): RecognizedCommand {
  const cleanText = text.trim().toLowerCase();

  for (const command of COMMAND_REGISTRY) {
    for (const pattern of command.patterns) {
      const match = cleanText.match(pattern);
      if (match) {
        const result = command.handler(match, cleanText);
        return {
          action: result.action,
          target: result.target,
          params: result.params,
          confidence: 0.95,
          matched: true,
          originalText: text,
        };
      }
    }
  }

  // Fuzzy matching for search-like intent
  if (text.length > 3 && !cleanText.match(/(go|open|show|navigate|start|begin)/i)) {
    return {
      action: "search",
      target: "/archive",
      params: { query: text },
      confidence: 0.6,
      matched: false,
      originalText: text,
    };
  }

  return {
    action: "unknown",
    confidence: 0,
    matched: false,
    originalText: text,
  };
}

/**
 * Execute a recognized command
 */
export async function executeCommand(
  command: RecognizedCommand,
  router: any
): Promise<{ success: boolean; message: string }> {
  if (!command.matched && command.action !== "search") {
    return {
      success: false,
      message: `I didn't understand. Try: "search for Kali", "open japa", "show locations"`,
    };
  }

  try {
    switch (command.action) {
      case "navigate":
        if (command.target) {
          router.push(command.target);
          return {
            success: true,
            message: `Navigating to ${command.target}...`,
          };
        }
        break;

      case "search":
        if (command.target && command.params?.query) {
          // Will navigate with search query
          router.push(`${command.target}?q=${encodeURIComponent(command.params.query)}`);
          return {
            success: true,
            message: `Searching for "${command.params.query}"...`,
          };
        }
        break;

      case "action":
        if (command.target === "randomSiddhi") {
          // Trigger dice roll by dispatching a custom event
          window.dispatchEvent(new CustomEvent("voice-command:random-siddhi"));
          return {
            success: true,
            message: "The cosmos is choosing for you...",
          };
        }
        break;

      default:
        return {
          success: false,
          message: "I couldn't execute that command.",
        };
    }

    return {
      success: false,
      message: "Command recognized but could not execute.",
    };
  } catch (error) {
    console.error("[v0] Command execution error:", error);
    return {
      success: false,
      message: "An error occurred while executing the command.",
    };
  }
}

/**
 * Get all available commands for help/suggestions
 */
export function getAvailableCommands(): string[] {
  return [
    "Search for [practice name]",
    "Open archive",
    "Show me a random practice",
    "Start meditation timer",
    "Begin japa",
    "Open breath work",
    "Start recording",
    "Show sacred locations",
    "Consult the oracle",
    "Open glossary",
    "Show learning path",
  ];
}
