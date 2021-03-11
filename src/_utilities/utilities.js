
export const userUtilities={
    isIterable
}
function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

function getFiltersArray(filterDetails){
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