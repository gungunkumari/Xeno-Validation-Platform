import React from "react";

type Variant = "default" | "success" | "danger" | "warning" | "gold";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ElementType;
  variant?: Variant;
  accent?: boolean;
}

const VARIANT_STYLES: Record<
  Variant,
  { iconBg: string; iconColor: string; valueColor: string; borderTop: string }
> = {
  default: {
    iconBg: "var(--color-primary-light)",
    iconColor: "var(--color-primary)",
    valueColor: "var(--color-text)",
    borderTop: "var(--color-primary)",
  },
  success: {
    iconBg: "var(--color-success-light)",
    iconColor: "var(--color-success)",
    valueColor: "var(--color-success)",
    borderTop: "var(--color-success)",
  },
  danger: {
    iconBg: "var(--color-danger-light)",
    iconColor: "var(--color-danger)",
    valueColor: "var(--color-danger)",
    borderTop: "var(--color-danger)",
  },
  warning: {
    iconBg: "var(--color-warning-light)",
    iconColor: "var(--color-warning)",
    valueColor: "var(--color-warning)",
    borderTop: "var(--color-warning)",
  },
  gold: {
    iconBg: "var(--color-accent-gold-light)",
    iconColor: "var(--color-accent-gold)",
    valueColor: "var(--color-accent-gold)",
    borderTop: "var(--color-accent-gold)",
  },
};

export default function StatCard({
  label,
  value,
  subtext,
  icon: Icon,
  variant = "default",
  accent = false,
}: StatCardProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "var(--shadow-card)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        cursor: "default",
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
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "24px",
          right: "24px",
          height: "2px",
          background: styles.borderTop,
          borderRadius: "0 0 2px 2px",
          opacity: accent ? 1 : 0.35,
        }}
      />

      {/* Subtle shimmer background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "120px",
          height: "120px",
          background: `radial-gradient(circle at 80% 20%, ${styles.iconBg} 0%, transparent 70%)`,
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />

      <div style={{ position: "relative" }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.4px",
              textTransform: "uppercase",
              color: "var(--color-muted)",
            }}
          >
            {label}
          </span>
          {Icon && (
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "9px",
                background: styles.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={16} color={styles.iconColor} strokeWidth={2} />
            </div>
          )}
        </div>

        {/* Value */}
        <div
          className="tabular-nums"
          style={{
            fontSize: "32px",
            fontWeight: 700,
            letterSpacing: "-1px",
            color: styles.valueColor,
            lineHeight: 1,
            marginBottom: subtext ? "8px" : 0,
          }}
        >
          {value}
        </div>

        {/* Subtext */}
        {subtext && (
          <div
            style={{
              fontSize: "12px",
              color: "var(--color-muted)",
              fontWeight: 450,
            }}
          >
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
}
