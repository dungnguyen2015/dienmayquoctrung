import Link from "next/link";

const phone = process.env.NEXT_PUBLIC_PHONE || "0932383966";
const displayPhone = process.env.NEXT_PUBLIC_PHONE || "0932 383 966";
const zalo = process.env.NEXT_PUBLIC_ZALO || "https://zalo.me/0932383966";

export default function SiteFooter() {
  return (
    <footer className="qt-footer">
      <div className="qt-footer__topline" aria-hidden="true" />
      <div className="qt-container qt-footer__grid">
        <section className="qt-footer__brand" aria-labelledby="qt-footer-brand-title">
          <Link className="qt-footer__logo" href="/" aria-label="Điện Máy Quốc Trung - Trang chủ">
            <span className="qt-footer__logo-mark" aria-hidden="true">QT</span>
            <span>
              <strong id="qt-footer-brand-title">ĐIỆN MÁY QUỐC TRUNG</strong>
              <small>Điện máy cũ – chọn mua an tâm</small>
            </span>
          </Link>
          <p>
            Cung cấp thiết bị điện máy đã qua sử dụng. Thông tin và tình trạng
            sản phẩm được tư vấn theo từng sản phẩm thực tế.
          </p>
          <a className="qt-footer__cta" href={`tel:${phone}`}>☎ Gọi tư vấn: {displayPhone}</a>
        </section>

        <nav className="qt-footer__column" aria-label="Danh mục sản phẩm">
          <h2>Danh mục sản phẩm</h2>
          <ul>
            <li><Link href="/tu-lanh">Tủ lạnh cũ</Link></li>
            <li><Link href="/may-giat">Máy giặt cũ</Link></li>
            <li><Link href="/may-lanh">Máy lạnh cũ</Link></li>
            <li><Link href="/dien-gia-dung">Điện gia dụng</Link></li>
            <li><Link href="/san-pham">Tất cả sản phẩm</Link></li>
          </ul>
        </nav>

        <nav className="qt-footer__column" aria-label="Hỗ trợ khách hàng">
          <h2>Hỗ trợ khách hàng</h2>
          <ul>
            <li><Link href="/gioi-thieu">Giới thiệu cửa hàng</Link></li>
            <li><Link href="/bai-viet">Tin tức & kinh nghiệm</Link></li>
            <li><Link href="/lien-he">Liên hệ</Link></li>
            <li><Link href="/chinh-sach-bao-hanh">Chính sách bảo hành</Link></li>
            <li><Link href="/chinh-sach-doi-tra">Chính sách đổi trả</Link></li>
          </ul>
        </nav>

        <section className="qt-footer__column" aria-labelledby="qt-footer-contact-title">
          <h2 id="qt-footer-contact-title">Liên hệ mua hàng</h2>
          <p className="qt-footer__contact-label">Hotline tư vấn</p>
          <a className="qt-footer__phone" href={`tel:${phone}`}>{displayPhone}</a>
          <p>Trao đổi về tình trạng, giá bán và thông tin sản phẩm trước khi mua.</p>
          <a className="qt-footer__zalo" href={zalo} target="_blank" rel="noopener noreferrer">
            Nhắn tin qua Zalo <span aria-hidden="true">→</span>
          </a>
        </section>
      </div>

      <div className="qt-footer__bottom">
        <div className="qt-container qt-footer__bottom-inner">
          <p>© {new Date().getFullYear()} Điện Máy Quốc Trung. Bảo lưu mọi quyền.</p>
          <p>Thông tin sản phẩm có thể thay đổi theo tình trạng hàng thực tế.</p>
        </div>
      </div>
    </footer>
  );
}
