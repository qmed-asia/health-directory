import { Doctor } from "@/data/doctors";
import { Card } from "@/components/ui/card";
import { Stethoscope, GraduationCap, Languages, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const getDoctorName = () => {
    if (doctor.source === 'gleaneagles') {
      return `${doctor.salutation} ${doctor.title}`;
    }
    return doctor.name;
  };

  const getSpecialty = () => {
    if (doctor.source === 'gleaneagles') {
      return doctor.specialtyName.split('##').join(', ');
    }
    if (doctor.source === 'columbia') {
      return doctor.specialityTitle;
    }
    return doctor.specialty;
  };

  return (
    <Link to={`/doctors/${doctor.id}`}>
      <Card className="p-6 shadow-card hover:shadow-card-hover transition-smooth hover:scale-[1.02] cursor-pointer bg-card">
        <div className="space-y-3">
          <div>
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-2 capitalize">
              {doctor.source}
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-1">
              {getDoctorName()}
            </h3>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <Stethoscope className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
              <p className="text-muted-foreground">{getSpecialty()}</p>
            </div>

            {doctor.source === 'columbia' && (
              <>
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                  <p className="text-muted-foreground">{doctor.designation}</p>
                </div>
                <div className="flex items-start gap-2">
                  <GraduationCap className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                  <p className="text-muted-foreground">{doctor.qualification}</p>
                </div>
              </>
            )}

            {doctor.source === 'gleaneagles' && (
              <>
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                  <p className="text-muted-foreground">{doctor.hospitalName}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Languages className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                  <p className="text-muted-foreground">{doctor.languageSpoken}</p>
                </div>
              </>
            )}

            {doctor.source === 'georgetownspecialist' && (
              <div className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                <p className="text-muted-foreground">{doctor.qualification}</p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-border">
            <span className="text-sm font-medium text-primary hover:underline">
              View Profile →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
