// Persists a piece of React state to localStorage under a namespaced key so
// resident actions (RSVPs, votes, bookings, requests) survive a page refresh
// without needing a backend yet. Falls back gracefully if storage is
// unavailable (private browsing, disabled storage, etc).
import { useEffect, useState } from "react";

const STORAGE_PREFIX = "societyconnect:";

function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => readStoredValue(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch {
      // Storage can be unavailable or full; the app still works in-memory.
    }
  }, [key, value]);

  return [value, setValue] as const;
}
