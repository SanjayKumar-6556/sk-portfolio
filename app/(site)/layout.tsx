/**
 * The shared shell for every visitor-facing route.
 *
 * This is the only place page top/bottom padding is declared, and the only
 * place `.shell` is applied. Pages return fragments; see
 * components/layout/shell.tsx for the rules.
 *
 * Must stay a Server Component — every page beneath it exports `metadata`,
 * which is Server-Component-only. Do not read cookies()/headers()/searchParams
 * anywhere below this layout: all 22 pages are statically rendered today.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="shell pt-14 pb-32 lg:pt-24">{children}</div>;
}
