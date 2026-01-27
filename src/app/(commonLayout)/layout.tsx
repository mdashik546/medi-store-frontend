import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navber";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto xl:px-0 md:px-4 sm:px-0 px-4">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
