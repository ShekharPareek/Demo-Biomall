{/* Slides */ }
{
  groupProducts(msg.matched_products, 4).map((group, groupIdx) =>
    <div
      key={groupIdx}
      // className="flex justify-center gap-4 px-2 transition-all duration-300 ease-in-out"
      className="w-full overflow-x-auto"
    >
      <div className="flex gap-4 px-2 w-max">
        {group.map((product, idx) => (
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
                {/* Buy Button */}
                <button
                  className="flex-1 text-xs bg-indigo-600 text-white px-3 py-2 rounded w-full flex items-center justify-center"
                  onClick={() => handleViewPrices(product.product_url, product)}
                  disabled={loadingProductId === product.id}
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
        ))}
      </div>
    </div>
  )
}

