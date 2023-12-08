import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminRegistration from './components/AdminRegistration';
import GameDetail from './pages/games/GameDetail';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setLoggedInStatus] = useState(false);

  useEffect(() => {
    // Check for an existing authentication token
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      // Token found, set initial user state
      setUser({ accessToken });
      setLoggedInStatus(true); // Set isLoggedIn to true if token is found
    }
  }, []); // Empty dependency array ensures the effect runs once on mount

  const handleLogin = (userData) => {
    setUser(userData);
    // Save the access token to local storage
    localStorage.setItem('accessToken', userData.accessToken);
    setLoggedInStatus(true);
  };

  const handleLogout = () => {
    setUser(null);
    // Remove the access token from local storage
    localStorage.removeItem('accessToken');
    setLoggedInStatus(false); // Set isLoggedIn to false on logout
  };

  const handleRegister = (userData) => {
    setUser(userData);
    // Save the access token to local storage
    localStorage.setItem('accessToken', userData.accessToken);
    setLoggedInStatus(true);
  };

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} isLoggedIn={isLoggedIn} setLoggedInStatus={setLoggedInStatus} />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" render={(props) => <Login {...props} onLogin={handleLogin} setLoggedInStatus={setLoggedInStatus} />} />
        <Route path="/games/:name" component={GameDetail} />
        <Route path="/dashboard" render={(props) => <Dashboard {...props} onLogout={handleLogout} />} />
        <Route path="/register" render={(props) => <Register {...props} onRegister={handleRegister} />} />
        <Route path="/admin/register" component={AdminRegistration} />
        <Redirect from="/" to="/home" />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
