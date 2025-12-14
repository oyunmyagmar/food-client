import React from "react";
import { Separator, TabsContent } from "@/components/ui";
import { UserOrderType } from "@/lib/type";

export const HeaderShoppingCartDrawerTabOrder = ({
  userOrders,
}: {
  userOrders: UserOrderType[];
}) => {
  return (
    <TabsContent value="order">
      <div className="w-full flex flex-col bg-background text-foreground p-4 rounded-[20px]">
        <div className="text-xl leading-7 font-semibold text-muted-foreground">
          My cart
        </div>
        <div>
          {userOrders.map((order) => (
            <div>
              <div>{order.totalPrice}</div>
              <div>{order.status}</div>
              <div>
                {order.foodOrderItems.map((item) => (
                  <div>{item.food.foodName}</div>
                ))}
              </div>
              <div>{order.createdAt}</div>
              <div>{order.userId.address}</div>
              <Separator />
            </div>
          ))}
        </div>
      </div>
    </TabsContent>
  );
};
