# Điện Máy Quốc Trung — Next.js + MySQL

Bộ khung website thương mại điện tử cho hàng điện lạnh đã qua sử dụng, dùng Next.js App Router, MySQL, API server-side và trang quản trị.

## Yêu cầu

- Node.js 20.9 trở lên (khuyến nghị phiên bản LTS đang được Next.js hỗ trợ).
- MySQL 8.x trên DigitalOcean Droplet.
- Tên miền `dienmayquoctrung.com`.
- Tài khoản Tiny Cloud nếu muốn sử dụng TinyMCE với API key riêng.

## 1. Chạy local

```bash
npm install
cp .env.example .env.local
```

Sửa `.env.local` với thông tin MySQL, `AUTH_SECRET` tối thiểu 32 ký tự và thông tin website. Trên Windows có thể sao chép `.env.example` thành `.env.local` thủ công.

Khởi tạo schema bằng tài khoản MySQL có quyền tạo database:

```bash
npm run db:init
```

Tạo mật khẩu admin ban đầu trong terminal (không commit file env này):

PowerShell:
```powershell
$env:ADMIN_EMAIL="admin@dienmayquoctrung.com"
$env:ADMIN_INITIAL_PASSWORD="MotMatKhauDai-Random-2026"
npm run admin:create
```

Linux/macOS:
```bash
ADMIN_EMAIL=admin@dienmayquoctrung.com ADMIN_INITIAL_PASSWORD='MotMatKhauDai-Random-2026' npm run admin:create
```

Sau đó:
```bash
npm run dev
```

Mở `http://localhost:3000`, đăng nhập tại `/admin-login`.

> Tạo admin cần thêm `ADMIN_INITIAL_PASSWORD` tạm thời vào môi trường chạy script. Không đưa biến này vào Vercel, Git hoặc file chia sẻ. Chỉ tạo admin từ máy quản trị có quyền DB.

## 2. MySQL trên DigitalOcean Droplet

Cài MySQL 8 trên Ubuntu theo hướng dẫn chính thức DigitalOcean/MySQL. Tạo database và tài khoản ứng dụng riêng; không dùng tài khoản `root` trong ứng dụng.

Ví dụ chạy trong MySQL với mật khẩu thay bằng chuỗi mạnh:

```sql
CREATE DATABASE dienmayquoctrung CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'dmqt_app'@'IP_MAY_CHAY_APP' IDENTIFIED BY 'MAT_KHAU_DAI_NGAU_NHIEN';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX, REFERENCES
ON dienmayquoctrung.* TO 'dmqt_app'@'IP_MAY_CHAY_APP';
FLUSH PRIVILEGES;
```

Lưu ý: với Vercel, IP outbound có thể không cố định nếu chưa cấu hình tính năng egress/static IP phù hợp. Không mở cổng 3306 cho toàn Internet (`0.0.0.0/0`). Cách an toàn hơn là dùng private networking/allowlist IP outbound cố định hoặc đặt một API/backend trung gian được bảo vệ trên Droplet. Nếu kết nối trực tiếp từ Vercel, xác minh mô hình IP outbound và TLS trước khi triển khai.

Chạy `schema.sql` bằng MySQL client hoặc:
```bash
npm run db:init
```
Lệnh `db:init` cần quyền tạo database và bảng; sau khởi tạo, tài khoản runtime nên chỉ có quyền cần thiết.

## 3. Biến môi trường Vercel

Vào Project → Settings → Environment Variables và thêm:
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- `DB_SSL=true` nếu máy chủ MySQL đã cấu hình chứng chỉ TLS phù hợp
- `AUTH_SECRET`: chuỗi bí mật ngẫu nhiên ít nhất 32 ký tự
- `NEXT_PUBLIC_SITE_URL=https://dienmayquoctrung.com`
- `NEXT_PUBLIC_PHONE=0932383966`
- `NEXT_PUBLIC_ZALO=https://zalo.me/0932383966`
- `NEXT_PUBLIC_TINYMCE_API_KEY`: API key Tiny Cloud của bạn

