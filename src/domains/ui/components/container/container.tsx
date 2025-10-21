"use client";
import { cn } from "@/lib/utils";

import React, { memo } from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}
const Container = memo(({ children, className }: Props) => {
  return (
    <div className={cn("container pr-7 pl-7 md:pr-3 md:pl-3", className)}>
      {children}
    </div>
  );
});
Container.displayName = "Container";
export default Container;
