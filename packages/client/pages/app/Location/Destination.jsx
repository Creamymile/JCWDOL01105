import Image from 'next/image';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';

const Destination = () => {
  return (
    <div className="marquee">
      <h5 className="font-bold text-sm ">Featured Place</h5>
      <Marquee pauseOnHover={true} direction="right" speed={75}>
        <div className="gap-10 flex justify-center items-center">
          <img
            src="https://media.istockphoto.com/id/1488722505/id/foto/pura-ulun-danu-bratan-temple-bali-indonesia.jpg?s=612x612&w=0&k=20&c=fiXWVFvCOfvyFQgwcYYdWfUFMzucrz9jk5OchPeJmQQ="
            alt="Bali"
            width={50}
          />
          <p>Bali</p>
        </div>
        <div className="gap-10 flex justify-center items-center">
          <img
            src="https://media.istockphoto.com/id/1091640600/id/foto/jalan-layang-pasupati-yang-indah-dengan-perumahan-saat-fajar.jpg?s=612x612&w=0&k=20&c=mek8Vh4bG8njTM42Udm3ZO9f9gFa0cGzs_2J_W0DGFM="
            alt="Bandung"
            width={50}
          />
          <p>Bandung</p>
        </div>
        <div className="gap-10 flex justify-center items-center">
          <img
            src="https://media.istockphoto.com/id/490673902/id/foto/bundaran-hi-jakarta-landmark-at-night.jpg?s=612x612&w=0&k=20&c=LDuTCDWPLowFO4SHd0cO_301PX3UQm857Jtf0LLBIB4="
            alt="Jakarta"
            width={50}
          />
          <p>Jakarta</p>
        </div>
        <div className="gap-10 flex justify-center items-center">
          <img
            src="https://media.istockphoto.com/id/1200113602/id/foto/pelabuhan-labuan-bajo-warnai-sunset-twilight-indonesia.jpg?s=612x612&w=0&k=20&c=nKLkVXp1GszQWGjOqJuziD1UAYa6ZJUFZ0Whmv69WDU="
            alt="Labuan Bajo"
            width={50}
          />
          <p>Labuan Bajo</p>
        </div>
        <div className="gap-10 flex justify-center items-center ">
          <img
            src="https://media.istockphoto.com/id/1203302071/id/foto/landmark-makassar-terletak-di-pantai-losari-dan-masjid-terapung-yang-menjadi-latar-belakang.jpg?s=612x612&w=0&k=20&c=SUFhfG2pQ_DkDASSqOLtkpDzgoA-BHfJa-IjgWIk2BY="
            alt="Makassar"
            width={50}
          />
          <p>Makassar</p>
        </div>
      </Marquee>
    </div>
  );
};

export default Destination;
