import { useQuery } from "@tanstack/react-query";
// import { useErrorContext } from "../providers/errorProvider";

export const useCustomQuery = (params) => {
  // const { showError } = useErrorContext();
  const { closable, ...queryData } = params;

  const queryFn = async (functionParams) => {
    let { ok, data } = await queryData.queryFn(functionParams);
    if (ok) return data;
    else {
      // on 401( unauthorized ) we remove userdata and token for app in appProvider.
      if (data.statusCode !== 401) {
        // showError({
        //   msg: data.error || "Something went wrong!",
        //   desc: data.message,
        //   retryHandler: () => queryFn(functionParams),
        //   closable: closable ?? true,
        // });
      }
      throw data;
    }
  };

  return useQuery({
    ...queryData,
    queryFn: queryFn,
  });
};
