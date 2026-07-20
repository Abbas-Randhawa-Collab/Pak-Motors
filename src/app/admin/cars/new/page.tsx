import CarForm from "@/components/admin/CarForm";

export default function NewCarPage() {
  return (
    <div>
      <h1 className="text-2xl normal-case tracking-normal mb-1">Add New Car</h1>
      <p className="text-gray text-sm mb-6">Create a new listing for the showroom.</p>
      <CarForm />
    </div>
  );
}
