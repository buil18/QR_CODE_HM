# Lịch sử thay đổi

Định dạng theo [Keep a Changelog](https://keepachangelog.com/vi/1.1.0/).

## [1.0.0] — 2026-10-29

Bản đầu tiên đưa lên GitHub.

### Có gì
- Tra cứu vị trí theo kho, tìm một mã hoặc dán nhiều mã xuyên tất cả các kho.
- Màn hình quét phóng to, chỉnh cỡ ô, đảo màu, công cụ thử 4 cỡ.
- In tem: một tem, theo danh sách đang hiển thị, cả kho, hoặc toàn bộ các kho; 2/4/6/9 tem mỗi trang A4; hai kiểu tem.
- Quản lý kho & vị trí trong app, tạo nhanh dải mã bằng mẫu `HME{01-90}`.
- Sao lưu / khôi phục bằng file JSON; tự dựng lại file HTML kèm dữ liệu.
- Khoá cài đặt bằng mã PIN (chống sửa nhầm).
- Dữ liệu kèm sẵn: 7 kho, 376 vị trí (seed version 2).

### Hạ tầng
- Tách `data/vi-tri-kho.json` và script `tools/sync-seed.mjs` để theo dõi thay đổi dữ liệu qua Git.
- Workflow tự deploy GitHub Pages, có bước kiểm tra JSON và HTML khớp nhau.
