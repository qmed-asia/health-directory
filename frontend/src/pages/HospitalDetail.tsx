import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { hospitals } from "@/data/hospitals";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Globe, ArrowLeft, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const HospitalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hospital = hospitals.find(h => h.id === id);

  if (!hospital) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Hospital Not Found</h1>
          <Button onClick={() => navigate("/hospitals")}>
            Back to Hospitals
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/hospitals")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hospitals
        </Button>

        <div className="animate-fade-in">
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
                  <h3 className="font-medium text-muted-foreground mb-1">Address</h3>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="text-foreground">{hospital.address}</p>
                      <p className="text-foreground">{hospital.city}, {hospital.state}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-muted-foreground mb-1">Contact</h3>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 flex-shrink-0 text-primary" />
                    <a href={`tel:${hospital.telephone}`} className="text-foreground hover:text-primary">
                      {hospital.telephone}
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-muted-foreground mb-1">Website</h3>
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

              <div className="mt-6 pt-6 border-t border-border">
                <Button
                  className="w-full bg-gradient-primary hover:opacity-90"
                  onClick={() => window.open(hospital.website, '_blank')}
                >
                  Visit Hospital Website
                </Button>
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <h2 className="text-2xl font-semibold mb-4">About</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {hospital.name} is part of the {hospital.hospitalGroup} healthcare network,
                  providing quality medical services in {hospital.city}, {hospital.state}.
                </p>
                <p>
                  The hospital offers a comprehensive range of medical specialties and is equipped
                  with modern facilities to ensure the best patient care.
                </p>
                <div className="pt-4">
                  <h3 className="font-semibold text-foreground mb-2">Key Features</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>24/7 Emergency Services</li>
                    <li>Specialized Medical Departments</li>
                    <li>Modern Diagnostic Facilities</li>
                    <li>Experienced Medical Professionals</li>
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

export default HospitalDetail;
