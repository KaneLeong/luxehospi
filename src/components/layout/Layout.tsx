import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import MobileBottomNav from './MobileBottomNav'
import ScrollToTop from '@/components/shared/ScrollToTop'
import BackToTop from '@/components/shared/BackToTop'
import ToastContainer from '@/components/shared/Toast'
import { setOrganizationLd, setWebSiteLd } from '@/lib/jsonld'

export default function Layout() {
  useEffect(() => {
    setOrganizationLd()
    setWebSiteLd()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
      <BackToTop />
      <ToastContainer />
    </div>
  )
}
