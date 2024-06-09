import '@styles/globals.css'

export const metadata = {
  title: 'Artify',
  description: 'Discover and Share Art',
}

const Layout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

export default Layout
