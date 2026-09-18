import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SourceList } from "@/components/SourceList";
import { events } from "@/lib/content";

export function generateStaticParams() { return events.map((event) => ({ slug: event.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const event = events.find((item) => item.id === slug); return event ? { title: event.title, description: event.summary } : {}; }
export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const event = events.find((item) => item.id === slug); if (!event) notFound(); return <main id="main" className="record-page"><header className="record-hero"><div><p className="section-kicker">Event record · {event.type}</p><p className="record-eyebrow">{event.place} · {event.theater}</p><h1>{event.title}</h1><p className="record-dates">{event.date}</p></div></header><div className="record-body"><section className="record-summary"><p>{event.summary}</p><h2>Where it sits in the story</h2><p>This event is one point in a connected military, political, and human sequence. Open the narrative chapter to see what produced it and what followed.</p></section><div className="record-actions"><Link className="primary-action" href={`/story/${event.chapter}`}>Read the connected story <span>→</span></Link><Link href="/events">Back to events</Link></div><SourceList ids={event.sourceRefs} heading="Evidence behind this event" /></div></main>; }

