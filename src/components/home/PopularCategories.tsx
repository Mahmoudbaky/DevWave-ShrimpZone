const PopularCategories = () => {
  const categories = [
    { id: 1, name: "Trays", imageUrl: "/images/meal-1.png", mealCount: 24 },
    {
      id: 3,
      name: "Mini Trays",
      imageUrl: "/images/meal-2.png",
      mealCount: 18,
    },
    { id: 2, name: "Tagen", imageUrl: "/images/Tagen.png", mealCount: 30 },
    { id: 4, name: "Pasta", imageUrl: "/images/pasta.png", mealCount: 22 },
    {
      id: 5,
      name: "Sandwiches",
      imageUrl: "/images/sandwich.png",
      mealCount: 27,
    },
  ];

  return (
    <section className="text-center flex items-center justify-center my-24 ">
      <div className="container mx-auto px-4">
        <div>
          <p className="text-[#FF6868] text-[15px] mb-2 font-bold uppercase">
            Customer Favorites
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Popular Categories
          </h2>
        </div>
        <div className="mt-10 flex flex-wrap gap-5 justify-center">
          {categories.map((category) => (
            <div
              className="border w-52 border-gray-300 p-4 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
              key={category.id}
            >
              <div className="overflow-hidden bg-primary rounded-full aspect-square flex items-center justify-center mx-auto w-32 h-32">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mt-2">{category.name}</h3>
                <span>{category.mealCount} Meals</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
