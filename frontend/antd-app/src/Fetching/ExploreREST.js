import FetchServer from "./FetchServer";

export const getExplorePosts = (DATA,cb) => {
    let route = "/Explore";
    
    let options = {
        method : 'GET'
    }

    let fetch = new FetchServer();
    console.log(JSON.stringify(DATA))

    fetch.fetchRouteServer( route, DATA, options, (response) => {
        cb(response);
    });

}