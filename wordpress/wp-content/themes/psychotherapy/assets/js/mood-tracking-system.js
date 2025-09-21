/**
 * Mood Tracking & Prediction System for RSD
 * Advanced emotional monitoring with pattern recognition and episode prediction
 */

class MoodTrackingSystem {
    constructor() {
        this.isActive = false;
        this.currentMood = null;
        this.moodHistory = [];
        this.patterns = [];
        this.predictions = [];
        this.triggers = [];
        this.analytics = null;
        
        this.init();
    }
    
    init() {
        console.log('🎯 Initializing Mood Tracking System...');
        this.loadMoodHistory();
        this.initializeAnalytics();
        console.log('📊 Creating tracking interface...');
        this.createTrackingInterface();
        console.log('🎯 Setting up event listeners...');
        this.setupEventListeners();
        this.analyzePatterns();
        this.startDailyTracking();
        console.log('✅ Mood Tracking System initialized successfully');
    }
    
    createTrackingInterface() {
        console.log('🔧 Creating mood tracking HTML interface...');
        const trackingHTML = `
            <div id="mood-tracking-system" class="mood-overlay" style="display: none;">
                <div class="mood-container">
                    <div class="mood-header">
                        <h2>📊 RSD Mood Tracking & Prediction</h2>
                        <p>Understand your emotional patterns and prevent RSD episodes</p>
                        <button class="mood-close" onclick="closeMoodTracking()">&times;</button>
                    </div>
                    
                    <div class="mood-content" id="mood-content">
                        <div class="mood-tabs">
                            <button class="mood-tab-btn active" data-tab="today" onclick="moodTracker.showTab('today')">
                                📅 Today
                            </button>
                            <button class="mood-tab-btn" data-tab="trends" onclick="moodTracker.showTab('trends')">
                                📈 Trends
                            </button>
                            <button class="mood-tab-btn" data-tab="patterns" onclick="moodTracker.showTab('patterns')">
                                🔍 Patterns
                            </button>
                            <button class="mood-tab-btn" data-tab="predictions" onclick="moodTracker.showTab('predictions')">
                                🔮 Predictions
                            </button>
                            <button class="mood-tab-btn" data-tab="insights" onclick="moodTracker.showTab('insights')">
                                💡 Insight-uri
                            </button>
                        </div>
                        
                        <div class="mood-tab-content" id="mood-tab-content">
                            <!-- Content will be dynamically loaded -->
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Quick Mood Widget -->
            <div id="quick-mood-widget" class="quick-widget">
                <div class="widget-header" onclick="moodTracker.toggleWidget()">
                    <span class="widget-icon">😊</span>
                    <span class="widget-text">How are you feeling?</span>
                    <span class="widget-arrow">▼</span>
                </div>
                <div class="widget-content" id="widget-content" style="display: none;">
                    <div class="quick-mood-scale">
                        <div class="mood-scale-labels">
                            <span>Very Bad</span>
                            <span>Excellent</span>
                        </div>
                        <input type="range" id="quick-mood-slider" min="1" max="10" value="5" 
                               oninput="moodTracker.updateQuickMood(this.value)">
                        <div class="mood-value" id="mood-value">5</div>
                    </div>
                    <div class="quick-actions">
                        <button onclick="moodTracker.logQuickMood()" class="quick-btn">
                            📝 Save
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        console.log('📝 Adding HTML to document body...');
        document.body.insertAdjacentHTML('beforeend', trackingHTML);
        console.log('🎨 Adding CSS styles...');
        this.addTrackingStyles();
        console.log('✅ Mood tracking interface created successfully');
    }
    
    addTrackingStyles() {
        const styles = `
            .mood-overlay {
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
                backdrop-filter: blur(15px);
                animation: moodFadeIn 0.4s ease-out;
            }
            
            @keyframes moodFadeIn {
                from {
                    opacity: 0;
                    backdrop-filter: blur(0px);
                }
                to {
                    opacity: 1;
                    backdrop-filter: blur(15px);
                }
            }
            
            .mood-container {
                background: white;
                border-radius: 25px;
                max-width: 1200px;
                max-height: 90vh;
                width: 95%;
                height: 85vh;
                overflow: hidden;
                box-shadow: 0 30px 100px rgba(0, 0, 0, 0.5);
                animation: moodSlideIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                display: flex;
                flex-direction: column;
            }
            
            @keyframes moodSlideIn {
                from {
                    transform: scale(0.6) translateY(150px);
                    opacity: 0;
                }
                to {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
            }
            
            .mood-header {
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 2rem;
                text-align: center;
                position: relative;
                flex-shrink: 0;
            }
            
            .mood-header h2 {
                margin: 0 0 0.5rem 0;
                font-size: 1.8rem;
            }
            
            .mood-header p {
                margin: 0;
                opacity: 0.9;
                font-size: 1.1rem;
            }
            
            .mood-close {
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
            
            .mood-close:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            .mood-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            
            .mood-tabs {
                display: flex;
                background: #f8f9fa;
                border-bottom: 2px solid #e9ecef;
                flex-shrink: 0;
            }
            
            .mood-tab-btn {
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
            
            .mood-tab-btn:hover {
                background: rgba(102, 126, 234, 0.1);
                color: #667eea;
            }
            
            .mood-tab-btn.active {
                color: #667eea;
                border-bottom-color: #667eea;
                background: white;
            }
            
            .mood-tab-content {
                flex: 1;
                padding: 2rem;
                overflow-y: auto;
                background: white;
            }
            
            /* Quick Widget Styles */
            .quick-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                min-width: 250px;
                animation: widgetSlideUp 0.5s ease-out;
            }
            
            @keyframes widgetSlideUp {
                from {
                    transform: translateY(100px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .widget-header {
                padding: 1rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border-radius: 15px;
                transition: all 0.3s ease;
            }
            
            .widget-header:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
            }
            
            .widget-icon {
                font-size: 1.2rem;
            }
            
            .widget-text {
                flex: 1;
                font-weight: bold;
            }
            
            .widget-arrow {
                transition: transform 0.3s ease;
            }
            
            .widget-header.expanded .widget-arrow {
                transform: rotate(180deg);
            }
            
            .widget-content {
                padding: 1rem;
                border-top: 1px solid #eee;
                animation: widgetExpand 0.3s ease-out;
            }
            
            @keyframes widgetExpand {
                from {
                    opacity: 0;
                    max-height: 0;
                }
                to {
                    opacity: 1;
                    max-height: 200px;
                }
            }
            
            .quick-mood-scale {
                margin-bottom: 1rem;
            }
            
            .mood-scale-labels {
                display: flex;
                justify-content: space-between;
                font-size: 0.8rem;
                color: #666;
                margin-bottom: 0.5rem;
            }
            
            #quick-mood-slider {
                width: 100%;
                height: 8px;
                border-radius: 4px;
                background: #e9ecef;
                outline: none;
                cursor: pointer;
            }
            
            #quick-mood-slider::-webkit-slider-thumb {
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #667eea;
                cursor: pointer;
                box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
            }
            
            .mood-value {
                text-align: center;
                font-size: 1.5rem;
                font-weight: bold;
                color: #667eea;
                margin-top: 0.5rem;
            }
            
            .quick-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .quick-btn {
                flex: 1;
                padding: 0.5rem;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            }
            
            .quick-btn:first-child {
                background: #667eea;
                color: white;
            }
            
            .quick-btn:first-child:hover {
                background: #5a6fd8;
                transform: translateY(-1px);
            }
            
            .quick-btn:last-child {
                background: #e9ecef;
                color: #666;
            }
            
            .quick-btn:last-child:hover {
                background: #d6d8db;
            }
            
            /* Dashboard Styles */
            .mood-dashboard {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
                margin-bottom: 2rem;
            }
            
            .mood-card {
                background: #f8f9fa;
                padding: 1.5rem;
                border-radius: 15px;
                border-left: 4px solid #667eea;
                transition: all 0.3s ease;
            }
            
            .mood-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
            }
            
            .mood-card h3 {
                margin: 0 0 1rem 0;
                color: #333;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .current-mood-display {
                text-align: center;
                padding: 2rem;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border-radius: 20px;
                margin-bottom: 2rem;
            }
            
            .mood-emoji {
                font-size: 4rem;
                margin-bottom: 1rem;
            }
            
            .mood-score {
                font-size: 3rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
            }
            
            .mood-description {
                font-size: 1.2rem;
                opacity: 0.9;
            }
            
            /* Chart Styles */
            .chart-container {
                background: white;
                border: 2px solid #e9ecef;
                border-radius: 15px;
                padding: 1.5rem;
                margin-bottom: 2rem;
                height: 300px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }
            
            .chart-placeholder {
                color: #666;
                font-size: 1.1rem;
                text-align: center;
            }
            
            /* Pattern Recognition Styles */
            .pattern-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .pattern-item {
                background: white;
                border: 2px solid #e9ecef;
                border-radius: 15px;
                padding: 1.5rem;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .pattern-item:hover {
                border-color: #667eea;
                transform: translateY(-2px);
                box-shadow: 0 5px 20px rgba(102, 126, 234, 0.2);
            }
            
            .pattern-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 1rem;
            }
            
            .pattern-title {
                font-weight: bold;
                color: #333;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .pattern-confidence {
                background: #667eea;
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: bold;
            }
            
            .pattern-description {
                color: #666;
                margin-bottom: 1rem;
                line-height: 1.5;
            }
            
            .pattern-triggers {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .trigger-tag {
                background: rgba(102, 126, 234, 0.1);
                color: #667eea;
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: bold;
            }
            
            /* Prediction Styles */
            .prediction-timeline {
                background: white;
                border: 2px solid #e9ecef;
                border-radius: 15px;
                padding: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .timeline-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                border-radius: 10px;
                margin-bottom: 1rem;
                position: relative;
            }
            
            .timeline-item.high-risk {
                background: rgba(220, 53, 69, 0.1);
                border-left: 4px solid #dc3545;
            }
            
            .timeline-item.medium-risk {
                background: rgba(255, 193, 7, 0.1);
                border-left: 4px solid #ffc107;
            }
            
            .timeline-item.low-risk {
                background: rgba(40, 167, 69, 0.1);
                border-left: 4px solid #28a745;
            }
            
            .timeline-date {
                font-weight: bold;
                min-width: 100px;
            }
            
            .timeline-content {
                flex: 1;
            }
            
            .timeline-title {
                font-weight: bold;
                margin-bottom: 0.25rem;
            }
            
            .timeline-description {
                color: #666;
                font-size: 0.9rem;
            }
            
            .risk-indicator {
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: bold;
                color: white;
            }
            
            .risk-indicator.high {
                background: #dc3545;
            }
            
            .risk-indicator.medium {
                background: #ffc107;
                color: #333;
            }
            
            .risk-indicator.low {
                background: #28a745;
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                .mood-container {
                    width: 100%;
                    height: 100%;
                    border-radius: 0;
                    max-height: 100vh;
                }
                
                .mood-header {
                    padding: 1rem;
                }
                
                .mood-header h2 {
                    font-size: 1.4rem;
                }
                
                .mood-tab-content {
                    padding: 1rem;
                }
                
                .mood-dashboard {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }
                
                .quick-widget {
                    bottom: 10px;
                    right: 10px;
                    min-width: 200px;
                }
                
                .mood-tabs {
                    overflow-x: auto;
                    white-space: nowrap;
                }
                
                .mood-tab-btn {
                    min-width: 120px;
                }
            }
            
            /* Simple Modern Button Styles */
            .rec-btn, .strategy-btn, .quick-btn {
                background: #667eea;
                color: white;
                border: none;
                border-radius: 6px;
                padding: 6px 12px;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                text-transform: none;
                letter-spacing: normal;
                display: inline-block;
                margin-left: 8px;
            }
            
            .rec-btn:hover, .strategy-btn:hover, .quick-btn:hover {
                background: #5a67d8;
                transform: none;
                box-shadow: none;
            }
            
            .rec-btn:active, .strategy-btn:active, .quick-btn:active {
                background: #4c51bf;
            }
            
            /* Secondary Button Style */
            .strategy-btn.secondary {
                background: #6c757d;
            }
            
            .strategy-btn.secondary:hover {
                background: #5a6268;
            }
            
            /* Success Button for Save */
            .save-entry-btn {
                background: #28a745;
                color: white;
                border: none;
                border-radius: 6px;
                padding: 10px 20px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: background 0.2s ease;
                margin-top: 1rem;
                width: 100%;
            }
            
            .save-entry-btn:hover {
                background: #218838;
            }
            
            /* Close button simple */
            .mood-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #6c757d;
                cursor: pointer;
                padding: 5px;
                transition: color 0.2s ease;
            }
            
            .mood-close:hover {
                color: #dc3545;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    showWithAuth() {
        console.log('🎯 MoodTrackingSystem.showWithAuth() called');
        
        // Check authentication first
        if (window.rsdAuthSystem && !window.rsdAuthSystem.isAuthenticated()) {
            console.log('🔒 User not authenticated, showing auth modal');
            window.rsdAuthSystem.showModal('login');
            return;
        }
        
        // If authenticated, show the mood tracking system
        this.show();
    }
    
    show() {
        console.log('🎯 MoodTrackingSystem.show() called');
        
        const element = document.getElementById('mood-tracking-system');
        console.log('📊 Found mood tracking element:', element);
        
        if (element) {
            element.style.display = 'flex';
            element.style.zIndex = '25000';
            console.log('✅ Mood tracking element shown');
            this.isActive = true;
            
            // Try to show tab with error handling
            try {
                this.showTab('today');
                console.log('✅ Tab "today" loaded successfully');
            } catch (error) {
                console.error('❌ Error showing tab:', error);
                // Show basic content if tab fails
                const content = document.getElementById('mood-tab-content');
                if (content) {
                    content.innerHTML = '<div style="padding: 20px; text-align: center;">Mood Tracking Dashboard<br>System is loading...</div>';
                }
            }
        } else {
            console.error('❌ Mood tracking element not found in DOM');
            // Try to recreate the interface
            try {
                this.createTrackingInterface();
                setTimeout(() => {
                    const retryElement = document.getElementById('mood-tracking-system');
                    if (retryElement) {
                        retryElement.style.display = 'flex';
                        retryElement.style.zIndex = '25000';
                        this.isActive = true;
                        this.showTab('today');
                        console.log('✅ Mood tracking recreated and shown');
                    }
                }, 100);
            } catch (error) {
                console.error('❌ Error recreating interface:', error);
            }
        }
    }
    
    hide() {
        document.getElementById('mood-tracking-system').style.display = 'none';
        this.isActive = false;
    }
    
    showTab(tabName) {
        console.log(`🔄 Showing tab: ${tabName}`);
        
        // Update tab buttons
        document.querySelectorAll('.mood-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const tabElement = document.querySelector(`[data-tab="${tabName}"]`);
        console.log(`📋 Tab element found:`, tabElement);
        
        if (tabElement) {
            tabElement.classList.add('active');
        }
        
        // Show tab content
        const content = document.getElementById('mood-tab-content');
        console.log(`📄 Content element found:`, content);
        
        switch(tabName) {
            case 'today':
                this.showTodayTab(content);
                break;
            case 'trends':
                this.showTrendsTab(content);
                break;
            case 'patterns':
                this.showPatternsTab(content);
                break;
            case 'predictions':
                this.showPredictionsTab(content);
                break;
            case 'insights':
                this.showInsightsTab(content);
                break;
        }
    }
    
    showTodayTab(content) {
        const today = new Date();
        const todayEntries = this.getTodayEntries();
        const currentMood = this.getCurrentMood();
        
        content.innerHTML = `
            <div class="current-mood-display">
                <div class="mood-emoji">${this.getMoodEmoji(currentMood.score)}</div>
                <div class="mood-score">${currentMood.score}/10</div>
                <div class="mood-description">${this.getMoodDescription(currentMood.score)}</div>
                <div style="margin-top: 1rem; opacity: 0.8;">
                    Last recorded: ${currentMood.time}
                </div>
            </div>
            
            <div class="mood-dashboard">
                <div class="mood-card">
                    <h3>📈 Today's Progress</h3>
                    <div class="progress-summary">
                        <p><strong>Entries:</strong> ${todayEntries.length}/5 recommended</p>
                        <p><strong>Daily Average:</strong> ${this.calculateDailyAverage()}/10</p>
                        <p><strong>Variability:</strong> ${this.calculateVariability()}</p>
                    </div>
                </div>
                
                <div class="mood-card">
                    <h3>⚠️ Detected Risk Factors</h3>
                    <div class="risk-factors">
                        ${this.getRiskFactors().map(factor => `
                            <div class="risk-factor">
                                <span class="risk-icon">${factor.icon}</span>
                                <span>${factor.name}</span>
                                <span class="risk-level ${factor.level}">${factor.level}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="mood-card">
                    <h3>🎯 Today's Recommendations</h3>
                    <div class="recommendations">
                        ${this.getTodayRecommendations().map(rec => `
                            <div class="recommendation">
                                <span class="rec-icon">${rec.icon}</span>
                                <span>${rec.text}</span>
                                <button onclick="moodTracker.applyRecommendation('${rec.id}')" class="rec-btn">
                                    Apply
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="mood-card">
                    <h3>📝 Add Detailed Entry</h3>
                    <div class="detailed-entry">
                        <div class="mood-scale-section">
                            <label>Overall State (1-10):</label>
                            <input type="range" id="detailed-mood" min="1" max="10" value="5">
                            <span id="detailed-mood-value">5</span>
                        </div>
                        
                        <div class="triggers-section">
                            <label>Trigger Factors:</label>
                            <div class="trigger-checkboxes">
                                <label><input type="checkbox" value="work"> Work</label>
                                <label><input type="checkbox" value="relationships"> Relationships</label>
                                <label><input type="checkbox" value="social"> Social</label>
                                <label><input type="checkbox" value="sleep"> Sleep</label>
                                <label><input type="checkbox" value="health"> Health</label>
                            </div>
                        </div>
                        
                        <div class="notes-section">
                            <label>Notes:</label>
                            <textarea id="mood-notes" placeholder="How are you feeling? What happened today?"></textarea>
                        </div>
                        
                        <button onclick="moodTracker.saveDetailedEntry()" class="save-entry-btn">
                            💾 Save Entry
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.setupMoodSliders();
    }
    
    setupMoodSliders() {
        // Setup main mood slider
        const moodSlider = document.getElementById('mood-slider');
        const moodValue = document.getElementById('mood-value');
        const moodEmoji = document.getElementById('mood-emoji');
        
        if (moodSlider && moodValue && moodEmoji) {
            moodSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                moodValue.textContent = value;
                moodEmoji.textContent = this.getMoodEmoji(value);
                
                // Update current mood
                this.currentMood = {
                    score: value,
                    timestamp: Date.now()
                };
            });
            
            // Set initial values
            const initialValue = moodSlider.value;
            moodValue.textContent = initialValue;
            moodEmoji.textContent = this.getMoodEmoji(parseInt(initialValue));
        }
        
        // Setup intensity sliders
        const intensitySliders = document.querySelectorAll('.intensity-slider');
        intensitySliders.forEach(slider => {
            const valueDisplay = slider.parentElement.querySelector('.intensity-value');
            
            slider.addEventListener('input', (e) => {
                if (valueDisplay) {
                    valueDisplay.textContent = e.target.value;
                }
            });
            
            // Set initial value
            if (valueDisplay) {
                valueDisplay.textContent = slider.value;
            }
        });
        
        // Setup trigger checkboxes
        const triggerCheckboxes = document.querySelectorAll('.trigger-checkbox');
        triggerCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                // Update current triggers list
                this.updateCurrentTriggers();
            });
        });
    }
    
    updateCurrentTriggers() {
        const checkedBoxes = document.querySelectorAll('.trigger-checkbox:checked');
        const triggers = Array.from(checkedBoxes).map(cb => cb.value);
        
        if (this.currentMood) {
            this.currentMood.triggers = triggers;
        }
    }
    
    showTrendsTab(content) {
        content.innerHTML = `
            <div class="trends-overview">
                <h3>📈 Trends Over Last 30 Days</h3>
                
                <div class="chart-container">
                    <div class="chart-placeholder">
                        📊 Interactive chart with emotional state evolution<br>
                        <small>Chart.js implementation coming in next version</small>
                    </div>
                </div>
                
                <div class="trends-stats">
                    <div class="stat-grid">
                        <div class="stat-item">
                            <div class="stat-icon">📊</div>
                            <div class="stat-content">
                                <div class="stat-value">${this.getTrendStats().average}</div>
                                <div class="stat-label">Overall Average</div>
                            </div>
                        </div>
                        
                        <div class="stat-item">
                            <div class="stat-icon">📈</div>
                            <div class="stat-content">
                                <div class="stat-value">${this.getTrendStats().highest}</div>
                                <div class="stat-label">Best Day</div>
                            </div>
                        </div>
                        
                        <div class="stat-item">
                            <div class="stat-icon">📉</div>
                            <div class="stat-content">
                                <div class="stat-value">${this.getTrendStats().lowest}</div>
                                <div class="stat-label">Most Difficult Day</div>
                            </div>
                        </div>
                        
                        <div class="stat-item">
                            <div class="stat-icon">🎯</div>
                            <div class="stat-content">
                                <div class="stat-value">${this.getTrendStats().stability}%</div>
                                <div class="stat-label">Emotional Stability</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="weekly-breakdown">
                    <h4>Weekly Day Analysis</h4>
                    <div class="weekly-chart">
                        ${this.getWeeklyBreakdown().map(day => `
                            <div class="day-column">
                                <div class="day-bar" style="height: ${day.percentage}%">
                                    <span class="day-value">${day.average}</span>
                                </div>
                                <div class="day-label">${day.name}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    showPatternsTab(content) {
        const patterns = this.getDetectedPatterns();
        
        content.innerHTML = `
            <div class="patterns-analysis">
                <h3>🔍 Detected Patterns in Your RSD Behavior</h3>
                <p>Our algorithm has analyzed ${this.moodHistory.length} entries to identify recurring patterns.</p>
                
                <div class="pattern-list">
                    ${patterns.map(pattern => `
                        <div class="pattern-item" onclick="moodTracker.expandPattern('${pattern.id}')">
                            <div class="pattern-header">
                                <div class="pattern-title">
                                    <span class="pattern-icon">${pattern.icon}</span>
                                    ${pattern.title}
                                </div>
                                <div class="pattern-confidence">${pattern.confidence}% confidence</div>
                            </div>
                            
                            <div class="pattern-description">
                                ${pattern.description}
                            </div>
                            
                            <div class="pattern-stats">
                                <span><strong>Frequency:</strong> ${pattern.frequency || 'N/A'}</span>
                                <span><strong>Average Impact:</strong> ${pattern.impact || 'N/A'}/10</span>
                                <span><strong>Last Occurrence:</strong> ${pattern.lastOccurrence || 'N/A'}</span>
                            </div>
                            
                            <div class="pattern-triggers">
                                ${(pattern.triggers || []).map(trigger => `
                                    <span class="trigger-tag">${trigger}</span>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="pattern-insights">
                    <h4>💡 Pattern Insights</h4>
                    <div class="insights-grid">
                        ${this.getPatternInsights().map(insight => `
                            <div class="insight-card">
                                <div class="insight-icon">${insight.icon}</div>
                                <div class="insight-content">
                                    <h5>${insight.title}</h5>
                                    <p>${insight.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    showPredictionsTab(content) {
        const predictions = this.generatePredictions();
        
        content.innerHTML = `
            <div class="predictions-dashboard">
                <h3>🔮 Predictions for Next 7 Days</h3>
                <p>Based on detected patterns, the algorithm can predict RSD episode risk.</p>
                
                <div class="prediction-timeline">
                    ${predictions.map(pred => `
                        <div class="timeline-item ${pred.riskLevel}-risk">
                            <div class="timeline-date">${pred.date}</div>
                            <div class="timeline-content">
                                <div class="timeline-title">${pred.title}</div>
                                <div class="timeline-description">${pred.description}</div>
                                <div class="prediction-factors">
                                    <small><strong>Factors:</strong> ${pred.factors.join(', ')}</small>
                                </div>
                            </div>
                            <div class="risk-indicator ${pred.riskLevel}">
                                ${pred.riskLevel.toUpperCase()} RISK
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="prevention-strategies">
                    <h4>🛡️ Prevention Strategies</h4>
                    <div class="strategies-grid">
                        ${this.getPreventionStrategies().map(strategy => `
                            <div class="strategy-card">
                                <div class="strategy-header">
                                    <span class="strategy-icon">${strategy.icon}</span>
                                    <h5>${strategy.title}</h5>
                                </div>
                                <p>${strategy.description}</p>
                                <div class="strategy-actions">
                                    <button onclick="moodTracker.setReminder('${strategy.id}')" class="strategy-btn">
                                        ⏰ Set Reminder
                                    </button>
                                    <button onclick="moodTracker.learnMore('${strategy.id}')" class="strategy-btn secondary">
                                        📚 Learn More
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    showInsightsTab(content) {
        content.innerHTML = `
            <div class="insights-dashboard">
                <h3>💡 Personalized Insights</h3>
                <p>Advanced analysis of your emotional data for deeper understanding.</p>
                
                <div class="insights-categories">
                    <div class="insight-category">
                        <h4>🎯 Main Trigger Factors</h4>
                        <div class="triggers-analysis">
                            ${this.getTopTriggers().map(trigger => `
                                <div class="trigger-analysis">
                                    <div class="trigger-name">${trigger.name}</div>
                                    <div class="trigger-bar">
                                        <div class="trigger-fill" style="width: ${trigger.percentage}%"></div>
                                    </div>
                                    <div class="trigger-stats">
                                        ${trigger.occurrences} episodes (${trigger.percentage}%)
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="insight-category">
                        <h4>⏰ Vulnerable Moments</h4>
                        <div class="time-analysis">
                            <div class="time-heatmap">
                                ${this.getTimeVulnerability().map(hour => `
                                    <div class="hour-block ${hour.intensity}" title="${hour.label}">
                                        ${hour.hour}
                                    </div>
                                `).join('')}
                            </div>
                            <div class="time-insights">
                                <p><strong>Most vulnerable time:</strong> ${this.getMostVulnerableTime()}</p>
                                <p><strong>Most stable time:</strong> ${this.getMostStableTime()}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="insight-category">
                        <h4>📈 Progress Over Time</h4>
                        <div class="progress-analysis">
                            <div class="progress-metrics">
                                <div class="metric">
                                    <span class="metric-value">${this.getProgressMetrics().improvement}%</span>
                                    <span class="metric-label">Overall Improvement</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-value">${this.getProgressMetrics().stability}%</span>
                                    <span class="metric-label">Increased Stability</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-value">${this.getProgressMetrics().awareness}%</span>
                                    <span class="metric-label">Emotional Awareness</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="insight-category">
                        <h4>🎨 Effective Strategies</h4>
                        <div class="effective-strategies">
                            ${this.getEffectiveStrategies().map(strategy => `
                                <div class="strategy-effectiveness">
                                    <div class="strategy-info">
                                        <span class="strategy-icon">${strategy.icon}</span>
                                        <span class="strategy-name">${strategy.name}</span>
                                    </div>
                                    <div class="effectiveness-bar">
                                        <div class="effectiveness-fill" style="width: ${strategy.effectiveness}%"></div>
                                    </div>
                                    <div class="effectiveness-score">${strategy.effectiveness}%</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="insights-recommendations">
                    <h4>🚀 Progress Recommendations</h4>
                    <div class="recommendation-cards">
                        ${this.getPersonalizedRecommendations().map(rec => `
                            <div class="recommendation-card">
                                <div class="rec-header">
                                    <span class="rec-icon">${rec.icon}</span>
                                    <h5>${rec.title}</h5>
                                    <span class="rec-priority ${rec.priority}">${rec.priority}</span>
                                </div>
                                <p>${rec.description}</p>
                                <div class="rec-actions">
                                    <button onclick="moodTracker.implementRecommendation('${rec.id}')" class="implement-btn">
                                        ✅ Implement
                                    </button>
                                    <button onclick="moodTracker.scheduleRecommendation('${rec.id}')" class="schedule-btn">
                                        📅 Schedule
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Analytics and AI functions
    initializeAnalytics() {
        this.analytics = {
            patternRecognition: {
                minimumDataPoints: 7,
                confidenceThreshold: 0.7,
                algorithms: ['temporal', 'trigger', 'severity', 'recovery']
            },
            
            predictionModel: {
                lookAheadDays: 7,
                riskFactors: ['sleep', 'stress', 'social', 'work', 'health'],
                accuracyMetrics: []
            },
            
            personalization: {
                learningRate: 0.1,
                adaptationThreshold: 0.8,
                preferenceWeights: {}
            }
        };
    }
    
    analyzePatterns() {
        if (this.moodHistory.length < this.analytics.patternRecognition.minimumDataPoints) {
            return;
        }
        
        // Temporal patterns
        const temporalPatterns = this.detectTemporalPatterns();
        
        // Trigger patterns
        const triggerPatterns = this.detectTriggerPatterns();
        
        // Severity patterns
        const severityPatterns = this.detectSeverityPatterns();
        
        // Recovery patterns
        const recoveryPatterns = this.detectRecoveryPatterns();
        
        this.patterns = [
            ...temporalPatterns,
            ...triggerPatterns,
            ...severityPatterns,
            ...recoveryPatterns
        ].filter(pattern => pattern.confidence >= this.analytics.patternRecognition.confidenceThreshold);
    }
    
    // Helper functions for pattern analysis
    groupByWeekday() {
        const weeklyData = {};
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        // Initialize weekdays
        weekdays.forEach(day => {
            weeklyData[day] = [];
        });
        
        // Group mood entries by weekday
        this.moodHistory.forEach(entry => {
            const date = new Date(entry.timestamp);
            const dayName = weekdays[date.getDay()];
            weeklyData[dayName].push(entry.score);
        });
        
        return weeklyData;
    }
    
    findWorstDay(weeklyData) {
        let worstDay = null;
        let lowestAverage = 10;
        
        Object.keys(weeklyData).forEach(day => {
            const scores = weeklyData[day];
            if (scores.length >= 3) { // At least 3 data points
                const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
                if (average < lowestAverage) {
                    lowestAverage = average;
                    worstDay = {
                        day: day,
                        average: average.toFixed(1),
                        confidence: Math.min(scores.length / 10, 1) // Confidence based on sample size
                    };
                }
            }
        });
        
        return worstDay || { day: 'N/A', average: 0, confidence: 0 };
    }
    
    findBestDay(weeklyData) {
        let bestDay = null;
        let highestAverage = 0;
        
        Object.keys(weeklyData).forEach(day => {
            const scores = weeklyData[day];
            if (scores.length >= 3) { // At least 3 data points
                const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
                if (average > highestAverage) {
                    highestAverage = average;
                    bestDay = {
                        day: day,
                        average: average.toFixed(1),
                        confidence: Math.min(scores.length / 10, 1) // Confidence based on sample size
                    };
                }
            }
        });
        
        return bestDay || { day: 'N/A', average: 0, confidence: 0 };
    }
    
    groupByHour() {
        const hourlyData = {};
        
        // Initialize all 24 hours
        for (let i = 0; i < 24; i++) {
            hourlyData[i] = [];
        }
        
        // Group mood entries by hour
        this.moodHistory.forEach(entry => {
            const date = new Date(entry.timestamp);
            const hour = date.getHours();
            hourlyData[hour].push(entry.score);
        });
        
        return hourlyData;
    }
    
    findVulnerableHours(hourlyData) {
        const vulnerableHours = [];
        const threshold = 5; // Scores below 5 are considered vulnerable
        
        Object.keys(hourlyData).forEach(hour => {
            const scores = hourlyData[hour];
            if (scores.length >= 2) { // At least 2 data points
                const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
                if (average < threshold) {
                    vulnerableHours.push(`${hour}:00-${hour}:59`);
                }
            }
        });
        
        return vulnerableHours;
    }
    
    detectTemporalPatterns() {
        const patterns = [];
        
        // Weekly patterns
        const weeklyData = this.groupByWeekday();
        const worstDay = this.findWorstDay(weeklyData);
        const bestDay = this.findBestDay(weeklyData);
        
        if (worstDay.confidence > 0.7) {
            patterns.push({
                id: 'weekly-low',
                type: 'temporal',
                title: `Weekly Pattern: Difficulties on ${worstDay.day}s`,
                description: `Analysis shows you feel most vulnerable on ${worstDay.day}s, with an average of ${worstDay.average}/10.`,
                confidence: Math.round(worstDay.confidence * 100),
                icon: '📅',
                frequency: 'Weekly',
                impact: worstDay.average,
                lastOccurrence: worstDay.lastOccurrence || 'Recent',
                triggers: worstDay.commonTriggers || ['Stress', 'Fatigue']
            });
        }
        
        // Hourly patterns
        const hourlyData = this.groupByHour();
        const vulnerableHours = this.findVulnerableHours(hourlyData);
        
        if (vulnerableHours.length > 0) {
            patterns.push({
                id: 'hourly-vulnerability',
                type: 'temporal',
                title: 'Daily Pattern: Vulnerable Hours',
                description: `You are most vulnerable between ${vulnerableHours.join(', ')}.`,
                confidence: 85,
                icon: '🕐',
                frequency: 'Daily',
                impact: 6,
                lastOccurrence: 'Today',
                triggers: ['Fatigue', 'Accumulated Stress']
            });
        }
        
        return patterns;
    }
    
    analyzeTriggers() {
        const triggerMap = {};
        
        // Analyze all mood entries for triggers
        this.moodHistory.forEach(entry => {
            if (entry.triggers && entry.triggers.length > 0) {
                entry.triggers.forEach(trigger => {
                    if (!triggerMap[trigger]) {
                        triggerMap[trigger] = {
                            name: trigger,
                            frequency: 0,
                            totalImpact: 0,
                            scores: [],
                            lastOccurrence: null,
                            icon: this.getTriggerIcon(trigger)
                        };
                    }
                    
                    triggerMap[trigger].frequency++;
                    triggerMap[trigger].totalImpact += (10 - entry.score); // Higher impact for lower scores
                    triggerMap[trigger].scores.push(entry.score);
                    triggerMap[trigger].lastOccurrence = entry.timestamp;
                });
            }
        });
        
        // Calculate statistics and convert to array
        return Object.values(triggerMap).map(trigger => ({
            ...trigger,
            impact: trigger.totalImpact / trigger.frequency, // Average impact
            reliability: Math.min(trigger.frequency / 10, 1), // Confidence based on frequency
            averageScore: trigger.scores.reduce((sum, score) => sum + score, 0) / trigger.scores.length
        })).sort((a, b) => b.frequency - a.frequency);
    }
    
    getTriggerIcon(trigger) {
        const iconMap = {
            'rejection': '❌',
            'criticism': '💬',
            'conflict': '⚔️',
            'abandonment': '🚪',
            'disappointment': '😞',
            'failure': '💔',
            'stress': '😰',
            'fatigue': '😴',
            'loneliness': '😢',
            'anxiety': '😨',
            'respingere': '❌',
            'critica': '💬',
            'conflict': '⚔️',
            'abandon': '🚪',
            'dezamăgire': '😞',
            'eșec': '💔',
            'stres': '😰',
            'oboseală': '😴',
            'singurătate': '😢',
            'anxietate': '😨'
        };
        
        return iconMap[trigger.toLowerCase()] || '⚠️';
    }
    
    detectTriggerPatterns() {
        const patterns = [];
        const triggerAnalysis = this.analyzeTriggers();
        
        triggerAnalysis.forEach(trigger => {
            if (trigger.frequency > 5 && trigger.impact > 6) {
                patterns.push({
                    id: `trigger-${trigger.name}`,
                    type: 'trigger',
                    title: `Trigger Pattern: ${trigger.name}`,
                    description: `${trigger.name} triggers RSD episodes in ${trigger.frequency} of entries, with an average impact of ${trigger.impact}/10.`,
                    confidence: Math.round(trigger.reliability * 100),
                    icon: trigger.icon,
                    frequency: `${trigger.frequency} episodes`,
                    impact: trigger.impact,
                    lastOccurrence: trigger.lastOccurrence,
                    triggers: [trigger.name]
                });
            }
        });
        
        return patterns;
    }
    
    detectSeverityPatterns() {
        const patterns = [];
        const recentMoods = this.moodHistory.slice(-30); // Last 30 entries
        
        if (recentMoods.length >= 10) {
            const lowMoods = recentMoods.filter(mood => mood.score <= 3);
            const severityPercentage = (lowMoods.length / recentMoods.length) * 100;
            
            if (severityPercentage > 40) {
                patterns.push({
                    id: 'high-severity',
                    type: 'severity',
                    title: 'High Severity Pattern',
                    description: `${severityPercentage.toFixed(1)}% of recent entries indicate severe emotional states (≤3/10).`,
                    confidence: Math.round(Math.min(recentMoods.length / 20, 1) * 100),
                    icon: '⚠️',
                    frequency: `${lowMoods.length} out of ${recentMoods.length} entries`,
                    impact: 8,
                    triggers: this.getCommonSevereTriggers(lowMoods)
                });
            }
        }
        
        return patterns;
    }
    
    detectRecoveryPatterns() {
        const patterns = [];
        const recoveryData = this.analyzeRecoveryTimes();
        
        if (recoveryData.averageRecoveryTime) {
            patterns.push({
                id: 'recovery-time',
                type: 'recovery',
                title: `Recovery Pattern: ${recoveryData.averageRecoveryTime}`,
                description: `On average, you take ${recoveryData.averageRecoveryTime} to recover after an RSD episode.`,
                confidence: Math.round(recoveryData.confidence * 100),
                icon: '🔄',
                frequency: `${recoveryData.episodeCount} episodes analyzed`,
                impact: recoveryData.impactLevel,
                triggers: recoveryData.helpfulFactors
            });
        }
        
        return patterns;
    }
    
    getCommonSevereTriggers(lowMoods) {
        const triggers = {};
        lowMoods.forEach(mood => {
            if (mood.triggers) {
                mood.triggers.forEach(trigger => {
                    triggers[trigger] = (triggers[trigger] || 0) + 1;
                });
            }
        });
        
        return Object.keys(triggers)
            .sort((a, b) => triggers[b] - triggers[a])
            .slice(0, 3);
    }
    
    analyzeRecoveryTimes() {
        const episodes = this.identifyEpisodes();
        if (episodes.length < 3) {
            return { confidence: 0 };
        }
        
        const recoveryTimes = episodes
            .filter(episode => episode.recoveryTime)
            .map(episode => episode.recoveryTime);
        
        if (recoveryTimes.length === 0) {
            return { confidence: 0 };
        }
        
        const average = recoveryTimes.reduce((sum, time) => sum + time, 0) / recoveryTimes.length;
        const averageHours = Math.round(average / (1000 * 60 * 60));
        
        return {
            averageRecoveryTime: this.formatRecoveryTime(averageHours),
            confidence: Math.min(recoveryTimes.length / 10, 1),
            episodeCount: episodes.length,
            impactLevel: averageHours > 24 ? 7 : averageHours > 12 ? 5 : 3,
            helpfulFactors: this.findHelpfulRecoveryFactors(episodes)
        };
    }
    
    identifyEpisodes() {
        // Simplified episode identification
        const episodes = [];
        let currentEpisode = null;
        
        this.moodHistory.forEach((mood, index) => {
            if (mood.score <= 3) { // Start of low mood
                if (!currentEpisode) {
                    currentEpisode = {
                        start: mood.timestamp,
                        lowestScore: mood.score,
                        entries: [mood]
                    };
                } else {
                    currentEpisode.entries.push(mood);
                    if (mood.score < currentEpisode.lowestScore) {
                        currentEpisode.lowestScore = mood.score;
                    }
                }
            } else if (currentEpisode && mood.score >= 6) { // Recovery
                currentEpisode.end = mood.timestamp;
                currentEpisode.recoveryTime = currentEpisode.end - currentEpisode.start;
                episodes.push(currentEpisode);
                currentEpisode = null;
            } else if (currentEpisode) {
                currentEpisode.entries.push(mood);
            }
        });
        
        return episodes;
    }
    
    formatRecoveryTime(hours) {
        if (hours < 24) {
            return `${hours} hours`;
        } else {
            const days = Math.round(hours / 24);
            return `${days} ${days === 1 ? 'day' : 'days'}`;
        }
    }
    
    findHelpfulRecoveryFactors(episodes) {
        // This would analyze what helped during recovery
        return ['Breathing Techniques', 'Social Support', 'Rest'];
    }
    
    generatePredictions() {
        const predictions = [];
        const nextWeek = this.getNextWeekDates();
        
        nextWeek.forEach((date, index) => {
            const riskScore = this.calculateRiskScore(date);
            const riskLevel = this.getRiskLevel(riskScore);
            
            predictions.push({
                date: this.formatDate(date),
                riskLevel: riskLevel,
                title: this.getPredictionTitle(riskLevel, date),
                description: this.getPredictionDescription(riskLevel, date),
                factors: this.getRiskFactors(date),
                recommendations: this.getDateRecommendations(date, riskLevel)
            });
        });
        
        return predictions;
    }
    
    // Prediction helper functions
    getNextWeekDates() {
        const dates = [];
        const today = new Date();
        
        for (let i = 1; i <= 7; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            dates.push(futureDate);
        }
        
        return dates;
    }
    
    calculateRiskScore(date) {
        // Analyze patterns to predict risk
        const dayOfWeek = date.getDay();
        const hour = date.getHours();
        
        // Base risk from historical patterns
        let riskScore = 0.3; // Base 30% risk
        
        // Weekday analysis
        const weeklyData = this.groupByWeekday();
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = weekdays[dayOfWeek];
        const dayScores = weeklyData[dayName] || [];
        
        if (dayScores.length >= 3) {
            const dayAverage = dayScores.reduce((sum, score) => sum + score, 0) / dayScores.length;
            if (dayAverage < 5) riskScore += 0.3;
            else if (dayAverage < 6) riskScore += 0.1;
        }
        
        // Time-based risk
        const hourlyData = this.groupByHour();
        const hourScores = hourlyData[hour] || [];
        if (hourScores.length >= 2) {
            const hourAverage = hourScores.reduce((sum, score) => sum + score, 0) / hourScores.length;
            if (hourAverage < 4) riskScore += 0.2;
            else if (hourAverage < 5) riskScore += 0.1;
        }
        
        // Recent trend analysis
        const recentEntries = this.moodHistory.slice(0, 7);
        if (recentEntries.length > 0) {
            const recentAverage = recentEntries.reduce((sum, entry) => sum + entry.score, 0) / recentEntries.length;
            if (recentAverage < 4) riskScore += 0.3;
            else if (recentAverage < 6) riskScore += 0.1;
        }
        
        return Math.min(1, riskScore); // Cap at 100%
    }
    
    getRiskLevel(riskScore) {
        if (riskScore >= 0.7) return 'high';
        if (riskScore >= 0.4) return 'medium';
        return 'low';
    }
    
    formatDate(date) {
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    getPredictionTitle(riskLevel, date) {
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        
        switch (riskLevel) {
            case 'high':
                return `⚠️ High Risk Day - ${dayName}`;
            case 'medium':
                return `⚡ Moderate Risk - ${dayName}`;
            default:
                return `✅ Stable Day - ${dayName}`;
        }
    }
    
    getPredictionDescription(riskLevel, date) {
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        
        switch (riskLevel) {
            case 'high':
                return `Pattern analysis suggests ${dayName} may be challenging. Consider preventive strategies and have support ready.`;
            case 'medium':
                return `${dayName} shows moderate risk factors. Stay aware of triggers and practice coping techniques.`;
            default:
                return `${dayName} looks stable based on your patterns. Good day for challenging activities or social events.`;
        }
    }
    
    getRiskFactors(date) {
        const factors = [];
        const dayOfWeek = date.getDay();
        
        // Historical day-based factors
        if (dayOfWeek === 1) factors.push('Monday Transition');
        if (dayOfWeek === 0 || dayOfWeek === 6) factors.push('Weekend Pattern');
        if (dayOfWeek >= 1 && dayOfWeek <= 5) factors.push('Workday Stress');
        
        // Add random factors for demo
        const possibleFactors = ['Sleep Debt', 'Social Events', 'Work Pressure', 'Weather Changes'];
        const randomFactor = possibleFactors[Math.floor(Math.random() * possibleFactors.length)];
        factors.push(randomFactor);
        
        return factors;
    }
    
    getDateRecommendations(date, riskLevel) {
        const recommendations = [];
        
        switch (riskLevel) {
            case 'high':
                recommendations.push('Morning grounding exercise');
                recommendations.push('Avoid major decisions');
                recommendations.push('Extra self-care time');
                break;
            case 'medium':
                recommendations.push('Check in with support network');
                recommendations.push('Practice breathing techniques');
                break;
            default:
                recommendations.push('Good day for social activities');
                recommendations.push('Consider new challenges');
                break;
        }
        
        return recommendations;
    }
    
    // UI Helper functions
    getMoodEmoji(score) {
        if (score <= 2) return '😢';
        if (score <= 4) return '😔';
        if (score <= 5) return '😐';
        if (score <= 7) return '🙂';
        if (score <= 9) return '😊';
        return '😄';
    }
    
    getMoodDescription(score) {
        if (score <= 2) return 'Very Difficult';
        if (score <= 4) return 'Quite Hard';
        if (score <= 5) return 'Neutral';
        if (score <= 7) return 'Quite Good';
        if (score <= 9) return 'Very Good';
        return 'Excellent';
    }
    
    // Quick Widget functions
    toggleWidget() {
        const content = document.getElementById('widget-content');
        const header = document.querySelector('.widget-header');
        
        if (content.style.display === 'none') {
            content.style.display = 'block';
            header.classList.add('expanded');
        } else {
            content.style.display = 'none';
            header.classList.remove('expanded');
        }
    }
    
    updateQuickMood(value) {
        document.getElementById('mood-value').textContent = value;
        document.querySelector('.widget-icon').textContent = this.getMoodEmoji(parseInt(value));
    }
    
    logQuickMood() {
        const score = parseInt(document.getElementById('quick-mood-slider').value);
        this.saveMoodEntry({
            score: score,
            timestamp: Date.now(),
            type: 'quick',
            triggers: [],
            notes: ''
        });
        
        this.showQuickFeedback();
        this.toggleWidget();
    }
    
    showQuickFeedback() {
        // Show brief feedback animation
        const widget = document.querySelector('.quick-widget');
        widget.style.animation = 'none';
        widget.offsetHeight; // Force reflow
        widget.style.animation = 'widgetPulse 0.6s ease-out';
    }
    
    // Data persistence
    loadMoodHistory() {
        const saved = localStorage.getItem('moodTrackingHistory');
        if (saved) {
            this.moodHistory = JSON.parse(saved);
        } else {
            // Generate sample data for demo
            this.generateSampleData();
        }
    }
    
    saveMoodHistory() {
        localStorage.setItem('moodTrackingHistory', JSON.stringify(this.moodHistory));
    }
    
    saveMoodEntry(entry) {
        this.moodHistory.unshift(entry);
        this.saveMoodHistory();
        this.analyzePatterns();
    }
    
    generateSampleData() {
        // Generate 30 days of sample mood data
        const now = Date.now();
        const sampleData = [];
        
        for (let i = 0; i < 30; i++) {
            const date = now - (i * 24 * 60 * 60 * 1000);
            const baseScore = 5 + Math.sin(i * 0.2) * 2; // Sine wave variation
            const noise = (Math.random() - 0.5) * 2; // Random noise
            const score = Math.max(1, Math.min(10, Math.round(baseScore + noise)));
            
            sampleData.push({
                score: score,
                timestamp: date,
                type: 'manual',
                triggers: this.getRandomTriggers(),
                notes: this.getRandomNote()
            });
        }
        
        this.moodHistory = sampleData;
        this.saveMoodHistory();
    }
    
    getRandomTriggers() {
        const allTriggers = ['work', 'relationships', 'social', 'sleep', 'health'];
        const count = Math.floor(Math.random() * 3);
        return allTriggers.sort(() => 0.5 - Math.random()).slice(0, count);
    }
    
    getRandomNote() {
        const notes = [
            'Regular day',
            'Felt better after exercise',
            'Work conflict affected me',
            'Good sleep, positive energy',
            'Social anxiety, avoidance',
            'Nice conversation with a friend'
        ];
        return Math.random() > 0.5 ? notes[Math.floor(Math.random() * notes.length)] : '';
    }
    
    // Utility functions for data analysis
    getCurrentMood() {
        if (this.moodHistory.length === 0) {
            return { score: 5, time: 'Never' };
        }
        
        const latest = this.moodHistory[0];
        return {
            score: latest.score,
            time: this.formatTimeAgo(latest.timestamp)
        };
    }
    
    getTodayEntries() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return this.moodHistory.filter(entry => {
            const entryDate = new Date(entry.timestamp);
            entryDate.setHours(0, 0, 0, 0);
            return entryDate.getTime() === today.getTime();
        });
    }
    
    calculateDailyAverage() {
        const todayEntries = this.getTodayEntries();
        if (todayEntries.length === 0) return 'N/A';
        
        const sum = todayEntries.reduce((acc, entry) => acc + entry.score, 0);
        return (sum / todayEntries.length).toFixed(1);
    }
    
    calculateVariability() {
        const todayEntries = this.getTodayEntries();
        if (todayEntries.length < 2) return 'Insufficient data';
        
        const scores = todayEntries.map(e => e.score);
        const max = Math.max(...scores);
        const min = Math.min(...scores);
        const range = max - min;
        
        if (range <= 2) return 'Stable';
        if (range <= 4) return 'Moderate';
        return 'Variable';
    }
    
    getRiskFactors() {
        // Mock implementation
        return [
            { icon: '😴', name: 'Insufficient sleep', level: 'medium' },
            { icon: '💼', name: 'Work stress', level: 'high' },
            { icon: '📱', name: 'Social media', level: 'low' }
        ];
    }
    
    getTodayRecommendations() {
        return [
            { id: 'breathing', icon: '🫁', text: '5-minute breathing exercise' },
            { id: 'walk', icon: '🚶', text: '15-minute nature walk' },
            { id: 'journal', icon: '📝', text: '10-minute emotion journaling' }
        ];
    }
    
    formatTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (minutes < 60) return `${minutes} minutes ago`;
        if (hours < 24) return `${hours} hours ago`;
        if (days === 1) return 'Yesterday';
        return `${days} days ago`;
    }
    
    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (this.isActive && e.key === 'Escape') {
                this.hide();
            }
        });
        
        // Auto-show reminder
        this.setupDailyReminder();
    }
    
    setupDailyReminder() {
        // Show reminder if no entry today
        const todayEntries = this.getTodayEntries();
        if (todayEntries.length === 0) {
            setTimeout(() => {
                this.showReminderNotification();
            }, 5000); // Show after 5 seconds
        }
    }
    
    showReminderNotification() {
        if (Notification.permission === 'granted') {
            new Notification('TooSensitive - Mood Tracking', {
                body: 'Don\'t forget to record your emotional state today!',
                icon: '/favicon.ico'
            });
        }
    }
    
    startDailyTracking() {
        // Setup automatic tracking triggers
        setInterval(() => {
            if (window.crisisDetector && window.crisisDetector.currentLevel >= 3) {
                this.autoLogMoodFromCrisis();
            }
        }, 60000); // Check every minute
    }
    
    autoLogMoodFromCrisis() {
        const crisisLevel = window.crisisDetector.currentLevel;
        const estimatedMood = Math.max(1, 6 - crisisLevel);
        
        this.saveMoodEntry({
            score: estimatedMood,
            timestamp: Date.now(),
            type: 'auto-crisis',
            triggers: ['rsd-episode'],
            notes: 'Automatic recording from crisis detection'
        });
    }
    
    // Missing trend analysis functions
    getTrendStats() {
        if (this.moodHistory.length === 0) {
            return {
                average: 'N/A',
                highest: 'N/A',
                lowest: 'N/A',
                stability: 'N/A'
            };
        }
        
        const recent30Days = this.moodHistory.slice(0, 30);
        const scores = recent30Days.map(entry => entry.score);
        
        const average = (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1);
        const highest = Math.max(...scores);
        const lowest = Math.min(...scores);
        
        // Calculate stability (inverse of variance)
        const mean = parseFloat(average);
        const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
        const stability = Math.max(0, Math.round(100 - (variance * 10)));
        
        return {
            average: average,
            highest: highest,
            lowest: lowest,
            stability: stability
        };
    }
    
    getWeeklyBreakdown() {
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const weeklyData = this.groupByWeekday();
        
        return weekdays.map(day => {
            const scores = weeklyData[day] || [];
            const average = scores.length > 0 ? 
                (scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0;
            
            return {
                name: day.substring(0, 3), // Mon, Tue, etc.
                average: average.toFixed(1),
                percentage: Math.max(5, (average / 10) * 100) // Min 5% for visibility
            };
        });
    }
    
    getDetectedPatterns() {
        // Return patterns from analysis or empty array
        return this.patterns || [];
    }
    
    getPatternInsights() {
        return [
            {
                icon: '📊',
                title: 'Emotional Awareness',
                description: 'You\'re developing better awareness of your emotional patterns through consistent tracking.'
            },
            {
                icon: '🎯',
                title: 'Trigger Recognition',
                description: 'Pattern analysis helps identify your main RSD triggers for better management.'
            },
            {
                icon: '📈',
                title: 'Recovery Tracking',
                description: 'Monitoring your recovery times helps optimize coping strategies.'
            }
        ];
    }
    
    getPreventionStrategies() {
        return [
            {
                id: 'mindfulness',
                icon: '🧘',
                title: 'Daily Mindfulness',
                description: 'Practice 10 minutes of mindfulness meditation to build emotional resilience.'
            },
            {
                id: 'sleep-hygiene',
                icon: '😴',
                title: 'Sleep Optimization',
                description: 'Maintain consistent sleep schedule as poor sleep increases RSD vulnerability.'
            },
            {
                id: 'social-boundaries',
                icon: '🛡️',
                title: 'Healthy Boundaries',
                description: 'Set clear boundaries in relationships to reduce rejection sensitivity triggers.'
            }
        ];
    }
    
    getTopTriggers() {
        const triggerAnalysis = this.analyzeTriggers();
        const total = triggerAnalysis.reduce((sum, trigger) => sum + trigger.frequency, 0);
        
        return triggerAnalysis.slice(0, 5).map(trigger => ({
            name: trigger.name.charAt(0).toUpperCase() + trigger.name.slice(1),
            occurrences: trigger.frequency,
            percentage: total > 0 ? Math.round((trigger.frequency / total) * 100) : 0
        }));
    }
    
    getTimeVulnerability() {
        const hours = [];
        const hourlyData = this.groupByHour();
        
        for (let i = 0; i < 24; i++) {
            const scores = hourlyData[i] || [];
            const average = scores.length > 0 ? 
                scores.reduce((sum, score) => sum + score, 0) / scores.length : 5;
            
            let intensity = 'low';
            if (average < 4) intensity = 'high';
            else if (average < 6) intensity = 'medium';
            
            hours.push({
                hour: i,
                intensity: intensity,
                label: `${i}:00 - Avg: ${average.toFixed(1)}`
            });
        }
        
        return hours;
    }
    
    getMostVulnerableTime() {
        const timeData = this.getTimeVulnerability();
        const mostVulnerable = timeData.reduce((min, hour) => 
            hour.intensity === 'high' ? hour : min, null);
        
        return mostVulnerable ? `${mostVulnerable.hour}:00` : 'No pattern detected';
    }
    
    getMostStableTime() {
        const hourlyData = this.groupByHour();
        let bestHour = 12; // Default to noon
        let bestAverage = 0;
        
        for (let i = 0; i < 24; i++) {
            const scores = hourlyData[i] || [];
            if (scores.length >= 2) {
                const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
                if (average > bestAverage) {
                    bestAverage = average;
                    bestHour = i;
                }
            }
        }
        
        return `${bestHour}:00`;
    }
    
    getProgressMetrics() {
        if (this.moodHistory.length < 14) {
            return {
                improvement: 'N/A',
                stability: 'N/A',
                awareness: 'N/A'
            };
        }
        
        const firstWeek = this.moodHistory.slice(-14, -7);
        const secondWeek = this.moodHistory.slice(-7);
        
        const firstAvg = firstWeek.reduce((sum, entry) => sum + entry.score, 0) / firstWeek.length;
        const secondAvg = secondWeek.reduce((sum, entry) => sum + entry.score, 0) / secondWeek.length;
        
        const improvement = Math.max(0, Math.round(((secondAvg - firstAvg) / firstAvg) * 100));
        const stability = Math.round(Math.random() * 30 + 60); // Mock data
        const awareness = Math.round(Math.random() * 20 + 70); // Mock data
        
        return {
            improvement: improvement,
            stability: stability,
            awareness: awareness
        };
    }
    
    getEffectiveStrategies() {
        return [
            {
                icon: '🫁',
                name: 'Breathing Exercises',
                effectiveness: 85
            },
            {
                icon: '🚶',
                name: 'Physical Activity',
                effectiveness: 78
            },
            {
                icon: '📝',
                name: 'Journaling',
                effectiveness: 72
            },
            {
                icon: '🧘',
                name: 'Meditation',
                effectiveness: 69
            }
        ];
    }
    
    getPersonalizedRecommendations() {
        return [
            {
                id: 'morning-routine',
                icon: '🌅',
                title: 'Morning Stability Routine',
                description: 'Start each day with a 5-minute grounding exercise to build emotional resilience.',
                priority: 'high'
            },
            {
                id: 'trigger-journal',
                icon: '📖',
                title: 'Trigger Pattern Journal',
                description: 'Keep a detailed log of what triggers your RSD episodes for better prevention.',
                priority: 'medium'
            },
            {
                id: 'social-support',
                icon: '👥',
                title: 'Expand Support Network',
                description: 'Connect with others who understand RSD to reduce isolation.',
                priority: 'high'
            }
        ];
    }
    
    // Action functions for UI interactions
    setReminder(strategyId) {
        console.log(`Setting reminder for strategy: ${strategyId}`);
        // Implementation would integrate with notification system
    }
    
    learnMore(strategyId) {
        console.log(`Learning more about strategy: ${strategyId}`);
        // Implementation would open educational content
    }
    
    implementRecommendation(recId) {
        console.log(`Implementing recommendation: ${recId}`);
        // Implementation would guide user through recommendation
    }
    
    scheduleRecommendation(recId) {
        console.log(`Scheduling recommendation: ${recId}`);
        // Implementation would add to calendar/reminders
    }
    
    expandPattern(patternId) {
        console.log(`Expanding pattern details: ${patternId}`);
        // Implementation would show detailed pattern analysis
    }
    
    applyRecommendation(recId) {
        console.log(`Applying recommendation: ${recId}`);
        // Implementation would execute the recommendation action
    }
    
    saveDetailedEntry() {
        const mood = document.getElementById('detailed-mood')?.value || 5;
        const notes = document.getElementById('mood-notes')?.value || '';
        const triggers = Array.from(document.querySelectorAll('.trigger-checkboxes input:checked'))
            .map(cb => cb.value);
        
        this.saveMoodEntry({
            score: parseInt(mood),
            timestamp: Date.now(),
            type: 'detailed',
            triggers: triggers,
            notes: notes
        });
        
        // Refresh the current tab
        this.showTab('today');
    }
}

// Global functions
function closeMoodTracking() {
    if (window.moodTracker) {
        window.moodTracker.hide();
    }
}

function showMoodTracking() {
    if (window.moodTracker) {
        window.moodTracker.show();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing Mood Tracking System...');
    try {
        window.moodTracker = new MoodTrackingSystem();
        console.log('✅ window.moodTracker created:', window.moodTracker);
    } catch (error) {
        console.error('❌ Error creating MoodTrackingSystem:', error);
    }
});