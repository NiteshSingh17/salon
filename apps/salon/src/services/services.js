import { APIS } from "../apis";
import { URIS } from "../constants";
import { useCustomQuery, useMutateQuery } from "../hooks";

export function useShopServices(enabled = true) {
  return useCustomQuery({
    queryKey: [URIS.shopServices],
    queryFn: APIS.shopServices,
    // staleTime: STALE_TIME.three_hours,
    enabled,
  });
}

export function useDeleteShopService(params) {
  return useMutateQuery({
    mutationFn: APIS.deleteService,
    errorClosable: true,
    ...params,
  });
}

export function useCreateShopService(params) {
  return useMutateQuery({
    mutationFn: APIS.createShopService,
    errorClosable: true,
    ...params,
  });
}
