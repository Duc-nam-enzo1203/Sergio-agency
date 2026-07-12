export const siteConfig = {
  name: "Sergio Agency",
  tagline: "Thiết kế website & landing page",
  email: "namdoan.ka@gmail.com",
  phone: "0866634302",
  address: "Hà Nội, Việt Nam",
};

export const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/dich-vu", label: "Dịch vụ" },
  { href: "/du-an", label: "Dự án" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/bai-viet", label: "Bài viết" },
  { href: "/lien-he", label: "Liên hệ" },
];

export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  process: string[];
  faq: { question: string; answer: string }[];
  priceFrom: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  content: string;
  client: string;
  year: string;
  techStack: string[];
  url?: string;
  image: string;
  images: string[];
  color: string;
  featured: boolean;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tag: string;
  readTime: string;
  image: string;
  author: string;
};

export const services: Service[] = [
  {
    id: "website",
    slug: "thiet-ke-website",
    title: "Thiết kế Website",
    description:
      "Website doanh nghiệp chuyên nghiệp, tối ưu SEO và trải nghiệm người dùng trên mọi thiết bị.",
    icon: "◈",
    features: [
      "Thiết kế UI/UX theo nhận diện thương hiệu",
      "Responsive trên mobile, tablet, desktop",
      "Tối ưu SEO on-page & tốc độ tải trang",
      "Tích hợp form liên hệ, chat, analytics",
      "CMS quản trị nội dung dễ sử dụng",
      "Bảo mật SSL, backup định kỳ",
    ],
    process: [
      "Khảo sát nhu cầu & phân tích đối thủ",
      "Wireframe & thiết kế giao diện",
      "Phát triển & tích hợp tính năng",
      "Kiểm thử & bàn giao",
    ],
    faq: [
      {
        question: "Thời gian hoàn thành một website?",
        answer:
          "Thông thường 2–4 tuần tùy quy mô và số lượng trang. Website landing đơn giản có thể hoàn thành trong 1–2 tuần.",
      },
      {
        question: "Tôi có thể tự cập nhật nội dung không?",
        answer:
          "Có. Chúng tôi tích hợp CMS hoặc admin dashboard để bạn tự quản lý bài viết, hình ảnh và thông tin.",
      },
    ],
    priceFrom: "15.000.000đ",
  },
  {
    id: "landing",
    slug: "landing-page",
    title: "Landing Page",
    description:
      "Trang đích chuyển đổi cao, tối ưu cho chiến dịch marketing và thu lead hiệu quả.",
    icon: "◇",
    features: [
      "Thiết kế tập trung vào mục tiêu chuyển đổi",
      "A/B testing ready structure",
      "Form thu lead tích hợp CRM/email",
      "Tối ưu tốc độ Core Web Vitals",
      "Tracking pixel & UTM support",
      "Deploy nhanh trên Vercel/CDN",
    ],
    process: [
      "Phân tích mục tiêu chiến dịch",
      "Thiết kế copy & layout conversion-focused",
      "Phát triển & tích hợp tracking",
      "Launch & theo dõi hiệu suất",
    ],
    faq: [
      {
        question: "Landing page khác website thế nào?",
        answer:
          "Landing page là trang đơn lẻ tập trung vào một mục tiêu cụ thể (đăng ký, mua hàng, thu lead), trong khi website có nhiều trang và mục đích tổng quát hơn.",
      },
      {
        question: "Có hỗ trợ viết nội dung không?",
        answer:
          "Có. Chúng tôi hỗ trợ viết copy hoặc tối ưu nội dung bạn cung cấp để tăng tỷ lệ chuyển đổi.",
      },
    ],
    priceFrom: "8.000.000đ",
  },
  {
    id: "branding",
    slug: "branding-ui",
    title: "Branding & UI",
    description:
      "Nhận diện thương hiệu đồng bộ, design system và giao diện mang dấu ấn riêng.",
    icon: "◎",
    features: [
      "Logo & bộ nhận diện thương hiệu",
      "Color palette & typography system",
      "UI component library",
      "Brand guidelines document",
      "Social media templates",
      "Pitch deck & presentation design",
    ],
    process: [
      "Research & moodboard",
      "Concept & iteration",
      "Finalize brand system",
      "Deliver assets & guidelines",
    ],
    faq: [
      {
        question: "Branding bao gồm những gì?",
        answer:
          "Logo, màu sắc, typography, pattern, icon set và hướng dẫn sử dụng thương hiệu trên các kênh digital và print.",
      },
      {
        question: "Có thể chỉ làm UI không làm logo?",
        answer:
          "Có. Chúng tôi linh hoạt theo nhu cầu — có thể chỉ thiết kế UI/UX dựa trên brand identity sẵn có của bạn.",
      },
    ],
    priceFrom: "12.000.000đ",
  },
  {
    id: "maintenance",
    slug: "bao-tri",
    title: "Bảo trì & Tối ưu",
    description:
      "Cập nhật nội dung, tối ưu tốc độ, bảo mật và hỗ trợ kỹ thuật lâu dài.",
    icon: "◉",
    features: [
      "Cập nhật nội dung & hình ảnh",
      "Monitoring uptime & performance",
      "Security patches & backup",
      "SEO audit & optimization hàng tháng",
      "Hỗ trợ kỹ thuật qua email/chat",
      "Báo cáo hiệu suất định kỳ",
    ],
    process: [
      "Audit website hiện tại",
      "Lập kế hoạch bảo trì",
      "Thực hiện theo SLA",
      "Báo cáo & đề xuất cải thiện",
    ],
    faq: [
      {
        question: "Gói bảo trì tính phí thế nào?",
        answer:
          "Theo gói hàng tháng từ 2.000.000đ/tháng, tùy tần suất cập nhật và mức độ hỗ trợ bạn cần.",
      },
      {
        question: "Có bảo trì website không do Sergio làm không?",
        answer:
          "Có, sau khi audit chúng tôi sẽ đánh giá và báo giá cụ thể cho website hiện có của bạn.",
      },
    ],
    priceFrom: "2.000.000đ/tháng",
  },
];

