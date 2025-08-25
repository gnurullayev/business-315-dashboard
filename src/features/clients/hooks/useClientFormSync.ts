import { useEffect } from "react";
import type { IClient } from "@/types/client";

export function useClientFormSync({
  formInstance,
  showClient,
}: {
  formInstance: any;
  showClient: IClient | null | undefined;
}) {
  useEffect(() => {
    if (showClient) {
      formInstance.setFieldsValue({
        cardName: showClient.cardName,
        cardFName: showClient.cardFName,
        groupCode: Number(showClient.groupCode),
        slpCode: showClient.slpCode,
        Cellular: showClient.Cellular,
        licTradNum: showClient.licTradNum,
      });
    }
  }, [showClient, formInstance]);
}
