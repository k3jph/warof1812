import { NewsList } from "@/components/News";
import styles from "@/components/News.module.css";
import { pageMetadata } from "@/lib/metadata";
import { newsItems } from "@/lib/news";

export const metadata = pageMetadata("/news", "1812 Today", "Discoveries, research, and reporting on the War of 1812 and what it left behind. A curated collection of source links with historical context.");

export default function NewsPage() {
  return (
    <main id="main" className={`page-shell ${styles.archive}`}>
      <header className={`page-title ${styles.archiveTitle}`}>
        <p className="section-kicker">News &amp; discoveries</p>
        <h1>1812 Today</h1>
        <p>Discoveries, research, and reporting on the war and what it left behind.</p>
      </header>
      <div className={styles.policy}>
        <p>A small selection of worthwhile reading, with original notes connecting it to the history. Follow the source links for the reporting, research, and evidence behind each item.</p>
        <p>Entries are ordered by the source’s publication date, not by when a discovery occurred. Museum announcements are labeled separately from independent reporting. Exhibition details and access conditions may change.</p>
      </div>
      <p className={styles.count}>{newsItems.length} selections · newest first</p>
      <NewsList items={newsItems} />
    </main>
  );
}
