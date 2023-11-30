import Head from 'next/head';

const Meta = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" type="image/png" href="/logo.png" />
    </Head>
  );
};

export default Meta;
