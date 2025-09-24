import client from './client';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await client.post('/login', credentials);
    return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await client.post('/register', data);
    return response.data;
};

export const logout = async (): Promise<void> => {
    await client.post('/auth/logout');
};

export const refreshToken = async (): Promise<{ token: string }> => {
    const response = await client.post('/auth/refresh');
    return response.data;
};

export const forgotPassword = async (email: string): Promise<void> => {
    await client.post('/auth/forgot-password', { email });
};

export const resetPassword = async (token: string, password: string): Promise<void> => {
    await client.post('/auth/reset-password', { token, password });
};

export const getCurrentUser = async (): Promise<AuthResponse['user']> => {
    const response = await client.get('/auth/me');
    return response.data;
};

export const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    await client.post('/auth/change-password', { currentPassword, newPassword });
};
