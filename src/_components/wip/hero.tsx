import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-light to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-dark mb-6">
            Your Yard Deserves Better Than <span className="text-primary">Doo Doo</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-dark/80 mb-8">
            Professional dog waste removal services in Arroyo Grande.
            <br />
            We handle the dirty work so you don't have to!
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="bg-accent text-white text-lg px-8 py-4 rounded-lg hover:bg-accent/90 transition-all transform hover:scale-105 shadow-lg"
            >
              Book Your Service Today
            </Link>
            <a
              href="tel:8057148201"
              className="bg-secondary text-white text-lg px-8 py-4 rounded-lg hover:bg-secondary/90 transition-all transform hover:scale-105 shadow-lg"
            >
              Call (805) 714-8201
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary text-4xl mb-3">🌿</div>
              <h3 className="font-semibold text-dark mb-2">All Natural Disinfectant</h3>
              <p className="text-dark/70">Every service includes eco-friendly sanitization</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary text-4xl mb-3">⏰</div>
              <h3 className="font-semibold text-dark mb-2">Reliable Service</h3>
              <p className="text-dark/70">Weekly, bi-weekly, or one-time cleanups</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary text-4xl mb-3">🏠</div>
              <h3 className="font-semibold text-dark mb-2">Local & Trusted</h3>
              <p className="text-dark/70">Proudly serving Arroyo Grande families</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
