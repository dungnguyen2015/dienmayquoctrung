import Link from "next/link";

const phone = process.env.NEXT_PUBLIC_PHONE || "0932383966";

const productCategories = [
  {
    label: "Tủ lạnh",
    href: "/tu-lanh",
    children: [
      { label: "Tủ lạnh dưới 130 lít", href: "/tu-lanh?dung-tich=duoi-130l" },
      { label: "Tủ lạnh 130–200 lít", href: "/tu-lanh?dung-tich=130-200l" },
      { label: "Tủ lạnh 200–300 lít", href: "/tu-lanh?dung-tich=200-300l" },
      { label: "Tủ lạnh trên 300 lít", href: "/tu-lanh?dung-tich=tren-300l" },
      { label: "Tủ lạnh 2 cánh", href: "/tu-lanh?loai=2-canh" },
      { label: "Tủ lạnh Side by Side", href: "/tu-lanh?loai=side-by-side" },
    ],
  },
  {
    label: "Máy giặt",
    href: "/may-giat",
    children: [
      { label: "Máy giặt cửa trên", href: "/may-giat?loai=cua-tren" },
      { label: "Máy giặt cửa trước", href: "/may-giat?loai=cua-truoc" },
      { label: "Máy giặt dưới 8 kg", href: "/may-giat?khoi-luong=duoi-8kg" },
      { label: "Máy giặt từ 8 kg trở lên", href: "/may-giat?khoi-luong=tu-8kg" },
    ],
  },
  {
    label: "Máy lạnh",
    href: "/may-lanh",
    children: [
      { label: "Máy lạnh 1 HP", href: "/may-lanh?cong-suat=1hp" },
      { label: "Máy lạnh 1.5 HP", href: "/may-lanh?cong-suat=1-5hp" },
      { label: "Máy lạnh 2 HP trở lên", href: "/may-lanh?cong-suat=tu-2hp" },
      { label: "Máy lạnh Inverter", href: "/may-lanh?cong-nghe=inverter" },
    ],
  },
  {
    label: "Điện gia dụng",
    href: "/dien-gia-dung",
    children: [
      { label: "Tivi", href: "/dien-gia-dung?t=ti-vi" },
      { label: "Lò vi sóng", href: "/dien-gia-dung?t=lo-vi-song" },
      { label: "Máy nước nóng", href: "/dien-gia-dung?t=may-nuoc-nong" },
    ],
  },
];

export default function SiteHeader() {
  return (
    <>
      <div className="qt-topbar">
        <div className="qt-container qt-topbar__inner">
          <p>Điện Máy Quốc Trung – Thiết bị điện máy cũ đã qua kiểm tra</p>
          <div className="qt-topbar__links">
            <Link href="/gioi-thieu">Giới thiệu</Link>
            <span aria-hidden="true">|</span>
            <Link href="/bai-viet">Tin tức</Link>
            <span aria-hidden="true">|</span>
            <Link href="/lien-he">Liên hệ</Link>
          </div>
        </div>
      </div>

      <header className="qt-header">
        <div className="qt-container qt-header__main">
          <Link className="qt-logo" href="/" aria-label="Điện Máy Quốc Trung - Trang chủ">
            <span className="qt-logo__mark" aria-hidden="true">QT</span>
            <span className="qt-logo__text">
              <strong>ĐIỆN MÁY</strong>
              <span>QUỐC TRUNG</span>
            </span>
          </Link>

          <form className="qt-search" action="/san-pham" role="search">
            <label className="qt-sr-only" htmlFor="qt-product-search">Tìm kiếm sản phẩm</label>
            <input
              id="qt-product-search"
              type="search"
              name="q"
              placeholder="Bạn muốn tìm tủ lạnh, máy giặt, máy lạnh..."
            />
            <button type="submit">Tìm kiếm</button>
          </form>

          <a className="qt-hotline" href={`tel:${phone}`}>
            <span className="qt-hotline__icon" aria-hidden="true">☎</span>
            <span>
              <small>Tư vấn mua hàng</small>
              <strong>{process.env.NEXT_PUBLIC_PHONE || "0932 383 966"}</strong>
            </span>
          </a>
        </div>
      </header>

      <nav className="qt-nav" aria-label="Điều hướng chính">
        <div className="qt-container qt-nav__inner">
          <Link className="qt-nav__home" href="/">Trang chủ</Link>

          <div className="qt-menu">
            <Link className="qt-menu__trigger" href="/san-pham" aria-haspopup="true">
              Sản phẩm <span className="qt-chevron" aria-hidden="true">▾</span>
            </Link>
            <div className="qt-dropdown qt-dropdown--products">
              <div className="qt-dropdown__intro">
                <strong>Danh mục sản phẩm</strong>
                <span>Chọn nhóm sản phẩm bạn đang tìm</span>
                <Link href="/san-pham">Xem tất cả sản phẩm →</Link>
              </div>
              <div className="qt-category-list">
                {productCategories.map((category) => (
                  <div className="qt-category" key={category.href}>
                    <Link className="qt-category__trigger" href={category.href} aria-haspopup="true">
                      <span>{category.label}</span>
                      <span className="qt-chevron qt-chevron--right" aria-hidden="true">›</span>
                    </Link>
                    <div className="qt-submenu">
                      <Link className="qt-submenu__title" href={category.href}>
                        Xem tất cả {category.label.toLowerCase()} →
                      </Link>
                      {category.children.map((item) => (
                        <Link key={item.href} href={item.href}>{item.label}</Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link href="/tu-lanh">Tủ lạnh</Link>
          <Link href="/may-giat">Máy giặt</Link>
          <Link href="/may-lanh">Máy lạnh</Link>
          <Link href="/dien-gia-dung">Điện gia dụng</Link>
          <Link href="/bai-viet">Tin tức</Link>
          <Link href="/lien-he">Liên hệ</Link>
        </div>
      </nav>
    </>
  );
}
