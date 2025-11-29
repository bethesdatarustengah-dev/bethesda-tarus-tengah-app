"use server";

import { getDashboardStats } from "@/lib/cached-data";

export async function getDashboardStatsAction() {
    try {
        const stats = await getDashboardStats();
        return stats;
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        throw new Error("Failed to fetch dashboard stats");
    }
}
