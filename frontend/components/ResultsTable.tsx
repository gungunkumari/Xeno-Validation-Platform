"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

export interface TransactionRow {
  id: string;
  transactionId: string;
  date: string;
  amount: string;
  currency: string;
  sender: string;
  receiver: string;
  status: "valid" | "invalid";
  errorReason?: string;
}

interface ResultsTableProps {
  rows: TransactionRow[];
  mode: "valid" | "invalid";
}

type SortKey = "transactionId" | "date" | "amount" | "sender" | "receiver";
type ColKey = SortKey | "currency" | "errorReason";
type SortDir = "asc" | "desc" | null;

const SORTABLE_KEYS: ColKey[] = ["transactionId", "date", "amount", "sender", "receiver"];

const COLUMNS: { key: ColKey; label: string; sortable: boolean; width?: string }[] = [
  { key: "transactionId", label: "Transaction ID", sortable: true, width: "160px" },
  { key: "date", label: "Date", sortable: true, width: "120px" },
  { key: "amount", label: "Amount", sortable: true, width: "120px" },
  { key: "currency", label: "Currency", sortable: false, width: "80px" },
  { key: "sender", label: "Sender", sortable: true },
  { key: "receiver", label: "Receiver", sortable: true },
];

const INVALID_COLUMNS: { key: ColKey; label: string; sortable: boolean; width?: string }[] = [
  ...COLUMNS,
  { key: "errorReason", label: "Error Reason", sortable: false },
];

export default function ResultsTable({ rows, mode }: ResultsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const columns = mode === "invalid" ? INVALID_COLUMNS : COLUMNS;

  const handleSort = (key: ColKey) => {
    if (!SORTABLE_KEYS.includes(key)) return;
    const sk = key as SortKey;
    if (sortKey === sk) {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") { setSortDir(null); setSortKey(null); }
      else setSortDir("asc");
    } else {
      setSortKey(sk);
      setSortDir("asc");
    }
  };

  const sorted = [...rows].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const va = a[sortKey] ?? "";
    const vb = b[sortKey] ?? "";
    const cmp = va < vb ? -1 : va > vb ? 1 : 0;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const SortIcon = ({ col }: { col: ColKey }) => {
    if (sortKey !== col) return <ChevronsUpDown size={12} strokeWidth={1.5} style={{ opacity: 0.3 }} />;
    if (sortDir === "asc") return <ChevronUp size={12} strokeWidth={2} />;
    return <ChevronDown size={12} strokeWidth={2} />;
  };

  if (rows.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "64px 24px",
          color: "var(--color-muted)",
          background: "var(--color-surface)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border)",
        }}
      >
        <p style={{ fontSize: "14px", margin: 0 }}>No {mode} records found</p>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-bg)" }}>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => col.sortable && handleSort(col.key)}
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontWeight: 600,
                      fontSize: "11px",
                      letterSpacing: "0.4px",
                      textTransform: "uppercase",
                      color: "var(--color-muted)",
                      width: col.width,
                      cursor: col.sortable ? "pointer" : "default",
                      userSelect: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      {col.label}
                      {col.sortable && <SortIcon col={col.key} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((row, i) => (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: i < paginated.length - 1 ? "1px solid var(--color-border)" : "none",
                    transition: "background 0.1s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--color-bg)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <td
                    style={{ padding: "13px 16px", fontFamily: "monospace", fontSize: "12px", color: "var(--color-primary)", fontWeight: 500 }}
                    className="tabular-nums"
                  >
                    {row.transactionId || <span style={{ color: "var(--color-danger)", fontSize: "11px" }}>— missing —</span>}
                  </td>
                  <td style={{ padding: "13px 16px", color: "var(--color-muted)", whiteSpace: "nowrap" }} className="tabular-nums">
                    {row.date}
                  </td>
                  <td style={{ padding: "13px 16px", fontWeight: 600, color: "var(--color-text)" }} className="tabular-nums">
                    {row.amount}
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        background: "var(--color-muted-light)",
                        color: "var(--color-muted)",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.3px",
                      }}
                    >
                      {row.currency}
                    </span>
                  </td>
                  <td style={{ padding: "13px 16px", color: "var(--color-text)" }}>{row.sender || "—"}</td>
                  <td style={{ padding: "13px 16px", color: "var(--color-text)" }}>{row.receiver}</td>
                  {mode === "invalid" && (
                    <td style={{ padding: "13px 16px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 10px",
                          borderRadius: "5px",
                          background: "var(--color-danger-light)",
                          color: "var(--color-danger)",
                          fontSize: "11px",
                          fontWeight: 500,
                        }}
                      >
                        {row.errorReason}
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              borderTop: "1px solid var(--color-border)",
              background: "var(--color-bg)",
            }}
          >
            <span style={{ fontSize: "12px", color: "var(--color-muted)" }}>
              Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, rows.length)} of {rows.length} records
            </span>
            <div style={{ display: "flex", gap: "6px" }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "6px",
                    border: p === page ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                    background: p === page ? "var(--color-primary)" : "transparent",
                    color: p === page ? "#fff" : "var(--color-muted)",
                    fontSize: "12px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
