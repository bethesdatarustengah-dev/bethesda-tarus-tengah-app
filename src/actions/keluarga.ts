"use server";

import { prisma } from "@/lib/prisma";

export async function getKeluargaAction() {
    try {
        const data = await prisma.keluarga.findMany({
            orderBy: { nikKepala: "asc" },
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
                statusKepemilikan: true,
                statusTanah: true,
                rayon: true,
                jemaat: {
                    include: {
                        status: true,
                    },
                },
            },
        });
        return data;
    } catch (error) {
        console.error("Failed to fetch keluarga:", error);
        throw new Error("Failed to fetch keluarga data");
    }
}
