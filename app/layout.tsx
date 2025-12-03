import "../styles/globals.css";
import Navbar from "../components/Navbar";
import SkipToContent from "@/components/SkipToContent";
import FontControls from "@/components/FontControls";
import ContrastToggle from "@/components/ContrastToggle";
import ReadingRuler from "@/components/ReadingRuler";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import VLibrasWidget from "@/components/VLibrasWidget";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-100">
        
        <VLibrasWidget />
        <SkipToContent />
        <Navbar />

        <main id="main-content" className="flex-grow">
          {children}
        </main>

        <AccessibilityMenu>
          <FontControls />
          <ContrastToggle />
          <ReadingRuler />
        </AccessibilityMenu>
      </body>
    </html>
  );
}
