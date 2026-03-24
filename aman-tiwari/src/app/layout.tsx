import 'bootstrap/dist/css/bootstrap.min.css'
import Providers from './providers'
import '@/styles/globals.scss'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
