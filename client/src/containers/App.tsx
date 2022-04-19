import React, { lazy } from 'react';
import Navbar from '../components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthenticatedPath, UnAuthenticatedPath } from '../hocs';

const HomePage = lazy(() => import('./HomePage'));
const WeeklyPage = lazy(() => import('./Weekly'));
const LoginPage = lazy(() => import('./LoginPage'));
const FeaturedPage = lazy(() => import('./Featured'));
const GenresPage = lazy(() => import('./Genres'));
const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<UnAuthenticatedPath componnent={LoginPage} title="Login" />} />
          <Route path="/new-this-week" element={<AuthenticatedPath componnent={WeeklyPage} title="Released This Week" />} />
          <Route path="/featured-playlists" element={<AuthenticatedPath componnent={FeaturedPage} title="Featured Playlists" />} />
          <Route path="/browse-genres" element={<AuthenticatedPath componnent={GenresPage} title="Browse genres" />} />
          <Route path="/" element={<AuthenticatedPath componnent={HomePage} title="Home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
