import { type AppType } from "next/dist/shared/lib/utils";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

// Import global styles
import "@/styles/globals.css";
import "@/styles/locomotive-scroll.css";

// Font and component imports
import { DM_Sans } from "next/font/google";
import Preloader from "@/components/Preloader";

// Initialize font
const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  display: "swap",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const firstLoadRef = useRef(true);

  // Handle route changes
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    const handleRouteChangeError = () => {
      setIsLoading(false);
    };

    // Add route change listeners
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    // Cleanup listeners
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);

  // Modify first load logic
  useEffect(() => {
    // Ensure preloader is shown only once
    if (firstLoadRef.current) {
      const timer = setTimeout(() => {
        setIsFirstLoad(false);
        firstLoadRef.current = false;
      }, 3000); // Adjust timing to match your preloader duration

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div 
      lang="en" 
      className={`${dmSans.className} min-h-screen w-full`}
    >
      {/* First load preloader */}
      {isFirstLoad ? (
        <Preloader />
      ) : (
        <AnimatePresence 
          mode="wait" 
          initial={false}
        >
          {/* Page loading indicator */}
          {isLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
            </div>
          )}
  
          {/* Main page component */}
          <Component 
            {...pageProps} 
            key={router.pathname} 
          />
        </AnimatePresence>
      )}
    </div>
  );
};

export default MyApp;