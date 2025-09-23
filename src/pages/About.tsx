const About = () => {
  return (
    <section className="container mx-auto px-4">
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
        <div className="space-y-6 md:space-y-10 mt-10 md:mt-0 md:max-w-lg">
          <p className="text-[#FF6868] text-[15px]   font-bold uppercase">
            About Us{" "}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Our Story and Commitment to Excellence
          </h2>
          <p className=" text-xl text-[#4A4A4A] font-medium leading-relaxed">
            At Shrimp Zone, we believe that food is more than just sustenance;
            it's an experience that brings people together. Our journey began
            with a simple idea: to create a culinary haven where flavors from
            around the world can be savored and enjoyed. We are committed to
            using only the freshest ingredients and time-honored cooking
            techniques to deliver dishes that are not only delicious but also
            visually stunning.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
