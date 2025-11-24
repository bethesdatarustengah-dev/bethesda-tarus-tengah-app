"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export const TopBar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Gagal logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="flex items-center justify-end border-b bg-card px-4 py-3">
      <Button onClick={handleLogout} size="sm" variant="outline" disabled={loading}>
        {loading ? "Keluar..." : "Keluar"}
      </Button>
    </header>
  );
};

