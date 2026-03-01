import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);

        // Mantener consistencia del título de la página
        document.title = "Mani Pedi Las Arenas | Salón de Uñas y Estética en Getxo";

        // Mantener consistencia del favicon
        let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
        if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
        }
        link.type = "image/x-icon";
        link.href = "/1-3fc4acac.ico";
    }, [pathname]);

    return null;
};

export default ScrollToTop;
