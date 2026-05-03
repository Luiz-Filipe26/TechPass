import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToHash() {
    const { pathname, hash } = useLocation();
    const isInitialLoad = useRef(true);
    const lastPathname = useRef(pathname);

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace("#", ""));
            
            if (element) {
                const isSamePage = lastPathname.current === pathname;
                const behavior = (isInitialLoad.current || !isSamePage) ? "auto" : "smooth";

                element.scrollIntoView({ behavior });
            }
        }
        
        isInitialLoad.current = false;
        lastPathname.current = pathname;
    }, [pathname, hash]);

    return null;
}
