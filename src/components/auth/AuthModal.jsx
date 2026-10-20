import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Wrench, 
  ShoppingBag, 
  AlertCircle,
  Sparkles,
  KeyRound,
  CheckCircle2,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { CAMBODIA_PROVINCES } from '../../data/deliveryData';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  initialMode = 'login', 
  notice = null 
}) {
  const { login, sendOtp, verifyOtp, loginWithGoogle } = useAuth();
  const { t, lang } = useLanguage();

  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' | 'otp'
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // OTP Verification Step State
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpTargetEmail, setOtpTargetEmail] = useState('');
  const [generatedDemoOtp, setGeneratedDemoOtp] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [pendingRegistrationData, setPendingRegistrationData] = useState(null);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('Phnom Penh');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Refs for 6-digit OTP inputs
  const otpInputRefs = useRef([]);

  // Timer countdown effect for OTP
  useEffect(() => {
    let timer;
    if (isVerifyingOtp && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isVerifyingOtp, countdown]);

  if (!isOpen) return null;

  const handleResetForm = () => {
    setError('');
    setSuccessMsg('');
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
    setConfirmPassword('');
    setIsVerifyingOtp(false);
    setOtpDigits(['', '', '', '', '', '']);
    setPendingRegistrationData(null);
  };

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccessMsg('');
    setIsVerifyingOtp(false);
  };

  // Google OAuth One-Click Login
  const handleGoogleLogin = () => {
    setLoading(true);
    setError('');

    // Simulate/login Google User seamlessly
    setTimeout(() => {
      const res = loginWithGoogle();
      setLoading(false);
      if (res.success) {
        handleResetForm();
        if (onSuccess) onSuccess(res.user);
        onClose();
      } else {
        setError(res.error || 'Google Sign-In failed');
      }
    }, 400);
  };

  // Demo 1-Click quick fill
  const handleQuickDemoFill = (demoEmail, demoPassword) => {
    setMode('login');
    setLoginMethod('password');
    setIsVerifyingOtp(false);
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
  };

  // Trigger Send OTP
  const triggerSendOtp = (targetEmail, regData = null) => {
    const res = sendOtp(targetEmail);
    if (res.success) {
      setOtpTargetEmail(targetEmail);
      setGeneratedDemoOtp(res.code);
      setPendingRegistrationData(regData);
      setIsVerifyingOtp(true);
      setCountdown(60);
      setOtpDigits(['', '', '', '', '', '']);
      setSuccessMsg(t('auth.otpSentSuccess'));
      // Auto focus first OTP digit
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 200);
    }
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (countdown > 0) return;
    triggerSendOtp(otpTargetEmail, pendingRegistrationData);
  };

  // Handle individual OTP digit change
  const handleOtpDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1); // Only keep last digit entered
    setOtpDigits(newDigits);
    setError('');

    // Auto focus next box
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP backspace
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Paste 6 digits
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtpDigits(digits);
      otpInputRefs.current[5]?.focus();
    }
  };

  // Auto-fill demo OTP code
  const handleFillDemoOtp = () => {
    if (generatedDemoOtp) {
      setOtpDigits(generatedDemoOtp.split(''));
    }
  };

  // Verify submitted OTP
  const handleVerifyOtpSubmit = (e) => {
    e.preventDefault();
    const code = otpDigits.join('');
    if (code.length < 6) {
      setError(lang === 'km' ? 'សូមបញ្ចូលលេខកូដសម្ងាត់ ៦ ខ្ទង់ពេញលេញ' : 'Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    const res = verifyOtp(otpTargetEmail, code, pendingRegistrationData);
    setLoading(false);

    if (res.success) {
      handleResetForm();
      if (onSuccess) onSuccess(res.user);
      onClose();
    } else {
      setError(res.error);
    }
  };

  // Form submit handler for Password login or Initial Step
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!email.trim()) {
        setError(lang === 'km' ? 'សូមបញ្ចូលអ៊ីមែល' : 'Please enter your email');
        return;
      }

      if (loginMethod === 'otp') {
        // Send OTP to login
        triggerSendOtp(email.trim());
      } else {
        // Standard Password Login
        if (!password) {
          setError(lang === 'km' ? 'សូមបញ្ចូលពាក្យសម្ងាត់' : 'Please enter your password');
          return;
        }

        setLoading(true);
        const res = login(email, password);
        setLoading(false);

        if (res.success) {
          handleResetForm();
          if (onSuccess) onSuccess(res.user);
          onClose();
        } else {
          setError(res.error);
        }
      }
    } else {
      // Register Mode
      if (!name.trim()) {
        setError(lang === 'km' ? 'សូមបញ្ចូលឈ្មោះពេញ' : 'Please enter your full name');
        return;
      }
      if (!email.trim()) {
        setError(lang === 'km' ? 'សូមបញ្ចូលអ៊ីមែល' : 'Please enter your email');
        return;
      }
      if (password.length < 6) {
        setError(lang === 'km' ? 'ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៦ តួអក្សរ' : 'Password must be at least 6 characters');
        return;
      }
      if (password !== confirmPassword) {
        setError(lang === 'km' ? 'ពាក្យសម្ងាត់ផ្ទៀងផ្ទាត់មិនត្រូវគ្នាទេ' : 'Passwords do not match');
        return;
      }

      // Transition to Email OTP Verification to activate account!
      const regData = { name, email, password, phone, province };
      triggerSendOtp(email.trim(), regData);
    }
  };

  return (
    <div className="modal-overlay auth-modal-overlay" onClick={onClose}>
      <div className="modal-container auth-modal-card animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close auth modal">
          <X size={20} />
        </button>

        {/* ================================================================= */}
        {/* VIEW 1: OTP VERIFICATION SCREEN */}
        {/* ================================================================= */}
        {isVerifyingOtp ? (
          <div className="otp-verification-view">
            <div className="otp-icon-wrapper">
              <KeyRound size={28} className="text-orange" />
            </div>

            <h2 className="auth-modal-title">{t('auth.otpTitle')}</h2>
            <p className="otp-subtitle-text">
              {t('auth.otpSubtitle')} <strong>{otpTargetEmail}</strong>
            </p>

            {/* Demo Helper Pill */}
            {generatedDemoOtp && (
              <div className="otp-demo-pill" onClick={handleFillDemoOtp} title="Click to auto-fill">
                <Sparkles size={13} className="text-orange" />
                <span>Demo Code: <strong>{generatedDemoOtp}</strong> (Click to Fill)</span>
              </div>
            )}

            {/* Error or Success Alert */}
            {error && (
              <div className="auth-error-alert animate-shake">
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}
            {successMsg && !error && (
              <div className="auth-success-alert">
                <CheckCircle2 size={15} />
                <span>{successMsg}</span>
              </div>
            )}

            {/* 6 Digits Input */}
            <form onSubmit={handleVerifyOtpSubmit}>
              <div className="otp-inputs-grid" onPaste={handleOtpPaste}>
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={el => (otpInputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className={`otp-digit-box ${digit ? 'filled' : ''}`}
                    value={digit}
                    onChange={e => handleOtpDigitChange(idx, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(idx, e)}
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary btn-lg btn-full-width auth-submit-btn"
                disabled={loading}
              >
                {loading ? '...' : t('auth.verifyOtpBtn')}
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Resend and Change Email options */}
            <div className="otp-footer-actions">
              <button 
                type="button" 
                className="otp-resend-btn"
                onClick={handleResendOtp}
                disabled={countdown > 0}
              >
                <RefreshCw size={14} className={countdown > 0 ? '' : 'spin-on-hover'} />
                <span>
                  {countdown > 0 
                    ? t('auth.resendIn', { seconds: countdown }) 
                    : t('auth.resendOtp')}
                </span>
              </button>

              <button 
                type="button" 
                className="otp-change-email-btn"
                onClick={() => setIsVerifyingOtp(false)}
              >
                {t('auth.changeEmail')}
              </button>
            </div>
          </div>
        ) : (
          /* ================================================================= */
          /* VIEW 2: LOGIN / REGISTER MAIN SCREEN WITH GOOGLE & EMAIL OPTIONS */
          /* ================================================================= */
          <>
            {/* Modal Header */}
            <div className="auth-modal-header">
              <div className="auth-brand-badge">
                <Sparkles size={16} className="text-orange" />
                <span>SMASHZONE ID</span>
              </div>
              <h2 className="auth-modal-title">
                {mode === 'login' ? t('auth.signInTitle') : t('auth.signUpTitle')}
              </h2>

              {/* Context Notice (e.g., checkout gate) */}
              {notice && (
                <div className="auth-checkout-notice">
                  <ShoppingBag size={15} className="text-orange" />
                  <span>{notice}</span>
                </div>
              )}
            </div>

            {/* Google One-Click Button */}
            <button 
              type="button" 
              className="google-auth-btn" 
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{t('auth.googleSignIn')}</span>
            </button>

            {/* Divider */}
            <div className="auth-divider">
              <span>{t('auth.orDivider')}</span>
            </div>

            {/* Mode Selector Tabs */}
            <div className="auth-tabs">
              <button 
                type="button"
                className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
                onClick={() => handleSwitchMode('login')}
              >
                {t('auth.login')}
              </button>
              <button 
                type="button"
                className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
                onClick={() => handleSwitchMode('register')}
              >
                {t('auth.register')}
              </button>
            </div>

            {/* Sub-toggle for Login: Password vs Email OTP */}
            {mode === 'login' && (
              <div className="login-method-toggle">
                <button 
                  type="button" 
                  className={`method-btn ${loginMethod === 'password' ? 'active' : ''}`}
                  onClick={() => setLoginMethod('password')}
                >
                  <Lock size={13} />
                  <span>{t('auth.passwordLogin')}</span>
                </button>
                <button 
                  type="button" 
                  className={`method-btn ${loginMethod === 'otp' ? 'active' : ''}`}
                  onClick={() => setLoginMethod('otp')}
                >
                  <Mail size={13} />
                  <span>{t('auth.otpLogin')}</span>
                </button>
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <div className="auth-error-alert animate-shake">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="auth-form">
              {mode === 'register' && (
                <>
                  <div className="form-group">
                    <label className="form-label">{t('auth.fullName')} *</label>
                    <div className="input-with-icon">
                      <User size={16} className="input-icon" />
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder={lang === 'km' ? 'ឧ. ចាន់ តារា' : 'e.g. John Doe'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">{t('auth.phone')}</label>
                      <div className="input-with-icon">
                        <Phone size={16} className="input-icon" />
                        <input 
                          type="tel" 
                          className="form-input" 
                          placeholder="012 888 999"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">{t('auth.province')}</label>
                      <div className="input-with-icon">
                        <MapPin size={16} className="input-icon" />
                        <select 
                          className="form-input"
                          value={province}
                          onChange={(e) => setProvince(e.target.value)}
                        >
                          {CAMBODIA_PROVINCES.map(p => (
                            <option key={p.id} value={p.name}>
                              {lang === 'km' ? p.nameKm : p.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Email field */}
              <div className="form-group">
                <label className="form-label">{t('auth.email')} *</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon" />
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password field: only show if password method or register */}
              {(mode === 'register' || loginMethod === 'password') && (
                <div className="form-group">
                  <label className="form-label">{t('auth.password')} *</label>
                  <div className="input-with-icon">
                    <Lock size={16} className="input-icon" />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      className="form-input" 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="password-toggle-btn" 
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Confirm Password for Register */}
              {mode === 'register' && (
                <div className="form-group">
                  <label className="form-label">
                    {lang === 'km' ? 'ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់ *' : 'Confirm Password *'}
                  </label>
                  <div className="input-with-icon">
                    <Lock size={16} className="input-icon" />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      className="form-input" 
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button 
                type="submit" 
                className="btn btn-primary btn-lg btn-full-width auth-submit-btn"
                disabled={loading}
              >
                {loading ? '...' : (
                  mode === 'login' 
                    ? (loginMethod === 'otp' 
                        ? (lang === 'km' ? 'ផ្ញើលេខកូដ OTP ទៅអ៊ីមែល' : 'Send 6-Digit Email Code') 
                        : t('auth.loginBtn')) 
                    : (lang === 'km' ? 'បង្កើតគណនី & ផ្ទៀងផ្ទាត់ OTP' : 'Create Account & Verify OTP')
                )}
              </button>
            </form>

            {/* Switch mode footer */}
            <div className="auth-modal-footer">
              {mode === 'login' ? (
                <p className="auth-switch-text">
                  {t('auth.noAccount')}{' '}
                  <button 
                    type="button" 
                    className="auth-switch-link"
                    onClick={() => handleSwitchMode('register')}
                  >
                    {t('auth.register')}
                  </button>
                </p>
              ) : (
                <p className="auth-switch-text">
                  {t('auth.haveAccount')}{' '}
                  <button 
                    type="button" 
                    className="auth-switch-link"
                    onClick={() => handleSwitchMode('login')}
                  >
                    {t('auth.login')}
                  </button>
                </p>
              )}
            </div>

            {/* Quick Demo Credentials Bar */}
            <div className="auth-demo-helper">
              <span className="demo-helper-title">{t('auth.demoAccounts')}:</span>
              <div className="demo-pills-row">
                <button 
                  type="button" 
                  className="demo-pill-btn pill-superadmin"
                  onClick={() => handleQuickDemoFill('superadmin@smashzone.com', 'super123')}
                >
                  <ShieldCheck size={13} className="text-purple" />
                  <span>{t('auth.roleSuperAdmin')}</span>
                </button>
                <button 
                  type="button" 
                  className="demo-pill-btn pill-admin"
                  onClick={() => handleQuickDemoFill('admin@smashzone.com', 'admin123')}
                >
                  <Wrench size={13} className="text-orange" />
                  <span>{t('auth.roleAdmin')}</span>
                </button>
                <button 
                  type="button" 
                  className="demo-pill-btn pill-customer"
                  onClick={() => handleQuickDemoFill('customer@smashzone.com', 'user123')}
                >
                  <User size={13} className="text-blue" />
                  <span>{t('auth.roleCustomer')}</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
