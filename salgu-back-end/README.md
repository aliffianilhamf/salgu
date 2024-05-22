# SALGU Back End

## Instalasi

1. Pastikan Anda sudah melakukan petunjuk instalasi di [`/README.md`](../README.md) pada root folder sebelum berlanjut.

2. Jike file `/salgu-back-end/config/local-development.yaml` belum ada, salin atau copy file `/salgu-back-end/config/default.yaml` menjadi file baru yang bernama `/salgu-back-end/config/local-development.yaml`.

3. Ganti isi pengaturan file `local-development.yaml` agar sesuai dengan environment Anda. Pastikan pengaturan koneksi database yang ada di file tersebut itu cocok dengan database yang berjalan di mesin Anda.

4. Pastikan terminal Anda sedang di `/salgu-back-end`, dan jalankan

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

## Menggunakan Postman

### Menangani autentikasi

1. Pastikan Anda [menggunakan](https://learning.postman.com/docs/sending-requests/variables/managing-environments/#switch-between-environments) environment Anda sendiri. Idealnya, pakai environment dengan nama Anda.

2. Jika Anda belum membuat user dengan password, buatlah dengan mengirim request di `users/Create User`.

3. Sign in dengan `users/Sign In`.

4. Anda sekarang terautentikasi sebagai seorang user.

5. Jika Anda ingin mengaktifkan mode admin, ubahlah nilai kolom `isAdmin` menjadi `1` di tabel `user` dalam database SALGU.

## Testing

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
