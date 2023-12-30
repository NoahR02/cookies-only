import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from "next/link";
import Head from "next/head";

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
    <head key="head">
      { /* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-PSPVVBTV');
        `
      }}
      />
      { /* End Google Tag Manager */}
    </head>
    <body className={inter.className}>
      { /* Google Tag Manager (noscript) */}
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PSPVVBTV" height="0" width="0" style={{ display: "none", visibility: "hidden"}}></iframe>
      </noscript>
      { /* End Google Tag Manager (noscript) */}

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
