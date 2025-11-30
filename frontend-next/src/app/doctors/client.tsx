"use client";

import { useState, useMemo } from "react";
import { DoctorCard } from "@/components/DoctorCard";
import { Doctor } from "@/lib/server-data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface DoctorsClientProps {
  initialDoctors: Doctor[];
}

export const DoctorsClient = ({ initialDoctors }: DoctorsClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");

  const sources = [
    "all",
    "columbia",
    "gleaneagles",
    "tungshin",
    "georgetownspecialist",
  ];

  // Extract all unique specialties from all doctors
  const specialties = useMemo(() => {
    const specialtySet = new Set<string>();
    initialDoctors.forEach((doctor) => {
      if (doctor.source === "columbia") {
        if (doctor.specialityTitle) specialtySet.add(doctor.specialityTitle);
      } else if (doctor.source === "gleaneagles") {
        // Gleneagles has multiple specialties separated by ##
        if (doctor.specialtyName) {
          doctor.specialtyName
            .split("##")
            .forEach((s) => specialtySet.add(s.trim()));
        }
      } else if (doctor.source === "tungshin") {
        if (doctor.specialty) specialtySet.add(doctor.specialty);
      } else if (doctor.source === "georgetownspecialist") {
        if (doctor.specialty) specialtySet.add(doctor.specialty);
      }
    });
    // Filter out empty strings
    return ["all", ...Array.from(specialtySet).filter(s => s && s.trim() !== "").sort()];
  }, [initialDoctors]);

  const getSearchableText = (doctor: Doctor): string => {
    let text = "";

    if (doctor.source === "gleaneagles") {
      text = `${doctor.salutation} ${doctor.title} ${doctor.specialtyName} ${doctor.hospitalName}`;
    } else if (doctor.source === "columbia") {
      text = `${doctor.name} ${doctor.specialityTitle} ${doctor.designation} ${doctor.qualification}`;
    } else if (doctor.source === "tungshin") {
      text = `${doctor.name} ${doctor.specialty}`;
    } else if (doctor.source === "georgetownspecialist") {
      text = `${doctor.name} ${doctor.specialty} ${doctor.qualification}`;
    }

    return text.toLowerCase();
  };

  const filteredDoctors = useMemo(() => {
    return initialDoctors.filter((doctor) => {
      const matchesSearch =
        searchQuery === "" ||
        getSearchableText(doctor).includes(searchQuery.toLowerCase());

      const matchesSource =
        selectedSource === "all" || doctor.source === selectedSource;

      let matchesSpecialty = selectedSpecialty === "all";
      if (!matchesSpecialty) {
        if (doctor.source === "columbia") {
          matchesSpecialty = doctor.specialityTitle === selectedSpecialty;
        } else if (doctor.source === "gleaneagles") {
          matchesSpecialty = doctor.specialtyName
            .split("##")
            .some((s) => s.trim() === selectedSpecialty);
        } else if (doctor.source === "tungshin") {
          matchesSpecialty = doctor.specialty === selectedSpecialty;
        } else if (doctor.source === "georgetownspecialist") {
          matchesSpecialty = doctor.specialty === selectedSpecialty;
        }
      }

      return matchesSearch && matchesSource && matchesSpecialty;
    });
  }, [initialDoctors, searchQuery, selectedSource, selectedSpecialty]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-card p-6 rounded-xl shadow-card animate-in fade-in slide-in-from-bottom-4 duration-500">
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
              {sources.map((source) => (
                <SelectItem key={source} value={source}>
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
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty === "all" ? "All Specialties" : specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No doctors found matching your criteria.
        </div>
      )}
    </div>
  );
};
