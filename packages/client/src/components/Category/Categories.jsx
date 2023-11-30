'use client';
import Marquee from 'react-fast-marquee';
import {
  TreePalm,
  SwimmingPool,
  AirplaneTakeoff,
  Barbell,
  Bathtub,
  WifiHigh,
  Coffee,
  Storefront,
  PawPrint,
  Buildings,
} from '@phosphor-icons/react';
import CategoryBox from './CategoryBox';

export const categories = [
  {
    label: 'Beach',
    icon: <TreePalm size={32} />,
    description: ' This property is close to the beach',
  },
  {
    label: 'Swimming Pool',
    icon: <SwimmingPool size={32} />,
    description: ' This property has swimming pool',
  },
  {
    label: 'Airport',
    icon: <AirplaneTakeoff size={32} />,
    description: ' This property is close to the airport',
  },
  {
    label: 'Gym',
    icon: <Barbell size={32} />,
    description: ' This property has gym station',
  },
  {
    label: 'Bathtub',
    icon: <Bathtub size={32} />,
    description: ' This property has bathtub',
  },
  {
    label: 'Wifi',
    icon: <WifiHigh size={32} />,
    description: ' This property has free wifi',
  },
  {
    label: 'Coffee',
    icon: <Coffee size={32} />,
    description: ' This property has Coffee lounge',
  },
  {
    label: 'Cafetaria',
    icon: <Storefront size={32} />,
    description: ' This property has cafetaria',
  },
  {
    label: 'Pet Friendly',
    icon: <PawPrint size={32} />,
    description: ' This property is pet friendly',
  },
  {
    label: 'City',
    icon: <Buildings size={32} />,
    description: ' This property is close to the city',
  },
];

const Categories = () => {
  return (
    <Marquee pauseOnHover={true} direction="right" speed={50}>
      <div className=" pt-10 flex flex-row items-center gap-3 overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            description={item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Marquee>
  );
};

export default Categories;
