import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { fetchDoctors } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Stethoscope, GraduationCap, Languages, Building2, User, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: allDoctors = [], isLoading, error } = useQuery({
    queryKey: ['doctors'],
    queryFn: fetchDoctors
  });

  const doctor = allDoctors.find(d => d.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Doctor Not Found</h1>
          <Button onClick={() => navigate("/doctors")}>
            Back to Doctors
          </Button>
        </div>
      </div>
    );
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
      return [doctor.specialityTitle];
    }
    return [doctor.specialty];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/doctors")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Doctors
        </Button>

        <div className="animate-fade-in">
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
                <div>
                  <h3 className="font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-accent" />
                    Specialization
                  </h3>
                  <div className="space-y-1">
                    {getSpecialty().map((specialty, index) => (
                      <p key={index} className="text-foreground pl-7">{specialty}</p>
                    ))}
                  </div>
                </div>

                {doctor.source === 'columbia' && (
                  <>
                    <div>
                      <h3 className="font-medium text-muted-foreground mb-2 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-accent" />
                        Designation
                      </h3>
                      <p className="text-foreground pl-7">{doctor.designation}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-muted-foreground mb-2 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-accent" />
                        Qualifications
                      </h3>
                      <p className="text-foreground pl-7">{doctor.qualification}</p>
                    </div>
                  </>
                )}

                {doctor.source === 'gleaneagles' && (
                  <>
                    <div>
                      <h3 className="font-medium text-muted-foreground mb-2 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-accent" />
                        Hospital
                      </h3>
                      <p className="text-foreground pl-7">{doctor.hospitalName}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-muted-foreground mb-2 flex items-center gap-2">
                        <Languages className="w-5 h-5 text-accent" />
                        Languages Spoken
                      </h3>
                      <p className="text-foreground pl-7">{doctor.languageSpoken}</p>
                    </div>
                  </>
                )}

                {doctor.source === 'georgetownspecialist' && (
                  <div>
                    <h3 className="font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-accent" />
                      Qualifications
                    </h3>
                    <p className="text-foreground pl-7">{doctor.qualification}</p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <h2 className="text-2xl font-semibold mb-4">About the Doctor</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {getDoctorName()} is a qualified medical professional specializing in{' '}
                  {getSpecialty().join(' and ')}.
                </p>
                <p>
                  Contact for more info.
                </p>
                <div className="pt-4">
                  <h3 className="font-semibold text-foreground mb-2">Professional Focus</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Patient-centered care approach</li>
                    
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
