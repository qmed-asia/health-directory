import { getHospitalById } from "@/lib/server-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Globe, ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function HospitalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hospital = await getHospitalById(id);

  if (!hospital) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/hospitals">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hospitals
        </Button>
      </Link>

      <div className="animate-in fade-in duration-500">
        <div className="mb-6">
          <div className="inline-block px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-full mb-4">
            {hospital.hospitalGroup}
          </div>
          <h1 className="text-4xl font-bold mb-4">{hospital.name}</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-card">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              Hospital Information
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-muted-foreground mb-1">
                  Address
                </h3>
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="text-foreground">{hospital.address}</p>
                    <p className="text-foreground">
                      {hospital.city}, {hospital.state}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-muted-foreground mb-1">
                  Contact
                </h3>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 flex-shrink-0 text-primary" />
                  <a
                    href={`tel:${hospital.telephone}`}
                    className="text-foreground hover:text-primary"
                  >
                    {hospital.telephone}
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-muted-foreground mb-1">
                  Website
                </h3>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 flex-shrink-0 text-primary" />
                  <a
                    href={hospital.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline truncate"
                  >
                    {hospital.website}
                  </a>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              Services
            </h2>
            <p className="text-muted-foreground">
              Detailed service information coming soon.
            </p>
            {hospital.doctorDirectory && (
               <div className="mt-4">
                 <h3 className="font-medium text-foreground mb-2">Doctor Directory</h3>
                 <a 
                   href={hospital.doctorDirectory} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-primary hover:underline"
                 >
                   View Doctor Directory
                 </a>
               </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
