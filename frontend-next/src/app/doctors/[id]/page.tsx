import { getDoctorById } from "@/lib/server-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Stethoscope, GraduationCap, Languages, Building2, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doctor = await getDoctorById(id);

  if (!doctor) {
    notFound();
  }

  const getDoctorName = () => {
    if (doctor.source === 'gleaneagles') {
      return `${doctor.salutation} ${doctor.title}`;
    }
    return doctor.name;
  };

  const getSpecialty = () => {
    if (doctor.source === 'gleaneagles') {
      return doctor.specialtyName.split('##');
    }
    if (doctor.source === 'columbia') {
      return doctor.specialityTitle ? [doctor.specialityTitle] : [];
    }
    return doctor.specialty ? [doctor.specialty] : [];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/doctors">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Doctors
        </Button>
      </Link>

      <div className="animate-in fade-in duration-500">
        <div className="mb-6">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4 capitalize">
            {doctor.source}
          </div>
          <h1 className="text-4xl font-bold mb-2">{getDoctorName()}</h1>
          <div className="flex flex-wrap gap-2">
            {getSpecialty().map((specialty, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-card">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <User className="w-6 h-6 text-primary" />
              Professional Information
            </h2>
            
            <div className="space-y-4">
              {doctor.source === 'columbia' && (
                <>
                  {doctor.designation && (
                    <div className="flex items-start gap-2">
                      <Building2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium text-foreground">Designation</h3>
                        <p className="text-muted-foreground">{doctor.designation}</p>
                      </div>
                    </div>
                  )}
                  {doctor.qualification && (
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-5 h-5 mt-0.5 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium text-foreground">Qualification</h3>
                        <p className="text-muted-foreground">{doctor.qualification}</p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {doctor.source === 'gleaneagles' && (
                <>
                  {doctor.hospitalName && (
                    <div className="flex items-start gap-2">
                      <Building2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium text-foreground">Hospital</h3>
                        <p className="text-muted-foreground">{doctor.hospitalName}</p>
                      </div>
                    </div>
                  )}
                  {doctor.languageSpoken && (
                    <div className="flex items-start gap-2">
                      <Languages className="w-5 h-5 mt-0.5 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium text-foreground">Languages</h3>
                        <p className="text-muted-foreground">{doctor.languageSpoken}</p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {doctor.source === 'georgetownspecialist' && doctor.qualification && (
                <div className="flex items-start gap-2">
                  <GraduationCap className="w-5 h-5 mt-0.5 flex-shrink-0 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium text-foreground">Qualification</h3>
                    <p className="text-muted-foreground">{doctor.qualification}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
