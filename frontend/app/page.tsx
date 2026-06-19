"use client";

import PageShell from "@/components/PageShell";
import StatCard from "@/components/StatCard";
import { Rows3, CheckCircle, XCircle, TrendingUp, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const RECENT_FILES = [
  { name: "transactions_june_batch1.csv", date: "Jun 19, 2025 · 14:32", status: "completed", valid: 4820, invalid: 180 },
  { name: "transactions_june_batch2.csv", date: "Jun 18, 2025 · 09:14", status: "completed", valid: 3991, invalid: 9 },
  { name: "transactions_may_final.csv", date: "May 31, 2025 · 22:05", status: "completed", valid: 7200, invalid: 300 },
];

export default function DashboardPage() {
  return (
    <PageShell>
      {/* Stat Cards */}
      <section style={{ marginBottom: "40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <StatCard
            label="Total Rows"
            value="16,500"
            subtext="Across 3 processed files"
            icon={Rows3}
            variant="default"
            accent
          />
          <StatCard
            label="Valid Rows"
            value="16,011"
            subtext="Passed all validation checks"
            icon={CheckCircle}
            variant="success"
            accent
          />
          <StatCard
            label="Invalid Rows"
            value="489"
            subtext="Flagged with errors"
            icon={XCircle}
            variant="danger"
            accent
          />
          <StatCard
            label="Success Rate"
            value="97.0%"
            subtext="Last 3 batches average"
            icon={TrendingUp}
            variant="gold"
            accent
          />
        </div>
      </section>

      {/* Recent activity */}
      <section style={{ marginBottom: "40px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <h2
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "var(--color-text)",
              margin: 0,
              letterSpacing: "-0.2px",
            }}
          >
            Recent Validations
          </h2>
          <Link
            href="/results"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--color-primary)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            View all results <ArrowRight size={13} />
          </Link>
        </div>

        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {RECENT_FILES.map((file, i) => (
            <div
              key={file.name}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "18px 24px",
                borderBottom: i < RECENT_FILES.length - 1 ? "1px solid var(--color-border)" : "none",
                gap: "16px",
                transition: "background 0.12s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--color-bg)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {/* File icon */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "9px",
                  background: "var(--color-primary-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Clock size={15} color="var(--color-primary)" />
              </div>

              {/* File info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--color-text)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontFamily: "monospace",
                    marginBottom: "3px",
                  }}
                >
                  {file.name}
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-muted)" }}>
                  {file.date}
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: "24px", flexShrink: 0 }}>
                <div style={{ textAlign: "right" }}>
                  <div
                    className="tabular-nums"
                    style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-success)" }}
                  >
                    {file.valid.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "10px", color: "var(--color-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.3px" }}>
                    Valid
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    className="tabular-nums"
                    style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-danger)" }}
                  >
                    {file.invalid.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "10px", color: "var(--color-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.3px" }}>
                    Invalid
                  </div>
                </div>
              </div>

              {/* Status badge */}
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 600,
                  background: "var(--color-success-light)",
                  color: "var(--color-success)",
                  flexShrink: 0,
                }}
              >
                Completed
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "var(--color-text)",
            margin: "0 0 16px",
            letterSpacing: "-0.2px",
          }}
        >
          Quick Actions
        </h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link
            href="/upload"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 22px",
              background: "var(--color-primary)",
              color: "#fff",
              borderRadius: "9px",
              fontSize: "14px",
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
            Upload New File
          </Link>
          <Link
            href="/downloads"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 22px",
              background: "var(--color-surface)",
              color: "var(--color-text)",
              borderRadius: "9px",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              border: "1px solid var(--color-border)",
              transition: "border-color 0.15s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)")
            }
          >
            Go to Downloads
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
