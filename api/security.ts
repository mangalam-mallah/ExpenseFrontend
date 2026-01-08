import * as SecureStore from 'expo-secure-store'

export const saveToken = async(key: string, value: string) => {
    await SecureStore.setItemAsync(key, value, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED
    })
}

export const getToken = async(key: string) => {
    return await SecureStore.getItemAsync(key)
}

export const deleteToken = async(key: string) => {
    await SecureStore.deleteItemAsync(key)
}