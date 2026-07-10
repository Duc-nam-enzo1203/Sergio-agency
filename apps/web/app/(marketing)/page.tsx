import { BlogPreview } from "@/components/home/BlogPreview";
import { Capabilities } from "@/components/home/Capabilities";
import { CtaSection } from "@/components/home/CtaSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { TrustedMarquee } from "@/components/home/TrustedMarquee";
import {
  getFeaturedProjects,
  getHomeServices,
  getLatestPosts,
  getPublishedProjects,
} from "@/lib/queries";

export default async function HomePage() {
  const [services, featured, allProjects, posts] = await Promise.all([
    getHomeServices(),
    getFeaturedProjects(),
    getPublishedProjects(),
    getLatestPosts(3),
  ]);

  const bands = services.slice(0, 3).map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description ?? "",
    slug: s.slug,
  }));

  return (
    <>
      <Hero bands={bands} visualImage={featured[0]?.coverImage} />
      <TrustedMarquee
        projects={allProjects.map((p) => ({
          title: p.title,
          slug: p.slug,
        }))}
      />
      <Capabilities />
      <FeaturedProjects
        items={featured.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          description: p.description,
          coverImage: p.coverImage,
          slug: p.slug,
          color: p.color,
        }))}
      />
      <BlogPreview items={posts} />
      <CtaSection />
    </>
  );
}
