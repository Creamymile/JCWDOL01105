'use client';

import Link from 'next/link';
import Search from './Search';
import Categories from './Categories';
import Menu from '../Login/Menu';

const Navbar = () => {
  return (
    <div>
      <div className="nav-container flex bg-color-pallete1 md:flex-row flex-col gap-2 justify-between md:items-center p-4  text-color-primary shadow-xl">
        <div className="font-bold p-2">
          <Link href="/">RENAFIN</Link>
        </div>
        <Search />
        <Menu />
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
