import Link from "next/link";
export default function SiteHeader(){return <>
  <div className="topbar"><span>Điện Máy Quốc Trung – Điện lạnh cũ đã kiểm tra</span><span>Giới thiệu　|　Bài viết　|　Liên hệ</span></div>
  <header className="header"><Link className="logo" href="/">ĐIỆN MÁY <span>QUỐC TRUNG</span></Link>
    <form className="search" action="/san-pham"><input name="q" placeholder="Tìm kiếm tủ lạnh, máy giặt, máy lạnh..." aria-label="Tìm kiếm sản phẩm"/><button type="submit">Tìm</button></form>
    <a className="hotline" href={`tel:${process.env.NEXT_PUBLIC_PHONE||"0932383966"}`}>☎ {process.env.NEXT_PUBLIC_PHONE||"0932 383 966"}</a>
  </header>
  <nav className="nav"><div className="navinner">
    <Link href="/">Trang chủ</Link><Link href="/tu-lanh">Tủ lạnh</Link><Link href="/may-giat">Máy giặt</Link><Link href="/may-lanh">Máy lạnh</Link><Link href="/dien-gia-dung">Điện gia dụng</Link><Link href="/bai-viet">Bài viết</Link><Link href="/lien-he">Liên hệ</Link>
  </div></nav>
</>}
