/**
 * Crisis Detection System for RSD Emergency Support
 * Detects patterns and triggers automatic support interventions
 */

// Crisis Detection JavaScript
function initCrisisDetection() {
    const crisisDetector = {
        // Detection metrics
        metrics: {
            timeOnPage: 0,
            rapidClicks: 0,
            scrollPatterns: [],
            pageReturns: 0,
            searchQueries: [],
            lastActivity: Date.now()
        },
        
        // Crisis indicators
        indicators: {
            // High-risk keywords in searches or page content interaction
            riskKeywords: [
                'want to disappear', 'can\'t take it', 'nobody cares', 'worthless', 
                'rejection hurts', 'overwhelming', 'can\'t cope', 'emergency',
                'crisis', 'help me', 'desperate', 'alone', 'hopeless'
            ],
            
            // Behavioral patterns indicating distress
            behaviorPatterns: {
                rapidPageChanges: 5, // More than 5 page changes in 2 minutes
                excessiveScrolling: 10, // More than 10 rapid scrolls
                returnVisits: 3, // Returning to same page multiple times
                longInactivity: 300000, // 5 minutes of inactivity on help pages
                helpPageTime: 180000 // Spending more than 3 minutes on crisis pages
            }
        },
        
        // Crisis levels
        levels: {
            LOW: 1,
            MODERATE: 2,
            HIGH: 3,
            CRITICAL: 4
        },
        
        currentLevel: 1,
        
        // Initialize detection
        init() {
            this.startTracking();
            this.loadUserHistory();
            this.setupEventListeners();
        },
        
        // Start behavioral tracking
        startTracking() {
            // Track time on page
            setInterval(() => {
                this.metrics.timeOnPage += 1000;
                this.analyzePatterns();
            }, 1000);
            
            // Track user interactions
            document.addEventListener('click', (e) => {
                this.trackClick(e);
            });
            
            document.addEventListener('scroll', () => {
                this.trackScroll();
            });
            
            // Track page visibility
            document.addEventListener('visibilitychange', () => {
                this.trackVisibility();
            });
        },
        
        // Track click patterns
        trackClick(event) {
            this.metrics.rapidClicks++;
            this.metrics.lastActivity = Date.now();
            
            // Reset rapid clicks after 2 seconds
            setTimeout(() => {
                if (this.metrics.rapidClicks > 0) {
                    this.metrics.rapidClicks--;
                }
            }, 2000);
            
            // Check for help-seeking behavior
            if (event.target.closest('.help-link, .emergency-button, .crisis-support')) {
                this.escalateCrisisLevel();
            }
        },
        
        // Track scroll patterns
        trackScroll() {
            const scrollData = {
                position: window.scrollY,
                timestamp: Date.now()
            };
            
            this.metrics.scrollPatterns.push(scrollData);
            
            // Keep only last 20 scroll events
            if (this.metrics.scrollPatterns.length > 20) {
                this.metrics.scrollPatterns.shift();
            }
            
            this.detectErraticScrolling();
        },
        
        // Detect erratic scrolling (sign of distress)
        detectErraticScrolling() {
            if (this.metrics.scrollPatterns.length < 5) return;
            
            const recent = this.metrics.scrollPatterns.slice(-5);
            const timeSpan = recent[4].timestamp - recent[0].timestamp;
            
            // Rapid scrolling in short time
            if (timeSpan < 3000) {
                this.escalateCrisisLevel();
            }
        },
        
        // Track page visibility changes
        trackVisibility() {
            if (document.hidden) {
                // User switched away - might be seeking other help
                this.metrics.pageReturns++;
            }
        },
        
        // Analyze patterns for crisis indicators
        analyzePatterns() {
            const patterns = this.indicators.behaviorPatterns;
            let riskScore = 0;
            
            // Check rapid clicks
            if (this.metrics.rapidClicks > 10) {
                riskScore += 2;
            }
            
            // Check time on crisis pages
            if (this.isOnCrisisPage() && this.metrics.timeOnPage > patterns.helpPageTime) {
                riskScore += 3;
            }
            
            // Check return visits
            if (this.metrics.pageReturns > patterns.returnVisits) {
                riskScore += 2;
            }
            
            // Check for inactivity on help pages
            const inactiveTime = Date.now() - this.metrics.lastActivity;
            if (this.isOnCrisisPage() && inactiveTime > patterns.longInactivity) {
                riskScore += 3;
            }
            
            this.updateCrisisLevel(riskScore);
        },
        
        // Check if user is on crisis/help pages
        isOnCrisisPage() {
            const url = window.location.pathname.toLowerCase();
            return url.includes('calm-now') || 
                   url.includes('emergency') || 
                   url.includes('crisis') || 
                   url.includes('help');
        },
        
        // Update crisis level based on risk score
        updateCrisisLevel(riskScore) {
            let newLevel = this.levels.LOW;
            
            if (riskScore >= 8) {
                newLevel = this.levels.CRITICAL;
            } else if (riskScore >= 6) {
                newLevel = this.levels.HIGH;
            } else if (riskScore >= 4) {
                newLevel = this.levels.MODERATE;
            }
            
            if (newLevel > this.currentLevel) {
                this.currentLevel = newLevel;
                // Silent monitoring only - no automatic modal triggers
                this.logCrisisEvent(newLevel);
            }
        },
        
        // Escalate crisis level manually
        escalateCrisisLevel() {
            this.currentLevel = Math.min(this.currentLevel + 1, this.levels.CRITICAL);
            // Silent escalation only - no automatic modal triggers
            this.logCrisisEvent(this.currentLevel);
        },
        
        // Set manual crisis level for emergency activation
        setManualCrisisLevel(level) {
            // Validate level is within bounds
            const validLevel = Math.max(1, Math.min(level, this.levels.CRITICAL));
            this.currentLevel = validLevel;
            
            // Log the manual override
            this.logCrisisEvent(validLevel, 'manual_override');
            
            console.log(`🔧 Crisis level manually set to: ${validLevel}`);
        },
        
        // Trigger appropriate intervention
        triggerIntervention(level) {
            switch(level) {
                case this.levels.MODERATE:
                    // Moderate level - silent monitoring only
                    break;
                case this.levels.HIGH:
                    // High level - silent monitoring only
                    break;
                case this.levels.CRITICAL:
                    // Critical level - emergency protocols activated silently
                    this.activateEmergencyProtocols();
                    break;
            }
            
            // Log the intervention for analytics
            this.logCrisisEvent(level);
        },
        
        // Show popup with support content
        showPopup(html) {
            // Remove existing popups
            document.querySelectorAll('.crisis-popup').forEach(popup => popup.remove());
            
            // Add new popup
            document.body.insertAdjacentHTML('beforeend', html);
            
            // Auto-close after 30 seconds if not interacted with
            setTimeout(() => {
                const popup = document.querySelector('.crisis-popup');
                if (popup) {
                    popup.style.opacity = '0.7';
                }
            }, 30000);
        },
        
        // Activate emergency protocols
        activateEmergencyProtocols() {
            // Send anonymous alert to monitoring system
            this.sendEmergencyAlert();
            
            // Prepare emergency contact notification
            this.prepareEmergencyNotification();
            
            // Start continuous monitoring
            this.startEmergencyMonitoring();
        },
        
        // Send emergency alert to monitoring system
        sendEmergencyAlert() {
            const alertData = {
                timestamp: new Date().toISOString(),
                level: 'CRITICAL',
                metrics: this.metrics,
                userAgent: navigator.userAgent,
                page: window.location.pathname
            };
            
            // Send to backend for monitoring (anonymized)
            fetch('/api/emergency-alert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(alertData)
            }).catch(console.error);
        },
        
        // Prepare emergency contact notification
        prepareEmergencyNotification() {
            // Check if user has emergency contacts set up
            const emergencyContacts = localStorage.getItem('emergencyContacts');
            if (emergencyContacts) {
                // Show option to notify contacts
                this.showEmergencyContactOption();
            }
        },
        
        // Start emergency monitoring
        startEmergencyMonitoring() {
            // Monitor every 30 seconds during emergency
            this.emergencyInterval = setInterval(() => {
                this.checkEmergencyStatus();
            }, 30000);
        },
        
        // Load user history from localStorage
        loadUserHistory() {
            const history = localStorage.getItem('crisisHistory');
            if (history) {
                const data = JSON.parse(history);
                this.metrics.pageReturns = data.pageReturns || 0;
            }
        },
        
        // Save user data
        saveUserData() {
            const data = {
                pageReturns: this.metrics.pageReturns,
                lastCrisisLevel: this.currentLevel,
                timestamp: Date.now()
            };
            localStorage.setItem('crisisHistory', JSON.stringify(data));
        },
        
        // Log crisis events for analytics
        logCrisisEvent(level, eventType = 'automatic') {
            const event = {
                level: level,
                timestamp: Date.now(),
                page: window.location.pathname,
                metrics: { ...this.metrics },
                type: eventType // Track if manual override or automatic detection
            };
            
            // Store locally for privacy
            const events = JSON.parse(localStorage.getItem('crisisEvents') || '[]');
            events.push(event);
            
            // Keep only last 50 events
            if (events.length > 50) {
                events.splice(0, events.length - 50);
            }
            
            localStorage.setItem('crisisEvents', JSON.stringify(events));
        },
        
        // Setup additional event listeners
        setupEventListeners() {
            // Detect copy-paste of crisis-related text
            document.addEventListener('paste', (e) => {
                const pastedText = (e.clipboardData || window.clipboardData).getData('text');
                if (this.containsRiskKeywords(pastedText)) {
                    this.escalateCrisisLevel();
                }
            });
            
            // Detect search queries
            const searchInputs = document.querySelectorAll('input[type="search"], .search-input');
            searchInputs.forEach(input => {
                input.addEventListener('input', (e) => {
                    if (this.containsRiskKeywords(e.target.value)) {
                        this.escalateCrisisLevel();
                    }
                });
            });
            
            // Before page unload - save data
            window.addEventListener('beforeunload', () => {
                this.saveUserData();
            });
        },
        
        // Check if text contains risk keywords
        containsRiskKeywords(text) {
            const lowerText = text.toLowerCase();
            return this.indicators.riskKeywords.some(keyword => 
                lowerText.includes(keyword.toLowerCase())
            );
        }
    };
    
    // Initialize crisis detection
    crisisDetector.init();
    
    // Make globally available
    window.crisisDetector = crisisDetector;
}

