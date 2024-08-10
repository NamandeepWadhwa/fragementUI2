'use client';

import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Auth,getUser } from '../../lib/auth';
import { Button } from 'react-bootstrap';
import { useEffect,useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../stateManagment/user';
import Link from 'next/link';
;


export default function RootLayout({ children }) {

 const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const fetcher = async () => {
      const user = await getUser();
      setUser(user);
     
    }
    fetcher();
    }, []);

  const onLogin = () => {
    Auth.federatedSignIn();
  };
  const onLogout = () => {
    Auth.signOut();
  };
      return (
        <html lang="en">
          <body>
            <Navbar expand="lg" className="bg-body-tertiary">
              <Navbar.Brand href="#home">Fragment UI</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Link href="/" className='mx-2'>Home</Link>
                  {user && <Link href="/userFragments">My fragment</Link>}
                </Nav>
                {!user && (
                  <Button onClick={onLogin} className="mx-3">
                    Login
                  </Button>
                )}
                {user && (
                  <Button onClick={onLogout} className="mx-3">
                    Logout
                  </Button>
                )}
              </Navbar.Collapse>
            </Navbar>

            <main>{children}</main>
          </body>
        </html>
      );
    }
