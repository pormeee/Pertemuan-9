import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import * as SecureStore from 'expo-secure-store';
import { auth } from '../config/firebase';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (u) {
        try {
          // 🔥 Refresh token supaya custom claim kebaca
          await u.getIdToken(true);

          const tokenResult = await u.getIdTokenResult();
          const roleClaim = tokenResult.claims.role;

          if (roleClaim) {
            setRole(roleClaim);
            console.log("✅ ROLE CLAIM:", roleClaim);
          } else {
            console.log("⚠️ ROLE CLAIM masih kosong");
            setRole(null);
          }

        } catch (e) {
          console.log("❌ Error ambil claim:", e);
          setRole(null);
        }

      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
    await SecureStore.deleteItemAsync('auth_token');
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}