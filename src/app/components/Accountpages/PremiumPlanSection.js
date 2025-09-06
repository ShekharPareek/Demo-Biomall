'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faUsers,
  faSearch,
  faEnvelope,
  faBolt,
  faChartLine,
  faCrown,
  faPlus,
  faCreditCard,
  faDownload,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function PlanBillingFAQSection() {
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

    <div className="p-6 space-y-12 max-w-6xl mx-auto">
      {/* Plans Section */}
      <div className="grid md:grid-cols-3 gap-6">
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

      {/* Billing Details */}
      <div className="border rounded-xl p-6 bg-white">
        <h4 className="text-lg font-semibold mb-4">Billing Details</h4>
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <p className="text-sm mb-2">Visa ending in 2034</p>
            <p className="text-sm">Mastercard ending in 5128</p>
          </div>
          <div>
            <button className="flex items-center text-sm bg-primary text-white px-3 py-1.5 rounded-md">
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Payment Method
            </button>
          </div>
        </div>
        <hr className="my-4" />
        <h4 className="text-md font-medium mb-2">Invoice History</h4>
        <ul className="text-sm space-y-2">
          {[
            { date: "May 2024", price: "$25.00" },
            { date: "Apr 2024", price: "$25.00" },
            { date: "Mar 2024", price: "$25.00" },
          ].map((invoice, i) => (
            <li key={i} className="flex justify-between">
              <span>{invoice.date}</span>
              <span className="text-gray-600">{invoice.price} <a href="#" className="ml-2 text-purple-600 text-xs"><FontAwesomeIcon icon={faDownload} /> Download PDF</a></span>
            </li>
          ))}
        </ul>
      </div>

      {/* Billing Address */}
      <div className="border rounded-xl p-6 bg-white">
        <h4 className="text-lg font-semibold mb-4">Billing Address</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" className="border rounded px-4 py-2 w-full" placeholder="Address" />
          <input type="text" className="border rounded px-4 py-2 w-full" placeholder="Pin code" />
          <input type="text" className="border rounded px-4 py-2 w-full" placeholder="State" />
          <input type="text" className="border rounded px-4 py-2 w-full" placeholder="City" />
          <input type="text" className="border rounded px-4 py-2 w-full" placeholder="Country" defaultValue="India" />
        </div>
        <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md text-sm">
          Edit & Update
        </button>
      </div>

      {/* FAQs */}
      <div className="border rounded-xl p-6 bg-white">
        <h4 className="text-lg font-semibold mb-4">Frequently Asked Questions</h4>
        {[
          "Can I change my plan anytime?",
          "What payment methods do you accept?",
          "Will I receive invoices for my subscription?",
          "How do I cancel my subscription?",
          "Who can I contact for support?",
        ].map((q, i) => (
          <details key={i} className="border rounded px-4 py-3 mb-2">
            <summary className="font-medium cursor-pointer flex items-center">
              <FontAwesomeIcon icon={faQuestionCircle} className="text-purple-500 mr-2" /> {q}
            </summary>
            <p className="mt-2 text-sm text-gray-600">This is a placeholder answer for the question.</p>
          </details>
        ))}
      </div>
    </div>

  );
}
