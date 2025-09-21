/**
 * AI Emergency Companion for RSD Support
 * Intelligent chatbot specialized in Rejection Sensitive Dysphoria crisis support
 */

class RSDEmergencyCompanion {
    constructor() {
        this.isActive = false;
        this.conversationHistory = [];
        this.userState = {
            crisisLevel: 'stable',
            emotions: [],
            triggers: [],
            copingPreferences: [],
            timeInConversation: 0
        };
        
        this.responses = this.initializeResponses();
        this.init();
    }
    
    init() {
        this.createChatInterface();
        this.loadUserPreferences();
        this.setupEventListeners();
    }
    
    initializeResponses() {
        return {
            // Greeting responses based on crisis level
            greetings: {
                stable: [
                    "Hi! I'm here to listen. How are you feeling today?",
                    "Hello! I notice you came to talk. What's happening?",
                    "Hey, I'm glad to see you. Would you like to tell me how you're feeling?"
                ],
                mild: [
                    "I notice you might be going through a difficult moment. I'm here for you.",
                    "Hi. I sense you might need support right now. How can I help you?",
                    "Hello! I'm here to listen, no matter what you're feeling."
                ],
                severe: [
                    "I'm here with you right now. You're not alone in this.",
                    "I can see this is very hard for you right now. Let's get through this together.",
                    "I'm here to support you. Do you want to tell me what's happening?"
                ],
                critical: [
                    "I'm with you in this very difficult moment. You matter.",
                    "I recognize that right now it seems impossible to get through, but you're not alone. I'm here.",
                    "This pain is real and intense. Let's find ways together to make it easier."
                ]
            },
            
            // Empathic validation responses
            validation: [
                "I understand that it's very painful to feel rejected.",
                "RSD can make any interaction seem like total rejection. It's normal to feel this way.",
                "Your emotions are valid. RSD amplifies everything, but you're not too much.",
                "I know right now it seems like you'll never get through this, but you will.",
                "It's not your fault that you feel so intensely. Your brain processes rejection differently."
            ],
            
            // Crisis-specific responses
            crisis: {
                overwhelm: [
                    "When everything feels overwhelming, let's focus on breathing. Breathe with me: 1, 2, 3, 4...",
                    "I know it feels like it will never end, but this wave of emotions will pass.",
                    "Let's do something very simple together: tell me 5 things you can see right now."
                ],
                isolation: [
                    "I know right now you feel like nobody cares, but that's not true. I care.",
                    "RSD makes you believe you're alone, but there are many people who understand exactly what you're going through.",
                    "This feeling of isolation is temporary. It doesn't reflect the reality of your relationships."
                ],
                worthlessness: [
                    "Your worth is not measured by others' reactions to you.",
                    "RSD doesn't define who you are. You are more than these moments of pain.",
                    "Even if you don't feel it right now, you have intrinsic value as a human being."
                ]
            },
            
            // Coping suggestions
            coping: {
                breathing: [
                    "Let's do the 4-7-8 technique together: Inhale 4, hold 7, exhale 8. Ready to start?",
                    "Box breathing can help: 4 in, 4 hold, 4 out, 4 pause. Shall we try it?",
                    "Let's focus on slow, deep breathing. I'll guide you."
                ],
                grounding: [
                    "Let's use the 5-4-3-2-1 technique: 5 things you see, 4 things you touch...",
                    "Put your feet on the floor and feel how they support you. You're here, you're safe.",
                    "Let's connect with your body: how do your shoulders feel right now? Are they tense?"
                ],
                distraction: [
                    "Let's try something different: can you name 3 songs you like?",
                    "What color comes to mind when you think of safety?",
                    "Describe your favorite place in the world to me. What does it look like?"
                ]
            },
            
            // Recovery and follow-up
            recovery: [
                "I notice you're starting to feel a little better. That's wonderful.",
                "You've gotten through the hardest part. How are you feeling now?",
                "You're so brave for staying here with me through all of this.",
                "What techniques worked best for you today?"
            ]
        };
    }
    
