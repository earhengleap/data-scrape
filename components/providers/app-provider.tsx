"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);
  const [queryClient] = useState(() => new QueryClient())

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
   <QueryClientProvider client={queryClient}>
       <NextThemesProvider 
        attribute="class" 
        defaultTheme="system" 
        enableSystem 
        {...props}
      >
        {children}
      </NextThemesProvider>
   </QueryClientProvider>
  );
}
