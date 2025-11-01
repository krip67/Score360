import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import { AuthenticatedUser } from './types';

interface AuthContextType {
  token: string | null;
  roles: string[];
  user: AuthenticatedUser | null;
  loading: boolean;
  error: string | null;
  login: (username, password) => Promise<void>;
  logout: (message?: string) => void;
  authFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeJwt = (token: string): any => {
    try {
        const base64Url = token.split('.')[1];
        if (!base64Url) return null;
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Failed to decode JWT", e);
        return null;
    }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [roles, setRoles] = useState<string[]>([]);
    const [user, setUser] = useState<AuthenticatedUser | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const logout = useCallback(async (message?: string) => {
        const currentRefreshToken = localStorage.getItem('refreshToken');
        
        if (currentRefreshToken) {
            try {
                 const params = new URLSearchParams();
                params.append('client_id', 'contest');
                params.append('client_secret', '98FJplc0As5WENUizAeaQpxC77uh9Gvq');
                params.append('refresh_token', currentRefreshToken);

                await fetch('http://194.87.30.33:9080/realms/contest/protocol/openid-connect/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: params,
                });
            } catch (e) {
                // Log the error but proceed with client-side logout
                console.error("Server logout failed:", e);
            }
        }
        
        setUser(null);
        setToken(null);
        setRefreshToken(null);
        setRoles([]);
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRoles');
        localStorage.removeItem('currentUser');
        if (message) {
            setError(message);
        } else {
            setError(null); // Clear any login errors on a clean logout
        }
    }, []);

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = localStorage.getItem('authToken');
            const storedRefreshToken = localStorage.getItem('refreshToken');
            const storedRoles = localStorage.getItem('userRoles');
            const storedUser = localStorage.getItem('currentUser');
            if (storedToken && storedRefreshToken) {
                setToken(storedToken);
                setRefreshToken(storedRefreshToken);
                if (storedRoles) {
                    setRoles(JSON.parse(storedRoles));
                }
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            }
            setLoading(false);
        };
        
        initializeAuth();
    }, []);

    const login = async (username, password) => {
        setLoading(true);
        setError(null);
        
        try {
            if (!username || !password) {
                throw new Error('Имя пользователя и пароль не могут быть пустыми.');
            }

            const params = new URLSearchParams();
            params.append('grant_type', 'password');
            params.append('client_id', 'contest');
            params.append('username', username);
            params.append('password', password);
            params.append('client_secret', '98FJplc0As5WENUizAeaQpxC77uh9Gvq');

            const response = await fetch('http://194.87.30.33:9080/realms/contest/protocol/openid-connect/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params,
            });

            if (!response.ok) {
                let errorMessage = `Ошибка авторизации: ${response.status}`;
                try {
                    const errorData = await response.json();
                    if (errorData && (errorData.error_description || errorData.error)) {
                        errorMessage = `Ошибка авторизации: ${errorData.error_description || errorData.error}`;
                    }
                } catch (e) {
                    errorMessage = `Ошибка авторизации: ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            const apiToken = data.access_token;
            const newRefreshToken = data.refresh_token;
            
            if (!apiToken || !newRefreshToken) {
                throw new Error('Не удалось получить токен доступа или токен обновления от сервера.');
            }
            
            // Fetch user info after getting the token
            const meResponse = await fetch('http://194.87.30.33:8080/user/me', {
                headers: { 'Authorization': `Bearer ${apiToken}` }
            });
            if (!meResponse.ok) {
                throw new Error('Не удалось загрузить информацию о пользователе.');
            }
            const userData: AuthenticatedUser = await meResponse.json();

            const decodedToken = decodeJwt(apiToken);
            // Standard for Keycloak roles
            const userRoles = decodedToken?.realm_access?.roles || [];
            
            setUser(userData);
            setToken(apiToken);
            setRefreshToken(newRefreshToken);
            setRoles(userRoles);
            localStorage.setItem('authToken', apiToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            localStorage.setItem('userRoles', JSON.stringify(userRoles));
            localStorage.setItem('currentUser', JSON.stringify(userData));

        } catch (e) {
            if (e instanceof Error) setError(e.message);
            else setError('Произошла неизвестная ошибка.');
            logout(); // Ensure we are logged out on failure
        } finally {
            setLoading(false);
        }
    };
    
    const authFetch = useCallback(async (url: string, options: RequestInit = {}): Promise<Response> => {
        const currentToken = localStorage.getItem('authToken');
        if (!currentToken) {
            logout('Необходимо авторизоваться');
            throw new Error('Unauthorized'); 
        }

        const headers = {
            ...options.headers,
            'Authorization': `Bearer ${currentToken}`,
        };
        
        // Add Content-Type if it's not a GET request and a body exists
        if (options.method && options.method.toUpperCase() !== 'GET' && options.body) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(url, { ...options, headers });

        if (response.status === 401) {
            logout('Необходимо авторизоваться');
            throw new Error('Unauthorized');
        }
        return response;
    }, [logout]);

    const value = { token, roles, user, loading, error, login, logout, authFetch };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};