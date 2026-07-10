import { BlogPreview } from "@/components/home/BlogPreview";
import { CtaSection } from "@/components/home/CtaSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { TrustedMarquee } from "@/components/home/TrustedMarquee";
import {
  getFeaturedProjects,
  getLatestPosts,
  getPublishedServices,
} from "@/lib/queries";

export default async function HomePage() {
  const [services, projects, posts] = await Promise.all([
    getPublishedServices(),
    getFeaturedProjects(),
    getLatestPosts(3),
  ]);

  return (
    <>
      <Hero />
      <TrustedMarquee />
      <Services
        items={services.map((s) => ({
          id: s.id,
          title: s.title,
          description: s.description ?? "",
          icon: s.icon ?? "◈",
          slug: s.slug,
        }))}
      />
      <FeaturedProjects
        items={projects.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          description: p.description,
          coverImage: p.coverImage,
          slug: p.slug,
          color: p.color,
        }))}
      />
      <Process />
      <BlogPreview items={posts} />
      <CtaSection />
    </>
  );
}
