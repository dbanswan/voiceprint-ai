import { Inter } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/themeToggle";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Voiceprint AI",
  description: "Get your audio transcribed locally",
};

export default function RootLayout({ children }) {
  function toggleTheme() {
    document.body.classList.toggle("dark");
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/audio-lines.svg" />
      </head>
      <body className={inter.className}>
        <nav className="dark:text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <a href="/" className="text-2xl md:text-3xl font-bold">
              Voiceprint AI
            </a>
            <div className="flex items-center">
              <Link
                href="/"
                className="mr-4 focus:underline focus:underline-offset-2 "
              >
                Home
              </Link>
              <Link
                href="/history"
                className="mr-4 focus:underline focus:underline-offset-2"
              >
                History
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
