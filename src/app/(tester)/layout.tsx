"use client";
import { FoodProvider } from "../_providers/FoodProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FoodProvider>{children}</FoodProvider>
      </body>
    </html>
  );
}
