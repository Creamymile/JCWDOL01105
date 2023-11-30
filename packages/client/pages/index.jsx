import Navbar from '../src/components/Navbar/Navbar';
import Slider from '../src/components/Slider/Slider';
import Destination from './app/Location/Destination';
import Page from './app/page';
import Categories from '../src/components/Category/Categories';
import Footer from '../src/components/Footer/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* <Destination /> */}
      <Categories />
      <Page />
      {/* <Slider /> */}
      <Footer />
    </div>
  );
};

export default Home;
