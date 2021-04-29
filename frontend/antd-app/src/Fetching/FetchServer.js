/*
* Connect to web server

*/
class FetchServer {
    constructor(){}
      response = {
          connected:false,
          result:null,
          error: null
     }

    fetchRouteServer(ROUTE,DATA_SEND,options,callback){
      // DATA_SEND SHOULD BE JSON
      
        let mysqlServer="ec2-3-22-234-88.us-east-2.compute.amazonaws.com:444";
        fetch( mysqlServer + ROUTE + "" +  JSON.stringify(DATA_SEND) + "" ,options)
        .then(res => res.json())
        .then(
          (serverResponse) => {
  
              console.log("===== Connected to " + ROUTE + "=====");
              console.log("Data Sent : " + JSON.stringify(DATA_SEND) )
              console.log("Data Received : " + JSON.stringify(serverResponse) )
              console.log("=====================================")
            //this.updateResponse(true,serverResponse);
            callback(serverResponse,true);
  
            },
            (error) => {
  
              //this.connectedToServer(false)
              console.log("===== Failed to connected to server =====");
              console.log("Data Sent : " + JSON.stringify(DATA_SEND) )
  
              console.log("Error received : " + error);
              console.log("===============================")
              //this.updateResponse(false,error);
              callback(error,false);
          }
        )
     
    }
  
    updateResponse(connected,response){
         console.log(this.response.connected)
          this.response.connected = connected;    
          this.response.result = response;
          console.log(this.response.connected)
  
       
  
    }
    
  }
  export default FetchServer;