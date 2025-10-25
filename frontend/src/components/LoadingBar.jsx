import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";

function LoadingBar() {
    const location = useLocation();

    useEffect(() => {
        NProgress.start(); // start loading bar on route change
        return () => {
        NProgress.done(); // finish loading bar when component unmounts or page renders
        };
    }, [location]);

    return null;
}

export default LoadingBar;
