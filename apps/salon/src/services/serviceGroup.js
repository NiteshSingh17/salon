import { APIS } from "../apis";
import { STALE_TIME, URIS } from "../constants";
import { useCustomQuery } from "../hooks";

export function useServiceGroupWithService() {
  return useCustomQuery({
    queryKey: [URIS.serviceGroupWithService],
    queryFn: APIS.getServiceGroupWithService,
    staleTime: STALE_TIME.forever,
  });
}
