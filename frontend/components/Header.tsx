"use client";

import { usePathname } from "next/navigation";
import { CalendarDays } from "lucide-react";

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Dashboard",
    description: "Overview of your validation activity",
  },
  "/upload": {
    title: "Upload CSV",
    description: "Submit a transaction file for validation",
  },
  "/results": {
    title: "Validation Results",
    description: "Review valid and invalid transaction records",
  },
  "/downloads": {
    title: "Downloads",
    description: "Export processed CSV files",
  },
  "/chunks": {
    title: "Chunk Files",
    description: "Access segmented output files",
  },
};

function getFormattedDate(): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

interface HeaderProps {
  actions?: React.ReactNode;
}

export default function Header({ actions }: HeaderProps) {
  const pathname = usePathname();
  const meta = PAGE_META[pathname] ?? { title: "Xeno", description: "" };

  return (
    <header
      style={{
        height: "72px",
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 36px",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Left: title + description */}
      <div>
        <h1
          style={{
            fontSize: "17px",
            fontWeight: 700,
            letterSpacing: "-0.3px",
            color: "var(--color-text)",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {meta.title}
        </h1>
        <p
          style={{
            fontSize: "12px",
            color: "var(--color-muted)",
            margin: "2px 0 0",
            fontWeight: 400,
          }}
        >
          {meta.description}
        </p>
      </div>

      {/* Right: date + custom actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            borderRadius: "8px",
            background: "var(--color-muted-light)",
            fontSize: "12px",
            fontWeight: 500,
            color: "var(--color-muted)",
          }}
        >
          <CalendarDays size={13} />
          {getFormattedDate()}
        </div>
        {actions && actions}
      </div>
    </header>
  );
}
