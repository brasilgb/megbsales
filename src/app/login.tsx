import React, { useState } from 'react';
import { Text } from '@/components/Text';
import { View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Link, router } from 'expo-router';
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// const schema = z.object({
//     email: z.string().email('Email inválido'),
//     password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
// });

export default function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            if (user) router.replace('/(protected)/(tabs)');
        } catch (error) {
            console.error('SignIn failed:', error);
        }
    };

    const signUp = async () => {
        try {
            const user = createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('SignUp failed:', error);
        }
    };


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className='flex-1 flex-col items-center justify-center p-4'>
            <View className='w-full gap-4'>
                <View className='flex-col items-center justify-center'>
                    <Image source={require('@/assets/logo.png')} className='w-40 h-40' />
                    <Text>Para Representante</Text>
                    <Text>de Vendas</Text>
                    <Text className="text-xl mt-4">Bem vindo de volta</Text>
                </View>
                <View>
                    <Input
                        placeholder='E-mail'
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View>
                    <Input
                        placeholder='Senha'
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                </View>
                <View>
                    <Button variant='default' onPress={signIn}>
                        <Text>
                            Entrar
                        </Text>
                    </Button>
                </View>
                <View className='flex-row items-center justify-center gap-2'>
                    <Text>Não tenho uma conta</Text>
                    <Link className='text-blue-800 underline' href="/(protected)/addcustomer">Registrar</Link>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}