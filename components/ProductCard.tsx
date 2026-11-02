import Link from "next/link";

export type Product = {
  id: number;
  name: string;
  slug: string;
  price: number | string;
  old_price?: number | string | null;
  image_url?: string | null;
  condition_label?: string;
  short_description?: string | null;
};

// Cho phép v nhận thêm null hoặc undefined
const money = (v?: number | string | null) =>
  new Intl.NumberFormat("vi-VN").format(Number(v || 0)) + "₫";

export default function ProductCard({ p }: { p: Product }) {
  const hasOldPrice = p.old_price && Number(p.old_price) > Number(p.price);

  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-red-300 transition-all duration-300 flex flex-col group font-sans">
      <Link href={`/san-pham/${p.slug}`} className="flex flex-col h-full">
        {/* Khung ảnh sản phẩm */}
        <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
          <img
            src={
              p.image_url ||
              "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=700&q=80"
            }
            alt={p.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Nhãn tình trạng */}
          <span className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
            {p.condition_label || "Đã qua sử dụng"}
          </span>
        </div>

        {/* Nội dung thông tin sản phẩm */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
          <div className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
              {p.name}
            </h3>

            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {p.short_description || "Liên hệ để được tư vấn tình trạng và chính sách bảo hành sản phẩm."}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between gap-2">
            <div>
              <div className="text-base sm:text-lg font-black text-red-600 tracking-tight">
                {money(p.price)}
              </div>
              {hasOldPrice && (
                <div className="text-xs text-slate-400 line-through font-medium">
                  {money(p.old_price)}
                </div>
              )}
            </div>

            <span className="text-xs font-bold text-red-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Xem chi tiết →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}