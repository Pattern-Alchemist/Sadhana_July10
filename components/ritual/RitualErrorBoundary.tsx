"use client";

import React, { Component, ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUp } from "@/motion/variants";
import { durations, easings } from "@/motion/tokens";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

/**
 * RitualErrorBoundary
 * ====================
 * Catches errors in ritual workflows and displays a calm, recoverable error state.
 *
 * This is not a generic error boundary — it's specifically for ritual interactions.
 * It provides recovery UI (retry, return to home) without disrupting the broader app.
 */
export class RitualErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);

    // Log to console for debugging
    console.error("[Ritual Error]", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-screen flex items-center justify-center bg-background px-4"
          >
            <div className="max-w-md text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: durations.emphasis,
                  ease: easings.standard as any,
                }}
                className="mb-6"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⚠</span>
                </div>
              </motion.div>

              <h1 className="text-2xl font-serif mb-2 text-foreground">
                Ritual Paused
              </h1>
              <p className="text-foreground/70 mb-6">
                The ritual encountered an unexpected interruption. Your progress has been saved.
              </p>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mb-6 p-4 bg-background-secondary rounded border border-foreground/10 text-left">
                  <summary className="cursor-pointer text-sm font-mono text-foreground/50">
                    Debug Info
                  </summary>
                  <pre className="mt-2 text-xs overflow-auto text-foreground/40">
                    {this.state.error.message}
                  </pre>
                </details>
              )}

              <div className="flex gap-3 justify-center">
                <motion.button
                  onClick={this.handleReset}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90 transition-colors"
                >
                  Retry Ritual
                </motion.button>
                <motion.a
                  href="/"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 border border-foreground/20 rounded hover:border-foreground/40 transition-colors cursor-pointer"
                >
                  Return Home
                </motion.a>
              </div>
            </div>
          </motion.div>
        )
      );
    }

    return this.props.children;
  }
}

export default RitualErrorBoundary;
