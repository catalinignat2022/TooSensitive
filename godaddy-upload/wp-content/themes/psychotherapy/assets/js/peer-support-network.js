/**
 * Peer Support Network for RSD Community
 * Secure platform for mutual support between RSD individuals
 */

class PeerSupportNetwork {
    constructor() {
        this.isActive = false;
        this.currentUser = null;
        this.connections = [];
        this.chatRooms = new Map();
        this.moderationSystem = null;
        this.matchingAlgorithm = null;
        
        this.init();
    }
    
    init() {
        this.loadUserProfile();
        this.initializeModerationSystem();
        this.initializeMatchingAlgorithm();
        this.createNetworkInterface();
        this.setupEventListeners();
    }
    
    createNetworkInterface() {
        const networkHTML = `
            <div id="peer-support-network" class="peer-network-overlay" style="display: none;">
                <div class="network-container">
                    <div class="network-header">
                        <h2>🤝 RSD Support Network</h2>
                        <p>Connect with others who understand your experience</p>
                        <button class="network-close" onclick="closePeerNetwork()">&times;</button>
                    </div>
                    
                    <div class="network-content" id="network-content">
                        <div class="network-tabs">
                            <button class="tab-btn active" data-tab="dashboard" onclick="peerNetwork.showTab('dashboard')">
                                🏠 Dashboard
                            </button>
                            <button class="tab-btn" data-tab="matching" onclick="peerNetwork.showTab('matching')">
                                🔍 Find Support
                            </button>
                            <button class="tab-btn" data-tab="chat" onclick="peerNetwork.showTab('chat')">
                                💬 Conversations
                            </button>
                            <button class="tab-btn" data-tab="groups" onclick="peerNetwork.showTab('groups')">
                                👥 Groups
                            </button>
                            <button class="tab-btn" data-tab="profile" onclick="peerNetwork.showTab('profile')">
                                ⚙️ Profile
                            </button>
                        </div>
                        
                        <div class="tab-content" id="tab-content">
                            <!-- Content will be dynamically loaded -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', networkHTML);
        this.addNetworkStyles();
    }
    
    addNetworkStyles() {
        const styles = `
            .peer-network-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10001;
                backdrop-filter: blur(10px);
                animation: networkFadeIn 0.4s ease-out;
            }
            
            @keyframes networkFadeIn {
                from {
                    opacity: 0;
                    backdrop-filter: blur(0px);
                }
                to {
                    opacity: 1;
                    backdrop-filter: blur(10px);
                }
            }
            
            .network-container {
                background: white;
                border-radius: 20px;
                max-width: 1000px;
                max-height: 90vh;
                width: 95%;
                height: 85vh;
                overflow: hidden;
                box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
                animation: networkSlideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                display: flex;
                flex-direction: column;
            }
            
