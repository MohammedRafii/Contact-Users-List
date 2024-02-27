import { useRouteError } from "react-router-dom";
export const ErrorBound = () => {
  let error = useRouteError();
  return (
    <div className="flex justify-center items-center h-[80vh] text-4xl text-red-600 font-semibold underline-offset-[10px] underline">{error.message}</div>
  )
}