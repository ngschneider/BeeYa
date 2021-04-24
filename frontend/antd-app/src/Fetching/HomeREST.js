import FetchServer from "./FetchServer";

export const getFollowers = (DATA,cb) => {
    let route = "/Following";
    let options = {
        method : 'GET'
    }

    let fetch = new FetchServer();
    console.log(JSON.stringify(DATA))

    fetch.fetchRouteServer( route, DATA, options, (response) => {
        cb(response);
    });
}

export const getID = (DATA,cb) => {
    let route = "/User";
    let options = {
        method : 'GET'
    }

    let fetch = new FetchServer();
    console.log(JSON.stringify(DATA))

    fetch.fetchRouteServer( route, DATA, options, (response) => {
        cb(response);
    });
}

export const postTweet = (DATA,cb) => {
    let route = "/Post";
    let options = {
        method : 'POST'
    }

    let fetch = new FetchServer();
    console.log(JSON.stringify(DATA))

    fetch.fetchRouteServer( route, DATA, options, (response) => {
        cb(response);
    });
}