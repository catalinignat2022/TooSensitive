<?php
/**
 * Template Name: Community
 * 
 * Page template for RSD community features and user stories
 */

get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">
        
        <!-- Hero Section -->
        <section class="hero-section community-hero">
            <div class="container">
                <div class="hero-content">
                    <h1>RSD Community</h1>
                    <p class="hero-subtitle">
                        Connect with others who understand Rejection Sensitive Dysphoria. 
                        Share stories, find support, and grow together.
                    </p>
                    <div class="community-stats">
                        <div class="stat-item">
                            <span class="stat-number">2,847</span>
                            <span class="stat-label">Community Members</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">156</span>
                            <span class="stat-label">Stories Shared</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">4.8/5</span>
                            <span class="stat-label">Support Rating</span>
                        </div>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="community-illustration">
                        <div class="community-circles">
                            <div class="circle-member">👥</div>
                            <div class="circle-member">💬</div>
                            <div class="circle-member">❤️</div>
                            <div class="circle-member">🤝</div>
                            <div class="circle-member">🌟</div>
                            <div class="circle-member">💪</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Community Guidelines -->
        <section class="guidelines-section">
            <div class="container">
                <div class="guidelines-banner">
                    <h2>💙 Our Community Values</h2>
                    <div class="values-grid">
                        <div class="value-item">
                            <span class="value-icon">🤗</span>
                            <h3>Empathy First</h3>
                            <p>We listen with compassion and validate each other's experiences</p>
                        </div>
                        <div class="value-item">
                            <span class="value-icon">🔒</span>
                            <h3>Safe Space</h3>
                            <p>Judgment-free zone where vulnerability is welcomed and protected</p>
                        </div>
                        <div class="value-item">
                            <span class="value-icon">🌱</span>
                            <h3>Growth Mindset</h3>
                            <p>We support each other's journey toward healing and resilience</p>
                        </div>
                        <div class="value-item">
                            <span class="value-icon">🤝</span>
                            <h3>Mutual Support</h3>
                            <p>Everyone has something to offer and something to learn</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Stories -->
        <section class="stories-section">
            <div class="container">
                <h2>Community Stories</h2>
                <p class="section-intro">Real experiences from our community members who are navigating RSD</p>

                <div class="story-filter">
                    <button class="filter-btn active" data-filter="all">All Stories</button>
                    <button class="filter-btn" data-filter="success">Success Stories</button>
                    <button class="filter-btn" data-filter="struggle">Current Struggles</button>
                    <button class="filter-btn" data-filter="tips">Tips & Advice</button>
                </div>

                <div class="stories-grid">
                    <!-- Success Story -->
                    <article class="story-card success" data-category="success">
                        <div class="story-header">
                            <div class="story-avatar">
                                <span class="avatar-initials">S</span>
                            </div>
                            <div class="story-meta">
                                <h3>Sarah's Journey</h3>
                                <span class="story-tag success-tag">Success Story</span>
                                <time class="story-date">3 days ago</time>
                            </div>
                        </div>
                        <div class="story-content">
                            <h4>"I finally asked for a promotion!"</h4>
                            <p>For years, my RSD held me back from advocating for myself at work. The fear of hearing "no" was paralyzing. But after 6 months of using the coping strategies here and working with a therapist, I finally found the courage...</p>
                            <div class="story-tags">
                                <span class="tag">workplace</span>
                                <span class="tag">self-advocacy</span>
                                <span class="tag">therapy</span>
                            </div>
                        </div>
                        <div class="story-engagement">
                            <button class="engagement-btn">
                                <span class="emoji">❤️</span>
                                <span class="count">47</span>
                            </button>
                            <button class="engagement-btn">
                                <span class="emoji">💬</span>
                                <span class="count">12</span>
                            </button>
                            <button class="story-expand" onclick="expandStory(this)">Read More</button>
                        </div>
                    </article>

                    <!-- Struggle Story -->
                    <article class="story-card struggle" data-category="struggle">
                        <div class="story-header">
                            <div class="story-avatar">
                                <span class="avatar-initials">M</span>
                            </div>
                            <div class="story-meta">
                                <h3>Mike</h3>
                                <span class="story-tag struggle-tag">Looking for Support</span>
                                <time class="story-date">1 day ago</time>
                            </div>
                        </div>
                        <div class="story-content">
                            <h4>"Struggling with friendship changes"</h4>
                            <p>My best friend has been distant lately, and my RSD is in overdrive. I keep replaying every interaction, convinced I did something wrong. Has anyone else dealt with friendship anxiety like this?</p>
                            <div class="story-tags">
                                <span class="tag">friendships</span>
                                <span class="tag">anxiety</span>
                                <span class="tag">advice-needed</span>
                            </div>
                        </div>
                        <div class="story-engagement">
                            <button class="engagement-btn">
                                <span class="emoji">🤗</span>
                                <span class="count">23</span>
                            </button>
                            <button class="engagement-btn">
                                <span class="emoji">💬</span>
                                <span class="count">8</span>
                            </button>
                            <button class="story-expand" onclick="expandStory(this)">Read More</button>
                        </div>
                    </article>

                    <!-- Tips Story -->
                    <article class="story-card tips" data-category="tips">
                        <div class="story-header">
                            <div class="story-avatar">
                                <span class="avatar-initials">A</span>
                            </div>
                            <div class="story-meta">
                                <h3>Alex</h3>
                                <span class="story-tag tips-tag">Tips & Advice</span>
                                <time class="story-date">5 days ago</time>
                            </div>
                        </div>
                        <div class="story-content">
                            <h4>"My texting anxiety toolkit"</h4>
                            <p>I used to analyze every text response (or lack thereof) for hours. Here are 5 strategies that have helped me break the cycle and stay sane in digital communication...</p>
                            <div class="story-tags">
                                <span class="tag">communication</span>
                                <span class="tag">texting</span>
                                <span class="tag">toolkit</span>
                            </div>
                        </div>
                        <div class="story-engagement">
                            <button class="engagement-btn">
                                <span class="emoji">🙌</span>
                                <span class="count">62</span>
                            </button>
                            <button class="engagement-btn">
                                <span class="emoji">💬</span>
                                <span class="count">19</span>
                            </button>
                            <button class="story-expand" onclick="expandStory(this)">Read More</button>
                        </div>
                    </article>

                    <!-- Success Story 2 -->
                    <article class="story-card success" data-category="success">
                        <div class="story-header">
                            <div class="story-avatar">
                                <span class="avatar-initials">J</span>
                            </div>
                            <div class="story-meta">
                                <h3>Jordan</h3>
                                <span class="story-tag success-tag">Success Story</span>
                                <time class="story-date">1 week ago</time>
                            </div>
                        </div>
                        <div class="story-content">
                            <h4>"Dating with RSD - it gets easier"</h4>
                            <p>After my divorce, dating felt impossible. Every match who didn't respond felt like confirmation that I was unlovable. But I learned to separate my worth from other people's responses...</p>
                            <div class="story-tags">
                                <span class="tag">dating</span>
                                <span class="tag">self-worth</span>
                                <span class="tag">recovery</span>
                            </div>
                        </div>
                        <div class="story-engagement">
                            <button class="engagement-btn">
                                <span class="emoji">💕</span>
                                <span class="count">91</span>
                            </button>
                            <button class="engagement-btn">
                                <span class="emoji">💬</span>
                                <span class="count">24</span>
                            </button>
                            <button class="story-expand" onclick="expandStory(this)">Read More</button>
                        </div>
                    </article>

                    <!-- Tips Story 2 -->
                    <article class="story-card tips" data-category="tips">
                        <div class="story-header">
                            <div class="story-avatar">
                                <span class="avatar-initials">R</span>
                            </div>
                            <div class="story-meta">
                                <h3>Riley</h3>
                                <span class="story-tag tips-tag">Tips & Advice</span>
                                <time class="story-date">2 weeks ago</time>
                            </div>
                        </div>
                        <div class="story-content">
                            <h4>"RSD at work: 3 game-changing strategies"</h4>
                            <p>Performance reviews used to send me into panic mode. Here's how I learned to receive feedback without my RSD taking over, and even use it for growth...</p>
                            <div class="story-tags">
                                <span class="tag">workplace</span>
                                <span class="tag">feedback</span>
                                <span class="tag">growth</span>
                            </div>
                        </div>
                        <div class="story-engagement">
                            <button class="engagement-btn">
                                <span class="emoji">👏</span>
                                <span class="count">78</span>
                            </button>
                            <button class="engagement-btn">
                                <span class="emoji">💬</span>
                                <span class="count">31</span>
                            </button>
                            <button class="story-expand" onclick="expandStory(this)">Read More</button>
                        </div>
                    </article>

                    <!-- Struggle Story 2 -->
                    <article class="story-card struggle" data-category="struggle">
                        <div class="story-header">
                            <div class="story-avatar">
                                <span class="avatar-initials">T</span>
                            </div>
                            <div class="story-meta">
                                <h3>Taylor</h3>
                                <span class="story-tag struggle-tag">Looking for Support</span>
                                <time class="story-date">3 weeks ago</time>
                            </div>
                        </div>
                        <div class="story-content">
                            <h4>"Family doesn't understand RSD"</h4>
                            <p>I tried explaining RSD to my family, but they just say I'm "too sensitive" and need to "toughen up." It's so isolating when the people closest to you don't get it. How do you cope?</p>
                            <div class="story-tags">
                                <span class="tag">family</span>
                                <span class="tag">understanding</span>
                                <span class="tag">isolation</span>
                            </div>
                        </div>
                        <div class="story-engagement">
                            <button class="engagement-btn">
                                <span class="emoji">🫂</span>
                                <span class="count">156</span>
                            </button>
                            <button class="engagement-btn">
                                <span class="emoji">💬</span>
                                <span class="count">43</span>
                            </button>
                            <button class="story-expand" onclick="expandStory(this)">Read More</button>
                        </div>
                    </article>
                </div>

                <div class="load-more-section">
                    <button class="btn btn-outline" id="load-more-stories">Load More Stories</button>
                    <p class="story-count">Showing 6 of 156 stories</p>
                </div>
            </div>
        </section>

        <!-- Share Your Story -->
        <section class="share-story-section">
            <div class="container">
                <div class="share-prompt">
                    <h2>Share Your Story</h2>
                    <p>Your experience could help someone feel less alone. All stories are reviewed before publishing to ensure safety and privacy.</p>
                    
                    <div class="share-options">
                        <div class="share-option">
                            <h3>🌟 Success Story</h3>
                            <p>Share a breakthrough, achievement, or positive progress in your RSD journey</p>
                            <button class="btn btn-primary" onclick="openStoryForm('success')">Share Success</button>
                        </div>
                        
                        <div class="share-option">
                            <h3>🤝 Looking for Support</h3>
                            <p>Share a current challenge and connect with others who understand</p>
                            <button class="btn btn-primary" onclick="openStoryForm('support')">Request Support</button>
                        </div>
                        
                        <div class="share-option">
                            <h3>💡 Tips & Advice</h3>
                            <p>Share strategies, tools, or insights that have helped you manage RSD</p>
                            <button class="btn btn-primary" onclick="openStoryForm('tips')">Share Tips</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Community Resources -->
        <section class="community-resources">
            <div class="container">
                <h2>Community Resources</h2>
                <div class="resources-grid">
                    <div class="resource-card">
                        <h3>📚 Resource Library</h3>
                        <p>Community-curated collection of helpful articles, books, and research</p>
                        <div class="resource-stats">
                            <span>🔖 247 resources</span>
                            <span>⭐ Rated by members</span>
                        </div>
                        <button class="btn btn-outline">Browse Resources</button>
                    </div>
                    
                    <div class="resource-card">
                        <h3>🎙️ Community Podcast</h3>
                        <p>Weekly discussions featuring member stories and expert insights</p>
                        <div class="resource-stats">
                            <span>🎧 32 episodes</span>
                            <span>⭐ 4.9/5 rating</span>
                        </div>
                        <button class="btn btn-outline">Listen Now</button>
                    </div>
                    
                    <div class="resource-card">
                        <h3>💬 Support Groups</h3>
                        <p>Virtual and local meetups for deeper connection and support</p>
                        <div class="resource-stats">
                            <span>🌍 15 locations</span>
                            <span>📅 Weekly meetings</span>
                        </div>
                        <button class="btn btn-outline">Find Groups</button>
                    </div>
                    
                    <div class="resource-card">
                        <h3>🎨 Creative Expressions</h3>
                        <p>Art, poetry, music, and other creative works by community members</p>
                        <div class="resource-stats">
                            <span>🎭 89 creations</span>
                            <span>💝 Healing through art</span>
                        </div>
                        <button class="btn btn-outline">Explore Art</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Professional Directory -->
        <section class="professional-directory">
            <div class="container">
                <h2>RSD-Informed Professionals</h2>
                <p class="section-intro">Therapists, coaches, and other professionals recommended by our community</p>
                
                <div class="directory-search">
                    <div class="search-filters">
                        <input type="text" placeholder="Search by location or specialty" class="search-input">
                        <select class="filter-select">
                            <option value="">All Professions</option>
                            <option value="therapist">Therapists</option>
                            <option value="psychiatrist">Psychiatrists</option>
                            <option value="coach">Coaches</option>
                            <option value="support-group">Support Groups</option>
                        </select>
                        <button class="btn btn-primary">Search</button>
                    </div>
                </div>

                <div class="professional-preview">
                    <div class="professional-card">
                        <div class="professional-info">
                            <h3>Dr. Sarah Chen, PhD</h3>
                            <p class="specialty">Clinical Psychologist specializing in ADHD & RSD</p>
                            <p class="location">📍 San Francisco, CA | Virtual sessions available</p>
                        </div>
                        <div class="professional-rating">
                            <div class="stars">⭐⭐⭐⭐⭐</div>
                            <span class="review-count">(23 community reviews)</span>
                        </div>
                    </div>
                    
                    <div class="directory-cta">
                        <p>Access our full directory of RSD-informed professionals</p>
                        <button class="btn btn-primary">View Full Directory</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Community Guidelines Modal Trigger -->
        <section class="guidelines-link">
            <div class="container">
                <div class="guidelines-footer">
                    <p>
                        By participating in our community, you agree to our 
                        <button class="link-button" onclick="showGuidelines()">Community Guidelines</button> 
                        and <a href="<?php echo home_url('/privacy-policy'); ?>">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </section>

        <!-- Email Signup -->
        <section class="signup-section">
            <div class="container">
                <?php 
                include get_template_directory() . '/includes/email-signup.php';
                echo do_shortcode('[email_signup title="Join Our Community Updates" description="Get weekly highlights from our community and never miss inspiring stories." button_text="Join Community"]');
                ?>
            </div>
        </section>

    </main>
