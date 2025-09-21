/**
 * Digital Survival Kit for RSD Emergency Support
 * Interactive tools for immediate crisis intervention
 */

class DigitalSurvivalKit {
    constructor() {
        this.isActive = false;
        this.currentTool = null;
        this.userProgress = {
            breathingCompleted: 0,
            groundingCompleted: 0,
            copingCardsUsed: [],
            lastUsed: null
        };
        
        this.init();
    }
    
    init() {
        this.loadUserProgress();
        this.createSurvivalInterface();
        this.setupEventListeners();
    }
    
    createSurvivalInterface() {
        const kitHTML = `
            <div id="survival-kit" class="survival-kit-overlay" style="display: none;">
                <div class="survival-kit-container">
                    <div class="kit-header">
                        <h2>🧰 RSD Survival Kit</h2>
                        <p>Immediate tools for crisis moments</p>
                        <button class="kit-close" onclick="closeSurvivalKit()">&times;</button>
                    </div>
                    
                    <div class="kit-content" id="kit-content">
                        <div class="tools-grid">
                            <div class="tool-card" data-tool="breathing">
                                <div class="tool-icon">🫁</div>
                                <h3>Emergency Breathing</h3>
                                <p>Breathing techniques for immediate calming</p>
                                <div class="tool-stats">
                                    <span class="completion-count">${this.userProgress.breathingCompleted} completions</span>
                                </div>
                                <button class="tool-btn" onclick="survivalKit.startBreathingTool()">
                                    Start Now
                                </button>
                            </div>
                            
                            <div class="tool-card" data-tool="grounding">
                                <div class="tool-icon">🌱</div>
                                <h3>Grounding 5-4-3-2-1</h3>
                                <p>Anchoring in the present through senses</p>
                                <div class="tool-stats">
                                    <span class="completion-count">${this.userProgress.groundingCompleted} completions</span>
                                </div>
                                <button class="tool-btn" onclick="survivalKit.startGroundingTool()">
                                    Start Now
                                </button>
                            </div>
                            
                            <div class="tool-card" data-tool="coping-cards">
                                <div class="tool-icon">💙</div>
                                <h3>Coping Cards</h3>
                                <p>Personalized affirmations and strategies</p>
                                <div class="tool-stats">
                                    <span class="completion-count">${this.userProgress.copingCardsUsed.length} cards used</span>
                                </div>
                                <button class="tool-btn" onclick="survivalKit.showCopingCards()">
                                    Draw a Card
                                </button>
                            </div>
                            
                            <div class="tool-card" data-tool="sos">
                                <div class="tool-icon">🆘</div>
                                <h3>Emergency SOS</h3>
                                <p>Immediate actions for severe crisis</p>
                                <div class="tool-stats">
                                    <span class="urgency-indicator">For emergencies</span>
                                </div>
                                <button class="tool-btn emergency" onclick="survivalKit.activateSOSMode()">
                                    Activate SOS
                                </button>
                            </div>
                            
                            <div class="tool-card" data-tool="safe-space">
                                <div class="tool-icon">🏠</div>
                                <h3>Safe Space</h3>
                                <p>Guided visualization of your safe place</p>
                                <div class="tool-stats">
                                    <span class="completion-count">Guided meditation</span>
                                </div>
                                <button class="tool-btn" onclick="survivalKit.createSafeSpace()">
                                    Enter Safe Space
                                </button>
                            </div>
                            
                            <div class="tool-card" data-tool="reality-check">
                                <div class="tool-icon">🎯</div>
                                <h3>Reality Check</h3>
                                <p>Perspective on RSD thoughts</p>
                                <div class="tool-stats">
                                    <span class="completion-count">Cognitive restructuring</span>
                                </div>
                                <button class="tool-btn" onclick="survivalKit.startRealityCheck()">
                                    Check Reality
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', kitHTML);
        this.addSurvivalKitStyles();
    }
    
    addSurvivalKitStyles() {
        const styles = `
            .survival-kit-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                backdrop-filter: blur(5px);
                animation: fadeInBlur 0.3s ease-out;
            }
            
            @keyframes fadeInBlur {
                from {
                    opacity: 0;
                    backdrop-filter: blur(0px);
                }
                to {
                    opacity: 1;
                    backdrop-filter: blur(5px);
                }
            }
            
