import FetchServer from "./FetchServer";

export const login = (DATA,cb) => {
    let route = "/Login";
    let options = {
        method : 'GET'
    }

    let fetch = new FetchServer();
    console.log(JSON.stringify(DATA))



    fetch.fetchRouteServer( route, DATA, options, (response) => {
        cb(response);
    });

}

export const createAccount = (DATA,cb) => {
    let route = "/User";
    let options = {
        method : 'POST'
    }
    let fetch = new FetchServer();
    console.log(JSON.stringify(DATA))

    fetch.fetchRouteServer( route, DATA, options, (response) => {
        cb(response);
    });

}

export default login;