"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader } from "lucide-react";

type UploadStatus = "idle" | "ready" | "uploading" | "success" | "error";

interface SelectedFile {
  name: string;
  size: number;
  type: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export default function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<SelectedFile | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (f: File): string | null => {
    if (!f.name.endsWith(".csv")) return "Only CSV files are accepted.";
    if (f.size > 50 * 1024 * 1024) return "File size must be under 50 MB.";
    return null;
  };

  const handleFile = useCallback((f: File) => {
    const err = validateFile(f);
    if (err) {
      setErrorMessage(err);
      setStatus("error");
      setFile(null);
      return;
    }
    setFile({ name: f.name, size: f.size, type: f.type });
    setStatus("ready");
    setErrorMessage("");
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  };

  const handleUpload = () => {
    if (!file) return;
    setStatus("uploading");
    // Simulated upload — will be replaced with real API call
    setTimeout(() => {
      setStatus("success");
    }, 2200);
  };

  const handleReset = () => {
    setFile(null);
    setStatus("idle");
    setErrorMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const isDropZoneActive = status === "idle" || status === "error";

  return (
    <div style={{ maxWidth: "640px" }}>
      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); if (isDropZoneActive) setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => isDropZoneActive && fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${
            isDragging
              ? "var(--color-primary)"
              : status === "error"
              ? "var(--color-danger)"
              : status === "success"
              ? "var(--color-success)"
              : "var(--color-border)"
          }`,
          borderRadius: "var(--radius-xl)",
          padding: "56px 40px",
          textAlign: "center",
          background: isDragging
            ? "var(--color-primary-light)"
            : status === "success"
            ? "var(--color-success-light)"
            : "var(--color-surface)",
          cursor: isDropZoneActive ? "pointer" : "default",
          transition: "all 0.18s ease",
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={onFileChange}
          style={{ display: "none" }}
        />

        {/* Idle state */}
        {(status === "idle" || isDragging) && (
          <>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: isDragging ? "var(--color-primary)" : "var(--color-primary-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                transition: "all 0.18s ease",
              }}
            >
              <Upload
                size={24}
                color={isDragging ? "#fff" : "var(--color-primary)"}
                strokeWidth={1.8}
              />
            </div>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: isDragging ? "var(--color-primary)" : "var(--color-text)",
                margin: "0 0 8px",
              }}
            >
              {isDragging ? "Release to upload" : "Drop your CSV file here"}
            </p>
            <p style={{ fontSize: "13px", color: "var(--color-muted)", margin: "0 0 20px" }}>
              or click to browse — CSV only, max 50 MB
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 20px",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--color-muted)",
                background: "var(--color-bg)",
              }}
            >
              <FileText size={14} />
              Choose file
            </div>
          </>
        )}

        {/* Ready state */}
        {status === "ready" && file && (
          <>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "var(--color-primary-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <FileText size={24} color="var(--color-primary)" strokeWidth={1.8} />
            </div>
            <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text)", margin: "0 0 4px" }}>
              {file.name}
            </p>
            <p style={{ fontSize: "13px", color: "var(--color-muted)", margin: "0 0 4px" }}>
              {formatBytes(file.size)}
            </p>
            <p style={{ fontSize: "12px", color: "var(--color-primary)", fontWeight: 500, margin: 0 }}>
              Ready to validate
            </p>
          </>
        )}

        {/* Uploading state */}
        {status === "uploading" && (
          <>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "var(--color-primary-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                animation: "spin 1s linear infinite",
              }}
            >
              <Loader size={24} color="var(--color-primary)" strokeWidth={1.8} />
            </div>
            <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text)", margin: "0 0 4px" }}>
              Validating…
            </p>
            <p style={{ fontSize: "13px", color: "var(--color-muted)", margin: 0 }}>
              Processing {file?.name}
            </p>
          </>
        )}

        {/* Success state */}
        {status === "success" && (
          <>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "var(--color-success-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <CheckCircle size={24} color="var(--color-success)" strokeWidth={1.8} />
            </div>
            <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-success)", margin: "0 0 4px" }}>
              Validation complete
            </p>
            <p style={{ fontSize: "13px", color: "var(--color-muted)", margin: 0 }}>
              {file?.name} has been processed
            </p>
          </>
        )}

        {/* Error state */}
        {status === "error" && (
          <>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "var(--color-danger-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <AlertCircle size={24} color="var(--color-danger)" strokeWidth={1.8} />
            </div>
            <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-danger)", margin: "0 0 4px" }}>
              File not accepted
            </p>
            <p style={{ fontSize: "13px", color: "var(--color-muted)", margin: "0 0 4px" }}>
              {errorMessage}
            </p>
            <p style={{ fontSize: "12px", color: "var(--color-primary)", fontWeight: 500 }}>
              Click to try again
            </p>
          </>
        )}
      </div>

      {/* Action bar */}
      {(status === "ready" || status === "success" || status === "uploading") && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          {status === "ready" && (
            <button
              onClick={handleUpload}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                background: "var(--color-primary)",
                color: "#fff",
                border: "none",
                borderRadius: "9px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "var(--color-primary-dark)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "var(--color-primary)")
              }
            >
              <Upload size={15} />
              Validate File
            </button>
          )}

          {status === "uploading" && (
            <div
              style={{
                padding: "10px 24px",
                background: "var(--color-primary-light)",
                color: "var(--color-primary)",
                border: "none",
                borderRadius: "9px",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Processing…
            </div>
          )}

          {status === "success" && (
            <a
              href="/results"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                background: "var(--color-primary)",
                color: "#fff",
                border: "none",
                borderRadius: "9px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              View Results →
            </a>
          )}

          <button
            onClick={handleReset}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 16px",
              background: "transparent",
              color: "var(--color-muted)",
              border: "1px solid var(--color-border)",
              borderRadius: "9px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-danger)";
              el.style.color = "var(--color-danger)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-border)";
              el.style.color = "var(--color-muted)";
            }}
          >
            <X size={14} />
            Clear
          </button>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
