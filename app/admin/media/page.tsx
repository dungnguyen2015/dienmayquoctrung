import MediaLibrary from "@/components/admin/MediaLibrary";

export default function MediaPage() {
  return (
    <main className="admin-content">
      <h1>Thư viện ảnh</h1>
      <p>Quản lý ảnh được lưu trên Cloudinary.</p>
      <MediaLibrary />
    </main>
  );
}