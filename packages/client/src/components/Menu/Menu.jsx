'use client';
import { List, House } from '@phosphor-icons/react';
import { useCallback, useState } from 'react';
import MenuItem from '../Navbar/MenuItem';

import { useRouter } from 'next/router';

const Menu = ({ currentUser }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    router.push('/PropertyListing');
  }, [router]);

  return (
    <div className="relative">
      <div className="side-btn flex flex-row items-center gap-3">
        <div
          onClick={onRent}
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
          <div className="flex flex-col cursor-pointer  text-color-pallete1 bg-color-primary">
            {currentUser ? (
              <>
                <MenuItem label="My reservation" />
                <MenuItem label="My favorites" />
                <MenuItem label="Rent yours" />
                <MenuItem label="My properties" />
                <hr />
                <MenuItem label="Logout" />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => router.push('/user/login')}
                />
                <MenuItem
                  label="Sign up"
                  onClick={() => router.push('user/register')}
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
