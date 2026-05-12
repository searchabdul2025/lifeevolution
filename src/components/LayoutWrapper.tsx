"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ChatBot } from "@/components/ChatBot";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Check if current path is a portal route
  const isPortalRoute = pathname?.startsWith('/admin') || 
                        pathname?.startsWith('/member') || 
                        pathname?.startsWith('/agent') || 
                        pathname?.startsWith('/affiliate');

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  // Don't render header/footer/chatbot for portal routes
  if (isPortalRoute) {
    return <>{children}</>;
  }

  // Render with header/footer/chatbot for regular website pages
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <ChatBot />
    </>
  );
}
