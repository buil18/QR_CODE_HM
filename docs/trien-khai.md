# Triển khai

App chỉ là một file HTML tĩnh nên host ở đâu cũng được. Ba cách dưới xếp từ đơn giản nhất.

## Cách 1 — Chép file cho từng máy

Gửi `index.html` qua USB, email hoặc thư mục chung, mở bằng Chrome là xong.

Hợp khi chỉ có vài máy và danh sách vị trí ít khi đổi. Nhược điểm: mỗi lần đổi danh sách
phải chép lại cho từng máy.

## Cách 2 — GitHub Pages (miễn phí, có sẵn workflow)

Repo đã kèm `.github/workflows/deploy.yml`. Sau khi push lên GitHub:

1. Vào **Settings → Pages**, mục *Source* chọn **GitHub Actions**.
2. Mỗi lần push lên nhánh `main`, trang tự cập nhật.
3. Link có dạng `https://<tên-tài-khoản>.github.io/<tên-repo>/`.

> Repo để **public** thì ai có link cũng xem được. Danh sách mã vị trí kho không phải dữ liệu
> nhạy cảm, nhưng nếu nội bộ yêu cầu kín, hãy để repo **private** và dùng Netlify (cách 3)
> hoặc một web server nội bộ.

## Cách 3 — Netlify (kéo thả, không cần Git)

1. Vào [app.netlify.com/drop](https://app.netlify.com/drop).
2. Kéo thả file `index.html` vào.
3. Netlify trả về một link dùng được ngay.

Lần sau cập nhật: vào site đã tạo → **Deploys** → kéo thả file mới vào.

Repo có sẵn `netlify.toml` nếu bạn muốn nối Netlify thẳng vào GitHub thay vì kéo thả.

## Cách 4 — Web server nội bộ

Chép `index.html` vào thư mục phục vụ web (IIS, nginx, Apache). Không cần cấu hình gì thêm,
không cần PHP hay database.

---

## Cập nhật danh sách vị trí sau khi đã triển khai

App tự nhận danh sách mới khi **số `version` trong file lớn hơn** số máy đang giữ.
Vì vậy mỗi lần đổi danh sách, luôn tăng `version` lên 1.

Quy trình qua Git:

```bash
# 1. Sửa data/vi-tri-kho.json, nhớ tăng "version"
# 2. Ghi dữ liệu vào index.html
node tools/sync-seed.mjs
# 3. Kiểm tra lại
node tools/sync-seed.mjs --check
# 4. Push
git add -A && git commit -m "Cập nhật vị trí kho X" && git push
```

Nếu người vận hành sửa trực tiếp trong app và gửi lại file `index.html`:

```bash
# thay file index.html trong repo bằng file họ gửi, rồi:
node tools/sync-seed.mjs --extract   # cập nhật lại data/vi-tri-kho.json cho khớp
git add -A && git commit -m "Cập nhật danh sách từ máy vận hành" && git push
```
