import "../styles/globals.css";
import Navbar from "../components/Navbar";
import SkipToContent from "@/components/SkipToContent";
import FontControls from "@/components/FontControls";
import ContrastToggle from "@/components/ContrastToggle";
// VLibras entra depois

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-100">
        
        <SkipToContent />
        <Navbar />

        <main id="main-content" className="flex-grow">
          {children}
        </main>

        <FontControls />
        <ContrastToggle />

      </body>
    </html>
  );
}
