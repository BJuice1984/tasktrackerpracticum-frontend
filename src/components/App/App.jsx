import React from 'react';
import { Route, Switch } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Header from '../Header/Header.jsx';
import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';
import NotFoundPage from '../NotFoundPage/NotFoundPage.jsx';
import Main from '../Main/Main.jsx';
import Profile from '../Profile/Profile.jsx';
import Project from '../Project/Project.jsx';

function App() {
  const { handleLogin, handleRegister } = useAuth();
  const [profileActive, setProfileActive] = React.useState(false);
  const [isOpenTaskCreate, setOpenTaskCreate] = React.useState(false);

  return (
    <>
      <div className='page'>
        <div className='page__container'>
          <Switch>
            <Route exact path='/'>
              <Header active={profileActive} setActive={setProfileActive} />
              <Profile active={profileActive} setActive={setProfileActive} />
              <Main />
            </Route>
            <Route exact path='/project'>
              <Header active={profileActive} setActive={setProfileActive} />
              <Profile active={profileActive} setActive={setProfileActive} />
              <Project isOpen={isOpenTaskCreate} setOpen={setOpenTaskCreate} />
            </Route>
            <Route path='/register' onRegister={handleRegister}>
              <Register />
            </Route>
            <Route path='/login' onLogin={handleLogin}>
              <Login />
            </Route>
            <Route path='*'>
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}
export default App;
