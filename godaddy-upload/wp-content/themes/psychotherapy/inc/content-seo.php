<?php
/**
 * Content SEO and Internal Linking for TooSensitive
 * Strategic linking and keyword optimization for RSD content
 */

// Add automatic internal linking for RSD-related terms
function toosensitive_add_internal_links($content) {
    if (is_admin() || !is_singular()) {
        return $content;
    }
    
    // Define keyword to URL mappings for automatic internal linking
    $internal_links = array(
        'Rejection Sensitive Dysphoria' => home_url('/education/'),
        'RSD assessment' => home_url('/rsd-assessment/'),
        'RSD test' => home_url('/rsd-assessment/'),
        'coping strategies' => home_url('/coping-strategies/'),
        'emotional sensitivity' => home_url('/education/'),
        'ADHD' => home_url('/education/'),
        'rejection sensitivity' => home_url('/education/'),
        'community support' => home_url('/community/'),
        'calm down techniques' => home_url('/calm-now/'),
        'breathing exercises' => home_url('/calm-now/'),
        'mental health support' => home_url('/about/'),
        'emotional regulation' => home_url('/coping-strategies/')
    );
    
    foreach ($internal_links as $keyword => $url) {
        // Only link if the keyword isn't already linked and we're not on the target page
        if (strpos($content, $keyword) !== false && 
            strpos($content, 'href="' . $url . '"') === false && 
            get_permalink() !== $url) {
            
            $pattern = '/\b(' . preg_quote($keyword, '/') . ')\b(?![^<]*>)/i';
            $replacement = '<a href="' . $url . '" title="Learn more about ' . $keyword . '">$1</a>';
            $content = preg_replace($pattern, $replacement, $content, 1); // Only replace first occurrence
        }
    }
    
    return $content;
}
add_filter('the_content', 'toosensitive_add_internal_links', 999);

// Add related posts section for better internal linking
function toosensitive_add_related_posts() {
    if (is_singular('post') || is_page()) {
        global $post;
        
        // Get related pages based on content keywords
        $related_pages = array();
        
        if (is_page('home') || is_front_page()) {
            $related_pages = array(
                array('title' => 'Take Our Free RSD Assessment', 'url' => home_url('/rsd-assessment/'), 'desc' => 'Evaluate your RSD symptoms with our comprehensive questionnaire'),
                array('title' => 'Learn About RSD', 'url' => home_url('/education/'), 'desc' => 'Understanding Rejection Sensitive Dysphoria and its impact'),
                array('title' => 'Effective Coping Strategies', 'url' => home_url('/coping-strategies/'), 'desc' => 'Proven techniques for managing RSD symptoms')
            );
        } elseif (is_page('rsd-assessment')) {
            $related_pages = array(
                array('title' => 'Understanding Your Results', 'url' => home_url('/education/'), 'desc' => 'Learn more about RSD and emotional sensitivity'),
                array('title' => 'Coping Strategies', 'url' => home_url('/coping-strategies/'), 'desc' => 'Practical techniques for managing RSD'),
                array('title' => 'Join Our Community', 'url' => home_url('/community/'), 'desc' => 'Connect with others who understand RSD')
            );
        } elseif (is_page('education')) {
            $related_pages = array(
                array('title' => 'RSD Assessment', 'url' => home_url('/rsd-assessment/'), 'desc' => 'Test your RSD symptoms'),
                array('title' => 'Coping Strategies', 'url' => home_url('/coping-strategies/'), 'desc' => 'Learn management techniques'),
                array('title' => 'Emergency Support', 'url' => home_url('/calm-now/'), 'desc' => 'Immediate help when you need it')
            );
        }
        
        if (!empty($related_pages)) {
            echo '<section class="related-posts" role="complementary">';
            echo '<h3>Related Resources</h3>';
            echo '<div class="related-posts-grid">';
            
            foreach ($related_pages as $page) {
                echo '<article class="related-post-card">';
                echo '<h4><a href="' . esc_url($page['url']) . '">' . esc_html($page['title']) . '</a></h4>';
                echo '<p>' . esc_html($page['desc']) . '</p>';
                echo '</article>';
            }
            
            echo '</div>';
            echo '</section>';
        }
    }
}
add_action('wp_footer', 'toosensitive_add_related_posts');

