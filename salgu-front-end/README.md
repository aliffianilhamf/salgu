# SALGU Front End

## Instalasi

1. Pastikan Anda sudah melakukan petunjuk instalasi di [`/README.md`](../README.md) pada root folder sebelum berlanjut.
2. Pastikan terminal Anda berada di folder `/salgu-front-end`, dan jalankan

```bash
$ pnpm install
```

3. Jika belum ada file `/salgu-front-end/.env`, copy atau salin file `/salgu-front-end/.env.example` ke `/salgu-front-end/.env`.

4. Cek secara berkala file `/salgu-front-end/.env.example`. Jika ada perubahan atau penambahan variabel pada `/salgu-front-end/.env.example`, terapkan juga perubahan tersebut pada `/salgu-front-end/.env`.

## Menjalankan

```bash
pnpm run dev
```

## Styling

Anda dapat menggunakan Bootstrap dan Tailwind sekaligus pada suatu halaman.

### Bootstrap

Jika Anda ingin menggunakan bootstrap untuk men-style suatu halaman, tambahkan baris

```typescript
import "bootstrap/dist/css/bootstrap.min.css";
```

di bagian atas file halaman tersebut.

Pada proyek SALGU ini, tersedia library [`react-bootstrap`](https://react-bootstrap.github.io/) yang dapat melancarkan styling. Contohnya, untuk menggunakan komponen `card` dari react-bootstrap, dapat ditambahkan baris `import Card from "react-bootstrap/Card";` di bagian atas file.

### Tailwind

Jika Anda ingin menggunakan tailwind untuk men-style suatu halaman, Anda perlu menambahkan prefix `tw-` sebelum tiap kelas tailwind. Contohnya, dari pada `text-left`, di proyek ini Anda perlu ketik `tw-text-left`.