</div>

<!-- Story Form Modal -->
<div id="story-modal" class="modal" style="display: none;">
    <div class="modal-content">
        <div class="modal-header">
            <h2 id="story-modal-title">Share Your Story</h2>
            <button class="modal-close" onclick="closeStoryModal()">&times;</button>
        </div>
        <form id="story-form" class="story-form">
            <div class="form-group">
                <label for="story-title">Story Title</label>
                <input type="text" id="story-title" name="title" required>
            </div>
            
            <div class="form-group">
                <label for="story-content">Your Story</label>
                <textarea id="story-content" name="content" rows="8" required placeholder="Share your experience..."></textarea>
            </div>
            
            <div class="form-group">
                <label for="story-tags">Tags (optional)</label>
                <input type="text" id="story-tags" name="tags" placeholder="e.g., workplace, dating, therapy">
                <small>Separate tags with commas</small>
            </div>
            
            <div class="form-group">
                <label for="story-name">Display Name</label>
                <input type="text" id="story-name" name="name" placeholder="How you'd like to be known">
            </div>
            
            <div class="form-group checkbox-group">
                <label>
                    <input type="checkbox" id="story-anonymous" name="anonymous">
                    Share anonymously
                </label>
            </div>
            
            <div class="form-group checkbox-group">
                <label>
                    <input type="checkbox" id="story-guidelines" name="guidelines" required>
                    I agree to the community guidelines
                </label>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeStoryModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Submit Story</button>
            </div>
        </form>
    </div>
</div>

<?php
get_sidebar();
get_footer();
?>