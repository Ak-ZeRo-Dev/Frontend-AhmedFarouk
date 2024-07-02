import React from "react";
import { ClipLoader } from "react-spinners";

type Props = {
  isLoading: boolean;
};

export default function LoadingContent({ isLoading }: Props) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <ClipLoader
        color={"#4285f4"}
        loading={isLoading}
        size={50}
        aria-label="Loading Spinner"
      />
    </div>
  );
}
