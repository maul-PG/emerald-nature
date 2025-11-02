git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<username>/<repo>.git
git branch -M main
git push -u origin main
git add .
git commit -m "Update"
git push
Panduan singkat push ke GitHub (PowerShell / Windows):

Langkah ini untuk mengirim semua perubahan lokal ke repository GitHub Anda.

1) Jika repository belum diinisialisasi

```powershell
git init
git add .
git commit -m "Initial repository setup: add project files and documentation"
git remote add origin https://github.com/maul-PG/emerald-nature.git
git branch -M main
git push -u origin main
```

2) Jika sudah ada remote dan hanya ingin mengirim perubahan baru

```powershell
git add .
git commit -m "Update: improve docs and portfolio assets"
git push
```

Catatan & tips
- Pastikan `.gitignore` sudah benar sehingga file sensitif (mis. `.env.local`) tidak ikut ter-push.
- Jika Anda menggunakan 2FA, pastikan credential atau token git terkonfigurasi (GitHub CLI or PAT).
- Untuk membuat PR dari branch baru:

```powershell
git checkout -b feature/add-readme-preview
git add .
git commit -m "feat: add README preview and portfolio guide"
git push -u origin feature/add-readme-preview
```

Setelah push, buka halaman GitHub repository dan buat Pull Request lewat UI jika perlu review.
