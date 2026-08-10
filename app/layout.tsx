import "./globals.css";

import AuthProvider from "@/components/providers/AuthProvider";

import Footer from "@/components/layout/Footer";
import LanguageStrip from "@/components/layout/LanguageSwitcher";
import Navbar from "@/components/layout/Navbar";

import ScrollbarVisibility from "@/components/layout/ScrollbarVisibility";

export const metadata = {
  title: "Omayma Online",
  description: "Systems, automation, and thoughtful digital experiences.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <AuthProvider>
          {/* Fixed Top Area */}
          <div className="fixed top-0 z-50 w-full shadow-md">

            <LanguageStrip />

            <Navbar />

            <ScrollbarVisibility />

          </div>

          {/* Main Content */}
          <main className="pt-20">
            {children}
          </main>

          <Footer />

        </AuthProvider>
      </body>
    </html>
  );
}