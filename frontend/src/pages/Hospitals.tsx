import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { HospitalCard } from "@/components/HospitalCard";
import { hospitals } from "@/data/hospitals";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const Hospitals = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedGroup, setSelectedGroup] = useState<string>("all");

  const states = useMemo(() => {
    const stateSet = new Set(hospitals.map(h => h.state));
    return Array.from(stateSet).sort();
  }, []);

  const groups = useMemo(() => {
    const groupSet = new Set(hospitals.map(h => h.hospitalGroup));
    return Array.from(groupSet).sort();
  }, []);

  const filteredHospitals = useMemo(() => {
    return hospitals.filter(hospital => {
      const matchesSearch = searchQuery === "" ||
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesState = selectedState === "all" || hospital.state === selectedState;
      const matchesGroup = selectedGroup === "all" || hospital.hospitalGroup === selectedGroup;

      return matchesSearch && matchesState && matchesGroup;
    });
  }, [searchQuery, selectedState, selectedGroup]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Hospitals Directory</h1>
          <p className="text-lg text-muted-foreground">
            Browse through {hospitals.length} hospitals across Malaysia
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card p-6 rounded-xl shadow-card mb-8 animate-scale-in">
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
                {states.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Select Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                {groups.map(group => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredHospitals.length} {filteredHospitals.length === 1 ? 'hospital' : 'hospitals'}
          </p>
        </div>

        {/* Hospital Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital, index) => (
            <div key={hospital.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <HospitalCard hospital={hospital} />
            </div>
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No hospitals found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hospitals;
