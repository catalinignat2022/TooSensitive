<?php
/**
 * Template Name: Coping Strategies
 * 
 * Page template for RSD coping strategies and tools
 */

get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">
        
        <!-- Hero Section -->
        <section class="hero-section coping-hero">
            <div class="container">
                <div class="hero-content">
                    <h1>Coping Strategies for RSD</h1>
                    <p class="hero-subtitle">
                        Practical tools and techniques to manage Rejection Sensitive Dysphoria in daily life
                    </p>
                    <div class="hero-cta">
                        <a href="#immediate-help" class="btn btn-primary">Get Immediate Help</a>
                        <a href="#daily-strategies" class="btn btn-secondary">Daily Strategies</a>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="strategy-icons">
                        <div class="strategy-icon">🧘</div>
                        <div class="strategy-icon">💭</div>
                        <div class="strategy-icon">❤️</div>
                        <div class="strategy-icon">🌱</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Crisis Support Banner -->
        <section class="crisis-support">
            <div class="container">
                <div class="crisis-content">
                    <h2>🚨 Need Immediate Support?</h2>
                    <p>If you're in crisis or having thoughts of self-harm, please reach out immediately:</p>
                    <div class="crisis-contacts">
                        <a href="tel:988" class="crisis-link">
                            <strong>988</strong> - Suicide & Crisis Lifeline
                        </a>
                        <a href="tel:741741" class="crisis-link">
                            <strong>Text HOME to 741741</strong> - Crisis Text Line
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Immediate Help Section -->
        <section id="immediate-help" class="strategies-section">
            <div class="container">
                <h2>Immediate RSD Episode Management</h2>
                <p class="section-intro">When rejection hits hard, these techniques can help you cope in the moment:</p>
                
                <div class="strategy-grid immediate-grid">
                    <div class="strategy-card emergency">
                        <div class="strategy-header">
                            <h3>🔥 The STOP Technique</h3>
                            <span class="time-estimate">2-3 minutes</span>
                        </div>
                        <div class="strategy-content">
                            <ul class="strategy-steps">
                                <li><strong>S</strong>top what you're doing</li>
                                <li><strong>T</strong>ake a deep breath</li>
                                <li><strong>O</strong>bserve your thoughts and feelings</li>
                                <li><strong>P</strong>roceed with intention</li>
                            </ul>
                            <button class="btn btn-outline practice-btn" data-strategy="stop">Practice Now</button>
                        </div>
                    </div>

                    <div class="strategy-card emergency">
                        <div class="strategy-header">
                            <h3>❄️ Ice Water Reset</h3>
                            <span class="time-estimate">1-2 minutes</span>
                        </div>
                        <div class="strategy-content">
                            <p>Cold water triggers the mammalian dive reflex, quickly calming your nervous system.</p>
                            <ul class="strategy-steps">
                                <li>Hold ice cubes or splash cold water on face</li>
                                <li>Hold breath for 30 seconds while applying cold</li>
                                <li>Take slow, deep breaths</li>
                            </ul>
                            <div class="strategy-tip">
                                <strong>Why it works:</strong> Activates vagus nerve, reducing fight-or-flight response
                            </div>
                        </div>
                    </div>

                    <div class="strategy-card emergency">
                        <div class="strategy-header">
                            <h3>🌬️ Box Breathing</h3>
                            <span class="time-estimate">3-5 minutes</span>
                        </div>
                        <div class="strategy-content">
                            <div class="breathing-visual">
                                <div class="breathing-box" id="breathing-guide">
                                    <div class="breath-instruction">Click to start</div>
                                </div>
                            </div>
                            <ul class="strategy-steps">
                                <li>Inhale for 4 counts</li>
                                <li>Hold for 4 counts</li>
                                <li>Exhale for 4 counts</li>
                                <li>Hold empty for 4 counts</li>
                            </ul>
                            <button class="btn btn-outline practice-btn" data-strategy="breathing">Start Breathing Exercise</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Daily Strategies Section -->
        <section id="daily-strategies" class="strategies-section">
            <div class="container">
                <h2>Daily Management Strategies</h2>
                <p class="section-intro">Build resilience and reduce RSD sensitivity with these daily practices:</p>

                <div class="strategy-tabs">
                    <div class="tab-nav">
                        <button class="tab-btn active" data-tab="mindset">Mindset</button>
                        <button class="tab-btn" data-tab="emotional">Emotional</button>
                        <button class="tab-btn" data-tab="social">Social</button>
                        <button class="tab-btn" data-tab="physical">Physical</button>
                    </div>

                    <div class="tab-content">
                        <!-- Mindset Tab -->
                        <div class="tab-panel active" id="mindset-panel">
                            <div class="strategy-grid">
                                <div class="strategy-card">
                                    <h3>💭 Cognitive Reframing</h3>
                                    <p>Challenge negative thought patterns and develop more balanced perspectives.</p>
                                    <div class="reframe-example">
                                        <div class="thought-before">
                                            <strong>RSD Thought:</strong> "They didn't respond to my text because they hate me."
                                        </div>
                                        <div class="reframe-arrow">↓</div>
                                        <div class="thought-after">
                                            <strong>Reframed:</strong> "There are many reasons they might not have responded yet."
                                        </div>
                                    </div>
                                    <button class="btn btn-outline" onclick="showReframingTool()">Try Reframing Tool</button>
                                </div>

                                <div class="strategy-card">
                                    <h3>📝 Evidence Journal</h3>
                                    <p>Track situations where your RSD predictions didn't match reality.</p>
                                    <div class="journal-template">
                                        <div class="journal-field">
                                            <label>Situation:</label>
                                            <div class="field-example">Friend seemed distant in conversation</div>
                                        </div>
                                        <div class="journal-field">
                                            <label>RSD Prediction:</label>
                                            <div class="field-example">They're planning to end our friendship</div>
                                        </div>
                                        <div class="journal-field">
                                            <label>Reality:</label>
                                            <div class="field-example">They were stressed about work deadline</div>
                                        </div>
                                    </div>
                                    <button class="btn btn-outline">Start Evidence Journal</button>
                                </div>

                                <div class="strategy-card">
                                    <h3>🎯 Reality Check Questions</h3>
                                    <p>Quick questions to challenge RSD spirals:</p>
                                    <ul class="reality-questions">
                                        <li>Is this thought based on facts or feelings?</li>
                                        <li>What would I tell a friend in this situation?</li>
                                        <li>What are 3 other possible explanations?</li>
                                        <li>How likely is my worst-case scenario (1-10)?</li>
                                        <li>Will this matter in 5 years?</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- Emotional Tab -->
                        <div class="tab-panel" id="emotional-panel">
                            <div class="strategy-grid">
                                <div class="strategy-card">
                                    <h3>❤️ Self-Compassion Practice</h3>
                                    <p>Treat yourself with the same kindness you'd show a good friend.</p>
                                    <div class="compassion-script">
                                        <h4>Self-Compassion Script:</h4>
                                        <blockquote>
                                            "This is a moment of suffering. Suffering is part of human experience. 
                                            May I be kind to myself in this moment. May I find peace."
                                        </blockquote>
                                    </div>
                                    <button class="btn btn-outline">Practice Self-Compassion</button>
                                </div>

                                <div class="strategy-card">
                                    <h3>🌊 Emotional Surfing</h3>
                                    <p>Ride out intense emotions without being overwhelmed by them.</p>
                                    <div class="surfing-steps">
                                        <div class="surf-step">
                                            <h4>1. Notice the Wave</h4>
                                            <p>Recognize the emotional intensity rising</p>
                                        </div>
                                        <div class="surf-step">
                                            <h4>2. Don't Fight It</h4>
                                            <p>Allow the feeling without resistance</p>
                                        </div>
                                        <div class="surf-step">
                                            <h4>3. Ride It Out</h4>
                                            <p>Stay present as intensity naturally decreases</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="strategy-card">
                                    <h3>📊 Emotion Tracking</h3>
                                    <p>Build awareness of your emotional patterns and triggers.</p>
                                    <div class="emotion-tracker">
                                        <div class="emotion-scale">
                                            <div class="scale-labels">
                                                <span>1 - Calm</span>
                                                <span>5 - Moderate</span>
                                                <span>10 - Intense</span>
                                            </div>
                                            <div class="scale-bar">
                                                <div class="scale-marker" style="left: 30%"></div>
                                            </div>
                                        </div>
                                        <p>Track daily to identify patterns and early warning signs.</p>
                                    </div>
                                    <button class="btn btn-outline">Start Emotion Log</button>
                                </div>
                            </div>
                        </div>

                        <!-- Social Tab -->
                        <div class="tab-panel" id="social-panel">
                            <div class="strategy-grid">
                                <div class="strategy-card">
                                    <h3>🗣️ Communication Scripts</h3>
                                    <p>Prepared responses for common RSD-triggering situations.</p>
                                    <div class="script-examples">
                                        <div class="script-item">
                                            <strong>When asking for feedback:</strong>
                                            <p>"I'd appreciate specific feedback on [topic]. I'm working on handling criticism better, so please be direct."</p>
                                        </div>
                                        <div class="script-item">
                                            <strong>When feeling rejected:</strong>
                                            <p>"I noticed I felt hurt when [situation]. Can we talk about what happened?"</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="strategy-card">
                                    <h3>🛡️ Boundary Setting</h3>
                                    <p>Protect your emotional well-being with healthy boundaries.</p>
                                    <ul class="boundary-types">
                                        <li><strong>Time:</strong> "I need time to process feedback before discussing it."</li>
                                        <li><strong>Emotional:</strong> "I can't take on your stress right now."</li>
                                        <li><strong>Communication:</strong> "Please give feedback constructively."</li>
                                        <li><strong>Energy:</strong> "I need a break from difficult conversations."</li>
                                    </ul>
                                </div>

                                <div class="strategy-card">
                                    <h3>👥 Support Network</h3>
                                    <p>Build a team of people who understand and support you.</p>
                                    <div class="support-types">
                                        <div class="support-role">
                                            <h4>The Validator</h4>
                                            <p>Someone who acknowledges your feelings without trying to fix them</p>
                                        </div>
                                        <div class="support-role">
                                            <h4>The Reality Checker</h4>
                                            <p>Person who helps you see situations objectively</p>
                                        </div>
                                        <div class="support-role">
                                            <h4>The Cheerleader</h4>
                                            <p>Someone who reminds you of your strengths and worth</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Physical Tab -->
                        <div class="tab-panel" id="physical-panel">
                            <div class="strategy-grid">
                                <div class="strategy-card">
                                    <h3>🏃 Movement Medicine</h3>
                                    <p>Physical activity to regulate emotions and reduce RSD intensity.</p>
                                    <div class="movement-options">
                                        <div class="movement-type">
                                            <h4>High Intensity (5-10 min)</h4>
                                            <ul>
                                                <li>Jumping jacks</li>
                                                <li>Running stairs</li>
                                                <li>Dance to music</li>
                                            </ul>
                                        </div>
                                        <div class="movement-type">
                                            <h4>Gentle Movement (10-20 min)</h4>
                                            <ul>
                                                <li>Walking</li>
                                                <li>Stretching</li>
                                                <li>Yoga poses</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="strategy-card">
                                    <h3>😴 Sleep Hygiene</h3>
                                    <p>Quality sleep reduces emotional reactivity and RSD sensitivity.</p>
                                    <div class="sleep-checklist">
                                        <label><input type="checkbox"> Consistent bedtime</label>
                                        <label><input type="checkbox"> No screens 1 hour before bed</label>
                                        <label><input type="checkbox"> Cool, dark room</label>
                                        <label><input type="checkbox"> No caffeine after 2pm</label>
                                        <label><input type="checkbox"> Relaxing bedtime routine</label>
                                    </div>
                                </div>

                                <div class="strategy-card">
                                    <h3>🍎 Nutrition for Mood</h3>
                                    <p>Foods that support emotional regulation and reduce inflammation.</p>
                                    <div class="nutrition-grid">
                                        <div class="food-category">
                                            <h4>Brain-Boosting</h4>
                                            <ul>
                                                <li>Omega-3 rich fish</li>
                                                <li>Walnuts & seeds</li>
                                                <li>Blueberries</li>
                                            </ul>
                                        </div>
                                        <div class="food-category">
                                            <h4>Mood-Stabilizing</h4>
                                            <ul>
                                                <li>Complex carbs</li>
                                                <li>Leafy greens</li>
                                                <li>Dark chocolate</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Tools and Resources -->
        <section class="tools-section">
            <div class="container">
                <h2>Interactive Tools</h2>
                <div class="tools-grid">
                    <div class="tool-card">
                        <h3>🧠 Thought Record</h3>
                        <p>Structured way to examine and challenge negative thoughts</p>
                        <button class="btn btn-primary" onclick="openThoughtRecord()">Start Tool</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>📱 RSD Emergency Kit</h3>
                        <p>Quick access to your most effective coping strategies</p>
                        <button class="btn btn-primary" onclick="createEmergencyKit()">Create Kit</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>📈 Progress Tracker</h3>
                        <p>Monitor your RSD management skills over time</p>
                        <button class="btn btn-primary" onclick="openProgressTracker()">View Progress</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Professional Help Section -->
        <section class="professional-help">
            <div class="container">
                <h2>When to Seek Professional Help</h2>
                <div class="help-indicators">
                    <div class="indicator-column">
                        <h3>Consider Therapy If:</h3>
                        <ul>
                            <li>RSD impacts work or relationships daily</li>
                            <li>You avoid situations due to rejection fear</li>
                            <li>Self-help strategies aren't enough</li>
                            <li>You have thoughts of self-harm</li>
                        </ul>
                    </div>
                    <div class="indicator-column">
                        <h3>Therapy Types That Help:</h3>
                        <ul>
                            <li><strong>CBT:</strong> Challenge thought patterns</li>
                            <li><strong>DBT:</strong> Emotional regulation skills</li>
                            <li><strong>EMDR:</strong> Process past rejections</li>
                            <li><strong>ACT:</strong> Accept difficult emotions</li>
                        </ul>
                    </div>
                </div>
                <div class="help-cta">
                    <a href="https://www.psychologytoday.com/us" class="btn btn-outline" target="_blank">Find a Therapist</a>
                </div>
            </div>
        </section>

        <!-- Email Signup -->
        <section class="signup-section">
            <div class="container">
                <?php 
                include get_template_directory() . '/includes/email-signup.php';
                echo do_shortcode('[email_signup title="Get Weekly Coping Strategies" description="New tools and techniques delivered to your inbox every week." button_text="Send Me Strategies"]');
                ?>
            </div>
        </section>

    </main>
</div>

<?php
get_sidebar();
get_footer();
?>