// CSS for crisis popups
const crisisCSS = `
    .crisis-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999;
        animation: fadeIn 0.3s ease-in;
    }
    
    .crisis-popup .support-content {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        margin: 1rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        position: relative;
    }
    
    .crisis-popup.gentle .support-content {
        border-left: 5px solid #4d7a79;
    }
    
    .crisis-popup.active .support-content {
        border-left: 5px solid #ff6b35;
    }
    
    .crisis-popup.critical .support-content {
        border-left: 5px solid #dc3545;
        background: #fff5f5;
    }
    
    .crisis-popup h3 {
        margin-top: 0;
        color: #333;
    }
    
    .crisis-popup button {
        margin: 0.5rem;
        padding: 0.75rem 1rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
    }
    
    .breath-btn, .ground-btn {
        background: #4d7a79;
        color: white;
    }
    
    .emergency-breath, .emergency-kit {
        background: #ff6b35;
        color: white;
    }
    
    .peer-support {
        background: #6f42c1;
        color: white;
    }
    
    .emergency-call {
        background: #dc3545;
        color: white;
        font-size: 1.1rem;
    }
    
    .guided-calm, .notify-contact {
        background: #007bff;
        color: white;
    }
    
    .close-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: #ccc;
        color: #666;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        font-size: 1.2rem;
    }
    
    .emergency-text {
        background: #e8f4f8;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        border-left: 4px solid #4d7a79;
    }
    
    .professional-help {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid #dee2e6;
        font-size: 0.9rem;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
    
    @media (max-width: 768px) {
        .crisis-popup .support-content {
            margin: 1rem;
            padding: 1.5rem;
        }
        
        .crisis-popup button {
            width: 100%;
            margin: 0.25rem 0;
        }
    }
`;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS
    const style = document.createElement('style');
    style.textContent = crisisCSS;
    document.head.appendChild(style);
    
    // Initialize crisis detection
    initCrisisDetection();
});

// Helper functions for popup actions
function closeSupportPopup() {
    document.querySelectorAll('.crisis-popup').forEach(popup => popup.remove());
}

function startBreathingExercise() {
    // Implement breathing exercise
    window.location.href = '/calm-now/#breathing';
}

function showGroundingTechnique() {
    // Implement grounding technique
    window.location.href = '/calm-now/#grounding';
}

function startEmergencyBreathing() {
    // Implement emergency breathing
    window.location.href = '/calm-now/#emergency-breathing';
}

function connectPeerSupport() {
    // Implement peer support connection
    window.location.href = '/community/#peer-support';
}

function accessEmergencyKit() {
    // Implement emergency kit access
    window.location.href = '/calm-now/#emergency-kit';
}

function callEmergencyLine() {
    // Show emergency contact information
    alert('24/7 Crisis Hotline: 988\nMedical Emergencies: 911\nCrisis Text Line: Text HOME to 741741');
}

function startGuidedCalming() {
    // Implement guided calming
    window.location.href = '/calm-now/#guided-calming';
}

function notifyEmergencyContact() {
    // Implement emergency contact notification
    alert('Emergency contact notification feature will be implemented soon.');
}