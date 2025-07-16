import apiconnect from "@/lib/apiconnect";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContext = {
    isLoggedIn: boolean;
    isReady: boolean;
    logIn: any;
    logOut: () => void;
    user: any;
}

SplashScreen.preventAutoHideAsync();

export const AuthContext = createContext<AuthContext>({
    isLoggedIn: false,
    isReady: false,
    logIn: () => { },
    logOut: () => { },
    user: null,
});

const AUTH_STATE_KEY = 'isLoggedIn';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function loadUser() {
            try {
                const userData = await AsyncStorage.getItem('DATA_USER');
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            } catch (error) {
                console.error('Error loading user:', error);
            }
        }
        loadUser();
    }, [AsyncStorage]);


    async function storeAuthState(newState: { isLoggedIn: boolean }) {
        try {
            await AsyncStorage.setItem(AUTH_STATE_KEY, newState.isLoggedIn.toString());
        } catch (error) {
            console.error('Error storing auth state:', error);
        }
    }

    async function logIn( email: any, password: any ) {
        
        try {
            const response = await apiconnect.post('auth/login', {
                email: email,
                password: password
            });
            const { success, token, user } = response.data;
            let dataUser = {
                token: token,
                user: user
            }
            if (success) {
                console.log(dataUser);
                
                await AsyncStorage.setItem('DATA_USER', JSON.stringify(dataUser));
                setIsLoggedIn(true);
                storeAuthState({ isLoggedIn: true });
                router.replace('/(protected)/(tabs)');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function logOut() {
        await AsyncStorage.setItem('DATA_USER', '');
        setIsLoggedIn(false);
        storeAuthState({ isLoggedIn: false });
    }

    useEffect(() => {
        async function loadAuthState() {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const authState = await AsyncStorage.getItem(AUTH_STATE_KEY);
                if (authState) {
                    setIsLoggedIn(JSON.parse(authState).isLoggedIn);
                }
            } catch (error) {
                console.error('Error loading auth state:', error);
            } finally {
                setIsReady(true);
            }
        }
        loadAuthState();
    }, []);

    useEffect(() => {
        if (isReady) {
            SplashScreen.hideAsync();
        }
    }, [isReady]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isReady, logIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth() {
    return useContext(AuthContext);
}