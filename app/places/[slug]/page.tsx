import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { CatalogDetail } from "@/components/CatalogDetail";
import { catalogRecord, places } from "@/lib/catalog";
export function generateStaticParams() { return places.map((record) => ({ slug: record.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const record = catalogRecord("places", slug); return record ? pageMetadata(`/places/${record.slug}`, record.name, record.summary) : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const record = catalogRecord("places", slug); if (!record) notFound(); return <CatalogDetail record={record} />; }

