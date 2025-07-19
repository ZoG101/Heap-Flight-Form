import Image from "next/image";

const Header = () => {
    return(
        <a
            className="flex flex-col items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/ZoG101/Heap-Flight-Form"
            target="_blank"
            rel="noopener noreferrer"
        >
            <Image
            aria-hidden
            src="/golden-icon.png"
            alt="Golden bird icon"
            width={140}
            height={140}
            />
            <h1 className="mainTitle">Zaviation</h1>
        </a>
    );
}

export default Header;
