import { useState, useEffect } from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import logo from "../../assets/SB-logo.svg";
import { useAuth } from "../../modules/auth";

function Navbar() {
  const [isTopMobile, setIsTopMobile] = useState(true);
  const [isTopDesktop, setIsTopDesktop] = useState(true);

  const { user } = useAuth();


  useEffect(() => {
    const handleScroll = () => {
      setIsTopMobile(window.scrollY < 20);
      setIsTopDesktop(window.scrollY < 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <>
      <MobileNavbar
        isTop={isTopMobile}
        logo={logo}
      />

      <DesktopNavbar
        isTop={isTopDesktop}
        logo={logo}
      />
    </>
  );
}

export default Navbar;
