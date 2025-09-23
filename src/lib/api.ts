import axios from "axios";
import { baseUrl } from "./constants";
import type {
  Category,
  CategoriesApiResponse,
  MealsFilterApiResponse,
  MealFilterParams,
  LoginResponse,
  OtpVerificationResponse,
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

      console.log("Categories API response:", response.data.categories);
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
        `/restaurant/meals/filter?${queryParams.toString()}`
      );

      console.log("Meals filter API response:", response.data);
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

      console.log("Login API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Failed to send OTP");
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

      console.log("OTP verification API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during OTP verification:", error);
      throw new Error("Failed to verify OTP");
    }
  },
};

export default api;
