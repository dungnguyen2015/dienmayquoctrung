import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const PHONE = "0932383966";
const DISPLAY_PHONE = "0932 383 966";
const ZALO = `https://zalo.me/${PHONE}`;

const categories = [
  {
    name: "Tủ lạnh",
    desc: "Tủ lạnh cũ tiết kiệm điện, đủ dung tích",
    href: "/tu-lanh",
    image:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Máy giặt",
    desc: "Máy giặt cửa trên, cửa ngang sạch sâu",
    href: "/may-giat",
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Máy lạnh",
    desc: "Máy lạnh vận hành êm, làm lạnh nhanh",
    href: "/may-lanh",
    image:
      "https://images.unsplash.com/photo-1631545806609-5c5f6c8f5f09?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Điện gia dụng",
    desc: "Thiết bị gia đình tiện ích, giá tốt",
    href: "/dien-gia-dung",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=85",
  },
];

const products = [
  {
    id: 1,
    name: "Tủ lạnh Panasonic Inverter",
    slug: "tu-lanh-panasonic-inverter",
    price: "4.500.000đ",
    oldPrice: "6.000.000đ",
    condition: "Đã kiểm tra kỹ",
    image:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=85",
    desc: "Làm lạnh tốt, vận hành ổn định, tiết kiệm điện.",
  },
  {
    id: 2,
    name: "Máy giặt cửa ngang LG",
    slug: "may-giat-cua-ngang-lg",
    price: "3.200.000đ",
    oldPrice: "4.500.000đ",
    condition: "Hoạt động tốt",
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=85",
    desc: "Giặt sạch sâu, vận hành êm ái, tiết kiệm nước.",
  },
  {
    id: 3,
    name: "Máy lạnh Daikin Inverter",
    slug: "may-lanh-daikin-inverter",
    price: "4.800.000đ",
    oldPrice: "6.500.000đ",
    condition: "Đã kiểm tra gas",
    image:
      "https://images.unsplash.com/photo-1631545806609-5c5f6c8f5f09?auto=format&fit=crop&w=600&q=85",
    desc: "Làm lạnh nhanh, công nghệ Inverter siêu tiết kiệm điện.",
  },
  {
    id: 4,
    name: "Tủ lạnh Samsung 2 cánh",
    slug: "tu-lanh-samsung-2-canh",
    price: "3.900.000đ",
    oldPrice: "5.200.000đ",
    condition: "Hình thức đẹp 90%",
    image:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=600&q=85",
    desc: "Thiết kế hiện đại, dung tích rộng rãi cho gia đình.",
  },
  {
    id: 5,
    name: "Máy giặt Toshiba",
    slug: "may-giat-toshiba",
    price: "2.400.000đ",
    oldPrice: "3.300.000đ",
    condition: "Hoạt động tốt",
    image:
      "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=600&q=85",
    desc: "Bền bỉ, dễ sử dụng, phù hợp cho gia đình nhỏ.",
  },
  {
    id: 6,
    name: "Máy lạnh Panasonic",
    slug: "may-lanh-panasonic",
    price: "3.600.000đ",
    oldPrice: "4.900.000đ",
    condition: "Đã kiểm tra",
    image:
      "https://images.unsplash.com/photo-1631545806609-5c5f6c8f5f09?auto=format&fit=crop&w=600&q=85",
    desc: "Làm lạnh sâu, hoạt động êm ái và bền theo thời gian.",
  },
  {
    id: 7,
    name: "Tủ lạnh Sharp Inverter",
    slug: "tu-lanh-sharp-inverter",
    price: "3.500.000đ",
    oldPrice: "4.600.000đ",
    condition: "Hình thức đẹp",
    image:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=85",
    desc: "Thiết kế ngăn đá dưới tiện dụng, kháng khuẩn tốt.",
  },
  {
    id: 8,
    name: "Máy giặt Electrolux",
    slug: "may-giat-electrolux",
    price: "4.100.000đ",
    oldPrice: "5.500.000đ",
    condition: "Kiểm định kỹ",
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=85",
    desc: "Giặt nước nóng, diệt khuẩn, nhiều chương trình giặt.",
  },
];

