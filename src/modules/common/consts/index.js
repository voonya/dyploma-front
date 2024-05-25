export const API_URL = 'http://localhost:4000';
export const API_URL_DATA_ANALYS = 'http://localhost:5000';

export const GET_USER = '/auth/me';
export const LOGIN = '/auth/login';

export const GET_TOPICS = '/topics';

export const GET_REACTIONS = '/reactions';

export const GET_OPERATIONS = '/posts/operations';

export const GET_POSTS = '/posts';

export const GET_STATS = '/posts/stats';

export const GET_VISUALIZATION = '/vis';

export const GET_CHANNEL = '/channel';

export const GET_ACCOUNTS = '/accounts';

export const getApiUrl = (path) => `${API_URL}${path}`;
export const getApiUrlDataAnalys = (path) => `${API_URL_DATA_ANALYS}${path}`;
