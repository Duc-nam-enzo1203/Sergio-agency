import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sergio Agency — Thiết kế Website & Landing Page",
  description:
    "Agency thiết kế website và landing page hiện đại. Giúp thương hiệu của bạn tỏa sáng với thiết kế đẹp mắt và công nghệ tiên tiến.",
  openGraph: {
    title: "Sergio Agency — Thiết kế Website & Landing Page",
    description:
      "Agency thiết kế website và landing page hiện đại cho doanh nghiệp và startup.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      className={`${plusJakarta.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
