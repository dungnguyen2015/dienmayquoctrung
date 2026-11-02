import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";
import Link from "next/link";

const phone = process.env.NEXT_PUBLIC_PHONE || "0932383966";
const displayPhone = process.env.NEXT_PUBLIC_PHONE || "0932 383 966";
const zalo = process.env.NEXT_PUBLIC_ZALO || "https://zalo.me/0932383966";

export const metadata: Metadata = {
  title: "Liên Hệ Tư Vấn Điện Máy Cũ | Điện Máy Quốc Trung",
  description: "Liên hệ Điện Máy Quốc Trung để được tư vấn mua tủ lạnh, máy giặt, máy lạnh cũ chất lượng. Hotline hỗ trợ nhanh chóng qua điện thoại và Zalo.",
  alternates: { canonical: "/lien-he" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Điện Máy Quốc Trung",
    title: "Liên Hệ | Điện Máy Quốc Trung",
    description: "Liên hệ tư vấn mua sắm thiết bị điện máy đã qua sử dụng uy tín.",
  },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1 bg-slate-50 text-slate-800 py-10 font-sans">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          {/* Breadcrumb */}
          <nav className="text-xs text-slate-500 font-medium flex items-center gap-2">
            <Link href="/" className="hover:text-red-600 transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Liên hệ</span>
          </nav>

          {/* Heading Section */}
          <div className="max-w-2xl space-y-2">
            <span className="text-red-600 font-bold text-xs tracking-widest uppercase block">
              KẾT NỐI VỚI CHÚNG TÔI
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Liên Hệ Điện Máy Quốc Trung
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Gửi yêu cầu hoặc liên hệ trực tiếp qua hotline/Zalo để được tư vấn chi tiết về tình trạng, giá bán và chính sách vận chuyển sản phẩm.
            </p>
          </div>

          {/* Grid Layout: Thông tin liên hệ & Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cột thông tin liên hệ bên trái */}
            <div className="space-y-6 lg:col-span-1">
              {/* Box Hotline & Zalo */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div className="space-y-1 border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">Hotline Tư Vấn</span>
                  <a
                    href={`tel:${phone}`}
                    className="text-2xl font-black text-slate-900 hover:text-red-600 transition-colors block"
                  >
                    {displayPhone}
                  </a>
                  <p className="text-xs text-slate-500">Hỗ trợ giải đáp thắc mắc 24/7.</p>
                </div>

                <div className="space-y-1 border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Nhắn tin Zalo</span>
                  <a
                    href={zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>💬 Chat qua Zalo nhanh</span>
                    <span aria-hidden="true">→</span>
                  </a>
                  <p className="text-xs text-slate-500">Trao đổi hình ảnh thực tế sản phẩm.</p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Khu Vực Hoạt Động</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Cung cấp và hỗ trợ giao lắp thiết bị điện máy tại TP.HCM và TP. Vinh (Nghệ An).
                  </p>
                </div>
              </div>

              {/* Cam kết */}
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100 space-y-3">
                <h3 className="font-bold text-red-900 text-sm">Cam kết từ Quốc Trung</h3>
                <ul className="space-y-2 text-xs text-red-800">
                  <li className="flex items-center gap-2">✓ Tư vấn đúng nhu cầu thực tế</li>
                  <li className="flex items-center gap-2">✓ Báo giá minh bạch, rõ ràng</li>
                  <li className="flex items-center gap-2">✓ Hỗ trợ kỹ thuật chu đáo sau mua</li>
                </ul>
              </div>
            </div>

            {/* Cột Form liên hệ bên phải */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Gửi Yêu Cầu Tư Vấn</h2>
                <p className="text-xs text-slate-500 mt-1">Điền thông tin của bạn, cửa hàng sẽ gọi lại hỗ trợ ngay lập tức.</p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}