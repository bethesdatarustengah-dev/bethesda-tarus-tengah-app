"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Tag } from "lucide-react";
import { useState } from "react";

import { MASTER_DATASETS } from "@/constants/master-datasets";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/jemaat", label: "Jemaat" },
  { href: "/keluarga", label: "Keluarga" },
  { href: "/sakramen", label: "Sakramen" },
  { href: "/jabatan", label: "Jabatan" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const isMasterActive = pathname?.startsWith("/master-data");
  const [open, setOpen] = useState(true);

  return (
    <aside className="hidden w-64 border-r bg-card p-6 lg:block">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          GMIT
        </p>
        <h1 className="text-2xl font-bold">Tarus Admin</h1>
      </div>

      <nav className="mt-10 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            className={cn(
              "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            href={item.href}
          >
            {item.label}
          </Link>
        ))}

        <div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className={cn(
              "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isMasterActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            type="button"
          >
            <span className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span>Data Master</span>
            </span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", open ? "rotate-180" : "rotate-0")} />
          </button>

          {open && (
            <div className="mt-2 max-h-[55vh] overflow-auto pr-1">
              <div className="rounded-md bg-transparent">
                {MASTER_DATASETS.map((dataset) => (
                  <Link
                    key={dataset.slug}
                    href={`/master-data/${dataset.slug}`}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      pathname === `/master-data/${dataset.slug}`
                        ? "bg-primary/80 text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{dataset.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

