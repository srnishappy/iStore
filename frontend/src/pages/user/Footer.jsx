import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-8 mt-12 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* ด้านซ้าย */}
          <div className="text-left">
            <h2 className="text-xl font-bold tracking-wide">Made by</h2>
            <p className="text-sm text-gray-400 mt-2">
              A student learning to code
            </p>
          </div>

          {/* ตรงกลาง */}
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/srnishappy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transform hover:scale-110 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.instagram.com/srnishappy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-400 transform hover:scale-110 transition-all duration-300"
              aria-label="Instagram Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.16C6.48 2.16 2.16 6.48 2.16 12S6.48 21.84 12 21.84 21.84 17.52 21.84 12 17.52 2.16 12 2.16zm0 18.72c-4.08 0-7.68-3.6-7.68-7.68s3.6-7.68 7.68-7.68 7.68 3.6 7.68 7.68-3.6 7.68-7.68 7.68zm3.12-10.44c0 .4-.32.72-.72.72h-1.44c-.4 0-.72-.32-.72-.72V8.4c0-.4.32-.72.72-.72h1.44c.4 0 .72.32.72.72v1.44zM16.8 7.44h-1.44V6c0-.4-.32-.72-.72-.72h-1.44c-.4 0-.72.32-.72.72v1.44h-1.44c-.4 0-.72.32-.72.72v1.44c0 .4.32.72.72.72h1.44v1.44c0 .4.32.72.72.72h1.44c.4 0 .72-.32.72-.72v-1.44h1.44c.4 0 .72-.32.72-.72v-1.44c0-.4-.32-.72-.72-.72h-1.44V7.44z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/kong.157284/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-600 transform hover:scale-110 transition-all duration-300"
              aria-label="Facebook Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.675 0H1.325C.592 0 0 .592 0 1.325v21.351C0 23.408.592 24 1.325 24h11.493v-9.294h-3.14v-3.62h3.14v-2.67c0-3.116 1.854-4.854 4.642-4.854 1.344 0 2.859.251 2.859.251v3.14h-1.61c-1.424 0-1.869.884-1.869 1.786v2.675h3.14l-1.75 3.62h-1.39v9.294h4.468c.733 0 1.325-.592 1.325-1.325V1.325C24 .592 23.408 0 22.675 0z" />
              </svg>
            </a>
          </div>

          {/* ด้านขวา */}
          <div className="text-right">
            <p className="text-sm text-gray-400">
              <a
                href="mailto:srnishappy@gmail.com"
                className="hover:text-white transition-colors duration-200"
              >
                Contact: srnishappy@gmail.com
              </a>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              © 2025. Built with passion.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
