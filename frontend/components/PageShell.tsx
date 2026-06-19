import Sidebar from "./Sidebar";
import Header from "./Header";

interface PageShellProps {
  children: React.ReactNode;
  headerActions?: React.ReactNode;
}

export default function PageShell({ children, headerActions }: PageShellProps) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-bg)" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "240px", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header actions={headerActions} />
        <main style={{ flex: 1, padding: "36px", maxWidth: "1200px", width: "100%" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
