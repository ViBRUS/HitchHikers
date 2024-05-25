const CONSTANTS = {};

CONSTANTS.URLS = {
    BASE: 'http://localhost:5000/api',
    LOGIN: '/user/signIn',
    SIGN_UP: '/user/create',
    SIGN_OUT: '/user/signOut',
    PLANE_BASE: 'http://localhost:5000/api/airplane',
    FETCH_PLANES: '/list/Airports?keyword={query}',
    GET_ROUTE: '/save/Details'
}

export default CONSTANTS;