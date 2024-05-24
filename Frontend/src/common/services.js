// const BASE_HEADERS = {};

import constants from './constants';

const JSON_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

const createRequest = (method, url, addittionalHeaders, additionalOptions) => {
    const options = {
        method: method,
        headers: { ...JSON_HEADERS, ...addittionalHeaders}
    };
    
    const request = new Request(url, {...options, ...additionalOptions});

    return request;
}

const createPayloadRequest = (method, url, payload, addittionalHeaders) => {
    return createRequest(method, url, addittionalHeaders, payload ? {body: typeof payload === 'string'} : undefined);
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

async function loginUser(userMail, password) {
    const url = constants.URLS.BASE + constants.URLS.LOGIN;
    const payload = {
        email: {userMail},
        password: {password}
    }
    const request = createPostRequest(url, payload);
    const response = await fetch(request);
    // return responseToJSON(response);
    return response.json();
}

export default {
    loginUser
}