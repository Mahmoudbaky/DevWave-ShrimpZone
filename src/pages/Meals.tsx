"use client";

import { useState, useEffect, useTransition } from "react";
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
import { Input } from "@/components/ui/input";
import { Heart, ShoppingCart, Search, Plus, Minus } from "lucide-react";
import { categoriesApi, mealsApi, cartApi, wishlistApi } from "@/lib/api";
import type { Category, Meal } from "@/lib/types";
import { toast } from "sonner";
import { useOptimistic } from "react";

export default function Meals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [mealsLoading, setMealsLoading] = useState(true);

  const [isPending, startTransition] = useTransition();

  const [optimisticCart, optimisticSetCart] = useOptimistic(
    cart,
    (curCart, action: { type: "add" | "remove"; mealId: string }) => {
      const currentQuantity = curCart[action.mealId] || 0;

      if (action.type === "add") {
        return { ...curCart, [action.mealId]: currentQuantity + 1 };
      } else if (action.type === "remove") {
        if (currentQuantity <= 1) {
          const newCart = { ...curCart };
          delete newCart[action.mealId];
          return newCart;
        } else {
          return { ...curCart, [action.mealId]: currentQuantity - 1 };
        }
      }
      return curCart;
    }
  );

  // Fetch cart on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartResponse = await cartApi.getCart();

        // Convert cart items to our local cart state format
        const cartState: { [key: string]: number } = {};
        cartResponse.data.items.forEach((item) => {
          const productId = item.product?._id || item.meal || "";
          if (productId) {
            cartState[productId] = item.quantity;
          }
        });
        setCart(cartState);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        // If cart fetch fails (e.g., user not logged in), keep empty cart
        setCart({});
      }
    };

    fetchCart();
  }, []);

  // Fetch wishlist on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setWishlistLoading(true);
        const wishlistResponse = await wishlistApi.getWishlist();

        // Extract product IDs from wishlist items
        const wishlistIds = wishlistResponse.data.map((item) => item._id);
        setWishlist(wishlistIds);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        // If wishlist fetch fails (e.g., user not logged in), keep empty wishlist
        setWishlist([]);
      } finally {
        setWishlistLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const fetchedCategories = await categoriesApi.getAllCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        // Optionally show an error message to user
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch meals when search term or category changes
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setMealsLoading(true);
        const response = await mealsApi.filterMeals({
          category: selectedCategory === "all" ? undefined : selectedCategory,
          searchTerm: searchTerm || undefined,
        });
        setMeals(response.products);
      } catch (error) {
        console.error("Failed to fetch meals:", error);
        setMeals([]);
      } finally {
        setMealsLoading(false);
      }
    };

    fetchMeals();
  }, [searchTerm, selectedCategory]);

  const addToCart = async (mealId: string) => {
    try {
      const meal = meals.find((m) => m._id === mealId);
      if (!meal) return;

      // Optimistically update the UI immediately
      startTransition(async () => {
        optimisticSetCart({ type: "add", mealId: meal._id });

        try {
          // Make the API call
          await cartApi.addToCart({
            productId: mealId,
            quantity: 1,
          });

          // Only update real state after successful API call
          setCart((prev) => ({
            ...prev,
            [mealId]: (prev[mealId] || 0) + 1,
          }));
        } catch (error) {
          // On error, the optimistic update will automatically revert
          // because we don't update the real cart state
          console.error("Failed to add item to cart:", error);
          toast.error("Sign in to add items to cart");
        }
      });
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Sign in to add items to cart");
    }
  };

  const removeFromCart = async (mealId: string) => {
    try {
      const currentQuantity = optimisticCart[mealId] || 0;

      // Optimistically update the UI immediately
      startTransition(async () => {
        optimisticSetCart({ type: "remove", mealId });

        try {
          if (currentQuantity > 1) {
            // Update quantity
            await cartApi.updateCart({
              productId: mealId,
              quantity: currentQuantity - 1,
            });

            setCart((prev) => ({
              ...prev,
              [mealId]: prev[mealId] - 1,
            }));
          } else {
            // Remove item completely
            await cartApi.removeFromCart(mealId);

            setCart((prev) => {
              const newCart = { ...prev };
              delete newCart[mealId];
              return newCart;
            });
          }
        } catch (error) {
          console.error("Failed to remove item from cart:", error);
          toast.error("Failed to update cart. Please try again.");
        }
      });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      toast.error("Failed to update cart. Please try again.");
    }
  };

  const toggleWishlist = async (mealId: string) => {
    try {
      setWishlistLoading(true);
      const isInWishlist = wishlist.includes(mealId);

      if (isInWishlist) {
        // Remove from wishlist
        await wishlistApi.removeFromWishlist(mealId);
        setWishlist((prev) => prev.filter((id) => id !== mealId));
      } else {
        // Add to wishlist
        await wishlistApi.addToWishlist({
          productId: mealId,
        });
        setWishlist((prev) => [...prev, mealId]);
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      alert("Failed to update wishlist. Please try again.");
    } finally {
      setWishlistLoading(false);
    }
  };

  const getTotalItems = () => {
    return Object.values(optimisticCart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(optimisticCart).reduce((total, [mealId, count]) => {
      const meal = meals.find((m) => m._id === mealId);
      return total + (meal ? meal.price * count : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-5">
              <img
                src="/images/logo.png"
                alt="Shrimp Zone Logo"
                className="h-8 w-8"
              />
              <h1 className="text-2xl font-bold text-foreground">
                {"Shrimp Zone"}
              </h1>
            </a>

            {/* Search Bar */}
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search meals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Cart and Wishlist Icons */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="relative bg-transparent"
                asChild
              >
                <a href="/wishlist">
                  <Heart
                    className={`h-4 w-4 ${
                      wishlist.length > 0 ? "fill-current text-accent" : ""
                    }`}
                  />
                  {wishlist.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent">
                      {wishlist.length}
                    </Badge>
                  )}
                </a>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="relative bg-transparent"
                asChild
              >
                <a href="/cart">
                  <ShoppingCart className="h-4 w-4" />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                      {getTotalItems()}
                    </Badge>
                  )}
                </a>
              </Button>

              {getTotalPrice() > 0 && (
                <div className="text-sm font-medium">
                  ${getTotalPrice().toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-balance mb-2">
            {"Delicious Meals"}
          </h2>
          <p className="text-muted-foreground text-pretty">
            {
              "Discover our carefully crafted selection of fresh, flavorful meals made with premium ingredients."
            }
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className="rounded-full"
            >
              All Categories
            </Button>
            {categoriesLoading ? (
              <div className="flex gap-2">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="h-8 w-20 bg-muted animate-pulse rounded-full"
                  />
                ))}
              </div>
            ) : (
              categories.map((category) => (
                <Button
                  key={category._id}
                  variant={
                    selectedCategory === category._id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category._id)}
                  className="rounded-full"
                >
                  {category.name}
                </Button>
              ))
            )}
          </div>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mealsLoading
            ? // Loading skeleton
              [...Array(6)].map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="w-full h-48 bg-muted animate-pulse" />
                  <CardHeader className="pb-3">
                    <div className="h-6 bg-muted animate-pulse rounded mb-2" />
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-8 bg-muted animate-pulse rounded w-1/2" />
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="h-8 bg-muted animate-pulse rounded w-full" />
                  </CardFooter>
                </Card>
              ))
            : meals.map((meal) => (
                <Card
                  key={meal._id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    {meal.images?.[0] ? (
                      <div className="flex items-center justify-center">
                        <img
                          src={meal.images?.[0] || "/placeholder.svg"}
                          alt={meal.name}
                          className="w-48 h-48 "
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center bg-muted h-48">
                        <span className="text-muted-foreground">No Image</span>
                      </div>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                      onClick={() => toggleWishlist(meal._id)}
                      disabled={wishlistLoading}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          wishlist.includes(meal._id)
                            ? "fill-current text-accent"
                            : ""
                        }`}
                      />
                    </Button>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg leading-tight">
                        {meal.name}
                      </CardTitle>
                      <Badge variant="secondary" className="shrink-0">
                        {categories.find((cat) => cat._id === meal.category)
                          ?.name || "Unknown"}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {meal.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        LE {meal.price}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>⭐</span>
                        <span>4.5</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0 gap-2">
                    {optimisticCart[meal._id] ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(meal._id)}
                          disabled={isPending}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-medium min-w-[2rem] text-center">
                          {optimisticCart[meal._id]}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addToCart(meal._id)}
                          disabled={isPending}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => addToCart(meal._id)}
                        disabled={isPending}
                        className="flex-1"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {isPending ? "Adding..." : "Add to Cart"}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
        </div>

        {!mealsLoading && meals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {"No meals found matching your search."}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>© 2025 Shrimp Zone. Made with ❤️ for Shrmip lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
