# Hướng dẫn sử dụng

Dành cho người đứng kho. Không cần biết gì về kỹ thuật.

## 1. Mở app

Mở bằng Chrome hoặc Edge, theo một trong hai cách:

- Nhấn vào link nội bộ đã được chia sẻ, hoặc
- Mở file `index.html` đã lưu sẵn trên máy.

Nên lưu trang vào màn hình chính của máy tính bảng để lần sau mở nhanh.

## 2. Tìm một vị trí

- Bấm tên kho ở cột trái, rồi bấm vào ô vị trí cần tìm.
- Hoặc gõ mã vào ô tìm kiếm phía trên, ví dụ `HMD01`.

Khi chạm vào một vị trí, mã QR sẽ hiện to ngay để quét.

## 3. Tìm nhiều vị trí cùng lúc

Dán nhiều mã vào ô tìm kiếm, ngăn nhau bởi dấu phẩy hoặc dấu cách:

```
HMD01, HMG11, HME05, HMF20
```

App tìm xuyên tất cả các kho và giữ đúng thứ tự bạn đã nhập. Mã nào không có sẽ được
liệt kê riêng bên dưới. Dùng nút **Trước / Sau** để chuyển lần lượt qua từng mã trong danh sách.

## 4. Quét mã trên màn hình

Trong màn hình quét:

| Nút | Dùng khi |
|---|---|
| **Ô to hơn / Ô nhỏ hơn** | Máy quét không bắt được mã |
| **Đảo màu** | Thử với máy quét chỉ đọc được mã âm bản |
| **Thử 4 cỡ** | Quét lần lượt 4 cỡ, bấm "Dùng cỡ này" ở cỡ nào đọc được |

Mẹo: để độ sáng màn hình tối đa, giữ máy quét cách 15–25 cm, nghiêng nhẹ để tránh loá.

## 5. In tem

Bấm **In toàn bộ tem** ở góc trên bên phải, rồi chọn:

- **Kiểu tem** — đen trắng (mã ghi bên dưới) hoặc tem xanh có khung giống tem đang dán.
- **Số tem mỗi trang A4** — 2, 4, 6 hoặc 9.
- **In những vị trí nào** — cả kho đang chọn, tất cả các kho, hoặc chỉ những mã đang hiển thị trên màn hình.

> Nếu máy in đang bật in hai mặt mà không tắt được, hãy tích ô *"chèn trang trắng xen kẽ"*
> để mặt sau mỗi tờ luôn để trống.

Muốn in đúng một tem: mở vị trí đó rồi bấm **In tem này**.

## 6. Thêm hoặc sửa danh sách vị trí

Vào **Cài đặt → Kho & vị trí**:

- **Thêm kho** rồi dán danh sách mã vào ô bên dưới, mỗi dòng một mã (dán thẳng từ Excel được).
- Tạo nhanh một dải mã bằng mẫu: `HME{01-90}` ra HME01 đến HME90, `HME63.{1-3}` ra HME63.1 đến HME63.3.
- Bấm **Lưu danh sách**.

Sau khi sửa xong, muốn các máy khác cũng thấy danh sách mới: sang tab **Sao lưu** bấm
**Tạo file để đăng lại lên web**, rồi gửi file đó cho người quản trị trang.

## 7. Khoá để khỏi sửa nhầm

**Cài đặt → Khoá** cho phép đặt mã PIN 4–8 chữ số. Sau khi bật, mỗi lần mở app, lần đầu
vào Cài đặt sẽ phải nhập mã.

Đây chỉ là khoá chống thao tác nhầm, **không phải bảo mật** — đừng dùng lại mã PIN của
bất kỳ hệ thống nào khác.

## Gặp sự cố

| Hiện tượng | Xử lý |
|---|---|
| Máy quét không đọc được mã trên màn hình | Tăng độ sáng, bấm **Ô to hơn**, hoặc dùng **Thử 4 cỡ** |
| Mở lại app thì mất danh sách vừa thêm | Trình duyệt đang chặn lưu trữ — mở bằng Chrome, hoặc dùng Sao lưu → Xuất file .json |
| Tìm mã nhưng báo không có | Kiểm tra chính tả; nếu mã thuộc kho tạo ở máy khác, dùng Sao lưu → Nhập từ file .json |
| In ra tem quá nhỏ | Giảm số tem mỗi trang (chọn 2 hoặc 4) |
