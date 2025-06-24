import Link from 'next/link';

import Hero from '@/_components/wip/hero';
import ServicesOverview from '@/_components/wip/services-overview';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-br from-secondary to-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-dark text-center mb-12">
              Why Families Choose Doodoo Slayers
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-dark mb-3">🛡️ Safe & Sanitized</h3>
                <p className="text-dark/70">
                  Every service includes our all-natural disinfectant spray to eliminate harmful
                  bacteria and keep your family safe.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-dark mb-3">⭐ Reliable & Professional</h3>
                <p className="text-dark/70">
                  We show up when scheduled, every time. Your yard stays clean without you having to
                  think about it.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-dark mb-3">💚 Eco-Friendly</h3>
                <p className="text-dark/70">
                  We care about your yard and the environment. All our products are pet-safe and
                  environmentally responsible.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-dark mb-3">🏘️ Locally Owned</h3>
                <p className="text-dark/70">
                  As a Black-owned local business, we're proud to serve our Arroyo Grande community
                  with dedication and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
              Proudly Serving Arroyo Grande
            </h2>
            <p className="text-xl text-dark/70 mb-8">
              We provide reliable dog waste removal services throughout Arroyo Grande and
              surrounding areas. Not sure if we service your area? Give us a call!
            </p>
            <div className="bg-light p-8 rounded-lg">
              <p className="text-lg font-semibold text-dark mb-4">Ready to reclaim your yard?</p>
              <a
                href="tel:8057148201"
                className="text-2xl font-bold text-accent hover:text-accent/80 transition-colors"
              >
                (805) 714-8201
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Let's Get Your Yard Back to Perfect!
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join dozens of happy families who never have to worry about pet waste again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-accent text-lg px-8 py-4 rounded-lg hover:bg-light transition-all transform hover:scale-105 shadow-lg font-semibold"
            >
              Book Your First Service
            </Link>
            <Link
              href="/services"
              className="bg-transparent border-2 border-white text-white text-lg px-8 py-4 rounded-lg hover:bg-white/10 transition-all font-semibold"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
