import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "@/components/SafeLink";
import { notFound } from "next/navigation";
import { DocumentaryReader } from "@/components/DocumentaryReader";
import { documentaryBySlug, documentaryPackets } from "@/lib/documentary";

export function generateStaticParams() { return documentaryPackets.map((packet) => ({ slug: packet.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const packet = documentaryBySlug[slug]; return packet ? pageMetadata(`/edition/${packet.slug}`, `${packet.title} · Documentary Edition`, packet.editorialIntroduction) : {}; }

export default async function EditionPacketPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const packet = documentaryBySlug[slug];
  if (!packet) notFound();
  const previous = documentaryPackets[packet.chapterOrder - 1];
  const next = documentaryPackets[packet.chapterOrder + 1];
  return <main id="main" className="edition-packet-page">
    <header className="edition-packet-context"><Link href="/edition">← Documentary Edition</Link><p>{packet.chapterTitle}</p></header>
    <DocumentaryReader packet={packet} standalone />
    <nav className="edition-packet-nav" aria-label="Documentary edition navigation">{previous ? <Link href={`/edition/${previous.slug}`}><span>Previous packet</span><strong>{previous.title}</strong></Link> : <span />}{next ? <Link href={`/edition/${next.slug}`}><span>Next packet</span><strong>{next.title}</strong></Link> : <span />}</nav>
  </main>;
}
