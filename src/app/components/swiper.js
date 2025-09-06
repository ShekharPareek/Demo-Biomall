<Swiper
  modules={[Navigation, Pagination]}
  spaceBetween={20}
  slidesPerView={3}
  navigation
  // style={{ marginRight: 0 }}
  pagination={{ clickable: true }}
  className="w-[950px] flex custom-swiper ">
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
                  className={`fa-heart ${wishlist[product.catalog_number] ? "fa-solid" : "fa-regular"
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
              <a
                href={product.product_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {product.title}
              </a>
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

        <div className="flex items-center justify-between mt-auto">
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
          </div>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
