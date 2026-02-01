import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogPostDetail from './pages/BlogPostDetail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-zen-bg text-zen-text font-sans selection:bg-zen-accent/20 selection:text-zen-accent">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<BlogPostDetail />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;