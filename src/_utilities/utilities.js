
export const utilities={
    getFiltersArray
}

const getFiltersArray=(filterDetails)=>{
    let filters =[]
    let _string=filterDetails?.searchValue
    if(filterDetails?.match===`Exact Match`){
        filters.push({"filter":6,"pattern":_string})
    }else if(filterDetails?.match===`Contains In`){
        filters.push({"filter":5,"pattern":_string})
    }
    if(filterDetails?.sort===`Sort by length Ascending`){
      filters.push({"filter":1})
    }else if(filterDetails?.sort===`Sort by length Descending`){
      filters.push({"filter":2})
    }else if(filterDetails?.sort===`Sort alphabetically Ascending`){
      filters.push({"filter":3})
    }else if(filterDetails?.sort===`Sort alphabetically Descending`){
      filters.push({"filter":4})
    }
    console.log(filters)
    return filters
}