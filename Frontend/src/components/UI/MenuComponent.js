import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for current path detection
import { ReactComponent as MenuSvgDefault } from '../../assets/Images/CloudMenu.svg';
import './MenuComponent.css';
//import MenuComponent from './components/UI/MenuComponent';

const MenuComponent = () => {
  const [MenuSvg, setMenuSvg] = useState(MenuSvgDefault);
  const navigate = useNavigate(); // Use the useNavigate hook for navigation
  const location = useLocation(); // Use the useLocation hook for current path detection

  useEffect(() => {
    const updateSvg = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1440) {
        import('../../assets/Images/CloudMenu_1440.svg')
          .then(({ ReactComponent }) => {
            setMenuSvg(() => ReactComponent);
          })
          .catch(err => console.error('Failed to load SVG:', err));
      } else {
        setMenuSvg(MenuSvgDefault);
      }
    };

    updateSvg();
    window.addEventListener('resize', updateSvg);

    return () => window.removeEventListener('resize', updateSvg);
  }, []);

  // Function to handle navigation to the homepage
  const goToHome = () => navigate('/');

  return (
    <div className="cloud-menu-container">
      <div className="svg-and-clickable-area">
        <MenuSvg className="menuSvg" />
        <div className="clickable-area" onClick={goToHome}></div>
      </div>
      <Link to="/about-us" className={`button om-oss ${location.pathname === '/about-us' ? 'active' : ''}`}>Om oss</Link>
      <Link to="/contact" className={`button kontakt ${location.pathname === '/contact' ? 'active' : ''}`}>Kontakt</Link>
      <Link to="/faq" className={`button vanliga-fragor ${location.pathname === '/faq' ? 'active' : ''}`}>Vanliga frågor</Link>
      <Link to="/login" className={`button logga-in ${location.pathname === '/login' ? 'active' : ''}`}>Logga in</Link>
    </div>
  );
};

export default MenuComponent;
