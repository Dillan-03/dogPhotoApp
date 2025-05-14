import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/NavBar';
import Generator from './pages/Generator';
import Favourites from './pages/Favourites';


const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main>
          <Routes>
            {/* Home page */}
            <Route path="/" element={<Generator />} />
            {/* Favourites page */}
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </main>

        {/* Using a global toast container so I dont have to keep adding it in the other files */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
};

export default App;
