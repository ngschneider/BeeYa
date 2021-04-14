import FetchServer from "./FetchServer";

export const login = (DATA,cb) => {
    let route = "/Login";

    let fetch = new FetchServer();
    console.log(JSON.stringify(DATA))

    fetch.fetchRouteServer( route, DATA, (response) => {
        cb(response);
    });

}

export default login;