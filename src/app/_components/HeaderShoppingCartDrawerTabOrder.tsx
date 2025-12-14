import React from "react";
import { Button, Separator, TabsContent } from "@/components/ui";
import { UserOrderType } from "@/lib/type";
import { Map, Soup, Timer } from "lucide-react";

export const HeaderShoppingCartDrawerTabOrder = ({
  userOrders,
}: {
  userOrders: UserOrderType[];
}) => {
  return (
    <TabsContent value="order">
      <div className="w-full flex flex-col gap-5 bg-background text-foreground p-4 rounded-[20px]">
        <div className="text-xl leading-7 font-semibold">Order History</div>

        <div>
          {userOrders.map((order) => (
            <div key={order._id} className="px-3 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 text-base leading-7 font-bold items-center">
                  <div>${order.totalPrice}</div>
                  <div>(#{order._id.toString().slice(-5)})</div>
                </div>
                <Button
                  variant={"outline"}
                  className={`h-7 rounded-full text-xs leading-4 py-1 px-2.5 ${
                    order.status === "PENDING"
                      ? "border-red-500 hover:bg-red-500"
                      : order.status === "DELIVERED"
                      ? "border-[#18BA51]/50 hover:bg-[#18BA51]/50"
                      : order.status === "CANCELED"
                      ? "border-gray-300 hover:bg-gray-300"
                      : ""
                  }`}
                >
                  {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                </Button>
              </div>

              <div className="text-muted-foreground flex flex-col gap-2.5 text-xs leading-4">
                {order.foodOrderItems.map((item) => (
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Soup className="w-4 h-4" />
                      <p>{item.food.foodName}</p>
                    </div>
                    <div className="text-foreground">x {item.quantity}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 text-muted-foreground items-center">
                <Timer className="w-4 h-4" />
                <p className="text-xs leading-4">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-CA")
                    : ""}
                </p>
              </div>

              <div className="flex gap-2 text-muted-foreground items-center">
                <Map className="w-4 h-4 shrink-0" />
                <p className="text-xs leading-4 line-clamp-1">
                  {order.userId.address}
                </p>
              </div>

              <Separator className="mb-3 border-dashed border-t border-muted-foreground/80" />
            </div>
          ))}
        </div>
      </div>
    </TabsContent>
  );
};
