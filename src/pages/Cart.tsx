import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";

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

export default function Cart() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (mealId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(mealId);
    } else {
      setCart((prev) => ({
        ...prev,
        [mealId]: newQuantity,
      }));
    }
  };

  const removeFromCart = (mealId: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[mealId];
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const cartItems = Object.entries(cart)
    .map(([mealId, quantity]) => {
      const meal = sampleMeals.find((m) => m.id === Number.parseInt(mealId));
      return meal ? { meal, quantity } : null;
    })
    .filter(Boolean);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item ? item.meal.price * item.quantity : 0);
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-foreground">Your Cart</h1>
            <Button variant="ghost" size="sm" asChild>
              <a href="/menu">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Menu
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some delicious meals to get started!
            </p>
            <Button asChild>
              <a href="/menu">Browse Menu</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Cart Items ({getTotalItems()})
                </h2>
                <Button variant="outline" size="sm" onClick={clearCart}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </div>

              {cartItems.map((item) => {
                if (!item) return null;
                const { meal, quantity } = item;
                return (
                  <Card key={meal.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={meal.image || "/placeholder.svg"}
                          alt={meal.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{meal.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {meal.description}
                              </p>
                              <Badge variant="secondary" className="mt-1">
                                {meal.category}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(meal.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(meal.id, quantity - 1)
                                }
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-medium min-w-[2rem] text-center">
                                {quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(meal.id, quantity + 1)
                                }
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">
                                ${(meal.price * quantity).toFixed(2)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                ${meal.price.toFixed(2)} each
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>$3.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>
                      $
                      {(
                        getTotalPrice() +
                        3.99 +
                        getTotalPrice() * 0.08
                      ).toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    asChild
                  >
                    <a href="/">Continue Shopping</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
