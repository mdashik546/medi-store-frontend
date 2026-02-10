import { CarouselBanner } from "./_home/banner";
import ShopPage from "./shop/page";
import CategoriesSection from "./_home/categories";
import WhyChooseUs from "./_home/why_choose_us";
import System from "./_home/system";

const HomePage = async () => {
  return (
    <>
      <CarouselBanner />
      <CategoriesSection />
      <ShopPage />
      <WhyChooseUs />
      <System />
    </>
  );
};

export default HomePage;
