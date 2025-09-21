#!/usr/bin/env python3

import re

# Read the file
with open('/Users/catalin-2/Programming/TooSensitive/wordpress/wp-content/themes/psychotherapy/patterns/banner.php', 'r') as f:
    content = f.read()

# Split content by slides
slides = re.split(r'<!-- wp:cover.*?swiper-slide.*?-->', content)

if len(slides) >= 3:  # We have at least 2 slides plus header
    # Find and replace in the second slide only
    slide2 = slides[2]
    
    # Replace title in second slide
    slide2 = slide2.replace('How can I calm down NOW?', 'You are NOT broken. You are ENOUGH.')
    
    # Replace description in second slide  
    slide2 = slide2.replace(
        'Breathe. You are not in real danger. The overwhelming emotion you feel right now will pass. You are not alone in this RSD struggle. Every second you resist is a victory.',
        'Your sensitivity is a superpower, not a weakness. The world needs people who feel deeply. You deserve love, understanding, and acceptance exactly as you are.'
    )
    
    # Reconstruct the content
    slides[2] = slide2
    content = '<!-- wp:cover {"dimRatio":0,"isUserOverlayColor":true,"minHeightUnit":"px","contentPosition":"center center","isDark":false,"sizeSlug":"large","className":"banner-section swiper-slide","style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"},"blockGap":"0","margin":{"top":"0","bottom":"0"}}},"layout":{"type":"constrained","contentSize":"100%","wideSize":""}} -->'.join(slides)

# Write back to file
with open('/Users/catalin-2/Programming/TooSensitive/wordpress/wp-content/themes/psychotherapy/patterns/banner.php', 'w') as f:
    f.write(content)

print("Updated second slider successfully!")