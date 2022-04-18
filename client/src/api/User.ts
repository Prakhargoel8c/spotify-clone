import { CancelToken } from 'axios';
import { apiInstance } from './Adapters/xhrAdapters';
import { UserToken } from '../types/User';

const login = (code: string, cancelToken: CancelToken) => apiInstance(cancelToken).post<UserToken>('/login', { code });

const refreshToken = (refreshToken: string, cancelToken: CancelToken) => apiInstance(cancelToken).post<UserToken>('/login', { refreshToken });

export { login, refreshToken };
