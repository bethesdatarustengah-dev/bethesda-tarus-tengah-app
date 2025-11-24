"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { MASTER_DATASETS } from "@/constants/master-datasets";
import { MasterDataManager } from "@/components/modules/master-data/master-data-manager";

export default function MasterDatasetPageClient() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params?.slug) ? params?.slug[0] : params?.slug ?? "";

  const config = MASTER_DATASETS.find((d) => d.slug === slug) ?? null;

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If no slug in URL, redirect to first dataset
    if (!slug) {
      const first = MASTER_DATASETS[0];
      if (first) router.push(`/master-data/${first.slug}`);
      return;
    }

    if (!config) {
      setError(`Dataset dengan slug "${slug}" tidak tersedia.`);
      setItems([]);
      return;
    }

    let mounted = true;
    setLoading(true);
    setError(null);

    fetch(config.apiPath)
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        if (!mounted) return;
        if (!res.ok) {
          setError(json?.message ?? "Gagal memuat data");
          setItems([]);
        } else {
          // API shape: { data: { items, pagination } } or { data: items }
          const payload = json?.data ?? json;
          const list = payload?.items ?? (Array.isArray(payload) ? payload : []);
          setItems(list);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        setError(String(err));
        setItems([]);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold">Terjadi kesalahan</h2>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold">Data tidak ditemukan</h2>
        <p className="text-sm text-muted-foreground">Dataset dengan slug "{slug}" tidak tersedia.</p>
      </div>
    );
  }

  return (
    <MasterDataManager
      key={config.slug}
      config={config}
      initialItems={items}
    />
  );
}

