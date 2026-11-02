import LoginForm from "@/components/admin/LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Đăng nhập quản trị | Điện Máy Quốc Trung",
};

export default function Login() {
  return (
    <main className="min-h-screen bg-slate-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Brand / Logo Top Header */}
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <span className="w-11 h-11 bg-red-600 text-white font-black rounded-lg flex items-center justify-center text-xl shadow-lg group-hover:bg-red-700 transition-colors">
            QT
          </span>
          <span className="flex flex-col text-left">
            <strong className="text-white font-extrabold text-lg leading-none tracking-tight">
              ĐIỆN MÁY
            </strong>
            <span className="text-red-400 text-xs font-semibold tracking-wider">
              QUỐC TRUNG
            </span>
          </span>
        </Link>
      </div>

      {/* Login Card Box */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 space-y-6">
        <div className="space-y-2 text-center">
          <span className="inline-block bg-red-50 text-red-600 border border-red-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Hệ thống quản trị
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Đăng Nhập Quản Trị
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
            Khu vực hạn chế, chỉ dành cho tài khoản quản trị được cấp quyền truy cập hệ thống.
          </p>
        </div>

        {/* Form đăng nhập từ component */}
        <div className="pt-2">
          <LoginForm />
        </div>

        {/* Footer Link Quay về */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors inline-flex items-center gap-1"
          >
            ← Quay lại trang chủ Điện Máy Quốc Trung
          </Link>
        </div>
      </div>

      {/* Copyright Footer */}
      <p className="mt-8 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Điện Máy Quốc Trung. Bản quyền thuộc về cửa hàng.
      </p>
    </main>
  );
}