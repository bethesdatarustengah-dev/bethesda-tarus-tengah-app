export type MasterField = {
  name: string;
  label: string;
  placeholder?: string;
};

export type MasterColumn = {
  name: string;
  label: string;
};

export type MasterDataset = {
  slug: string;
  label: string;
  apiPath: string;
  idField: string;
  fields: MasterField[];
  columns: MasterColumn[];
};

export const MASTER_DATASETS: MasterDataset[] = [
  {
    slug: "pendidikan",
    label: "Pendidikan",
    apiPath: "/api/pendidikan",
    idField: "idPendidikan",
    fields: [{ name: "jenjang", label: "Jenjang Pendidikan" }],
    columns: [
      { name: "idPendidikan", label: "ID" },
      { name: "jenjang", label: "Jenjang" },
    ],
  },
  {
    slug: "pekerjaan",
    label: "Pekerjaan",
    apiPath: "/api/pekerjaan",
    idField: "idPekerjaan",
    fields: [{ name: "namaPekerjaan", label: "Nama Pekerjaan" }],
    columns: [
      { name: "idPekerjaan", label: "ID" },
      { name: "namaPekerjaan", label: "Pekerjaan" },
    ],
  },
  {
    slug: "pendapatan",
    label: "Pendapatan",
    apiPath: "/api/pendapatan",
    idField: "idPendapatan",
    fields: [{ name: "rentang", label: "Rentang Pendapatan" }],
    columns: [
      { name: "idPendapatan", label: "ID" },
      { name: "rentang", label: "Rentang" },
    ],
  },
  {
    slug: "jaminan-kesehatan",
    label: "Jaminan Kesehatan",
    apiPath: "/api/jaminan-kesehatan",
    idField: "idJaminan",
    fields: [{ name: "jenisJaminan", label: "Jenis Jaminan" }],
    columns: [
      { name: "idJaminan", label: "ID" },
      { name: "jenisJaminan", label: "Jenis" },
    ],
  },
  {
    slug: "status-dalam-keluarga",
    label: "Status Dalam Keluarga",
    apiPath: "/api/status-dalam-keluarga",
    idField: "idStatusDalamKel",
    fields: [{ name: "status", label: "Status" }],
    columns: [
      { name: "idStatusDalamKel", label: "ID" },
      { name: "status", label: "Status" },
    ],
  },
  {
    slug: "status-kepemilikan-rumah",
    label: "Status Kepemilikan Rumah",
    apiPath: "/api/status-kepemilikan-rumah",
    idField: "idStatusKepemilikan",
    fields: [{ name: "status", label: "Status" }],
    columns: [
      { name: "idStatusKepemilikan", label: "ID" },
      { name: "status", label: "Status" },
    ],
  },
  {
    slug: "status-tanah",
    label: "Status Tanah",
    apiPath: "/api/status-tanah",
    idField: "idStatusTanah",
    fields: [{ name: "status", label: "Status" }],
    columns: [
      { name: "idStatusTanah", label: "ID" },
      { name: "status", label: "Status" },
    ],
  },
  {
    slug: "rayon",
    label: "Rayon",
    apiPath: "/api/rayon",
    idField: "idRayon",
    fields: [{ name: "namaRayon", label: "Nama Rayon" }],
    columns: [
      { name: "idRayon", label: "ID" },
      { name: "namaRayon", label: "Rayon" },
    ],
  },
  {
    slug: "klasis",
    label: "Klasis",
    apiPath: "/api/klasis",
    idField: "idKlasis",
    fields: [{ name: "nama", label: "Nama Klasis" }],
    columns: [
      { name: "idKlasis", label: "ID" },
      { name: "nama", label: "Klasis" },
    ],
  },
  {
    slug: "jabatan",
    label: "Jabatan",
    apiPath: "/api/jabatan",
    idField: "idJabatan",
    fields: [{ name: "namaJabatan", label: "Nama Jabatan" }],
    columns: [
      { name: "idJabatan", label: "ID" },
      { name: "namaJabatan", label: "Jabatan" },
    ],
  },
  {
    slug: "provinsi",
    label: "Provinsi",
    apiPath: "/api/geografi/provinsi",
    idField: "idProv",
    fields: [{ name: "nama", label: "Nama Provinsi" }],
    columns: [
      { name: "idProv", label: "ID" },
      { name: "nama", label: "Provinsi" },
    ],
  },
  {
    slug: "kota-kabupaten",
    label: "Kota/Kabupaten",
    apiPath: "/api/geografi/kota-kabupaten",
    idField: "idKotaKab",
    fields: [
      { name: "idProv", label: "ID Provinsi" },
      { name: "nama", label: "Nama Kota/Kabupaten" },
    ],
    columns: [
      { name: "idKotaKab", label: "ID" },
      { name: "nama", label: "Kota/Kabupaten" },
      { name: "idProv", label: "ID Provinsi" },
    ],
  },
  {
    slug: "kecamatan",
    label: "Kecamatan",
    apiPath: "/api/geografi/kecamatan",
    idField: "idKec",
    fields: [
      { name: "idKotaKab", label: "ID Kota/Kabupaten" },
      { name: "nama", label: "Nama Kecamatan" },
    ],
    columns: [
      { name: "idKec", label: "ID" },
      { name: "nama", label: "Kecamatan" },
      { name: "idKotaKab", label: "ID Kota/Kab" },
    ],
  },
  {
    slug: "kelurahan",
    label: "Kelurahan",
    apiPath: "/api/geografi/kelurahan",
    idField: "idKelurahan",
    fields: [
      { name: "idKec", label: "ID Kecamatan" },
      { name: "nama", label: "Nama Kelurahan" },
    ],
    columns: [
      { name: "idKelurahan", label: "ID" },
      { name: "nama", label: "Kelurahan" },
      { name: "idKec", label: "ID Kecamatan" },
    ],
  },
];

