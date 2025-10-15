import { useState, useEffect } from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import logo from "../../assets/logo-blue.png";
import { useAuth } from "../../modules/auth";
import FeedbackModal from "../FeedbackForm";

function Navbar() {
  const [isTopMobile, setIsTopMobile] = useState(true);
  const [isTopDesktop, setIsTopDesktop] = useState(true);

  const { user } = useAuth();

  // const menuItems = ["Afegeix Queixa", "Contacta'ns", "Home"];
  // if (user) menuItems.push("area-personal");

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
  // menuItems={menuItems}
  logo={logo}
/>

<DesktopNavbar
  isTop={isTopDesktop}
  // menuItems={menuItems}
  logo={logo}
/>
    </>
  );
}

export default Navbar;
