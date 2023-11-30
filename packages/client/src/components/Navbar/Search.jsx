'use client';
import { MagnifyingGlass } from '@phosphor-icons/react';

const Search = () => {
  return (
    <div className="search-container border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">Destination</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          Date
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">Add Guest</div>
          <div className="p-2 bg-color-pallete1 rounded-full text-white">
            <MagnifyingGlass size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
