import React from "react";
import LoadingSpinner from "@/domains/ui/components/loading-spinner/loading-spinner";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoadingSpinner />
    </div>
  );
};

export default Loading;
