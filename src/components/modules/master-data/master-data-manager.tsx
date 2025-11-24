"use client";

import { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { MasterDataset } from "@/constants/master-datasets";

type MasterItem = Record<string, unknown>;

type Props = {
  config: MasterDataset;
  initialItems: MasterItem[];
};

const buildSchema = (fields: MasterDataset["fields"]) =>
  z.object(
    fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: z.string().min(1, `${field.label} wajib diisi`),
      }),
      {} as Record<string, z.ZodString>,
    ),
  );

const defaultValues = (fields: MasterDataset["fields"]) =>
  fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: "",
    }),
    {} as Record<string, string>,
  );

export const MasterDataManager = ({ config, initialItems }: Props) => {
  const [items, setItems] = useState<MasterItem[]>(initialItems);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MasterItem | null>(null);

  const schema = useMemo(() => buildSchema(config.fields), [config.fields]);
  const createForm = useForm<Record<string, string>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(config.fields),
  });
  const editForm = useForm<Record<string, string>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(config.fields),
  });

  const resetForms = () => {
    createForm.reset(defaultValues(config.fields));
    editForm.reset(defaultValues(config.fields));
  };

  // Client-side fallback: if server didn't provide initial items, try fetching from API route
  useEffect(() => {
    let mounted = true;

    const tryFetch = async () => {
      if (items.length > 0) return;

      try {
        const res = await fetch(config.apiPath);
        const data = await res.json();

        if (res.ok && data?.data?.items) {
          if (!mounted) return;
          setItems(data.data.items);
        } else if (res.ok && Array.isArray(data?.data)) {
          if (!mounted) return;
          setItems(data.data);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Client fallback fetch failed for", config.apiPath, err);
      }
    };

    tryFetch();

    return () => { mounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.apiPath]);

  // Keep items in sync when initialItems prop changes (e.g. when navigating between slugs)
  useEffect(() => {
    setItems(initialItems ?? []);
  }, [initialItems]);

  const handleCreate = async (values: Record<string, string>) => {
    try {
      const res = await fetch(config.apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message ?? "Gagal menambahkan data");
      }

      setItems((prev) => [data.data, ...prev]);
      resetForms();
      setCreateOpen(false);
      toast.success(`${config.label} berhasil ditambahkan`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  const handleUpdate = async (values: Record<string, string>) => {
    if (!editingItem) return;

    const id = editingItem[config.idField];

    try {
      const res = await fetch(`${config.apiPath}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message ?? "Gagal memperbarui data");
      }

      setItems((prev) =>
        prev.map((item) =>
          item[config.idField] === id ? data.data : item,
        ),
      );
      setEditingItem(null);
      editForm.reset(defaultValues(config.fields));
      toast.success("Data berhasil diperbarui");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  const handleDelete = async (item: MasterItem) => {
    const id = item[config.idField];
    if (!id) return;

    try {
      const res = await fetch(`${config.apiPath}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message ?? "Gagal menghapus data");
      }

      setItems((prev) =>
        prev.filter((current) => current[config.idField] !== id),
      );
      toast.success("Data berhasil dihapus");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  const openEditDialog = (item: MasterItem) => {
    setEditingItem(item);
    const values = config.fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: item[field.name] ?? "",
      }),
      {} as Record<string, string>,
    );
    editForm.reset(values);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{config.label}</h2>
        <p className="text-sm text-muted-foreground">
          Kelola data master {config.label.toLowerCase()}.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-lg border bg-card p-4">
        <div>
          <h3 className="text-sm font-medium">Tambah {config.label}</h3>
          <p className="text-xs text-muted-foreground">Klik tombol untuk menambahkan data baru.</p>
        </div>
        <div>
          <Button onClick={() => setCreateOpen(true)}>Tambah</Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {config.columns.map((column) => (
                <TableHead key={column.name}>{column.label}</TableHead>
              ))}
              <TableHead className="w-32 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item[config.idField]}>
                {config.columns.map((column) => (
                  <TableCell key={column.name}>
                    {item[column.name] ?? "-"}
                  </TableCell>
                ))}
                <TableCell className="space-x-2 text-right">
                  <Button
                    onClick={() => openEditDialog(item)}
                    size="sm"
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item)}
                    size="sm"
                    variant="destructive"
                  >
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {config.label}</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form
              className="space-y-4"
              onSubmit={editForm.handleSubmit(handleUpdate)}
            >
              {config.fields.map((field) => (
                <FormField
                  key={field.name}
                  control={editForm.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        <Input placeholder={field.placeholder} {...formField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <DialogFooter>
                <Button type="submit">Perbarui</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={createOpen} onOpenChange={(open) => setCreateOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah {config.label}</DialogTitle>
          </DialogHeader>
          <Form {...createForm}>
            <form className="space-y-4" onSubmit={createForm.handleSubmit(handleCreate)}>
              {config.fields.map((field) => (
                <FormField
                  key={field.name}
                  control={createForm.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        <Input placeholder={field.placeholder} {...formField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <DialogFooter>
                <Button type="submit">Simpan</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

