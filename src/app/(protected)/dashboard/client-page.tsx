"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardStatsAction } from "@/actions/dashboard";

const cards = [
    { key: "jemaat", label: "Total Jemaat" },
    { key: "keluarga", label: "Total Keluarga" },
    { key: "baptis", label: "Data Baptis" },
    { key: "pernikahan", label: "Data Pernikahan" },
] as const;

interface DashboardClientPageProps {
    initialData: {
        jemaat: number;
        keluarga: number;
        baptis: number;
        pernikahan: number;
    } | undefined;
}

export default function DashboardClientPage({
    initialData,
}: DashboardClientPageProps) {
    const { data: stats, isLoading } = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: () => getDashboardStatsAction(),
        initialData: initialData,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
                <p className="text-sm text-muted-foreground">
                    Ringkasan data utama jemaat GMIT Tarus.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((card) => (
                    <div
                        key={card.key}
                        className="rounded-xl border bg-card p-6 shadow-sm"
                    >
                        <p className="text-sm text-muted-foreground">{card.label}</p>
                        {isLoading ? (
                            <div className="mt-2 h-9 w-20 animate-pulse rounded bg-muted" />
                        ) : (
                            <p className="mt-2 text-3xl font-bold">
                                {stats?.[card.key] ?? 0}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
