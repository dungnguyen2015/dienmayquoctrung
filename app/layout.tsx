import type { Metadata } from "next";
import "./globals.css";
const site = process.env.NEXT_PUBLIC_SITE_URL || "https://dienmayquoctrung.com";
export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Điện Máy Quốc Trung | Điện lạnh cũ chất lượng", template: "%s | Điện Máy Quốc Trung" },
  description: "Điện Máy Quốc Trung chuyên tủ lạnh, máy giặt, máy lạnh đã qua sử dụng. Tư vấn rõ ràng, hỗ trợ giao hàng và bảo hành theo sản phẩm.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "vi_VN", siteName: "Điện Máy Quốc Trung", title: "Điện Máy Quốc Trung", description: "Thiết bị điện lạnh cũ đã kiểm tra." }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
