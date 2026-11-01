import {notFound} from "next/navigation";
import {query} from "@/lib/db";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard,{type Product} from "@/components/ProductCard";
export const dynamic="force-dynamic";
export default async function Subcategory({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;
 let category:{id:number;name:string;slug:string;description:string|null}|undefined;
 let products:Product[]=[];
 try {
  const cats=await query<typeof category[]>("SELECT id,name,slug,description FROM categories WHERE slug=? LIMIT 1",[slug]);
  category=cats[0];
  if(category) products=await query<Product[]>("SELECT p.id,p.name,p.slug,p.price,p.old_price,p.image_url,p.condition_label,p.short_description FROM products p WHERE p.category_id=? AND p.is_published=1 ORDER BY p.is_featured DESC,p.created_at DESC",[category.id]);
 } catch {}
 if(!category) notFound();
 return <><SiteHeader/><main className="container"><div className="breadcrumbs"><a href="/">Trang chủ</a> / <a href="/tu-lanh">Danh mục</a> / {category.name}</div><h1>{category.name}</h1>{category.description?<p>{category.description}</p>:null}{products.length?<div className="grid">{products.map(p=><ProductCard key={p.id} p={p}/>)}</div>:<div className="empty">Danh mục chưa có sản phẩm. Vui lòng liên hệ cửa hàng để được tư vấn.</div>}</main><SiteFooter/></>;
}
