import React, { useState } from 'react';
import { Text } from '@/components/Text';
import { View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Link } from 'expo-router';


// const schema = z.object({
//     email: z.string().email('Email inválido'),
//     password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
// });

export default function LoginScreen() {
    const { logIn } = useAuth();
    const [email, setEmail] = useState<any>('');
    const [password, setPassword] = useState<any>('');

    async function handleLogin() {
        const response = await logIn(email, password);
    }

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
                    <Button variant='default' onPress={() => handleLogin()}>
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