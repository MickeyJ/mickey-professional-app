export default function HeroSection() {
  return (
    <section className="py-12 px-4 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-display-lg text-light mb-4 sm:mb-6 text-balance leading-tight">
            Building digital experiences with&nbsp;
            <span className="font-semibold text-bright">PRECISION</span>
          </h1>
          <p className="text-base sm:text-lg md:text-body-lg text-dark mb-6 sm:mb-8 leading-relaxed">
            I'm a full-stack developer who crafts clean, functional, and interactive web
            applications using modern technologies like Next.js, TypeScript, and Tailwind CSS.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start">
            <button className="btn-primary w-full sm:w-auto">View My Work</button>
            <button className="btn-secondary w-full sm:w-auto">Get In Touch</button>
          </div>
        </div>
      </div>
    </section>
  );
}
