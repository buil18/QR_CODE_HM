# Ghi chú kỹ thuật

Dành cho người bảo trì code.

## Nguyên tắc thiết kế

App cố tình gói trong **một file HTML duy nhất**, không build step, không dependency,
không CDN. Lý do: nó chạy trên máy tính bảng trong kho, nơi mạng chập chờn và không ai
cài được gì. Mọi thay đổi nên giữ nguyên ràng buộc này.

## Bố cục trong `index.html`

| Phần | Nội dung |
|---|---|
| `<style>` | Toàn bộ CSS, gồm cả `@media print` dựng trang A4 |
| `<script id="seedData">` | Dữ liệu kho & vị trí nhúng sẵn (JSON) |
| `<script>` thứ nhất | Bộ sinh QR tự viết — IIFE tên `QR` |
| `<script>` thứ hai | Toàn bộ logic app — IIFE, state + render + event |

## Bộ sinh QR

Tự viết, không dùng thư viện. Hỗ trợ byte mode, version 1–40, ECC L/M/Q/H.
`QR.encode(text, ecl, minVer)` trả về `{modules, size, version, mask}`.

Hai điểm dễ sai khi sửa:

- **Thứ tự vẽ**: hàng/cột timing vẽ **trước**, finder pattern đè lên sau. Làm ngược lại
  sẽ ăn mất viền dưới và viền phải của ô định vị, và máy quét vẫn đọc được trên màn hình
  nhưng hay lỗi khi in — rất khó phát hiện.
- **Một cỡ ma trận cho cả danh sách** (`refreshVersion` / biến `listVer`): mọi vị trí trong
  app dùng chung version lớn nhất để tem in ra đồng cỡ, máy quét đọc đều tay.

## State và lưu trữ

- Khoá `localStorage`: `khoqr.v3`, có đường migrate từ `khoqr.v2` và `khoqr.v1`.
- Trình duyệt chặn lưu trữ → cờ `storageOk = false`, app vẫn chạy và hiện banner cảnh báo.
- `applySeed(false)` chạy lúc tải trang: nếu `seedData.version` lớn hơn `state.seedVersion`
  thì ghi đè danh sách kho bằng dữ liệu trong file. **Đây là cơ chế cập nhật cho mọi máy** —
  quên tăng `version` thì không máy nào nhận danh sách mới.

## Nội dung mã QR

Mẫu mặc định `{"V":"{ma}"}` — chỉ chuỗi `{ma}` được thay bằng mã vị trí, mọi ký tự khác
giữ nguyên. Đổi mẫu trong *Cài đặt → Nội dung mã QR* nếu hệ thống đọc thay đổi định dạng.

ECC mặc định là **L**, khớp với tem gốc đang dán trên kệ (21×21 ô).

## In ấn

`@media print` ẩn toàn bộ UI, chỉ hiện `#printRoot` được dựng động trong `runPrint()`.
Lưới tem dùng CSS Grid, `.p-page` ngắt trang. Hai kiểu tem:

- `plain` — SVG đen trắng, mã ghi bên dưới.
- `tem` — khung xanh giống tem đang dán, dùng `container queries` để chữ co giãn theo khổ tem.

Tuỳ chọn *chèn trang trắng xen kẽ* là cách đi vòng khi máy in bật in hai mặt mà không tắt được.

## Khoá PIN

`pinHash()` dùng FNV-1a 32-bit, lưu hash trong file. **Không phải bảo mật** — chỉ chống thao
tác nhầm của người đứng máy. Đừng dùng lại PIN từ hệ thống khác, và đừng mở rộng cơ chế
này thành phân quyền thật.

## Hộp thoại

`prompt()` / `confirm()` của trình duyệt bị chặn khi mở file qua `file://` ở một số cấu hình,
nên app tự dựng hộp thoại `#ask`. Khi thêm luồng mới, dùng `ask(title, text, value, okText, cb, opts)`
chứ đừng gọi lại API gốc của trình duyệt.

## Kiểm thử thủ công trước khi push

1. Mở `index.html` trực tiếp bằng `file://` — mọi thứ phải chạy, kể cả *Tạo file để đăng lại lên web*
   (đường `fetch` sẽ fail và rơi về nhánh dựng từ DOM).
2. Dán nhiều mã xuyên kho, kiểm tra thứ tự và phần "Không tìm thấy".
3. In thử ra PDF ở cả 4 mức tem/trang, cả hai kiểu tem.
4. Quét thử bằng máy quét thật ở màn hình quét và trên tem đã in.
5. `node tools/sync-seed.mjs --check` phải báo khớp.
