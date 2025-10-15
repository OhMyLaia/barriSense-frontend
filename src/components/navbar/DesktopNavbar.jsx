import { Link } from "react-router-dom";
import capitalizeWords from "../../utils/capitalizeFirstLetter";

function DesktopNavbar({ isTop, logo }) {
  return (
    <nav
      className={`hidden md:block shadow-lg z-[999] w-full transition-all duration-300 ease-in-out ${
        isTop ? "fixed h-20 py-2" : "fixed top-0 opacity-80 h-20 py-2"
      }`}
      style={{ backgroundColor: "white" }}
    >
      <div className="px-2 mx-auto h-full flex">
        <div className={`flex-1 md:w-auto  xl:ml-20 `}>
          <Link to="/" className="h-full">
            <img src={logo} alt="sense barri logo" className="h-full w-auto" />
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-end justify-center ">
          <span className="flex md:text-md xl:text-lg justify-center gap-3 lg:gap-4 text-black font-info">
            <Link to={"/queixa"} className="rounded shadow px-4 hover:bg-blue-200">Enviar queixa</Link>
            <Link to={"/about"} className="rounded shadow px-4 hover:bg-blue-200">About</Link>
          </span>
        </div>
      </div>
    </nav>
  );
}

export default DesktopNavbar;
