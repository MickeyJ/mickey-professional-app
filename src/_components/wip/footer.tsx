import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Doodoo Slayers</h3>
            <p className="text-white/80">
              Professional dog waste removal services in Arroyo Grande, CA. Keeping your yard clean and safe!
            </p>
            <p className="text-sm text-white/70 mt-4">Black Owned Business</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link
                  href="/wip/services"
                  className="hover:text-white transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/wip/contact"
                  className="hover:text-white transition-colors"
                >
                  Book Service
                </Link>
              </li>
              <li>
                <Link
                  href="/wip/contact#area"
                  className="hover:text-white transition-colors"
                >
                  Service Area
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <a
                  href="tel:8057148201"
                  className="hover:text-white transition-colors"
                >
                  (805) 714-8201
                </a>
              </li>
              <li>
                <a
                  href="mailto:doodooslayers@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  doodooslayers@gmail.com
                </a>
              </li>
              <li>Arroyo Grande, CA</li>
              <li className="pt-2">
                <span className="text-sm">Hours: By Appointment</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Doodoo Slayers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