    createChatInterface() {
        const chatHTML = `
            <div id="rsd-companion" class="companion-widget" style="display: none;">
                <div class="companion-header">
                    <div class="companion-avatar">🤗</div>
                    <div class="companion-info">
                        <div class="companion-name">RSD Companion</div>
                        <div class="companion-status">Here for you</div>
                    </div>
                    <button class="companion-close" onclick="toggleCompanion()">&times;</button>
                </div>
                
                <div class="companion-messages" id="companion-messages">
                    <div class="companion-message bot">
                        <div class="message-content">
                            Hi! I'm here to listen and support you when RSD becomes overwhelming. 
                            How are you feeling right now?
                        </div>
                        <div class="message-time">${this.getCurrentTime()}</div>
                    </div>
                </div>
                
                <div class="companion-input-area">
                    <div class="quick-responses" id="quick-responses">
                        <button class="quick-btn" onclick="selectQuickResponse('I feel overwhelmed')">
                            I feel overwhelmed
                        </button>
                        <button class="quick-btn" onclick="selectQuickResponse('I need help')">
                            I need help
                        </button>
                        <button class="quick-btn" onclick="selectQuickResponse('I want to talk')">
                            I want to talk
                        </button>
                    </div>
                    
                    <div class="input-container">
                        <textarea 
                            id="companion-input" 
                            placeholder="Tell me how you're feeling..."
                            rows="2"
                            onkeypress="handleInputKeypress(event)"
                        ></textarea>
                        <button id="send-btn" onclick="sendMessage()">📤</button>
                    </div>
                </div>
                
                <div class="companion-tools">
                    <button class="tool-btn" onclick="startBreathingGuide()">
                        🫁 Guided Breathing
                    </button>
                    <button class="tool-btn" onclick="startGroundingExercise()">
                        🌱 Grounding
                    </button>
                    <button class="tool-btn" onclick="showEmergencyContacts()">
                        📞 Emergency
                    </button>
                </div>
            </div>
            
            <div id="companion-trigger" class="companion-trigger" onclick="toggleCompanion()">
                <div class="trigger-icon">💙</div>
                <div class="trigger-text">Need to talk?</div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatHTML);
        this.addCompanionStyles();
    }
    
    addCompanionStyles() {
        const styles = `
            .companion-trigger {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #4d7a79, #6a9999);
                color: white;
                padding: 15px 20px;
                border-radius: 50px;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(77, 122, 121, 0.3);
                display: flex;
                align-items: center;
                gap: 10px;
                transition: all 0.3s ease;
                z-index: 1000;
                animation: gentlePulse 3s infinite;
            }
            
            .companion-trigger:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 25px rgba(77, 122, 121, 0.4);
            }
            
            @keyframes gentlePulse {
                0%, 100% { box-shadow: 0 4px 20px rgba(77, 122, 121, 0.3); }
                50% { box-shadow: 0 4px 20px rgba(77, 122, 121, 0.6); }
            }
            
