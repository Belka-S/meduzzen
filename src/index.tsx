import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store';

import { Auth0Provider } from '@auth0/auth0-react';

import App from './App.tsx';

import 'styles/styles.scss';

const { BASE_URL } = import.meta.env;
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename={BASE_URL}>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            audience: audience,
            redirect_uri: `${window.location.origin}/meduzzen/about`,
          }} // onRedirectCallback={() => console.log('qwe')}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
