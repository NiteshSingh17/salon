import { useMutation } from "@tanstack/react-query";
import { useErrorContext } from "../providers/errorProvider";

export const useMutateQuery = (params) => {
  const { showError } = useErrorContext();
  const { errorClosable, ...mutateData } = params;

  const mutationFn = async (functionParams) => {
    let { ok, data } = await params.mutationFn(functionParams);
    if (ok) return data;
    else {
      // on 401( unauthorized ) we remove userdata and token for app in appProvider.
      if (data.statusCode !== 401) {
        showError({
          msg: data.error || "Something went wrong!",
          desc: data.message,
          retryHandler: () => mutationFn(functionParams),
          closable: errorClosable,
        });
      }
      throw data;
    }
  };

  return useMutation({
    ...mutateData,
    mutationFn,
  });
};
