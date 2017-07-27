export const DataProduto = (date) => {
    const d = new Date(date);
    const data = d.getDay()+"/"+d.getMonth()+"/"+d.getFullYear(); 
    console.log("Data",data);
    return data;
}