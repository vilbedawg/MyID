import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect } from "react";

export const ValidateBlockchain = () => {
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const validateData = async () => {
            try {
              const response = await axiosPrivate.get('/blocks/check');
              console.log(response.data);
            } catch (error) {
              console.log(error);
            }
          }
        validateData();
    }, [])
    

  return (
    <></>
  )
}
