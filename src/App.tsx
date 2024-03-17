import { useEffect } from 'react';
import SigninPage from 'pages/SigninPage';
import { loadWebFonts } from 'styles/loadWebFonts';

const App = () => {
  useEffect(() => {
    loadWebFonts();
  }, []);

  return <SigninPage />;
};

export default App;
