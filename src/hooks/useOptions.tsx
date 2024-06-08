import { useSelector } from "react-redux"

export const useOptions = () => {
    
    const optionItems = useSelector((state: any) => state.options.options);


    return {
        optionItems
    }
}