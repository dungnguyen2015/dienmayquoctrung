import Link from "next/link";

const phone = process.env.NEXT_PUBLIC_PHONE || "0932383966";
const displayPhone = process.env.NEXT_PUBLIC_PHONE || "0932 383 966";
const zalo = process.env.NEXT_PUBLIC_ZALO || "https://zalo.me/0932383966";

export default function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Column */}
        <section aria-labelledby="qt-footer-brand-title" className="space-y-4">
          <Link href="/" aria-label="Điện Máy Quốc Trung - Trang chủ" className="flex items-center gap-2 group">
            <span className="w-9 h-9 bg-red-600 text-white font-black rounded flex items-center justify-center text-lg shadow-sm group-hover:bg-red-700 transition-colors">
              QT
            </span>
            <span className="flex flex-col">
              <strong id="qt-footer-brand-title" className="text-white font-bold text-base leading-tight">
                ĐIỆN MÁY QUỐC TRUNG
              </strong>
              <small className="text-red-400 text-xs">Điện máy cũ – chọn mua an tâm</small>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            Cung cấp thiết bị điện máy đã qua sử dụng. Thông tin và tình trạng sản phẩm được tư vấn theo từng sản phẩm thực tế.
          </p>
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-md shadow-sm transition-colors"
          >
            ☎ Gọi tư vấn: {displayPhone}
          </a>
        </section>

        {/* Product Categories */}
        <nav aria-label="Danh mục sản phẩm" className="space-y-3">
          <h2 className="text-white font-semibold text-sm border-b border-slate-800 pb-2">
            Danh mục sản phẩm
          </h2>
          <ul className="space-y-2 text-xs">
            <li><Link href="/tu-lanh" className="hover:text-red-400 transition-colors">Tủ lạnh cũ</Link></li>
            <li><Link href="/may-giat" className="hover:text-red-400 transition-colors">Máy giặt cũ</Link></li>
            <li><Link href="/may-lanh" className="hover:text-red-400 transition-colors">Máy lạnh cũ</Link></li>
            <li><Link href="/dien-gia-dung" className="hover:text-red-400 transition-colors">Điện gia dụng</Link></li>
            <li><Link href="/san-pham" className="hover:text-red-400 transition-colors">Tất cả sản phẩm</Link></li>
          </ul>
        </nav>

        {/* Customer Support */}
        <nav aria-label="Hỗ trợ khách hàng" className="space-y-3">
          <h2 className="text-white font-semibold text-sm border-b border-slate-800 pb-2">
            Hỗ trợ khách hàng
          </h2>
          <ul className="space-y-2 text-xs">
            <li><Link href="/gioi-thieu" className="hover:text-red-400 transition-colors">Giới thiệu cửa hàng</Link></li>
            <li><Link href="/bai-viet" className="hover:text-red-400 transition-colors">Tin tức & kinh nghiệm</Link></li>
            <li><Link href="/lien-he" className="hover:text-red-400 transition-colors">Liên hệ</Link></li>
            <li><Link href="/chinh-sach-bao-hanh" className="hover:text-red-400 transition-colors">Chính sách bảo hành</Link></li>
            <li><Link href="/chinh-sach-doi-tra" className="hover:text-red-400 transition-colors">Chính sách đổi trả</Link></li>
          </ul>
        </nav>

        {/* Contact Info */}
        <section aria-labelledby="qt-footer-contact-title" className="space-y-3">
          <h2 id="qt-footer-contact-title" className="text-white font-semibold text-sm border-b border-slate-800 pb-2">
            Liên hệ mua hàng
          </h2>
          <p className="text-xs text-slate-400">Hotline tư vấn</p>
          <a href={`tel:${phone}`} className="block text-red-500 font-extrabold text-xl hover:text-red-400 transition-colors">
            {displayPhone}
          </a>
          <p className="text-xs text-slate-400 leading-relaxed">
            Trao đổi về tình trạng, giá bán và thông tin sản phẩm trước khi mua.
          </p>
          <a
            href={zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Nhắn tin qua Zalo <span aria-hidden="true">→</span>
          </a>
        </section>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800 bg-slate-950 py-4 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {new Date().getFullYear()} Điện Máy Quốc Trung. Bảo lưu mọi quyền.</p>
          <p className="text-slate-500">Thông tin sản phẩm có thể thay đổi theo tình trạng hàng thực tế.</p>
        </div>
      </div>
    </footer>
  );
}