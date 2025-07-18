import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import React from 'react'
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/Input';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import productSchema, { ProductSchema } from '../ProductSchema'

export default function Addproduct() {

  const { control, handleSubmit, formState } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema)
  });

  const onSubmit: SubmitHandler<ProductSchema> = (data) => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className='mt-4'>
      <ScrollView className='p-4'>
        <View className=''>
          <View className='flex items-center justify-start py-4'>
            <Text className='text-2xl font-bold uppercase'>Produtos</Text>
            <Text className='text-xl text-gray-500'>Inserir um produto</Text>
          </View>
          <Controller
            control={control}
            name='name'
            render={({ field, fieldState }) => (
              <View>
                <Text>Nome do produto</Text>
                <Input
                  placeholder='Nome do produto'
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  style={(fieldState.error) ? { borderColor: 'red' } : { borderColor: 'gray' }}
                />
              </View>
            )}
          />
          {formState.errors.name && <Text className='text-red-500'>{formState.errors.name.message}</Text>}
        </View>

        <View className='mt-4'>
          <Controller
            control={control}
            name='reference'
            render={({ field, fieldState }) => (
              <View>
                <Text>Referência</Text>
                <Input
                  placeholder='Referência'
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  style={(fieldState.error) ? { borderColor: 'red' } : { borderColor: 'gray' }}
                />
              </View>
            )}
          />
          {formState.errors.name && <Text className='text-red-500'>{formState.errors.name.message}</Text>}
        </View>

        <View className='mt-4'>
          <Controller
            control={control}
            name='description'
            render={({ field, fieldState }) => (
              <View>
                <Text>Descrição</Text>
                <Input
                  placeholder='Referência'
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  style={(fieldState.error) ? { borderColor: 'red' } : { borderColor: 'gray' }}
                />
              </View>
            )}
          />
          {formState.errors.name && <Text className='text-red-500'>{formState.errors.name.message}</Text>}
        </View>

        <View className='mt-4'>
          <Controller
            control={control}
            name='unidade'
            render={({ field, fieldState }) => (
              <View>
                <Text>Unidade de medida</Text>
                <Input
                  placeholder='Referência'
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  style={(fieldState.error) ? { borderColor: 'red' } : { borderColor: 'gray' }}
                />
              </View>
            )}
          />
          {formState.errors.name && <Text className='text-red-500'>{formState.errors.name.message}</Text>}
        </View>

        <View className='mt-4'>
          <Controller
            control={control}
            name='medida'
            render={({ field, fieldState }) => (
              <View>
                <Text>Valor da medida</Text>
                <Input
                  placeholder='Ex.: 1'
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  style={(fieldState.error) ? { borderColor: 'red' } : { borderColor: 'gray' }}
                />
              </View>
            )}
          />
          {formState.errors.name && <Text className='text-red-500'>{formState.errors.name.message}</Text>}
        </View>

        <View className='mt-4'>
          <Controller
            control={control}
            name='price'
            render={({ field, fieldState }) => (
              <View>
                <Text>Preço</Text>
                <Input
                  placeholder='Ex.: 1'
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  style={(fieldState.error) ? { borderColor: 'red' } : { borderColor: 'gray' }}
                />
              </View>
            )}
          />
          {formState.errors.name && <Text className='text-red-500'>{formState.errors.name.message}</Text>}
        </View>

        <View className='mt-4'>
          <Button variant='default' onPress={handleSubmit(onSubmit)} >
            <Text>Salvar</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}