// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '@/contexts/auth.context';
import { useColorScheme } from '@/hooks/useColorScheme';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Auth check component
function AuthCheck({ children }: { children: React.ReactNode }) {
  const { state } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    
    if (!state.loading) {
      if (!state.user && !inAuthGroup) {
        // Redirect to sign in if user is not signed in and trying to access protected routes
        router.replace('/(auth)/login');
      } else if (state.user && inAuthGroup) {
        // Redirect to home if user is signed in and trying to access auth routes
        router.replace('/(tabs)');
      }
    }
  }, [state.user, state.loading, segments]);

  if (state.loading) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}

// Root layout component
function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="+not-found" options={{
          title: 'Oops!',
          presentation: 'modal'
        }} />
      </Stack>
    </ThemeProvider>
  );
}

// Main layout component
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // Add more fonts here
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <AuthCheck>
        <RootLayoutNav />
      </AuthCheck>
    </AuthProvider>
  );
}