import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToHash() {
    const { pathname, hash } = useLocation();
    const isInitialLoad = useRef(true);
    const lastPathname = useRef(pathname);

    const scrollToHash = () => {
        if (!hash) return;
        const element = document.getElementById(hash.replace("#", ""));
        if (!element) return;
        const isSamePage = lastPathname.current === pathname;
        const behavior = isInitialLoad.current || !isSamePage ? "auto" : "smooth";
        element.scrollIntoView({ behavior });
    };

    useEffect(() => {
        scrollToHash();
        isInitialLoad.current = false;
        lastPathname.current = pathname;
    }, [pathname, hash]);

    return null;
}
