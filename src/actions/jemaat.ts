"use server";

import { prisma } from "@/lib/prisma";

export async function getJemaatAction() {
    try {
        const data = await prisma.jemaat.findMany({
            include: {
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
            },
            orderBy: {
                nama: "asc",
            },
        });
        return data;
    } catch (error) {
        console.error("Failed to fetch jemaat:", error);
        throw new Error("Failed to fetch jemaat data");
    }
}
