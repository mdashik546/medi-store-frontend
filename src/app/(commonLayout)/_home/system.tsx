const System = () => {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="lg:text-3xl sm:text-xl text-lg font-semibold mb-12">
          System Overview
        </h2>
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h3 className="text-lg font-medium mb-2">
              💊 Medicine Information
            </h3>
            <p>
              Displays medicine name, category, price, and availability status
              in a structured format for easy understanding.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">📦 Order Status Flow</h3>
            <p>
              Orders follow a clear lifecycle including placed, processing,
              shipped, and delivered stages, ensuring full visibility of order
              progress.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">
              🏪 Seller & Stock Details
            </h3>
            <p>
              Sellers can view current stock levels and order summaries, helping
              maintain consistency and prevent inventory mismatches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default System;
