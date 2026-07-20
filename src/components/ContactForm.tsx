"use client";

import { useState } from "react";
import type { InquiryType } from "@/lib/types";

export default function ContactForm({
  defaultType = "buy",
  carId,
}: {
  defaultType?: InquiryType;
  carId?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    inquiry_type: defaultType,
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, car_id: carId }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm({ full_name: "", phone: "", inquiry_type: defaultType, message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-line rounded-xl p-6 bg-off text-sm">
        Thanks — your message has been sent. Nasir or Ali Sultan will contact
        you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
      <input
        type="text"
        placeholder="Full Name"
        required
        value={form.full_name}
        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        className="w-full px-4 py-3 border border-line rounded-md text-sm"
      />
      <input
        type="text"
        placeholder="Phone Number"
        required
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full px-4 py-3 border border-line rounded-md text-sm"
      />
      <select
        value={form.inquiry_type}
        onChange={(e) => setForm({ ...form, inquiry_type: e.target.value as InquiryType })}
        className="w-full px-4 py-3 border border-line rounded-md text-sm"
      >
        <option value="buy">I want to buy a car</option>
        <option value="sell">I want to sell a car</option>
        <option value="finance">I need bank finance help</option>
        <option value="import">I want to import a specific car</option>
      </select>
      <textarea
        placeholder="Tell us what you're looking for..."
        rows={4}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full px-4 py-3 border border-line rounded-md text-sm"
      />
      <button type="submit" disabled={status === "sending"} className="btn btn-red justify-center">
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-red text-xs">Something went wrong — please try again or call us directly.</p>
      )}
    </form>
  );
}
