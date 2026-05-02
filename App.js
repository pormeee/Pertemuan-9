import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import * as LocalAuthentication from 'expo-local-authentication';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function Root() {
  const { user, loading } = useAuth();

  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkBiometric = async () => {

      // ❌ kalau belum login → jangan panggil Face ID
      if (!user) {
        setChecked(true);
        return;
      }

      try {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Unlock dengan Face ID',
        });

        if (result.success) {
          setUnlocked(true);
        }

      } catch (e) {
        console.log(e);
      }

      setChecked(true);
    };

    checkBiometric();
  }, [user]);

  // ⛔ tahan sampai selesai check
  if (loading || !checked) return null;

  // 🔐 kalau sudah login tapi belum unlock → tahan
  if (user && !unlocked) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}