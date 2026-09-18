import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogDetail } from "@/components/CatalogDetail";
import { catalogRecord, documents } from "@/lib/catalog";
export function generateStaticParams() { return documents.map((record) => ({ slug: record.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const record = catalogRecord("documents", slug); return record ? { title: record.name, description: record.summary } : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const record = catalogRecord("documents", slug); if (!record) notFound(); return <CatalogDetail record={record} />; }

