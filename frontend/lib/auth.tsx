// @ts-nocheck
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Platform } from "react-native";

const API = (process.env.EXPO_PUBLIC_BACKEND_URL || "") + "/api";
const EMERGENT_LOGIN = "https://auth.emergentagent.com";

// The frontend must always send credentials so the HttpOnly cookie flows on same-site,
// and it also passes Authorization: Bearer for cross-site preview environments.
export type AuthUser = {
  id?: string;
  email: string;
  name?: string;
  picture?: string;
};

type AuthCtxValue = {
  user: AuthUser | null;
  loading: boolean;
  signIn: () => void;
  signOut: () => Promise<void>;
};

const AuthCtx = createContext<AuthCtxValue>({
  user: null,
  loading: true,
  signIn: () => {},
  signOut: async () => {},
});

const TOKEN_KEY = "sollmarine_session_token";

function readToken(): string | null {
  if (Platform.OS !== "web") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function writeToken(t: string | null) {
  if (Platform.OS !== "web") return;
  try {
    if (t) window.localStorage.setItem(TOKEN_KEY, t);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {}
}

async function fetchMe(token: string | null): Promise<AuthUser | null> {
  try {
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const r = await fetch(`${API}/auth/me`, {
      credentials: "include",
      headers,
    });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

async function exchangeSessionId(sessionId: string): Promise<{ user: AuthUser; token: string } | null> {
  try {
    const r = await fetch(`${API}/auth/session`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    });
    if (!r.ok) return null;
    const data = await r.json();
    return {
      user: { id: data.id, email: data.email, name: data.name, picture: data.picture },
      token: data.session_token,
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Handle callback + restore session on mount
  useEffect(() => {
    if (Platform.OS !== "web") {
      setLoading(false);
      return;
    }
    (async () => {
      // 1) If URL fragment has session_id (from Emergent redirect), exchange it
      const hash = window.location.hash || "";
      const match = hash.match(/session_id=([^&]+)/);
      if (match && match[1]) {
        const sid = decodeURIComponent(match[1]);
        const result = await exchangeSessionId(sid);
        // Clean hash from URL either way
        try {
          window.history.replaceState({}, "", window.location.pathname + window.location.search);
        } catch {}
        if (result) {
          writeToken(result.token);
          setUser(result.user);
          setLoading(false);
          return;
        }
      }
      // 2) Otherwise try to restore existing session
      const tok = readToken();
      const me = await fetchMe(tok);
      if (me) {
        setUser(me);
      } else if (tok) {
        writeToken(null);
      }
      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(() => {
    if (Platform.OS !== "web") return;
    const redirect = window.location.origin + "/";
    const url = `${EMERGENT_LOGIN}/?redirect=${encodeURIComponent(redirect)}`;
    window.location.href = url;
  }, []);

  const signOut = useCallback(async () => {
    const tok = readToken();
    try {
      await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: tok ? { Authorization: `Bearer ${tok}` } : {},
      });
    } catch {}
    writeToken(null);
    setUser(null);
  }, []);

  return (
    <AuthCtx.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}
