"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Car } from "@/lib/types";

const categories = ["Sedan", "SUV", "Hatchback", "Imported", "Luxury", "Van", "Truck"];
const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric", "CNG"];
const transmissions = ["Automatic", "Manual"];

type FormState = Omit<Car, "id" | "created_at" | "updated_at" | "created_by" | "gallery_urls">;

export default function CarForm({ car }: { car?: Car }) {
  const router = useRouter();
  const isEdit = Boolean(car);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    title: car?.title ?? "",
    brand: car?.brand ?? "",
    model: car?.model ?? "",
    year: car?.year ?? new Date().getFullYear(),
    price: car?.price ?? 0,
    mileage_km: car?.mileage_km ?? 0,
    fuel_type: car?.fuel_type ?? "Petrol",
    transmission: car?.transmission ?? "Automatic",
    city: car?.city ?? "Bahawalpur",
    category: car?.category ?? "Sedan",
    tag: car?.tag ?? "",
    description: car?.description ?? "",
    image_url: car?.image_url ?? "",
    is_available: car?.is_available ?? true,
    is_featured: car?.is_featured ?? false,
  });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(isEdit ? `/api/cars/${car!.id}` : "/api/cars", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to save car");
      }
      router.push("/admin/cars");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-line rounded-2xl p-7 max-w-2xl">
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray mb-1.5">Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. Toyota Corolla Altis 2021"
            className="w-full px-3.5 py-2.5 border border-line rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray mb-1.5">Brand</label>
          <input
            required
            value={form.brand}
            onChange={(e) => update("brand", e.target.value)}
            className="w-full px-3.5 py-2.5 border border-line rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray mb-1.5">Model</label>
          <input
            value={form.model ?? ""}
            onChange={(e) => update("model", e.target.value)}
            className="w-full px-3.5 py-2.5 border border-line rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray mb-1.5">Year</label>
          <input
            type="number"
            required
            value={form.year}
            onChange={(e) => update("year", Number(e.target.value))}
            className="w-full px-3.5 py-2.5 border border-line rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray mb-1.5">Price (PKR)</label>
          <input
            type="number"
            required
            value={form.price}
            onChange={(e) => update("price", Number(e.target.value))}
            className="w-full px-3.5 py-2.5 border border-line rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray mb-1.5">Mileage (km)</label>
          <input
            type="number"
            required
            value={form.mileage_km}
            onChange={(e) => update("mileage_km", Number(e.target.value))}
            className="w-full px-3.5 py-2.5 border border-line rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray mb-1.5">City</label>
          <input
            required
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className="w-full px-3.5 py-2.5 border border-line rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray mb-1.5">Fuel Type</label>
          <select
            value={form.fuel_type}
            onChange={(e) => update("fuel_type", e.target.value as FormState["fuel_type"])}
            className="w-full px-3.5 py-2.5 border border-line rounded-md text-sm"
          >
            {fuelTypes.map((f) => <option key={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray mb-1.5">Transmission</label>
          <select
            value={form.transmission}
            onChange={(e) => update("transmission", e.target.value as FormState["transmission"])}
            className="w-full px-3.5 py-2.5 border border-line rounded-md text-sm"
          >
            {transmissions.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray mb-1.5">Category</label>
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value as FormState["category"])}
            className="w-full px-3.5 py-2.5 border border-line rounded-md text-sm"
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray mb-1.5">Tag (badge)</label>
          <input
            value={form.tag ?? ""}
            onChange={(e) => update("tag", e.target.value)}
            placeholder="e.g. FEATURED, IMPORTED · JAPAN"
            className="w-full px-3.5 py-2.5 border border-line rounded-md text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray mb-1.5">Image URL</label>
          <input
            value={form.image_url ?? ""}
            onChange={(e) => update("image_url", e.target.value)}
            placeholder="https://..."
            className="w-full px-3.5 py-2.5 border border-line rounded-md text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray mb-1.5">Description</label>
          <textarea
            rows={4}
            value={form.description ?? ""}
            onChange={(e) => update("description", e.target.value)}
            className="w-full px-3.5 py-2.5 border border-line rounded-md text-sm"
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            checked={form.is_available}
            onChange={(e) => update("is_available", e.target.checked)}
          />
          Available (visible to public)
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={(e) => update("is_featured", e.target.checked)}
          />
          Featured on homepage
        </label>
      </div>

      {error && <p className="text-red text-xs mb-4">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn btn-red">
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Car"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn btn-block-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}
