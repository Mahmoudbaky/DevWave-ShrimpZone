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
import { ArrowLeft, Heart, ShoppingCart, Trash2, Loader2 } from "lucide-react";
import { wishlistApi, cartApi } from "@/lib/api";
import type { WishlistItem } from "@/lib/types";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOperationLoading, setIsOperationLoading] = useState<string | null>(
    null
  );

  // Load wishlist from API on mount
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await wishlistApi.getWishlist();
      setWishlistItems(response.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError("Failed to load wishlist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      setIsOperationLoading(productId);
      await wishlistApi.removeFromWishlist(productId);
      // Remove from local state
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      setError("Failed to remove item from wishlist.");
    } finally {
      setIsOperationLoading(null);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      setIsOperationLoading(`cart-${productId}`);
      await cartApi.addToCart({ productId, quantity: 1 });
      // You could show a success message here
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("Failed to add item to cart.");
    } finally {
      setIsOperationLoading(null);
    }
  };

  const clearWishlist = async () => {
    try {
      setIsOperationLoading("clear");
      await wishlistApi.clearWishlist();
      setWishlistItems([]);
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      setError("Failed to clear wishlist.");
    } finally {
      setIsOperationLoading(null);
    }
  };

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
        {isLoading ? (
          <div className="text-center py-16">
            <Loader2 className="h-16 w-16 mx-auto text-muted-foreground mb-4 animate-spin" />
            <h2 className="text-2xl font-semibold mb-2">Loading wishlist...</h2>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Please log in to access your wishlist
            </h2>
            <p className="text-muted-foreground mb-6">
              You need to be logged in to save and view your favorite meals.
            </p>
            <Button asChild className="mb-4 mr-4">
              <a href="/login">Login to Continue</a>
            </Button>
            <Button variant="outline" onClick={fetchWishlist}>
              Try Again
            </Button>
          </div>
        ) : wishlistItems.length === 0 ? (
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
              <Button
                variant="outline"
                size="sm"
                onClick={clearWishlist}
                disabled={isOperationLoading === "clear"}
              >
                {isOperationLoading === "clear" ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Clear Wishlist
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => {
                return (
                  <Card
                    key={item._id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative">
                      {item.images?.[0] ? (
                        <div className="flex items-center justify-center">
                          <img
                            src={item.images?.[0] || "/placeholder.svg"}
                            alt={item.name}
                            className="w-48 h-48 "
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center bg-muted h-48">
                          <span className="text-muted-foreground">
                            No Image
                          </span>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                        onClick={() => removeFromWishlist(item._id)}
                        disabled={isOperationLoading === item._id}
                      >
                        {isOperationLoading === item._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Heart className="h-4 w-4 fill-current text-accent" />
                        )}
                      </Button>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg leading-tight">
                          {item.name}
                        </CardTitle>
                        <Badge variant="secondary" className="shrink-0">
                          {item.brand}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          LE {item.price}
                        </span>
                        {item.discount > 0 && (
                          <div className="flex items-center gap-1 text-sm text-green-600">
                            <span>{item.discount}% off</span>
                          </div>
                        )}
                      </div>
                      {item.stock <= 5 && (
                        <p className="text-sm text-orange-600 mt-1">
                          Only {item.stock} left in stock
                        </p>
                      )}
                    </CardContent>

                    <CardFooter className="pt-0 gap-2">
                      <Button
                        onClick={() => addToCart(item._id)}
                        className="flex-1"
                        size="sm"
                        disabled={
                          isOperationLoading === `cart-${item._id}` ||
                          item.stock === 0
                        }
                      >
                        {isOperationLoading === `cart-${item._id}` ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <ShoppingCart className="h-4 w-4 mr-2" />
                        )}
                        {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromWishlist(item._id)}
                        className="text-destructive hover:text-destructive"
                        disabled={isOperationLoading === item._id}
                      >
                        {isOperationLoading === item._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
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
