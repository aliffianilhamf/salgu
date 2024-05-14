
# SALGU Mono Repo

Repository ini menyimpan
 - codebase front end SALGU (`./salgu-front-end`),
 - dan codebase back end SALGU (`./salgu-back-end`).

Skillset yang diperlukan untuk SALGU dapat dilihat di [Learning.md](./Learning.md). Pakai Learning.md sebagai panduan mencari ilmu.

# Prasyarat
 - Proyek ini membutuhkan npm versi minimal 10.1.0, dan node versi minimal 20.9.0. Untuk mengecek versi, jalankan `npm -v` dan `node -v`.
 - Proyek ini membutuhkan `pnpm` terinstall pada komputer. Ikuti petunjuk di [sini](https://pnpm.io/installation#using-npm:~:text=Node.js%20installed.-,npm%20install%20%2Dg%20pnpm,-or) untuk menginstallnya.
 - Proyek ini membutuhkan pnpm versi minimal 9.1.1. Cek versinya dengan `pnpm -v`. Jalankan `npm update -g pnpm` untuk memperbarui pnpm Anda.

## Instalasi

1. Clone repository ke komputer. Jalankan `git clone https://github.com/Lutfi221/salgu.git` atau `git clone git@github.com:Lutfi221/salgu.git`, lalu

```bash
cd salgu
```

2. Lalu, di root folder, jalankan   
```bash
pnpm install
pnpm run prepare
```

3. Install salgu-back-end dengan mengikuti petunjuk instalasi di [`/salgu-back-end/README.md`](./salgu-back-end/README.md)

4. Install salgu-front-end dengan mengikuti petunjuk instalasi di [`/salgu-front-end/README.md`](./salgu-front-end/README.md)

