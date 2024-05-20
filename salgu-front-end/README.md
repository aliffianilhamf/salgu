# SALGU Front End

## Instalasi

1. Pastikan Anda sudah melakukan petunjuk instalasi di [`/README.md`](../README.md) pada root folder sebelum berlanjut.
2. Pastikan terminal Anda berada di folder `/salgu-front-end`, dan jalankan

```bash
$ pnpm install
```

## Menjalankan

```bash
pnpm run dev
```

## Styling

Anda tidak dapat menggunakan Bootstrap dan Tailwind sekaligus pada suatu halaman. Anda hanya bisa menggunakan salah satu saja.

### Bootstrap

Jika Anda ingin menggunakan bootstrap untuk men-style suatu halaman, tambahkan baris

```typescript
import "bootstrap/dist/css/bootstrap.min.css";
```

di bagian atas file halaman tersebut.

Pada proyek SALGU ini, tersedia library [`react-bootstrap`](https://react-bootstrap.github.io/) yang dapat melancarkan styling. Contohnya, untuk menggunakan komponen `card` dari react-bootstrap, dapat ditambahkan baris `import Card from "react-bootstrap/Card";` di bagian atas file.

### Tailwind

Jika Anda ingin menggunakan tailwind untuk men-style suatu halaman, Anda dapat langsung menggunakannya tanpa menambahkan apapun.
