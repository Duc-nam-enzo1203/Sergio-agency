import { z } from "zod";

const optionalTrimmed = z
  .string()
  .trim()
  .max(200)
  .optional()
  .or(z.literal("").transform(() => undefined));

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Họ tên phải có ít nhất 2 ký tự").max(100),
  email: z.string().trim().email("Email không hợp lệ").max(254),
  phone: optionalTrimmed,
  company: optionalTrimmed,
  service: optionalTrimmed,
  budget: optionalTrimmed,
  message: z
    .string()
    .trim()
    .min(10, "Nội dung phải có ít nhất 10 ký tự")
    .max(5000),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    password: z
      .string()
      .min(8, "Mật khẩu tối thiểu 8 ký tự")
      .max(128)
      .regex(/[A-Za-z]/, "Mật khẩu phải có chữ cái")
      .regex(/[0-9]/, "Mật khẩu phải có số"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export const postSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug không hợp lệ"),
  excerpt: z.string().trim().max(500).optional(),
  content: z.string().min(1).max(100_000),
  coverImage: z.string().trim().max(2000).optional().or(z.literal("")),
  tag: z.string().trim().max(50).optional(),
  readTime: z.string().trim().max(30).optional(),
  author: z.string().trim().max(100).optional(),
  published: z.boolean().optional(),
});

export const projectSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug không hợp lệ"),
  description: z.string().trim().max(1000).optional(),
  content: z.string().max(50_000).optional(),
  coverImage: z.string().trim().max(2000).optional().or(z.literal("")),
  images: z.array(z.string().max(2000)).max(20).optional(),
  client: z.string().trim().max(200).optional(),
  category: z.string().trim().max(100).optional(),
  year: z.string().trim().max(10).optional(),
  techStack: z.array(z.string().max(50)).max(30).optional(),
  url: z.string().trim().max(2000).optional().or(z.literal("")),
  color: z.string().trim().max(100).optional(),
  featured: z.boolean().optional(),
  order: z.number().int().min(0).max(9999).optional(),
  published: z.boolean().optional(),
});

export const settingsSchema = z.object({
  siteName: z.string().trim().min(1).max(100),
  tagline: z.string().trim().max(200).optional(),
  email: z.string().trim().max(254).optional(),
  phone: z.string().trim().max(50).optional(),
  address: z.string().trim().max(300).optional(),
  socialLinks: z.record(z.string(), z.string().max(500)).optional(),
  seoDefaults: z.record(z.string(), z.string().max(500)).optional(),
});

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