export const projects: Project[] = [
  {
    id: "1",
    slug: "nova-finance",
    title: "Nova Finance",
    category: "Landing Page",
    description:
      "Trang giới thiệu sản phẩm fintech với tỷ lệ chuyển đổi tăng 42%.",
    content:
      "Nova Finance cần một landing page thuyết phục nhà đầu tư và người dùng mới. Chúng tôi thiết kế trải nghiệm tập trung vào trust signals, social proof và CTA rõ ràng. Kết quả: tỷ lệ chuyển đổi tăng 42% sau 3 tháng launch.",
    client: "Nova Finance Co.",
    year: "2026",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    url: "https://example.com",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    ],
    color: "from-violet-500/20 to-indigo-500/10",
    featured: true,
  },
  {
    id: "2",
    slug: "bloom-studio",
    title: "Bloom Studio",
    category: "Website",
    description:
      "Website portfolio cho studio thiết kế nội thất cao cấp.",
    content:
      "Bloom Studio muốn website phản ánh đẳng cấp thương hiệu nội thất cao cấp. Chúng tôi xây dựng portfolio gallery với lazy load, filter theo phong cách và trang dự án chi tiết với storytelling mạnh mẽ.",
    client: "Bloom Interior",
    year: "2025",
    techStack: ["Next.js", "Sanity CMS", "GSAP", "Cloudinary"],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    ],
    color: "from-rose-500/20 to-orange-500/10",
    featured: true,
  },
  {
    id: "3",
    slug: "techflow-saas",
    title: "TechFlow SaaS",
    category: "Website",
    description:
      "Nền tảng SaaS B2B với dashboard và trang marketing tích hợp.",
    content:
      "TechFlow cần website marketing kết hợp product demo và pricing page cho sản phẩm SaaS B2B. Thiết kế theo phong cách modern SaaS với interactive demo sections và onboarding flow rõ ràng.",
    client: "TechFlow Inc.",
    year: "2025",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Stripe"],
    url: "https://example.com",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    ],
    color: "from-cyan-500/20 to-teal-500/10",
    featured: true,
  },
  {
    id: "4",
    slug: "greenleaf-organic",
    title: "GreenLeaf Organic",
    category: "E-commerce",
    description: "Website bán hàng thực phẩm organic với trải nghiệm mua sắm mượt.",
    content:
      "GreenLeaf cần nền tảng e-commerce cho sản phẩm organic. Tích hợp giỏ hàng, thanh toán và quản lý đơn hàng với giao diện ấm áp, gần gũi phù hợp thương hiệu xanh.",
    client: "GreenLeaf Vietnam",
    year: "2025",
    techStack: ["Next.js", "WooCommerce", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
    ],
    color: "from-green-500/20 to-emerald-500/10",
    featured: false,
  },
  {
    id: "5",
    slug: "urban-co",
    title: "Urban Co.",
    category: "Landing Page",
    description: "Landing page ra mắt bất động sản cao cấp tại trung tâm thành phố.",
    content:
      "Chiến dịch pre-launch cho dự án bất động sản Urban Co. Landing page với virtual tour embed, form đăng ký xem nhà và countdown timer tạo urgency.",
    client: "Urban Development",
    year: "2024",
    techStack: ["Next.js", "Tailwind CSS", "HubSpot"],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    ],
    color: "from-amber-500/20 to-yellow-500/10",
    featured: false,
  },
  {
    id: "6",
    slug: "pixel-labs",
    title: "Pixel Labs",
    category: "Website",
    description: "Website agency sáng tạo với animation và portfolio tương tác.",
    content:
      "Pixel Labs là agency sáng tạo cần website thể hiện năng lực thiết kế. Chúng tôi tạo trải nghiệm immersive với scroll-driven animations, case study chi tiết và team showcase.",
    client: "Pixel Labs",
    year: "2024",
    techStack: ["Next.js", "Framer Motion", "Three.js", "Vercel"],
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80",
    ],
    color: "from-purple-500/20 to-pink-500/10",
    featured: false,
  },
];