const articles = [
  {
    title: "Kinh nghiệm chọn mua tủ lạnh cũ chất lượng, bền bỉ",
    slug: "kinh-nghiem-chon-mua-tu-lanh-cu",
    desc: "Những bộ phận quan trọng cần kiểm tra kỹ trước khi quyết định mua tủ lạnh đã qua sử dụng.",
  },
  {
    title: "Nên chọn máy giặt cửa ngang hay cửa trên cho gia đình?",
    slug: "nen-chon-may-giat-cua-ngang-hay-cua-tren",
    desc: "So sánh chi tiết ưu điểm, nhược điểm của từng dòng máy giặt để đưa ra lựa chọn phù hợp nhất.",
  },
  {
    title: "Những lưu ý quan trọng khi mua và sử dụng máy lạnh cũ",
    slug: "luu-y-khi-mua-may-lanh-cu",
    desc: "Cách kiểm tra dàn lạnh, dàn nóng, lượng gas và lựa chọn công suất phù hợp diện tích phòng.",
  },
];

const benefits = [
  {
    icon: "✓",
    title: "Kiểm tra kỹ trước bán",
    desc: "Mọi sản phẩm đều được test vận hành và thông tin tình trạng minh bạch.",
  },
  {
    icon: "🚚",
    title: "Hỗ trợ giao hàng",
    desc: "Trao đổi chi phí và sắp xếp thời gian giao lắp thuận tiện.",
  },
  {
    icon: "🛡",
    title: "Chính sách bảo hành",
    desc: "Bảo hành uy tín, rõ ràng theo từng dòng sản phẩm thực tế.",
  },
  {
    icon: "☎",
    title: "Tư vấn tận tâm 24/7",
    desc: "Hỗ trợ giải đáp thắc mắc nhanh chóng qua điện thoại và Zalo.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1 bg-slate-50 text-slate-800">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-red-900 to-red-950 text-white py-16 lg:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block bg-red-800/80 text-red-200 border border-red-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                ĐIỆN MÁY QUỐC TRUNG
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Điện Máy Cũ Chất Lượng
                <span className="block text-red-400">Giá Tốt Cho Mọi Gia Đình</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Chuyên cung cấp tủ lạnh, máy giặt, máy lạnh và thiết bị điện gia dụng đã qua sử dụng đã qua kiểm định kỹ lưỡng. Cam kết thông tin minh bạch, tư vấn chân thành.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/san-pham"
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-all flex items-center gap-2"
                >
                  Khám phá sản phẩm <span>→</span>
                </Link>

                <a
                  href={`tel:${PHONE}`}
                  className="px-6 py-3 border-2 border-red-400 hover:bg-red-800/50 text-white font-bold rounded-lg transition-all"
                >
                  ☎ {DISPLAY_PHONE}
                </a>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4 text-xs sm:text-sm text-slate-300 border-t border-red-800/80">
                <div className="flex items-center gap-1.5">
                  <span className="text-red-400 font-bold">✓</span> Kiểm tra kỹ
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-red-400 font-bold">✓</span> Giá bán rõ ràng
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-red-400 font-bold">✓</span> Tư vấn tận tâm
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-red-800/40 aspect-video lg:aspect-4/3 bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1100&q=85"
                  alt="Không gian thiết bị điện máy gia đình Quốc Trung"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 hidden sm:flex flex-col bg-white text-slate-900 p-4 rounded-xl shadow-xl border border-slate-100">
                <strong className="text-red-600 text-sm font-extrabold">ĐIỆN MÁY QUỐC TRUNG</strong>
                <span className="text-xs text-slate-500 font-medium">Đồng hành cùng gia đình Việt</span>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="bg-white border-b border-slate-200 py-8 shadow-xs relative z-10">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl bg-red-50/50 border border-red-100">
                <div className="w-10 h-10 rounded-lg bg-red-600 text-white font-bold flex items-center justify-center shrink-0 text-lg shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section className="py-16 max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-red-600 font-bold text-xs tracking-widest uppercase block mb-1">
                DANH MỤC SẢN PHẨM
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Mua Sắm Theo Danh Mục
              </h2>
              <p className="text-slate-600 text-sm mt-1">Tìm nhanh thiết bị phù hợp với nhu cầu sử dụng của bạn.</p>
            </div>
            <Link
              href="/san-pham"
              className="text-red-600 hover:text-red-700 font-bold text-sm inline-flex items-center gap-1 group shrink-0"
            >
              Xem tất cả danh mục <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group bg-white rounded-xl overflow-hidden shadow-xs border border-slate-200 hover:shadow-lg hover:border-red-300 transition-all flex flex-col"
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{cat.desc}</p>
                  </div>
                  <span className="text-xs font-semibold text-red-600 mt-4 inline-flex items-center gap-1">
                    Khám phá ngay <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-red-600 font-bold text-xs tracking-widest uppercase block mb-1">
                  SẢN PHẨM ĐƯỢC QUAN TÂM
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Sản Phẩm Nổi Bật
                </h2>
                <p className="text-slate-600 text-sm mt-1">Thiết bị điện máy cũ đã qua kiểm định chất lượng nghiêm ngặt.</p>
              </div>
              <Link
                href="/san-pham"
                className="text-red-600 hover:text-red-700 font-bold text-sm inline-flex items-center gap-1 group shrink-0"
              >
                Xem tất cả sản phẩm <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden shadow-xs border border-slate-200 hover:shadow-md transition-all flex flex-col group"
                >
                  <Link
                    href={`/san-pham/${product.slug}`}
                    className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden block"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-sm">
                      {product.condition}
                    </span>
                  </Link>

                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div className="space-y-2">
                      <h3 className="font-bold text-slate-900 text-sm line-clamp-2">
                        <Link href={`/san-pham/${product.slug}`} className="hover:text-red-600 transition-colors">
                          {product.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2">{product.desc}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <strong className="text-red-600 font-extrabold text-base block">{product.price}</strong>
                        <del className="text-slate-400 text-xs">{product.oldPrice}</del>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/san-pham/${product.slug}`}
                          className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                        >
                          Chi tiết
                        </Link>
                        <a
                          href={ZALO}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
                        >
                          Zalo
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/san-pham"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-all"
              >
                Xem toàn bộ sản phẩm <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ABOUT BANNER SECTION */}
        <section className="py-16 bg-red-900 text-white">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-red-300 font-bold text-xs tracking-widest uppercase block">
                ĐIỆN MÁY QUỐC TRUNG
              </span>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight">
                Chọn Đúng Thiết Bị.
                <span className="block text-red-300">Tối Ưu Chi Phí Cho Gia Đình.</span>
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Chúng tôi chuyên cung cấp các thiết bị điện lạnh, điện gia dụng đã qua sử dụng với mức giá phù hợp ngân sách, đảm bảo thông tin minh bạch và dịch vụ hỗ trợ chu đáo trong suốt quá trình sử dụng.
              </p>
              <div>
                <Link
                  href="/gioi-thieu"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-700 hover:bg-red-50 font-bold rounded-lg shadow-md transition-all"
                >
                  Tìm hiểu về chúng tôi <span>→</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              <div className="flex items-center gap-4 bg-red-950/60 p-4 rounded-xl border border-red-800">
                <span className="text-2xl font-black text-red-400 w-8">01</span>
                <div>
                  <strong className="block text-sm font-bold">Kiểm tra sản phẩm</strong>
                  <span className="text-xs text-slate-300">Test vận hành kỹ lưỡng trước khi bán</span>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-red-950/60 p-4 rounded-xl border border-red-800">
                <span className="text-2xl font-black text-red-400 w-8">02</span>
                <div>
                  <strong className="block text-sm font-bold">Tư vấn rõ ràng</strong>
                  <span className="text-xs text-slate-300">Thông tin tình trạng thực tế minh bạch</span>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-red-950/60 p-4 rounded-xl border border-red-800">
                <span className="text-2xl font-black text-red-400 w-8">03</span>
                <div>
                  <strong className="block text-sm font-bold">Hỗ trợ sau mua hàng</strong>
                  <span className="text-xs text-slate-300">Bảo hành và đồng hành cùng khách hàng</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="py-16 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-red-600 font-bold text-xs tracking-widest uppercase block mb-1">
              MUA HÀNG ĐƠN GIẢN
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Quy Trình Mua Hàng Nhanh Chóng
            </h2>
            <p className="text-slate-600 text-sm mt-2">Chỉ với 4 bước đơn giản để lựa chọn được thiết bị ưng ý cho gia đình.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ["01", "Chọn sản phẩm", "Tham khảo các mẫu tủ lạnh, máy giặt, máy lạnh trực tuyến hoặc liên hệ trực tiếp."],
              ["02", "Liên hệ tư vấn", "Trao đổi chi tiết về nhu cầu, diện tích và nhận báo giá chính xác."],
              ["03", "Kiểm tra tình trạng", "Xem trực tiếp hoặc trao đổi thông tin hình ảnh/video thực tế của sản phẩm."],
              ["04", "Giao hàng & Bảo hành", "Hỗ trợ giao tận nơi, lắp đặt và áp dụng chính sách bảo hành uy tín."],
            ].map(([number, title, desc]) => (
              <div key={number} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs relative overflow-hidden group hover:border-red-300 transition-colors">
                <span className="absolute right-4 top-2 text-5xl font-black text-slate-100 group-hover:text-red-50 transition-colors">
                  {number}
                </span>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded inline-block mb-3">
                  Bước {number}
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-2">{title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ARTICLES SECTION */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-red-600 font-bold text-xs tracking-widest uppercase block mb-1">
                  KIẾN THỨC ĐIỆN MÁY
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Kinh Nghiệm & Tin Tức Mới
                </h2>
                <p className="text-slate-600 text-sm mt-1">Chia sẻ kiến thức chọn mua, sử dụng và bảo quản thiết bị điện lạnh.</p>
              </div>
              <Link
                href="/bai-viet"
                className="text-red-600 hover:text-red-700 font-bold text-sm inline-flex items-center gap-1 group shrink-0"
              >
                Xem tất cả bài viết <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <article key={article.slug} className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-red-300 transition-all group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span className="text-red-600">KIẾN THỨC ĐIỆN MÁY</span>
                      <span>#0{index + 1}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-red-600 transition-colors line-clamp-2">
                      <Link href={`/bai-viet/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{article.desc}</p>
                  </div>
                  <div className="pt-4 mt-6 border-t border-slate-200">
                    <Link
                      href={`/bai-viet/${article.slug}`}
                      className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 group"
                    >
                      Đọc bài viết <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-16 bg-gradient-to-r from-red-950 via-red-900 to-red-950 text-white">
          <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black">Bạn Đang Tìm Thiết Bị Điện Máy Cũ Chất Lượng?</h2>
              <p className="text-slate-300 text-sm max-w-2xl">
                Hãy liên hệ ngay với Điện Máy Quốc Trung để được tư vấn chọn mẫu sản phẩm phù hợp nhất với nhu cầu và ngân sách của gia đình bạn.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <a
                href={`tel:${PHONE}`}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-all flex items-center gap-2 text-sm"
              >
                ☎ Gọi ngay: {DISPLAY_PHONE}
              </a>
              <a
                href={ZALO}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white hover:bg-slate-100 text-red-700 font-bold rounded-lg shadow-md transition-all text-sm"
              >
                Nhắn Zalo Tư Vấn
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}