import { localStoreEnum } from "../service/ENUM"; 
const METHOD = {
  POST: "post",
  GET: "get",
  PUT: "put",
  DELETE: "delete",
};
async function tokenFetchService(url, body = {}, method) {   
  const header = {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
      "Authorization": "Bearer " +localStorage.getItem(localStoreEnum.TOKEN)       
    },
    body: JSON.stringify(body) 
  };
 
  try {
    const response = await fetch(url, header);
    return response;
  } catch (error) {
    console.log("------------catch----------");
    console.log(error);
    console.log("------------catch----------");
    return error;
  }
}
async function fetchService(url, body = {}, method) {  
  const header = {
    method: 'post', // *GET, POST, PUT, DELETE, etc.
    // mode: "cors",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json; charset='utf-8'",
      "Access-Control-Allow-Credentials": "true",
    },
    body: Buffer.from(JSON.stringify(body),'utf8') // body data type must match "Content-Type" header
  }; 
  try {
    const response = await fetch(url, header) ;
    return response;
  } catch (error) {
    console.log("------------catch----------");
    console.log(error);   
    
    
    return error;
     
  }
}
/*
async function fetchIziPay(url, body = {}, method) {  
   
 let Authorization="Basic ODkyODk3NTg6dGVzdHBhc3N3b3JkXzd2QXR2TjQ5RThBZDZlNmloTXFJT3ZPSEM2UVY1WUttSVhneGlzTW0wVjdFcQ==";
  const header = {
    method: 'post', // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {       
      "Content-Type": "application/json",      
      "Authorization": Authorization
    },
    body: JSON.stringify(body) // body data type must match "Content-Type" header
  }; 
  try {
     console.log(url)
    const response = await fetch(url, header) ;
    return response;
  } catch (error) {
    console.log("------------catch----------");
    console.log(error);  
    return error;
     
  }
}
*/
export { tokenFetchService, fetchService, METHOD };
