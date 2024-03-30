import { APIS } from "../apis";
import { URIS } from "../constants";
import { useCustomQuery, useMutateQuery } from "../hooks";

export function useCreateBooking(params = {}) {
  return useMutateQuery({
    mutationFn: APIS.createBooking,
    errorClosable: true,
    ...params,
  });
}

export function useBooking(bookingId) {
  return useCustomQuery({
    queryKey: [URIS.getBookingData, bookingId],
    queryFn: () => APIS.getBookingData({ id: bookingId }),
    enabled: typeof bookingId === "string",
  });
}

export function useGetDateBooking(date) {
  return useCustomQuery({
    queryKey: [URIS.getBooking, date],
    queryFn: () => APIS.getBooking({ date }),
  });
}
