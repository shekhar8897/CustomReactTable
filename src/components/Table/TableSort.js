export default function sortTableData(data, sortOrder, orderBy){

    // eslint-disable-next-line array-callback-return
    data.sort(function(obj1, obj2){
        if(obj1[orderBy] < obj2[orderBy])
            return sortOrder === "asc" ? -1 : 1
        if(obj1[orderBy] > obj2[orderBy])
            return sortOrder === "asc" ? 1 : -1
    })

    return data
}