// Add breadcrumbs for better navigation and SEO
function toosensitive_breadcrumbs() {
    if (is_front_page()) {
        return;
    }
    
    $separator = ' › ';
    $breadcrumbs = array();
    $breadcrumbs[] = '<a href="' . home_url() . '" itemprop="item"><span itemprop="name">Home</span></a>';
    
    if (is_page()) {
        global $post;
        if ($post->post_parent) {
            $parent_id = $post->post_parent;
            $breadcrumbs[] = '<a href="' . get_permalink($parent_id) . '" itemprop="item"><span itemprop="name">' . get_the_title($parent_id) . '</span></a>';
        }
        $breadcrumbs[] = '<span itemprop="name">' . get_the_title() . '</span>';
    } elseif (is_single()) {
        $categories = get_the_category();
        if ($categories) {
            $category = $categories[0];
            $breadcrumbs[] = '<a href="' . get_category_link($category->term_id) . '" itemprop="item"><span itemprop="name">' . $category->name . '</span></a>';
        }
        $breadcrumbs[] = '<span itemprop="name">' . get_the_title() . '</span>';
    } elseif (is_category()) {
        $breadcrumbs[] = '<span itemprop="name">Category: ' . single_cat_title('', false) . '</span>';
    } elseif (is_search()) {
        $breadcrumbs[] = '<span itemprop="name">Search Results for: ' . get_search_query() . '</span>';
    }
    
    if (!empty($breadcrumbs)) {
        echo '<nav class="breadcrumbs" role="navigation" aria-label="Breadcrumb Navigation">';
        echo '<ol itemscope itemtype="https://schema.org/BreadcrumbList">';
        
        foreach ($breadcrumbs as $index => $breadcrumb) {
            echo '<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
            echo '<meta itemprop="position" content="' . ($index + 1) . '" />';
            echo $breadcrumb;
            echo '</li>';
            
            if ($index < count($breadcrumbs) - 1) {
                echo '<li class="separator">' . $separator . '</li>';
            }
        }
        
        echo '</ol>';
        echo '</nav>';
    }
}

// Add keyword density optimization
function toosensitive_optimize_content_keywords($content) {
    if (is_admin()) {
        return $content;
    }
    
    // Target keywords for different pages
    $page_keywords = array();
    
    if (is_page('home') || is_front_page()) {
        $page_keywords = array('Rejection Sensitive Dysphoria', 'RSD', 'emotional sensitivity', 'ADHD');
    } elseif (is_page('rsd-assessment')) {
        $page_keywords = array('RSD assessment', 'rejection sensitivity test', 'ADHD evaluation', 'emotional sensitivity quiz');
    } elseif (is_page('education')) {
        $page_keywords = array('RSD education', 'rejection sensitive dysphoria information', 'ADHD emotional symptoms');
    } elseif (is_page('coping-strategies')) {
        $page_keywords = array('RSD coping strategies', 'rejection sensitivity management', 'emotional regulation techniques');
    }
    
    // Add semantic variations and LSI keywords
    $semantic_keywords = array(
        'emotional overwhelm',
        'rejection fear',
        'criticism sensitivity',
        'ADHD emotional dysregulation',
        'hypersensitivity',
        'emotional intensity',
        'rejection trauma',
        'self-esteem issues',
        'emotional validation',
        'mental health support'
    );
    
    return $content;
}
add_filter('the_content', 'toosensitive_optimize_content_keywords');

// Add schema markup for articles
function toosensitive_add_article_schema() {
    if (is_singular('post')) {
        global $post;
        
        $schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'Article',
            'headline' => get_the_title(),
            'description' => get_the_excerpt(),
            'author' => array(
                '@type' => 'Organization',
                'name' => 'TooSensitive: RSD & Emotional Support'
            ),
            'publisher' => array(
                '@type' => 'Organization',
                'name' => 'TooSensitive: RSD & Emotional Support',
                'logo' => array(
                    '@type' => 'ImageObject',
                    'url' => get_theme_file_uri('/assets/images/logo.png')
                )
            ),
            'datePublished' => get_the_date('c'),
            'dateModified' => get_the_modified_date('c'),
            'mainEntityOfPage' => array(
                '@type' => 'WebPage',
                '@id' => get_permalink()
            ),
            'image' => has_post_thumbnail() ? get_the_post_thumbnail_url(null, 'large') : get_theme_file_uri('/assets/images/default-article.jpg'),
            'keywords' => 'RSD, Rejection Sensitive Dysphoria, ADHD, emotional sensitivity, mental health',
            'about' => array(
                '@type' => 'Thing',
                'name' => 'Rejection Sensitive Dysphoria'
            )
        );
        
        echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\n";
    }
}
add_action('wp_head', 'toosensitive_add_article_schema');

// Add CSS for related posts and breadcrumbs
function toosensitive_content_seo_styles() {
    echo '<style>
    .breadcrumbs { margin: 1rem 0; font-size: 0.9rem; color: #666; }
    .breadcrumbs ol { list-style: none; display: flex; flex-wrap: wrap; padding: 0; margin: 0; }
    .breadcrumbs li { margin-right: 0.5rem; }
    .breadcrumbs a { color: #4d7a79; text-decoration: none; }
    .breadcrumbs a:hover { text-decoration: underline; }
    .separator { color: #999; }
    
    .related-posts { margin: 2rem 0; padding: 2rem; background: #f9f9f9; border-radius: 8px; }
    .related-posts h3 { margin-bottom: 1rem; color: #333; }
    .related-posts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }
    .related-post-card { background: #fff; padding: 1rem; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .related-post-card h4 { margin: 0 0 0.5rem 0; }
    .related-post-card h4 a { color: #4d7a79; text-decoration: none; }
    .related-post-card h4 a:hover { color: #366e6d; }
    .related-post-card p { margin: 0; font-size: 0.9rem; color: #666; }
    </style>';
}
add_action('wp_head', 'toosensitive_content_seo_styles');