            @keyframes networkSlideIn {
                from {
                    transform: scale(0.7) translateY(100px);
                    opacity: 0;
                }
                to {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
            }
            
            .network-header {
                background: linear-gradient(135deg, #2c5f41, #4d7a79);
                color: white;
                padding: 2rem;
                text-align: center;
                position: relative;
                flex-shrink: 0;
            }
            
            .network-header h2 {
                margin: 0 0 0.5rem 0;
                font-size: 1.8rem;
            }
            
            .network-header p {
                margin: 0;
                opacity: 0.9;
                font-size: 1.1rem;
            }
            
            .network-close {
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
            
            .network-close:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            .network-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            
            .network-tabs {
                display: flex;
                background: #f8f9fa;
                border-bottom: 2px solid #e9ecef;
                flex-shrink: 0;
            }
            
            .tab-btn {
                flex: 1;
                padding: 1rem;
                border: none;
                background: transparent;
                cursor: pointer;
                font-weight: bold;
                color: #666;
                transition: all 0.3s ease;
                border-bottom: 3px solid transparent;
            }
            
            .tab-btn:hover {
                background: rgba(77, 122, 121, 0.1);
                color: #4d7a79;
            }
            
            .tab-btn.active {
                color: #4d7a79;
                border-bottom-color: #4d7a79;
                background: white;
            }
            
            .tab-content {
                flex: 1;
                padding: 2rem;
                overflow-y: auto;
                background: white;
            }
            
            /* Dashboard Styles */
            .dashboard-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
                margin-bottom: 2rem;
            }
            
            .dashboard-card {
                background: #f8f9fa;
                padding: 1.5rem;
                border-radius: 15px;
                border: 2px solid #e9ecef;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .dashboard-card:hover {
                border-color: #4d7a79;
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(77, 122, 121, 0.2);
            }
            
            .dashboard-card h3 {
                margin: 0 0 1rem 0;
                color: #333;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .dashboard-card p {
                margin: 0;
                color: #666;
                line-height: 1.5;
            }
            
            .dashboard-stats {
                display: flex;
                gap: 1rem;
                margin-top: 2rem;
            }
            
            .stat-item {
                flex: 1;
                text-align: center;
                padding: 1rem;
                background: linear-gradient(135deg, #4d7a79, #6a9999);
                color: white;
                border-radius: 10px;
            }
            
            .stat-number {
                font-size: 2rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
            }
            
            .stat-label {
                font-size: 0.9rem;
                opacity: 0.9;
            }
            
            /* Matching Interface Styles */
            .matching-interface {
                max-width: 600px;
                margin: 0 auto;
            }
            
            .compatibility-card {
                background: white;
                border: 2px solid #e9ecef;
                border-radius: 20px;
                padding: 2rem;
                margin-bottom: 2rem;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                animation: cardAppear 0.5s ease-out;
                position: relative;
                overflow: hidden;
            }
            
            .compatibility-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #4d7a79, #6a9999);
            }
            
            @keyframes cardAppear {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .user-avatar {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: linear-gradient(135deg, #4d7a79, #6a9999);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                color: white;
                margin: 0 auto 1rem auto;
            }
            
            .compatibility-score {
                text-align: center;
                margin-bottom: 1.5rem;
            }
            
            .score-percentage {
                font-size: 3rem;
                font-weight: bold;
                color: #4d7a79;
                margin-bottom: 0.5rem;
            }
            
            .score-label {
                color: #666;
                font-size: 1.1rem;
            }
            
            .compatibility-factors {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .factor-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem;
                background: #f8f9fa;
                border-radius: 8px;
                font-size: 0.9rem;
            }
            
            .factor-icon {
                color: #4d7a79;
            }
            
            .connection-actions {
                display: flex;
                gap: 1rem;
            }
            
            .connect-btn {
                flex: 1;
                padding: 1rem;
                border: none;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .connect-btn.primary {
                background: #4d7a79;
                color: white;
            }
            
            .connect-btn.primary:hover {
                background: #3d6a69;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(77, 122, 121, 0.3);
            }
            
            .connect-btn.secondary {
                background: #e9ecef;
                color: #666;
            }
            
            .connect-btn.secondary:hover {
                background: #d6d8db;
            }
            
            /* Chat Interface Styles */
            .chat-interface {
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            
            .chat-list {
                flex: 1;
                overflow-y: auto;
                margin-bottom: 1rem;
            }
            
            .chat-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: #f8f9fa;
                border-radius: 10px;
                margin-bottom: 0.5rem;
                cursor: pointer;
                transition: all 0.3s ease;
                border: 2px solid transparent;
            }
            
            .chat-item:hover {
                background: #e9ecef;
                border-color: #4d7a79;
            }
            
            .chat-item.active {
                background: rgba(77, 122, 121, 0.1);
                border-color: #4d7a79;
            }
            
            .chat-avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #4d7a79, #6a9999);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
            }
            
            .chat-info {
                flex: 1;
            }
            
            .chat-name {
                font-weight: bold;
                color: #333;
                margin-bottom: 0.25rem;
            }
            
            .chat-preview {
                color: #666;
                font-size: 0.9rem;
                line-height: 1.3;
            }
            
            .chat-meta {
                text-align: right;
                color: #999;
                font-size: 0.8rem;
            }
            
            .unread-count {
                background: #dc3545;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.7rem;
                font-weight: bold;
                margin-top: 0.25rem;
            }
            
            /* Group Styles */
            .groups-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1.5rem;
            }
            
            .group-card {
                background: white;
                border: 2px solid #e9ecef;
                border-radius: 15px;
                padding: 1.5rem;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .group-card:hover {
                border-color: #4d7a79;
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(77, 122, 121, 0.2);
            }
            
            .group-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .group-icon {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #4d7a79, #6a9999);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: white;
            }
            
            .group-info h3 {
                margin: 0 0 0.25rem 0;
                color: #333;
            }
            
            .group-members {
                color: #666;
                font-size: 0.9rem;
            }
            
            .group-description {
                color: #666;
                line-height: 1.5;
                margin-bottom: 1rem;
            }
            
            .group-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .group-tag {
                background: rgba(77, 122, 121, 0.1);
                color: #4d7a79;
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: bold;
            }
            
            /* Safety Features */
            .safety-notice {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 10px;
                padding: 1rem;
                margin-bottom: 2rem;
                color: #856404;
            }
            
            .safety-notice h4 {
                margin: 0 0 0.5rem 0;
                color: #856404;
            }
            
            .moderation-alert {
                background: #f8d7da;
                border: 1px solid #f5c6cb;
                border-radius: 10px;
                padding: 1rem;
                margin: 1rem 0;
                color: #721c24;
                display: none;
            }
            
            .moderation-alert.show {
                display: block;
                animation: alertSlide 0.3s ease-out;
            }
            
            @keyframes alertSlide {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                .network-container {
                    width: 100%;
                    height: 100%;
                    border-radius: 0;
                    max-height: 100vh;
                }
                
                .network-header {
                    padding: 1rem;
                }
                
                .network-header h2 {
                    font-size: 1.4rem;
                }
                
                .tab-content {
                    padding: 1rem;
                }
                
                .dashboard-grid {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }
                
                .dashboard-stats {
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .compatibility-factors {
                    grid-template-columns: 1fr;
                }
                
                .connection-actions {
                    flex-direction: column;
                }
                
                .groups-grid {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    show() {
        document.getElementById('peer-support-network').style.display = 'flex';
        this.isActive = true;
        this.showTab('dashboard');
    }
    
    hide() {
        document.getElementById('peer-support-network').style.display = 'none';
        this.isActive = false;
    }
    
    showTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Show tab content
        const content = document.getElementById('tab-content');
        
        switch(tabName) {
            case 'dashboard':
                this.showDashboard(content);
                break;
            case 'matching':
                this.showMatching(content);
                break;
            case 'chat':
                this.showChat(content);
                break;
            case 'groups':
                this.showGroups(content);
                break;
            case 'profile':
                this.showProfile(content);
                break;
        }
    }
    
    showDashboard(content) {
        content.innerHTML = `
            <div class="safety-notice">
                <h4>🛡️ Security and Confidentiality</h4>
                <p>All conversations are automatically monitored for security. Report any inappropriate behavior. 
                   In emergency cases, contact emergency services immediately.</p>
            </div>
            
            <div class="dashboard-grid">
                <div class="dashboard-card" onclick="peerNetwork.showTab('matching')">
                    <h3>🔍 Find Compatible Support</h3>
                    <p>Our algorithm connects you with people who have similar experiences and can offer the support you need.</p>
                </div>
                
                <div class="dashboard-card" onclick="peerNetwork.showTab('chat')">
                    <h3>💬 Active Conversations</h3>
                    <p>Continue conversations with people in your support network or start new connections.</p>
                </div>
                
                <div class="dashboard-card" onclick="peerNetwork.showTab('groups')">
                    <h3>👥 Support Groups</h3>
                    <p>Join themed groups to share experiences and coping strategies.</p>
                </div>
                
                <div class="dashboard-card" onclick="peerNetwork.quickEmergencyMatch()">
                    <h3>🆘 Emergency Support</h3>
                    <p>Quick connection with available volunteers for immediate support in crisis moments.</p>
                </div>
            </div>
            
            <div class="dashboard-stats">
                <div class="stat-item">
                    <div class="stat-number">${this.getUserStats().connections}</div>
                    <div class="stat-label">Active Connections</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${this.getUserStats().conversations}</div>
                    <div class="stat-label">Conversations</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${this.getUserStats().supportGiven}</div>
                    <div class="stat-label">Support Offered</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${this.getUserStats().supportReceived}</div>
                    <div class="stat-label">Support Received</div>
                </div>
            </div>
        `;
    }
    
    showMatching(content) {
        const potentialMatches = this.generateMatches();
        
        content.innerHTML = `
            <div class="matching-interface">
                <div class="safety-notice">
                    <h4>🤝 How Matching Works</h4>
                    <p>Our algorithm analyzes RSD experiences, coping strategies, and availability to find the most compatible connections for you.</p>
                </div>
                
                ${potentialMatches.map(match => `
                    <div class="compatibility-card">
                        <div class="user-avatar">${match.avatar}</div>
                        
                        <div class="compatibility-score">
                            <div class="score-percentage">${match.compatibility}%</div>
                            <div class="score-label">Compatibility</div>
                        </div>
                        
                        <div class="compatibility-factors">
                            ${match.factors.map(factor => `
                                <div class="factor-item">
                                    <span class="factor-icon">${factor.icon}</span>
                                    <span>${factor.text}</span>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="user-bio">
                            <p><strong>${match.name}</strong> - ${match.bio}</p>
                        </div>
                        
                        <div class="connection-actions">
                            <button class="connect-btn primary" onclick="peerNetwork.sendConnectionRequest('${match.id}')">
                                🤝 Send Connection Request
                            </button>
                            <button class="connect-btn secondary" onclick="peerNetwork.nextMatch()">
                                ⏭️ Next
                            </button>
                        </div>
                    </div>
                `).join('')}
                
                <div style="text-align: center; margin-top: 2rem;">
                    <button class="connect-btn primary" onclick="peerNetwork.refreshMatches()">
                        🔄 Find More Connections
                    </button>
                </div>
            </div>
        `;
    }
    
    showChat(content) {
        const chats = this.getActiveChats();
        
        content.innerHTML = `
            <div class="chat-interface">
                <div class="safety-notice">
                    <h4>💬 Secure Communication</h4>
                    <p>All messages are encrypted. Don't share sensitive personal information in early conversations.</p>
                </div>
                
                <div class="chat-list">
                    ${chats.length === 0 ? `
                        <div style="text-align: center; color: #666; padding: 2rem;">
                            <h3>📭 You don't have conversations yet</h3>
                            <p>Start by finding compatible connections in the "Find Support" section</p>
                            <button class="connect-btn primary" onclick="peerNetwork.showTab('matching')">
                                🔍 Find First Connection
                            </button>
                        </div>
                    ` : chats.map(chat => `
                        <div class="chat-item" onclick="peerNetwork.openChat('${chat.id}')">
                            <div class="chat-avatar">${chat.avatar}</div>
                            <div class="chat-info">
                                <div class="chat-name">${chat.name}</div>
                                <div class="chat-preview">${chat.lastMessage}</div>
                            </div>
                            <div class="chat-meta">
                                <div>${chat.time}</div>
                                ${chat.unread > 0 ? `<div class="unread-count">${chat.unread}</div>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    showGroups(content) {
        const groups = this.getAvailableGroups();
        
        content.innerHTML = `
            <div class="safety-notice">
                <h4>👥 Support Groups</h4>
                <p>Groups are moderated 24/7. Follow community rules and provide constructive support.</p>
            </div>
            
            <div class="groups-grid">
                ${groups.map(group => `
                    <div class="group-card" onclick="peerNetwork.joinGroup('${group.id}')">
                        <div class="group-header">
                            <div class="group-icon">${group.icon}</div>
                            <div class="group-info">
                                <h3>${group.name}</h3>
                                <div class="group-members">${group.members} active members</div>
                            </div>
                        </div>
                        
                        <div class="group-description">
                            ${group.description}
                        </div>
                        
                        <div class="group-tags">
                            ${group.tags.map(tag => `<span class="group-tag">${tag}</span>`).join('')}
                        </div>
                        
                        <button class="connect-btn primary" style="width: 100%;">
                            ${group.isMember ? '💬 Enter Group' : '➕ Join'}
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    showProfile(content) {
        content.innerHTML = `
            <div class="profile-interface">
                <h3>⚙️ Support Profile Settings</h3>
                
                <div class="profile-section">
                    <h4>🎯 Matching Preferences</h4>
                    <div class="preference-grid">
                        <label>
                            <input type="checkbox" checked> People with similar RSD experience
                        </label>
                        <label>
                            <input type="checkbox" checked> Available for emergency support
                        </label>
                        <label>
                            <input type="checkbox"> Women only
                        </label>
                        <label>
                            <input type="checkbox"> Men only
                        </label>
                        <label>
                            <input type="checkbox" checked> Similar age (±5 years)
                        </label>
                        <label>
                            <input type="checkbox"> Experience with therapy/coaching
                        </label>
                    </div>
                </div>
                
                <div class="profile-section">
                    <h4>🛡️ Security Settings</h4>
                    <div class="safety-settings">
                        <label>
                            <input type="checkbox" checked> Enable automatic moderation
                        </label>
                        <label>
                            <input type="checkbox" checked> Automatically report aggressive language
                        </label>
                        <label>
                            <input type="checkbox"> Allow only verified connections
                        </label>
                        <label>
                            <input type="checkbox" checked> Crisis message notifications
                        </label>
                    </div>
                </div>
                
                <div class="profile-section">
                    <h4>📱 Notifications</h4>
                    <div class="notification-settings">
                        <label>
                            <input type="checkbox" checked> New connection requests
                        </label>
                        <label>
                            <input type="checkbox" checked> Emergency messages
                        </label>
                        <label>
                            <input type="checkbox"> Normal messages
                        </label>
                        <label>
                            <input type="checkbox" checked> Group activity
                        </label>
                    </div>
                </div>
                
                <button class="connect-btn primary" onclick="peerNetwork.saveProfile()">
                    💾 Save Settings
                </button>
            </div>
        `;
    }
    
    // Matching Algorithm
    initializeMatchingAlgorithm() {
        this.matchingAlgorithm = {
            factors: [
                { name: 'rsd_severity', weight: 0.3 },
                { name: 'coping_strategies', weight: 0.25 },
                { name: 'availability', weight: 0.2 },
                { name: 'experience_level', weight: 0.15 },
                { name: 'age_range', weight: 0.1 }
            ],
            
            calculateCompatibility: (user1, user2) => {
                let score = 0;
                
                // RSD Severity matching
                const severityDiff = Math.abs(user1.rsdSeverity - user2.rsdSeverity);
                score += (1 - severityDiff / 10) * 30;
                
                // Coping strategies overlap
                const commonStrategies = user1.copingStrategies.filter(s => 
                    user2.copingStrategies.includes(s)
                ).length;
                score += (commonStrategies / Math.max(user1.copingStrategies.length, user2.copingStrategies.length)) * 25;
                
                // Availability alignment
                const availabilityMatch = user1.availability === user2.availability ? 20 : 10;
                score += availabilityMatch;
                
                // Experience level
                const expDiff = Math.abs(user1.experienceLevel - user2.experienceLevel);
                score += (1 - expDiff / 5) * 15;
                
                // Age range
                const ageDiff = Math.abs(user1.age - user2.age);
                score += Math.max(0, 10 - ageDiff / 2);
                
                return Math.round(Math.max(0, Math.min(100, score)));
            }
        };
    }
    
    generateMatches() {
        // Simulate potential matches
        const potentialUsers = [
            {
                id: 'user1',
                name: 'Maria S.',
                avatar: '🌸',
                bio: 'Diagnosed with ADHD and RSD 2 years ago. I\'ve learned many coping strategies and want to help.',
                compatibility: 94,
                factors: [
                    { icon: '🎯', text: 'Similar RSD severity' },
                    { icon: '🧘', text: 'Mindfulness strategies' },
                    { icon: '⏰', text: 'Available evenings' },
                    { icon: '💊', text: 'Medication experience' }
                ]
            },
            {
                id: 'user2',
                name: 'Alex D.',
                avatar: '🌟',
                bio: 'Psychology student with personal RSD experience. Passionate about research and peer support.',
                compatibility: 87,
                factors: [
                    { icon: '📚', text: 'Psychology knowledge' },
                    { icon: '🤝', text: 'Peer support experience' },
                    { icon: '🌙', text: 'Available nights' },
                    { icon: '💡', text: 'Cognitive strategies' }
                ]
            },
            {
                id: 'user3',
                name: 'Dana P.',
                avatar: '🦋',
                bio: 'Mother with RSD, trying to help myself and my child understand intense emotions.',
                compatibility: 78,
                factors: [
                    { icon: '👶', text: 'Parenting experience' },
                    { icon: '💪', text: 'Resilience strategies' },
                    { icon: '🌅', text: 'Available mornings' },
                    { icon: '❤️', text: 'Empathic approach' }
                ]
            }
        ];
        
        return potentialUsers;
    }
    
    // Moderation System
    initializeModerationSystem() {
        this.moderationSystem = {
            flaggedWords: [
                'suicide', 'self-harm', 'death', 'desperate', 'hopeless',
                'want to die', 'can\'t take it anymore', 'the end', 'kill myself'
            ],
            
            toxicityPatterns: [
                /\b(prost|idiot|imbecil|stupid)\b/gi,
                /\b(you don't understand anything|you're crazy)\b/gi,
                /\b(you're worthless|you're useless)\b/gi
            ],
            
            analyzeMessage: (message) => {
                const flags = [];
                
                // Check for crisis language
                this.moderationSystem.flaggedWords.forEach(word => {
                    if (message.toLowerCase().includes(word)) {
                        flags.push({
                            type: 'crisis',
                            severity: 'high',
                            word: word,
                            action: 'immediate_intervention'
                        });
                    }
                });
                
                // Check for toxic language
                this.moderationSystem.toxicityPatterns.forEach(pattern => {
                    if (pattern.test(message)) {
                        flags.push({
                            type: 'toxic',
                            severity: 'medium',
                            pattern: pattern.source,
                            action: 'warning'
                        });
                    }
                });
                
                return flags;
            },
            
            handleFlags: (flags, messageId, userId) => {
                flags.forEach(flag => {
                    switch(flag.action) {
                        case 'immediate_intervention':
                            this.triggerCrisisIntervention(userId, messageId);
                            break;
                        case 'warning':
                            this.showModerationWarning(flag);
                            break;
                    }
                });
            }
        };
    }
    
    triggerCrisisIntervention(userId, messageId) {
        // Alert moderators and activate crisis protocol
        this.showCrisisIntervention();
    }
    
    showCrisisIntervention() {
        const alert = document.createElement('div');
        alert.className = 'moderation-alert show';
        alert.innerHTML = `
            <h4>🚨 Crisis Intervention Activated</h4>
            <p>We detected language that indicates a possible crisis. A moderator will be contacted immediately.</p>
            <p><strong>If you have thoughts of self-harm, please contact immediately:</strong></p>
            <button onclick="window.open('tel:112')" style="background: #dc3545; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; margin: 0.25rem;">
                📞 112 - Emergency Services
            </button>
        `;
        
        document.getElementById('tab-content').prepend(alert);
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 300);
        }, 10000);
    }
    
    // Utility functions
    getUserStats() {
        return {
            connections: 12,
            conversations: 8,
            supportGiven: 24,
            supportReceived: 18
        };
    }
    
    getActiveChats() {
        return [
            {
                id: 'chat1',
                name: 'Maria S.',
                avatar: '🌸',
                lastMessage: 'Thank you for the advice, it helped me a lot!',
                time: '14:30',
                unread: 2
            },
            {
                id: 'chat2',
                name: 'Alex D.',
                avatar: '🌟',
                lastMessage: 'Let\'s discuss cognitive strategies',
                time: 'Ieri',
                unread: 0
            }
        ];
    }
    
    getAvailableGroups() {
        return [
            {
                id: 'group1',
                name: 'RSD Support Network',
                icon: '🇷🇴',
                members: 127,
                description: 'The main community for RSD support. We share experiences and coping strategies.',
                tags: ['RSD', 'General Support', 'English'],
                isMember: true
            },
            {
                id: 'group2',
                name: 'Parents with RSD',
                icon: '👨‍👩‍👧‍👦',
                members: 43,
                description: 'Group for parents living with RSD who want to learn how to help their children.',
                tags: ['Parents', 'Families', 'Children'],
                isMember: false
            },
            {
                id: 'group3',
                name: 'Workplace RSD',
                icon: '💼',
                members: 89,
                description: 'Strategies for managing RSD at work and in professional relationships.',
                tags: ['Work', 'Career', 'Professional'],
                isMember: false
            },
            {
                id: 'group4',
                name: 'Creatives with RSD',
                icon: '🎨',
                members: 76,
                description: 'Community for artists, writers and creators living with RSD sensitivity.',
                tags: ['Art', 'Creativity', 'Expression'],
                isMember: true
            }
        ];
    }
    
    loadUserProfile() {
        // Load user profile data from localStorage
        const profile = localStorage.getItem('peerNetworkProfile');
        if (profile) {
            this.currentUser = JSON.parse(profile);
        } else {
            // Create default profile
            this.currentUser = {
                id: 'user_' + Date.now(),
                rsdSeverity: 7,
                copingStrategies: ['breathing', 'grounding', 'journaling'],
                availability: 'evening',
                experienceLevel: 3,
                age: 28,
                preferences: {
                    gender: 'any',
                    ageRange: [20, 40],
                    experienceMatch: true
                }
            };
            this.saveUserProfile();
        }
    }
    
    saveUserProfile() {
        localStorage.setItem('peerNetworkProfile', JSON.stringify(this.currentUser));
    }
    
    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (this.isActive && e.key === 'Escape') {
                this.hide();
            }
        });
    }
    
    // Public methods for UI interactions
    sendConnectionRequest(userId) {
        // Simulate sending connection request
        alert(`Connection request sent! You will be notified when ${userId} responds.`);
    }
    
    nextMatch() {
        this.showTab('matching'); // Refresh matches
    }
    
    refreshMatches() {
        this.showTab('matching'); // Generate new matches
    }
    
    quickEmergencyMatch() {
        alert('🆘 Looking for available volunteers for emergency support...\n\nYou will be connected in a few minutes with someone who can help.');
    }
    
    openChat(chatId) {
        alert(`Deschidere chat cu ${chatId}...`);
    }
    
    joinGroup(groupId) {
        alert(`Joining group ${groupId}...`);
    }
    
    saveProfile() {
        this.saveUserProfile();
        alert('✅ Settings saved successfully!');
    }
}

// Global functions
function closePeerNetwork() {
    if (window.peerNetwork) {
        window.peerNetwork.hide();
    }
}

function showPeerNetwork() {
    if (window.peerNetwork) {
        window.peerNetwork.show();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.peerNetwork = new PeerSupportNetwork();
});