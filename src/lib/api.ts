import axios from "axios";
import { baseUrl } from "./constants";
import type {
  Category,
  CategoriesApiResponse,
  MealsFilterApiResponse,
  MealFilterParams,
  LoginResponse,
  OtpVerificationResponse,
  RegisterResponse,
  CartApiResponse,
  AddToCartRequest,
  UpdateCartRequest,
  WishlistApiResponse,
  AddToWishlistRequest,
  WishlistActionResponse,
} from "./types";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Categories API functions
export const categoriesApi = {
  getAllCategories: async (): Promise<Category[]> => {
    try {
      const response = await api.get<CategoriesApiResponse>(
        "/api/categories/all-categories"
      );

      return response.data.categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Failed to fetch categories");
    }
  },
};

// Meals API functions
export const mealsApi = {
  filterMeals: async (
    params: MealFilterParams
  ): Promise<MealsFilterApiResponse> => {
    try {
      const queryParams = new URLSearchParams();

      if (params.category) queryParams.append("category", params.category);
      if (params.searchTerm)
        queryParams.append("searchTerm", params.searchTerm);
      if (params.page) queryParams.append("page", params.page.toString());
      if (params.limit) queryParams.append("limit", params.limit.toString());

      const response = await api.get<MealsFilterApiResponse>(
        `/api/products/filter?${queryParams.toString()}`
      );

      return response.data;
    } catch (error) {
      console.error("Error filtering meals:", error);
      throw new Error("Failed to filter meals");
    }
  },
};

// Authentication API functions
export const authApi = {
  login: async (email: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>("/api/auth/login", {
        email,
      });

      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Failed to send OTP");
    }
  },

  register: async (
    email: string,
    password: string
  ): Promise<RegisterResponse> => {
    try {
      const response = await api.post<RegisterResponse>("/api/auth/register", {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.error("Error during registration:", error);
      throw new Error("Failed to register user");
    }
  },

  verifyOtp: async (
    email: string,
    otp: string
  ): Promise<OtpVerificationResponse> => {
    try {
      const response = await api.post<OtpVerificationResponse>(
        "/api/auth/verify-login-otp",
        {
          email,
          otp,
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error during OTP verification:", error);
      throw new Error("Failed to verify OTP");
    }
  },
};

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

// Cart API functions
export const cartApi = {
  getCart: async (): Promise<CartApiResponse> => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await api.get<CartApiResponse>("/api/cart/get-cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw new Error("Failed to fetch cart");
    }
  },

  addToCart: async (
    productData: AddToCartRequest
  ): Promise<CartApiResponse> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await api.post<CartApiResponse>(
        "/api/cart/add-to-cart",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw new Error("Failed to add item to cart");
    }
  },

  updateCart: async (
    updateData: UpdateCartRequest
  ): Promise<CartApiResponse> => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await api.put<CartApiResponse>(
        "/api/cart/update-cart",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error updating cart:", error);
      throw new Error("Failed to update cart item");
    }
  },

  removeFromCart: async (productId: string): Promise<CartApiResponse> => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await api.delete<CartApiResponse>(
        `/api/cart/remove-from-cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw new Error("Failed to remove item from cart");
    }
  },

  clearCart: async (): Promise<CartApiResponse> => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await api.delete<CartApiResponse>(
        "/api/cart/clear-cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw new Error("Failed to clear cart");
    }
  },
};

// Wishlist API functions
export const wishlistApi = {
  getWishlist: async (): Promise<WishlistApiResponse> => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await api.get<WishlistApiResponse>("/api/wishlist/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      throw new Error("Failed to fetch wishlist");
    }
  },

  addToWishlist: async (
    productData: AddToWishlistRequest
  ): Promise<WishlistActionResponse> => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await api.post<WishlistActionResponse>(
        "/api/wishlist/add",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      throw new Error("Failed to add item to wishlist");
    }
  },

  removeFromWishlist: async (
    productId: string
  ): Promise<WishlistActionResponse> => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await api.delete<WishlistActionResponse>(
        `/api/wishlist/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      throw new Error("Failed to remove item from wishlist");
    }
  },

  clearWishlist: async (): Promise<WishlistActionResponse> => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await api.delete<WishlistActionResponse>(
        "/api/wishlist/clear",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      throw new Error("Failed to clear wishlist");
    }
  },
};

export default api;
