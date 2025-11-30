import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Hospital, Stethoscope, MapPin, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/hospitals?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="gradient-hero py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Find Your Healthcare Provider
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Search through Malaysia's comprehensive directory of hospitals and qualified doctors
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2 bg-card p-2 rounded-xl shadow-card">
              <Input
                type="text"
                placeholder="Search hospitals, doctors, or specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent text-lg focus-visible:ring-0"
              />
              <Button type="submit" size="lg" className="bg-gradient-primary hover:opacity-90">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 animate-scale-in">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hospital className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Top Hospitals</h3>
              <p className="text-muted-foreground">
                Access information about leading healthcare facilities across Malaysia
              </p>
            </div>

            <div className="text-center p-6 animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualified Doctors</h3>
              <p className="text-muted-foreground">
                Connect with experienced medical professionals in various specialties
              </p>
            </div>

            <div className="text-center p-6 animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <div className="bg-secondary text-secondary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nationwide Coverage</h3>
              <p className="text-muted-foreground">
                Find healthcare providers in cities and states throughout Malaysia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-4xl text-center">
          <Award className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to Find Care?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Browse our comprehensive directory to find the right healthcare provider for you
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              onClick={() => navigate("/hospitals")}
              className="bg-gradient-primary hover:opacity-90"
            >
              Browse Hospitals
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/doctors")}
              className="border-primary text-primary hover:bg-primary/10"
            >
              Find Doctors
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4 mt-16">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 MYHospital. Healthcare Directory for Malaysia. <br className="md:hidden" /> Open Source Project by <a href="https://qmed.asia" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Qmed Asia</a>.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
