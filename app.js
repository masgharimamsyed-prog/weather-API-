let apiurl="" ;

let data;
async function weatherApi(){
 data=await fetch(apiurl);
 console.log(data);
}

weatherApi();

