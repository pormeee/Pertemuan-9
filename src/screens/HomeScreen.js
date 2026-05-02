import { View, Text, Button } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen() {
  const { logout, role } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>

      {role === "admin" ? (
        <Text>👑 Admin Panel</Text>
      ) : (
        <Text>👤 User Mode</Text>
      )}

      <Button title="Logout" onPress={logout} />
    </View>
  );
}