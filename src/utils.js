
export function degreeHelper(celsius , unit){

if(unit === "F"){
return  Math.round(celsius * 9/5 + 32);

}
else{
    return celsius;
}
}
