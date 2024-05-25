import constants from './constants';

const JSON_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

const createRequest = (method, url, addittionalHeaders, additionalOptions) => {
    const options = {
        method: method,
        headers: { ...addittionalHeaders}
    };
    
    const request = new Request(url, {...options, ...additionalOptions});

    return request;
}

const createPayloadRequest = (method, url, payload, addittionalHeaders) => {
    return createRequest(method, url, addittionalHeaders, payload ? {body: typeof payload === 'string' ? payload : JSON.stringify(payload)} : undefined);
}

const createGetRequest = (url, addittionalHeaders) => {
    return createRequest('GET', url, addittionalHeaders);
}

const createPostRequest = (url, payload, addittionalHeaders) => {
    return createPayloadRequest('POST', url, payload, addittionalHeaders);
}

const createPutRequest = (url, payload, addittionalHeaders) => {
    return createPayloadRequest('PUT', url, payload, addittionalHeaders);
}

const responseToJSON = (response) => {
    if (response.ok || response.status === 500 || response.status === 422) {
        return response.json();
    } else {
        throw Error('Response not OK', response.status, response.url);
    }
}

function loginUser(payload) {
    const url = constants.URLS.BASE + constants.URLS.LOGIN;
    const headers = { ...JSON_HEADERS }
    const request = createPostRequest(url, payload, headers);
    return fetch(request).then(response => responseToJSON(response));
}

function registerUser(payload) {
    const url = constants.URLS.BASE + constants.URLS.SIGN_UP;
    const headers = { ...JSON_HEADERS }
    const request = createPostRequest(url, payload, headers);
    return fetch(request).then(response => responseToJSON(response));
}

function logoutUser(token) {
    const url = constants.URLS.BASE + constants.URLS.SIGN_OUT;
    const headers = { ...JSON_HEADERS, ...{ 'Authorization': token } };
    const request = createPostRequest(url, undefined, headers);
    return fetch(request).then(response => responseToJSON(response));
}

function getAirports(searchQuery, token) {
    const url = constants.URLS.PLANE_BASE + constants.URLS.FETCH_PLANES.replace('{query}', searchQuery);
    const headers = { ...JSON_HEADERS, ...{ 'Authorization': token } };
    const request = createGetRequest(url, headers);
    return fetch(request).then(response => responseToJSON(response));
}

async function getFlightRoute(token) {
    const url = constants.URLS.PLANE_BASE + constants.URLS.GET_ROUTE;
    const headers = { ...JSON_HEADERS, ...{ 'Authorization': token } };
    const request = createPostRequest(url, undefined, headers);
    const response = await fetch(request);
    return responseToJSON(response);
}

export default {
    loginUser,
    registerUser,
    logoutUser,
    getAirports,
    getFlightRoute
}