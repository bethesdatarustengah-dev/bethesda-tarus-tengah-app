import JemaatJabatanModule from "@/components/modules/jabatan/jemaat-jabatan-module";
import { prisma } from "@/lib/prisma";

export default async function JabatanPage() {
  const [assignments, jemaat, jabatan] = await Promise.all([
    prisma.jemaatJabatan.findMany({
      orderBy: { tanggalMulai: "desc" },
      include: {
        jabatan: true,
      },
    }),
    prisma.jemaat.findMany({
      orderBy: { nama: "asc" },
      select: {
        idJemaat: true,
        nama: true,
      },
      take: 200,
    }),
    prisma.jabatan.findMany({ orderBy: { namaJabatan: "asc" } }),
  ]);

  return (
    <JemaatJabatanModule
      initialData={assignments}
      masters={{
        jemaat,
        jabatan,
      }}
    />
  );
}

