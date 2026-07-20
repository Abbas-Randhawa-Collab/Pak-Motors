// Hand-written types mirroring supabase/schema.sql.
// If you use the Supabase CLI you can replace this with generated types:
//   npx supabase gen types typescript --project-id <ref> > src/lib/types.ts

export type FuelType = "Petrol" | "Diesel" | "Hybrid" | "Electric" | "CNG";
export type Transmission = "Automatic" | "Manual";
export type CarCategory = "Sedan" | "SUV" | "Hatchback" | "Imported" | "Luxury" | "Van" | "Truck";
export type InquiryType = "buy" | "sell" | "finance" | "import";
export type InquiryStatus = "new" | "contacted" | "closed";
export type UserRole = "admin" | "staff";

export interface Car {
  id: string;
  title: string;
  brand: string;
  model: string | null;
  year: number;
  price: number;
  mileage_km: number;
  fuel_type: FuelType;
  transmission: Transmission;
  city: string;
  category: CarCategory;
  tag: string | null;
  description: string | null;
  image_url: string | null;
  gallery_urls: string[];
  is_available: boolean;
  is_featured: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  full_name: string;
  phone: string;
  inquiry_type: InquiryType;
  message: string | null;
  car_id: string | null;
  status: InquiryStatus;
  created_at: string;
}

export interface Review {
  id: string;
  reviewer_name: string;
  reviewer_city: string | null;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
}

// Minimal Database type so `createClient<Database>()` type-checks.
// Expand with generated types for full end-to-end type safety.
export interface Database {
  public: {
    Tables: {
      cars: { Row: Car; Insert: Partial<Car>; Update: Partial<Car> };
      inquiries: { Row: Inquiry; Insert: Partial<Inquiry>; Update: Partial<Inquiry> };
      reviews: { Row: Review; Insert: Partial<Review>; Update: Partial<Review> };
      profiles: { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> };
    };
  };
}