Không thêm `ADMIN_INITIAL_PASSWORD` vào Vercel. Không đưa secrets vào biến `NEXT_PUBLIC_*`.

## 4. Deploy Vercel

1. Đưa source lên repository Git riêng tư.
2. Import repository trong Vercel.
3. Chọn framework Next.js; build command mặc định `npm run build`.
4. Thêm biến môi trường cho Production, Preview và Development theo nhu cầu.
5. Deploy Preview để kiểm tra kết nối database, login, CRUD, SEO và biểu mẫu liên hệ.
6. Thêm `dienmayquoctrung.com` và `www.dienmayquoctrung.com` trong Project → Settings → Domains; cấu hình DNS đúng theo thông tin Vercel hiển thị.
7. Kiểm tra canonical, HTTPS, trang `/admin-login`, tạo sản phẩm và xuất bản bài viết.

## 5. TinyMCE

Admin dùng `@tinymce/tinymce-react`. Đặt `NEXT_PUBLIC_TINYMCE_API_KEY` bằng API key Tiny Cloud hợp lệ. Giá trị `no-api-key` chỉ là placeholder và có thể hiển thị cảnh báo/giới hạn theo chính sách TinyMCE. Không đưa nội dung HTML do người dùng không đáng tin cậy lên trang mà chưa lọc/sanitize. Chỉ tài khoản admin được phép sửa nội dung HTML.

## 6. SEO và nội dung

- Metadata/canonical theo URL chi tiết sản phẩm và bài viết.
- Product JSON-LD trên trang sản phẩm.
- Slug cần duy nhất, chữ thường không dấu và dấu gạch ngang.
- Viết meta title/description riêng; ảnh nên có alt phù hợp và URL ổn định.
- Nội dung HTML trong TinyMCE hiện được hiển thị như HTML do admin nhập. Trước khi mở rộng quyền biên tập, bổ sung HTML sanitizer ở phía server.
- Danh mục con hiện quản lý qua `parent_id`; có thể thêm trang listing động `/danh-muc/[slug]` cho danh mục con ở giai đoạn kế tiếp.

## 7. API có sẵn

- `POST /api/admin/login`
- `POST /api/admin/logout`
- `/api/admin/products` và `/api/admin/products/[id]`
- `/api/admin/categories` và `/api/admin/categories/[id]`
- `/api/admin/posts` và `/api/admin/posts/[id]`
- `POST /api/orders` (biểu mẫu khách hàng)

API quản trị yêu cầu cookie phiên HttpOnly ký JWT. Các thao tác ghi dữ liệu dùng prepared statements qua mysql2 và kiểm tra schema bằng Zod.

## 8. Checklist trước khi chạy thật

- Bật TLS MySQL và giới hạn kết nối nguồn; không mở cổng DB công khai.
- Đổi toàn bộ mật khẩu mặc định và tạo `AUTH_SECRET` riêng.
- Thiết lập sao lưu MySQL định kỳ, kiểm tra khôi phục.
- Bổ sung rate limiting/WAF cho login và biểu mẫu công khai.
- Cân nhắc CSRF protection cho các endpoint thay đổi dữ liệu nếu thay đổi chiến lược cookie/auth.
- Thêm HTML sanitizer cho nội dung rich text và kiểm tra URL ảnh.
- Thêm upload ảnh vào object storage (S3-compatible/Cloudinary); phiên bản này dùng URL ảnh để tránh ghi file vào filesystem serverless.
- Kiểm thử `npm run build` và toàn bộ CRUD trước khi chuyển domain chính.

## Ghi chú phạm vi

Đây là source khởi đầu có các trang storefront, API quản trị CRUD, schema và hướng dẫn deploy. Cần cấu hình hạ tầng, secrets, TLS, chống spam, upload ảnh thực, kiểm thử bảo mật và nghiệm thu thực tế trước khi dùng cho khách hàng thật.
