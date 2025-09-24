import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { cartApi } from "@/lib/api";
import type { Cart, CartItem } from "@/lib/types";

export default function Cart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  // Load cart data on component mount
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cartApi.getCart();
      setCart(response.data);
    } catch (error) {
      console.error("Error loading cart:", error);
      setError(error instanceof Error ? error.message : "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      setUpdating(productId);
      const response = await cartApi.updateCart({
        productId,
        quantity: newQuantity,
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error updating quantity:", error);
      setError("Failed to update item quantity");
    } finally {
      setUpdating(null);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      setUpdating(productId);
      const response = await cartApi.removeFromCart(productId);
      setCart(response.data);
    } catch (error) {
      console.error("Error removing item:", error);
      setError("Failed to remove item from cart");
    } finally {
      setUpdating(null);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      const response = await cartApi.clearCart();
      setCart(response.data);
    } catch (error) {
      console.error("Error clearing cart:", error);
      setError("Failed to clear cart");
    } finally {
      setLoading(false);
    }
  };

  const getTotalPrice = () => {
    return cart?.totalAmount || 0;
  };

  const getTotalItems = () => {
    return cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  };

  const getItemPrice = (item: CartItem) => {
    return item.price * item.quantity;
  };

  const getDisplayName = (item: CartItem) => {
    return item.product?.name || `Product ${item.meal || item._id}`;
  };

  const getDisplayPrice = (item: CartItem) => {
    return item.product?.price || item.price;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">
            Please log in to access your cart
          </h2>
          <p className="text-muted-foreground mb-6">
            You need to be logged in to view and manage your cart items.
          </p>
          <Button asChild className="mb-4 mr-4">
            <a href="/login">Login to Continue</a>
          </Button>
          <Button variant="outline" onClick={loadCart}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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
        {!cart || cart.items.length === 0 ? (
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  disabled={loading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </div>

              {cart.items.map((item) => {
                const itemId = item.product?._id || item.meal || item._id;
                const isUpdating = updating === itemId;

                return (
                  <Card key={item._id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                          {(item.product as any)?.images?.[0] ? (
                            <img
                              src={(item.product as any).images[0]}
                              alt={item.product?.name}
                              className="max-w-full max-h-full"
                            />
                          ) : (
                            <div>no image</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">
                                {getDisplayName(item)}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                ${getDisplayPrice(item).toFixed(2)} each
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(itemId)}
                              disabled={isUpdating}
                              className="text-destructive hover:text-destructive"
                            >
                              {isUpdating ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(itemId, item.quantity - 1)
                                }
                                disabled={isUpdating}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-medium min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(itemId, item.quantity + 1)
                                }
                                disabled={isUpdating}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">
                                ${getItemPrice(item).toFixed(2)}
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
                  <Button className="w-full" size="lg" asChild>
                    <a href="/order">Proceed to Checkout</a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    asChild
                  >
                    <a href="/menu">Continue Shopping</a>
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