export const posts: Post[] = [
  {
    id: "1",
    slug: "7-nguyen-tac-landing-page",
    title: "7 nguyên tắc thiết kế landing page chuyển đổi cao",
    excerpt:
      "Những điều cần biết khi xây dựng trang đích cho chiến dịch marketing.",
    content: `Landing page là công cụ mạnh mẽ để chuyển đổi visitor thành khách hàng. Dưới đây là 7 nguyên tắc cốt lõi:

## 1. Một trang — một mục tiêu
Mỗi landing page chỉ nên hướng đến một hành động duy nhất: đăng ký, mua hàng, hoặc tải tài liệu.

## 2. Headline rõ ràng trong 3 giây
Người dùng quyết định ở lại hay rời đi trong vài giây đầu. Headline phải trả lời ngay: "Đây là gì?" và "Tôi được gì?".

## 3. Social proof
Testimonials, logo khách hàng, số liệu thống kê — tất cả đều tăng độ tin cậy.

## 4. CTA nổi bật
Nút call-to-action phải dễ thấy, dùng động từ hành động và tạo cảm giác urgency khi phù hợp.

## 5. Tối ưu tốc độ
Mỗi giây chậm có thể làm giảm 7% conversion rate. Tối ưu ảnh, lazy load, CDN.

## 6. Mobile-first
Hơn 60% traffic đến từ mobile. Thiết kế và test trên mobile trước.

## 7. A/B testing
Không đoán — hãy test. Thử nghiệm headline, CTA, layout để tìm phiên bản tốt nhất.`,
    date: "05/07/2026",
    tag: "Landing Page",
    readTime: "5 phút",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80",
    author: "Sergio Team",
  },
  {
    id: "2",
    slug: "website-doanh-nghiep-2026",
    title: "Website doanh nghiệp cần những gì năm 2026?",
    excerpt:
      "Xu hướng thiết kế web và công nghệ mà mọi doanh nghiệp nên cân nhắc.",
    content: `Năm 2026 đặt ra những yêu cầu mới cho website doanh nghiệp:

## Tốc độ & Core Web Vitals
Google tiếp tục ưu tiên trải nghiệm người dùng. LCP dưới 2.5s, CLS gần 0 là tiêu chuẩn tối thiểu.

## Accessibility (WCAG 2.2)
Website accessible không chỉ là đạo đức — còn mở rộng audience và cải thiện SEO.

## AI-ready content
Cấu trúc nội dung rõ ràng, schema markup giúp website hiển thị tốt trên AI search.

## Headless CMS
Linh hoạt publish đa kênh, tách biệt content và presentation.

## Sustainability
Green hosting, tối ưu carbon footprint — xu hướng ngày càng được quan tâm.`,
    date: "28/06/2026",
    tag: "Website",
    readTime: "7 phút",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    author: "Sergio Team",
  },
  {
    id: "3",
    slug: "toi-uu-toc-do-website",
    title: "Tối ưu tốc độ website: Hướng dẫn từ A-Z",
    excerpt:
      "Cách cải thiện Core Web Vitals và trải nghiệm người dùng.",
    content: `Tốc độ website ảnh hưởng trực tiếp đến conversion và SEO. Đây là checklist tối ưu:

## Hình ảnh
- Dùng WebP/AVIF
- Lazy loading
- Responsive images với srcset
- CDN cho static assets

## Code
- Code splitting
- Tree shaking
- Minify CSS/JS
- Server-side rendering khi cần

## Hosting
- Edge CDN (Vercel, Cloudflare)
- HTTP/2 hoặc HTTP/3
- Gzip/Brotli compression

## Monitoring
- Lighthouse CI
- Real User Monitoring (RUM)
- Đặt budget performance và enforce trong CI/CD`,
    date: "15/06/2026",
    tag: "Performance",
    readTime: "6 phút",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    author: "Sergio Team",
  },
  {
    id: "4",
    slug: "chon-mau-sac-thuong-hieu",
    title: "Cách chọn màu sắc cho thương hiệu digital",
    excerpt: "Psychology of color và ứng dụng trong thiết kế website.",
    content: `Màu sắc là ngôn ngữ thầm lặng của thương hiệu. Khi thiết kế website, việc chọn palette đúng giúp truyền tải giá trị và cảm xúc mong muốn.

Xanh dương gợi sự tin cậy — phù hợp fintech, healthcare. Cam và coral tạo năng lượng — tốt cho startup, creative agency. Xanh lá liên kết với sustainability — ideal cho organic, eco brands.

Quan trọng nhất: consistency. Một palette 3–5 màu chính, áp dụng đồng bộ trên web, social và print.`,
    date: "01/06/2026",
    tag: "Branding",
    readTime: "4 phút",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    author: "Sergio Team",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Khám phá & Brief",
    description:
      "Lắng nghe mục tiêu, đối tượng khách hàng và yêu cầu cụ thể của bạn.",
  },
  {
    step: "02",
    title: "Thiết kế & Prototype",
    description:
      "Wireframe, UI design và prototype tương tác để bạn duyệt trước khi code.",
  },
  {
    step: "03",
    title: "Phát triển & Tối ưu",
    description:
      "Code chuẩn, responsive, tối ưu tốc độ và SEO ngay từ đầu.",
  },
  {
    step: "04",
    title: "Bàn giao & Hỗ trợ",
    description:
      "Deploy lên server, training sử dụng và hỗ trợ sau khi go-live.",
  },
];

export const trustedLogos = [
  "Nova Finance",
  "Bloom Studio",
  "TechFlow",
  "GreenLeaf",
  "Urban Co.",
  "Pixel Labs",
];

export const projectCategories = [
  "Tất cả",
  "Website",
  "Landing Page",
  "E-commerce",
] as const;

// Helpers
export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string, limit = 2) {
  const current = getProjectBySlug(currentSlug);
  if (!current) return [];
  return projects
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit);
}

export function getRelatedPosts(currentSlug: string, limit = 2) {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];
  return posts
    .filter((p) => p.slug !== currentSlug && p.tag === current.tag)
    .slice(0, limit);
}

// Backward compat for homepage components
export const featuredProjects = projects
  .filter((p) => p.featured)
  .map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    image: p.image,
    href: `/du-an/${p.slug}`,
    color: p.color,
  }));

export const latestPosts = posts.slice(0, 3).map((p) => ({
  id: p.id,
  title: p.title,
  excerpt: p.excerpt,
  date: p.date,
  tag: p.tag,
  href: `/bai-viet/${p.slug}`,
  image: p.image,
}));

// Services with href for homepage
export const servicesWithHref = services.map((s) => ({
  ...s,
  href: `/dich-vu/${s.slug}`,
}));
