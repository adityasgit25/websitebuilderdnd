import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-lg">Websites.co.in</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#templates" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/builder" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Start Building
            </Link>
            <Button size="sm">
              Sign In
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl">
              Build stunning websites with our new drag & drop editor
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Transform your ideas into beautiful websites with our intuitive drag-and-drop builder. No coding required.
            </p>
            <div className="mt-10 flex gap-4">
              <Button asChild size="lg">
                <Link href="/builder">
                  Start Building Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                View Templates
              </Button>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container">
            <div className="relative rounded-xl overflow-hidden border shadow-lg">
              <img 
                src="https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg" 
                alt="Website Builder Interface" 
                className="w-full aspect-[16/9] object-cover object-top"
              />
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-16">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Drag & Drop Editor",
                  description: "Intuitively place elements anywhere on your website with our easy-to-use drag and drop interface."
                },
                {
                  title: "Customizable Templates",
                  description: "Start with beautiful templates and customize them to match your brand and style."
                },
                {
                  title: "Form-Based Configuration",
                  description: "Easily configure every aspect of your elements using our intuitive form-based approach."
                },
                {
                  title: "Responsive Design",
                  description: "Every website you create is automatically responsive, looking great on any device."
                },
                {
                  title: "Real-Time Preview",
                  description: "See changes in real-time as you build and edit your website."
                },
                {
                  title: "No Coding Required",
                  description: "Create professional websites without writing a single line of code."
                }
              ].map((feature, i) => (
                <div key={i} className="bg-background rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">© 2025 Websites.co.in. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}