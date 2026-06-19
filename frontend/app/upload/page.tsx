"use client";

import PageShell from "@/components/PageShell";
import UploadZone from "@/components/UploadZone";
import { Info } from "lucide-react";

const REQUIREMENTS = [
  "File must be in CSV format (.csv extension)",
  "Maximum file size: 50 MB",
  "Required columns: Transaction ID, Date, Amount, Currency, Sender, Receiver",
  "Date format: YYYY-MM-DD",
  "Amount must be a valid positive number",
  "Currency must be a 3-letter ISO code (e.g. USD, EUR, GBP)",
];

export default function UploadPage() {
  return (
    <PageShell>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "36px", alignItems: "start" }}>
        {/* Main upload area */}
        <div>
          <div style={{ marginBottom: "28px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--color-text)",
                letterSpacing: "-0.4px",
                margin: "0 0 8px",
              }}
            >
              Upload Transaction File
            </h2>
            <p style={{ fontSize: "14px", color: "var(--color-muted)", margin: 0, lineHeight: 1.6 }}>
              Submit a CSV file for validation. The system will identify valid and invalid records,
              then make them available for download.
            </p>
          </div>
          <UploadZone />
        </div>

        {/* Sidebar: requirements */}
        <div>
          <div
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "7px",
                  background: "var(--color-accent-gold-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Info size={14} color="var(--color-accent-gold)" />
              </div>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text)" }}>
                File Requirements
              </span>
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {REQUIREMENTS.map((req, i) => (
                <li
                  key={i}
                  style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--color-accent-gold)",
                      marginTop: "6px",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: "13px", color: "var(--color-muted)", lineHeight: 1.5 }}>
                    {req}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Processing note */}
          <div
            style={{
              marginTop: "16px",
              padding: "16px 18px",
              background: "var(--color-primary-light)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "var(--color-primary)",
                margin: 0,
                lineHeight: 1.6,
                fontWeight: 450,
              }}
            >
              After validation, results are split into{" "}
              <strong style={{ fontWeight: 700 }}>clean</strong>,{" "}
              <strong style={{ fontWeight: 700 }}>invalid</strong>, and{" "}
              <strong style={{ fontWeight: 700 }}>chunked</strong> files available on the
              Downloads and Chunk Files pages.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
