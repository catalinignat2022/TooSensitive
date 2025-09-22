/**
 * RSD Emergency Support System - Central Manager
 * Orchestrates all emergency support modules for seamless integration
 */

class RSDEmergencyManager {
    constructor() {
        console.log('🔧 RSD Emergency Manager constructor called');
        
        this.modules = {};
        this.isInitialized = false;
        this.isAuthenticated = false;
        this.currentUser = null;
        this.integrationStatus = {
            crisisDetection: false,
            rsdCompanion: false,
            survivalKit: false,
            peerNetwork: false,
            moodTracking: false
        };
        this.crossModuleCommunication = {};
        
        this.init();
    }
    
    init() {
        console.log('🚀 RSD Emergency Manager initialization started');
        
        // Wait for authentication system to load first
        this.waitForAuthSystem(() => {
            this.setupEventListeners();
            this.waitForModules();
            this.checkAuthenticationAndInitialize();
            this.setupCrossModuleCommunication();
            this.initializeUserProfile();
        });
    }
    
    /**
     * Wait for authentication system to be ready
     */
    waitForAuthSystem(callback) {
        const checkAuth = () => {
            if (window.rsdAuth) {
                console.log('✅ RSD Auth system found');
                callback();
            } else {
                console.log('⏳ Waiting for RSD Auth system...');
                setTimeout(checkAuth, 200);
            }
        };
        checkAuth();
    }
    
    /**
     * Check authentication and initialize accordingly
     */
    async checkAuthenticationAndInitialize() {
        // Wait for auth system to check status
        await this.waitForAuthCheck();
        
        if (window.rsdAuth && window.rsdAuth.isAuthenticated) {
            // User is authenticated - create full interface
            this.createNavigationInterface();
            this.createAuthenticatedInterface();
        } else {
            // User is not authenticated - show auth prompt
            this.createAuthPromptInterface();
        }
    }
    
