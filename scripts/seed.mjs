// Optional helper: seeds a few extra demo cars using the Supabase service
// role key (bypasses RLS). Run with: npm run seed
// Requires SUPABASE_SERVICE_ROLE_KEY in your .env.local (never expose this
// key in the browser / commit it to git).
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

const cars = [
  {
    title: "Toyota Fortuner Sigma 4",
    brand: "Toyota",
    model: "Fortuner Sigma 4",
    year: 2023,
    price: 15500000,
    mileage_km: 5000,
    fuel_type: "Diesel",
    transmission: "Automatic",
    city: "Bahawalpur",
    category: "SUV",
    tag: "BRAND NEW",
    description: "Brand new Fortuner Sigma 4, full showroom warranty.",
    is_featured: true,
  },
  {
    title: "Suzuki Cultus VXL",
    brand: "Suzuki",
    model: "Cultus VXL",
    year: 2022,
    price: 3450000,
    mileage_km: 18000,
    fuel_type: "Petrol",
    transmission: "Manual",
    city: "Bahawalpur",
    category: "Hatchback",
    tag: null,
    description: "Well-maintained Cultus VXL, single owner.",
    is_featured: false,
  },
];

const { data, error } = await supabase.from("cars").insert(cars).select();
if (error) {
  console.error("Seed failed:", error.message);
  process.exit(1);
}
console.log(`Seeded ${data.length} additional cars.`);
