import type { Metadata } from "next";
import "./globals.css";
import { ValidationProvider } from "@/context/ValidationContext";

export const metadata: Metadata = {
  title: "Xeno — Transaction Validation Platform",
  description: "Validate, process, and manage transaction CSV data with precision.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ValidationProvider>
          {children}
        </ValidationProvider>
      </body>
    </html>
  );
}