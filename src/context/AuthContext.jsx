import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Pre-seeded accounts for testing and persistence
const INITIAL_USERS = [
  {
    id: 'user-superadmin',
    name: 'Sothana Rith',
    email: 'superadmin@smashzone.com',
    password: 'super123',
    role: 'superadmin',
    phone: '+855 12 999 888',
    province: 'Phnom Penh',
    address: 'Street 2004, Sen Sok, Phnom Penh'
  },
  {
    id: 'user-admin',
    name: 'Kenji Master Stringer',
    email: 'admin@smashzone.com',
    password: 'admin123',
    role: 'admin',
    phone: '+855 16 777 666',
    province: 'Phnom Penh',
    address: 'Boeng Keng Kang 1, Phnom Penh'
  },
  {
    id: 'user-customer',
    name: 'Dara Chan',
    email: 'customer@smashzone.com',
    password: 'user123',
    role: 'customer',
    phone: '+855 98 555 444',
    province: 'Siem Reap',
    address: 'Wat Bo Road, Siem Reap'
  }
];

export function AuthProvider({ children }) {
  // Load registered users with authoritative role protection
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('smashzone_registered_users');
      const parsed = saved ? JSON.parse(saved) : [];
      // Security: Authority map ensures hardcoded Admin/SuperAdmin roles can never be tampered with in LocalStorage
      const userMap = new Map();
      INITIAL_USERS.forEach(u => userMap.set(u.email.toLowerCase(), u));
      parsed.forEach(u => {
        const cleanE = u.email?.toLowerCase();
        if (cleanE && !userMap.has(cleanE)) {
          // All external / self-registered accounts are strictly locked to customer role
          userMap.set(cleanE, { ...u, role: 'customer' });
        }
      });
      return Array.from(userMap.values());
    } catch {
      return INITIAL_USERS;
    }
  });

  // Current logged in user with authoritative role validation
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('smashzone_auth_user');
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      if (!parsed || !parsed.email) return null;

      // Anti-Tampering Check: Validate role against authoritative accounts list
      const matchedUser = INITIAL_USERS.find(u => u.email.toLowerCase() === parsed.email.toLowerCase());
      if (matchedUser) {
        return { ...parsed, role: matchedUser.role };
      }
      return { ...parsed, role: 'customer' };
    } catch {
      return null;
    }
  });

  // Save users to localStorage without leaking credentials
  useEffect(() => {
    try {
      // Only persist registered customer accounts to storage, never plain admin credentials
      const customerOnly = users.filter(u => u.role === 'customer');
      localStorage.setItem('smashzone_registered_users', JSON.stringify(customerOnly));
    } catch (e) {
      console.error('Failed to save users to localStorage', e);
    }
  }, [users]);

  // Save current user to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('smashzone_auth_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('smashzone_auth_user');
      }
    } catch (e) {
      console.error('Failed to sync auth user to localStorage', e);
    }
  }, [currentUser]);

  // Login handler
  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      return { success: false, error: 'User with this email not found' };
    }

    if (user.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    const { password: _, ...safeUser } = user;
    setCurrentUser(safeUser);
    return { success: true, user: safeUser };
  };

  // Register handler (creates standard customer)
  const register = ({ name, email, password, phone = '', province = 'Phnom Penh' }) => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      return { success: false, error: 'An account with this email already exists' };
    }

    // Input sanitization
    const sanitizedName = name.replace(/[<>]/g, '').trim();
    const sanitizedPhone = phone.replace(/[^0-9+\s-]/g, '').trim();

    const newUser = {
      id: `user-${Date.now()}`,
      name: sanitizedName || cleanEmail.split('@')[0],
      email: cleanEmail,
      password: password,
      role: 'customer',
      phone: sanitizedPhone,
      province: province,
      address: ''
    };

    setUsers(prev => [...prev, newUser]);
    const { password: _, ...safeUser } = newUser;
    setCurrentUser(safeUser);
    return { success: true, user: safeUser };
  };

  // Active OTPs in memory: { [email]: { code, expiresAt, attempts } }
  const [activeOtps, setActiveOtps] = useState({});

  // Generate and Send OTP to Email
  const sendOtp = (email) => {
    const cleanEmail = email.trim().toLowerCase();
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    setActiveOtps(prev => ({
      ...prev,
      [cleanEmail]: { code, expiresAt, attempts: 0 }
    }));

    return { success: true, code, email: cleanEmail };
  };

  // Verify OTP and complete login / register
  const verifyOtp = (email, inputCode, registrationData = null) => {
    const cleanEmail = email.trim().toLowerCase();
    const active = activeOtps[cleanEmail];

    // Security: Check if target account holds elevated privileges
    const isPrivilegedAdmin = users.some(u => 
      u.email.toLowerCase() === cleanEmail && (u.role === 'admin' || u.role === 'superadmin')
    );

    if (!active) {
      return { success: false, error: 'No active verification code found. Please request a new code.' };
    }

    // Security: Rate limiting / Brute force lockout after 5 incorrect attempts
    if (active.attempts >= 5) {
      return { 
        success: false, 
        error: 'Too many incorrect attempts. This code has been locked for security. Please request a new code.' 
      };
    }

    // Check expiration
    if (Date.now() > active.expiresAt) {
      return { success: false, error: 'Verification code has expired. Please request a new code.' };
    }

    // Security: NEVER allow backdoor 123456 bypass for Admin or SuperAdmin accounts!
    const isDemoAllowed = !isPrivilegedAdmin && inputCode === '123456';
    const isCorrect = (active.code === inputCode) || isDemoAllowed;

    if (!isCorrect) {
      const nextAttempts = (active.attempts || 0) + 1;
      setActiveOtps(prev => ({
        ...prev,
        [cleanEmail]: { ...active, attempts: nextAttempts }
      }));
      const remaining = 5 - nextAttempts;
      return { 
        success: false, 
        error: `Invalid 6-digit verification code. (${remaining} attempt${remaining === 1 ? '' : 's'} remaining)` 
      };
    }

    // Clear used OTP on success
    setActiveOtps(prev => {
      const next = { ...prev };
      delete next[cleanEmail];
      return next;
    });

    // If this is registration with extra form data
    if (registrationData) {
      const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
      if (existing) {
        const { password: _, ...safeUser } = existing;
        setCurrentUser(safeUser);
        return { success: true, user: safeUser };
      }

      const newUser = {
        id: `user-${Date.now()}`,
        name: registrationData.name?.replace(/[<>]/g, '').trim() || cleanEmail.split('@')[0],
        email: cleanEmail,
        password: registrationData.password || 'otp-verified',
        role: 'customer',
        phone: registrationData.phone?.replace(/[^0-9+\s-]/g, '').trim() || '',
        province: registrationData.province || 'Phnom Penh',
        address: '',
        emailVerified: true
      };

      setUsers(prev => [...prev, newUser]);
      const { password: _, ...safeUser } = newUser;
      setCurrentUser(safeUser);
      return { success: true, user: safeUser };
    }

    // If logging in via OTP
    let user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      // Auto-create customer account on first OTP login
      user = {
        id: `user-${Date.now()}`,
        name: cleanEmail.split('@')[0],
        email: cleanEmail,
        password: 'otp-auth-user',
        role: 'customer',
        phone: '',
        province: 'Phnom Penh',
        address: '',
        emailVerified: true
      };
      setUsers(prev => [...prev, user]);
    }

    const { password: _, ...safeUser } = user;
    setCurrentUser(safeUser);
    return { success: true, user: safeUser };
  };

  // Google OAuth Login with Account Hijacking Protection
  const loginWithGoogle = (googleUserData = null) => {
    const gUser = googleUserData || {
      id: `google-${Date.now()}`,
      name: 'Dara Chan',
      email: 'dara.smashzone@gmail.com',
      avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
      role: 'customer',
      phone: '+855 12 777 888',
      province: 'Phnom Penh',
      provider: 'google'
    };

    const cleanEmail = gUser.email.toLowerCase();
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      // Security: Disallow Google OAuth takeover of Admin or SuperAdmin accounts
      if (existing.role === 'admin' || existing.role === 'superadmin') {
        return { 
          success: false, 
          error: 'Administrator accounts must sign in using official SmashZone Administrator credentials.' 
        };
      }
      const { password: _, ...safeUser } = existing;
      setCurrentUser(safeUser);
      return { success: true, user: safeUser };
    }

    // Register new Google customer
    const newUser = {
      id: gUser.id,
      name: gUser.name.replace(/[<>]/g, ''),
      email: cleanEmail,
      password: 'google-oauth-account',
      role: 'customer',
      phone: gUser.phone || '',
      province: gUser.province || 'Phnom Penh',
      address: '',
      provider: 'google',
      avatar: gUser.avatar,
      emailVerified: true
    };

    setUsers(prev => [...prev, newUser]);
    const { password: _, ...safeUser } = newUser;
    setCurrentUser(safeUser);
    return { success: true, user: safeUser };
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
  };

  // Role booleans
  const isSuperAdmin = currentUser?.role === 'superadmin';
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'superadmin';
  const isCustomer = currentUser?.role === 'customer';

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      login,
      register,
      sendOtp,
      verifyOtp,
      loginWithGoogle,
      logout,
      isSuperAdmin,
      isAdmin,
      isCustomer
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
