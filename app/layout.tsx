import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Tối ưu hóa font chữ Inter hỗ trợ tiếng Việt
const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://dienmayquoctrung.com";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Điện Máy Quốc Trung | Điện lạnh cũ chất lượng",
    template: "%s | Điện Máy Quốc Trung",
  },
  description:
    "Điện Máy Quốc Trung chuyên tủ lạnh, máy giặt, máy lạnh đã qua sử dụng. Tư vấn rõ ràng, hỗ trợ giao hàng và bảo hành theo sản phẩm.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Điện Máy Quốc Trung",
    title: "Điện Máy Quốc Trung | Điện lạnh cũ chất lượng",
    description: "Thiết bị điện lạnh cũ đã kiểm tra.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="min-h-screen bg-white text-slate-800 antialiased font-sans flex flex-col justify-between selection:bg-red-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}