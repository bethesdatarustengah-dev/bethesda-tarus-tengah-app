"use client";

import { useQuery } from "@tanstack/react-query";
import JemaatModule from "@/components/modules/jemaat/jemaat-module";
import { getJemaatAction } from "@/actions/jemaat";

interface JemaatClientPageProps {
    initialData: any[] | undefined;
    masters: any;
}

export default function JemaatClientPage({
    initialData,
    masters,
}: JemaatClientPageProps) {
    const { data: jemaat, isLoading } = useQuery({
        queryKey: ["jemaat"],
        queryFn: () => getJemaatAction(),
        initialData: initialData,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });

    return (
        <JemaatModule
            initialData={jemaat}
            masters={masters}
            isLoading={isLoading}
        />
    );
}
