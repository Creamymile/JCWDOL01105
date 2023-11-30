import Link from 'next/link';

const About = () => {
  return (
    <div className="nav-about flex justify-center items-center p-2 end-2 top-2">
      <Link href="/about">About</Link>
    </div>
  );
};

export default About;
