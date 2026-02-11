import { CarouselBanner } from "./_home/banner";
import ShopPage from "./shop/page";
import CategoriesSection from "./_home/categories";
import WhyChooseUs from "./_home/why_choose_us";
import System from "./_home/system";
import { userService } from "@/services/user.service";
import { Roles } from "@/constants/roles";

const HomePage = async () => {
  const { user } = await userService.getSession();
  const isCustomer = user?.role === Roles.customer;
  return (
    <>
      <CarouselBanner />
      <CategoriesSection />
      {isCustomer && <ShopPage />}
      <WhyChooseUs />
      <System />
    </>
  );
};

export default HomePage;
