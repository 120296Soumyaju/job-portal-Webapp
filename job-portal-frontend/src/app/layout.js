import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Job Portal",
  description: "Mini job portal for candidates to apply for jobs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 font-sans">
        {/* Main content */}
        <main className="pb-20">{children}</main> {/* padding so footer doesn't overlap */}

        {/* Fixed Floating Footer */}
        <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white text-center py-3 text-sm opacity-95 shadow-lg">
          🌐 Full-Stack Job Portal — ⚛️ <b>Next.js (Frontend)</b> + 🐍 <b>Django REST Framework (Backend)</b>
          <br />
          Designed & Developed by 👨‍💻{" "}
          <a
            href="https://sujit-tadadikar.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Sujit Tadadikar
          </a>
        </footer>
      </body>
    </html>
  );
}
