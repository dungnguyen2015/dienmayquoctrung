import LoginForm from "@/components/admin/LoginForm";
export const metadata={title:"Đăng nhập quản trị"};
export default function Login(){return <main className="container" style={{maxWidth:500,paddingTop:70}}><div className="admincard"><h1>Đăng nhập quản trị</h1><p className="muted">Chỉ dành cho tài khoản quản trị được cấp quyền.</p><LoginForm/></div></main>}
