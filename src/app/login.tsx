import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';

const schema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export default function LoginScreen() {
    const { logIn } = useAuth();

    return (
        <View className='flex-1'>
            <Text>Login</Text>
            <Text>Login2</Text>
        </View>
    );
}