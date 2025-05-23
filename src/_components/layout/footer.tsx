import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 sm:py-8 px-6 border-t border-neutral-200 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Left side - Copyright */}
          <div className="text-center sm:text-left">
            <p className="text-body-md text-neutral-500">© {currentYear} Mickey Malotte</p>
          </div>

          {/* Right side - Links */}
          <div className="flex gap-6 text-sm">
            <Link
              href="/about"
              className="text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="https://github.com/MickeyJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/michael-malotte/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
