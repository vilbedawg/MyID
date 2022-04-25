import { slide as Menu } from 'react-burger-menu'
import React from 'react';
import { Link } from 'react-router-dom';
import { LoginAndRegisterButton } from './loginBtns/LoginAndRegisterButton';
import { LogoutButton } from './loginBtns/LogoutButton';
import useAuth from '../hooks/useAuth';

export default class Hamburger extends React.Component {
  showSettings (event) {
    event.preventDefault();
    
  }

  render () {
    const auth = this.props.data
    const from = window.location.pathname
      
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
        <div className='hamburger'>
          <Menu width="80%">
                <Link to="/"><h1>My<span style={{color: '#327BF6'}}>ID</span></h1></Link>
              {
                auth?.accessToken ? (
                  <>
                    {auth?.roles?.length <= 1 ? (
                          <Link to="/">Etusivu</Link>
                      )
                      : null
                    }
                  </>
                ) : null
              }

              {
                auth?.roles?.includes(5024) || auth?.roles?.includes(1922) || auth?.roles?.includes(3033)? (
                  <Link to="/transactions">Admin</Link>
                ) : null
              }
              {
                auth?.roles?.length <= 1 ? (
                    <Link to="/about">Sovelluksen käyttö</Link>
                )
                : null
              }
              
            {
            !auth?.accessToken 
            ? <LoginAndRegisterButton path={from}/>
            : <LogoutButton />
          }
          </Menu>
        </div>
    );
  }
}