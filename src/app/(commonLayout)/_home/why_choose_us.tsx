const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="font-semibold text-xl mb-2">Verified Sellers</h3>
            <p className="text-gray-600">
              All medicines are provided by licensed and trusted sellers.
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="font-semibold text-xl mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick and safe delivery right to your doorstep.
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="font-semibold text-xl mb-2">Secure Payments</h3>
            <p className="text-gray-600">
              100% secure payment system with trusted gateways.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