            .survival-kit-container {
                background: white;
                border-radius: 20px;
                max-width: 800px;
                max-height: 90vh;
                width: 95%;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideInScale 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            @keyframes slideInScale {
                from {
                    transform: scale(0.8) translateY(50px);
                    opacity: 0;
                }
                to {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
            }
            
            .kit-header {
                background: linear-gradient(135deg, #4d7a79, #6a9999);
                color: white;
                padding: 2rem;
                border-radius: 20px 20px 0 0;
                text-align: center;
                position: relative;
            }
            
            .kit-header h2 {
                margin: 0 0 0.5rem 0;
                font-size: 1.8rem;
            }
            
            .kit-header p {
                margin: 0;
                opacity: 0.9;
                font-size: 1.1rem;
            }
            
            .kit-close {
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
            
            .kit-close:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            .kit-content {
                padding: 2rem;
            }
            
            .tools-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1.5rem;
            }
            
            .tool-card {
                background: #f8f9fa;
                border: 2px solid #e9ecef;
                border-radius: 15px;
                padding: 1.5rem;
                text-align: center;
                transition: all 0.3s ease;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            
            .tool-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(77, 122, 121, 0.1), transparent);
                transition: left 0.5s ease;
            }
            
            .tool-card:hover {
                border-color: #4d7a79;
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(77, 122, 121, 0.2);
            }
            
            .tool-card:hover::before {
                left: 100%;
            }
            
            .tool-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
                height: 4rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .tool-card h3 {
                color: #333;
                margin: 0 0 0.5rem 0;
                font-size: 1.2rem;
            }
            
            .tool-card p {
                color: #666;
                margin: 0 0 1rem 0;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .tool-stats {
                margin-bottom: 1rem;
                padding: 0.5rem;
                background: rgba(77, 122, 121, 0.1);
                border-radius: 8px;
                font-size: 0.8rem;
                color: #4d7a79;
            }
            
            .completion-count {
                font-weight: bold;
            }
            
            .urgency-indicator {
                color: #dc3545;
                font-weight: bold;
                text-transform: uppercase;
                font-size: 0.7rem;
            }
            
            .tool-btn {
                background: #4d7a79;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 25px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
                width: 100%;
                font-size: 0.9rem;
            }
            
            .tool-btn:hover {
                background: #3d6a69;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(77, 122, 121, 0.3);
            }
            
            .tool-btn.emergency {
                background: #dc3545;
                animation: emergencyPulse 2s infinite;
            }
            
            .tool-btn.emergency:hover {
                background: #c82333;
            }
            
            @keyframes emergencyPulse {
                0%, 100% {
                    box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7);
                }
                50% {
                    box-shadow: 0 0 0 10px rgba(220, 53, 69, 0);
                }
            }
            
            /* Tool-specific interfaces */
            .tool-interface {
                background: white;
                border-radius: 15px;
                padding: 2rem;
                margin-top: 1rem;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                animation: slideDown 0.3s ease-out;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .breathing-circle {
                width: 200px;
                height: 200px;
                border: 3px solid #4d7a79;
                border-radius: 50%;
                margin: 2rem auto;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                font-weight: bold;
                color: #4d7a79;
                position: relative;
                overflow: hidden;
            }
            
            .breathing-circle.inhale {
                animation: breatheIn 4s ease-in-out;
                background: radial-gradient(circle, rgba(77, 122, 121, 0.1), transparent);
            }
            
            .breathing-circle.hold {
                animation: breatheHold 7s ease-in-out;
                background: radial-gradient(circle, rgba(77, 122, 121, 0.2), transparent);
            }
            
            .breathing-circle.exhale {
                animation: breatheOut 8s ease-in-out;
                background: radial-gradient(circle, rgba(77, 122, 121, 0.05), transparent);
            }
            
            @keyframes breatheIn {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            @keyframes breatheHold {
                0%, 100% { transform: scale(1.2); }
            }
            
            @keyframes breatheOut {
                0% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
            
            .progress-indicator {
                background: #e9ecef;
                height: 8px;
                border-radius: 4px;
                margin: 1rem 0;
                overflow: hidden;
            }
            
            .progress-bar {
                background: linear-gradient(90deg, #4d7a79, #6a9999);
                height: 100%;
                border-radius: 4px;
                transition: width 0.3s ease;
            }
            
            .coping-card {
                background: linear-gradient(135deg, #4d7a79, #6a9999);
                color: white;
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                margin: 1rem 0;
                box-shadow: 0 10px 30px rgba(77, 122, 121, 0.3);
                animation: cardFlip 0.6s ease-out;
            }
            
            @keyframes cardFlip {
                0% { transform: rotateY(-90deg); opacity: 0; }
                50% { transform: rotateY(0deg); opacity: 0.5; }
                100% { transform: rotateY(0deg); opacity: 1; }
            }
            
            .coping-card h3 {
                margin: 0 0 1rem 0;
                font-size: 1.4rem;
            }
            
            .coping-card p {
                margin: 0;
                font-size: 1.1rem;
                line-height: 1.6;
            }
            
            @media (max-width: 768px) {
                .survival-kit-container {
                    width: 100%;
                    height: 100%;
                    border-radius: 0;
                    max-height: 100vh;
                }
                
                .kit-header {
                    border-radius: 0;
                }
                
                .tools-grid {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }
                
                .tool-card {
                    padding: 1rem;
                }
                
                .breathing-circle {
                    width: 150px;
                    height: 150px;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    show() {
        document.getElementById('survival-kit').style.display = 'flex';
        this.isActive = true;
        this.updateProgress();
    }
    
    hide() {
        document.getElementById('survival-kit').style.display = 'none';
        this.isActive = false;
        this.currentTool = null;
    }
    
    startBreathingTool() {
        this.currentTool = 'breathing';
        this.showBreathingInterface();
    }
    
    showBreathingInterface() {
        const content = document.getElementById('kit-content');
        content.innerHTML = `
            <div class="tool-interface breathing-tool">
                <div class="tool-header">
                    <button class="back-btn" onclick="survivalKit.showMainMenu()">← Back</button>
                    <h3>🫁 Emergency 4-7-8 Breathing</h3>
                    <p>This technique activates the parasympathetic nervous system and reduces anxiety</p>
                </div>
                
                <div class="breathing-container">
                    <div class="breathing-circle" id="breathing-circle">
                        <span id="breathing-text">Get Ready</span>
                    </div>
                    
                    <div class="breathing-controls">
                        <div class="breathing-counter">
                            <span>Cycle: <strong id="cycle-counter">0</strong>/6</span>
                        </div>
                        
                        <div class="progress-indicator">
                            <div class="progress-bar" id="breathing-progress"></div>
                        </div>
                        
                        <button id="start-breathing" class="tool-btn" onclick="survivalKit.startBreathingCycle()">
                            Start Breathing
                        </button>
                        
                        <button id="stop-breathing" class="tool-btn" onclick="survivalKit.stopBreathing()" style="display: none; background: #dc3545;">
                            Stop
                        </button>
                    </div>
                </div>
                
                <div class="breathing-tips">
                    <h4>💡 Tips for effective breathing:</h4>
                    <ul>
                        <li>Find a comfortable position</li>
                        <li>Place your tongue behind your upper teeth</li>
                        <li>Exhale completely before starting</li>
                        <li>Focus only on counting</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    startBreathingCycle() {
        this.breathingState = {
            isActive: true,
            currentCycle: 0,
            phase: 'prepare',
            cycleCount: 6
        };
        
        document.getElementById('start-breathing').style.display = 'none';
        document.getElementById('stop-breathing').style.display = 'block';
        
        this.runBreathingCycle();
    }
    
    runBreathingCycle() {
        if (!this.breathingState.isActive) return;
        
        const circle = document.getElementById('breathing-circle');
        const text = document.getElementById('breathing-text');
        const counter = document.getElementById('cycle-counter');
        const progress = document.getElementById('breathing-progress');
        
        // Preparation phase
        text.textContent = 'Exhale completely...';
        circle.className = 'breathing-circle';
        
        setTimeout(() => {
            if (!this.breathingState.isActive) return;
            this.breathingPhase('inhale', circle, text);
        }, 2000);
    }
    
    breathingPhase(phase, circle, text) {
        if (!this.breathingState.isActive) return;
        
        const phases = {
            inhale: {
                duration: 4000,
                text: 'Breathe in through nose',
                class: 'inhale',
                next: 'hold'
            },
            hold: {
                duration: 7000,
                text: 'Hold your breath',
                class: 'hold',
                next: 'exhale'
            },
            exhale: {
                duration: 8000,
                text: 'Breathe out through mouth',
                class: 'exhale',
                next: 'complete'
            }
        };
        
        const currentPhase = phases[phase];
        text.textContent = currentPhase.text;
        circle.className = `breathing-circle ${currentPhase.class}`;
        
        // Countdown
        let countdown = Math.ceil(currentPhase.duration / 1000);
        const countdownInterval = setInterval(() => {
            if (!this.breathingState.isActive) {
                clearInterval(countdownInterval);
                return;
            }
            
            countdown--;
            text.textContent = `${currentPhase.text} (${countdown})`;
            
            if (countdown <= 0) {
                clearInterval(countdownInterval);
            }
        }, 1000);
        
        setTimeout(() => {
            if (!this.breathingState.isActive) return;
            
            if (currentPhase.next === 'complete') {
                this.completeCycle();
            } else {
                this.breathingPhase(currentPhase.next, circle, text);
            }
        }, currentPhase.duration);
    }
    
    completeCycle() {
        this.breathingState.currentCycle++;
        const counter = document.getElementById('cycle-counter');
        const progress = document.getElementById('breathing-progress');
        
        counter.textContent = this.breathingState.currentCycle;
        const progressPercent = (this.breathingState.currentCycle / this.breathingState.cycleCount) * 100;
        progress.style.width = `${progressPercent}%`;
        
        if (this.breathingState.currentCycle >= this.breathingState.cycleCount) {
            this.completeBreathing();
        } else {
            setTimeout(() => {
                if (this.breathingState.isActive) {
                    this.runBreathingCycle();
                }
            }, 1000);
        }
    }
    
    completeBreathing() {
        this.breathingState.isActive = false;
        this.userProgress.breathingCompleted++;
        this.saveUserProgress();
        
        const circle = document.getElementById('breathing-circle');
        const text = document.getElementById('breathing-text');
        
        circle.className = 'breathing-circle';
        text.textContent = '✅ Complete!';
        
        document.getElementById('stop-breathing').style.display = 'none';
        
        // Show completion message
        setTimeout(() => {
            this.showCompletionMessage('breathing');
        }, 2000);
    }
    
    stopBreathing() {
        if (this.breathingState) {
            this.breathingState.isActive = false;
        }
        
        document.getElementById('start-breathing').style.display = 'block';
        document.getElementById('stop-breathing').style.display = 'none';
        
        const circle = document.getElementById('breathing-circle');
        const text = document.getElementById('breathing-text');
        
        circle.className = 'breathing-circle';
        text.textContent = 'Pregătește-te';
    }
    
    startGroundingTool() {
        this.currentTool = 'grounding';
        this.showGroundingInterface();
    }
    
    showGroundingInterface() {
        const content = document.getElementById('kit-content');
        content.innerHTML = `
            <div class="tool-interface grounding-tool">
                <div class="tool-header">
                    <button class="back-btn" onclick="survivalKit.showMainMenu()">← Back</button>
                    <h3>🌱 Grounding 5-4-3-2-1</h3>
                    <p>This technique helps you connect with the present through your senses</p>
                </div>
                
                <div class="grounding-container">
                    <div class="grounding-step" id="grounding-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Identify 5 things you can SEE</h4>
                            <p>Look around and name out loud 5 different objects</p>
                            <div class="input-area">
                                <input type="text" id="grounding-input" placeholder="Write the first thing you see...">
                                <button onclick="survivalKit.addGroundingItem()">Add</button>
                            </div>
                            <div class="grounding-list" id="grounding-list"></div>
                        </div>
                    </div>
                    
                    <div class="progress-indicator">
                        <div class="progress-bar" id="grounding-progress"></div>
                    </div>
                </div>
            </div>
        `;
        
        this.groundingState = {
            currentStep: 1,
            steps: [
                { sense: 'SEE', count: 5, items: [], instruction: 'Look around and name out loud 5 different objects' },
                { sense: 'TOUCH', count: 4, items: [], instruction: 'Touch and describe 4 textures around you' },
                { sense: 'HEAR', count: 3, items: [], instruction: 'Listen and identify 3 different sounds' },
                { sense: 'SMELL', count: 2, items: [], instruction: 'Identify 2 scents in your environment' },
                { sense: 'TASTE', count: 1, items: [], instruction: 'Describe 1 taste you can sense right now' }
            ]
        };
    }
    
    addGroundingItem() {
        const input = document.getElementById('grounding-input');
        const item = input.value.trim();
        
        if (!item) return;
        
        const currentStep = this.groundingState.steps[this.groundingState.currentStep - 1];
        currentStep.items.push(item);
        
        const list = document.getElementById('grounding-list');
        const itemElement = document.createElement('div');
        itemElement.className = 'grounding-item';
        itemElement.textContent = `${currentStep.items.length}. ${item}`;
        list.appendChild(itemElement);
        
        input.value = '';
        
        // Update progress
        const progress = document.getElementById('grounding-progress');
        const totalItems = this.groundingState.steps.reduce((sum, step) => sum + step.count, 0);
        const completedItems = this.groundingState.steps.reduce((sum, step) => sum + step.items.length, 0);
        progress.style.width = `${(completedItems / totalItems) * 100}%`;
        
        // Check if step is complete
        if (currentStep.items.length >= currentStep.count) {
            setTimeout(() => {
                this.nextGroundingStep();
            }, 1000);
        } else {
            input.placeholder = `Write the next thing you can ${currentStep.sense.toLowerCase()}...`;
        }
    }
    
    nextGroundingStep() {
        if (this.groundingState.currentStep >= 5) {
            this.completeGrounding();
            return;
        }
        
        this.groundingState.currentStep++;
        const step = this.groundingState.steps[this.groundingState.currentStep - 1];
        
        const stepElement = document.getElementById('grounding-step');
        stepElement.innerHTML = `
            <div class="step-number">${this.groundingState.currentStep}</div>
            <div class="step-content">
                <h4>Identify ${step.count} ${step.count === 1 ? 'thing' : 'things'} you can ${step.sense}</h4>
                <p>${step.instruction}</p>
                <div class="input-area">
                    <input type="text" id="grounding-input" placeholder="Write the first thing you can ${step.sense.toLowerCase()}...">
                    <button onclick="survivalKit.addGroundingItem()">Add</button>
                </div>
                <div class="grounding-list" id="grounding-list"></div>
            </div>
        `;
        
        // Focus on input
        setTimeout(() => {
            document.getElementById('grounding-input').focus();
        }, 100);
    }
    
    completeGrounding() {
        this.userProgress.groundingCompleted++;
        this.saveUserProgress();
        
        const stepElement = document.getElementById('grounding-step');
        stepElement.innerHTML = `
            <div class="completion-message">
                <div class="completion-icon">✅</div>
                <h3>Excellent! Grounding completed</h3>
                <p>You've reconnected with the present through all 5 senses. How do you feel now?</p>
                <div class="feeling-check">
                    <button onclick="survivalKit.recordFeeling('better')" class="feeling-btn better">
                        😌 Better
                    </button>
                    <button onclick="survivalKit.recordFeeling('same')" class="feeling-btn same">
                        😐 Same
                    </button>
                    <button onclick="survivalKit.recordFeeling('need-more')" class="feeling-btn need-more">
                        😰 I need more help
                    </button>
                </div>
            </div>
        `;
    }
    
    showCopingCards() {
        this.currentTool = 'coping-cards';
        this.showCopingCardsInterface();
    }
    
    showCopingCardsInterface() {
        const cards = this.getCopingCards();
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        
        this.userProgress.copingCardsUsed.push(randomCard.id);
        this.saveUserProgress();
        
        const content = document.getElementById('kit-content');
        content.innerHTML = `
            <div class="tool-interface coping-cards-tool">
                <div class="tool-header">
                    <button class="back-btn" onclick="survivalKit.showMainMenu()">← Back</button>
                    <h3>💙 Coping Cards</h3>
                    <p>Encouraging messages and strategies for difficult moments</p>
                </div>
                
                <div class="coping-card">
                    <h3>${randomCard.title}</h3>
                    <p>${randomCard.message}</p>
                    <div class="card-category">${randomCard.category}</div>
                </div>
                
                <div class="card-actions">
                    <button onclick="survivalKit.showCopingCardsInterface()" class="tool-btn">
                        🔄 Draw another card
                    </button>
                    <button onclick="survivalKit.saveCardAsFavorite('${randomCard.id}')" class="tool-btn" style="background: #28a745;">
                        ⭐ Save as favorite
                    </button>
                </div>
                
                <div class="cards-used">
                    <small>Cards used: ${this.userProgress.copingCardsUsed.length}</small>
                </div>
            </div>
        `;
    }
    
    getCopingCards() {
        return [
            {
                id: 'rsd-1',
                title: 'RSD does not define who you are',
                message: 'Rejection Sensitive Dysphoria is a condition, not a character flaw. You are more than your most intense moments.',
                category: 'Identity'
            },
            {
                id: 'rsd-2',
                title: 'This intensity will pass',
                message: 'Even though it feels like the pain will never end, RSD episodes have a beginning, peak, and end. You\'ve been through this before.',
                category: 'Temporality'
            },
            {
                id: 'rsd-3',
                title: 'You are not too sensitive',
                message: 'Your sensitivity is a superpower that can be managed. The world needs people who feel deeply.',
                category: 'Acceptance'
            },
            {
                id: 'rsd-4',
                title: 'Perceived rejection doesn\'t mean real rejection',
                message: 'RSD amplifies and distorts social signals. What seems like rejection might be something completely different.',
                category: 'Reality'
            },
            {
                id: 'rsd-5',
                title: 'You have intrinsic value',
                message: 'Your worth doesn\'t depend on others\' approval. You exist and matter regardless of others\' reactions.',
                category: 'Value'
            },
            {
                id: 'strategy-1',
                title: 'Breathe before you react',
                message: 'When you feel RSD activating, take 3 deep breaths. This time allows you to assess the situation more clearly.',
                category: 'Strategy'
            },
            {
                id: 'strategy-2',
                title: 'Ask yourself: "What else could this mean?"',
                message: 'Before accepting the first interpretation of a situation, explore other possible explanations.',
                category: 'Strategy'
            },
            {
                id: 'community-1',
                title: 'You are not alone in this',
                message: 'Millions of people live with RSD. Your experience is valid and shared by an entire community.',
                category: 'Community'
            },
            {
                id: 'recovery-1',
                title: 'Every past episode is proof you can survive',
                message: 'You\'ve survived 100% of the RSD episodes you\'ve had. You will survive this one too.',
                category: 'Resilience'
            },
            {
                id: 'self-compassion-1',
                title: 'Talk to yourself like you would to a friend',
                message: 'If a friend were going through what you\'re experiencing right now, what would you tell them? Give yourself the same compassion.',
                category: 'Self-compassion'
            }
        ];
    }
    
    activateSOSMode() {
        this.currentTool = 'sos';
        this.showSOSInterface();
    }
    
    showSOSInterface() {
        const content = document.getElementById('kit-content');
        content.innerHTML = `
            <div class="tool-interface sos-tool">
                <div class="sos-header">
                    <div class="sos-icon">🆘</div>
                    <h2>SOS MODE ACTIVATED</h2>
                    <p>Step-by-step instructions for severe crisis</p>
                </div>
                
                <div class="sos-steps">
                    <div class="sos-step urgent">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h3>YOUR SAFETY IS THE PRIORITY</h3>
                            <p>If you have thoughts of self-harm, call IMMEDIATELY:</p>
                            <div class="emergency-numbers">
                                <button onclick="window.open('tel:911')" class="emergency-call">
                                    📞 911 - Emergency
                                </button>
                                <button onclick="window.open('tel:988')" class="emergency-call">
                                    📞 988 - Crisis Lifeline
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="sos-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h3>SURVIVAL BREATHING</h3>
                            <p>Inhale 4 seconds, hold 4, exhale 6. Repeat until you feel slight improvement.</p>
                            <button onclick="survivalKit.quickBreathing()" class="tool-btn">
                                🫁 Start quick breathing
                            </button>
                        </div>
                    </div>
                    
                    <div class="sos-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h3>CONTACT SOMEONE</h3>
                            <p>Don't stay alone. Send a message or call someone you trust.</p>
                            <button onclick="survivalKit.prepareEmergencyMessage()" class="tool-btn">
                                💬 Prepare emergency message
                            </button>
                        </div>
                    </div>
                    
                    <div class="sos-step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h3>STAY PRESENT</h3>
                            <p>Count 5 things you see, 4 things you touch, 3 things you hear.</p>
                            <button onclick="survivalKit.quickGrounding()" class="tool-btn">
                                🌱 Quick grounding
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="sos-footer">
                    <button onclick="survivalKit.showMainMenu()" class="tool-btn" style="background: #28a745;">
                        ✅ I feel safer now
                    </button>
                </div>
            </div>
        `;
    }
    
    showMainMenu() {
        this.currentTool = null;
        this.createSurvivalInterface();
        this.updateProgress();
    }
    
    updateProgress() {
        // Update completion counts in the main interface
        const breathingCard = document.querySelector('[data-tool="breathing"] .completion-count');
        const groundingCard = document.querySelector('[data-tool="grounding"] .completion-count');
        const copingCard = document.querySelector('[data-tool="coping-cards"] .completion-count');
        
        if (breathingCard) breathingCard.textContent = `${this.userProgress.breathingCompleted} completions`;
        if (groundingCard) groundingCard.textContent = `${this.userProgress.groundingCompleted} completions`;
        if (copingCard) copingCard.textContent = `${this.userProgress.copingCardsUsed.length} cards used`;
    }
    
    showCompletionMessage(toolType) {
        const messages = {
            breathing: 'Your breathing has calmed and your nervous system is relaxing. Excellent work!',
            grounding: 'You\'ve reconnected with the present and are here, safe.',
            'coping-cards': 'You\'ve received a personalized support message for this moment.'
        };
        
        // Show completion popup or integrate into existing interface
        alert(messages[toolType] || 'You have successfully completed the exercise!');
    }
    
    loadUserProgress() {
        const saved = localStorage.getItem('survivalKitProgress');
        if (saved) {
            this.userProgress = { ...this.userProgress, ...JSON.parse(saved) };
        }
    }
    
    saveUserProgress() {
        this.userProgress.lastUsed = Date.now();
        localStorage.setItem('survivalKitProgress', JSON.stringify(this.userProgress));
    }
    
    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (this.isActive && e.key === 'Escape') {
                this.hide();
            }
        });
        
        // Auto-show on crisis detection - DISABLED to prevent random modal popups
        // Digital survival kit can still be accessed manually via button or emergency manager
        // if (window.crisisDetector) {
        //     setInterval(() => {
        //         if (window.crisisDetector.currentLevel >= 4 && !this.isActive) {
        //             this.autoShow();
        //         }
        //     }, 45000); // Check every 45 seconds
        // }
    }
    
    autoShow() {
        this.show();
        // Automatically open SOS mode for critical situations
        setTimeout(() => {
            this.activateSOSMode();
        }, 1000);
    }
    
    recordFeeling(feeling) {
        // Record user feeling after exercises for analytics
        const feelings = JSON.parse(localStorage.getItem('survivalKitFeelings') || '[]');
        feelings.push({
            tool: this.currentTool,
            feeling: feeling,
            timestamp: Date.now()
        });
        localStorage.setItem('survivalKitFeelings', JSON.stringify(feelings));
        
        if (feeling === 'need-more') {
            // Suggest additional help
            alert('I understand you need more support. Let\'s try SOS Mode or contact a specialist.');
            this.activateSOSMode();
        } else {
            this.showMainMenu();
        }
    }
    
    // Quick emergency functions for SOS mode
    quickBreathing() {
        // Start a simplified 4-4-6 breathing pattern
        const content = document.getElementById('kit-content');
        const existingStep = content.querySelector('.sos-step .step-content');
        
        if (existingStep) {
            existingStep.innerHTML = `
                <h3>🫁 BREATHING IN PROGRESS</h3>
                <div class="quick-breathing-circle" id="quick-breathing-circle">
                    <span id="quick-breathing-text">Breathe in (4)</span>
                </div>
                <p>Follow the circle and text. Continue until you feel calmer.</p>
                <button onclick="survivalKit.stopQuickBreathing()" class="tool-btn" style="background: #dc3545;">
                    Stop breathing exercise
                </button>
            `;
            
            this.startQuickBreathingCycle();
        }
    }
    
    startQuickBreathingCycle() {
        let phase = 0; // 0: inhale, 1: hold, 2: exhale
        const phases = [
            { text: 'Breathe in', duration: 4000, class: 'inhale' },
            { text: 'Hold', duration: 4000, class: 'hold' },
            { text: 'Breathe out', duration: 6000, class: 'exhale' }
        ];
        
        const cycle = () => {
            const circle = document.getElementById('quick-breathing-circle');
            const text = document.getElementById('quick-breathing-text');
            
            if (!circle || !text) return;
            
            const currentPhase = phases[phase];
            let countdown = Math.ceil(currentPhase.duration / 1000);
            
            circle.className = `quick-breathing-circle ${currentPhase.class}`;
            
            const countdownInterval = setInterval(() => {
                if (!document.getElementById('quick-breathing-text')) {
                    clearInterval(countdownInterval);
                    return;
                }
                
                text.textContent = `${currentPhase.text} (${countdown})`;
                countdown--;
                
                if (countdown < 0) {
                    clearInterval(countdownInterval);
                    phase = (phase + 1) % 3;
                    setTimeout(cycle, 500);
                }
            }, 1000);
        };
        
        cycle();
    }
    
    stopQuickBreathing() {
        this.activateSOSMode(); // Return to SOS interface
    }
    
    prepareEmergencyMessage() {
        const content = document.getElementById('kit-content');
        const existingStep = content.querySelector('.sos-step .step-content');
        
        if (existingStep) {
            existingStep.innerHTML = `
                <h3>💬 EMERGENCY MESSAGE READY</h3>
                <div class="emergency-message-templates">
                    <div class="message-template">
                        <h4>Template 1 - Simple:</h4>
                        <p class="template-text">"I'm having a difficult moment with RSD and could use some support. Are you available to talk?"</p>
                        <button onclick="survivalKit.copyMessage(1)" class="tool-btn">📋 Copy message</button>
                    </div>
                    
                    <div class="message-template">
                        <h4>Template 2 - Detailed:</h4>
                        <p class="template-text">"Hi, I'm experiencing a severe RSD episode right now and feeling overwhelmed. I know this will pass, but having someone to talk to would really help. Can we chat for a few minutes?"</p>
                        <button onclick="survivalKit.copyMessage(2)" class="tool-btn">📋 Copy message</button>
                    </div>
                    
                    <div class="message-template">
                        <h4>Template 3 - Just presence:</h4>
                        <p class="template-text">"Could you just stay with me for a bit? I'm going through something difficult and don't want to be alone right now."</p>
                        <button onclick="survivalKit.copyMessage(3)" class="tool-btn">📋 Copy message</button>
                    </div>
                </div>
                
                <button onclick="survivalKit.activateSOSMode()" class="tool-btn" style="background: #6c757d; margin-top: 1rem;">
                    ← Back to SOS steps
                </button>
            `;
        }
    }
    
    copyMessage(templateNumber) {
        const messages = {
            1: "I'm having a difficult moment with RSD and could use some support. Are you available to talk?",
            2: "Hi, I'm experiencing a severe RSD episode right now and feeling overwhelmed. I know this will pass, but having someone to talk to would really help. Can we chat for a few minutes?",
            3: "Could you just stay with me for a bit? I'm going through something difficult and don't want to be alone right now."
        };
        
        const message = messages[templateNumber];
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(message).then(() => {
                alert('Message copied to clipboard! You can now paste it in your messaging app.');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = message;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Message copied to clipboard! You can now paste it in your messaging app.');
        }
    }
    
    quickGrounding() {
        const content = document.getElementById('kit-content');
        const existingStep = content.querySelector('.sos-step .step-content');
        
        if (existingStep) {
            existingStep.innerHTML = `
                <h3>🌱 QUICK GROUNDING</h3>
                <div class="quick-grounding-guide">
                    <div class="grounding-step active" id="grounding-see">
                        <h4>👀 Name 5 things you can SEE</h4>
                        <div class="quick-grounding-list" id="see-list"></div>
                        <input type="text" id="see-input" placeholder="What do you see right now?">
                        <button onclick="survivalKit.addQuickGroundingItem('see')" class="tool-btn">Add</button>
                    </div>
                    
                    <div class="grounding-progress">
                        <div class="progress-text" id="grounding-progress-text">Step 1 of 3: SEE (0/5)</div>
                        <div class="progress-bar-container">
                            <div class="progress-bar" id="quick-grounding-progress" style="width: 0%"></div>
                        </div>
                    </div>
                </div>
                
                <button onclick="survivalKit.activateSOSMode()" class="tool-btn" style="background: #6c757d; margin-top: 1rem;">
                    ← Back to SOS steps
                </button>
            `;
            
            this.quickGroundingState = {
                currentSense: 'see',
                senses: {
                    see: { name: 'SEE', icon: '👀', count: 0, max: 5, items: [] },
                    touch: { name: 'TOUCH', icon: '✋', count: 0, max: 4, items: [] },
                    hear: { name: 'HEAR', icon: '👂', count: 0, max: 3, items: [] }
                },
                step: 1
            };
            
            document.getElementById('see-input').focus();
        }
    }
    
    addQuickGroundingItem(sense) {
        const input = document.getElementById(`${sense}-input`);
        const item = input.value.trim();
        
        if (!item) return;
        
        const senseData = this.quickGroundingState.senses[sense];
        senseData.items.push(item);
        senseData.count++;
        
        // Add to list
        const list = document.getElementById(`${sense}-list`);
        const itemElement = document.createElement('div');
        itemElement.textContent = `${senseData.count}. ${item}`;
        list.appendChild(itemElement);
        
        input.value = '';
        input.focus();
        
        // Update progress
        this.updateQuickGroundingProgress();
        
        // Check if this sense is complete
        if (senseData.count >= senseData.max) {
            this.nextQuickGroundingSense();
        }
    }
    
    updateQuickGroundingProgress() {
        const state = this.quickGroundingState;
        const currentSense = state.senses[state.currentSense];
        const totalSteps = 3;
        const completedSteps = state.step - 1;
        const currentStepProgress = currentSense.count / currentSense.max;
        const totalProgress = (completedSteps + currentStepProgress) / totalSteps * 100;
        
        document.getElementById('grounding-progress-text').textContent = 
            `Step ${state.step} of ${totalSteps}: ${currentSense.name} (${currentSense.count}/${currentSense.max})`;
        document.getElementById('quick-grounding-progress').style.width = `${totalProgress}%`;
    }
    
    nextQuickGroundingSense() {
        const senseOrder = ['see', 'touch', 'hear'];
        const currentIndex = senseOrder.indexOf(this.quickGroundingState.currentSense);
        
        if (currentIndex < senseOrder.length - 1) {
            // Move to next sense
            this.quickGroundingState.currentSense = senseOrder[currentIndex + 1];
            this.quickGroundingState.step++;
            
            const nextSense = this.quickGroundingState.senses[this.quickGroundingState.currentSense];
            const guide = document.querySelector('.quick-grounding-guide');
            
            guide.innerHTML = `
                <div class="grounding-step active" id="grounding-${this.quickGroundingState.currentSense}">
                    <h4>${nextSense.icon} Name ${nextSense.max} things you can ${nextSense.name}</h4>
                    <div class="quick-grounding-list" id="${this.quickGroundingState.currentSense}-list"></div>
                    <input type="text" id="${this.quickGroundingState.currentSense}-input" placeholder="What can you ${nextSense.name.toLowerCase()} right now?">
                    <button onclick="survivalKit.addQuickGroundingItem('${this.quickGroundingState.currentSense}')" class="tool-btn">Add</button>
                </div>
                
                <div class="grounding-progress">
                    <div class="progress-text" id="grounding-progress-text">Step ${this.quickGroundingState.step} of 3: ${nextSense.name} (0/${nextSense.max})</div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" id="quick-grounding-progress" style="width: ${(this.quickGroundingState.step - 1) / 3 * 100}%"></div>
                    </div>
                </div>
            `;
            
            document.getElementById(`${this.quickGroundingState.currentSense}-input`).focus();
        } else {
            // Complete quick grounding
            this.completeQuickGrounding();
        }
    }
    
    completeQuickGrounding() {
        const guide = document.querySelector('.quick-grounding-guide');
        guide.innerHTML = `
            <div class="completion-message">
                <div class="completion-icon">✅</div>
                <h3>Quick grounding complete!</h3>
                <p>You've connected with the present moment. Notice how you feel now.</p>
                <div class="grounding-summary">
                    <p><strong>You noticed:</strong></p>
                    <p>👀 ${this.quickGroundingState.senses.see.items.length} things you saw</p>
                    <p>✋ ${this.quickGroundingState.senses.touch.items.length} things you touched</p>
                    <p>👂 ${this.quickGroundingState.senses.hear.items.length} things you heard</p>
                </div>
            </div>
        `;
        
        document.getElementById('quick-grounding-progress').style.width = '100%';
        document.getElementById('grounding-progress-text').textContent = 'Grounding exercise completed!';
    }
}

// Global functions
function closeSurvivalKit() {
    if (window.survivalKit) {
        window.survivalKit.hide();
    }
}

function showSurvivalKit() {
    if (window.survivalKit) {
        window.survivalKit.show();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.survivalKit = new DigitalSurvivalKit();
});