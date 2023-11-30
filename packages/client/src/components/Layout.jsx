import Meta from './Meta';

const Layout = ({ children }) => {
  const pageTitle = 'Renafin App';
  const pageDescription = 'Deskripsi halaman';

  return (
    <div>
      <Meta title={pageTitle} description={pageDescription} />
      <main>{children}</main>
      {/* Merujuk ke logo yang berada di folder 'public' */}
    </div>
  );
};

export default Layout;
