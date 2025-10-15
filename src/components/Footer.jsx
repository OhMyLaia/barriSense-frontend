import { FaPhoneAlt, FaInstagram, FaFacebook } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="mt-8 mb-8 border-t bg-white text-sm md:text-base font-inter">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between gap-6 h-full">
        {/* Left Column */}
        <div className="flex flex-col space-y-1 text-center md:text-left">
          <p className="font-bold">BarriSense</p>
          <p>Hola!</p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <FaPhoneAlt size={14} /> no nos llames
          </p>
          <a
            href="mailto:eltallerswing@gmail.com"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            barriSense@gmail.com
          </a>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center md:items-end space-y-2">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <FaInstagram size={18} /> @barriSense
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <FaFacebook size={18} /> Facebook
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs mt-4 mb-2 text-gray-500">
        &copy; {new Date().getFullYear()} El Taller Swing. Tots els drets
        reservats.
      </div>
    </footer>
  );
}
