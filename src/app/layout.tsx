import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cookies Only',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
      <header className="w-[100%]">
        <nav className="bg-amber-400 w-[100%] flex place-content-start p-1"><Link className="ml-4" href="/">Home</Link></nav>
      </header>
      {children}
      <footer className="ml-auto w-[100%] flex bg-gray-900 text-gray-50 place-content-center pt-1 pb-1 pr-2">
        <Link href="mailto:noahreppert95@gmail.com"><span className="font-bold">Email:</span> noahreppert95@gmail.com</Link>
      </footer>
    </body>
    </html>
  )
}
