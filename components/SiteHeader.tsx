"use client";

import { useState } from "react";
import Link from "next/link";

const phone = process.env.NEXT_PUBLIC_PHONE || "0932383966";
const displayPhone = process.env.NEXT_PUBLIC_PHONE || "0932 383 966";

const productCategories = [
  {
    label: "Tủ lạnh",
    href: "/danh-muc/tu-lanh",
    children: [
      { label: "Tủ lạnh dưới 130 lít", href: "/danh-muc/tu-lanh?dung-tich=duoi-130l" },
      { label: "Tủ lạnh 130–200 lít", href: "/danh-muc/tu-lanh?dung-tich=130-200l" },
      { label: "Tủ lạnh 200–300 lít", href: "/danh-muc/tu-lanh?dung-tich=200-300l" },
      { label: "Tủ lạnh trên 300 lít", href: "/danh-muc/tu-lanh?dung-tich=tren-300l" },
      { label: "Tủ lạnh 2 cánh", href: "/danh-muc/tu-lanh?loai=2-canh" },
      { label: "Tủ lạnh Side by Side", href: "/danh-muc/tu-lanh?loai=side-by-side" },
      { label: "Tủ lạnh Inverter", href: "/danh-muc/tu-lanh?cong-nghe=inverter" },
    ],
  },
  {
    label: "Máy giặt",
    href: "/danh-muc/may-giat",
    children: [
      { label: "Máy giặt cửa trên", href: "/danh-muc/may-giat?loai=cua-tren" },
      { label: "Máy giặt cửa trước", href: "/danh-muc/may-giat?loai=cua-truoc" },
      { label: "Máy giặt dưới 8 kg", href: "/danh-muc/may-giat?khoi-luong=duoi-8kg" },
      { label: "Máy giặt từ 8 kg trở lên", href: "/danh-muc/may-giat?khoi-luong=tu-8kg" },
      { label: "Máy giặt Inverter", href: "/danh-muc/may-giat?cong-nghe=inverter" },
    ],
  },
  {
    label: "Máy lạnh",
    href: "/danh-muc/may-lanh",
    children: [
      { label: "Máy lạnh 1 HP", href: "/danh-muc/may-lanh?cong-suat=1hp" },
      { label: "Máy lạnh 1.5 HP", href: "/danh-muc/may-lanh?cong-suat=1-5hp" },
      { label: "Máy lạnh 2 HP trở lên", href: "/danh-muc/may-lanh?cong-suat=tu-2hp" },
      { label: "Máy lạnh Inverter", href: "/danh-muc/may-lanh?cong-nghe=inverter" },
    ],
  },
  {
    label: "Điện gia dụng",
    href: "/danh-muc/dien-gia-dung",
    children: [
      { label: "Tivi", href: "/danh-muc/dien-gia-dung?t=ti-vi" },
      { label: "Lò vi sóng", href: "/danh-muc/dien-gia-dung?t=lo-vi-song" },
      { label: "Máy nước nóng", href: "/danh-muc/dien-gia-dung?t=may-nuoc-nong" },
    ],
  },
];

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (label: string) => {
    setOpenCategory(openCategory === label ? null : label);
  };

  return (
    <header className="w-full bg-white font-sans text-slate-800 shadow-xs sticky top-0 z-50">
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
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 sm:gap-4">
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

        <form action="/san-pham" role="search" className="flex-1 max-w-xl">
          <div className="relative flex items-center">
            <input
              id="qt-product-search"
              type="search"
              name="q"
              placeholder="Bạn muốn tìm tủ lạnh, máy giặt..."
              className="w-full pl-3 sm:pl-4 pr-20 sm:pr-24 py-2 border-2 border-red-600 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-slate-50 focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 sm:px-4 bg-red-600 hover:bg-red-700 text-white font-medium text-xs sm:text-sm rounded-md transition-colors flex items-center justify-center"
            >
              Tìm kiếm
            </button>
          </div>
        </form>

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

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-red-600 focus:outline-none"
          aria-label="Mở danh mục menu"
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation Bar (DESKTOP) */}
      <nav className="hidden md:block bg-red-600 text-white shadow-md" aria-label="Điều hướng chính">
        <div className="max-w-7xl mx-auto px-4 flex items-center font-medium text-sm">
          <Link href="/" className="py-3 px-5 hover:bg-red-700 font-semibold transition-colors">
            Trang chủ
          </Link>

          <div className="relative group/parent">
            <Link
              href="/san-pham"
              className="py-3 px-5 flex items-center gap-1.5 hover:bg-red-700 font-bold bg-red-700/40 transition-colors"
              aria-haspopup="true"
            >
              <span>DANH MỤC SẢN PHẨM</span>
              <span className="text-xs transition-transform group-hover/parent:rotate-180">▾</span>
            </Link>

            <div className="absolute top-full left-0 w-60 bg-white text-slate-800 shadow-2xl border border-slate-100 opacity-0 invisible group-hover/parent:opacity-100 group-hover/parent:visible transition-all duration-200 z-50 rounded-b-md">
              {productCategories.map((category) => (
                <div key={category.href} className="relative group/child border-b border-slate-100 last:border-0">
                  <Link
                    href={category.href}
                    className="flex items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <span>{category.label}</span>
                    <span className="text-xs text-slate-400 group-hover/child:text-red-600 font-bold">›</span>
                  </Link>

                  <div className="absolute top-0 left-full w-64 bg-white text-slate-800 shadow-2xl border border-slate-100 opacity-0 invisible group-hover/child:opacity-100 group-hover/child:visible transition-all duration-200 rounded-r-md">
                    <div className="p-2.5 border-b border-slate-100 bg-red-50">
                      <Link
                        href={category.href}
                        className="text-xs font-bold text-red-600 hover:underline flex items-center justify-between"
                      >
                        <span>Xem tất cả {category.label.toLowerCase()}</span>
                        <span>→</span>
                      </Link>
                    </div>
                    <div className="py-1">
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
                </div>
              ))}
            </div>
          </div>

          <Link href="/gioi-thieu" className="py-3 px-5 hover:bg-red-700 transition-colors">Giới thiệu</Link>
          <Link href="/bai-viet" className="py-3 px-5 hover:bg-red-700 transition-colors">Tin tức & Kinh nghiệm</Link>
          <Link href="/lien-he" className="py-3 px-5 hover:bg-red-700 transition-colors">Liên hệ</Link>
        </div>
      </nav>

      {/* Navigation Drawer (MOBILE) */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-slate-900 text-white border-t border-red-700" aria-label="Điều hướng di động">
          <div className="p-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold hover:text-red-400"
            >
              Trang chủ
            </Link>

            <div className="border-t border-slate-800 pt-2">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
                Danh mục sản phẩm
              </div>
              
              {productCategories.map((category) => (
                <div key={category.href} className="border-b border-slate-800/60 last:border-0">
                  <div className="flex items-center justify-between py-2.5">
                    <Link
                      href={category.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium text-slate-200 hover:text-white"
                    >
                      {category.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.label)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <span className="text-xs">{openCategory === category.label ? "▲" : "▼"}</span>
                    </button>
                  </div>

                  {openCategory === category.label && (
                    <div className="pl-4 pb-2 space-y-1.5 bg-slate-950/40 rounded-md my-1 py-2">
                      <Link
                        href={category.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xs font-bold text-red-400 py-1"
                      >
                        Xem tất cả {category.label.toLowerCase()} →
                      </Link>
                      {category.children.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-xs text-slate-400 hover:text-white py-1"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2 text-sm text-slate-300">
              <Link href="/gioi-thieu" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-white">Giới thiệu</Link>
              <Link href="/bai-viet" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-white">Tin tức</Link>
              <Link href="/lien-he" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-white">Liên hệ</Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}