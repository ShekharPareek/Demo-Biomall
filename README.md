This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



Reference : https://www.accio.com/c/30cabc2e-ce6f-4108-abd5-602897f45de8?src=f_alibabapc_head_bn




   {messages.map((msg, idx) =>
                      msg.role === 'user' ? (
                        <div key={idx} className="flex justify-end mr-3 mb-4 mt-4">
                          <div className="bg-primary text-white rounded-lg rounded-tr-none p-3 max-w-[70%] ml-2">
                            {msg.content}
                          </div>
                        </div>
                      ) : (
                        <div key={idx} className="flex flex-col overflow-x-scroll">
                          {/* Matched Products */}
                          {msg.matched_products?.length > 0 && (
                            <Swiper
                              modules={[Navigation, Pagination]}
                              spaceBetween={20}
                              slidesPerView={3}
                              navigation
                              pagination={{ clickable: true }}
                              className="w-[950px] flex custom-swiper">
                              {msg.matched_products.map((product, idx) => (
                                <SwiperSlide key={idx} className="h-auto">
                                  <div
                                    className="h-full border border-indigo-200 rounded-lg p-3 shadow-sm bg-white hover:shadow-md transition flex flex-col"
                                  >
                                    <div className="flex gap-3">
                                      <div className="relative">
                                        <img
                                          src={product.image_url || "/placeholder.png"}
                                          alt={product.title || "Product"}
                                          className="w-24 h-24 object-contain mb-2"
                                        />
                                        <div className="flex justify-center gap-2 mt-2">
                                          <button
                                            onClick={() => handleWishlistToggle(product)}
                                            className="text-indigo-600 hover:text-indigo-800 p-1"
                                            title="Toggle Wishlist"
                                          >
                                            <i
                                              className={`fa-heart ${wishlist[product.catalog_number]
                                                ? "fa-solid"
                                                : "fa-regular"
                                                }`}
                                            ></i>
                                          </button>
                                          <button
                                            className="text-indigo-600 hover:text-indigo-800"
                                            onClick={() => handleCompareToggle(product)}
                                            title="Compare"
                                          >
                                            <i className="fa-solid fa-code-compare" />
                                          </button>
                                        </div>
                                      </div>
                                      <div className="side-b">
                                        <div className="font-semibold text-sm mt-2">
                                          <a href={product.product_url}
                                            target="_blank"
                                            rel="noopener noreferrer">{product.title}</a>
                                        </div>
                                        <div className="text-xs text-gray-600">
                                          Brand: {product.brand || "N/A"}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                          Catalog No.: {product.catalog_number}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                          CAS No: {product.cas_number}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <button
                                        onClick={() => {
                                          setSelectedProduct(product);
                                          setSelectedIdentifiers([
                                            product.title,
                                            product.catalog_number,
                                            product.cas_number,
                                          ]);
                                          setShowModal(true);
                                          fetchPublications(
                                            [product.title, product.catalog_number, product.cas_number].filter(Boolean)
                                          );
                                        }}
                                        className="mt-2 text-xs text-indigo-700 underline"
                                      >
                                        Publications
                                      </button>

                                      <div className="flex gap-2 mt-3">
                                        <button
                                          onClick={() => handleViewPrices(product.product_url, product)}
                                          disabled={loadingProductId === product.catalog_number}
                                          className="flex-1 text-xs bg-indigo-600 text-white px-3 py-2 rounded w-full flex items-center justify-center"
                                        >
                                          {loadingProductId === product.id ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                          ) : (
                                            "Buy / Sell"
                                          )}
                                        </button>



                                        {/* Sell Button */}
                                        {/* <button
                                      className="flex-1 text-xs border border-indigo-600 text-indigo-600 px-3 py-2 rounded w-full flex items-center justify-center"
                                      onClick={() => handleViewPrices(product.product_url, product)}
                                      disabled={loadingProductId === product.id}
                                    >
                                      {loadingProductId === product.id ? (
                                        <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                                      ) : (
                                        "Sell"
                                      )}
                                    </button> */}

                                      </div>





                                    </div>
                                  </div>
                                </SwiperSlide>
                              ))}
                            </Swiper>

                          )}


                          <div className="flex">
                            {/* <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <i className="fa-solid fa-robot text-indigo-600" />
                  </div> */}
                            <div
                              className=" rounded-lg rounded-tl-none p-3 max-w-[93%] mt-5 text-gray-700 space-y-3"
                              dangerouslySetInnerHTML={{
                                __html: (msg.content || '')
                                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/\n/g, '<br />'),
                              }}
                            />
                            {/* Price Modal */}
                            {showPriceModal && selectedProduct && (
                              <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/10 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">

                                  {/* Header */}
                                  <div className="flex justify-between items-center border-b pb-3">
                                    <h2 className="text-xl font-semibold text-gray-800">Price Details</h2>
                                    <button
                                      onClick={() => setShowPriceModal(false)}
                                      className="text-gray-500 hover:text-gray-700"
                                    >
                                      <i className="fa-solid fa-xmark text-xl" />
                                    </button>
                                  </div>

                                  {/* Loader */}
                                  {loadingPrice ? (
                                    <div className="flex flex-col items-center justify-center py-16">
                                      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                                      <span className="mt-4 text-gray-500">Fetching prices...</span>
                                    </div>
                                  ) : (
                                    <>
                                      {/* Product Title */}
                                      <h3 className="text-2xl font-bold mt-4 mb-3 text-gray-800">
                                        {selectedProduct.title}
                                      </h3>

                                      {/* Product Info */}
                                      <div className="grid grid-cols-3 gap-4 mb-6">
                                        <div className="bg-blue-50 rounded p-2">
                                          <div className="text-xs text-blue-800 font-medium">Brand</div>
                                          <div className="text-sm font-semibold text-blue-900">
                                            {selectedProduct.brand || 'N/A'}
                                          </div>
                                        </div>
                                        <div className="bg-green-50 rounded p-2">
                                          <div className="text-xs text-green-800 font-medium">Catalog No.</div>
                                          <div className="text-sm font-semibold text-green-900">
                                            {selectedProduct.catalog_number || 'N/A'}
                                          </div>
                                        </div>
                                        <div className="bg-purple-50 rounded p-2">
                                          <div className="text-xs text-purple-800 font-medium">CAS No.</div>
                                          <div className="text-sm font-semibold text-purple-900">
                                            {selectedProduct.cas_number || 'N/A'}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Pack Sizes Table */}
                                      <h4 className="text-md font-semibold mb-2 text-gray-700">
                                        Available Pack Sizes
                                      </h4>
                                      <table className="w-full text-sm border rounded overflow-hidden">
                                        <thead>
                                          <tr className="bg-gray-100 text-left">
                                            <th className="p-2 border">Select</th>
                                            <th className="p-2 border">Pack Size</th>
                                            <th className="p-2 border">SKU</th>
                                            <th className="p-2 border">Price</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {priceData.map((item, idx) => (
                                            <tr key={idx} className="border-t">
                                              <td className="p-2 border text-center">
                                                <input
                                                  type="checkbox"
                                                  checked={selectedSKU === item.sku}
                                                  onChange={() => {
                                                    setSelectedSKU(selectedSKU === item.sku ? '' : item.sku);
                                                    setPacksize(packSize === item.size ? '' : item.size);
                                                  }}

                                                />
                                              </td>
                                              <td className="p-2 border">{item.size}</td>
                                              <td className="p-2 border">{item.sku}</td>
                                              <td className="p-2 border">{item.price}</td>
                                            </tr>
                                          ))}
                                        </tbody>


                                      </table>

                                      {/* CTA Buttons */}
                                      <div className="mt-6 flex justify-end gap-3">
                                        <button
                                          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center gap-2"
                                          onClick={() => handleInquiry('buy', selectedProduct)}
                                          disabled={!selectedSKU}
                                        >
                                          <i className="fa-solid fa-cart-shopping" /> Buy
                                        </button>

                                        <button
                                          className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 flex items-center gap-2"
                                          onClick={() => handleInquiry('sell', selectedProduct)}
                                          disabled={!selectedSKU}
                                        >
                                          <i className="fa-solid fa-store" /> Sell
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                        </div>

                      )
                    )}



  