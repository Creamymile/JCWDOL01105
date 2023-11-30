'use client';

const MenuItem = ({ onClick, label }) => {
  return (
    <div
      onClick={() => onClick(label)}
      className=" px-4 py-3 transition font-semibold"
    >
      {label}
    </div>
  );
};

export default MenuItem;
