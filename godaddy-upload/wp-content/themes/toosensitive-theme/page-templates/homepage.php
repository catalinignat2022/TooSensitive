<?php
/**
 * Template Name: Homepage
 * 
 * The homepage template for TooSensitive
 */

get_header(); ?>

<main id="main" class="site-main homepage" role="main">
    
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content fade-in-up">
                <h1>Do people tell you you're "too sensitive"?</h1>
                <p class="hero-subtitle">
                    Does criticism hit you like a physical blow? Do you feel overwhelming shame when someone seems disappointed in you? 
                    <strong>You're not broken. You might have RSD.</strong>
                </p>
                
                <div class="btn-group">
                    <a href="<?php echo home_url('/assessment'); ?>" class="btn btn-primary">
                        Take the 2-Minute Assessment
                    </a>
                    <a href="<?php echo home_url('/what-is-rsd'); ?>" class="btn btn-outline">
                        Learn About RSD
                    </a>
                </div>
                
                <p class="hero-note">
                    <small>Join 10,000+ people discovering they're not alone</small>
                </p>
            </div>
        </div>
    </section>

    <!-- Problem Recognition Section -->
    <section class="content-section">
        <div class="container">
            <div class="section-header">
                <h2>You're Not the Only One</h2>
                <p>Millions of people experience intense emotional reactions to criticism and rejection</p>
            </div>
            
            <div class="grid grid-3">
                <div class="card">
                    <h3>😢 Overwhelming Emotions</h3>
                    <p>A small criticism feels like the end of the world. You replay conversations for days, searching for hidden rejection.</p>
                </div>
                
                <div class="card">
                    <h3>🤐 Avoiding Situations</h3>
                    <p>You avoid asking for help, speaking up in meetings, or trying new things because you can't handle potential criticism.</p>
                </div>
                
                <div class="card">
                    <h3>😞 Feeling "Broken"</h3>
                    <p>People tell you to "get thicker skin" or "stop being so sensitive," making you feel like something's wrong with you.</p>
                </div>
            </div>
            
            <div class="text-center mt-4">
                <p class="hero-subtitle">
                    <strong>What if we told you this isn't a character flaw?</strong><br>
                    It's a neurological condition called Rejection Sensitive Dysphoria (RSD).
                </p>
            </div>
        </div>
    </section>

    <!-- What is RSD Section -->
    <section class="content-section" style="background: var(--light-gray);">
        <div class="container">
            <div class="grid grid-2">
                <div>
                    <h2>Understanding RSD</h2>
                    <p>Rejection Sensitive Dysphoria (RSD) is an extreme emotional sensitivity to perceived criticism or rejection. It's not just being "sensitive" – it's a neurological condition that affects millions.</p>
                    
                    <h3>Key Facts:</h3>
                    <ul style="list-style: none; padding-left: 0;">
                        <li>✓ Affects up to 70% of people with ADHD</li>
                        <li>✓ Not a character flaw or weakness</li>
                        <li>✓ Can be triggered by real OR perceived rejection</li>
                        <li>✓ Often misdiagnosed as depression or anxiety</li>
                    </ul>
                    
                    <a href="<?php echo home_url('/what-is-rsd'); ?>" class="btn btn-primary">
                        Learn More About RSD
                    </a>
                </div>
                
                <div class="card">
                    <h3>Common RSD Triggers</h3>
                    <ul style="margin-bottom: 2rem;">
                        <li>Receiving constructive feedback at work</li>
                        <li>Not getting an immediate text response</li>
                        <li>Feeling excluded from social activities</li>
                        <li>Making a mistake in public</li>
                        <li>Sensing someone's disappointment</li>
                    </ul>
                    
                    <h3>Typical Reactions</h3>
                    <ul>
                        <li>Intense emotional pain</li>
                        <li>Overwhelming shame</li>
                        <li>Rage or anger outbursts</li>
                        <li>Complete withdrawal</li>
                        <li>Physical symptoms (headaches, nausea)</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Assessment CTA Section -->
    <section class="content-section">
        <div class="container">
            <div class="assessment-cta text-center">
                <h2>Could You Have RSD?</h2>
                <p class="hero-subtitle">
                    Take our scientifically-informed assessment to understand your sensitivity patterns
                </p>
                
                <div class="assessment-preview card" style="max-width: 600px; margin: 2rem auto;">
                    <h3>Sample Questions:</h3>
                    <div class="question-preview">
                        <p><strong>"When someone criticizes my work, I..."</strong></p>
                        <ul style="list-style: none; text-align: left;">
                            <li>□ Feel hurt for a few minutes, then move on</li>
                            <li>□ Think about it for hours or days</li>
                            <li>□ Feel like my world is ending</li>
                            <li>□ Want to quit or hide</li>
                        </ul>
                    </div>
                    
                    <a href="<?php echo home_url('/assessment'); ?>" class="btn btn-primary">
                        Take Full Assessment (2 minutes)
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Community Stories Section -->
    <section class="content-section" style="background: var(--light-gray);">
        <div class="container">
            <div class="section-header">
                <h2>You're Not Alone</h2>
                <p>Real stories from people who understand exactly what you're going through</p>
            </div>
            
            <div class="grid grid-2">
                <div class="card">
                    <blockquote>
                        <p>"For 30 years, I thought I was just 'too emotional.' Learning about RSD changed my life. Finally, someone understood that it wasn't my fault."</p>
                        <cite>— Sarah, Software Developer</cite>
                    </blockquote>
                </div>
                
                <div class="card">
                    <blockquote>
                        <p>"The smallest criticism at work would send me into a spiral for days. Now I have tools to recognize when RSD is being triggered."</p>
                        <cite>— Michael, Teacher</cite>
                    </blockquote>
                </div>
            </div>
            
            <div class="text-center mt-4">
                <a href="<?php echo home_url('/community'); ?>" class="btn btn-outline">
                    Read More Stories
                </a>
            </div>
        </div>
    </section>

    <!-- Help Available Section -->
    <section class="content-section">
        <div class="container">
            <div class="section-header">
                <h2>Help is Available</h2>
                <p>You don't have to navigate RSD alone. We're building tools and resources to support you.</p>
            </div>
            
            <div class="grid grid-3">
                <div class="card">
                    <h3>🧭 Immediate Support</h3>
                    <p>Crisis coping strategies, breathing exercises, and grounding techniques for when RSD hits hard.</p>
                    <a href="<?php echo home_url('/coping-strategies'); ?>" class="btn btn-outline">
                        Get Emergency Toolkit
                    </a>
                </div>
                
                <div class="card">
                    <h3>📚 Education & Understanding</h3>
                    <p>Learn about the science behind RSD, how it affects your brain, and why you react the way you do.</p>
                    <a href="<?php echo home_url('/what-is-rsd'); ?>" class="btn btn-outline">
                        Understand RSD
                    </a>
                </div>
                
                <div class="card">
                    <h3>📱 The TooSensitive App</h3>
                    <p>We're building a comprehensive app with daily support, community, and professional resources.</p>
                    <a href="<?php echo home_url('/app'); ?>" class="btn btn-outline">
                        Join Beta Waitlist
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="content-section" style="background: var(--primary-blue); color: white;">
        <div class="container">
            <div class="grid grid-3 text-center">
                <div>
                    <h3 style="color: white; font-size: 3rem; margin-bottom: 0.5rem;">70%</h3>
                    <p>of people with ADHD experience RSD</p>
                </div>
                <div>
                    <h3 style="color: white; font-size: 3rem; margin-bottom: 0.5rem;">95%</h3>
                    <p>don't know RSD has a name</p>
                </div>
                <div>
                    <h3 style="color: white; font-size: 3rem; margin-bottom: 0.5rem;">0</h3>
                    <p>dedicated apps existed... until now</p>
                </div>
            </div>
        </div>
    </section>

</main>

<!-- Email Signup Section -->
<section class="email-signup">
    <div class="container">
        <div class="content-wrapper text-center">
            <h2>Stay Updated on RSD Resources</h2>
            <p>Get weekly tips, latest research, and be first to know about our app launch.</p>
            
            <form class="email-form" action="#" method="post">
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Your email address" 
                    required 
                    class="email-input"
                >
                <button type="submit" class="btn btn-secondary">Subscribe</button>
            </form>
            
            <p style="margin-top: 1rem; opacity: 0.9;">
                <small>Join 5,247 people on our waitlist. No spam, unsubscribe anytime.</small>
            </p>
        </div>
    </div>
</section>

<?php get_footer(); ?>