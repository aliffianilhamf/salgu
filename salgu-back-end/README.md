# SALGU Back End

## Instalasi

1. Pastikan Anda sudah melakukan petunjuk instalasi di [`/README.md`](../README.md) pada root folder sebelum berlanjut.

2. Jike file `/salgu-back-end/config/local-development.yaml` belum ada, salin atau copy file `/salgu-back-end/config/default.yaml` menjadi file baru yang bernama `/salgu-back-end/config/local-development.yaml`.

3. Ganti isi pengaturan file `local-development.yaml` agar sesuai dengan environment Anda. Pastikan pengaturan koneksi database yang ada di file tersebut itu cocok dengan database yang berjalan di mesin Anda.

4. Jalankan

```bash
$ pnpm install
```

## Menjalankan

1. Pastikan Anda sudah menyediakan database untuk salgu-back-end dan mengisi pengaturan database di `local-development.yaml`.

2. Jalankan

```bash
# development
$ pnpm run start

# development & watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Testing

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
