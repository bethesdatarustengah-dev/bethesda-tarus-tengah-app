import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

// Revalidate every hour (3600 seconds)
const REVALIDATE_TIME = 3600;

export const getStatusDalamKeluarga = unstable_cache(
    async () => prisma.statusDalamKeluarga.findMany({ orderBy: { status: "asc" } }),
    ["status-dalam-keluarga"],
    { revalidate: REVALIDATE_TIME, tags: ["master-data"] }
);

export const getPendidikan = unstable_cache(
    async () => prisma.pendidikan.findMany({ orderBy: { jenjang: "asc" } }),
    ["pendidikan"],
    { revalidate: REVALIDATE_TIME, tags: ["master-data"] }
);

export const getPekerjaan = unstable_cache(
    async () => prisma.pekerjaan.findMany({ orderBy: { namaPekerjaan: "asc" } }),
    ["pekerjaan"],
    { revalidate: REVALIDATE_TIME, tags: ["master-data"] }
);

export const getPendapatan = unstable_cache(
    async () => prisma.pendapatan.findMany({ orderBy: { rentang: "asc" } }),
    ["pendapatan"],
    { revalidate: REVALIDATE_TIME, tags: ["master-data"] }
);

export const getJaminanKes = unstable_cache(
    async () => prisma.jaminanKes.findMany({ orderBy: { jenisJaminan: "asc" } }),
    ["jaminan-kes"],
    { revalidate: REVALIDATE_TIME, tags: ["master-data"] }
);

export const getStatusKepemilikanRumah = unstable_cache(
    async () => prisma.statusKepemilikanRumah.findMany({ orderBy: { status: "asc" } }),
    ["status-kepemilikan-rumah"],
    { revalidate: REVALIDATE_TIME, tags: ["master-data"] }
);

export const getStatusTanah = unstable_cache(
    async () => prisma.statusTanah.findMany({ orderBy: { status: "asc" } }),
    ["status-tanah"],
    { revalidate: REVALIDATE_TIME, tags: ["master-data"] }
);

export const getRayon = unstable_cache(
    async () => prisma.rayon.findMany({ orderBy: { namaRayon: "asc" } }),
    ["rayon"],
    { revalidate: REVALIDATE_TIME, tags: ["master-data"] }
);

export const getKelurahan = unstable_cache(
    async () => prisma.kelurahan.findMany({ orderBy: { nama: "asc" } }),
    ["kelurahan"],
    { revalidate: REVALIDATE_TIME, tags: ["master-data"] }
);

export const getKlasis = unstable_cache(
    async () => prisma.klasis.findMany({ orderBy: { nama: "asc" } }),
    ["klasis"],
    { revalidate: REVALIDATE_TIME, tags: ["master-data"] }
);

export const getJabatan = unstable_cache(
    async () => prisma.jabatan.findMany({ orderBy: { namaJabatan: "asc" } }),
    ["jabatan"],
    { revalidate: REVALIDATE_TIME, tags: ["master-data"] }
);
