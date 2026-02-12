import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CIPHER Agents — Production-Ready Healthcare AI",
  description:
    "HIPAA-compliant AI agents for patient intake, scheduling, insurance verification, and revenue cycle management. Full source code included.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void text-text-primary antialiased">{children}</body>
    </html>
  );
}
