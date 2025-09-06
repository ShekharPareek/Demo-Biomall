'use client';

export default function ComparisonChart() {
  const products = [
    {
      image: '/product.jpg', // Replace with actual image path
      title: 'Sodium Phosphate 1 M, 100 ml',
      catalog: 'orb532667',
      brand: 'Biobryt',
      quantity: '100 ml',
      price: '₹3,000',
      description: 'High-quality buffer solution for ELISA.',
      specification: 'pH 7.2 ± 0.2',
    },
    {
      image: '/product.jpg',
      title: 'Sodium Phosphate 1 M, 100 ml',
      catalog: 'orb532668',
      brand: 'Biobryt',
      quantity: '100 ml',
      price: '₹3,000',
      description: 'Used in molecular biology.',
      specification: 'pH 7.4 ± 0.1',
    },
    {
      image: '/product.jpg',
      title: 'Sodium Phosphate 1 M, 100 ml',
      catalog: 'orb532669',
      brand: 'Biobryt',
      quantity: '100 ml',
      price: '₹3,000',
      description: 'Phosphate buffer with high purity.',
      specification: 'pH 7.0 ± 0.3',
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 rounded-t-lg">
        <h2 className="text-lg font-semibold">← Comparison Chart</h2>
      </div>

      {/* Product Images + Titles */}
      <div className="grid grid-cols-3 gap-6 text-center py-6 bg-white">
        {products.map((product, index) => (
          <div key={index}>
            <img
              src={product.image}
              alt={product.title}
              className="w-32 h-32 object-contain mx-auto mb-2"
            />
            <p className="text-sm font-medium">{product.title}</p>
            <div className="flex justify-center gap-2 mt-2">
              <button className="bg-purple-600 text-white text-sm px-4 py-1 rounded">
                Buy
              </button>
              <button className="bg-white border border-purple-600 text-purple-600 text-sm px-4 py-1 rounded">
                Sell
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto bg-white border rounded-b-lg">
        <table className="w-full text-sm text-left table-fixed border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/4 p-3 font-semibold border-r"> </th>
              {products.map((_, i) => (
                <th key={i} className="p-3 text-center font-semibold border-r">
                  Product {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {['Catalog', 'Brand', 'Quantity', 'Price', 'Description', 'Specification'].map((attr, i) => (
              <tr key={i} className="border-t">
                <td className="p-3 font-medium border-r bg-gray-50">{attr}</td>
                {products.map((p, j) => (
                  <td key={j} className="p-3 text-center border-r">
                    {p[attr.toLowerCase()]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
