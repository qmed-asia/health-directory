import { AlertTriangle } from "lucide-react";

export const Disclaimer = () => {
  return (
    <div className="bg-amber-50 border-t border-amber-200 p-4 text-center text-sm text-amber-900">
      <div className="container mx-auto flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 font-semibold">
          <AlertTriangle className="w-4 h-4" />
          <span>Disclaimer</span>
        </div>
        <p>
          The information provided in this directory is sourced from public online resources and may not be up-to-date. 
          Please use this information with discretion and verify details by contacting the hospitals or doctors directly.
        </p>
      </div>
    </div>
  );
};
