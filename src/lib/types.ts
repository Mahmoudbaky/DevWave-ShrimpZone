export interface Category {
  _id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface CategoriesApiResponse {
  categories: Category[];
  success: boolean;
  message?: string;
}

// Meal interfaces based on API response
export interface Meal {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MealsFilterApiResponse {
  success: boolean;
  data: Meal[];
  total: number;
  page: number;
  pages: number;
}

export interface MealFilterParams {
  category?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
}

// Authentication interfaces
export interface LoginRequest {
  email: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    expiresAt: string;
  };
}

export interface OtpVerificationRequest {
  email: string;
  otp: string;
}

export interface User {
  _id: string;
  email: string;
  role: string;
}

export interface OtpVerificationResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}
