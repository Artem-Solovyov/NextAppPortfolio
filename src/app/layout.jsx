import Navbar from "@/components/navbar/Navbar";
import "@/styles/globals.scss";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ThemeProvider>
            <div className="wrapper wrapper__container">
              <Navbar />
              <main className="content">
                {children}
              </main>
              <Footer/>
            </div>
          </ThemeProvider>
      </body>
    </html>
  );
}
