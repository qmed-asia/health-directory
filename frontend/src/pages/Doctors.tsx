import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { DoctorCard } from "@/components/DoctorCard";
import { fetchDoctors, Doctor } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");

  const { data: allDoctors = [], isLoading, error } = useQuery({
    queryKey: ['doctors'],
    queryFn: fetchDoctors
  });

  const sources = ["all", "columbia", "gleaneagles", "tungshin", "georgetownspecialist"];

  // Extract all unique specialties from all doctors
  const specialties = useMemo(() => {
    const specialtySet = new Set<string>();
    allDoctors.forEach(doctor => {
      if (doctor.source === 'columbia') {
        specialtySet.add(doctor.specialityTitle);
      } else if (doctor.source === 'gleaneagles') {
        // Gleneagles has multiple specialties separated by ##
        doctor.specialtyName.split('##').forEach(s => specialtySet.add(s.trim()));
      } else if (doctor.source === 'tungshin') {
        specialtySet.add(doctor.specialty);
      } else if (doctor.source === 'georgetownspecialist') {
        specialtySet.add(doctor.specialty);
      }
    });
    return ["all", ...Array.from(specialtySet).sort()];
  }, [allDoctors]);

  const getSearchableText = (doctor: Doctor): string => {
    let text = "";
    
    if (doctor.source === 'gleaneagles') {
      text = `${doctor.salutation} ${doctor.title} ${doctor.specialtyName} ${doctor.hospitalName}`;
    } else if (doctor.source === 'columbia') {
      text = `${doctor.name} ${doctor.specialityTitle} ${doctor.designation} ${doctor.qualification}`;
    } else if (doctor.source === 'tungshin') {
      text = `${doctor.name} ${doctor.specialty}`;
    } else if (doctor.source === 'georgetownspecialist') {
      text = `${doctor.name} ${doctor.specialty} ${doctor.qualification}`;
    }
    
    return text.toLowerCase();
  };

  const filteredDoctors = useMemo(() => {
    return allDoctors.filter(doctor => {
      const matchesSearch = searchQuery === "" ||
        getSearchableText(doctor).includes(searchQuery.toLowerCase());
      
      const matchesSource = selectedSource === "all" || doctor.source === selectedSource;

      let matchesSpecialty = selectedSpecialty === "all";
      if (!matchesSpecialty) {
        if (doctor.source === 'columbia') {
          matchesSpecialty = doctor.specialityTitle === selectedSpecialty;
        } else if (doctor.source === 'gleaneagles') {
          matchesSpecialty = doctor.specialtyName.split('##').some(s => s.trim() === selectedSpecialty);
        } else if (doctor.source === 'tungshin') {
          matchesSpecialty = doctor.specialty === selectedSpecialty;
        } else if (doctor.source === 'georgetownspecialist') {
          matchesSpecialty = doctor.specialty === selectedSpecialty;
        }
      }

      return matchesSearch && matchesSource && matchesSpecialty;
    });
  }, [allDoctors, searchQuery, selectedSource, selectedSpecialty]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Doctors Directory</h1>
          <p className="text-lg text-muted-foreground">
            Find qualified doctors from {allDoctors.length} medical professionals
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card p-6 rounded-xl shadow-card mb-8 animate-scale-in">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search doctors by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger>
                <SelectValue placeholder="Select Source" />
              </SelectTrigger>
              <SelectContent>
                {sources.map(source => (
                  <SelectItem key={source} value={source} className="capitalize">
                    {source === "all" ? "All Sources" : source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Select Specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map(specialty => (
                  <SelectItem key={specialty} value={specialty} className="capitalize">
                    {specialty === "all" ? "All Specialties" : specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && (
           <div className="text-center py-16">
            <p className="text-xl text-red-500">Failed to load doctors. Please try again later.</p>
          </div>
        )}

        {/* Results Count */}
        {!isLoading && !error && (
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}
            </p>
          </div>
        )}

        {/* Doctor Cards Grid */}
        {!isLoading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <div key={doctor.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <DoctorCard doctor={doctor} />
              </div>
            ))}
          </div>
        )}

        {!isLoading && !error && filteredDoctors.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No doctors found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
