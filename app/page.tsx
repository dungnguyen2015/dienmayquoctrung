
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const PHONE = "0932383966";
const ZALO = `https://zalo.me/${PHONE}`;

const categories = [
  {
    name: "Tủ lạnh",
    desc: "Tủ lạnh cũ tiết kiệm điện",
    href: "/tu-lanh",
    image:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Máy giặt",
    desc: "Máy giặt cửa trên, cửa ngang",
    href: "/may-giat",
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Máy lạnh",
    desc: "Máy lạnh vận hành ổn định",
    href: "/may-lanh",
    image:
      "https://images.unsplash.com/photo-1631545806609-5c5f6c8f5f09?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Điện gia dụng",
    desc: "Thiết bị gia đình đa dạng",
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
    condition: "Đã kiểm tra",
    image:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=85",
    desc: "Làm lạnh tốt, vận hành ổn định.",
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
    desc: "Giặt sạch, tiết kiệm nước.",
  },
  {
    id: 3,
    name: "Máy lạnh Daikin Inverter",
    slug: "may-lanh-daikin-inverter",
    price: "4.800.000đ",
    oldPrice: "6.500.000đ",
    condition: "Đã kiểm tra",
    image:
      "https://images.unsplash.com/photo-1631545806609-5c5f6c8f5f09?auto=format&fit=crop&w=600&q=85",
    desc: "Làm lạnh nhanh, tiết kiệm điện.",
  },
  {
    id: 4,
    name: "Tủ lạnh Samsung 2 cánh",
    slug: "tu-lanh-samsung-2-canh",
    price: "3.900.000đ",
    oldPrice: "5.200.000đ",
    condition: "Hình thức đẹp",
    image:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=600&q=85",
    desc: "Thiết kế hiện đại, dung tích rộng.",
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
    desc: "Phù hợp gia đình nhỏ.",
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
    desc: "Làm lạnh ổn định, hoạt động êm.",
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
    desc: "Thiết kế tiện dụng, tiết kiệm điện.",
  },
  {
    id: 8,
    name: "Máy giặt Electrolux",
    slug: "may-giat-electrolux",
    price: "4.100.000đ",
    oldPrice: "5.500.000đ",
    condition: "Đã kiểm tra",
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=85",
    desc: "Giặt sạch, nhiều chương trình giặt.",
  },
];

const articles = [
  {
    title: "Kinh nghiệm chọn mua tủ lạnh cũ chất lượng",
    slug: "kinh-nghiem-chon-mua-tu-lanh-cu",
    desc: "Những điểm cần kiểm tra trước khi quyết định mua tủ lạnh đã qua sử dụng.",
  },
  {
    title: "Nên chọn máy giặt cửa ngang hay cửa trên?",
    slug: "nen-chon-may-giat-cua-ngang-hay-cua-tren",
    desc: "So sánh ưu điểm và hạn chế của từng dòng máy giặt để lựa chọn phù hợp.",
  },
  {
    title: "Những lưu ý khi mua máy lạnh cũ",
    slug: "luu-y-khi-mua-may-lanh-cu",
    desc: "Cách kiểm tra tình trạng máy và lựa chọn thiết bị phù hợp với gia đình.",
  },
];

