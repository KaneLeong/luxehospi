import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import ProductList from '@/pages/ProductList'
import ProductDetail from '@/pages/ProductDetail'
import AboutUs from '@/pages/AboutUs'
import Contact from '@/pages/Contact'
import OEMService from '@/pages/OEMService'
import RFQ from '@/pages/RFQ'
import NotFound from '@/pages/NotFound'
import useImageLoader from '@/hooks/useImageLoader'

function AppContent() {
  useImageLoader()

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/oem-odm" element={<OEMService />} />
        <Route path="/rfq" element={<RFQ />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  )
}
