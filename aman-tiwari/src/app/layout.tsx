import 'bootstrap/dist/css/bootstrap.min.css'
import Providers from './providers'
import '@/styles/globals.scss'
import AppToaster from '@/components/common/AppToster'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AppToaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
