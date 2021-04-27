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

export const getFollowing = (DATA,cb) => {
    let route = "/FeedFollowing";
    let options = {
        method : 'GET'
    }

    let fetch = new FetchServer();
    console.log(JSON.stringify(DATA))

    fetch.fetchRouteServer( route, DATA, options, (response) => {
        cb(response);
    });
}

export const getUsername = (DATA,cb) => {
    let route ="/GetUsername";

    let options ={
        method: 'GET'
    }

    let fetch = new FetchServer();
    console.log(JSON.stringify(DATA))

    fetch.fetchRouteServer( route, DATA, options, (response) => {
        cb(response);
    });
}

export const getPosts = (DATA,cb) => {
    let route = "/Post";
    
    let options = {
        method : 'GET'
    }

    let fetch = new FetchServer();
    console.log(JSON.stringify(DATA))

    fetch.fetchRouteServer( route, DATA, options, (response) => {
        cb(response);
    });

}

export const likeTweet = (DATA,cb) => {
    let route = "/Tweet/Like";
    
    let options = {
        method : 'Post'
    }

    let fetch = new FetchServer();
    console.log(JSON.stringify(DATA))

    fetch.fetchRouteServer( route, DATA, options, (response) => {
        cb(response);
    });

}

export const retweet = (DATA,cb) => {
    let route = "/Tweet/Retweet";
    
    let options = {
        method : 'Post'
    }

    let fetch = new FetchServer();
    console.log(JSON.stringify(DATA))

    fetch.fetchRouteServer( route, DATA, options, (response) => {
        cb(response);
    });

}
