import React, { Dispatch } from "react";
import { Textarea } from "@/components/ui";

export const HeaderShoppingCaDrTaCartDeliveryLocationComp = ({
  address,
  setAddress,
}: {
  address: string;
  setAddress: Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl leading-7 font-semibold text-muted-foreground">
        Delivery location
      </div>
      <div>
        <Textarea
          className="h-20 leading-5"
          placeholder="Please share your complete address"
          defaultValue={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {!address && (
          <div className="text-[12.8px] leading-[19.2px] text-destructive">
            Please complete your address!
          </div>
        )}
      </div>
    </div>
  );
};
