<?php
/**
 * Template Name: Assessment Page
 * 
 * RSD Assessment tool page
 */

get_header(); ?>

<main id="main" class="site-main assessment-page" role="main">
    
    <!-- Hero Section -->
    <section class="hero" style="padding: 3rem 0;">
        <div class="container">
            <div class="content-wrapper text-center">
                <h1>RSD Assessment: Do You Have Rejection Sensitive Dysphoria?</h1>
                <p class="hero-subtitle">
                    This scientifically-informed assessment will help you understand your sensitivity to criticism and rejection. 
                    It takes about 2 minutes to complete.
                </p>
                <p><small><strong>Note:</strong> This is not a medical diagnosis. For professional evaluation, consult a healthcare provider.</small></p>
            </div>
        </div>
    </section>

    <!-- Assessment Form -->
    <section class="content-section">
        <div class="container">
            <div class="assessment-container">
                <div id="assessment-form">
                    <form id="rsd-assessment" method="post">
                        <?php wp_nonce_field('toosensitive_nonce', 'nonce'); ?>
                        
                        <!-- Question 1 -->
                        <div class="question">
                            <h3>1. When someone criticizes my work or gives me feedback:</h3>
                            <div class="question-options">
                                <label class="option">
                                    <input type="radio" name="question_1" value="1">
                                    <span>I consider their input and move on relatively quickly</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_1" value="2">
                                    <span>I feel hurt for a while but eventually get over it</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_1" value="3">
                                    <span>I replay the conversation in my head for hours or days</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_1" value="4">
                                    <span>I feel devastated, like my world is falling apart</span>
                                </label>
                            </div>
                        </div>

                        <!-- Question 2 -->
                        <div class="question">
                            <h3>2. When I don't get an immediate response to a text or email:</h3>
                            <div class="question-options">
                                <label class="option">
                                    <input type="radio" name="question_2" value="1">
                                    <span>I assume they're busy and don't think much about it</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_2" value="2">
                                    <span>I wonder what they're doing but don't worry too much</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_2" value="3">
                                    <span>I start wondering if I said something wrong</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_2" value="4">
                                    <span>I convince myself they hate me or are mad at me</span>
                                </label>
                            </div>
                        </div>

                        <!-- Question 3 -->
                        <div class="question">
                            <h3>3. When I make a mistake in front of others:</h3>
                            <div class="question-options">
                                <label class="option">
                                    <input type="radio" name="question_3" value="1">
                                    <span>I acknowledge it, learn from it, and move on</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_3" value="2">
                                    <span>I feel embarrassed but it doesn't ruin my day</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_3" value="3">
                                    <span>I feel intense shame and want to hide</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_3" value="4">
                                    <span>I feel like everyone thinks I'm incompetent or stupid</span>
                                </label>
                            </div>
                        </div>

                        <!-- Question 4 -->
                        <div class="question">
                            <h3>4. When someone seems disappointed in me:</h3>
                            <div class="question-options">
                                <label class="option">
                                    <input type="radio" name="question_4" value="1">
                                    <span>I try to understand their perspective and improve</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_4" value="2">
                                    <span>I feel bad but can separate their disappointment from my worth</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_4" value="3">
                                    <span>I feel guilty and replay what I could have done differently</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_4" value="4">
                                    <span>I feel crushed and like I'm a complete failure</span>
                                </label>
                            </div>
                        </div>

                        <!-- Question 5 -->
                        <div class="question">
                            <h3>5. In social situations, I often worry about:</h3>
                            <div class="question-options">
                                <label class="option">
                                    <input type="radio" name="question_5" value="1">
                                    <span>Having a good time and connecting with others</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_5" value="2">
                                    <span>Whether I'm being interesting enough</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_5" value="3">
                                    <span>Whether people really want me there</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_5" value="4">
                                    <span>Being judged, rejected, or excluded by everyone</span>
                                </label>
                            </div>
                        </div>

                        <!-- Question 6 -->
                        <div class="question">
                            <h3>6. When someone cancels plans with me:</h3>
                            <div class="question-options">
                                <label class="option">
                                    <input type="radio" name="question_6" value="1">
                                    <span>I'm disappointed but understand things come up</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_6" value="2">
                                    <span>I feel let down but don't take it personally</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_6" value="3">
                                    <span>I wonder if they're avoiding me specifically</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_6" value="4">
                                    <span>I assume they don't actually want to spend time with me</span>
                                </label>
                            </div>
                        </div>

                        <!-- Question 7 -->
                        <div class="question">
                            <h3>7. People have told me I'm "too sensitive" or need "thicker skin":</h3>
                            <div class="question-options">
                                <label class="option">
                                    <input type="radio" name="question_7" value="1">
                                    <span>Rarely or never</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_7" value="2">
                                    <span>Occasionally, usually about specific topics</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_7" value="3">
                                    <span>Frequently, across different relationships</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_7" value="4">
                                    <span>Constantly, and it makes me feel broken or wrong</span>
                                </label>
                            </div>
                        </div>

                        <!-- Question 8 -->
                        <div class="question">
                            <h3>8. When experiencing rejection or criticism, I sometimes feel:</h3>
                            <div class="question-options">
                                <label class="option">
                                    <input type="radio" name="question_8" value="1">
                                    <span>Mild disappointment that passes quickly</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_8" value="2">
                                    <span>Hurt feelings that take some time to heal</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_8" value="3">
                                    <span>Intense emotional pain that's hard to control</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_8" value="4">
                                    <span>Physical symptoms like nausea, headaches, or panic</span>
                                </label>
                            </div>
                        </div>

                        <!-- Question 9 -->
                        <div class="question">
                            <h3>9. I avoid certain activities or situations because:</h3>
                            <div class="question-options">
                                <label class="option">
                                    <input type="radio" name="question_9" value="1">
                                    <span>I'm not interested in them</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_9" value="2">
                                    <span>I prefer other activities more</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_9" value="3">
                                    <span>I'm worried about not being good enough</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_9" value="4">
                                    <span>I can't handle the possibility of criticism or failure</span>
                                </label>
                            </div>
                        </div>

                        <!-- Question 10 -->
                        <div class="question">
                            <h3>10. My emotional reactions to rejection or criticism:</h3>
                            <div class="question-options">
                                <label class="option">
                                    <input type="radio" name="question_10" value="1">
                                    <span>Are proportionate to the situation</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_10" value="2">
                                    <span>Are sometimes stronger than I'd like</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_10" value="3">
                                    <span>Often feel too intense for the situation</span>
                                </label>
                                <label class="option">
                                    <input type="radio" name="question_10" value="4">
                                    <span>Are so overwhelming they interfere with my daily life</span>
                                </label>
                            </div>
                        </div>

                        <!-- Email Capture -->
                        <div class="email-capture card" style="margin-top: 2rem;">
                            <h3>Get Your Detailed Results</h3>
                            <p>Enter your email to receive your assessment results and personalized RSD resources.</p>
                            <div class="email-form">
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Your email address" 
                                    required 
                                    class="email-input"
                                >
                            </div>
                            <p><small>We'll send you helpful resources based on your results. No spam, unsubscribe anytime.</small></p>
                        </div>

                        <div class="text-center" style="margin-top: 2rem;">
                            <button type="submit" class="btn btn-primary" style="font-size: 1.25rem; padding: 1rem 3rem;">
                                Get My Results
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Results Section (Hidden by default) -->
                <div id="assessment-results" style="display: none;">
                    <div class="results-content">
                        <!-- Results will be populated by JavaScript -->
                    </div>
                    
                    <div class="next-steps card">
                        <h3>Recommended Next Steps:</h3>
                        <div class="recommendations">
                            <!-- Recommendations will be populated based on results -->
                        </div>
                    </div>
                    
                    <div class="text-center mt-4">
                        <a href="<?php echo home_url('/what-is-rsd'); ?>" class="btn btn-primary">
                            Learn More About RSD
                        </a>
                        <a href="<?php echo home_url('/coping-strategies'); ?>" class="btn btn-outline">
                            Get Coping Strategies
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Information Section -->
    <section class="content-section" style="background: var(--light-gray);">
        <div class="container">
            <div class="grid grid-2">
                <div class="card">
                    <h3>About This Assessment</h3>
                    <p>This assessment is based on research by Dr. William Dodson and other experts in the field of emotional dysregulation and ADHD.</p>
                    <p>It evaluates your sensitivity to perceived criticism and rejection across different life areas.</p>
                    <p><strong>Important:</strong> This is not a medical diagnosis. If you're experiencing significant emotional distress, please consult a qualified healthcare professional.</p>
                </div>
                
                <div class="card">
                    <h3>What Happens Next?</h3>
                    <ul>
                        <li>Receive your personalized results via email</li>
                        <li>Get resources tailored to your sensitivity level</li>
                        <li>Access coping strategies and educational content</li>
                        <li>Join our community of people with similar experiences</li>
                        <li>Be notified when our comprehensive app launches</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

</main>

<?php get_footer(); ?>