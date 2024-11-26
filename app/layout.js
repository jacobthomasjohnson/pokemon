import "./globals.css";

export const metadata = {
      title: "Pokemon Battle Sequence",
      description: "Generated by create next app",
};

export default function RootLayout({ children }) {
      return (
            <html lang="en">
                  <body>
                        <div className="flex w-full h-full items-center justify-center overflow-hidden">
                              {children}
                        </div>
                  </body>
            </html>
      );
}
