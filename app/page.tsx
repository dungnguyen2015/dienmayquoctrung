import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard, {type Product} from "@/components/ProductCard";
import {query} from "@/lib/db";
export const dynamic="force-dynamic";
export default async function Home(){
 let products:Product[]=[];
 try{products=await query<Product[]>("SELECT id,name,slug,price,old_price,image_url,condition_label,short_description FROM products WHERE is_published=1 ORDER BY is_featured DESC,created_at DESC LIMIT 8");}catch{}
 let posts:{title:string;slug:string;excerpt:string|null}[]=[];
 try{posts=await query<typeof posts>("SELECT title,slug,excerpt FROM posts WHERE status='published' ORDER BY published_at DESC,created_at DESC LIMIT 3");}catch{}
 const cats=[["Tủ lạnh","/tu-lanh","❄"],["Máy giặt","/may-giat","◉"],["Máy lạnh","/may-lanh","☼"],["Điện gia dụng","/dien-gia-dung","⌂"]];
 return <><SiteHeader/><main className="container">
  <section className="hero"><div><div className="eyebrow">Điện lạnh cũ • Tư vấn tận tâm</div><h1>Điện Máy Quốc Trung</h1><p>Chọn thiết bị điện lạnh phù hợp với nhu cầu và ngân sách của gia đình bạn.</p><div className="actions"><Link className="btn" href="/san-pham">Xem sản phẩm →</Link><a className="btn btnsecondary" href={`https://zalo.me/${process.env.NEXT_PUBLIC_PHONE||"0932383966"}`}>Tư vấn Zalo</a></div></div><img src="https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=900&q=85" alt="Thiết bị điện lạnh gia đình"/></section>
  <div className="features"><div className="feature">✓ Sản phẩm kiểm tra<small>Mô tả tình trạng rõ ràng</small></div><div className="feature">🚚 Hỗ trợ giao hàng<small>Trao đổi trước khi giao</small></div><div className="feature">🛠 Tư vấn bảo hành<small>Theo từng sản phẩm</small></div><div className="feature">☎ Tư vấn miễn phí<small>Gọi điện hoặc Zalo</small></div></div>
  <div className="sectionhead"><h2>Danh mục sản phẩm</h2></div><div className="grid">{cats.map(([name,href,icon])=><Link key={href} className="productbody" style={{border:"1px solid var(--line)",borderRadius:12,background:"#f7faff",textAlign:"center",padding:25}} href={href}><div style={{fontSize:32,color:"var(--blue)"}}>{icon}</div><strong>{name}</strong></Link>)}</div>
  <div className="sectionhead"><h2>Sản phẩm nổi bật</h2><Link href="/san-pham">Xem tất cả →</Link></div>{products.length?<div className="grid">{products.map(p=><ProductCard key={p.id} p={p}/>)}</div>:<div className="empty">Sản phẩm đang được cập nhật. Vui lòng quay lại sau hoặc liên hệ để được tư vấn.</div>}
  <div className="sectionhead"><h2>Tin tức & bài viết</h2><Link href="/bai-viet">Xem thêm →</Link></div><div className="articlelist">{posts.length?posts.map(p=><article className="article" key={p.slug}><span className="pill">Kinh nghiệm</span><h3><Link href={`/bai-viet/${p.slug}`}>{p.title}</Link></h3><p className="muted">{p.excerpt}</p><Link href={`/bai-viet/${p.slug}`}>Đọc tiếp →</Link></article>):<article className="article"><h3>Hướng dẫn chọn mua điện lạnh cũ</h3><p className="muted">Các bài viết hữu ích sẽ được cập nhật tại đây.</p></article>}</div>
 </main><SiteFooter/></>
}