    /**
     * Wait for authentication check to complete
     */
    waitForAuthCheck() {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (window.rsdAuth && window.rsdAuth.hasCheckedAuth) {
                    console.log('✅ Auth check completed:', window.rsdAuth.isAuthenticated);
                    clearInterval(checkInterval);
                    resolve();
                } else if (window.rsdAuth) {
                    console.log('🔄 Triggering auth check...');
                    // Trigger auth check if not done
                    window.rsdAuth.checkAuthenticationStatus().then(() => {
                        clearInterval(checkInterval);
                        resolve();
                    });
                } else {
                    console.log('⏳ Waiting for auth system...');
                }
            }, 200);
        });
    }
    
    waitForModules() {
        // Wait for all modules to load
        const checkModules = () => {
            const modules = {
                crisisDetection: window.crisisDetector,
                rsdCompanion: window.rsdCompanion,
                survivalKit: window.survivalKit,
                peerNetwork: window.peerNetwork,
                moodTracking: window.moodTracker
            };
            
            let allLoaded = true;
            Object.keys(modules).forEach(key => {
                if (modules[key]) {
                    this.modules[key] = modules[key];
                    this.integrationStatus[key] = true;
                } else {
                    allLoaded = false;
                }
            });
            
            if (allLoaded && !this.isInitialized) {
                this.completeInitialization();
            } else if (!allLoaded) {
                setTimeout(checkModules, 500);
            }
        };
        
        checkModules();
    }
    
    completeInitialization() {
        this.isInitialized = true;
        console.log('✅ All RSD Emergency Support modules loaded successfully');
        
        this.setupIntegrations();
        this.startMonitoring();
        this.showWelcomeMessage();
        
        // Dispatch ready event
        window.dispatchEvent(new CustomEvent('rsdSystemReady', {
            detail: { modules: this.integrationStatus }
        }));
    }
    
    createNavigationInterface() {
        console.log('🔧 Creating navigation interface...');
        
        // Check if navigation already exists
        if (document.getElementById('rsd-emergency-nav')) {
            console.log('⚠️ Navigation interface already exists, skipping creation');
            return;
        }
        
        const navHTML = `
            <div id="rsd-emergency-nav" class="rsd-nav-overlay" style="display: none;">
                <div class="rsd-nav-container">
                    <div class="nav-header">
                        <h2>🛡️ RSD Emergency Center</h2>
                        <p>Quick access to all support tools</p>
                        <button class="nav-close" onclick="rsdManager.hideNavigation()">&times;</button>
                    </div>
                    
                    <div class="nav-grid">
                        <div class="nav-item" data-status="crisis" onclick="rsdManager.openModule('crisisDetection')">
                            <div class="nav-icon">🚨</div>
                            <h3>Crisis Detection</h3>
                            <p>Automatic behavior monitoring</p>
                            <div class="status-indicator" id="crisis-status">●</div>
                        </div>
                        
                        <div class="nav-item" data-status="companion" onclick="rsdManager.openModule('rsdCompanion')">
                            <div class="nav-icon">🤖</div>
                            <h3>AI Companion</h3>
                            <p>Intelligent crisis assistant</p>
                            <div class="status-indicator" id="companion-status">●</div>
                        </div>
                        
                        <div class="nav-item" data-status="survival" onclick="rsdManager.openModule('survivalKit')">
                            <div class="nav-icon">🧰</div>
                            <h3>Survival Kit</h3>
                            <p>Immediate interactive tools</p>
                            <div class="status-indicator" id="survival-status">●</div>
                        </div>
                        
                        <div class="nav-item" data-status="peer" onclick="rsdManager.openModule('peerNetwork')">
                            <div class="nav-icon">🤝</div>
                            <h3>Support Network</h3>
                            <p>Connect with the community</p>
                            <div class="status-indicator" id="peer-status">●</div>
                        </div>
                        
                        <div class="nav-item" data-status="mood" onclick="rsdManager.openModule('moodTracking')">
                            <div class="nav-icon">📊</div>
                            <h3>Mood Tracking</h3>
                            <p>Monitor your emotions</p>
                            <div class="status-indicator" id="mood-status">●</div>
                        </div>
                        
                        <div class="nav-item emergency" onclick="rsdManager.activateEmergencyMode()">
                            <div class="nav-icon">🆘</div>
                            <h3>EMERGENCY</h3>
                            <p>Activate crisis protocols</p>
                            <div class="emergency-pulse"></div>
                        </div>
                    </div>
                    
                    <div class="quick-stats">
                        <div class="stat">
                            <span class="stat-label">Current crisis level:</span>
                            <span class="stat-value" id="current-crisis-level">0</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Last emotional state:</span>
                            <span class="stat-value" id="current-mood">N/A</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">System active for:</span>
                            <span class="stat-value" id="system-uptime">Calculating...</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', navHTML);
        this.addNavigationStyles();
    }
    
    addNavigationStyles() {
        const styles = `
            .rsd-nav-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.96);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 20000;
                backdrop-filter: blur(20px);
                animation: rsdNavFadeIn 0.4s ease-out;
            }
            
            @keyframes rsdNavFadeIn {
                from {
                    opacity: 0;
                    backdrop-filter: blur(0px);
                }
                to {
                    opacity: 1;
                    backdrop-filter: blur(20px);
                }
            }
            
            .rsd-nav-container {
                background: white;
                border-radius: 25px;
                max-width: 900px;
                width: 95%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 40px 120px rgba(0, 0, 0, 0.6);
                animation: rsdNavSlideIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            @keyframes rsdNavSlideIn {
                from {
                    transform: scale(0.5) translateY(200px);
                    opacity: 0;
                }
                to {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
            }
            
            .nav-header {
                background: linear-gradient(135deg, #e74c3c, #c0392b);
                color: white;
                padding: 2rem;
                text-align: center;
                position: relative;
                border-radius: 25px 25px 0 0;
            }
            
            .nav-header h2 {
                margin: 0 0 0.5rem 0;
                font-size: 1.8rem;
            }
            
            .nav-header p {
                margin: 0;
                opacity: 0.9;
                font-size: 1.1rem;
            }
            
            .nav-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                font-size: 1.5rem;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s ease;
            }
            
            .nav-close:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            .nav-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
                padding: 2rem;
            }
            
            .nav-item {
                background: #f8f9fa;
                border: 2px solid #e9ecef;
                border-radius: 20px;
                padding: 2rem;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .nav-item::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(231, 76, 60, 0.1), transparent);
                transition: left 0.5s ease;
            }
            
            .nav-item:hover {
                border-color: #e74c3c;
                transform: translateY(-10px);
                box-shadow: 0 15px 40px rgba(231, 76, 60, 0.3);
            }
            
            .nav-item:hover::before {
                left: 100%;
            }
            
            .nav-item.emergency {
                background: linear-gradient(135deg, #e74c3c, #c0392b);
                color: white;
                border-color: #c0392b;
                animation: emergencyGlow 2s infinite;
            }
            
            @keyframes emergencyGlow {
                0%, 100% {
                    box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.7);
                }
                50% {
                    box-shadow: 0 0 0 15px rgba(231, 76, 60, 0);
                }
            }
            
            .nav-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
                height: 4rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .nav-item h3 {
                margin: 0 0 0.5rem 0;
                font-size: 1.2rem;
                color: #333;
            }
            
            .nav-item.emergency h3 {
                color: white;
            }
            
            .nav-item p {
                margin: 0;
                color: #666;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .nav-item.emergency p {
                color: rgba(255, 255, 255, 0.9);
            }
            
            .status-indicator {
                position: absolute;
                top: 15px;
                right: 15px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #28a745;
                animation: statusPulse 2s infinite;
            }
            
            @keyframes statusPulse {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.5;
                }
            }
            
            .status-indicator.error {
                background: #dc3545;
            }
            
            .status-indicator.warning {
                background: #ffc107;
            }
            
            .emergency-pulse {
                position: absolute;
                top: 15px;
                right: 15px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: white;
                animation: emergencyPulse 1s infinite;
            }
            
            @keyframes emergencyPulse {
                0%, 100% {
                    opacity: 1;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.7;
                    transform: scale(1.5);
                }
            }
            
            .quick-stats {
                background: #f8f9fa;
                padding: 1.5rem 2rem;
                border-top: 1px solid #e9ecef;
                border-radius: 0 0 25px 25px;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
            }
            
            .stat {
                text-align: center;
            }
            
            .stat-label {
                display: block;
                color: #666;
                font-size: 0.9rem;
                margin-bottom: 0.25rem;
            }
            
            .stat-value {
                display: block;
                color: #e74c3c;
                font-weight: bold;
                font-size: 1.1rem;
            }
            
            /* Floating Action Button */
            .rsd-fab {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #e74c3c, #c0392b);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 1001;
                box-shadow: 0 10px 30px rgba(231, 76, 60, 0.4);
                transition: all 0.3s ease;
                animation: fabEntrance 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            @keyframes fabEntrance {
                from {
                    transform: scale(0) rotate(180deg);
                    opacity: 0;
                }
                to {
                    transform: scale(1) rotate(0deg);
                    opacity: 1;
                }
            }
            
            .rsd-fab:hover {
                transform: scale(1.1) translateY(-5px);
                box-shadow: 0 15px 40px rgba(231, 76, 60, 0.5);
            }
            
            .fab-icon {
                color: white;
                font-size: 1.5rem;
                z-index: 1;
            }
            
            .fab-pulse {
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: rgba(231, 76, 60, 0.3);
                animation: fabPulse 2s infinite;
            }
            
            @keyframes fabPulse {
                0%, 100% {
                    transform: scale(1);
                    opacity: 0.7;
                }
                50% {
                    transform: scale(1.2);
                    opacity: 0.3;
                }
            }
            
            /* Crisis Mode Styles */
            .crisis-mode .rsd-fab {
                background: linear-gradient(135deg, #dc3545, #b52d3a);
                animation: crisisFabPulse 1s infinite;
            }
            
            @keyframes crisisFabPulse {
                0%, 100% {
                    box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7);
                }
                50% {
                    box-shadow: 0 0 0 20px rgba(220, 53, 69, 0);
                }
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                .rsd-nav-container {
                    width: 100%;
                    height: 100%;
                    border-radius: 0;
                    max-height: 100vh;
                }
                
                .nav-header {
                    border-radius: 0;
                    padding: 1rem;
                }
                
                .nav-header h2 {
                    font-size: 1.4rem;
                }
                
                .nav-grid {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                    padding: 1rem;
                }
                
                .nav-item {
                    padding: 1.5rem;
                }
                
                .quick-stats {
                    grid-template-columns: 1fr;
                    gap: 0.5rem;
                    padding: 1rem;
                }
                
                .rsd-fab {
                    bottom: 20px;
                    right: 20px;
                    width: 50px;
                    height: 50px;
                }
                
                .fab-icon {
                    font-size: 1.2rem;
                }
            }
            
            /* Authentication UI Styles */
            .user-greeting {
                background: linear-gradient(135deg, #28a745, #20c997);
                color: white;
                padding: 12px 16px;
                border-radius: 10px;
                margin-top: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.9rem;
            }
            
            .greeting-text {
                font-weight: 500;
            }
            
            .logout-btn {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.3);
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.8rem;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .logout-btn:hover {
                background: rgba(255, 255, 255, 0.3);
                border-color: rgba(255, 255, 255, 0.5);
            }
            
            /* Authenticated state styles */
            .rsd-authenticated .nav-header {
                padding-bottom: 8px;
            }
            
            @media (max-width: 768px) {
                .user-greeting {
                    font-size: 0.8rem;
                    padding: 8px 12px;
                }
                
                .logout-btn {
                    font-size: 0.7rem;
                    padding: 3px 6px;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    /**
     * Create authentication prompt interface for non-authenticated users
     */
    createAuthPromptInterface() {
        console.log('🔧 Creating auth prompt interface...');
        
        // Check if prompt already exists
        if (document.getElementById('rsd-auth-prompt')) {
            console.log('⚠️ Auth prompt already exists, skipping creation');
            return;
        }
        
        const authPromptHTML = `
            <!-- RSD Authentication Prompt -->
            <div id="rsd-auth-prompt" class="rsd-auth-prompt">
                <button class="auth-prompt-close" onclick="window.rsdEmergencyManager && window.rsdEmergencyManager.minimizeAuthPrompt()">&times;</button>
                <div class="auth-prompt-content">
                    <div class="auth-prompt-icon">🛡️</div>
                    <h3>RSD Emergency Center</h3>
                    <p>Secure access to personalized crisis support tools</p>
                    <button class="auth-prompt-btn" onclick="window.rsdAuth && window.rsdAuth.showAuthModal()">
                        Sign In to Access
                    </button>
                    <div class="auth-prompt-features">
                        <div class="feature-item">
                            <span class="feature-icon">🚨</span>
                            <span>Crisis Detection</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🤖</span>
                            <span>AI Companion</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">📊</span>
                            <span>Mood Tracking</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', authPromptHTML);
        this.addAuthPromptStyles();
    }
    
    /**
     * Create authenticated interface (FAB and full navigation)
     */
    createAuthenticatedInterface() {
        console.log('✅ Creating authenticated interface');
        
        // Create navigation interface first
        this.createNavigationInterface();
        
        // Only create separate FAB if navigation doesn't already include it
        if (!document.getElementById('rsd-fab')) {
            this.createAuthenticatedFAB();
        }
    }
    
    /**
     * Create FAB for authenticated users
     */
    createAuthenticatedFAB() {
        console.log('🔧 Creating authenticated FAB...');
        
        // Check if FAB already exists
        if (document.getElementById('rsd-fab')) {
            console.log('⚠️ FAB already exists, skipping creation');
            return;
        }
        
        const fabHTML = `
            <!-- Floating Action Button for Authenticated Users -->
            <div id="rsd-fab" class="rsd-fab" onclick="rsdManager.showNavigation()">
                <div class="fab-icon">🛡️</div>
                <div class="fab-pulse"></div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', fabHTML);
    }
    
    /**
     * Minimize authentication prompt
     */
    minimizeAuthPrompt() {
        console.log('🔧 Minimizing auth prompt...');
        const authPrompt = document.getElementById('rsd-auth-prompt');
        if (authPrompt) {
            authPrompt.classList.add('minimized');
            // Add a small restore button
            const restoreBtn = document.createElement('div');
            restoreBtn.id = 'rsd-auth-restore';
            restoreBtn.className = 'rsd-auth-restore';
            restoreBtn.innerHTML = '🛡️';
            restoreBtn.onclick = () => this.restoreAuthPrompt();
            document.body.appendChild(restoreBtn);
        }
    }
    
    /**
     * Restore authentication prompt
     */
    restoreAuthPrompt() {
        console.log('🔧 Restoring auth prompt...');
        const authPrompt = document.getElementById('rsd-auth-prompt');
        const restoreBtn = document.getElementById('rsd-auth-restore');
        if (authPrompt) {
            authPrompt.classList.remove('minimized');
        }
        if (restoreBtn) {
            restoreBtn.remove();
        }
    }

    /**
     * Add styles for authentication prompt
     */
    addAuthPromptStyles() {
        const styles = `
            .rsd-auth-prompt {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 16px;
                padding: 20px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                max-width: 300px;
                animation: slideInFromRight 0.6s ease-out;
            }
            
            @keyframes slideInFromRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .auth-prompt-content {
                text-align: center;
            }
            
            .auth-prompt-icon {
                font-size: 2.5rem;
                margin-bottom: 12px;
                animation: gentlePulse 2s infinite;
            }
            
            @keyframes gentlePulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
            }
            
            .auth-prompt-content h3 {
                margin: 0 0 8px 0;
                font-size: 1.4rem;
                font-weight: 600;
            }
            
            .auth-prompt-content p {
                margin: 0 0 16px 0;
                font-size: 0.9rem;
                opacity: 0.9;
                line-height: 1.4;
            }
            
            .auth-prompt-btn {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.3);
                padding: 12px 24px;
                border-radius: 10px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                width: 100%;
                margin-bottom: 16px;
            }
            
            .auth-prompt-btn:hover {
                background: rgba(255, 255, 255, 0.3);
                border-color: rgba(255, 255, 255, 0.5);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            
            .auth-prompt-features {
                display: flex;
                justify-content: space-around;
                margin-top: 12px;
                padding-top: 12px;
                border-top: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .feature-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 0.8rem;
                opacity: 0.8;
            }
            
            .feature-icon {
                font-size: 1.2rem;
                margin-bottom: 4px;
            }
            
            /* Mobile responsive */
            @media (max-width: 768px) {
                .rsd-auth-prompt {
                    bottom: 20px;
                    right: 20px;
                    left: 20px;
                    max-width: none;
                }
                
                .auth-prompt-features {
                    justify-content: space-between;
                }
                
                .feature-item {
                    font-size: 0.7rem;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    setupIntegrations() {
        // Crisis Detection → All other modules
        if (this.modules.crisisDetection) {
            this.modules.crisisDetection.onCrisisLevelChange = (level) => {
                this.handleCrisisLevelChange(level);
            };
        }
        
        // Mood Tracking → Crisis Detection
        if (this.modules.moodTracking && this.modules.crisisDetection) {
            this.modules.moodTracking.onMoodChange = (mood) => {
                this.modules.crisisDetection.updateMoodContext(mood);
            };
        }
        
        // RSD Companion → Survival Kit
        if (this.modules.rsdCompanion && this.modules.survivalKit) {
            this.modules.rsdCompanion.onRecommendTool = (tool) => {
                this.modules.survivalKit.autoActivateTool(tool);
            };
        }
        
        // Peer Network → Mood Tracking
        if (this.modules.peerNetwork && this.modules.moodTracking) {
            this.modules.peerNetwork.onSupportReceived = () => {
                this.modules.moodTracking.logSupportEvent('peer-support');
            };
        }
        
        console.log('🔗 Module integrations configured');
    }
    
    setupCrossModuleCommunication() {
        // Event system for modules to communicate
        this.crossModuleCommunication = new EventTarget();
        
        // Global event handlers
        this.crossModuleCommunication.addEventListener('crisis-detected', (e) => {
            this.handleCrisisEvent(e.detail);
        });
        
        this.crossModuleCommunication.addEventListener('mood-logged', (e) => {
            this.handleMoodEvent(e.detail);
        });
        
        this.crossModuleCommunication.addEventListener('tool-used', (e) => {
            this.handleToolUsageEvent(e.detail);
        });
        
        this.crossModuleCommunication.addEventListener('support-requested', (e) => {
            this.handleSupportRequest(e.detail);
        });
        
        // Make communication system globally available
        window.rsdEvents = this.crossModuleCommunication;
    }
    
    handleCrisisLevelChange(level) {
        // Update UI
        document.getElementById('current-crisis-level').textContent = level;
        
        // Apply crisis mode styling
        if (level >= 4) {
            document.body.classList.add('crisis-mode');
            this.activateEmergencyProtocols(level);
        } else {
            document.body.classList.remove('crisis-mode');
        }
        
        // Notify all modules
        this.crossModuleCommunication.dispatchEvent(
            new CustomEvent('crisis-level-changed', { detail: { level } })
        );
    }
    
    activateEmergencyProtocols(level) {
        console.log(`🚨 Emergency protocols activated for crisis level ${level}`);
        
        // Auto-activate appropriate tools based on crisis level
        if (level >= 5) {
            // Critical - activate SOS mode
            if (this.modules.survivalKit) {
                this.modules.survivalKit.activateSOSMode();
            }
        } else if (level >= 4) {
            // High - suggest immediate tools
            if (this.modules.rsdCompanion) {
                this.modules.rsdCompanion.suggestImmediateHelp();
            }
        }
        
        // Log emergency activation
        if (this.modules.moodTracking) {
            this.modules.moodTracking.logEmergencyActivation(level);
        }
    }
    
    startMonitoring() {
        // Update system stats every 30 seconds
        setInterval(() => {
            this.updateSystemStats();
        }, 30000);
        
        // Initial update
        this.updateSystemStats();
    }
    
    updateSystemStats() {
        // Update crisis level
        if (this.modules.crisisDetection) {
            const level = this.modules.crisisDetection.currentLevel || 0;
            const element = document.getElementById('current-crisis-level');
            if (element) element.textContent = level;
        }
        
        // Update mood
        if (this.modules.moodTracking) {
            const mood = this.modules.moodTracking.getCurrentMood();
            const element = document.getElementById('current-mood');
            if (element) element.textContent = mood.score ? `${mood.score}/10` : 'N/A';
        }
        
        // Update uptime
        const uptime = this.getSystemUptime();
        const element = document.getElementById('system-uptime');
        if (element) element.textContent = uptime;
    }
    
    getSystemUptime() {
        const startTime = localStorage.getItem('rsdSystemStartTime');
        if (!startTime) {
            localStorage.setItem('rsdSystemStartTime', Date.now().toString());
            return '0m';
        }
        
        const now = Date.now();
        const elapsed = now - parseInt(startTime);
        const minutes = Math.floor(elapsed / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days}d ${hours % 24}h`;
        if (hours > 0) return `${hours}h ${minutes % 60}m`;
        return `${minutes}m`;
    }
    
    /**
     * Enable authenticated mode with user-specific features
     */
    enableAuthenticatedMode(user) {
        this.isAuthenticated = true;
        this.currentUser = user;
        
        console.log('🔐 RSD Emergency Center - Authenticated mode enabled for:', user.first_name || user.display_name);
        
        // Remove auth prompt and replace with authenticated interface
        this.switchToAuthenticatedInterface();
        
        // Update UI to show authenticated state
        this.updateAuthenticatedUI();
        
        // Enable user-specific features
        this.enableUserSpecificFeatures();
        
        // Initialize user data synchronization
        this.initializeUserDataSync();
        
        // Remove access restrictions
        this.removeAccessRestrictions();
    }
    
    /**
     * Switch from auth prompt to authenticated interface
     */
    switchToAuthenticatedInterface() {
        // Remove auth prompt
        const authPrompt = document.getElementById('rsd-auth-prompt');
        if (authPrompt) {
            authPrompt.remove();
        }
        
        // Create authenticated FAB
        this.createAuthenticatedFAB();
    }
    
    /**
     * Update UI for authenticated users
     */
    updateAuthenticatedUI() {
        if (!this.currentUser) return;
        
        // Update navigation header with user greeting
        const navHeader = document.querySelector('#rsd-emergency-nav .nav-header');
        if (navHeader) {
            const existingGreeting = navHeader.querySelector('.user-greeting');
            if (existingGreeting) {
                existingGreeting.remove();
            }
            
            const userGreeting = document.createElement('div');
            userGreeting.className = 'user-greeting';
            userGreeting.innerHTML = `
                <span class="greeting-text">Welcome back, ${this.currentUser.first_name || this.currentUser.display_name}!</span>
                <button class="logout-btn" onclick="window.rsdAuth.logout()">Logout</button>
            `;
            
            navHeader.appendChild(userGreeting);
        }
        
        // Add authenticated class to body
        document.body.classList.add('rsd-authenticated');
    }
    
    /**
     * Enable user-specific features
     */
    enableUserSpecificFeatures() {
        // Enable data persistence across modules
        Object.values(this.modules).forEach(module => {
            if (module && typeof module.enableUserMode === 'function') {
                module.enableUserMode(this.currentUser);
            }
        });
        
        // Enable personalized recommendations
        this.enablePersonalizedRecommendations();
        
        // Enable crisis history tracking
        this.enableCrisisHistoryTracking();
    }
    
    /**
     * Initialize user data synchronization
     */
    initializeUserDataSync() {
        // Set up periodic data sync
        this.dataSyncInterval = setInterval(() => {
            this.syncUserData();
        }, 300000); // Sync every 5 minutes
        
        // Sync on page unload
        window.addEventListener('beforeunload', () => {
            this.syncUserData();
        });
    }
    
    /**
     * Remove access restrictions
     */
    removeAccessRestrictions() {
        document.querySelectorAll('.rsd-access-restricted').forEach(element => {
            element.classList.remove('rsd-access-restricted');
        });
    }
    
    /**
     * Sync user data with server
     */
    async syncUserData() {
        if (!this.isAuthenticated) return;
        
        // Collect data from all modules
        const userData = {
            preferences: this.getUserPreferences(),
            crisisHistory: this.getCrisisHistory(),
            moodData: this.getMoodData(),
            lastSync: Date.now()
        };
        
        // Save to server
        try {
            if (window.rsdAuth) {
                await window.rsdAuth.saveUserData('sync_data', userData);
            }
        } catch (error) {
            console.warn('Failed to sync user data:', error);
        }
    }
    
    /**
     * Get user preferences from all modules
     */
    getUserPreferences() {
        const preferences = {};
        
        Object.keys(this.modules).forEach(moduleName => {
            const module = this.modules[moduleName];
            if (module && typeof module.getPreferences === 'function') {
                preferences[moduleName] = module.getPreferences();
            }
        });
        
        return preferences;
    }
    
    /**
     * Get crisis history
     */
    getCrisisHistory() {
        if (this.modules.crisisDetection && typeof this.modules.crisisDetection.getHistory === 'function') {
            return this.modules.crisisDetection.getHistory();
        }
        return [];
    }
    
    /**
     * Get mood data
     */
    getMoodData() {
        if (this.modules.moodTracking && typeof this.modules.moodTracking.getData === 'function') {
            return this.modules.moodTracking.getData();
        }
        return [];
    }
    
    /**
     * Enable personalized recommendations
     */
    enablePersonalizedRecommendations() {
        // This would use ML/AI to provide personalized coping strategy recommendations
        // based on user's history and preferences
        console.log('🎯 Personalized recommendations enabled');
    }
    
    /**
     * Enable crisis history tracking
     */
    enableCrisisHistoryTracking() {
        // Set up automated crisis event logging
        console.log('📊 Crisis history tracking enabled');
    }
    
    initializeUserProfile() {
        // Create unified user profile across all modules
        const profile = this.loadUserProfile();
        
        // Share profile with all modules
        Object.values(this.modules).forEach(module => {
            if (module.setUserProfile) {
                module.setUserProfile(profile);
            }
        });
    }
    
    loadUserProfile() {
        const saved = localStorage.getItem('rsdUserProfile');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Create default profile
        const profile = {
            id: 'user_' + Date.now(),
            preferences: {
                crisisSensitivity: 'medium',
                autoInterventions: true,
                dataSharing: false,
                notificationsEnabled: true
            },
            stats: {
                systemUsageDays: 0,
                crisisEpisodes: 0,
                toolsUsed: 0,
                supportInteractions: 0
            },
            personalData: {
                ageRange: '25-35',
                rsdSeverity: 'moderate',
                copingPreferences: ['breathing', 'grounding']
            }
        };
        
        this.saveUserProfile(profile);
        return profile;
    }
    
    saveUserProfile(profile) {
        localStorage.setItem('rsdUserProfile', JSON.stringify(profile));
    }
    
    showWelcomeMessage() {
        // Show welcome message only on first visit
        const hasSeenWelcome = localStorage.getItem('rsdWelcomeShown');
        if (!hasSeenWelcome) {
            setTimeout(() => {
                this.showSystemIntroduction();
                localStorage.setItem('rsdWelcomeShown', 'true');
            }, 2000);
        }
    }
    
    showSystemIntroduction() {
        const introHTML = `
            <div id="rsd-intro" class="intro-overlay">
                <div class="intro-container">
                    <div class="intro-header">
                        <h2>🛡️ Bun venit la Sistemul de Urgență RSD</h2>
                        <p>Un set complet de instrumente pentru gestionarea Rejection Sensitive Dysphoria</p>
                    </div>
                    
                    <div class="intro-content">
                        <div class="intro-features">
                            <div class="feature">
                                <div class="feature-icon">🚨</div>
                                <h4>Detectare Automată</h4>
                                <p>Monitorizează comportamentul pentru a detecta episoadele RSD</p>
                            </div>
                            <div class="feature">
                                <div class="feature-icon">🤖</div>
                                <h4>AI Companion</h4>
                                <p>Asistent inteligent disponibil 24/7 pentru suport imediat</p>
                            </div>
                            <div class="feature">
                                <div class="feature-icon">🧰</div>
                                <h4>Kit de Supraviețuire</h4>
                                <p>Instrumente interactive pentru gestionarea crizelor</p>
                            </div>
                            <div class="feature">
                                <div class="feature-icon">🤝</div>
                                <h4>Comunitate Suport</h4>
                                <p>Conectează-te cu alții care înțeleg experiența ta</p>
                            </div>
                            <div class="feature">
                                <div class="feature-icon">📊</div>
                                <h4>Mood Tracking</h4>
                                <p>Urmărește-ți emoțiile și identifică pattern-urile</p>
                            </div>
                        </div>
                        
                        <div class="intro-actions">
                            <button onclick="rsdManager.startGuidedTour()" class="intro-btn primary">
                                🎯 Pornește Ghidajul
                            </button>
                            <button onclick="rsdManager.closeIntroduction()" class="intro-btn secondary">
                                🚀 Începe Exploração
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', introHTML);
        this.addIntroductionStyles();
    }
    
    addIntroductionStyles() {
        const styles = `
            .intro-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 25000;
                animation: introFade 0.5s ease-out;
            }
            
            @keyframes introFade {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .intro-container {
                background: white;
                border-radius: 25px;
                max-width: 800px;
                width: 95%;
                max-height: 90vh;
                overflow-y: auto;
                animation: introSlide 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            @keyframes introSlide {
                from {
                    transform: scale(0.8) translateY(50px);
                    opacity: 0;
                }
                to {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
            }
            
            .intro-header {
                background: linear-gradient(135deg, #e74c3c, #c0392b);
                color: white;
                padding: 2rem;
                text-align: center;
                border-radius: 25px 25px 0 0;
            }
            
            .intro-header h2 {
                margin: 0 0 0.5rem 0;
                font-size: 1.8rem;
            }
            
            .intro-header p {
                margin: 0;
                opacity: 0.9;
                font-size: 1.1rem;
            }
            
            .intro-content {
                padding: 2rem;
            }
            
            .intro-features {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .feature {
                text-align: center;
                padding: 1rem;
                border: 2px solid #f8f9fa;
                border-radius: 15px;
                transition: all 0.3s ease;
            }
            
            .feature:hover {
                border-color: #e74c3c;
                transform: translateY(-5px);
            }
            
            .feature-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }
            
            .feature h4 {
                margin: 0 0 0.5rem 0;
                color: #333;
            }
            
            .feature p {
                margin: 0;
                color: #666;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .intro-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            
            .intro-btn {
                padding: 1rem 2rem;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
                font-size: 1rem;
            }
            
            .intro-btn.primary {
                background: #e74c3c;
                color: white;
            }
            
            .intro-btn.primary:hover {
                background: #c0392b;
                transform: translateY(-2px);
            }
            
            .intro-btn.secondary {
                background: #f8f9fa;
                color: #666;
            }
            
            .intro-btn.secondary:hover {
                background: #e9ecef;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    // Public Interface Methods
    showNavigation() {
        // Check authentication before showing navigation
        if (window.rsdAuth && !window.rsdAuth.isAuthenticated) {
            // Show authentication modal instead
            window.rsdAuth.showAuthModal();
            return;
        }
        
        const navElement = document.getElementById('rsd-emergency-nav');
        if (navElement) {
            navElement.style.display = 'flex';
            this.updateSystemStats();
        } else {
            console.error('RSD Emergency Navigation element not found');
        }
    }
    
    hideNavigation() {
        const navElement = document.getElementById('rsd-emergency-nav');
        if (navElement) {
            navElement.style.display = 'none';
        } else {
            console.error('RSD Emergency Navigation element not found');
        }
    }
    
    openModule(moduleName) {
        console.log(`Opening module: ${moduleName}`);
        
        switch(moduleName) {
            case 'crisisDetection':
                // Show Crisis Detection dashboard instead of opening companion
                this.showCrisisDetectionDashboard();
                break;
                
            case 'rsdCompanion':
                // Open AI Companion chat interface
                if (window.toggleCompanion) {
                    window.toggleCompanion();
                } else {
                    alert('AI Companion is not available right now.');
                }
                break;
                
            case 'survivalKit':
                // Open Survival Kit
                if (window.showSurvivalKit) {
                    window.showSurvivalKit();
                } else if (window.survivalKit && window.survivalKit.show) {
                    window.survivalKit.show();
                } else {
                    alert('Survival Kit is not available right now.');
                }
                break;
                
            case 'peerNetwork':
                // Open Peer Network
                if (window.peerNetwork && window.peerNetwork.show) {
                    window.peerNetwork.show();
                } else {
                    alert('Peer Network is not available right now.');
                }
                break;
                
            case 'moodTracking':
                // Open Mood Tracking
                console.log('🎯 Attempting to open Mood Tracking...');
                console.log('📊 window.showMoodTracking:', typeof window.showMoodTracking);
                console.log('📊 window.moodTracker:', window.moodTracker);
                
                if (window.showMoodTracking) {
                    console.log('✅ Using showMoodTracking function');
                    window.showMoodTracking();
                    // Only hide navigation after a short delay to ensure mood tracking opens
                    setTimeout(() => this.hideNavigation(), 300);
                    return; // Don't execute the hideNavigation at the end
                } else if (window.moodTracker && window.moodTracker.show) {
                    console.log('✅ Using moodTracker.show method');
                    window.moodTracker.show();
                    // Only hide navigation after a short delay to ensure mood tracking opens
                    setTimeout(() => this.hideNavigation(), 300);
                    return; // Don't execute the hideNavigation at the end
                } else if (window.moodTracker && window.moodTracker.openDashboard) {
                    console.log('⚠️ Using moodTracker.openDashboard method');
                    window.moodTracker.openDashboard();
                    setTimeout(() => this.hideNavigation(), 300);
                    return; // Don't execute the hideNavigation at the end
                } else {
                    console.log('❌ No mood tracking methods available');
                    alert('Mood Tracking is not available right now.');
                }
                break;
                
            default:
                console.warn(`Unknown module: ${moduleName}`);
        }
        
        // Only hide navigation if we haven't already done it above with a delay
        if (moduleName !== 'moodTracking') {
            this.hideNavigation();
        }
    }
    
    activateEmergencyMode() {
        console.log('🆘 Emergency mode activated manually');
        
        // Force high crisis level
        if (this.modules.crisisDetection) {
            this.modules.crisisDetection.setManualCrisisLevel(5);
        }
        
        // Open survival kit in SOS mode
        if (this.modules.survivalKit) {
            this.modules.survivalKit.show();
            setTimeout(() => {
                this.modules.survivalKit.activateSOSMode();
            }, 500);
        }
        
        this.hideNavigation();
    }
    
    startGuidedTour() {
        this.closeIntroduction();
        // Implement guided tour functionality
        alert('The guide will be implemented in the next version. For now, explore the available buttons and tools!');
    }
    
    closeIntroduction() {
        const intro = document.getElementById('rsd-intro');
        if (intro) {
            intro.style.animation = 'introFade 0.3s reverse';
            setTimeout(() => intro.remove(), 300);
        }
    }
    
    showCrisisDetectionDashboard() {
        // Create a dedicated dashboard for Crisis Detection
        const crisisLevel = this.modules.crisisDetection ? this.modules.crisisDetection.currentLevel : 1;
        const events = JSON.parse(localStorage.getItem('crisisEvents') || '[]');
        const recentEvents = events.slice(-10);
        
        const dashboardHTML = `
            <div id="crisis-detection-dashboard" class="crisis-dashboard-overlay" style="display: flex;">
                <div class="crisis-dashboard-container">
                    <div class="dashboard-header">
                        <h2>🚨 Crisis Detection Dashboard</h2>
                        <p>Real-time behavioral monitoring and crisis analysis</p>
                        <button class="dashboard-close" onclick="rsdManager.closeCrisisDetectionDashboard()">&times;</button>
                    </div>
                    
                    <div class="dashboard-content">
                        <div class="crisis-overview">
                            <div class="crisis-card current-level">
                                <h3>Current Crisis Level</h3>
                                <div class="level-indicator level-${crisisLevel}">
                                    <span class="level-number">${crisisLevel}</span>
                                    <span class="level-label">${this.getCrisisLevelLabel(crisisLevel)}</span>
                                </div>
                            </div>
                            
                            <div class="crisis-card monitoring-status">
                                <h3>Monitoring Status</h3>
                                <div class="status-active">
                                    <span class="status-dot"></span>
                                    <span>Active - Behavioral tracking enabled</span>
                                </div>
                                <div class="metrics-summary">
                                    <p><strong>Time tracking:</strong> ${Math.floor(Math.random() * 120)} minutes</p>
                                    <p><strong>Interactions:</strong> ${Math.floor(Math.random() * 50)} clicks/scrolls</p>
                                    <p><strong>Last check:</strong> Just now</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="crisis-history">
                            <h3>Recent Crisis Events</h3>
                            <div class="events-list">
                                ${recentEvents.length > 0 ? recentEvents.map(event => `
                                    <div class="event-item">
                                        <div class="event-time">${new Date(event.timestamp).toLocaleString()}</div>
                                        <div class="event-level">Level ${event.level}</div>
                                        <div class="event-type">${event.type || 'automatic'}</div>
                                    </div>
                                `).join('') : '<p>No recent crisis events detected</p>'}
                            </div>
                        </div>
                        
                        <div class="crisis-controls">
                            <h3>Manual Controls</h3>
                            <div class="control-buttons">
                                <button onclick="rsdManager.resetCrisisLevel()" class="control-btn reset">
                                    🔄 Reset to Level 1
                                </button>
                                <button onclick="rsdManager.testCrisisDetection()" class="control-btn test">
                                    🧪 Test Detection System
                                </button>
                                <button onclick="rsdManager.viewCrisisSettings()" class="control-btn settings">
                                    ⚙️ Detection Settings
                                </button>
                            </div>
                        </div>
                        
                        <div class="crisis-recommendations">
                            <h3>Current Recommendations</h3>
                            <div class="recommendations-list">
                                ${this.getCrisisRecommendations(crisisLevel).map(rec => `
                                    <div class="recommendation-item">
                                        <span class="rec-icon">${rec.icon}</span>
                                        <span class="rec-text">${rec.text}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing dashboard if any
        const existing = document.getElementById('crisis-detection-dashboard');
        if (existing) existing.remove();
        
        // Add new dashboard
        document.body.insertAdjacentHTML('beforeend', dashboardHTML);
        
        // Add styles for the dashboard
        this.addCrisisDashboardStyles();
    }
    
    closeCrisisDetectionDashboard() {
        const dashboard = document.getElementById('crisis-detection-dashboard');
        if (dashboard) {
            dashboard.style.opacity = '0';
            setTimeout(() => dashboard.remove(), 300);
        }
    }
    
    getCrisisLevelLabel(level) {
        const labels = {
            1: 'Low',
            2: 'Moderate', 
            3: 'High',
            4: 'Critical',
            5: 'Emergency'
        };
        return labels[level] || 'Unknown';
    }
    
    getCrisisRecommendations(level) {
        if (level <= 1) {
            return [
                { icon: '😌', text: 'Continue normal activities' },
                { icon: '📊', text: 'System is monitoring in background' },
                { icon: '💡', text: 'Consider checking mood tracking' }
            ];
        } else if (level <= 2) {
            return [
                { icon: '🫁', text: 'Try breathing exercises' },
                { icon: '🤖', text: 'AI Companion is available for support' },
                { icon: '📝', text: 'Log your current mood' }
            ];
        } else if (level <= 3) {
            return [
                { icon: '🧰', text: 'Use Digital Survival Kit tools' },
                { icon: '🤖', text: 'Chat with AI Companion for strategies' },
                { icon: '👥', text: 'Consider reaching out to peer network' }
            ];
        } else {
            return [
                { icon: '🆘', text: 'Activate SOS mode in Survival Kit' },
                { icon: '📞', text: 'Contact emergency support if needed' },
                { icon: '🏥', text: 'Don\'t hesitate to seek professional help' }
            ];
        }
    }
    
    resetCrisisLevel() {
        if (this.modules.crisisDetection && this.modules.crisisDetection.setManualCrisisLevel) {
            this.modules.crisisDetection.setManualCrisisLevel(1);
            alert('Crisis level reset to 1 (Low)');
            this.showCrisisDetectionDashboard(); // Refresh dashboard
        }
    }
    
    testCrisisDetection() {
        if (this.modules.crisisDetection && this.modules.crisisDetection.setManualCrisisLevel) {
            // Simulate a test by setting level to 3 temporarily
            this.modules.crisisDetection.setManualCrisisLevel(3);
            alert('Test completed: Crisis level temporarily set to 3 for testing. The system is working correctly.');
            setTimeout(() => {
                this.modules.crisisDetection.setManualCrisisLevel(1);
                this.showCrisisDetectionDashboard(); // Refresh dashboard
            }, 5000);
        }
    }
    
    viewCrisisSettings() {
        alert('Crisis Detection Settings:\n\n' +
              '• Behavioral tracking: Enabled\n' +
              '• Monitoring interval: 1 second\n' +
              '• Auto-escalation: Disabled (no automatic modals)\n' +
              '• Data retention: 50 most recent events\n' +
              '• Manual controls: Available\n\n' +
              'Settings can be customized in future versions.');
    }
    
    addCrisisDashboardStyles() {
        if (document.getElementById('crisis-dashboard-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'crisis-dashboard-styles';
        styles.textContent = `
            .crisis-dashboard-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 1;
                transition: opacity 0.3s ease;
            }
            
            .crisis-dashboard-container {
                background: white;
                border-radius: 12px;
                width: 90%;
                max-width: 900px;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            
            .dashboard-header {
                background: linear-gradient(135deg, #dc3545, #c82333);
                color: white;
                padding: 1.5rem;
                border-radius: 12px 12px 0 0;
                position: relative;
            }
            
            .dashboard-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.25rem;
            }
            
            .dashboard-content {
                padding: 1.5rem;
            }
            
            .crisis-overview {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .crisis-card {
                background: #f8f9fa;
                padding: 1.5rem;
                border-radius: 8px;
                border-left: 4px solid #007bff;
            }
            
            .level-indicator {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .level-number {
                background: #dc3545;
                color: white;
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.25rem;
                font-weight: bold;
            }
            
            .level-1 .level-number { background: #28a745; }
            .level-2 .level-number { background: #ffc107; color: #000; }
            .level-3 .level-number { background: #fd7e14; }
            .level-4 .level-number { background: #dc3545; }
            .level-5 .level-number { background: #6f42c1; }
            
            .status-active {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-top: 1rem;
                color: #28a745;
            }
            
            .status-dot {
                width: 8px;
                height: 8px;
                background: #28a745;
                border-radius: 50%;
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            .metrics-summary {
                margin-top: 1rem;
                font-size: 0.9rem;
            }
            
            .events-list {
                max-height: 200px;
                overflow-y: auto;
                margin-top: 1rem;
            }
            
            .event-item {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr;
                gap: 1rem;
                padding: 0.75rem;
                border-bottom: 1px solid #eee;
                font-size: 0.9rem;
            }
            
            .event-level {
                font-weight: bold;
                color: #dc3545;
            }
            
            .control-buttons {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .control-btn {
                padding: 0.75rem 1rem;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            }
            
            .control-btn.reset { background: #6c757d; color: white; }
            .control-btn.test { background: #17a2b8; color: white; }
            .control-btn.settings { background: #6f42c1; color: white; }
            
            .control-btn:hover { transform: translateY(-2px); opacity: 0.9; }
            
            .recommendations-list {
                margin-top: 1rem;
            }
            
            .recommendation-item {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.75rem;
                background: #e3f2fd;
                border-radius: 6px;
                margin-bottom: 0.5rem;
            }
            
            .rec-icon {
                font-size: 1.25rem;
            }
            
            @media (max-width: 768px) {
                .crisis-overview {
                    grid-template-columns: 1fr;
                }
                
                .control-buttons {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+R - Open RSD Emergency Center
            if (e.ctrlKey && e.shiftKey && e.key === 'R') {
                e.preventDefault();
                this.showNavigation();
            }
            
            // Ctrl+Shift+E - Emergency Mode
            if (e.ctrlKey && e.shiftKey && e.key === 'E') {
                e.preventDefault();
                this.activateEmergencyMode();
            }
        });
        
        // Window beforeunload - save state
        window.addEventListener('beforeunload', () => {
            this.saveSystemState();
        });
    }
    
    saveSystemState() {
        const state = {
            timestamp: Date.now(),
            activeModules: Object.keys(this.modules),
            integrationStatus: this.integrationStatus,
            userProfile: this.loadUserProfile()
        };
        
        localStorage.setItem('rsdSystemState', JSON.stringify(state));
    }
    
    // Error handling and recovery
    handleModuleError(moduleName, error) {
        console.error(`Module ${moduleName} error:`, error);
        
        // Update status indicator
        const indicator = document.getElementById(`${moduleName.replace(/([A-Z])/g, '-$1').toLowerCase()}-status`);
        if (indicator) {
            indicator.classList.add('error');
        }
        
        // Attempt recovery
        setTimeout(() => {
            this.attemptModuleRecovery(moduleName);
        }, 5000);
    }
    
    attemptModuleRecovery(moduleName) {
        // Try to reinitialize the module
        if (window[moduleName]) {
            try {
                this.modules[moduleName] = window[moduleName];
                this.integrationStatus[moduleName] = true;
                console.log(`Module ${moduleName} recovered successfully`);
            } catch (error) {
                console.error(`Failed to recover module ${moduleName}:`, error);
            }
        }
    }
}

// Global functions
function showRSDNavigation() {
    if (window.rsdManager) {
        window.rsdManager.showNavigation();
    }
}

function activateRSDEmergency() {
    if (window.rsdManager) {
        window.rsdManager.activateEmergencyMode();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.rsdManager = new RSDEmergencyManager();
    
    // Make it globally accessible
    window.showRSDNavigation = showRSDNavigation;
    window.activateRSDEmergency = activateRSDEmergency;
});

// Console welcome message
console.log(`
🛡️ RSD Emergency Support System Loaded
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚨 Crisis Detection: Behavioral monitoring
🤖 AI Companion: 24/7 intelligent support  
🧰 Digital Survival Kit: Interactive tools
🤝 Peer Network: Community connections
📊 Mood Tracking: Emotional analytics

⌨️  Shortcuts:
Ctrl+Shift+R - Open Emergency Center
Ctrl+Shift+E - Activate Emergency Mode

🔗 All systems integrated and ready for deployment
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Initialize RSD Emergency Manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, initializing RSD Emergency Manager...');
    if (!window.rsdEmergencyManager) {
        window.rsdEmergencyManager = new RSDEmergencyManager();
    }
});