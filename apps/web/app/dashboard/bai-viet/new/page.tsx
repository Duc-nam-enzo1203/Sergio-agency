import { PostForm } from "@/components/dashboard/PostForm";

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Tạo bài viết mới</h1>
      <PostForm />
    </div>
  );
}
