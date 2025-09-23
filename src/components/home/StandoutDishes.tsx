import MealCard from "../MealCard";

const StandoutDishes = () => {
  const meals = [
    {
      id: 1,
      name: "Al 3atawla Tray",
      description: "Fresh salmon fillet grilled to perfection",
      price: "895",
      image: "/images/meal-2.png",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Yala Bena Tray",
      description:
        "Succulent shrimp sautéed in a garlic butter and white wine sauce",
      price: "1699",
      image: "/images/meal-1.png",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Ebn El Halal Tray",
      description: "Juicy lobster tail broiled with garlic butter",
      price: "2950",
      image: "/images/meal-3.png",
      rating: 4.9,
    },
    {
      id: 4,
      name: "Shrimp Zone Tray",
      description: "Juicy lobster tail broiled with garlic butter",
      price: "9950",
      image: "/images/meal-4.png",
      rating: 4.9,
    },
  ];

  return (
    <section className="flex items-center justify-center my-20">
      <div className="container mx-auto px-4">
        <div>
          <p className="text-[#FF6868] text-[15px] mb-2 font-bold uppercase">
            special Trays
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Standout Trays <br /> From Our Menu
          </h2>
        </div>
        <div className="mt-10 flex flex-wrap gap-7  justify-center">
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              id={meal.id.toString()}
              name={meal.name}
              description={meal.description}
              price={parseFloat(meal.price.replace("$", ""))}
              imageUrl={meal.image}
              rating={meal.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StandoutDishes;
