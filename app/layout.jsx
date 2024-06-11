import '@styles/globals.css'
import Provider from '@components/Provider'

export const metadata = {
  title: 'Artify',
  description: 'Discover and Share Art',
}

const Layout = ({ children }) => {
  return (
    <html lang='en'>
      <Provider>
        <body>
          <main>{children}</main>
        </body>
      </Provider>
    </html>
  )
}

export default Layout
