import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Ranjeet Shirsath | Data Scientist & Applied ML Engineer",
  description:
    "Portfolio of Ranjeet Shirsath — Applied Data Scientist with 2+ years shipping sub-30ms tabular ML inference (FastAPI + LightGBM), Bayesian hyperparameter optimization (Optuna), and hybrid sparse-dense RAG systems.",
  keywords: [
    "Data Scientist",
    "Machine Learning Engineer",
    "MLOps",
    "FastAPI",
    "Optuna",
    "LightGBM",
    "PyTorch",
    "RAG",
    "Reciprocal Rank Fusion",
    "Python",
    "Docker",
    "Pune",
  ],
  authors: [{ name: "Ranjeet Shirsath", url: "https://github.com/rsshir60" }],
  creator: "Ranjeet Shirsath",
  metadataBase: new URL("https://ranjeetshirsath.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Ranjeet Shirsath | Data Scientist & Applied ML Engineer",
    description:
      "Applied Data Scientist with 2+ years architecting high-throughput ML pipelines and hybrid RAG systems.",
    siteName: "Ranjeet Shirsath Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ranjeet Shirsath | Data Scientist & Applied ML Engineer",
    description:
      "Applied Data Scientist with 2+ years architecting high-throughput ML pipelines and hybrid RAG systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-[#f1f5f9] selection:bg-sky-500/30 selection:text-sky-200">
        {/* Skip to main content link — modern-web-guidance/accessibility */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