const benefits = [
  {
    icon: "✓",
    title: "Kiểm tra kỹ trước khi bán",
    desc: "Thông tin tình trạng sản phẩm rõ ràng.",
  },
  {
    icon: "🚚",
    title: "Hỗ trợ giao hàng",
    desc: "Trao đổi chi phí và thời gian trước khi giao.",
  },
  {
    icon: "🛡",
    title: "Chính sách bảo hành",
    desc: "Tư vấn bảo hành theo từng sản phẩm.",
  },
  {
    icon: "☎",
    title: "Tư vấn miễn phí",
    desc: "Hỗ trợ khách hàng qua điện thoại và Zalo.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="home-page">
        {/* HERO */}
        <section className="home-hero">
          <div className="home-container hero-layout">
            <div className="hero-content">
              <span className="hero-label">
                ĐIỆN MÁY QUỐC TRUNG
              </span>

              <h1>
                Điện Máy Cũ Chất Lượng
                <span> Giá Tốt Cho Mọi Gia Đình</span>
              </h1>

              <p>
                Chuyên cung cấp tủ lạnh, máy giặt, máy lạnh
                và thiết bị điện gia dụng đã qua sử dụng.
                Sản phẩm được kiểm tra trước khi đến tay khách hàng.
              </p>

              <div className="hero-actions">
                <Link href="/san-pham" className="home-btn home-btn-red">
                  Khám phá sản phẩm <span>→</span>
                </Link>

                <a href={`tel:${PHONE}`} className="home-btn home-btn-outline">
                  ☎ {PHONE}
                </a>
              </div>

              <div className="hero-trust">
                <span>✓ Sản phẩm kiểm tra</span>
                <span>✓ Giá bán rõ ràng</span>
                <span>✓ Tư vấn tận tâm</span>
              </div>
            </div>

            <div className="hero-image-wrap">
              <div className="hero-image">
                <img
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1100&q=85"
                  alt="Không gian thiết bị điện máy gia đình"
                  fetchPriority="high"
                />
              </div>

              <div className="hero-floating">
                <strong>ĐIỆN MÁY QUỐC TRUNG</strong>
                <span>Đồng hành cùng gia đình Việt</span>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="benefit-section">
          <div className="home-container benefit-grid">
            {benefits.map((item) => (
              <div className="benefit-item" key={item.title}>
                <div className="benefit-icon">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="home-section">
          <div className="home-container">
            <div className="section-heading">
              <div>
                <span className="section-kicker">DANH MỤC SẢN PHẨM</span>
                <h2>Mua Sắm Theo Danh Mục</h2>
                <p>Tìm nhanh thiết bị phù hợp với nhu cầu sử dụng.</p>
              </div>
              <Link href="/san-pham" className="section-more">
                Xem tất cả →
              </Link>
            </div>

            <div className="category-grid">
              {categories.map((cat) => (
                <Link href={cat.href} className="category-card" key={cat.href}>
                  <div className="category-image">
                    <img src={cat.image} alt={cat.name} loading="lazy" />
                  </div>
                  <div className="category-info">
                    <h3>{cat.name}</h3>
                    <p>{cat.desc}</p>
                    <span>Khám phá →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="home-section product-section">
          <div className="home-container">
            <div className="section-heading">
              <div>
                <span className="section-kicker">SẢN PHẨM ĐƯỢC QUAN TÂM</span>
                <h2>Sản Phẩm Nổi Bật</h2>
                <p>Thiết bị điện máy đã qua sử dụng, được kiểm tra trước khi bán.</p>
              </div>
              <Link href="/san-pham" className="section-more">
                Xem tất cả →
              </Link>
            </div>

            <div className="home-product-grid">
              {products.map((product) => (
                <article className="home-product-card" key={product.id}>
                  <Link
                    href={`/san-pham/${product.slug}`}
                    className="home-product-image"
                  >
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <span className="product-condition">{product.condition}</span>
                  </Link>

                  <div className="home-product-info">
                    <h3>
                      <Link href={`/san-pham/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>

                    <p>{product.desc}</p>

                    <div className="product-price">
                      <strong>{product.price}</strong>
                      <del>{product.oldPrice}</del>
                    </div>

                    <div className="product-actions">
                      <Link href={`/san-pham/${product.slug}`}>
                        Xem chi tiết
                      </Link>
                      <a href={ZALO} target="_blank" rel="noopener noreferrer">
                        Liên hệ
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="center-action">
              <Link href="/san-pham" className="home-btn home-btn-red">
                Xem toàn bộ sản phẩm →
              </Link>
            </div>
          </div>
        </section>

        {/* ABOUT BANNER */}
        <section className="about-banner">
          <div className="home-container about-layout">
            <div>
              <span className="section-kicker">ĐIỆN MÁY QUỐC TRUNG</span>
              <h2>
                Chọn Đúng Thiết Bị.
                <span> Tiết Kiệm Chi Phí.</span>
              </h2>
              <p>
                Chúng tôi hướng đến việc mang đến những thiết bị điện máy
                phù hợp ngân sách, thông tin minh bạch và dịch vụ hỗ trợ
                chu đáo trong quá trình mua hàng.
              </p>
              <Link href="/gioi-thieu" className="home-btn home-btn-white">
                Tìm hiểu về chúng tôi →
              </Link>
            </div>

            <div className="about-points">
              <div>
                <strong>01</strong>
                <span>Kiểm tra sản phẩm</span>
              </div>
              <div>
                <strong>02</strong>
                <span>Tư vấn rõ ràng</span>
              </div>
              <div>
                <strong>03</strong>
                <span>Hỗ trợ sau mua hàng</span>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="home-section">
          <div className="home-container">
            <div className="section-heading heading-center">
              <div>
                <span className="section-kicker">MUA HÀNG ĐƠN GIẢN</span>
                <h2>Quy Trình Mua Hàng</h2>
                <p>Chỉ với vài bước để chọn được sản phẩm phù hợp.</p>
              </div>
            </div>

            <div className="process-grid">
              {[
                ["01", "Chọn sản phẩm", "Tham khảo sản phẩm và thông tin chi tiết."],
                ["02", "Liên hệ tư vấn", "Trao đổi nhu cầu và xác nhận giá bán."],
                ["03", "Kiểm tra sản phẩm", "Kiểm tra tình trạng trước khi nhận hàng."],
                ["04", "Nhận hàng", "Thống nhất giao nhận và chính sách bảo hành."],
              ].map(([number, title, desc]) => (
                <div className="process-card" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ARTICLES */}
        <section className="home-section article-section">
          <div className="home-container">
            <div className="section-heading">
              <div>
                <span className="section-kicker">KIẾN THỨC ĐIỆN MÁY</span>
                <h2>Kinh Nghiệm & Tin Tức</h2>
                <p>Chia sẻ kiến thức chọn mua và sử dụng thiết bị điện máy.</p>
              </div>
              <Link href="/bai-viet" className="section-more">
                Xem tất cả →
              </Link>
            </div>

            <div className="article-grid">
              {articles.map((article, index) => (
                <article className="home-article" key={article.slug}>
                  <div className="article-number">0{index + 1}</div>
                  <span>KIẾN THỨC ĐIỆN MÁY</span>
                  <h3>
                    <Link href={`/bai-viet/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p>{article.desc}</p>
                  <Link href={`/bai-viet/${article.slug}`} className="article-link">
                    Đọc bài viết →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="home-cta">
          <div className="home-container cta-content">
            <div>
              <h2>Bạn Đang Tìm Thiết Bị Điện Máy?</h2>
              <p>Liên hệ Điện Máy Quốc Trung để được tư vấn sản phẩm phù hợp.</p>
            </div>
            <div className="cta-actions">
              <a href={`tel:${PHONE}`} className="home-btn home-btn-white">
                ☎ Gọi {PHONE}
              </a>
              <a
                href={ZALO}
                target="_blank"
                rel="noopener noreferrer"
                className="home-btn home-btn-light"
              >
                Chat Zalo
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
