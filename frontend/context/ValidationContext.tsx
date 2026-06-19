"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ValidationError {
  row: number;
  field?: string;
  message: string;
  data?: Record<string, unknown>;
}

export interface ValidationResult {
  total_rows: number;
  valid_rows: number;
  invalid_rows: number;
  valid_file: string;
  invalid_file: string;
  valid_data: Record<string, unknown>[];
  errors: ValidationError[];
}

interface ValidationContextValue {
  result: ValidationResult | null;
  setResult: (r: ValidationResult) => void;
  clearResult: () => void;
}

const ValidationContext = createContext<ValidationContextValue | null>(null);

const STORAGE_KEY = "xeno_validation_result";

export function ValidationProvider({ children }: { children: ReactNode }) {
  const [result, setResultState] = useState<ValidationResult | null>(null);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setResultState(JSON.parse(stored));
    } catch {
      // ignore corrupt storage
    }
  }, []);

  const setResult = (r: ValidationResult) => {
  console.log("RESULT =", r);

  setResultState(r);

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(r)
    );
  } catch {
    // ignore
  }
};

  const clearResult = () => {
    setResultState(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ValidationContext.Provider value={{ result, setResult, clearResult }}>
      {children}
    </ValidationContext.Provider>
  );
}

export function useValidation(): ValidationContextValue {
  const ctx = useContext(ValidationContext);
  if (!ctx) throw new Error("useValidation must be used inside <ValidationProvider>");
  return ctx;
}
