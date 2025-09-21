/**
 * RSD Authentication System
 * Manages user authentication for RSD Emergency Center
 * Integrates with WordPress User Registration plugin
 */

class RSDAuthSystem {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.hasCheckedAuth = false;
        this.init();
    }

    init() {
        this.checkAuthenticationStatus();
        this.createAuthModal();
        this.bindEvents();
    }

    /**
     * Check if user is currently authenticated
     */
    async checkAuthenticationStatus() {
        try {
            const response = await fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'action=rsd_check_auth_status'
            });
            
            const data = await response.json();
            
            if (data.success && data.data.authenticated) {
                this.isAuthenticated = true;
                this.currentUser = data.data.user;
                this.onAuthenticationSuccess();
            } else {
                this.isAuthenticated = false;
                this.currentUser = null;
            }
            
            this.hasCheckedAuth = true;
        } catch (error) {
            console.error('Error checking authentication status:', error);
            this.isAuthenticated = false;
            this.hasCheckedAuth = true;
        }
    }

    /**
     * Create authentication modal
     */
    createAuthModal() {
        const modalHTML = `
            <div id="rsd-auth-modal" class="rsd-modal" style="display: none;">
                <div class="rsd-modal-content">
                    <div class="rsd-modal-header">
                        <h2>Access RSD Emergency Center</h2>
                        <span class="rsd-close-modal">&times;</span>
                    </div>
                    <div class="rsd-modal-body">
                        <div class="rsd-auth-tabs">
                            <button class="rsd-tab-btn active" data-tab="login">Sign In</button>
                            <button class="rsd-tab-btn" data-tab="register">Create Account</button>
                        </div>
                        
                        <div id="rsd-auth-message" class="rsd-auth-message" style="display: none;"></div>
                        
                        <!-- Login Form -->
                        <form id="rsd-login-form" class="rsd-auth-form">
                            <h3>Welcome Back!</h3>
                            <p>Sign in to access your personalized RSD Emergency Center</p>
                            
                            <div class="rsd-form-group">
                                <label for="login-email">Email Address</label>
                                <input type="email" id="login-email" name="email" required 
                                       placeholder="Enter your email address">
                            </div>
                            
                            <div class="rsd-form-group">
                                <label for="login-password">Password</label>
                                <input type="password" id="login-password" name="password" required 
                                       placeholder="Enter your password">
                            </div>
                            
                            <div class="rsd-form-group">
                                <label class="rsd-checkbox">
                                    <input type="checkbox" name="remember_me">
                                    <span class="checkmark"></span>
                                    Remember me
                                </label>
                            </div>
                            
                            <button type="submit" class="rsd-btn rsd-btn-primary">
                                <span class="btn-text">Sign In</span>
                                <span class="btn-loading" style="display: none;">Signing in...</span>
                            </button>
                            
                            <div class="rsd-auth-links">
                                <a href="#" class="forgot-password">Forgot your password?</a>
                            </div>
                        </form>
                        
                        <!-- Registration Form -->
                        <form id="rsd-register-form" class="rsd-auth-form" style="display: none;">
                            <h3>Join Our Community</h3>
                            <p>Create your account to access personalized RSD support tools</p>
                            
                            <div class="rsd-form-group">
                                <label for="register-first-name">First Name</label>
                                <input type="text" id="register-first-name" name="first_name" required 
                                       placeholder="Enter your first name">
                            </div>
                            
                            <div class="rsd-form-group">
                                <label for="register-last-name">Last Name</label>
                                <input type="text" id="register-last-name" name="last_name" required 
                                       placeholder="Enter your last name">
                            </div>
                            
                            <div class="rsd-form-group">
                                <label for="register-email">Email Address</label>
                                <input type="email" id="register-email" name="email" required 
                                       placeholder="Enter your email address">
                            </div>
                            
                            <div class="rsd-form-group">
                                <label for="register-password">Password</label>
                                <input type="password" id="register-password" name="password" required 
                                       placeholder="Create a secure password" minlength="8">
                            </div>
                            
                            <div class="rsd-form-group">
                                <label for="register-confirm-password">Confirm Password</label>
                                <input type="password" id="register-confirm-password" name="confirm_password" required 
                                       placeholder="Confirm your password">
                            </div>
                            
                            <div class="rsd-form-group">
                                <label class="rsd-checkbox">
                                    <input type="checkbox" name="terms_agreement" required>
                                    <span class="checkmark"></span>
                                    I agree to the <a href="/privacy-policy" target="_blank">Terms of Service</a> 
                                    and <a href="/privacy-policy" target="_blank">Privacy Policy</a>
                                </label>
                            </div>
                            
                            <div class="rsd-form-group">
                                <label class="rsd-checkbox">
                                    <input type="checkbox" name="email_updates">
                                    <span class="checkmark"></span>
                                    Send me updates about RSD resources and support
                                </label>
                            </div>
                            
                            <button type="submit" class="rsd-btn rsd-btn-primary">
                                <span class="btn-text">Create Account</span>
                                <span class="btn-loading" style="display: none;">Creating account...</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    /**
     * Bind event handlers
     */
    bindEvents() {
        // Modal close handlers
        jQuery(document).on('click', '.rsd-close-modal, .rsd-modal', (e) => {
            if (e.target.classList.contains('rsd-close-modal') || e.target.classList.contains('rsd-modal')) {
                this.hideAuthModal();
            }
        });

        // Tab switching
        jQuery(document).on('click', '.rsd-tab-btn', (e) => {
            const tab = e.target.dataset.tab;
            this.switchTab(tab);
        });

        // Form submissions
        jQuery(document).on('submit', '#rsd-login-form', (e) => {
            e.preventDefault();
            this.handleLogin(e);
        });

        jQuery(document).on('submit', '#rsd-register-form', (e) => {
            e.preventDefault();
            this.handleRegistration(e);
        });

        // Password confirmation validation
        jQuery(document).on('input', '#register-confirm-password', () => {
            this.validatePasswordConfirmation();
        });
    }

    /**
     * Switch between login and registration tabs
     */
    switchTab(tab) {
        jQuery('.rsd-tab-btn').removeClass('active');
        jQuery(`.rsd-tab-btn[data-tab="${tab}"]`).addClass('active');

        if (tab === 'login') {
            jQuery('#rsd-login-form').show();
            jQuery('#rsd-register-form').hide();
        } else {
            jQuery('#rsd-login-form').hide();
            jQuery('#rsd-register-form').show();
        }

        this.hideMessage();
    }

    /**
     * Show authentication modal
     */
    showAuthModal() {
        jQuery('#rsd-auth-modal').fadeIn(300);
        this.hideMessage();
    }

    /**
     * Hide authentication modal
     */
    hideAuthModal() {
        jQuery('#rsd-auth-modal').fadeOut(300);
        this.resetForms();
    }

    /**
     * Reset all forms
     */
    resetForms() {
        jQuery('#rsd-login-form')[0].reset();
        jQuery('#rsd-register-form')[0].reset();
        this.hideMessage();
        this.hideLoadingStates();
    }

    /**
     * Handle login form submission
     */
    async handleLogin(e) {
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const rememberMe = formData.get('remember_me') ? 1 : 0;

        if (!this.validateLoginForm(email, password)) {
            return;
        }

        this.showLoadingState('login');
        
        try {
            const response = await fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `action=rsd_user_login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&remember_me=${rememberMe}`
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.isAuthenticated = true;
                this.currentUser = data.data.user;
                this.showMessage('Login successful! Welcome back!', 'success');
                
                setTimeout(() => {
                    this.hideAuthModal();
                    this.onAuthenticationSuccess();
                }, 1000);
            } else {
                this.showMessage(data.data.message || 'Login failed. Please check your credentials.', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showMessage('An error occurred during login. Please try again.', 'error');
        } finally {
            this.hideLoadingState('login');
        }
    }

    /**
     * Handle registration form submission
     */
    async handleRegistration(e) {
        const formData = new FormData(e.target);
        const firstName = formData.get('first_name');
        const lastName = formData.get('last_name');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm_password');
        const termsAgreement = formData.get('terms_agreement') ? 1 : 0;
        const emailUpdates = formData.get('email_updates') ? 1 : 0;

        if (!this.validateRegistrationForm(firstName, lastName, email, password, confirmPassword, termsAgreement)) {
            return;
        }

        this.showLoadingState('register');
        
        try {
            const response = await fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `action=rsd_user_register&first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&email_updates=${emailUpdates}`
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.showMessage('Account created successfully! You can now sign in.', 'success');
                
                setTimeout(() => {
                    this.switchTab('login');
                    jQuery('#login-email').val(email);
                }, 1500);
            } else {
                this.showMessage(data.data.message || 'Registration failed. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showMessage('An error occurred during registration. Please try again.', 'error');
        } finally {
            this.hideLoadingState('register');
        }
    }

    /**
     * Validate login form
     */
    validateLoginForm(email, password) {
        if (!email || !password) {
            this.showMessage('Please fill in all required fields.', 'error');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        return true;
    }

    /**
     * Validate registration form
     */
    validateRegistrationForm(firstName, lastName, email, password, confirmPassword, termsAgreement) {
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            this.showMessage('Please fill in all required fields.', 'error');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        if (password.length < 8) {
            this.showMessage('Password must be at least 8 characters long.', 'error');
            return false;
        }

        if (password !== confirmPassword) {
            this.showMessage('Passwords do not match.', 'error');
            return false;
        }

        if (!termsAgreement) {
            this.showMessage('You must agree to the Terms of Service and Privacy Policy.', 'error');
            return false;
        }

        return true;
    }

    /**
     * Validate password confirmation in real-time
     */
    validatePasswordConfirmation() {
        const password = jQuery('#register-password').val();
        const confirmPassword = jQuery('#register-confirm-password').val();
        const confirmField = jQuery('#register-confirm-password')[0];

        if (confirmPassword && password !== confirmPassword) {
            confirmField.setCustomValidity('Passwords do not match');
            confirmField.style.borderColor = '#dc3545';
        } else {
            confirmField.setCustomValidity('');
            confirmField.style.borderColor = '';
        }
    }

    /**
     * Validate email format
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Show loading state for forms
     */
    showLoadingState(form) {
        const button = jQuery(`#rsd-${form}-form button[type="submit"]`);
        button.prop('disabled', true);
        button.find('.btn-text').hide();
        button.find('.btn-loading').show();
    }

    /**
     * Hide loading state for forms
     */
    hideLoadingState(form) {
        const button = jQuery(`#rsd-${form}-form button[type="submit"]`);
        button.prop('disabled', false);
        button.find('.btn-text').show();
        button.find('.btn-loading').hide();
    }

    /**
     * Hide all loading states
     */
    hideLoadingStates() {
        this.hideLoadingState('login');
        this.hideLoadingState('register');
    }

    /**
     * Show message to user
     */
    showMessage(message, type = 'info') {
        const messageDiv = jQuery('#rsd-auth-message');
        messageDiv.removeClass('success error info warning');
        messageDiv.addClass(type);
        messageDiv.text(message);
        messageDiv.fadeIn(300);
    }

    /**
     * Hide message
     */
    hideMessage() {
        jQuery('#rsd-auth-message').fadeOut(300);
    }

    /**
     * Check if user is authenticated before accessing RSD Emergency Center
     */
    requireAuthentication(callback) {
        if (this.isAuthenticated) {
            callback();
        } else {
            this.showAuthModal();
        }
    }

    /**
     * Called when authentication is successful
     */
    onAuthenticationSuccess() {
        // Update UI to show authenticated state
        this.updateAuthenticatedUI();
        
        // Initialize user-specific data
        this.initializeUserData();
        
        // Enable RSD Emergency Center
        this.enableRSDEmergencyCenter();
    }

    /**
     * Update UI for authenticated users
     */
    updateAuthenticatedUI() {
        if (this.currentUser) {
            // Add user greeting or profile info
            jQuery('.rsd-user-greeting').remove();
            
            const greeting = `
                <div class="rsd-user-greeting">
                    Welcome back, ${this.currentUser.first_name || this.currentUser.display_name}!
                </div>
            `;
            
            jQuery('.rsd-emergency-nav').prepend(greeting);
        }
    }

    /**
     * Initialize user-specific data
     */
    initializeUserData() {
        // Load user's saved preferences, crisis history, etc.
        this.loadUserPreferences();
        this.loadUserCrisisHistory();
        this.loadUserMoodData();
    }

    /**
     * Enable RSD Emergency Center for authenticated users
     */
    enableRSDEmergencyCenter() {
        // Remove any access restrictions
        jQuery('.rsd-access-restricted').removeClass('rsd-access-restricted');
        
        // Enable all emergency tools
        if (window.rsdManager) {
            window.rsdManager.enableAuthenticatedMode(this.currentUser);
        }
    }

    /**
     * Load user preferences
     */
    async loadUserPreferences() {
        try {
            const response = await fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'action=rsd_get_user_preferences'
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.userPreferences = data.data.preferences;
                this.applyUserPreferences();
            }
        } catch (error) {
            console.error('Error loading user preferences:', error);
        }
    }

    /**
     * Load user crisis history
     */
    async loadUserCrisisHistory() {
        try {
            const response = await fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'action=rsd_get_user_crisis_history'
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.userCrisisHistory = data.data.history;
            }
        } catch (error) {
            console.error('Error loading user crisis history:', error);
        }
    }

    /**
     * Load user mood tracking data
     */
    async loadUserMoodData() {
        try {
            const response = await fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'action=rsd_get_user_mood_data'
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.userMoodData = data.data.mood_data;
            }
        } catch (error) {
            console.error('Error loading user mood data:', error);
        }
    }

    /**
     * Apply user preferences to the interface
     */
    applyUserPreferences() {
        if (this.userPreferences) {
            // Apply theme preferences, notification settings, etc.
            if (this.userPreferences.theme) {
                document.body.classList.add(`rsd-theme-${this.userPreferences.theme}`);
            }
            
            if (this.userPreferences.notifications === false) {
                // Disable notifications
            }
        }
    }

    /**
     * Save user data
     */
    async saveUserData(dataType, data) {
        try {
            const response = await fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `action=rsd_save_user_data&data_type=${dataType}&data=${encodeURIComponent(JSON.stringify(data))}`
            });
            
            const result = await response.json();
            return result.success;
        } catch (error) {
            console.error('Error saving user data:', error);
            return false;
        }
    }

    /**
     * Logout user
     */
    async logout() {
        try {
            const response = await fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'action=rsd_user_logout'
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.isAuthenticated = false;
                this.currentUser = null;
                this.onLogout();
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    /**
     * Called when user logs out
     */
    onLogout() {
        // Clear user-specific data
        this.userPreferences = null;
        this.userCrisisHistory = null;
        this.userMoodData = null;
        
        // Update UI
        jQuery('.rsd-user-greeting').remove();
        
        // Disable RSD Emergency Center
        this.disableRSDEmergencyCenter();
        
        // Refresh page or redirect
        window.location.reload();
    }

    /**
     * Disable RSD Emergency Center for non-authenticated users
     */
    disableRSDEmergencyCenter() {
        jQuery('.rsd-emergency-center').addClass('rsd-access-restricted');
    }
}

// Initialize authentication system when DOM and jQuery are ready
(function() {
    function initializeAuth() {
        if (typeof jQuery !== 'undefined' && !window.rsdAuth) {
            jQuery(document).ready(function($) {
                window.rsdAuth = new RSDAuthSystem();
            });
        } else if (!window.rsdAuth) {
            // jQuery not yet available, wait a bit and try again
            setTimeout(initializeAuth, 100);
        }
    }
    
    // Start initialization only once
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAuth);
    } else {
        initializeAuth();
    }
})();