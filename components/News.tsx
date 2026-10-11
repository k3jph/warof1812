import Link from "@/components/SafeLink";
import { formatNewsDate, newsItems, type NewsItem } from "@/lib/news";
import styles from "./News.module.css";

export function NewsList({ items, compact = false }: { items: readonly NewsItem[]; compact?: boolean }) {
  const Heading = compact ? "h3" : "h2";
  return (
    <div className={styles.list} data-news-list={compact ? "recent" : "archive"}>
      {items.map((item) => {
        const headingId = `${compact ? "recent" : "news"}-${item.id}-title`;
        return (
          <article className={styles.item} id={compact ? undefined : item.id} key={item.id} data-news-id={item.id} aria-labelledby={headingId}>
            <div className={styles.dateline}>
              <span className={styles.dateLabel}>Published</span>
              <time dateTime={item.publishedAt}>{formatNewsDate(item.publishedAt)}</time>
              <span className={styles.category}>{item.category}</span>
              {!compact && <span className={styles.added}>Added <time dateTime={item.addedAt}>{formatNewsDate(item.addedAt)}</time></span>}
            </div>
            <div className={styles.copy}>
              <Heading id={headingId} className={styles.title}><a href={item.source.url}>{item.title}<span className={styles.externalArrow} aria-hidden="true"> ↗</span></a></Heading>
              <p className={styles.source}>{item.source.publisher}{item.source.author ? ` · ${item.source.author}` : ""}<span>{item.source.kind} · {item.source.access}</span></p>
              <p className={styles.summary}>{item.summary}</p>
              {!compact && <>
                <p className={styles.context}>{item.context}</p>
                {item.dateNote && <p className={styles.dateNote}>{item.dateNote}</p>}
              </>}
              <div className={styles.readLinks}>
                <a href={item.source.url} aria-label={`Read the original at ${item.source.publisher}: ${item.title}`}>Read the original <span aria-hidden="true">↗</span></a>
                {compact && <Link href={`/news#${item.id}`}>Context and related history <span aria-hidden="true">→</span></Link>}
              </div>
              {!compact && <>
                {item.furtherReading && <div className={styles.furtherReading}>{item.furtherReading.map((link) => <a key={link.href} href={link.href}>{link.label} <span aria-hidden="true">↗</span></a>)}</div>}
                <nav className={styles.related} aria-label={`Related history: ${item.title}`}><span>Explore the history</span>{item.related.map((link) => <Link key={link.href} href={link.href}>{link.label} <span aria-hidden="true">→</span></Link>)}</nav>
              </>}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function RecentNews() {
  if (newsItems.length === 0) return null;
  return (
    <section className={styles.home} aria-labelledby="recent-news-heading" data-recent-news>
      <div className={styles.inner}>
        <header className={styles.homeHeading}>
          <div><p className="section-kicker">News &amp; discoveries</p><h2 id="recent-news-heading">1812 Today</h2><p>Discoveries, research, and reporting on the war and what it left behind.</p></div>
          <Link className={styles.archiveLink} href="/news">All selections <span aria-hidden="true">→</span></Link>
        </header>
        <NewsList items={newsItems.slice(0, 3)} compact />
      </div>
    </section>
  );
}

export function NewsExploreLink() {
  return <aside className={styles.exploreDoor} aria-label="Recent news and discoveries"><div><p className="section-kicker">The record is still growing</p><h2><Link href="/news">1812 Today <span aria-hidden="true">→</span></Link></h2><p>Read recent reporting, archival discoveries, and museum news alongside the historical collections.</p></div><Link href="/news">Browse {newsItems.length} selections <span aria-hidden="true">→</span></Link></aside>;
}
