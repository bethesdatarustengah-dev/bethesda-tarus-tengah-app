"use client";

import { useQuery } from "@tanstack/react-query";
import KeluargaModule from "@/components/modules/keluarga/keluarga-module";
import { getKeluargaAction } from "@/actions/keluarga";

interface KeluargaClientPageProps {
    initialData: any[] | undefined;
    masters: any;
}

export default function KeluargaClientPage({
    initialData,
    masters,
}: KeluargaClientPageProps) {
    const { data: keluarga, isLoading } = useQuery({
        queryKey: ["keluarga"],
        queryFn: () => getKeluargaAction(),
        initialData: initialData,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });

    return (
        <KeluargaModule
            initialData={keluarga}
            masters={masters}
            isLoading={isLoading}
        />
    );
}
