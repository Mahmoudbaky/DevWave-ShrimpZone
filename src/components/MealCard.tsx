interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
}

import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const MealCard = (meal: Meal) => {
  return (
    <div className="relative w-72 rounded-2xl shadow-md  p-4 flex flex-col gap-5 justify-center items-center overflow-hidden bg-white hover:scale-105 transition-transform duration-300">
      {/* Favorite icon */}
      <div className="absolute top-0 right-0 bg-primary rounded-tr-2xl rounded-bl-2xl p-3 z-10">
        <FaRegHeart className="text-white text-lg" />
      </div>
      {/* The Image */}
      <div className="w-52 h-52 flex items-center justify-center">
        <img
          src={meal.imageUrl}
          alt={meal.imageUrl.split("/").pop()}
          width={200}
          height={200}
        />
      </div>
      {/* The Text */}
      <div className="text-left flex flex-col gap-2">
        <h3 className="font-bold text-[16px]">{meal.name}</h3>
        <p>{meal.description}</p>
      </div>
      {/* Price and rating */}
      <div className="w-full flex items-center justify-between text-lg font-bold ">
        <span>
          {" "}
          <span className="text-primary text-sm mr-1">LE </span>
          {meal.price.toFixed(2)}
        </span>
        <span className="flex items-center gap-1 text-gray-700 font-medium">
          <FaStar className="text-yellow-400" />
          {meal.rating.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default MealCard;

// {/* <Card className="relative w-64 rounded-2xl shadow-md p-0 overflow-hidden bg-white">
//       {/* Favorite icon */}

//       <CardHeader className="flex items-center justify-center p-0 pt-4 pb-2 bg-transparent">
//         <img
//           src={meal.imageUrl}
//           alt={meal.name}
//           className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-md -mt-8"
//         />
//       </CardHeader>
//       <CardContent className="px-4 pb-2 pt-0 text-center">
//         <CardTitle className="text-lg font-semibold mb-1">
//           {meal.name}
//         </CardTitle>
//         <CardDescription className="text-gray-500 text-sm mb-2">
//           {meal.description}
//         </CardDescription>
//       </CardContent>
//       <CardFooter className="flex items-center justify-between px-4 pb-4 pt-0">
//         <span className="text-lg font-bold text-red-500">
//           ${meal.price.toFixed(2)}
//         </span>
//         <span className="flex items-center gap-1 text-gray-700 font-medium">
//           <FaStar className="text-yellow-400 text-base" />
//           <span className="text-base">{meal.rating.toFixed(1)}</span>
//         </span>
//       </CardFooter>
//     </Card> */}
