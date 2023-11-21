import Footer from '../src/components/Footer/Footer';
import Modal from '../src/components/Modals/Modal';
import Navbar from '../src/components/Navbar/Navbar';
import Slider from '../src/components/Slider/Slider';
import Destination from './app/Location/Destination';
import Page from './app/page';

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* <Modal actionLabel="Submit" title={'Login'} isOpen={true} /> */}
      {/* <Destination /> */}
      <Page />
      <Slider />
      <Footer />
    </div>
  );
};

export default Home;
