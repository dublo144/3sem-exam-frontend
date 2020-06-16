import React from 'react';
import Header from './components/header';
import Routes from './config/Routes.jsx';
import { Container } from 'semantic-ui-react';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { AsyncProvider } from './contexts/AsyncContext.jsx';

function App() {
  return (
    <AuthProvider>
      <AsyncProvider>
        <Header />
        <Container>
          <Routes />
        </Container>
      </AsyncProvider>
    </AuthProvider>
  );
}

export default App;
