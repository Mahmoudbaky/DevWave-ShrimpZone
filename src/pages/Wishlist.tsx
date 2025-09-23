import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from "lucide-react";

interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

const sampleMeals: Meal[] = [
  {
    id: 1,
    name: "Grilled Salmon Bowl",
    description:
      "Fresh Atlantic salmon with quinoa, avocado, and seasonal vegetables",
    price: 18.99,
    image: "/grilled-salmon-bowl-with-quinoa-and-vegetables.jpg",
    category: "Healthy",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Truffle Mushroom Pasta",
    description:
      "Handmade pasta with wild mushrooms, truffle oil, and parmesan",
    price: 22.5,
    image: "/truffle-mushroom-pasta-with-parmesan.jpg",
    category: "Italian",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Korean BBQ Tacos",
    description: "Marinated beef bulgogi with kimchi slaw and gochujang aioli",
    price: 15.99,
    image: "/korean-bbq-tacos-with-kimchi.jpg",
    category: "Fusion",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Mediterranean Chicken",
    description:
      "Herb-crusted chicken breast with roasted vegetables and tzatziki",
    price: 19.99,
    image: "/mediterranean-chicken-with-roasted-vegetables.jpg",
    category: "Mediterranean",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Vegan Buddha Bowl",
    description: "Quinoa, roasted chickpeas, sweet potato, and tahini dressing",
    price: 16.99,
    image: "/vegan-buddha-bowl-with-quinoa-and-chickpeas.jpg",
    category: "Vegan",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Beef Burger Deluxe",
    description: "Wagyu beef patty with aged cheddar, bacon, and truffle fries",
    price: 24.99,
    image: "/gourmet-beef-burger-with-truffle-fries.jpg",
    category: "American",
    rating: 4.8,
  },
];

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  // Load wishlist and cart from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    const savedCart = localStorage.getItem("cart");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromWishlist = (mealId: number) => {
    setWishlist((prev) => prev.filter((id) => id !== mealId));
  };

  const addToCart = (mealId: number) => {
    setCart((prev) => ({
      ...prev,
      [mealId]: (prev[mealId] || 0) + 1,
    }));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const wishlistItems = wishlist
    .map((mealId) => sampleMeals.find((meal) => meal.id === mealId))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-foreground">
              Your Wishlist
            </h1>
            <Button variant="ghost" size="sm" asChild>
              <a href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Menu
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {sampleMeals.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Save your favorite meals for later!
            </p>
            <Button asChild>
              <a href="/menu">Browse Menu</a>
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Saved Items ({wishlistItems.length})
              </h2>
              <Button variant="outline" size="sm" onClick={clearWishlist}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Wishlist
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleMeals.map((meal) => {
                if (!meal) return null;
                return (
                  <Card
                    key={meal.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={meal.image || "/placeholder.svg"}
                        alt={meal.name}
                        className="w-full h-48 object-cover"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                        onClick={() => removeFromWishlist(meal.id)}
                      >
                        <Heart className="h-4 w-4 fill-current text-accent" />
                      </Button>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg leading-tight">
                          {meal.name}
                        </CardTitle>
                        <Badge variant="secondary" className="shrink-0">
                          {meal.category}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        {meal.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          ${meal.price.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <span>⭐</span>
                          <span>{meal.rating}</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-0 gap-2">
                      <Button
                        onClick={() => addToCart(meal.id)}
                        className="flex-1"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromWishlist(meal.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
