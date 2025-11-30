"use client";

import { useState, useMemo } from "react";
import { HospitalCard } from "@/components/HospitalCard";
import { Hospital } from "@/lib/server-data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface HospitalsClientProps {
  initialHospitals: Hospital[];
}

export const HospitalsClient = ({ initialHospitals }: HospitalsClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedGroup, setSelectedGroup] = useState<string>("all");

  const states = useMemo(() => {
    const stateSet = new Set(initialHospitals.map((h) => h.state));
    return Array.from(stateSet).sort();
  }, [initialHospitals]);

  const groups = useMemo(() => {
    const groupSet = new Set(initialHospitals.map((h) => h.hospitalGroup));
    return Array.from(groupSet).sort();
  }, [initialHospitals]);

  const filteredHospitals = useMemo(() => {
    return initialHospitals.filter((hospital) => {
      const matchesSearch =
        searchQuery === "" ||
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesState =
        selectedState === "all" || hospital.state === selectedState;
      const matchesGroup =
        selectedGroup === "all" || hospital.hospitalGroup === selectedGroup;

      return matchesSearch && matchesState && matchesGroup;
    });
  }, [initialHospitals, searchQuery, selectedState, selectedGroup]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-card p-6 rounded-xl shadow-card animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search hospitals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger>
              <SelectValue placeholder="Select Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Groups</SelectItem>
              {groups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
        {filteredHospitals.map((hospital) => (
          <HospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No hospitals found matching your criteria.
        </div>
      )}
    </div>
  );
};
