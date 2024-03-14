import { useEffect } from 'react';
import HomePage from 'pages/HomePage';
import { loadWebFonts } from 'styles/loadWebFonts';

const App = () => {
  useEffect(() => {
    loadWebFonts();
  }, []);

  return <HomePage />;
};

export default App;
