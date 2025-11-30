import { getHospitals } from "@/lib/server-data";
import { HospitalsClient } from "./client";

export default async function HospitalsPage() {
  const hospitals = await getHospitals();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Hospitals</h1>
        <p className="text-muted-foreground">
          Find the best hospitals and medical centers in Malaysia.
        </p>
      </div>
      <HospitalsClient initialHospitals={hospitals} />
    </div>
  );
}
