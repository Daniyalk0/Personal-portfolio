import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import SmoothScroll from "./components/Providers/SmoothScroll";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Daniyal Khan",
  url: "https://daniyal-devv.vercel.app",
  jobTitle: "Full-Stack Developer",
  sameAs: [
    "https://github.com/Daniyalk0",
    "https://www.linkedin.com/in/daniyal-k-648107263/?isSelfProfile=true",
  ],
};

export const metadata: Metadata = {
  title: "Daniyal Khan | Full-Stack Developer",
  description:
    "Daniyal is a full-stack developer specializing in Next.js, React, TypeScript, PostgreSQL, Prisma, and modern web applications.",
  openGraph: {
    title: "Daniyal Khan — Full-Stack Developer",
    description:
      "Full-stack developer specializing in Next.js, React, TypeScript, PostgreSQL and Prisma.",
    url: "https://daniyal-devv.vercel.app",
    siteName: "Daniyal Khan",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Daniyal Khan — Full-Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Daniyal Khan — Full-Stack Developer",
    description:
      "Full-stack developer specializing in Next.js, React, TypeScript, PostgreSQL and Prisma.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
         <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />

        <Navbar />

        <main className="flex-1">
          <SmoothScroll>{children}</SmoothScroll>
          {/* <IntroOverlay/> */}
          {/* <VintageAssistant variant="mobile-persistent" /> */}
        </main>
        <Footer />

        {/* </IntroProvider> */}
        {/* Footer goes here */}
        {/* <Footer /> */}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
