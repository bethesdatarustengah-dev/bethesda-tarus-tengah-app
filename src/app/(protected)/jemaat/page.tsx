import JemaatModule from "@/components/modules/jemaat/jemaat-module";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const jemaatInclude = {
  keluarga: {
    include: {
      alamat: {
        include: {
          kelurahan: {
            include: {
              kecamatan: {
                include: {
                  kotaKab: {
                    include: { provinsi: true },
                  },
                },
              },
            },
          },
        },
      },
      rayon: true,
      statusKepemilikan: true,
      statusTanah: true,
    },
  },
  status: true,
  pendidikan: true,
  pekerjaan: true,
  pendapatan: true,
  jaminan: true,
  pernikahan: true,
  baptisOwned: true,
  sidiOwned: true,
  jabatanRel: {
    include: {
      jabatan: true,
    },
  },
};

import {
  getStatusDalamKeluarga,
  getPendidikan,
  getPekerjaan,
  getPendapatan,
  getJaminanKes,
  getStatusKepemilikanRumah,
  getStatusTanah,
  getRayon,
  getKelurahan,
} from "@/lib/cached-data";

export default async function JemaatPage() {
  const [
    jemaat,
    status,
    pendidikan,
    pekerjaan,
    pendapatan,
    jaminan,
    statusKepemilikan,
    statusTanah,
    rayon,
    kelurahan,
  ] = await Promise.all([
    prisma.jemaat.findMany({
      take: 50,
      orderBy: { nama: "asc" },
      include: jemaatInclude,
    }),
    getStatusDalamKeluarga(),
    getPendidikan(),
    getPekerjaan(),
    getPendapatan(),
    getJaminanKes(),
    getStatusKepemilikanRumah(),
    getStatusTanah(),
    getRayon(),
    getKelurahan(),
  ]);

  const serializedJemaat = jemaat.map((j: any) => ({
    ...j,
    tanggalLahir: j.tanggalLahir instanceof Date ? j.tanggalLahir.toISOString() : String(j.tanggalLahir),
  }));

  return (
    <JemaatModule
      initialData={serializedJemaat}
      masters={{
        status,
        pendidikan,
        pekerjaan,
        pendapatan,
        jaminan,
        statusKepemilikan,
        statusTanah,
        rayon,
        kelurahan,
      }}
    />
  );
}

