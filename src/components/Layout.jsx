import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setAdmin } from '../redux/adminSlice';
import BrandingFooter from './BrandingFooter';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAdmin(localStorage.getItem('admin')));
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {!pathname.includes('treasurer') &&
        !pathname.includes('quiz') &&
        !pathname.includes('admin') &&
        !pathname.includes('editor') && <Navbar />}
      {children}
      {pathname !== '/' &&
        !pathname.includes('treasurer') &&
        !pathname.includes('quiz') &&
        !pathname.includes('admin') &&
        !pathname.includes('editor') && <Footer />}
      {pathname.includes('quiz') && <BrandingFooter />}
    </>
  );
};

export default Layout;
