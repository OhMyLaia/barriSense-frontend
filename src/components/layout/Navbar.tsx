import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

function Navbar() {
    return (
<header className="bg-gradient-to-r from-blue-400 to-slate-900 text-slate-200 shadow-md w-full overflow-x-hidden">
            <div className="container mx-auto px-2 py-5 flex items-center justify-between ">
                {/* Logo */}
                <p className="text-xl font-bold tracking-wide">barriSense</p>

                {/* Navigation */}
                <NavigationMenu>
                    <NavigationMenuList className="gap-2 bg-transparent w-[10%]">
                        <NavigationMenuItem >
                            <NavigationMenuLink
                                asChild
                                className={`${navigationMenuTriggerStyle()} text-white hover:text-gray-300 transition-colors bg-transparent`}
                            >
                                <Link to="/">Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink
                                asChild
                                className={`${navigationMenuTriggerStyle()} text-white hover:text-gray-300 transition-colors bg-transparent`}
                            >
                                <Link to="/queixes">Queixa</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    );
}

export default Navbar;