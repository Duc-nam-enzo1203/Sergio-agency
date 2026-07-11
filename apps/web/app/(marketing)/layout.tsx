import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/providers/CustomCursor";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingCTA />
    </SmoothScroll>
  );
}
