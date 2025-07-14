import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContext = {
    isLoggedIn: boolean;
    isReady: boolean;
    logIn: () => void;
    logOut: () => void;
}

SplashScreen.preventAutoHideAsync();

export const AuthContext = createContext<AuthContext>({
    isLoggedIn: false,
    isReady: false,
    logIn: () => { },
    logOut: () => { },
});

const AUTH_STATE_KEY = 'isLoggedIn';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const router = useRouter();

    async function storeAuthState(newState: { isLoggedIn: boolean }) {
        try {
            await AsyncStorage.setItem(AUTH_STATE_KEY, newState.isLoggedIn.toString());
        } catch (error) {
            console.error('Error storing auth state:', error);
        }
    }

    function logIn() {
        setIsLoggedIn(true);
        storeAuthState({ isLoggedIn: true });
    }

    function logOut() {
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
        <AuthContext.Provider value={{ isLoggedIn, isReady, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth() {
    return useContext(AuthContext);
}