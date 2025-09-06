// components/Testimonials.js
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const testimonials = [
  {
    stars: 5,
    text: `"LabConnect helped us find a refurbished HPLC system that saved our lab over $15,000. The platform is intuitive and the AI assistant made the process so much easier."`,
    name: 'Dr. Thomas Reed',
    title: 'University Research Lab',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
  },
  {
    stars: 4.5,
    text: `"As a supplier, LabConnect has connected us with numerous labs looking for our products. The buy/sell request feature streamlines the entire process and has increased our sales."`,
    name: 'Jennifer Lopez',
    title: 'Sales Manager, LabSupply Inc.',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg',
  },
  {
    stars: 5,
    text: `"The AI-powered search functionality is impressive. It understood exactly what we needed even when our specifications were complex. Found the perfect centrifuge within minutes!"`,
    name: 'Dr. Michael Chen',
    title: 'Biotech Startup',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
  },
];

const Testimonials = () => {
  return (
    <div id="testimonials" className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex text-yellow-400 mb-2">
              {[...Array(Math.floor(t.stars))].map((_, idx) => (
                <FontAwesomeIcon icon={faStar} key={idx} />
              ))}
              {t.stars % 1 !== 0 && <FontAwesomeIcon icon={faStarHalfAlt} />}
            </div>
            <p className="text-gray-600 italic mb-4">{t.text}</p>
            <div className="flex items-center">
              <Image
                src={t.avatar}
                alt={t.name}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <p className="font-medium text-gray-800">{t.name}</p>
                <p className="text-sm text-gray-500">{t.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Testimonials;
