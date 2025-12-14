"use client";

import React, { Dispatch } from "react";
import { Input } from "@/components/ui";

export const PassShowHide = ({
  showPass,
  setShowPass,
}: {
  showPass: boolean;
  setShowPass: Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <Input
        type="checkbox"
        checked={showPass}
        onChange={(e) => setShowPass(e.target.checked)}
        className="w-4 h-4 rounded-sm border-foreground"
      />
      <div className="text-sm text-muted-foreground">Show password</div>
    </div>
  );
};
