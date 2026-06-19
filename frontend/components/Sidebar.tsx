"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  ClipboardList,
  Download,
  Layers,
  Zap,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Upload CSV", href: "/upload", icon: Upload },
  { label: "Validation Results", href: "/results", icon: ClipboardList },
  { label: "Downloads", href: "/downloads", icon: Download },
  { label: "Chunk Files", href: "/chunks", icon: Layers },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "var(--color-surface)",
        borderRight: "1px solid var(--color-border)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 40,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "28px 24px 24px",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              background: "var(--color-primary)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Zap size={16} color="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "-0.3px",
                color: "var(--color-text)",
                lineHeight: 1,
              }}
            >
              Xeno
            </div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "var(--color-muted)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginTop: "2px",
              }}
            >
              Validation Platform
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "16px 12px", flex: 1 }}>
        <div
          style={{
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            padding: "0 12px",
            marginBottom: "8px",
          }}
        >
          Workspace
        </div>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "2px" }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "9px 12px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: isActive ? 600 : 450,
                    color: isActive ? "var(--color-primary)" : "var(--color-muted)",
                    background: isActive ? "var(--color-primary-light)" : "transparent",
                    borderLeft: isActive
                      ? "2px solid var(--color-primary)"
                      : "2px solid transparent",
                    transition: "all 0.15s ease",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = "var(--color-muted-light)";
                      (e.currentTarget as HTMLElement).style.color = "var(--color-text)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--color-muted)";
                    }
                  }}
                >
                  <Icon
                    size={16}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    style={{ flexShrink: 0 }}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "16px 24px",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            color: "var(--color-muted)",
            lineHeight: 1.5,
          }}
        >
          <span style={{ fontWeight: 600 }}>Xeno</span> v1.0.0
          <br />
          Transaction Validator
        </div>
      </div>
    </aside>
  );
}
