import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Hospital, Stethoscope, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-primary">
              Find Your Healthcare Provider in Malaysia
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Connect with top hospitals and specialists. Your health journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/hospitals">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <Hospital className="w-5 h-5" />
                  Find Hospitals
                </Button>
              </Link>
              <Link href="/doctors">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                  <Stethoscope className="w-5 h-5" />
                  Find Doctors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-card">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-background shadow-sm border border-border/50 hover:border-primary/20 transition-smooth">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Easy Search</h3>
              <p className="text-muted-foreground">
                Quickly find hospitals and doctors by name, specialty, or location.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-background shadow-sm border border-border/50 hover:border-primary/20 transition-smooth">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Hospital className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Verified Hospitals</h3>
              <p className="text-muted-foreground">
                Access detailed information about top-rated medical centers.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-background shadow-sm border border-border/50 hover:border-primary/20 transition-smooth">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Stethoscope className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Expert Doctors</h3>
              <p className="text-muted-foreground">
                Browse profiles of qualified specialists across various fields.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
