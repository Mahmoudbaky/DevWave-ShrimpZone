import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section
      id="home"
      className="min-h-[600px] flex items-center justify-center"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left side : All text */}
          <div className="space-y-6 md:space-y-14 mt-10 md:mt-0 md:max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Dive into Delights Of Delectable{" "}
              <span className="text-primary">Shrimps</span>
            </h1>
            <p className="text-xl text-[#4A4A4A] font-medium leading-relaxed">
              Where Each Plate Weaves a Story of Culinary Mastery and Passionate
              Craftsmanship
            </p>
            <div>
              <Button
                onClick={() => {
                  navigate("/menu");
                }}
                className="py-7 cursor-pointer px-7 shadow-sm  text-[18px] rounded-full"
              >
                Explore Menu
              </Button>
            </div>
          </div>
          {/* Left side : The image */}
          <div className="md:w-1/2">
            <img
              src="/images/shrimp.png"
              alt="Shrimp"
              className="rounded-lg object-cover "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
