import { getDoctors } from "@/lib/server-data";
import { DoctorsClient } from "./client";

export default async function DoctorsPage() {
  const doctors = await getDoctors();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Doctors</h1>
        <p className="text-muted-foreground">
          Find qualified doctors and specialists.
        </p>
      </div>
      <DoctorsClient initialDoctors={doctors} />
    </div>
  );
}
