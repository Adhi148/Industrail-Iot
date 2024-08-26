import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Menubar from './Components/Menu-bar/Menubar';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import Header from './Components/Header/Header';
import { useEffect, useState, useRef } from 'react';
import Loader from './Components/Loader/Loader';
import { useSelector } from 'react-redux';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const accesstoken = useSelector((state: any) => state.user.accesstoken);
  const nodeRef = useRef(null); // Add a ref for CSSTransition

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      console.log(token);

      if (!token || accesstoken !== token) {
        navigate('/login');
      } else {
        navigate('/dashboard');
      }
    };

    validateToken().finally(() => setLoading(false));
  }, [navigate, accesstoken]);

  useEffect(() => {
    let lastActivity = Date.now();
    const checkActivity = () => {
      const now = Date.now();
      if (now - lastActivity > 600000) {
        localStorage.clear();
        navigate('/login');
      }
    };

    const handleActivity = () => {
      lastActivity = Date.now();
    };

    window.addEventListener('click', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('mousemove', handleActivity);

    const intervalId = setInterval(checkActivity, 60000);

    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
      clearInterval(intervalId);
    };
  }, [navigate]);

  useEffect(() => {
    const currentPath = location.pathname;
    sessionStorage.setItem('lastPath', currentPath);
  }, [location]);

  useEffect(() => {
    const lastPath = sessionStorage.getItem('lastPath');
    if (lastPath) {
      navigate(lastPath);
    }
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Menubar />
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.pathname}
          classNames={{
            enter: 'page-enter',
            exit: 'page-exit',
          }}
          timeout={500}
          nodeRef={nodeRef}
        >
          <Outlet />
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};

export default App;
