"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faUsers,
  faSearch,
  faEnvelope,
  faBolt,
  faChartLine,
  faCrown
} from "@fortawesome/free-solid-svg-icons";
function PremiumModal({ visible, onClose }) {
  if (!visible) return null;
  const features = [
    {
      icon: faUsers,
      text: "5 Users",
    },
    {
      icon: faSearch,
      text: "Searchability",
    },
    {
      icon: faCheckCircle,
      text: "Unlimited Basic Listings",
    },
    {
      icon: faEnvelope,
      text: "Unlimited Messages to Users With Unlocked Profiles",
    },
    {
      icon: faBolt,
      text: "VIP Members Appear First",
    },
    {
      icon: faChartLine,
      text: "Advanced Analytics",
    },
    {
      icon: faCrown,
      text: "No API Integration",
    },
  ];
  return (
    <div
      id="upgrade-modal"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white p-4 rounded-lg">
        <button
          className="text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div className="grid md:grid-cols-3 gap-6 ">

          {['Starter', 'Premium', 'Pro'].map((plan, idx) => (
            <div
              key={plan}
              className={`rounded-xl border p-6 shadow-sm flex flex-col justify-between ${idx === 1 ? 'border-purple-500 bg-purple-50' : 'bg-white'}`}
            >
              <div>
                <h3 className="text-lg font-bold flex items-center justify-between">
                  {plan}
                  {idx === 1 && (
                    <span className="text-xs text-white bg-primary px-2 py-0.5 rounded-full uppercase font-bold">
                      Most Popular
                    </span>
                  )}
                </h3>
                <p className="mt-2 text-2xl font-bold">
                  {plan === 'Pro' ? 'Contact Sales' : plan === 'Premium' ? '$25' : '$0'}
                  {plan !== 'Pro' && (
                    <span className="text-sm font-normal">/month</span>
                  )}
                </p>
                <ul className="mt-4 space-y-2">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700">
                      <FontAwesomeIcon icon={f.icon} className="text-green-500 mt-1 mr-2 w-4 h-4" />
                      {f.text}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`mt-6 w-full py-2 px-4 text-sm font-semibold rounded-lg ${idx === 1
                  ? 'bg-primary text-white'
                  : 'border border-gray-300 text-gray-700'
                  }`}
              >
                {
                  plan === 'Pro'
                    ? 'Contact Sales'
                    : plan === 'Premium'
                      ? '$25'
                      : '$0'
                }
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PremiumModal;
