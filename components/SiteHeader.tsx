import Link from "@/components/SafeLink";

const links = [
  ["Story", "/story"],
  ["Map", "/map"],
  ["Timeline", "/timeline"],
  ["Explore", "/explore"],
  ["Evidence", "/evidence"],
  ["Paths", "/perspectives"],
  ["Edition", "/edition"],
  ["Baltimore", "/baltimore"],
  ["Maryland", "/maryland"],
  ["Sources", "/sources"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="1812: The Whole Story home">
          <span className="wordmark-year">1812</span>
          <span className="wordmark-name">The Whole Story</span>
        </Link>
        <nav aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <details className="mobile-nav">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="footer-mark" href="/">1812 <span>The Whole Story</span></Link>
        <p>An independent public-history project built to make the war—and the evidence beneath it—easier to follow.</p>
      </div>
      <div className="footer-links">
        <Link href="/about">About</Link>
        <Link href="/sources">Sources &amp; research guide</Link>
        <Link href="/data">Open data</Link>
        <Link href="/edition">Documentary edition</Link>
        <Link href="/evidence">Evidence laboratory</Link>
        <Link href="/perspectives">Perspective pathways</Link>
        <Link href="/five-minutes">The war in five minutes</Link>
        <Link href="/twenty-minutes">The war in twenty minutes</Link>
        <Link href="/backyard">Maryland field guide</Link>
        <Link href="/baltimore">Baltimore, 1812–1814</Link>
      </div>
    </footer>
  );
}
