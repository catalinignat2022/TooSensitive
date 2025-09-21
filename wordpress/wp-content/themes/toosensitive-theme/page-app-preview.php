<?php
/**
 * Template Name: App Preview
 * 
 * Page template showcasing the upcoming TooSensitive mobile app
 */

get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">
        
        <!-- Hero Section -->
        <section class="hero-section app-hero">
            <div class="container">
                <div class="hero-content">
                    <div class="app-badge">
                        <span class="badge-text">Coming Soon</span>
                    </div>
                    <h1>TooSensitive App</h1>
                    <p class="hero-subtitle">
                        Your personal RSD companion. Real-time support, coping tools, and community connection 
                        right in your pocket.
                    </p>
                    <div class="app-availability">
                        <p><strong>Expected Launch:</strong> Q2 2024</p>
                        <div class="platform-icons">
                            <span class="platform-icon">📱 iOS</span>
                            <span class="platform-icon">🤖 Android</span>
                        </div>
                    </div>
                    <div class="hero-cta">
                        <button class="btn btn-primary" onclick="joinWaitlist()">Join Waitlist</button>
                        <a href="#features" class="btn btn-secondary">Explore Features</a>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="phone-mockup">
                        <div class="phone-frame">
                            <div class="phone-screen">
                                <div class="app-interface">
                                    <div class="app-header">
                                        <span class="time">9:41</span>
                                        <span class="battery">100%</span>
                                    </div>
                                    <div class="app-content">
                                        <h3>How are you feeling?</h3>
                                        <div class="mood-slider">
                                            <div class="slider-track">
                                                <div class="slider-thumb" style="left: 30%"></div>
                                            </div>
                                        </div>
                                        <div class="quick-actions">
                                            <button class="quick-btn">🧘 Breathing</button>
                                            <button class="quick-btn">💭 Thoughts</button>
                                            <button class="quick-btn">🤝 Support</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- App Features -->
        <section id="features" class="features-section">
            <div class="container">
                <h2>App Features</h2>
                <p class="section-intro">Designed specifically for the unique challenges of Rejection Sensitive Dysphoria</p>

                <div class="feature-showcase">
                    <!-- Real-time Support -->
                    <div class="feature-block">
                        <div class="feature-visual">
                            <div class="mock-screen crisis-support">
                                <div class="screen-header">
                                    <h4>Crisis Support</h4>
                                    <span class="status-indicator active">Available 24/7</span>
                                </div>
                                <div class="support-options">
                                    <button class="support-btn emergency">🚨 Crisis Hotline</button>
                                    <button class="support-btn urgent">💬 Text Support</button>
                                    <button class="support-btn community">👥 Peer Support</button>
                                </div>
                                <div class="quick-relief">
                                    <h5>Quick Relief</h5>
                                    <div class="relief-techniques">
                                        <span class="technique">🧘 Breathing</span>
                                        <span class="technique">❄️ Ice Water</span>
                                        <span class="technique">🎵 Calming Music</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="feature-content">
                            <h3>🚨 Real-time Crisis Support</h3>
                            <p>When RSD overwhelm hits, get immediate help. One-touch access to crisis hotlines, text support, and peer assistance.</p>
                            <ul class="feature-benefits">
                                <li>24/7 crisis hotline integration</li>
                                <li>Peer support matching</li>
                                <li>Emergency contact alerts</li>
                                <li>Location-based resources</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Mood & Trigger Tracking -->
                    <div class="feature-block reverse">
                        <div class="feature-visual">
                            <div class="mock-screen mood-tracking">
                                <div class="screen-header">
                                    <h4>Daily Check-in</h4>
                                    <span class="date">Today, March 15</span>
                                </div>
                                <div class="mood-graph">
                                    <div class="graph-area">
                                        <div class="mood-line">
                                            <div class="mood-point" style="left: 20%; bottom: 60%"></div>
                                            <div class="mood-point" style="left: 40%; bottom: 30%"></div>
                                            <div class="mood-point active" style="left: 60%; bottom: 70%"></div>
                                            <div class="mood-point" style="left: 80%; bottom: 45%"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="trigger-log">
                                    <h5>Today's Triggers</h5>
                                    <div class="trigger-item">
                                        <span class="trigger-icon">📧</span>
                                        <span class="trigger-text">Unanswered email</span>
                                        <span class="trigger-intensity">High</span>
                                    </div>
                                    <div class="trigger-item">
                                        <span class="trigger-icon">👥</span>
                                        <span class="trigger-text">Social interaction</span>
                                        <span class="trigger-intensity">Medium</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="feature-content">
                            <h3>📊 Smart Mood & Trigger Tracking</h3>
                            <p>Understand your patterns with intelligent tracking that learns from your experiences and predicts potential triggers.</p>
                            <ul class="feature-benefits">
                                <li>Daily mood check-ins</li>
                                <li>Trigger identification</li>
                                <li>Pattern recognition</li>
                                <li>Predictive insights</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Personalized Coping Tools -->
                    <div class="feature-block">
                        <div class="feature-visual">
                            <div class="mock-screen coping-tools">
                                <div class="screen-header">
                                    <h4>Your Toolkit</h4>
                                    <span class="personalization">Personalized for you</span>
                                </div>
                                <div class="tool-categories">
                                    <div class="tool-category">
                                        <h5>🧘 Mindfulness</h5>
                                        <div class="tool-list">
                                            <div class="tool-item recommended">
                                                <span class="tool-name">Box Breathing</span>
                                                <span class="effectiveness">95% effective</span>
                                            </div>
                                            <div class="tool-item">
                                                <span class="tool-name">Body Scan</span>
                                                <span class="effectiveness">78% effective</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tool-category">
                                        <h5>💭 Cognitive</h5>
                                        <div class="tool-list">
                                            <div class="tool-item">
                                                <span class="tool-name">Thought Challenge</span>
                                                <span class="effectiveness">87% effective</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="feature-content">
                            <h3>🛠️ Personalized Coping Toolkit</h3>
                            <p>AI-powered recommendations learn what works best for you, adapting techniques to your unique RSD patterns.</p>
                            <ul class="feature-benefits">
                                <li>50+ evidence-based techniques</li>
                                <li>Effectiveness tracking</li>
                                <li>Personalized recommendations</li>
                                <li>Progress analytics</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Community Integration -->
                    <div class="feature-block reverse">
                        <div class="feature-visual">
                            <div class="mock-screen community-features">
                                <div class="screen-header">
                                    <h4>Community</h4>
                                    <span class="online-count">🟢 1,247 online</span>
                                </div>
                                <div class="community-feed">
                                    <div class="community-post">
                                        <div class="post-author">
                                            <span class="avatar">S</span>
                                            <span class="name">Sarah</span>
                                        </div>
                                        <p class="post-content">"Just used the breathing exercise during a work presentation. Game changer! 🙌"</p>
                                        <div class="post-engagement">
                                            <span class="reaction">❤️ 12</span>
                                            <span class="reaction">🙌 8</span>
                                        </div>
                                    </div>
                                    <div class="community-post">
                                        <div class="post-author">
                                            <span class="avatar">M</span>
                                            <span class="name">Mike</span>
                                        </div>
                                        <p class="post-content">"Anyone else struggle with email anxiety? Looking for tips..."</p>
                                        <div class="post-engagement">
                                            <span class="reaction">🤗 5</span>
                                            <span class="reaction">💬 3</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="support-matching">
                                    <h5>🤝 Peer Support Available</h5>
                                    <button class="match-btn">Connect with Peer</button>
                                </div>
                            </div>
                        </div>
                        <div class="feature-content">
                            <h3>🤝 Integrated Community Support</h3>
                            <p>Seamlessly connect with our community of RSD warriors. Share experiences, get support, and help others.</p>
                            <ul class="feature-benefits">
                                <li>In-app community feed</li>
                                <li>Peer support matching</li>
                                <li>Anonymous sharing options</li>
                                <li>Moderated safe spaces</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Professional Care -->
                    <div class="feature-block">
                        <div class="feature-visual">
                            <div class="mock-screen professional-care">
                                <div class="screen-header">
                                    <h4>Professional Care</h4>
                                    <span class="provider-status">🟢 Dr. Chen available</span>
                                </div>
                                <div class="care-options">
                                    <div class="care-card">
                                        <h5>📅 Therapy Sessions</h5>
                                        <p>Next: Tomorrow 2:00 PM</p>
                                        <button class="care-btn">Join Video Call</button>
                                    </div>
                                    <div class="care-card">
                                        <h5>💊 Medication Tracking</h5>
                                        <p>Taken: 2/3 today</p>
                                        <button class="care-btn">Log Medication</button>
                                    </div>
                                    <div class="care-card">
                                        <h5>📊 Progress Reports</h5>
                                        <p>Ready to share with provider</p>
                                        <button class="care-btn">Send Report</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="feature-content">
                            <h3>👩‍⚕️ Professional Care Integration</h3>
                            <p>Connect with RSD-informed therapists and healthcare providers. Share your data securely and get professional guidance.</p>
                            <ul class="feature-benefits">
                                <li>Provider directory</li>
                                <li>Secure data sharing</li>
                                <li>Appointment scheduling</li>
                                <li>Progress reports</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Technology & Privacy -->
        <section class="technology-section">
            <div class="container">
                <h2>Built with Care & Privacy in Mind</h2>
                <div class="tech-grid">
                    <div class="tech-feature">
                        <span class="tech-icon">🔒</span>
                        <h3>End-to-End Encryption</h3>
                        <p>Your personal data and conversations are encrypted and never shared without your explicit consent.</p>
                    </div>
                    
                    <div class="tech-feature">
                        <span class="tech-icon">🤖</span>
                        <h3>AI-Powered Insights</h3>
                        <p>Machine learning algorithms identify patterns in your RSD triggers and suggest personalized coping strategies.</p>
                    </div>
                    
                    <div class="tech-feature">
                        <span class="tech-icon">📱</span>
                        <h3>Offline Functionality</h3>
                        <p>Core coping tools work without internet connection, ensuring support is always available when you need it.</p>
                    </div>
                    
                    <div class="tech-feature">
                        <span class="tech-icon">♿</span>
                        <h3>Accessibility First</h3>
                        <p>Designed for users with various abilities, including screen reader support and customizable interfaces.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Beta Testing Program -->
        <section class="beta-section">
            <div class="container">
                <div class="beta-content">
                    <h2>Join Our Beta Testing Program</h2>
                    <p>Help us build the best possible RSD support app. Beta testers get early access and direct input on features.</p>
                    
                    <div class="beta-benefits">
                        <div class="beta-benefit">
                            <span class="benefit-icon">🚀</span>
                            <h3>Early Access</h3>
                            <p>Test new features weeks before public release</p>
                        </div>
                        
                        <div class="beta-benefit">
                            <span class="benefit-icon">💝</span>
                            <h3>Free Premium</h3>
                            <p>Complimentary premium features for life</p>
                        </div>
                        
                        <div class="beta-benefit">
                            <span class="benefit-icon">🗣️</span>
                            <h3>Direct Input</h3>
                            <p>Your feedback shapes the final product</p>
                        </div>
                    </div>
                    
                    <div class="beta-requirements">
                        <h3>Beta Requirements:</h3>
                        <ul>
                            <li>Experience with RSD or related conditions</li>
                            <li>Willingness to provide weekly feedback</li>
                            <li>iOS 15+ or Android 10+ device</li>
                            <li>Commitment to 8-week testing period</li>
                        </ul>
                    </div>
                    
                    <div class="beta-cta">
                        <button class="btn btn-primary" onclick="applyForBeta()">Apply for Beta</button>
                        <p class="beta-note">Applications reviewed monthly. Next review: April 1st</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Development Updates -->
        <section class="updates-section">
            <div class="container">
                <h2>Development Updates</h2>
                <div class="timeline">
                    <div class="timeline-item completed">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h3>Foundation & Research</h3>
                            <time>Q3 2023</time>
                            <p>User research, technical architecture, and core feature design completed</p>
                        </div>
                    </div>
                    
                    <div class="timeline-item completed">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h3>Core Features Development</h3>
                            <time>Q4 2023</time>
                            <p>Mood tracking, coping tools, and basic UI implementation finished</p>
                        </div>
                    </div>
                    
                    <div class="timeline-item active">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h3>Beta Testing & Refinement</h3>
                            <time>Q1 2024</time>
                            <p>Community integration, AI features, and user testing in progress</p>
                        </div>
                    </div>
                    
                    <div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h3>App Store Launch</h3>
                            <time>Q2 2024</time>
                            <p>Public release on iOS and Android platforms</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section class="faq-section">
            <div class="container">
                <h2>Frequently Asked Questions</h2>
                <div class="faq-grid">
                    <div class="faq-item">
                        <h3>Will the app be free?</h3>
                        <p>The core features will be free forever. Premium features like advanced analytics and priority support will be available through subscription.</p>
                    </div>
                    
                    <div class="faq-item">
                        <h3>How do you protect my privacy?</h3>
                        <p>We use end-to-end encryption, don't sell data to third parties, and give you complete control over what information you share.</p>
                    </div>
                    
                    <div class="faq-item">
                        <h3>Can I use it with my therapist?</h3>
                        <p>Yes! The app includes features for sharing progress reports and insights with your healthcare providers securely.</p>
                    </div>
                    
                    <div class="faq-item">
                        <h3>What if I'm in crisis?</h3>
                        <p>The app includes direct integration with crisis hotlines and emergency services, plus immediate access to peer support.</p>
                    </div>
                    
                    <div class="faq-item">
                        <h3>Will it work offline?</h3>
                        <p>Core coping tools and techniques will be available offline, so you can access support even without internet connection.</p>
                    </div>
                    
                    <div class="faq-item">
                        <h3>How accurate is the AI?</h3>
                        <p>Our AI is trained on RSD-specific data and improves as it learns your patterns. It's designed to augment, not replace, professional care.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Waitlist Signup -->
        <section class="waitlist-section">
            <div class="container">
                <div class="waitlist-content">
                    <h2>Be First to Know</h2>
                    <p>Join our waitlist to get notified the moment TooSensitive app launches, plus exclusive beta access opportunities.</p>
                    
                    <form class="waitlist-form" id="waitlist-form">
                        <div class="form-row">
                            <input type="email" placeholder="Your email address" required>
                            <button type="submit" class="btn btn-primary">Join Waitlist</button>
                        </div>
                        <div class="form-options">
                            <label>
                                <input type="checkbox" name="beta_interest"> I'm interested in beta testing
                            </label>
                            <label>
                                <input type="checkbox" name="updates"> Send me development updates
                            </label>
                        </div>
                    </form>
                    
                    <div class="waitlist-stats">
                        <div class="stat">
                            <span class="stat-number">3,247</span>
                            <span class="stat-label">People waiting</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">892</span>
                            <span class="stat-label">Beta applicants</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </main>
