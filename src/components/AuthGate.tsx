"use client";

import { useState, useEffect, useRef } from "react";

const ACCESS_PIN = process.env.NEXT_PUBLIC_ACCESS_PIN || "1234";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Check if already authenticated via sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem("pj_auth");
    if (stored === "true") {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const newPin = [...pin];
    newPin[index] = digit;
    setPin(newPin);
    setError(false);

    // Auto-focus next input
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 4 digits entered
    if (digit && index === 3) {
      const fullPin = newPin.join("");
      if (fullPin.length === 4) {
        if (fullPin === ACCESS_PIN) {
          sessionStorage.setItem("pj_auth", "true");
          setAuthenticated(true);
        } else {
          setError(true);
          setPin(["", "", "", ""]);
          setTimeout(() => inputRefs.current[0]?.focus(), 100);
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    if (pasted.length === 4) {
      const newPin = pasted.split("");
      setPin(newPin);
      if (pasted === ACCESS_PIN) {
        sessionStorage.setItem("pj_auth", "true");
        setAuthenticated(true);
      } else {
        setError(true);
        setPin(["", "", "", ""]);
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      }
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
          {/* Lock icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-600/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>

          <h1 className="text-xl font-bold text-white mb-2">Pascal Judge</h1>
          <p className="text-gray-400 text-sm mb-6">
            Introdu codul PIN de 4 cifre pentru a accesa platforma.
          </p>

          {/* PIN inputs */}
          <div className="flex justify-center gap-3 mb-4" onPaste={handlePaste}>
            {pin.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                autoFocus={i === 0}
                className={`w-14 h-16 text-center text-2xl font-bold rounded-xl border-2 bg-gray-950 text-white focus:outline-none transition-colors ${
                  error
                    ? "border-red-500 animate-shake"
                    : "border-gray-700 focus:border-blue-500"
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-400 text-sm animate-pulse">
              Cod PIN incorect. Încearcă din nou.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
