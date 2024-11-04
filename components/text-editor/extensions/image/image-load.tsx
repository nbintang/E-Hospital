import * as React from "react";

import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";

export const ImageOverlay = React.memo(() => {
  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-center",
          "absolute inset-0 rounded bg-[var(--mt-overlay)] opacity-100 transition-opacity"
        )}
      >
        <LoaderCircleIcon className="size-7 animate-spin text-white z-10 duration-1000" />
      </div>
      <div className="absolute inset-0 w-full h-full bg-black/50" />
    </>
  );
});

ImageOverlay.displayName = 'ImageOverlay'