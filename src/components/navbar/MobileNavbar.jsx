import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function MobileNavbar({ isTop, logo }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`uppercase z-[999]  w-full fixed top-0   ${
        isTop ? "h-23 py-1" : `h-15 ${isOpen ? "opacity-100" : "opacity-85"}`
      } transition-all duration-300 ease-in-out md:hidden`}
      style={{ backgroundColor: "white" }}
    >
      <div className="mx-5 h-full flex justify-between items-center">
        <div
          className={`h-full flex justify-between items-center md:w-auto ${
            isTop ? "" : "hidden"
          }`}
        >
          <Link to="/" className="h-full py-3 flex-[1_1_0%]">
            <img src={logo} alt="El Taller" className="h-full " />
          </Link>
        </div>

        <button
          className="h-full mt-2 text-3xl text-black md:hidden  p-4"
          style={{
            color: "black",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`absolute top-7/8 w-full p-4 transition-all duration-300 ease-in-out ${
          isOpen ? "scale-100 opacity-100 z-[9999]" : "scale-0"
        }`}
      >
        <span className="flex md:text-md xl:text-lg justify-center gap-3 lg:gap-4 text-black font-info">
            <Link to={"/queixa"} className="rounded shadow px-4 hover:bg-blue-200 bg-white">Enviar queixa</Link>
            <Link to={"/about"} className="rounded shadow px-4 hover:bg-blue-200 bg-white">About</Link>
          </span>
      </div>
    </nav>
  );
}

export default MobileNavbar;
