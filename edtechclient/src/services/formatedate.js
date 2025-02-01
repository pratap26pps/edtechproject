export const formatedate = (datestring)=>{
    const options = {year:"numeric",month:"long",date:"numeric"}
    const date = new Date(datestring);
    const formatingdate = date.toLocaleDateString("en-US",options);
   
    const hours = date.getHours();
    const minute = date.getMinutes();
    const period = hours >=12  ? "PM":"AM"
    const formatingtime = `${hours % 12}:${minute.toString().padStart(2,"0")} ${period}`

    return `${formatingdate}  | ${formatingtime}`
}