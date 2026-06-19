"use client";

import { Download, FileText, Clock, HardDrive } from "lucide-react";

interface FileCardProps {
  filename: string;
  description: string;
  size: string;
  generatedAt: string;
  rowCount?: number;
  variant?: "clean" | "invalid" | "chunk";
  downloadUrl?: string;
  chunkIndex?: number;
}

const VARIANT_CONFIG = {
  clean: {
    accent: "var(--color-success)",
    accentLight: "var(--color-success-light)",
    label: "Clean",
    labelColor: "var(--color-success)",
  },
  invalid: {
    accent: "var(--color-danger)",
    accentLight: "var(--color-danger-light)",
    label: "Invalid",
    labelColor: "var(--color-danger)",
  },
  chunk: {
    accent: "var(--color-primary)",
    accentLight: "var(--color-primary-light)",
    label: "Chunk",
    labelColor: "var(--color-primary)",
  },
};

export default function FileCard({
  filename,
  description,
  size,
  generatedAt,
  rowCount,
  variant = "chunk",
  downloadUrl = "#",
  chunkIndex,
}: FileCardProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "0",
        overflow: "hidden",
        boxShadow: "var(--shadow-card)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "var(--shadow-elevated)";
        el.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "var(--shadow-card)";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: "3px", background: config.accent }} />

      <div style={{ padding: "22px 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: config.accentLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FileText size={18} color={config.accent} strokeWidth={1.8} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    color: config.labelColor,
                    background: config.accentLight,
                    padding: "2px 7px",
                    borderRadius: "4px",
                  }}
                >
                  {config.label}
                  {chunkIndex !== undefined && ` #${chunkIndex}`}
                </span>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--color-text)",
                  margin: "5px 0 0",
                  fontFamily: "monospace",
                  letterSpacing: "-0.2px",
                }}
              >
                {filename}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: "13px", color: "var(--color-muted)", margin: "0 0 20px", lineHeight: 1.5 }}>
          {description}
        </p>

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--color-muted)" }}>
            <HardDrive size={12} />
            <span>{size}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--color-muted)" }}>
            <Clock size={12} />
            <span>{generatedAt}</span>
          </div>
          {rowCount !== undefined && (
            <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
              <span className="tabular-nums" style={{ fontWeight: 600, color: "var(--color-text)" }}>
                {rowCount.toLocaleString()}
              </span>{" "}
              rows
            </div>
          )}
        </div>

        {/* Download button */}
        <a
          href={downloadUrl}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 20px",
            background: config.accentLight,
            color: config.accent,
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
            border: `1px solid ${config.accent}22`,
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = config.accent;
            el.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = config.accentLight;
            el.style.color = config.accent;
          }}
        >
          <Download size={13} strokeWidth={2.2} />
          Download CSV
        </a>
      </div>
    </div>
  );
}
