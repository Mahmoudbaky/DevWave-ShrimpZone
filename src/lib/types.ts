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
  products: Meal[];
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

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

// Cart interfaces
export interface CartItem {
  _id: string;
  meal?: string;
  product?: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartApiResponse {
  success: boolean;
  message: string;
  data: Cart;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartRequest {
  productId: string;
  quantity: number;
}

// Wishlist interfaces
export interface WishlistItem {
  _id: string;
  name: string;
  brand: string;
  description: string;
  aboutItem: string[];
  price: number;
  category: string;
  stock: number;
  deliveryDate: string;
  discount: number;
  saleRate: number;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface WishlistApiResponse {
  success: boolean;
  message: string;
  data: WishlistItem[];
}

export interface AddToWishlistRequest {
  productId: string;
}

export interface WishlistActionResponse {
  success: boolean;
  message: string;
}
