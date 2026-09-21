import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { notFound, redirect } from "next/navigation";
import { HumanDetail } from "@/components/HumanDetail";
import { catalogRecord, people } from "@/lib/catalog";
import { humanRecordBySlug, personSlugAliases, resolvePersonSlug } from "@/lib/human-record";
export function generateStaticParams() { return [...people.map((record) => ({ slug: record.slug })), ...Object.keys(personSlugAliases).map((slug) => ({ slug }))]; }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const record = catalogRecord("people", slug); return record ? pageMetadata(`/people/${record.slug}`, record.name, record.summary) : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const resolvedSlug = resolvePersonSlug(slug); if (resolvedSlug !== slug) redirect(`/people/${resolvedSlug}`); const record = catalogRecord("people", resolvedSlug); if (!record) notFound(); return <HumanDetail record={record} human={humanRecordBySlug[resolvedSlug]} />; }
