import React from "react";
import { TabsContent } from "@/components/ui";

export const HeaderShoppingCartDrawerTabOrder = () => {
  return (
    <TabsContent value="order">
      <div className="w-full flex flex-col">
        <div className="text-xl leading-7 font-semibold text-muted-foreground">
          My cart
        </div>
      </div>
      Change your password here.
    </TabsContent>
  );
};
