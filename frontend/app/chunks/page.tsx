"use client";

import PageShell from "@/components/PageShell";
import FileCard from "@/components/FileCard";
import { Download, Layers } from "lucide-react";

const CHUNK_FILES = [
  { filename: "chunk_001.csv", size: "512 KB", generatedAt: "Jun 19, 2025 · 14:35", rowCount: 1000 },
  { filename: "chunk_002.csv", size: "511 KB", generatedAt: "Jun 19, 2025 · 14:35", rowCount: 1000 },
  { filename: "chunk_003.csv", size: "509 KB", generatedAt: "Jun 19, 2025 · 14:35", rowCount: 1000 },
  { filename: "chunk_004.csv", size: "508 KB", generatedAt: "Jun 19, 2025 · 14:35", rowCount: 1000 },
  { filename: "chunk_005.csv", size: "362 KB", generatedAt: "Jun 19, 2025 · 14:35", rowCount: 820 },
];

export default function ChunksPage() {
  return (
    <PageShell>
      {/* Info banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "18px 22px",
          background: "var(--color-primary-light)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "9px",
            background: "var(--color-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Layers size={17} color="#fff" strokeWidth={1.8} />
        </div>
        <div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text)", marginBottom: "2px" }}>
            Chunked output — {CHUNK_FILES.length} files
          </div>
          <div style={{ fontSize: "12px", color: "var(--color-muted)", lineHeight: 1.5 }}>
            Valid records were split into segments of 1,000 rows each for easier handling. Download
            individual chunks or all files at once.
          </div>
        </div>
      </div>

      {/* Summary row */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          marginBottom: "28px",
          padding: "0 4px",
        }}
      >
        {[
          { label: "Total Chunks", value: CHUNK_FILES.length.toString() },
          {
            label: "Total Rows",
            value: CHUNK_FILES.reduce((a, f) => a + f.rowCount, 0).toLocaleString(),
          },
          { label: "Total Size", value: "2.4 MB" },
          { label: "Chunk Size", value: "1,000 rows" },
        ].map((stat) => (
          <div key={stat.label}>
            <div
              className="tabular-nums"
              style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-text)", letterSpacing: "-0.5px" }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: "11px", color: "var(--color-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.3px", marginTop: "2px" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Chunk cards */}
      <section style={{ marginBottom: "32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "18px" }}>
          {CHUNK_FILES.map((chunk, i) => (
            <FileCard
              key={chunk.filename}
              filename={chunk.filename}
              description={`Rows ${(i * 1000 + 1).toLocaleString()}–${(i * 1000 + chunk.rowCount).toLocaleString()} from the validated clean dataset.`}
              size={chunk.size}
              generatedAt={chunk.generatedAt}
              rowCount={chunk.rowCount}
              variant="chunk"
              chunkIndex={i + 1}
              downloadUrl="#"
            />
          ))}
        </div>
      </section>

      {/* Download all */}
      <div
        style={{
          padding: "22px 26px",
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
            Download all chunks
          </div>
          <div style={{ fontSize: "13px", color: "var(--color-muted)" }}>
            All {CHUNK_FILES.length} chunk files bundled as a ZIP — 2.4 MB
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
          Download All as ZIP
        </a>
      </div>
    </PageShell>
  );
}
