import { fetchService, tokenFetchService, METHOD } from "../matchService/fetchService";
 
import { IP, URL } from "./IP";
async function realisarSupcripcion(body) {  
   const response = await fetchService(
    IP(URL.SUSCRIPCION),
    body,
    METHOD.POST
  ); 
   return response;
}
async function testAllPoints() {
 // let vchEmail = "correo1@gmail.com";
  console.log("################Test-all-end Points-init");
 /* const postTest2 = await fetchService(IP('/test/postTest2'), { numCodigoSuscripcion: 0, vchEmail: "corrreee.", chrEstado: "1" }, METHOD.POST);
  console.log(postTest2);
  const json2 = await postTest2.json();
  console.log(json2);*/

   const postTest3=await tokenFetchService(IP('/authorization/cliente/login?username=josue&password=1234'),{} ,METHOD.POST);   
    console.log(postTest3); 
    //const json3=await postTest3.json();
    //console.log(json3) 
/*
    const postTest4=await fetchService(IP('/suscripcion/postTest1?vchEmail=dasdasd'),{},METHOD.POST);   
    console.log(postTest4); 
    //const json4=await postTest4.json();
    //console.log(json4); 
  /*
    const postTest5=await tokenFetchService(IP('/cotizacion/reqtoken?vchEmail='+vchEmail),{},METHOD.POST);   
    console.log(postTest5); 
    if(postTest5.status===200){
    const json5=await postTest5.json();
      console.log(json5);
   }else{
     console.log("status:"||postTest5.status);
   }*/
 /*
    const postTest3=await fetchService(IP('/test/postTest3?vchEmail='+vchEmail),{numCodigoSuscripcion:0,vchEmail:"corrreee2.",chrEstado:"1"} ,METHOD.POST);   
    console.log(postTest3); 
    const json3=await postTest3.json();
    console.log(json3);*/
  
   /*
  
    const postTest4=await fetchService(IP('/test/postTest4?vchEmail='+vchEmail),{} ,METHOD.GET); 
    console.log(postTest4);
    const json4=await postTest4.json();
    console.log(json4); 
   
    const postTest5=await fetchService(IP('/test/postTest7/'+vchEmail),{} ,METHOD.GET); 
    console.log(postTest5);
    const json5=await postTest5.json();
    console.log(json5); 
  */
  console.log("################Test-all-end Points-final");
}
export { realisarSupcripcion, testAllPoints };
