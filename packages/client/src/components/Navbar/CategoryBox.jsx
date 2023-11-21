'use client';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import querystring from 'query-string';

const CategoryBox = ({ icon, label }) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    const currentQuery = new URLSearchParams(window.location.search);
    const categoryParam = currentQuery.get('category');

    const updatedQuery = {
      ...Object.fromEntries(currentQuery.entries()),
      category: label,
    };

    if (categoryParam === label) {
      delete updatedQuery.category;
    }

    const url = querystring.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true },
    );

    router.push(url);
  }, [label, router]);

  return (
    <div className="cat-container border-b">
      <div
        onClick={handleClick}
        className="flex flex-col items-center justify-center gap-2 p-3 cursor-pointer"
      >
        {icon}
        <div className="font-medium text-sm">{label}</div>
      </div>
    </div>
  );
};

export default CategoryBox;
