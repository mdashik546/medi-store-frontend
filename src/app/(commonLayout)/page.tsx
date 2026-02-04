import { userService } from "@/services/user.service";
import { CarouselBanner } from "./_home/banner";

const HomePage = async () => {

  return (
    <div>
      <CarouselBanner />
    </div>
  );
};

export default HomePage;
