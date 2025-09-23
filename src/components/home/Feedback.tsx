import { FaStar } from "react-icons/fa";

const Feedback = () => {
  return (
    <section className="container mx-auto px-4 my-20">
      <div className=" flex flex-col md:flex-row items-center justify-center gap-20 p-10">
        {/* The Left Side : The image */}
        <div className="relative w-[300px] md:w-1/3">
          <div className="relative z-10">
            <img
              src="/images/Mask-group.png"
              alt="Shrimp"
              className="rounded-lg object-cover"
              width={350}
              height={350}
            />
          </div>

          <img
            src="/images/background.png"
            alt="background"
            className="absolute bottom-0 w-[400px]"
          />
        </div>

        {/* The Right Side : All text */}
        <div className=" space-y-6 md:space-y-10 mt-10 md:mt-0 md:max-w-lg">
          <p className="text-[#FF6868] text-[15px]   font-bold uppercase">
            Testimonials{" "}
          </p>
          <h2 className=" text-4xl md:text-5xl font-bold leading-tight">
            What Our Customers Say About Us
          </h2>
          <p className=" text-xl text-[#4A4A4A] font-medium leading-relaxed">
            “I had the pleasure of dining at{" "}
            <span className="text-primary">Shrimp Zone</span> last night, and
            I'm still raving about the experience! The attention to detail in
            presentation and service was impeccable”
          </p>
          {/* Customers */}
          <div className=" flex flex-row items-center gap-24">
            {/* Customers images */}
            <div className="relative flex w-16 h-16">
              <img
                src="/images/customer-1.png"
                alt="customer 1"
                className="absolute z-10 inset-0  w-full h-full object-cover"
                style={{ clipPath: "circle(43.6% at 50% 50%)" }}
              />
              <img
                src="/images/customer-2.png"
                alt="customer 2"
                className="absolute z-20 inset-0 left-[33px] w-full h-full object-cover"
              />
              <img
                src="/images/customer-3.png"
                alt="customer 3"
                className="absolute z-30   left-[66px] w-full h-full object-cover"
              />
            </div>
            {/* Customers text */}
            <div className="flex flex-col gap-1">
              <p className="font-bold">Customer Feedback</p>
              <span className="flex items-center gap-1 text-gray-700 font-medium">
                <FaStar className="text-yellow-400" />
                <span className="font-bold text-black">4.8</span> (2.3k Reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
