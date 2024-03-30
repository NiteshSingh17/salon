import { APIS } from "../apis";
import { STALE_TIME, URIS } from "../constants";
import { useCustomQuery, useMutateQuery } from "../hooks";

export function useMyShops(enabled) {
  return useCustomQuery({
    queryKey: [URIS.myShops],
    queryFn: APIS.myShops,
    staleTime: STALE_TIME.three_hours,
    enabled,
  });
}

export function useUpdateShop(params) {
  return useMutateQuery({
    mutationFn: APIS.updateShop,
    errorClosable: true,
    ...params,
  });
}
