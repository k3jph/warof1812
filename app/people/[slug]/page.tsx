import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HumanDetail } from "@/components/HumanDetail";
import { catalogRecord, people } from "@/lib/catalog";
import { humanRecordBySlug } from "@/lib/human-record";
export function generateStaticParams() { return people.map((record) => ({ slug: record.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const record = catalogRecord("people", slug); return record ? { title: record.name, description: record.summary } : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const record = catalogRecord("people", slug); if (!record) notFound(); return <HumanDetail record={record} human={humanRecordBySlug[slug]} />; }
