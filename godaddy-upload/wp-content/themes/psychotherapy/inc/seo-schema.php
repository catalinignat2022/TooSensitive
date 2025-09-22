<?php
/**
 * SEO Schema Markup for TooSensitive: RSD & Emotional Support
 * Advanced structured data for better search engine visibility
 */

// Add Organization Schema
function toosensitive_add_organization_schema() {
    $schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'Organization',
        'name' => 'TooSensitive: RSD & Emotional Support',
        'alternateName' => 'TooSensitive',
        'url' => home_url(),
        'logo' => array(
            '@type' => 'ImageObject',
            'url' => get_theme_file_uri('/assets/images/logo.png'),
            'width' => 400,
            'height' => 400
        ),
        'description' => 'Expert support and proven strategies for managing Rejection Sensitive Dysphoria (RSD). Understanding emotional sensitivity, ADHD-related symptoms, and building resilience for better mental health.',
        'foundingDate' => '2025',
        'nonprofitStatus' => 'NonprofitType',
        'areaServed' => array(
            '@type' => 'Country',
            'name' => 'United States'
        ),
        'knowsAbout' => array(
            'Rejection Sensitive Dysphoria',
            'ADHD',
            'Emotional Sensitivity',
            'Mental Health Support',
            'Coping Strategies',
            'Emotional Regulation'
        ),
        'sameAs' => array(
            'https://www.facebook.com/toosensitive',
            'https://twitter.com/toosensitive',
            'https://www.instagram.com/toosensitive',
            'https://www.linkedin.com/company/toosensitive'
        )
    );
    
    echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\n";
}

// Add WebSite Schema with SiteNavigationElement
function toosensitive_add_website_schema() {
    $schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'WebSite',
        'name' => 'TooSensitive: RSD & Emotional Support',
        'alternateName' => 'TooSensitive',
        'url' => home_url(),
        'description' => 'Expert support and proven strategies for managing Rejection Sensitive Dysphoria (RSD)',
        'publisher' => array(
            '@type' => 'Organization',
            'name' => 'TooSensitive: RSD & Emotional Support'
        ),
        'potentialAction' => array(
            '@type' => 'SearchAction',
            'target' => array(
                '@type' => 'EntryPoint',
                'urlTemplate' => home_url() . '/?s={search_term_string}'
            ),
            'query-input' => 'required name=search_term_string'
        ),
        'mainEntity' => array(
            '@type' => 'SiteNavigationElement',
            'name' => array(
                'RSD Assessment',
                'Education',
                'Coping Strategies',
                'Community',
                'App Preview',
                'About'
            ),
            'url' => array(
                home_url('/rsd-assessment/'),
                home_url('/education/'),
                home_url('/coping-strategies/'),
                home_url('/community/'),
                home_url('/app-preview/'),
                home_url('/about/')
            )
        )
    );
    
    echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\n";
}

// Add Medical WebPage Schema for RSD pages
function toosensitive_add_medical_webpage_schema() {
    if (is_page(array('rsd-assessment', 'education', 'coping-strategies'))) {
        global $post;
        
        $schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'MedicalWebPage',
            'name' => get_the_title(),
            'url' => get_permalink(),
            'description' => get_the_excerpt() ?: 'Comprehensive information about Rejection Sensitive Dysphoria (RSD) and effective management strategies.',
            'lastReviewed' => get_the_modified_date('c'),
            'reviewedBy' => array(
                '@type' => 'Organization',
                'name' => 'TooSensitive: RSD & Emotional Support'
            ),
            'about' => array(
                '@type' => 'MedicalCondition',
                'name' => 'Rejection Sensitive Dysphoria',
                'alternateName' => 'RSD',
                'description' => 'A condition often associated with ADHD characterized by extreme emotional sensitivity to perceived rejection or criticism.',
                'associatedAnatomy' => array(
                    '@type' => 'AnatomicalSystem',
                    'name' => 'Nervous System'
                ),
                'possibleTreatment' => array(
                    '@type' => 'MedicalTherapy',
                    'name' => 'Cognitive Behavioral Therapy'
                ),
                'riskFactor' => array(
                    '@type' => 'MedicalRiskFactor',
                    'name' => 'ADHD'
                )
            ),
            'mainContentOfPage' => array(
                '@type' => 'WebPageElement',
                'cssSelector' => 'main'
            ),
            'breadcrumb' => array(
                '@type' => 'BreadcrumbList',
                'itemListElement' => array(
                    array(
                        '@type' => 'ListItem',
                        'position' => 1,
                        'name' => 'Home',
                        'item' => home_url()
                    ),
                    array(
                        '@type' => 'ListItem',
                        'position' => 2,
                        'name' => get_the_title(),
                        'item' => get_permalink()
                    )
                )
            )
        );
        
        echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\n";
    }
}

