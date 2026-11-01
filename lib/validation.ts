import { z } from "zod";
export const slugSchema = z.string().trim().min(1).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ dùng chữ thường không dấu, số và dấu gạch ngang.");
export const productSchema = z.object({
  name: z.string().trim().min(2).max(220),
  slug: slugSchema,
  category_id: z.coerce.number().int().positive().nullable().optional(),
  sku: z.string().max(100).nullable().optional(),
  brand: z.string().max(120).nullable().optional(),
  price: z.coerce.number().min(0),
  old_price: z.coerce.number().min(0).nullable().optional(),
  condition_label: z.string().max(80).default("Đã qua sử dụng"),
  capacity: z.string().max(100).nullable().optional(),
  warranty: z.string().max(120).nullable().optional(),
  stock: z.coerce.number().int().min(0).default(1),
  image_url: z.string().max(2000).nullable().optional(),
  short_description: z.string().max(500).nullable().optional(),
  description: z.string().max(100000).nullable().optional(),
  is_featured: z.coerce.boolean().default(false),
  is_published: z.coerce.boolean().default(true),
  meta_title: z.string().max(255).nullable().optional(),
  image_alt: z.string().max(500).nullable().optional(),
  meta_description: z.string().max(320).nullable().optional()
});
export const categorySchema = z.object({
  name: z.string().trim().min(2).max(160),
  slug: slugSchema,
  description: z.string().max(5000).nullable().optional(),
  parent_id: z.coerce.number().int().positive().nullable().optional(),
  sort_order: z.coerce.number().int().default(0)
});
export const postSchema = z.object({
  title: z.string().trim().min(3).max(240),
  slug: slugSchema,
  excerpt: z.string().max(600).nullable().optional(),
  content: z.string().min(1).max(200000),
  image_url: z.string().max(2000).nullable().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
  meta_title: z.string().max(255).nullable().optional(),
  image_alt: z.string().max(500).nullable().optional(),
  meta_description: z.string().max(320).nullable().optional()
});
