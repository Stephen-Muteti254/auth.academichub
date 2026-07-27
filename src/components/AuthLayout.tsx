import { Link, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
// import LightLogo from "@/assets/academichub-logo-light-theme.png";
// import DarkLogo from "@/assets/academichub-logo-dark-theme.png";
import LightLogo from "@/assets/logo/logo-light.svg";
import DarkLogo from "@/assets/logo/logo-dark.svg";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: PublicLayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (window.Tawk_API) return;

    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/69c446fe5b53181c371d124b/1jkjbakmf";
    script.async = true;
    document.body.appendChild(script);
  }, []);


  useEffect(() => {
    const checkTawk = setInterval(() => {
      if (window.Tawk_API) {
        const allowedRoutes = ["/", "/about", "/contact"];

        if (allowedRoutes.includes(location.pathname)) {
          window.Tawk_API.showWidget();
        } else {
          window.Tawk_API.hideWidget();
        }

        clearInterval(checkTawk);
      }
    }, 200);

    return () => clearInterval(checkTawk);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={LightLogo} 
                alt="AcademicHub" 
                className="w-auto h-12 block dark:hidden" 
              />
              <img 
                src={DarkLogo} 
                alt="AcademicHub" 
                className="w-auto h-12 hidden dark:block" 
              />
            </Link>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="ghost" className="w-full" asChild>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main><Outlet /></main>
    </div>
  );
};
