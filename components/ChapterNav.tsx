import Link from "@/components/SafeLink";
import { chapters } from "@/lib/content";

export function ChapterNav({ current }: { current: number }) {
  const previous = chapters.find((chapter) => chapter.order === current - 1);
  const next = chapters.find((chapter) => chapter.order === current + 1);
  return (
    <nav className="chapter-nav" aria-label="Story chapters">
      {previous ? <Link href={`/story/${previous.slug}`}><small>Previous</small><span>← {previous.title}</span></Link> : <span />}
      {next ? <Link className="next" href={`/story/${next.slug}`}><small>Next</small><span>{next.title} →</span></Link> : <Link className="next" href="/story"><small>Return</small><span>The whole story →</span></Link>}
    </nav>
  );
}

