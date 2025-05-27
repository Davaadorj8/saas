// src/types/user.ts
export interface CurrentUser {
  id: string;
  name: string;      // Should be string (non-optional) if your page logic always provides a fallback
  email: string;     // Should be string (non-optional) if your page logic always provides a fallback
  avatarUrl?: string; // Optional
  role: string;
}