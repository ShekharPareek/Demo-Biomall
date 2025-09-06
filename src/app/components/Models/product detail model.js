'use client';
// import Header from './components/header';
// import Footer from './components/footer';
import React, { useState } from 'react';
export default function productModel({ product, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('Specifications');
  // const [isOpen, setIsOpen] = useState(false);
  const tabs = ['Specifications', 'Description', 'Safety Data', 'Publications', 'Reviews'];
  if (!isOpen || !product) return null;
  return (
    <>
      {/* <Header /> */}
      {/* Main content */}
      <div className={`fixed inset-0 backdrop-blur-sm bg-black/30 z-40 transition-all duration-300 ${isOpen ? '' : 'pointer-events-none'}`}>
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={onClose}
        />

        {/* Slide-in Panel */}
        <div
          className={`fixed top-3 right-0 h-[calc(100%-1.5rem)] bg-white shadow-xl w-full sm:w-[900px] transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}
        >
          <button
            className="absolute top-4 right-4 text-xl font-bold"
            onClick={onClose}
          >
            &times;
          </button>

          <div class="relative z-10 mt-4" aria-labelledby="modal-title {`side-panel ${isOpen ? 'open' : ''}`}" role="dialog" aria-modal="true">
            <button onClick={onClose}>Close</button>
            <main id="main-content" className="flex-1 ml-0  p-4 md:p-6 ">
              <div className="w-full">
                {/* <!-- Breadcrumb Navigation --> */}
                {/* <div id="breadcrumb" className="flex items-center text-sm text-gray-500 mb-6">
            <span className="hover:text-primary cursor-pointer">Home</span>
            <i className="fa-solid fa-chevron-right text-xs mx-2"></i>
            <span className="hover:text-primary cursor-pointer">Browse Products</span>
            <i className="fa-solid fa-chevron-right text-xs mx-2"></i>
            <span className="text-gray-700 font-medium">Sodium Chloride Reagent Grade</span>
          </div> */}

                {/* <!-- Product Detail Section --> */}
                <div id="product-detail" className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* <!-- Product Image --> */}
                    <div
                      id="product-image"
                      className="p-6 flex items-center justify-center bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100"
                    >
                      <div className="w-full max-w-xs">
                        <img
                          className="w-full h-auto rounded-lg shadow-sm"
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/1213789a12-4334db8f919d7567d7b8.png"
                          alt="lab chemical reagent sodium chloride bottle with white powder, professional product photography on white background"
                        />
                        <div className="flex justify-center mt-4 space-x-2">
                          <button className="w-3 h-3 bg-primary rounded-full"></button>
                          <button className="w-3 h-3 bg-gray-300 rounded-full"></button>
                          <button className="w-3 h-3 bg-gray-300 rounded-full"></button>
                          <button className="w-3 h-3 bg-gray-300 rounded-full"></button>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Product Info --> */}
                    <div id="product-info" className="p-6 md:col-span-2">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h1 className="text-2xl font-bold text-gray-800 mb-2">Sodium Chloride Reagent Grade</h1>
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <span className="font-medium text-gray-700 mr-2">Catalog #: SC-1234</span>
                            <span className="mx-2">|</span>
                            <span>CAS: 7647-14-5</span>
                            <span className="mx-2">|</span>
                            <span>
                              Brand: <span className="font-medium text-primary">LabPure</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-400 hover:text-primary border border-gray-200 rounded-full">
                            <i className="fa-regular fa-bookmark"></i>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-primary border border-gray-200 rounded-full">
                            <i className="fa-solid fa-share-alt"></i>
                          </button>
                        </div>
                      </div>

                      <div id="product-description" className="mb-6">
                        <p className="text-gray-600">
                          High purity sodium chloride (NaCl) suitable for laboratory and research applications. This reagent grade sodium chloride meets ACS specifications with 99.5% purity and is ideal for preparing buffers, cell culture media, and analytical standards.
                        </p>
                      </div>

                      <div id="pack-sizes" className="mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Select Pack Size</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          <div className="border border-primary rounded-lg p-3 bg-indigo-50">
                            <div className="flex justify-between">
                              <span className="font-medium">100g</span>
                              <span className="font-medium text-primary">$12.50</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">In stock (&gt;20)</p>
                          </div>
                          <div className="border border-gray-200 hover:border-primary rounded-lg p-3">
                            <div className="flex justify-between">
                              <span className="font-medium">500g</span>
                              <span className="font-medium text-primary">$32.75</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">In stock (12)</p>
                          </div>
                          <div className="border border-gray-200 hover:border-primary rounded-lg p-3">
                            <div className="flex justify-between">
                              <span className="font-medium">1kg</span>
                              <span className="font-medium text-primary">$58.99</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Low stock (3)</p>
                          </div>
                          <div className="border border-gray-200 hover:border-primary rounded-lg p-3">
                            <div className="flex justify-between">
                              <span className="font-medium">5kg</span>
                              <span className="font-medium text-primary">$199.95</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">In stock (8)</p>
                          </div>
                          <div className="border border-gray-200 hover:border-primary rounded-lg p-3">
                            <div className="flex justify-between">
                              <span className="font-medium">10kg</span>
                              <span className="font-medium text-primary">$349.00</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Made to order (7-10 days)</p>
                          </div>
                          <div className="border border-gray-200 hover:border-primary rounded-lg p-3 flex items-center justify-center text-primary">
                            <i className="fa-solid fa-plus mr-1 text-xs"></i>
                            <span className="text-sm">Custom Size</span>
                          </div>
                        </div>
                      </div>

                      <div id="quantity-actions" className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                          <div className="flex">
                            <button className="bg-gray-100 border border-gray-300 px-3 py-2 rounded-l-lg">
                              <i className="fa-solid fa-minus text-gray-500 text-xs"></i>
                            </button>
                            <input
                              type="text"
                              value="1"
                              className="w-16 border-t border-b border-gray-300 text-center outline-none"
                            />
                            <button className="bg-gray-100 border border-gray-300 px-3 py-2 rounded-r-lg">
                              <i className="fa-solid fa-plus text-gray-500 text-xs"></i>
                            </button>
                          </div>
                        </div>
                        <div className="sticky bottom-0 bg-white  p-4 flex space-x-2 z-10">
                          <button className="flex-1 bg-primary hover:bg-primary/90 text-white w-[146.6px]  rounded-lg font-bold shadow-sm hover:shadow-md transition">
                            Buy
                          </button>
                          <button className="flex-1 bg-white border border-primary text-primary w-[146.6px] rounded-lg font-bold hover:bg-gray-50 transition">
                            Sell
                          </button>
                        </div>
                      </div>

                      {/* <div id="buy-sell-actions" className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium shadow-sm transition">
                    <i className="fa-solid fa-shopping-cart mr-2"></i> Buy Now
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium shadow-sm transition">
                    <i className="fa-solid fa-handshake mr-2"></i> Sell Similar Item
                  </button>
                  <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium shadow-sm transition">
                    <i className="fa-solid fa-bullhorn mr-2"></i> Post Buy Request
                  </button>
                </div> */}
                    </div>
                  </div>
                </div>

                {/* Product Details Tabs */}
                <div id="product-tabs" className="bg-white rounded-xl shadow-sm mb-8 overflow-hidden">
                  <div className="border-b border-gray-200">
                    {tabs.map(tab => (
                      <button
                        key={tab}
                        className={`mr-6 pb-2 ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600'
                          }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  {activeTab === 'Specifications' && (
                    <div id="specifications-content" className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Physical Properties</h3>
                          <table className="w-full">
                            <tbody className="divide-y divide-gray-200">
                              <tr>
                                <td className="py-3 text-sm font-medium text-gray-500">Appearance</td>
                                <td className="py-3 text-sm text-gray-700">White crystalline solid</td>
                              </tr>
                              <tr>
                                <td className="py-3 text-sm font-medium text-gray-500">Molecular Weight</td>
                                <td className="py-3 text-sm text-gray-700">58.44 g/mol</td>
                              </tr>
                              <tr>
                                <td className="py-3 text-sm font-medium text-gray-500">Melting Point</td>
                                <td className="py-3 text-sm text-gray-700">801°C</td>
                              </tr>
                              <tr>
                                <td className="py-3 text-sm font-medium text-gray-500">Boiling Point</td>
                                <td className="py-3 text-sm text-gray-700">1,413°C</td>
                              </tr>
                              <tr>
                                <td className="py-3 text-sm font-medium text-gray-500">Density</td>
                                <td className="py-3 text-sm text-gray-700">2.16 g/cm³</td>
                              </tr>
                              <tr>
                                <td className="py-3 text-sm font-medium text-gray-500">Solubility in Water</td>
                                <td className="py-3 text-sm text-gray-700">36 g/100mL (20°C)</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Chemical Properties</h3>
                          <table className="w-full">
                            <tbody className="divide-y divide-gray-200">
                              <tr>
                                <td className="py-3 text-sm font-medium text-gray-500">Purity</td>
                                <td className="py-3 text-sm text-gray-700">≥99.5%</td>
                              </tr>
                              <tr>
                                <td className="py-3 text-sm font-medium text-gray-500">pH (5% solution)</td>
                                <td className="py-3 text-sm text-gray-700">5.0-8.0</td>
                              </tr>
                              <tr>
                                <td className="py-3 text-sm font-medium text-gray-500">Heavy Metals</td>
                                <td className="py-3 text-sm text-gray-700">≤5 ppm</td>
                              </tr>
                              <tr>
                                <td className="py-3 text-sm font-medium text-gray-500">Insoluble Matter</td>
                                <td className="py-3 text-sm text-gray-700">≤0.005%</td>
                              </tr>
                              <tr>
                                <td className="py-3 text-sm font-medium text-gray-500">Loss on Drying</td>
                                <td className="py-3 text-sm text-gray-700">≤0.5%</td>
                              </tr>
                              <tr>
                                <td className="py-3 text-sm font-medium text-gray-500">Meets ACS Specifications</td>
                                <td className="py-3 text-sm text-gray-700">Yes</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Documents & Resources</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <span className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50 transition cursor-pointer">
                            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3">
                              <i className="fa-solid fa-file-pdf"></i>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">Safety Data Sheet</p>
                              <p className="text-xs text-gray-500">PDF, 1.2 MB</p>
                            </div>
                          </span>
                          <span className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50 transition cursor-pointer">
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                              <i className="fa-solid fa-file-lines"></i>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">Certificate of Analysis</p>
                              <p className="text-xs text-gray-500">PDF, 845 KB</p>
                            </div>
                          </span>
                          <span className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50 transition cursor-pointer">
                            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">
                              <i className="fa-solid fa-link"></i>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">Manufacturer Website</p>
                              <p className="text-xs text-gray-500">LabPure.com</p>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>


                {/* Publications Section */}
                <div id="publications-section" className="bg-white rounded-xl shadow-sm mb-8 p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Publications Using This Product</h2>
                  <div className="space-y-4">
                    <div className="border-b border-gray-100 pb-4">
                      <h3 className="text-base font-medium text-gray-800 mb-1">
                        Effect of Sodium Chloride on Protein Stability in Aqueous Solutions
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">Journal of Molecular Biology, 2022</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>Authors: J. Smith, A. Johnson, et al.</span>
                        <span className="mx-2">|</span>
                        <span>Citations: 42</span>
                        <span className="mx-2">|</span>
                        <span className="text-primary hover:underline cursor-pointer">View Article</span>
                      </div>
                    </div>

                    <div className="border-b border-gray-100 pb-4">
                      <h3 className="text-base font-medium text-gray-800 mb-1">
                        Optimization of Buffer Conditions for High-Throughput Screening
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">Analytical Chemistry, 2021</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>Authors: M. Williams, D. Lee, et al.</span>
                        <span className="mx-2">|</span>
                        <span>Citations: 28</span>
                        <span className="mx-2">|</span>
                        <span className="text-primary hover:underline cursor-pointer">View Article</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-medium text-gray-800 mb-1">
                        Comparative Study of Salt Effects on Enzymatic Reactions
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">Biochemistry, 2020</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>Authors: R. Garcia, T. Wilson, et al.</span>
                        <span className="mx-2">|</span>
                        <span>Citations: 56</span>
                        <span className="mx-2">|</span>
                        <span className="text-primary hover:underline cursor-pointer">View Article</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <span className="inline-block text-primary hover:underline text-sm font-medium cursor-pointer">
                      View all 27 publications <i className="fa-solid fa-arrow-right ml-1"></i>
                    </span>
                  </div>
                </div>

                {/* Similar Products */}
                <div id="similar-products" className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Similar Products</h2>
                    <span className="text-primary hover:underline text-sm font-medium cursor-pointer">View All</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                      <div className="h-40 bg-gray-50 flex items-center justify-center p-4">
                        <img
                          className="h-full w-auto object-contain"
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/9d0958a213-7a09cc17cd7cbee27b2d.png"
                          alt="lab chemical reagent potassium chloride bottle on white background, professional product photography"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-gray-800 font-medium">Potassium Chloride</h3>
                        <p className="text-xs text-gray-500 mb-2">Reagent Grade, ≥99.0%</p>
                        <div className="flex justify-between items-center">
                          <span className="text-primary font-medium">$14.99</span>
                          <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded">
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                      <div className="h-40 bg-gray-50 flex items-center justify-center p-4">
                        <img
                          className="h-full w-auto object-contain"
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/f0a6390ef4-8510f2137c2ba66577e6.png"
                          alt="lab chemical reagent sodium phosphate bottle on white background, professional product photography"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-gray-800 font-medium">Sodium Phosphate</h3>
                        <p className="text-xs text-gray-500 mb-2">Dibasic, Anhydrous, ACS</p>
                        <div className="flex justify-between items-center">
                          <span className="text-primary font-medium">$18.50</span>
                          <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded">
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                      <div className="h-40 bg-gray-50 flex items-center justify-center p-4">
                        <img
                          className="h-full w-auto object-contain"
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/300070f1b7-d3c1bc2b6ff0e5923808.png"
                          alt="lab chemical reagent magnesium chloride bottle on white background, professional product photography"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-gray-800 font-medium">Magnesium Chloride</h3>
                        <p className="text-xs text-gray-500 mb-2">Hexahydrate, Molecular Biology</p>
                        <div className="flex justify-between items-center">
                          <span className="text-primary font-medium">$22.75</span>
                          <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded">
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                      <div className="h-40 bg-gray-50 flex items-center justify-center p-4">
                        <img
                          className="h-full w-auto object-contain"
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/12f5833409-53dc1458e3e9804035f7.png"
                          alt="lab chemical reagent calcium chloride bottle on white background, professional product photography"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-gray-800 font-medium">Calcium Chloride</h3>
                        <p className="text-xs text-gray-500 mb-2">Dihydrate, USP Grade</p>
                        <div className="flex justify-between items-center">
                          <span className="text-primary font-medium">$16.25</span>
                          <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded">
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Recently Viewed */}
                <div id="recently-viewed" className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Recently Viewed</h2>
                    <button className="text-gray-400 hover:text-gray-600">
                      <i className="fa-solid fa-trash-alt"></i>
                    </button>
                  </div>
                  <div className="flex overflow-x-auto space-x-4 pb-4">

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden min-w-[200px] flex-shrink-0">
                      <div className="h-32 bg-gray-50 flex items-center justify-center p-3">
                        <img
                          className="h-full w-auto object-contain"
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/74efeaa705-fe3d72c49a5b28a30063.png"
                          alt="laboratory pipette on white background, professional product photography"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm text-gray-800 font-medium">Adjustable Pipette</h3>
                        <p className="text-xs text-gray-500">10-100µL</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden min-w-[200px] flex-shrink-0">
                      <div className="h-32 bg-gray-50 flex items-center justify-center p-3">
                        <img
                          className="h-full w-auto object-contain"
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8b4a9aba3a-458bae720570f2ab94f8.png"
                          alt="laboratory microcentrifuge tubes on white background, professional product photography"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm text-gray-800 font-medium">Microcentrifuge Tubes</h3>
                        <p className="text-xs text-gray-500">1.5mL, Pack of 500</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden min-w-[200px] flex-shrink-0">
                      <div className="h-32 bg-gray-50 flex items-center justify-center p-3">
                        <img
                          className="h-full w-auto object-contain"
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b91edf064c-e7ab10236b593def620a.png"
                          alt="laboratory pH meter on white background, professional product photography"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm text-gray-800 font-medium">Digital pH Meter</h3>
                        <p className="text-xs text-gray-500">Benchtop Model</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden min-w-[200px] flex-shrink-0">
                      <div className="h-32 bg-gray-50 flex items-center justify-center p-3">
                        <img
                          className="h-full w-auto object-contain"
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/9fee2ee81a-5339f43b0f7554b0353a.png"
                          alt="laboratory beakers set on white background, professional product photography"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm text-gray-800 font-medium">Glass Beakers Set</h3>
                        <p className="text-xs text-gray-500">50-1000mL, Set of 5</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden min-w-[200px] flex-shrink-0">
                      <div className="h-32 bg-gray-50 flex items-center justify-center p-3">
                        <img
                          className="h-full w-auto object-contain"
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/236927aff2-c65deb48afabfe40755b.png"
                          alt="laboratory safety goggles on white background, professional product photography"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm text-gray-800 font-medium">Safety Goggles</h3>
                        <p className="text-xs text-gray-500">Anti-Fog, Chemical Resistant</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      {/* <Footer /> */}

    </>
  );
}
