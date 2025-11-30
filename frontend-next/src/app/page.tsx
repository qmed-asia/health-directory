import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Hospital, Stethoscope, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background z-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
        
        <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              Find Your <span className="text-primary">Healthcare Provider</span> in Malaysia
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl leading-relaxed">
              Connect with top hospitals and specialists. Your health journey starts here with our comprehensive directory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/hospitals">
                <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg hover:shadow-xl transition-all">
                  <Hospital className="w-5 h-5" />
                  Find Hospitals
                </Button>
              </Link>
              <Link href="/doctors">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 hover:bg-secondary/50">
                  <Stethoscope className="w-5 h-5" />
                  Find Doctors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl bg-background shadow-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-2xl text-primary mb-2">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Easy Search</h3>
              <p className="text-muted-foreground leading-relaxed">
                Quickly find hospitals and doctors by name, specialty, or location with our intuitive search.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl bg-background shadow-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-2xl text-primary mb-2">
                <Hospital className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Verified Hospitals</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access detailed, up-to-date information about top-rated medical centers across the country.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl bg-background shadow-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-2xl text-primary mb-2">
                <Stethoscope className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Expert Doctors</h3>
              <p className="text-muted-foreground leading-relaxed">
                Browse comprehensive profiles of qualified specialists across various medical fields.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