</div>

<!-- Beta Application Modal -->
<div id="beta-modal" class="modal" style="display: none;">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Beta Testing Application</h2>
            <button class="modal-close" onclick="closeBetaModal()">&times;</button>
        </div>
        <form id="beta-form" class="beta-form">
            <div class="form-group">
                <label for="beta-email">Email Address</label>
                <input type="email" id="beta-email" name="email" required>
            </div>
            
            <div class="form-group">
                <label for="beta-experience">Experience with RSD</label>
                <select id="beta-experience" name="experience" required>
                    <option value="">Select your experience</option>
                    <option value="personal">Personal experience with RSD</option>
                    <option value="caregiver">Supporting someone with RSD</option>
                    <option value="professional">Healthcare professional</option>
                    <option value="researcher">Researcher or advocate</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="beta-device">Primary Device</label>
                <select id="beta-device" name="device" required>
                    <option value="">Select device type</option>
                    <option value="iphone">iPhone (iOS 15+)</option>
                    <option value="android">Android (10+)</option>
                    <option value="both">Both iOS and Android</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="beta-feedback">Why do you want to beta test?</label>
                <textarea id="beta-feedback" name="feedback" rows="4" required></textarea>
            </div>
            
            <div class="form-group checkbox-group">
                <label>
                    <input type="checkbox" name="commitment" required>
                    I commit to testing for the full 8-week period
                </label>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeBetaModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Submit Application</button>
            </div>
        </form>
    </div>
</div>

<?php
get_sidebar();
get_footer();
?>