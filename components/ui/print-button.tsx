"use client";

/**
 * The résumé PDF is absent (public/resume/ is empty), so the Download button
 * hides itself. This page has a full print stylesheet — a print-only document
 * head with his name and contact line, and every token colour blackened for
 * paper — and nothing told anyone it existed.
 */
export function PrintButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      Print / Save as PDF
    </button>
  );
}
