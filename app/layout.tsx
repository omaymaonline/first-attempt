import "./globals.css"

import Footer from "@/components/footer/Footer";
import LanguageStrip from "@/components/language-switcher/LanguageStrip";
import Navbar from "@/components/navbar/navbar";

import ScrollbarVisibility from "@/components/scrollbar/ScrollbarVisibility";

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


      </body>
    </html>
  );
}