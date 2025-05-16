export default function HeroSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <h1 className="text-display-lg text-light mb-6 text-balance ">
            Building digital experiences with{' '}
            <span className="font-semibold text-bright">PRECISION</span>
          </h1>
          <p className="text-body-lg text-dark mb-8">
            I'm a full-stack developer who crafts clean, functional, and
            interactive web applications using modern technologies like Next.js,
            TypeScript, and Tailwind CSS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary">View My Work</button>
            <button className="btn-secondary">Get In Touch</button>
          </div>
        </div>
      </div>
    </section>
  );
}