// Add FAQ Schema for relevant pages
function toosensitive_add_faq_schema() {
    if (is_page(array('education', 'about'))) {
        $faqs = array(
            array(
                'question' => 'What is Rejection Sensitive Dysphoria (RSD)?',
                'answer' => 'Rejection Sensitive Dysphoria (RSD) is a condition often associated with ADHD that causes extreme emotional sensitivity to perceived rejection, criticism, or failure. People with RSD experience intense emotional pain that can feel overwhelming and disproportionate to the situation.'
            ),
            array(
                'question' => 'How is RSD related to ADHD?',
                'answer' => 'RSD is commonly found in people with ADHD, though not everyone with ADHD experiences RSD. The emotional dysregulation that characterizes ADHD can make individuals more susceptible to intense reactions to perceived rejection or criticism.'
            ),
            array(
                'question' => 'What are effective coping strategies for RSD?',
                'answer' => 'Effective RSD coping strategies include mindfulness techniques, cognitive behavioral therapy (CBT), emotional regulation skills, building self-awareness, creating support networks, and developing healthy communication patterns. Professional therapy can also be very beneficial.'
            ),
            array(
                'question' => 'Can RSD be treated?',
                'answer' => 'While there is no specific cure for RSD, it can be effectively managed through various therapeutic approaches, medication (when appropriate), coping strategies, and lifestyle changes. Many people with RSD find significant improvement with proper support and treatment.'
            )
        );
        
        $faq_schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'FAQPage',
            'mainEntity' => array()
        );
        
        foreach ($faqs as $faq) {
            $faq_schema['mainEntity'][] = array(
                '@type' => 'Question',
                'name' => $faq['question'],
                'acceptedAnswer' => array(
                    '@type' => 'Answer',
                    'text' => $faq['answer']
                )
            );
        }
        
        echo '<script type="application/ld+json">' . json_encode($faq_schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\n";
    }
}

// Hook into wp_head to add schemas
add_action('wp_head', 'toosensitive_add_organization_schema');
add_action('wp_head', 'toosensitive_add_website_schema');
add_action('wp_head', 'toosensitive_add_medical_webpage_schema');
add_action('wp_head', 'toosensitive_add_faq_schema');

// Add Open Graph and Twitter Card meta tags
function toosensitive_add_social_meta_tags() {
    if (is_singular()) {
        global $post;
        $title = get_the_title();
        $description = get_the_excerpt() ?: get_bloginfo('description');
        $url = get_permalink();
        $image = has_post_thumbnail() ? get_the_post_thumbnail_url(null, 'large') : get_theme_file_uri('/assets/images/og-image.jpg');
        
        echo '<meta property="og:title" content="' . esc_attr($title) . '">' . "\n";
        echo '<meta property="og:description" content="' . esc_attr($description) . '">' . "\n";
        echo '<meta property="og:url" content="' . esc_url($url) . '">' . "\n";
        echo '<meta property="og:image" content="' . esc_url($image) . '">' . "\n";
        echo '<meta property="og:type" content="website">' . "\n";
        echo '<meta property="og:site_name" content="TooSensitive: RSD & Emotional Support">' . "\n";
        
        echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
        echo '<meta name="twitter:title" content="' . esc_attr($title) . '">' . "\n";
        echo '<meta name="twitter:description" content="' . esc_attr($description) . '">' . "\n";
        echo '<meta name="twitter:image" content="' . esc_url($image) . '">' . "\n";
    }
}

add_action('wp_head', 'toosensitive_add_social_meta_tags', 5);

// Add canonical URLs
function toosensitive_add_canonical_url() {
    if (is_singular()) {
        echo '<link rel="canonical" href="' . esc_url(get_permalink()) . '">' . "\n";
    } elseif (is_home()) {
        echo '<link rel="canonical" href="' . esc_url(home_url()) . '">' . "\n";
    }
}

add_action('wp_head', 'toosensitive_add_canonical_url', 10);