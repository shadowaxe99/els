import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Dashboard from './components/ButlerConsigliere/Dashboard';
import Settings from './components/ButlerConsigliere/Settings';
import GameLobby from './components/Arena/GameLobby';
import SpectatorView from './components/Arena/SpectatorView';
import ProductList from './components/Marketplace/ProductList';
import ProductDetail from './components/Marketplace/ProductDetail';
import AuthService from './services/AuthService';

function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthService.validateAuthToken()
      .then(isValid => {
        setAuth(isValid);
        setLoading(false);
      })
      .catch(() => {
        setAuth(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Navbar auth={auth} />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/settings" component={Settings} />
          <Route path="/arena" component={GameLobby} />
          <Route path="/spectate" component={SpectatorView} />
          <Route exact path="/marketplace" component={ProductList} />
          <Route path="/marketplace/:id" component={ProductDetail} />
          {/* Additional routes can be added here */}
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;