            .companion-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px;
                height: 500px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                display: flex;
                flex-direction: column;
                z-index: 1001;
                overflow: hidden;
                animation: slideUp 0.3s ease-out;
            }
            
            @keyframes slideUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .companion-header {
                background: linear-gradient(135deg, #4d7a79, #6a9999);
                color: white;
                padding: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .companion-avatar {
                font-size: 24px;
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .companion-info {
                flex: 1;
            }
            
            .companion-name {
                font-weight: bold;
                font-size: 16px;
            }
            
            .companion-status {
                font-size: 12px;
                opacity: 0.9;
            }
            
            .companion-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .companion-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .companion-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background: #f8f9fa;
            }
            
            .companion-message {
                margin-bottom: 15px;
                display: flex;
                flex-direction: column;
            }
            
            .companion-message.bot .message-content {
                background: white;
                border: 1px solid #e9ecef;
                border-left: 4px solid #4d7a79;
                align-self: flex-start;
                max-width: 85%;
            }
            
            .companion-message.user .message-content {
                background: #4d7a79;
                color: white;
                align-self: flex-end;
                max-width: 85%;
            }
            
            .message-content {
                padding: 12px 15px;
                border-radius: 15px;
                line-height: 1.4;
                word-wrap: break-word;
            }
            
            .message-time {
                font-size: 11px;
                color: #6c757d;
                margin-top: 5px;
                align-self: flex-end;
            }
            
            .companion-message.bot .message-time {
                align-self: flex-start;
            }
            
            .quick-responses {
                padding: 10px;
                display: flex;
                gap: 5px;
                flex-wrap: wrap;
                background: white;
                border-top: 1px solid #e9ecef;
            }
            
            .quick-btn {
                background: #e9ecef;
                border: none;
                padding: 8px 12px;
                border-radius: 20px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .quick-btn:hover {
                background: #4d7a79;
                color: white;
            }
            
            .input-container {
                display: flex;
                padding: 10px;
                background: white;
                border-top: 1px solid #e9ecef;
                align-items: flex-end;
                gap: 10px;
            }
            
            #companion-input {
                flex: 1;
                border: 1px solid #dee2e6;
                border-radius: 20px;
                padding: 10px 15px;
                resize: none;
                outline: none;
                font-family: inherit;
                font-size: 14px;
            }
            
            #companion-input:focus {
                border-color: #4d7a79;
                box-shadow: 0 0 0 2px rgba(77, 122, 121, 0.1);
            }
            
            #send-btn {
                background: #4d7a79;
                border: none;
                color: white;
                padding: 10px;
                border-radius: 50%;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s ease;
            }
            
            #send-btn:hover {
                background: #3d6a69;
            }
            
            .companion-tools {
                display: flex;
                gap: 5px;
                padding: 10px;
                background: #f8f9fa;
                border-top: 1px solid #e9ecef;
            }
            
            .tool-btn {
                flex: 1;
                background: white;
                border: 1px solid #dee2e6;
                padding: 8px 4px;
                border-radius: 8px;
                font-size: 11px;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .tool-btn:hover {
                background: #4d7a79;
                color: white;
                border-color: #4d7a79;
            }
            
            @media (max-width: 768px) {
                .companion-widget {
                    bottom: 0;
                    right: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 0;
                }
                
                .companion-trigger {
                    bottom: 10px;
                    right: 10px;
                }
            }
            
            /* Typing indicator */
            .typing-indicator {
                display: flex;
                align-items: center;
                gap: 5px;
                padding: 10px 15px;
                background: white;
                border: 1px solid #e9ecef;
                border-left: 4px solid #4d7a79;
                border-radius: 15px;
                margin-bottom: 15px;
                align-self: flex-start;
                max-width: 85%;
            }
            
            .typing-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #4d7a79;
                animation: typingDot 1.4s infinite;
            }
            
            .typing-dot:nth-child(2) { animation-delay: 0.2s; }
            .typing-dot:nth-child(3) { animation-delay: 0.4s; }
            
            @keyframes typingDot {
                0%, 60%, 100% { opacity: 0.3; }
                30% { opacity: 1; }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    toggleWidget() {
        const widget = document.getElementById('rsd-companion');
        const trigger = document.getElementById('companion-trigger');
        
        if (widget.style.display === 'none') {
            widget.style.display = 'flex';
            trigger.style.display = 'none';
            this.isActive = true;
            this.startConversation();
        } else {
            widget.style.display = 'none';
            trigger.style.display = 'flex';
            this.isActive = false;
        }
    }
    
    startConversation() {
        this.userState.timeInConversation = Date.now();
        
        // Assess crisis level from global crisis detector if available
        if (window.crisisDetector) {
            this.userState.crisisLevel = this.assessCrisisLevel(window.crisisDetector.currentLevel);
        }
        
        // Send appropriate greeting
        setTimeout(() => {
            this.sendBotMessage(this.getGreeting());
        }, 1000);
    }
    
    assessCrisisLevel(detectorLevel) {
        switch(detectorLevel) {
            case 1: return 'stable';
            case 2: return 'mild';
            case 3: return 'severe';
            case 4: return 'critical';
            default: return 'stable';
        }
    }
    
    getGreeting() {
        const greetings = this.responses.greetings[this.userState.crisisLevel];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    sendMessage(text = null) {
        const input = document.getElementById('companion-input');
        const message = text || input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        if (!text) input.value = '';
        
        // Store in conversation history
        this.conversationHistory.push({
            type: 'user',
            message: message,
            timestamp: Date.now()
        });
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process message and respond
        setTimeout(() => {
            this.hideTypingIndicator();
            this.processUserMessage(message);
        }, 1500 + Math.random() * 1000); // Random delay to feel natural
    }
    
    processUserMessage(message) {
        const analysis = this.analyzeMessage(message);
        const response = this.generateResponse(analysis);
        
        this.sendBotMessage(response);
        
        // Update user state based on analysis
        this.updateUserState(analysis);
    }
    
    analyzeMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        const analysis = {
            emotions: [],
            triggers: [],
            severity: 'mild',
            needsImmediate: false,
            topics: []
        };
        
        // Emotion detection
        const emotionKeywords = {
            overwhelmed: ['overwhelmed', 'overwhelm', 'too much', 'can\'t handle', 'copleșit', 'prea mult', 'nu pot'],
            rejected: ['rejected', 'reject', 'nobody wants', 'unwanted', 'respins', 'nimeni nu', 'nu mă vrea'],
            alone: ['alone', 'isolated', 'lonely', 'abandoned', 'singur', 'izolat', 'abandonat'],
            worthless: ['worthless', 'useless', 'don\'t matter', 'nu valorez', 'inutil', 'nu contez'],
            angry: ['angry', 'furious', 'mad', 'upset', 'furios', 'mânios', 'enervat', 'supărat'],
            sad: ['sad', 'depressed', 'down', 'trist', 'deprimat'],
            anxious: ['anxious', 'worried', 'scared', 'afraid', 'anxios', 'îngrijorat', 'frică']
        };
        
        Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
            if (keywords.some(keyword => lowerMessage.includes(keyword))) {
                analysis.emotions.push(emotion);
            }
        });
        
        // Crisis indicators
        const crisisKeywords = [
            'want to disappear', 'can\'t anymore', 'why bother', 'no point', 'nobody cares',
            'better without me', 'hopeless', 'desperate', 'vreau să dispar', 'nu mai pot', 
            'de ce să mai', 'nu are sens', 'nimănui nu îi pasă', 'mai bine fără mine'
        ];
        
        if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
            analysis.severity = 'critical';
            analysis.needsImmediate = true;
        }
        
        // Severity assessment
        const highSeverityKeywords = ['very', 'extremely', 'impossible', 'can\'t at all', 'foarte', 'extrem', 'imposibil', 'nu pot deloc'];
        const moderateSeverityKeywords = ['hard', 'difficult', 'challenging', 'tough', 'greu', 'dificil'];
        
        if (highSeverityKeywords.some(keyword => lowerMessage.includes(keyword))) {
            analysis.severity = 'severe';
        } else if (moderateSeverityKeywords.some(keyword => lowerMessage.includes(keyword))) {
            analysis.severity = 'moderate';
        }
        
        return analysis;
    }
    
    generateResponse(analysis) {
        let response = '';
        
        // Immediate crisis response
        if (analysis.needsImmediate) {
            response = this.getCrisisResponse();
            this.triggerEmergencyProtocols();
            return response;
        }
        
        // Validation first
        response += this.getValidationResponse(analysis.emotions);
        
        // Specific emotion support
        if (analysis.emotions.length > 0) {
            response += ' ' + this.getEmotionSpecificResponse(analysis.emotions[0]);
        }
        
        // Coping suggestion
        response += ' ' + this.getCopingSuggestion(analysis.severity);
        
        return response;
    }
    
    getCrisisResponse() {
        return "I understand that right now it's very hard and it seems like you can't see a way out. I want you to know that you're not alone and this intensity will diminish. Let's take some slow breaths together and focus on the present moment. Can you breathe with me?";
    }
    
    getValidationResponse(emotions) {
        if (emotions.includes('overwhelmed')) {
            return "I know everything seems overwhelming right now. This feeling is real and intense.";
        } else if (emotions.includes('rejected')) {
            return "The pain of rejection in RSD is deep and real. It's not in your head.";
        } else if (emotions.includes('alone')) {
            return "The feeling of isolation can be devastating. I'm here with you now.";
        } else {
            const validations = this.responses.validation;
            return validations[Math.floor(Math.random() * validations.length)];
        }
    }
    
    getEmotionSpecificResponse(emotion) {
        const responses = this.responses.crisis;
        
        if (emotion === 'overwhelmed' && responses.overwhelm) {
            return responses.overwhelm[Math.floor(Math.random() * responses.overwhelm.length)];
        } else if (emotion === 'alone' && responses.isolation) {
            return responses.isolation[Math.floor(Math.random() * responses.isolation.length)];
        } else if (emotion === 'worthless' && responses.worthlessness) {
            return responses.worthlessness[Math.floor(Math.random() * responses.worthlessness.length)];
        }
        
        return "Let's explore together what might help you in this moment.";
    }
    
    getCopingSuggestion(severity) {
        const copingResponses = this.responses.coping;
        
        if (severity === 'critical' || severity === 'severe') {
            const breathingResponses = copingResponses.breathing;
            return breathingResponses[Math.floor(Math.random() * breathingResponses.length)];
        } else {
            const allCoping = [...copingResponses.breathing, ...copingResponses.grounding, ...copingResponses.distraction];
            return allCoping[Math.floor(Math.random() * allCoping.length)];
        }
    }
    
    sendBotMessage(text) {
        this.addMessage(text, 'bot');
        
        // Store in conversation history
        this.conversationHistory.push({
            type: 'bot',
            message: text,
            timestamp: Date.now()
        });
    }
    
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('companion-messages');
        
        const messageElement = document.createElement('div');
        messageElement.className = `companion-message ${sender}`;
        messageElement.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">${this.getCurrentTime()}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('companion-messages');
        
        const typingElement = document.createElement('div');
        typingElement.className = 'typing-indicator';
        typingElement.id = 'typing-indicator';
        typingElement.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        
        messagesContainer.appendChild(typingElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    getCurrentTime() {
        return new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    updateUserState(analysis) {
        // Update emotions
        analysis.emotions.forEach(emotion => {
            if (!this.userState.emotions.includes(emotion)) {
                this.userState.emotions.push(emotion);
            }
        });
        
        // Update crisis level
        if (analysis.severity === 'critical') {
            this.userState.crisisLevel = 'critical';
        } else if (analysis.severity === 'severe' && this.userState.crisisLevel !== 'critical') {
            this.userState.crisisLevel = 'severe';
        }
    }
    
    triggerEmergencyProtocols() {
        // Show emergency options
        setTimeout(() => {
            this.sendBotMessage("I want to offer you some immediate options that can help you:");
            this.showEmergencyOptions();
        }, 2000);
    }
    
    showEmergencyOptions() {
        const messagesContainer = document.getElementById('companion-messages');
        
        const optionsElement = document.createElement('div');
        optionsElement.className = 'companion-message bot';
        optionsElement.innerHTML = `
            <div class="emergency-options">
                <button class="emergency-btn" onclick="rsdCompanion.startEmergencyBreathing()">
                    🫁 Emergency Breathing
                </button>
                <button class="emergency-btn" onclick="rsdCompanion.callEmergencyLine()">
                    📞 Crisis Hotline (24/7)
                </button>
                <button class="emergency-btn" onclick="rsdCompanion.showEmergencyContacts()">
                    👤 Emergency Contact
                </button>
                <button class="emergency-btn" onclick="rsdCompanion.startGroundingExercise()">
                    🌱 Grounding Exercise
                </button>
            </div>
            <div class="message-time">${this.getCurrentTime()}</div>
        `;
        
        messagesContainer.appendChild(optionsElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add emergency styles
        const emergencyStyles = `
            .emergency-options {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
                margin: 10px 0;
            }
            
            .emergency-btn {
                background: #dc3545;
                color: white;
                border: none;
                padding: 10px 8px;
                border-radius: 8px;
                font-size: 12px;
                cursor: pointer;
                transition: background 0.2s ease;
            }
            
            .emergency-btn:hover {
                background: #c82333;
            }
        `;
        
        if (!document.getElementById('emergency-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'emergency-styles';
            styleSheet.textContent = emergencyStyles;
            document.head.appendChild(styleSheet);
        }
    }
    
    setupEventListeners() {
        // Auto-show companion in certain conditions - DISABLED to prevent random popups
        // Companion can still be accessed manually via trigger button
        // if (window.crisisDetector) {
        //     // Show automatically when crisis level is high
        //     setInterval(() => {
        //         if (window.crisisDetector.currentLevel >= 3 && !this.isActive) {
        //             this.autoShowCompanion();
        //         }
        //     }, 30000); // Check every 30 seconds
        // }
    }
    
    autoShowCompanion() {
        // Function disabled to prevent automatic modal popups
        // Companion can still be manually accessed via the trigger button
        return;
        
        /*
        const trigger = document.getElementById('companion-trigger');
        trigger.style.animation = 'urgentPulse 1s infinite';
        trigger.querySelector('.trigger-text').textContent = 'I\'m here to help';
        
        // Auto-open after 10 seconds if not clicked
        setTimeout(() => {
            if (!this.isActive) {
                this.toggleWidget();
                this.sendBotMessage("I noticed you might be going through a difficult moment. I'm here to support you.");
            }
        }, 10000);
        */
    }
    
    loadUserPreferences() {
        const preferences = localStorage.getItem('rsdCompanionPreferences');
        if (preferences) {
            const data = JSON.parse(preferences);
            this.userState.copingPreferences = data.copingPreferences || [];
        }
    }
    
    saveUserPreferences() {
        const preferences = {
            copingPreferences: this.userState.copingPreferences,
            lastInteraction: Date.now()
        };
        localStorage.setItem('rsdCompanionPreferences', JSON.stringify(preferences));
    }
    
    // Emergency action methods
    startEmergencyBreathing() {
        this.sendBotMessage("Perfect. Let's do the emergency breathing technique together. Follow me:");
        
        let count = 0;
        const breathingSteps = [
            "Breathe in deeply through your nose... 1, 2, 3, 4",
            "Hold your breath... 1, 2, 3, 4, 5, 6, 7",
            "Exhale slowly through your mouth... 1, 2, 3, 4, 5, 6, 7, 8",
            "Excellent! Let's repeat..."
        ];
        
        const breathingInterval = setInterval(() => {
            if (count < breathingSteps.length * 3) { // Repeat 3 times
                this.sendBotMessage(breathingSteps[count % breathingSteps.length]);
                count++;
            } else {
                clearInterval(breathingInterval);
                this.sendBotMessage("Very good! How do you feel now? Has your breathing calmed down?");
            }
        }, 3000);
    }
    
    callEmergencyLine() {
        this.sendBotMessage(`These are emergency numbers available 24/7:
        
📞 **Crisis Text Line**: Text HOME to 741741
📞 **National Suicide Prevention Lifeline**: 988
📞 **Emergency Services**: 911

If you don't feel ready to call right now, I can stay with you until you feel better.`);
    }
    
    showEmergencyContacts() {
        this.sendBotMessage("Emergency contacts can help you feel more connected. Do you have someone you trust that you could contact?");
    }
    
    startGroundingExercise() {
        this.sendBotMessage("Let's anchor ourselves in the present moment with the 5-4-3-2-1 technique:");
        
        const groundingSteps = [
            "Tell me 5 things you can see around you",
            "Now 4 things you can touch",
            "3 sounds you can hear",
            "2 smells you can detect",
            "1 taste you can sense in your mouth"
        ];
        
        let stepIndex = 0;
        const showNextStep = () => {
            if (stepIndex < groundingSteps.length) {
                this.sendBotMessage(groundingSteps[stepIndex]);
                stepIndex++;
            } else {
                this.sendBotMessage("Excellent! Do you feel more present now? Grounding helps us reconnect with reality.");
            }
        };
        
        showNextStep();
        
        // Continue with user interaction
        const originalSendMessage = this.sendMessage;
        this.sendMessage = (text) => {
            originalSendMessage.call(this, text);
            if (stepIndex < groundingSteps.length) {
                setTimeout(showNextStep, 1000);
            } else {
                this.sendMessage = originalSendMessage; // Restore original function
            }
        };
    }
}

// Global functions for HTML onclick events
function toggleCompanion() {
    if (window.rsdCompanion) {
        window.rsdCompanion.toggleWidget();
    }
}

function sendMessage() {
    if (window.rsdCompanion) {
        window.rsdCompanion.sendMessage();
    }
}

function selectQuickResponse(response) {
    if (window.rsdCompanion) {
        window.rsdCompanion.sendMessage(response);
    }
}

function handleInputKeypress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function startBreathingGuide() {
    if (window.rsdCompanion) {
        window.rsdCompanion.startEmergencyBreathing();
    }
}

function startGroundingExercise() {
    if (window.rsdCompanion) {
        window.rsdCompanion.startGroundingExercise();
    }
}

function showEmergencyContacts() {
    if (window.rsdCompanion) {
        window.rsdCompanion.showEmergencyContacts();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add urgent pulse animation
    const urgentPulseCSS = `
        @keyframes urgentPulse {
            0%, 100% { 
                transform: scale(1);
                box-shadow: 0 4px 20px rgba(220, 53, 69, 0.3);
            }
            50% { 
                transform: scale(1.05);
                box-shadow: 0 6px 30px rgba(220, 53, 69, 0.6);
            }
        }
    `;
    
    const urgentStyle = document.createElement('style');
    urgentStyle.textContent = urgentPulseCSS;
    document.head.appendChild(urgentStyle);
    
    // Initialize RSD Companion
    window.rsdCompanion = new RSDEmergencyCompanion();
});