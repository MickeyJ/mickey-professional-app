import Link from 'next/link';

export default function ServicesOverview() {
  const services = [
    {
      title: 'Weekly Service',
      description: 'Our most popular option! Guaranteed weekly cleanup to keep your yard pristine.',
      features: [
        'Scheduled weekly visits',
        'All waste removed',
        'Natural disinfectant spray',
        'Text reminders',
      ],
      popular: true,
    },
    {
      title: 'One-Time Cleanup',
      description: 'Perfect for getting your yard back on track or before special events.',
      features: [
        'Deep clean service',
        'All accumulated waste removed',
        'Natural disinfectant spray',
        'Same-week availability',
      ],
      popular: false,
    },
    {
      title: 'Bi-Weekly/Monthly',
      description: 'A convenient option for those who need less frequent maintenance.',
      features: [
        'Flexible scheduling',
        'Choose bi-weekly or monthly',
        'Natural disinfectant spray',
        'Reminder service',
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Choose Your Service Plan
          </h2>
          <p className="text-xl text-dark/70 max-w-2xl mx-auto">
            We offer flexible options to keep your yard clean and your family safe from harmful
            bacteria
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative bg-light rounded-xl p-8 flex flex-col ${
                service.popular ? 'ring-2 ring-accent shadow-xl' : 'shadow-lg'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-dark mb-4">{service.title}</h3>
              <p className="text-dark/70 mb-6">{service.description}</p>

              <ul className="space-y-3 mb-8 flex-grow">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start"
                  >
                    <svg
                      className="w-5 h-5 text-secondary mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-dark/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/services"
                className={`block text-center py-3 px-6 rounded-lg font-semibold transition-all mt-auto ${
                  service.popular
                    ? 'bg-accent text-white hover:bg-accent/90'
                    : 'bg-primary text-dark hover:bg-primary/90'
                }`}
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-dark/70 mb-4">Not sure which plan is right for you?</p>
          <Link
            href="/wip/contact"
            className="inline-flex items-center text-accent font-semibold hover:underline"
          >
            Contact us for a free consultation
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
