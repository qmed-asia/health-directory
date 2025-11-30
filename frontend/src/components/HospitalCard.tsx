import { Hospital } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Globe } from "lucide-react";
import { Link } from "react-router-dom";

interface HospitalCardProps {
  hospital: Hospital;
}

export const HospitalCard = ({ hospital }: HospitalCardProps) => {
  return (
    <Link to={`/hospitals/${hospital.id}`}>
      <Card className="p-6 shadow-card hover:shadow-card-hover transition-smooth hover:scale-[1.02] cursor-pointer bg-card">
        <div className="space-y-4">
          <div>
            <div className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full mb-2">
              {hospital.hospitalGroup}
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              {hospital.name}
            </h3>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
              <div>
                <p>{hospital.address}</p>
                <p>{hospital.city}, {hospital.state}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
              <p>{hospital.telephone}</p>
            </div>

            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 flex-shrink-0 text-primary" />
              <p className="truncate">{hospital.website}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <span className="text-sm font-medium text-primary hover:underline">
              View Doctors →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
