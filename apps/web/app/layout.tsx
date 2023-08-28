
import "./globals.css"
import GlobalProvider from "./GlobalProvider";
import { Navbar } from "ui";
import { Toaster } from "react-hot-toast";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      
        <GlobalProvider>
        <Navbar/>
      
      {children}
         <Toaster/>
        </GlobalProvider>
        
      </body>
    </html>
  );
}
