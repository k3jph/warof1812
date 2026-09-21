import type { Metadata } from "next";
import Link from "@/components/SafeLink";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="page-shell not-found-page">
      <header className="page-title">
        <p className="section-kicker">404</p>
        <h1>Page not found</h1>
        <p>The address does not match a public page in this edition. Use one of the main routes below to continue.</p>
      </header>
      <nav className="not-found-links" aria-label="Useful routes">
        <Link href="/">Homepage <span>→</span></Link>
        <Link href="/story">Story <span>→</span></Link>
        <Link href="/explore">Explore <span>→</span></Link>
        <Link href="/map">Map <span>→</span></Link>
      </nav>
    </main>
  );
}
