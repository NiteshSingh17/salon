import { APIS } from "../apis";
import { useMutateQuery } from "../hooks";

export function useCreateAccount(params = {}) {
  return useMutateQuery({
    mutationFn: APIS.createAccount,
    errorClosable: true,
    ...params,
  });
}
