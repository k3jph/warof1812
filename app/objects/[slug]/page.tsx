import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogDetail } from "@/components/CatalogDetail";
import { catalogRecord, objects } from "@/lib/catalog";
export function generateStaticParams() { return objects.map((record) => ({ slug: record.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const record = catalogRecord("objects", slug); return record ? { title: record.name, description: record.summary } : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const record = catalogRecord("objects", slug); if (!record) notFound(); return <CatalogDetail record={record} />; }
