// 各役割ごとに ルートレイアウトを作成したので、このファイルは後で消す。
// ルーティング: ルート グループ | Next.js
// https://nextjs.org/docs/app/building-your-application/routing/route-groups
// 複数のルートレイアウトを作成する
// 最上位のlayout.jsファイルを削除し、layout.js各ルート グループ内にファイルを追加します。

import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren, Suspense } from "react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/Toasts/toaster";
import { getURL } from "@/utils/helpers";
import "@/styles/main.css";

const title = "Next.js Subscription Starter";
const description = "Brought to you by Vercel, Stripe, and Supabase.";

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
  },
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main
            id="skip"
            className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
          >
            {children}
          </main>
          <Footer />
          <Suspense>
            <Toaster />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
