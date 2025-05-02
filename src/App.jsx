// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Detail from './components/Home/Detail';
import FavoritesPage from './components/Home/FavoritesPage';
import Compare from './components/Compare';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';


const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<Detail />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </ErrorBoundary>
  );
};
export default App;
