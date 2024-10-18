import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="mt-[4rem] min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
