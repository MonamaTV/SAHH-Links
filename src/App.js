import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import firebase from 'firebase'
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Showcase from './components/Showcase';
import Howitworks from './components/HowitWorks';
import Profile from './components/Profile';
import CustomLink from './components/CustomLink';
import Upload from './components/Upload';
import PrivateRoute from './routing/PrivateRoute';
import { AuthProvider } from './auth/Auth';
import Body from './components/Body';
import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Faq from './components/Faq';
import Loading from './components/Loading';
import ChangePassword from './components/ChangePassword';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    return () => {
     firebase.auth().signOut();
    }
  }, [])
  return (
    <AuthProvider>
      <Router>
          {!loading ?
          <>
            <Header />
            <Switch>
              <Route exact path="/">
                  <Showcase />
                  <Howitworks />
                  <Body />
              </Route>
              <Route exact path="/login">
                  <Login />
              </Route>
              <Route exact path="/register">
                  <Register />
              </Route>
              <Route exact path="/faq">
                  <Faq />
              </Route>
              <Route exact path="/link/:docId">
                  <CustomLink />
              </Route>
              <Route exact path="/changepassword">
                <ChangePassword />
              </Route>
              {/* These are private routes for only the signed in accounts */}
              <PrivateRoute exact path="/upload"  component={Upload} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route exact path="*">
                  <Showcase />
              </Route>
            </Switch>
            <Footer />
          </> : <Loading />}
      </Router>
    </AuthProvider>
  );
}

export default App;
