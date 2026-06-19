"use client";

import PageShell from "@/components/PageShell";
import FileCard from "@/components/FileCard";
import { Download } from "lucide-react";

export default function DownloadsPage() {
  return (
    <PageShell>
      <div style={{ marginBottom: "28px" }}>
        <p style={{ fontSize: "14px", color: "var(--color-muted)", margin: 0, lineHeight: 1.6, maxWidth: "560px" }}>
          Download the processed output files from your most recent validation run. The clean file
          contains all valid records; the invalid file contains flagged entries with error annotations.
        </p>
      </div>

      {/* Section: Output files */}
      <section style={{ marginBottom: "40px" }}>
        <h2
          style={{
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            margin: "0 0 16px",
          }}
        >
          Processed Output
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          <FileCard
            filename="transactions_clean.csv"
            description="All records that passed every validation check. Ready for downstream processing or import into your system."
            size="2.4 MB"
            generatedAt="Jun 19, 2025 · 14:35"
            rowCount={4820}
            variant="clean"
            downloadUrl="http://127.0.0.1:8000/transactions/download/valid"
          />
          <FileCard
            filename="transactions_invalid.csv"
            description="Records that failed one or more validation rules. Each row includes an appended error reason column."
            size="48 KB"
            generatedAt="Jun 19, 2025 · 14:35"
            rowCount={180}
            variant="invalid"
            downloadUrl="http://127.0.0.1:8000/transactions/download/invalid"
          />
        </div>
      </section>

      {/* Download all button */}
      <div
        style={{
          padding: "24px 28px",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "var(--shadow-card)",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-text)", marginBottom: "4px" }}>
            Download all outputs
          </div>
          <div style={{ fontSize: "13px", color: "var(--color-muted)" }}>
            Both files bundled as a single ZIP archive — 2.45 MB
          </div>
        </div>
        <a
          href="#"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 22px",
            background: "var(--color-primary)",
            color: "#fff",
            borderRadius: "9px",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
            transition: "background 0.15s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "var(--color-primary-dark)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "var(--color-primary)")
          }
        >
          <Download size={14} strokeWidth={2.2} />
          Download ZIP
        </a>
      </div>
    </PageShell>
  );
}
