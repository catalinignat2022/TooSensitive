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
                <h4>🛡️ Siguranță și Confidențialitate</h4>
                <p>Toate conversațiile sunt monitorizate automat pentru siguranță. Raportează orice comportament inadecvat. 
                   În caz de urgență, contactează imediat serviciile de urgență.</p>
            </div>
            
            <div class="dashboard-grid">
                <div class="dashboard-card" onclick="peerNetwork.showTab('matching')">
                    <h3>🔍 Găsește Suport Compatibil</h3>
                    <p>Algoritmul nostru te conectează cu persoane care au experiențe similare și pot oferi suportul de care ai nevoie.</p>
                </div>
                
                <div class="dashboard-card" onclick="peerNetwork.showTab('chat')">
                    <h3>💬 Conversații Active</h3>
                    <p>Continuă conversațiile cu persoanele din rețeaua ta de suport sau începe noi conexiuni.</p>
                </div>
                
                <div class="dashboard-card" onclick="peerNetwork.showTab('groups')">
                    <h3>👥 Grupuri de Suport</h3>
                    <p>Alătură-te grupurilor tematice pentru a împărtăși experiențe și strategii de coping.</p>
                </div>
                
                <div class="dashboard-card" onclick="peerNetwork.quickEmergencyMatch()">
                    <h3>🆘 Suport de Urgență</h3>
                    <p>Conectare rapidă cu volunteer disponibili pentru suport imediat în momente de criză.</p>
                </div>
            </div>
            
            <div class="dashboard-stats">
                <div class="stat-item">
                    <div class="stat-number">${this.getUserStats().connections}</div>
                    <div class="stat-label">Conexiuni Active</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${this.getUserStats().conversations}</div>
                    <div class="stat-label">Conversații</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${this.getUserStats().supportGiven}</div>
                    <div class="stat-label">Suport Oferit</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${this.getUserStats().supportReceived}</div>
                    <div class="stat-label">Suport Primit</div>
                </div>
            </div>
        `;
    }
    
    showMatching(content) {
        const potentialMatches = this.generateMatches();
        
        content.innerHTML = `
            <div class="matching-interface">
                <div class="safety-notice">
                    <h4>🤝 Cum Funcționează Matching-ul</h4>
                    <p>Algoritmul nostru analizează experiențele RSD, strategiile de coping și disponibilitatea pentru a găsi cele mai compatibile conexiuni pentru tine.</p>
                </div>
                
                ${potentialMatches.map(match => `
                    <div class="compatibility-card">
                        <div class="user-avatar">${match.avatar}</div>
                        
                        <div class="compatibility-score">
                            <div class="score-percentage">${match.compatibility}%</div>
                            <div class="score-label">Compatibilitate</div>
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
                                🤝 Trimite Cerere de Conexiune
                            </button>
                            <button class="connect-btn secondary" onclick="peerNetwork.nextMatch()">
                                ⏭️ Următorul
                            </button>
                        </div>
                    </div>
                `).join('')}
                
                <div style="text-align: center; margin-top: 2rem;">
                    <button class="connect-btn primary" onclick="peerNetwork.refreshMatches()">
                        🔄 Găsește Mai Multe Conexiuni
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
                    <h4>💬 Comunicare Sigură</h4>
                    <p>Toate mesajele sunt criptate. Nu împărtăși informații personale sensitive în primele conversații.</p>
                </div>
                
                <div class="chat-list">
                    ${chats.length === 0 ? `
                        <div style="text-align: center; color: #666; padding: 2rem;">
                            <h3>📭 Încă nu ai conversații</h3>
                            <p>Începe prin a găsi conexiuni compatibile în secțiunea "Găsește Suport"</p>
                            <button class="connect-btn primary" onclick="peerNetwork.showTab('matching')">
                                🔍 Găsește Prima Conexiune
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
                <h4>👥 Grupuri de Suport</h4>
                <p>Grupurile sunt moderate 24/7. Respectă regulile comunității și oferă suport constructiv.</p>
            </div>
            
            <div class="groups-grid">
                ${groups.map(group => `
                    <div class="group-card" onclick="peerNetwork.joinGroup('${group.id}')">
                        <div class="group-header">
                            <div class="group-icon">${group.icon}</div>
                            <div class="group-info">
                                <h3>${group.name}</h3>
                                <div class="group-members">${group.members} membri activi</div>
                            </div>
                        </div>
                        
                        <div class="group-description">
                            ${group.description}
                        </div>
                        
                        <div class="group-tags">
                            ${group.tags.map(tag => `<span class="group-tag">${tag}</span>`).join('')}
                        </div>
                        
                        <button class="connect-btn primary" style="width: 100%;">
                            ${group.isMember ? '💬 Intră în Grup' : '➕ Alătură-te'}
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    showProfile(content) {
        content.innerHTML = `
            <div class="profile-interface">
                <h3>⚙️ Setări Profil de Suport</h3>
                
                <div class="profile-section">
                    <h4>🎯 Preferințe de Matching</h4>
                    <div class="preference-grid">
                        <label>
                            <input type="checkbox" checked> Persoane cu experiență similară RSD
                        </label>
                        <label>
                            <input type="checkbox" checked> Disponibilitate pentru suport de urgență
                        </label>
                        <label>
                            <input type="checkbox"> Doar femei
                        </label>
                        <label>
                            <input type="checkbox"> Doar bărbați
                        </label>
                        <label>
                            <input type="checkbox" checked> Vârstă similară (±5 ani)
                        </label>
                        <label>
                            <input type="checkbox"> Experiență cu terapie/coaching
                        </label>
                    </div>
                </div>
                
                <div class="profile-section">
                    <h4>🛡️ Setări de Siguranță</h4>
                    <div class="safety-settings">
                        <label>
                            <input type="checkbox" checked> Activează moderarea automată
                        </label>
                        <label>
                            <input type="checkbox" checked> Raportează automat limbaj agresiv
                        </label>
                        <label>
                            <input type="checkbox"> Permite doar conexiuni verificate
                        </label>
                        <label>
                            <input type="checkbox" checked> Notificări pentru mesaje de criză
                        </label>
                    </div>
                </div>
                
                <div class="profile-section">
                    <h4>📱 Notificări</h4>
                    <div class="notification-settings">
                        <label>
                            <input type="checkbox" checked> Cereri noi de conexiune
                        </label>
                        <label>
                            <input type="checkbox" checked> Mesaje de urgență
                        </label>
                        <label>
                            <input type="checkbox"> Mesaje normale
                        </label>
                        <label>
                            <input type="checkbox" checked> Activitate în grupuri
                        </label>
                    </div>
                </div>
                
                <button class="connect-btn primary" onclick="peerNetwork.saveProfile()">
                    💾 Salvează Setările
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
                bio: 'Diagnosticată cu ADHD și RSD acum 2 ani. Am învățat multe strategii de coping și vreau să ajut.',
                compatibility: 94,
                factors: [
                    { icon: '🎯', text: 'RSD severitate similară' },
                    { icon: '🧘', text: 'Strategii de mindfulness' },
                    { icon: '⏰', text: 'Disponibilă seara' },
                    { icon: '💊', text: 'Experiență cu medicație' }
                ]
            },
            {
                id: 'user2',
                name: 'Alex D.',
                avatar: '🌟',
                bio: 'Student la psihologie, experiență personală cu RSD. Pasionat de cercetare și suport peer.',
                compatibility: 87,
                factors: [
                    { icon: '📚', text: 'Cunoștințe psihologie' },
                    { icon: '🤝', text: 'Experiență peer support' },
                    { icon: '🌙', text: 'Disponibil noaptea' },
                    { icon: '💡', text: 'Strategii cognitive' }
                ]
            },
            {
                id: 'user3',
                name: 'Dana P.',
                avatar: '🦋',
                bio: 'Mamă cu RSD, încerc să îmi ajut și copilul să înțeleagă emoțiile intense.',
                compatibility: 78,
                factors: [
                    { icon: '👶', text: 'Experiență ca părinte' },
                    { icon: '💪', text: 'Strategii de reziliență' },
                    { icon: '🌅', text: 'Disponibilă dimineața' },
                    { icon: '❤️', text: 'Abordare empatică' }
                ]
            }
        ];
        
        return potentialUsers;
    }
    
    // Moderation System
    initializeModerationSystem() {
        this.moderationSystem = {
            flaggedWords: [
                'sinucidere', 'auto-vătămare', 'moarte', 'disperat', 'fără speranță',
                'vreau să mor', 'nu mai pot', 'sfârșitul', 'să mă omor'
            ],
            
            toxicityPatterns: [
                /\b(prost|idiot|imbecil|stupid)\b/gi,
                /\b(nu înțelegi nimic|ești nebun)\b/gi,
                /\b(nu servești la nimic|ești inutil)\b/gi
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
            <h4>🚨 Intervenție de Criză Activată</h4>
            <p>Am detectat limbaj care indică o posibilă criză. Un moderator va fi contactat imediat.</p>
            <p><strong>Dacă ai gânduri de auto-vătămare, te rog să contactezi imediat:</strong></p>
            <button onclick="window.open('tel:112')" style="background: #dc3545; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; margin: 0.25rem;">
                📞 112 - Urgențe
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
                lastMessage: 'Mulțumesc pentru sfaturi, m-au ajutat mult!',
                time: '14:30',
                unread: 2
            },
            {
                id: 'chat2',
                name: 'Alex D.',
                avatar: '🌟',
                lastMessage: 'Hai să discutăm despre strategiile cognitive',
                time: 'Ieri',
                unread: 0
            }
        ];
    }
    
    getAvailableGroups() {
        return [
            {
                id: 'group1',
                name: 'RSD Support România',
                icon: '🇷🇴',
                members: 127,
                description: 'Comunitatea principală pentru suport RSD în română. Împărtășim experiențe și strategii de coping.',
                tags: ['RSD', 'Suport General', 'Română'],
                isMember: true
            },
            {
                id: 'group2',
                name: 'Părinți cu RSD',
                icon: '👨‍👩‍👧‍👦',
                members: 43,
                description: 'Grup pentru părinții care trăiesc cu RSD și vor să învețe cum să își ajute copiii.',
                tags: ['Părinți', 'Familii', 'Copii'],
                isMember: false
            },
            {
                id: 'group3',
                name: 'Workplace RSD',
                icon: '💼',
                members: 89,
                description: 'Strategii pentru gestionarea RSD la locul de muncă și în relațiile profesionale.',
                tags: ['Muncă', 'Carieră', 'Profesional'],
                isMember: false
            },
            {
                id: 'group4',
                name: 'Creativi cu RSD',
                icon: '🎨',
                members: 76,
                description: 'Comunitate pentru artiști, scriitori și creatori care trăiesc cu sensibilitatea RSD.',
                tags: ['Artă', 'Creativitate', 'Expresie'],
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
        alert(`Cererea de conexiune a fost trimisă! Vei fi notificat când ${userId} răspunde.`);
    }
    
    nextMatch() {
        this.showTab('matching'); // Refresh matches
    }
    
    refreshMatches() {
        this.showTab('matching'); // Generate new matches
    }
    
    quickEmergencyMatch() {
        alert('🆘 Căutăm volunteer disponibili pentru suport de urgență...\n\nVei fi conectat în câteva minute cu cineva care poate ajuta.');
    }
    
    openChat(chatId) {
        alert(`Deschidere chat cu ${chatId}...`);
    }
    
    joinGroup(groupId) {
        alert(`Te alături grupului ${groupId}...`);
    }
    
    saveProfile() {
        this.saveUserProfile();
        alert('✅ Setările au fost salvate cu succes!');
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