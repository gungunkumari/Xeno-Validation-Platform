"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import StatCard from "@/components/StatCard";
import ResultsTable, { TransactionRow } from "@/components/ResultsTable";
import { CheckCircle, XCircle, Rows3 } from "lucide-react";
import { useValidation } from "@/context/ValidationContext";



type Tab = "valid" | "invalid";

export default function ResultsPage() {
const [activeTab, setActiveTab] = useState<Tab>("valid");
const { result } = useValidation();
const VALID_ROWS: TransactionRow[] =
  result?.valid_data?.map((row: any, index: number) => ({
    id: String(index),
    transactionId: row.customer_id || `VALID-${index}`,
    date: row.signup_date || "",
    amount: row.amount || "",
    currency: row.currency || "",
    sender: row.name || "",
    receiver: row.email || "",
    status: "valid",
  })) || [];

const INVALID_ROWS: TransactionRow[] =
  result?.errors?.map((item: any, index: number) => ({
    id: String(index),
    transactionId: item.data?.customer_id || `INVALID-${index}`,
    date: item.data?.signup_date || "",
    amount: item.data?.amount || "",
    currency: item.data?.currency || "",
    sender: item.data?.name || "",
    receiver: item.data?.email || "",
    status: "invalid",
    errorReason: item.errors?.join(", "),
  })) || [];

if (!result) {
  return (
    <PageShell>
      <h2>No validation results available</h2>
      <p>Please upload a CSV file first.</p>
    </PageShell>
  );
}
  return (
    <PageShell>
      {/* Summary cards */}
      <section style={{ marginBottom: "36px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
          <StatCard
            label="Total Processed"
            value={`${result.total_rows}`}
            subtext="Records in current batch"
            icon={Rows3}
            variant="default"
          />
          <StatCard
            label="Valid Records"
            value={`${result.valid_rows}`}
            subtext="Passed all checks"
            icon={CheckCircle}
            variant="success"
          />
          <StatCard
              label="Invalid Records"
              value={INVALID_ROWS.length.toString()}
              subtext="Require attention"
              icon={XCircle}
              variant="danger"
          />
        </div>
      </section>

      {/* Tab switcher */}
      <section>
        <div
          style={{
            display: "flex",
            gap: "4px",
            background: "var(--color-muted-light)",
            padding: "4px",
            borderRadius: "10px",
            width: "fit-content",
            marginBottom: "20px",
          }}
        >
          {(["valid", "invalid"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 20px",
                borderRadius: "7px",
                border: "none",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
                background: activeTab === tab ? "var(--color-surface)" : "transparent",
                color:
                  activeTab === tab
                    ? tab === "valid"
                      ? "var(--color-success)"
                      : "var(--color-danger)"
                    : "var(--color-muted)",
                boxShadow: activeTab === tab ? "var(--shadow-card)" : "none",
              }}
            >
              {tab === "valid"
  ? `✓ Valid (${VALID_ROWS.length})`
  : `✗ Invalid (${INVALID_ROWS.length})`}
            </button>
          ))}
        </div>

        <ResultsTable
          rows={activeTab === "valid" ? VALID_ROWS : INVALID_ROWS}
          mode={activeTab}
        />
      </section>
    </PageShell>
  );
}
