'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseVoiceCommand, executeCommand, getAvailableCommands } from '@/lib/voice-commands';

export default function VoiceCommandRecorder() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognized, setRecognized] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState(getAvailableCommands());
  
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    
    if (!SpeechRecognition) {
      setMessage('Voice recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setMessage('Listening... speak clearly');
      setTranscript('');
    };

    recognition.onresult = (event: any) => {
      let interim = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          setTranscript(transcript);
          
          // Parse and execute command
          setIsProcessing(true);
          const command = parseVoiceCommand(transcript);
          setRecognized(command);
          
          if (command.matched || command.action === 'search') {
            executeCommand(command, router).then(result => {
              setMessage(result.message);
              setIsProcessing(false);
              setTimeout(() => {
                setIsListening(false);
              }, 1000);
            });
          } else {
            setMessage(`Try saying: "${suggestions[Math.floor(Math.random() * suggestions.length)]}"`);
            setIsProcessing(false);
            setIsListening(false);
          }
        } else {
          interim += transcript;
        }
      }
      
      if (interim) {
        setTranscript(interim + '...');
      }
    };

    recognition.onerror = (event: any) => {
      setMessage(`Error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [router, suggestions]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.abort();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="rounded-lg border border-[var(--hairline)] bg-[var(--color-ink)]/60 p-6 backdrop-blur-sm">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="font-display text-2xl text-[var(--color-gold-bright)] mb-2">
            Voice Commands
          </h2>
          <p className="text-sm text-[var(--color-bone)]/70">
            Speak commands naturally. The app will listen, understand, and act instantly.
          </p>
        </div>

        {/* Microphone Button */}
        <div className="flex justify-center">
          <button
            onClick={toggleListening}
            disabled={isProcessing}
            className={`relative grid h-24 w-24 shrink-0 place-items-center rounded-full border-2 transition ${
              isListening
                ? 'border-[var(--color-gold)]/60 bg-[var(--color-gold)]/15'
                : 'border-[var(--hairline)] hover:border-[var(--color-gold)]/60'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {/* Pulse animation when listening */}
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-[var(--color-gold)] opacity-0 animate-ping" />
                <div className="absolute inset-2 rounded-full border border-[var(--color-gold)]/40" />
              </>
            )}
            
            {/* Microphone icon */}
            <span className="text-4xl">
              {isListening ? '🎤' : '🔊'}
            </span>
          </button>
        </div>

        {/* Status */}
        <div className="text-center">
          <div className="text-sm font-medium text-[var(--color-gold-bright)] mb-2 h-6">
            {isListening ? 'Listening...' : isProcessing ? 'Processing...' : 'Ready'}
          </div>
          
          {/* Transcript Display */}
          {transcript && (
            <div className="rounded-lg bg-[var(--color-obsidian)]/50 p-3 mb-4">
              <p className="text-sm italic text-[var(--color-bone)]/80">
                "{transcript}"
              </p>
            </div>
          )}

          {/* Message Display */}
          {message && (
            <div className={`rounded-lg p-3 text-sm ${
              recognized?.matched
                ? 'bg-emerald-950/30 border border-emerald-700/30 text-emerald-100/80'
                : 'bg-amber-950/30 border border-amber-700/30 text-amber-100/80'
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Command Recognition Info */}
        {recognized && (
          <div className="rounded-lg bg-[var(--color-obsidian)]/50 p-4 border border-[var(--hairline)]">
            <div className="text-xs uppercase tracking-wider text-[var(--color-gold)]/80 mb-2">
              Command Recognition
            </div>
            <div className="space-y-2 text-xs text-[var(--color-bone)]/70">
              <div className="flex justify-between items-center">
                <span>Matched:</span>
                <span className={`font-medium ${recognized.matched ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {recognized.matched ? '✓' : '○'} {recognized.action}
                </span>
              </div>
              {recognized.target && (
                <div className="flex justify-between items-center">
                  <span>Target:</span>
                  <span className="font-mono text-[var(--color-ivory)]">{recognized.target}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span>Confidence:</span>
                <span>{Math.round(recognized.confidence * 100)}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Suggestions */}
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--color-gold)]/80 mb-3">
            Try saying:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestions.slice(0, 6).map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => setTranscript(suggestion)}
                className="text-left text-xs px-3 py-2 rounded-lg border border-[var(--hairline)] hover:border-[var(--color-gold)]/40 text-[var(--color-bone)]/70 hover:text-[var(--color-gold-bright)] transition"
              >
                "{suggestion}"
              </button>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center text-xs text-[var(--color-bone)]/50 space-y-1">
          <p>Use natural language: ask, command, or guide the app with your voice</p>
          <p>Examples: "Search for Kali", "Open japa timer", "Show locations"</p>
        </div>
      </div>
    </div>
  );
}
