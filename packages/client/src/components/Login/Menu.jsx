'use client';
import { List, House } from '@phosphor-icons/react';
import { useCallback, useEffect, useState } from 'react';
import MenuItem from '../Navbar/MenuItem';
import { useRouter } from 'next/router';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleClick = (label) => {
    if (label === 'Login') {
      router.push('/user/login');
    } else if (label === 'Register') {
      router.push('/user/register');
    } else if (label === 'AboutUs') {
      router.push('/about-us');
    } else if (label === 'ContactUs') {
      router.push('/contact-us');
    } else if (label === 'Profile') {
      router.push('profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="relative">
      <div className="side-btn flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full  transition cursor-pointer"
        >
          <House size={32} />
        </div>
        <div
          onClick={toggleOpen}
          className="listToggle p-4 md:py-1 md:px-2 border-[1px]  flex flex-row items-center rounded-full cursor-pointer hover:shadow-md transition"
        >
          <List size={32} />
          <div className="hidden md:block"></div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md bg-color-primary w-[170px] md:w3/4 overflow-hidden right-10 top-15 text-sm">
          <div className="flex flex-col cursor-pointer text-color-pallete1 bg-color-primary">
            {isLoggedIn ? (
              <>
                <MenuItem
                  onClick={() => handleClick('Profile')}
                  label="Profile"
                />
                <MenuItem
                  onClick={() => handleClick('About us')}
                  label="About us"
                />
                <MenuItem onClick={handleLogout} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={() => handleClick('Login')} label="Login" />
                <MenuItem
                  onClick={() => handleClick('Sign up')}
                  label="Sign up"
                />
                <MenuItem
                  onClick={() => handleClick('About us')}
                  label="About us"
                />
                <MenuItem
                  onClick={() => handleClick('Rent yours')}
                  label="Rent yours"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
