const CategoriesSection = () => {
  return (
    <section className="py-20 bg-slate-50 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="lg:text-3xl sm:text-xl text-lg font-semibold text-center mb-14">
          Platform Overview
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow">
            <div className="text-4xl mb-4">💊</div>
            <h3 className="text-lg font-medium mb-2">Medicine Catalog</h3>
            <p className="text-gray-600">
              View a wide range of medicines provided by verified sellers.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-medium mb-2">Order Management</h3>
            <p className="text-gray-600">
              Orders are tracked through different stages for transparency.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <div className="text-4xl mb-4">🏪</div>
            <h3 className="text-lg font-medium mb-2">Seller Control</h3>
            <p className="text-gray-600">
              Sellers can manage medicines, pricing and stock levels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
