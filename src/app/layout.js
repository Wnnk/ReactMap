import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/app/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "React Map",
};

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">

      <body className={`${inter.className} ` }>
        <AppProvider >
          {children}
        </AppProvider>
        
      </body>

    </html>
  );
}
