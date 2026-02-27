import { useState } from "react";
import { EFilterTypes, ENewExpense } from "../types/types";

export default function useFilter=(data:ENewExpense[])=>{
    const [filters,setFilters]=useState<EFilterTypes>({
        category:"All",
        dateFrom:'',
        dateTo:'',
        minAmount:undefined,
        maxAmount:undefined,
        searchTerm:''
    })

    const updateFilter=(key:string,value:any)=>{
        setFilters((prevFilters)=>({...prevFilters,[key]:value}))
    }
    const clearFilter=()=>{
        setFilters({
        category:"All",
        dateFrom:'',
        dateTo:'',
        minAmount:undefined,
        maxAmount:undefined,
        searchTerm:''
        })
    }
return(

)
}