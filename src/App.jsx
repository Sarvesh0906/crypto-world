import { Routes, Route } from 'react-router-dom';
import { Exchanges, Home, News, Cryptos, CryptoDetails, Navbar, Footer } from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Navbar Section */}
        <nav className="w-full lg:w-fit lg:h-screen sticky left-0 top-0 z-50 lg:z-0">
          <Navbar />
        </nav>

        {/* MAIN */}
        <main className="container w-screen pb-40 px-4 md:pl-6 lg:px-16 pt-4 md:pt-6 lg:pt-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/cryptocurrencies" element={<Cryptos />} />
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route path="/news" element={<News />} />
          </Routes>

          {/* Toast Notifications */}
          <ToastContainer position="top-right" autoClose={3000} />
        </main>
      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  )
}

export default App;