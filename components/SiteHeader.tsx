import Link from "next/link";

const phone = process.env.NEXT_PUBLIC_PHONE || "0932383966";
const displayPhone = process.env.NEXT_PUBLIC_PHONE || "0932 383 966";

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
    <header className="w-full bg-white font-sans text-slate-800 shadow-xs">
      {/* Topbar */}
      <div className="bg-red-950 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="truncate">Điện Máy Quốc Trung – Thiết bị điện máy cũ đã qua kiểm tra</p>
          <div className="hidden sm:flex items-center space-x-3 text-slate-300">
            <Link href="/gioi-thieu" className="hover:text-white transition-colors">Giới thiệu</Link>
            <span className="opacity-40">|</span>
            <Link href="/bai-viet" className="hover:text-white transition-colors">Tin tức</Link>
            <span className="opacity-40">|</span>
            <Link href="/lien-he" className="hover:text-white transition-colors">Liên hệ</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" aria-label="Điện Máy Quốc Trung - Trang chủ" className="flex items-center gap-2 group shrink-0">
          <span className="w-10 h-10 bg-red-600 text-white font-black rounded-lg flex items-center justify-center text-xl shadow-md group-hover:bg-red-700 transition-colors">
            QT
          </span>
          <span className="flex flex-col">
            <strong className="text-red-600 font-extrabold text-lg leading-none tracking-tight group-hover:text-red-700">
              ĐIỆN MÁY
            </strong>
            <span className="text-slate-700 text-xs font-semibold tracking-wider">
              QUỐC TRUNG
            </span>
          </span>
        </Link>

        {/* Search Bar */}
        <form action="/san-pham" role="search" className="flex-1 max-w-xl mx-2">
          <div className="relative flex items-center">
            <input
              id="qt-product-search"
              type="search"
              name="q"
              placeholder="Bạn muốn tìm tủ lạnh, máy giặt, máy lạnh..."
              className="w-full pl-4 pr-24 py-2 border-2 border-red-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-slate-50 focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-4 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-md transition-colors flex items-center justify-center"
            >
              Tìm kiếm
            </button>
          </div>
        </form>

        {/* Hotline */}
        <a
          href={`tel:${phone}`}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-red-200 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-red-600 shrink-0"
        >
          <span className="text-xl">☎</span>
          <span className="flex flex-col text-left">
            <small className="text-[10px] text-slate-500 uppercase font-semibold">Tư vấn mua hàng</small>
            <strong className="text-sm font-bold text-red-700 leading-tight">{displayPhone}</strong>
          </span>
        </a>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-red-600 text-white shadow-md" aria-label="Điều hướng chính">
        <div className="max-w-7xl mx-auto px-4 flex items-center font-medium text-sm">
          <Link href="/" className="py-3 px-4 hover:bg-red-700 font-semibold transition-colors">
            Trang chủ
          </Link>

          {/* Menu Danh Mục Sản Phẩm (Menu Cha) */}
          <div className="relative group/parent">
            <Link
              href="/san-pham"
              className="py-3 px-4 flex items-center gap-1 hover:bg-red-700 font-semibold transition-colors"
              aria-haspopup="true"
            >
              Danh mục sản phẩm
              <span className="text-xs transition-transform group-hover/parent:rotate-180">▾</span>
            </Link>

            {/* Dropdown Menu Cấp 1 (Danh Mục Con) */}
            <div className="absolute top-full left-0 w-56 bg-white text-slate-800 shadow-xl border border-slate-100 opacity-0 invisible group-hover/parent:opacity-100 group-hover/parent:invisible-none transition-all duration-150 z-50 rounded-b-md">
              {productCategories.map((category) => (
                <div key={category.href} className="relative group/child border-b border-slate-100 last:border-0">
                  <Link
                    href={category.href}
                    className="flex items-center justify-between px-4 py-2.5 text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <span>{category.label}</span>
                    <span className="text-xs text-slate-400 group-hover/child:text-red-600">›</span>
                  </Link>

                  {/* Dropdown Menu Cấp 2 (Danh Mục Cháu) */}
                  <div className="absolute top-0 left-full w-56 bg-white text-slate-800 shadow-xl border border-slate-100 opacity-0 invisible group-hover/child:opacity-100 group-hover/child:invisible-none transition-all duration-150 rounded-r-md">
                    <div className="p-2 border-b border-slate-100 bg-red-50/50">
                      <Link
                        href={category.href}
                        className="text-xs font-semibold text-red-600 hover:underline"
                      >
                        Xem tất cả {category.label.toLowerCase()} →
                      </Link>
                    </div>
                    {category.children.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-xs font-normal text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Category Links */}
          <div className="hidden lg:flex items-center">
            <Link href="/tu-lanh" className="py-3 px-4 hover:bg-red-700 transition-colors">Tủ lạnh</Link>
            <Link href="/may-giat" className="py-3 px-4 hover:bg-red-700 transition-colors">Máy giặt</Link>
            <Link href="/may-lanh" className="py-3 px-4 hover:bg-red-700 transition-colors">Máy lạnh</Link>
            <Link href="/dien-gia-dung" className="py-3 px-4 hover:bg-red-700 transition-colors">Điện gia dụng</Link>
            <Link href="/bai-viet" className="py-3 px-4 hover:bg-red-700 transition-colors">Tin tức</Link>
            <Link href="/lien-he" className="py-3 px-4 hover:bg-red-700 transition-colors">Liên hệ</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}