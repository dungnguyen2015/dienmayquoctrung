import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { query } from "@/lib/db";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard, { type Product } from "@/components/ProductCard";

type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parent_id: number | null;
};

async function getCategoryData(slug: string) {
  try {
    const cats = await query<Category[]>(
      "SELECT id, name, slug, description, parent_id FROM categories WHERE slug = ? LIMIT 1",
      [slug]
    );
    const category = cats[0];
    if (!category) return null;

    let products: Product[] = [];

    if (!category.parent_id) {
      products = await query<Product[]>(
        `SELECT p.id, p.name, p.slug, p.price, p.old_price, p.image_url, p.condition_label, p.short_description 
         FROM products p 
         JOIN categories c ON p.category_id = c.id 
         WHERE p.is_published = 1 
           AND (c.id = ? OR c.parent_id = ?) 
         ORDER BY p.is_featured DESC, p.created_at DESC`,
        [category.id, category.id]
      );
    } else {
      products = await query<Product[]>(
        `SELECT id, name, slug, price, old_price, image_url, condition_label, short_description 
         FROM products 
         WHERE category_id = ? AND is_published = 1 
         ORDER BY is_featured DESC, created_at DESC`,
        [category.id]
      );
    }

    return { category, products };
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu danh mục:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCategoryData(slug);

  if (!data) {
    return { title: "Không tìm thấy danh mục | Điện Máy Quốc Trung" };
  }

  return {
    title: `${data.category.name} Giá Tốt | Điện Máy Quốc Trung`,
    description: data.category.description || `Tổng hợp ${data.category.name} đã qua kiểm định chất lượng, bảo hành uy tín.`,
    alternates: { canonical: `/danh-muc/${slug}` },
    openGraph: {
      title: `${data.category.name} | Điện Máy Quốc Trung`,
      description: data.category.description || `Thiết bị ${data.category.name} chính hãng đã qua sử dụng.`,
    },
  };
}

export const dynamic = "force-dynamic";

export default async function CategoryOrSubcategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCategoryData(slug);

  if (!data) {
    notFound();
  }

  const { category, products } = data;

  return (
    <>
      <SiteHeader />

      <main className="flex-1 bg-slate-50 text-slate-800 py-10 font-sans">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          {/* Breadcrumb */}
          <nav className="text-xs text-slate-500 font-medium flex items-center gap-2">
            <Link href="/" className="hover:text-red-600 transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/san-pham" className="hover:text-red-600 transition-colors">Danh mục</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">{category.name}</span>
          </nav>

          {/* Tiêu đề & Mô tả danh mục */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block">
              DANH MỤC SẢN PHẨM
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                {category.description}
              </p>
            )}

            {/* Thanh lọc nhanh đồng bộ với Header */}
            {slug === "tu-lanh" && (
              <div className="pt-3 flex flex-wrap gap-2 border-t border-slate-100">
                {[
                  ["Tất cả tủ lạnh", "/danh-muc/tu-lanh"],
                  ["Dưới 130 lít", "/danh-muc/tu-lanh?dung-tich=duoi-130l"],
                  ["130–200 lít", "/danh-muc/tu-lanh?dung-tich=130-200l"],
                  ["200–300 lít", "/danh-muc/tu-lanh?dung-tich=200-300l"],
                  ["Trên 300 lít", "/danh-muc/tu-lanh?dung-tich=tren-300l"],
                  ["2 cánh", "/danh-muc/tu-lanh?loai=2-canh"],
                  ["Side by Side", "/danh-muc/tu-lanh?loai=side-by-side"],
                  ["Inverter", "/danh-muc/tu-lanh?cong-nghe=inverter"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}

            {slug === "may-giat" && (
              <div className="pt-3 flex flex-wrap gap-2 border-t border-slate-100">
                {[
                  ["Tất cả máy giặt", "/danh-muc/may-giat"],
                  ["Cửa trên", "/danh-muc/may-giat?loai=cua-tren"],
                  ["Cửa trước", "/danh-muc/may-giat?loai=cua-truoc"],
                  ["Dưới 8 kg", "/danh-muc/may-giat?khoi-luong=duoi-8kg"],
                  ["Từ 8 kg trở lên", "/danh-muc/may-giat?khoi-luong=tu-8kg"],
                  ["Inverter", "/danh-muc/may-giat?cong-nghe=inverter"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}

            {slug === "may-lanh" && (
              <div className="pt-3 flex flex-wrap gap-2 border-t border-slate-100">
                {[
                  ["Tất cả máy lạnh", "/danh-muc/may-lanh"],
                  ["Máy lạnh 1 HP", "/danh-muc/may-lanh?cong-suat=1hp"],
                  ["Máy lạnh 1.5 HP", "/danh-muc/may-lanh?cong-suat=1-5hp"],
                  ["2 HP trở lên", "/danh-muc/may-lanh?cong-suat=tu-2hp"],
                  ["Inverter", "/danh-muc/may-lanh?cong-nghe=inverter"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}

            {slug === "dien-gia-dung" && (
              <div className="pt-3 flex flex-wrap gap-2 border-t border-slate-100">
                {[
                  ["Tất cả điện gia dụng", "/danh-muc/dien-gia-dung"],
                  ["Tivi", "/danh-muc/dien-gia-dung?t=ti-vi"],
                  ["Lò vi sóng", "/danh-muc/dien-gia-dung?t=lo-vi-song"],
                  ["Máy nước nóng", "/danh-muc/dien-gia-dung?t=may-nuoc-nong"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Lưới sản phẩm */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs my-8 space-y-3">
              <div className="w-12 h-12 bg-red-50 text-red-600 font-black rounded-full flex items-center justify-center text-xl mx-auto">
                📦
              </div>
              <h2 className="text-base font-bold text-slate-800">
                Danh mục chưa có sản phẩm
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Vui lòng liên hệ trực tiếp với cửa hàng để được tư vấn các mẫu sản phẩm phù hợp đang có sẵn.
              </p>
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE || "0932383966"}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm"
              >
                ☎ Gọi tư vấn ngay
              </a>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}