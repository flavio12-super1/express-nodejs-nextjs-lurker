import Link from "next/link";
import Image from "next/image";
// import Spider from "../../lurker-icons/nav-icons/spider.png";
import "./Navbar.css";
// import Logo from "./dojo-logo.png";

function Navbar() {
  return (
    <nav>
      <Link href="/">
        <img
          src="/nav-icons/spider.png"
          alt="lurker spider"
          className="navIcons"
        />
      </Link>
    </nav>
  );
}

export default Navbar;
