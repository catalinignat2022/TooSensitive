<?php
/**
 * Project Section
 * 
 * slug: psychotherapy/project-section
 * title: Project Section
 * categories: psychotherapy
 */

    return array(
        'title'      =>__( 'Service Section', 'psychotherapy' ),
        'categories' => array( 'psychotherapy' ),
        'content'    => '<!-- wp:group {"className":"service-section","style":{"spacing":{"blockGap":"var:preset|spacing|20","margin":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}},"layout":{"type":"constrained","contentSize":"80%"}} -->
<div class="wp-block-group service-section" style="margin-top:var(--wp--preset--spacing--30);margin-bottom:var(--wp--preset--spacing--30)"><!-- wp:columns -->
    <div class="wp-block-columns"><!-- wp:column {"width":"80%"} -->
    <div class="wp-block-column" style="flex-basis:80%"><!-- wp:html -->
    <div class="service-icon"><i class="fa-solid fa-hospital"></i></div>
    <!-- /wp:html -->
    
    <!-- wp:heading {"textAlign":"left","className":"gallery-heading","style":{"typography":{"fontStyle":"normal","fontWeight":"500","textTransform":"capitalize"},"elements":{"link":{"color":{"text":"var:preset|color|accent"}}},"spacing":{"margin":{"top":"0","bottom":"0"}}},"textColor":"accent","fontSize":"normal","fontFamily":"poppins"} -->
    <h2 class="wp-block-heading has-text-align-left gallery-heading has-accent-color has-text-color has-link-color has-poppins-font-family has-normal-font-size" style="margin-top:0;margin-bottom:0;font-style:normal;font-weight:500;text-transform:capitalize">'. esc_html__('Do people tell you you\'re "too sensitive"?','psychotherapy').'</h2>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"align":"left","className":"service-para","style":{"elements":{"link":{"color":{"text":"#121212db"}}},"typography":{"fontStyle":"normal","fontWeight":"400"},"color":{"text":"#121212db"},"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"}}},"fontSize":"small","fontFamily":"poppins"} -->
    <p class="has-text-align-left service-para has-text-color has-link-color has-poppins-font-family has-small-font-size" style="color:#121212db;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;font-style:normal;font-weight:400">'. esc_html__('Does criticism hit you like a punch to the chest? You\'re not broken. Take our anonymous 2‑minute RSD assessment — find out if it explains why things feel unbearable.','psychotherapy').'</p>
    <!-- wp:buttons -->
    <div class="wp-block-buttons">
        <!-- wp:button {"className":"is-style-primary start-button"} -->
        <div class="wp-block-button is-style-primary"><a class="wp-block-button__link" href="/assessment">'. esc_html__('Take the 2‑Minute Assessment','psychotherapy').'</a></div>
        <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->
    <!-- /wp:paragraph --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"verticalAlignment":"bottom","width":"20%"} -->
    <div class="wp-block-column is-vertically-aligned-bottom" style="flex-basis:20%"><!-- wp:buttons {"className":"service-button-nav","style":{"spacing":{"blockGap":{"top":"0","left":"var:preset|spacing|40"}}},"layout":{"type":"flex","justifyContent":"right","orientation":"horizontal","verticalAlignment":"bottom"}} -->
    <div class="wp-block-buttons service-button-nav"><!-- wp:button {"backgroundColor":"accent","textColor":"thirdaccent","className":"service-swiper-button-prev","style":{"spacing":{"padding":{"left":"11px","right":"11px","top":"11px","bottom":"11px"}},"typography":{"lineHeight":"1.1"},"elements":{"link":{"color":{"text":"var:preset|color|thirdaccent"}}},"border":{"radius":"8px"}}} -->
    <div class="wp-block-button service-swiper-button-prev"><a class="wp-block-button__link has-thirdaccent-color has-accent-background-color has-text-color has-background has-link-color wp-element-button" style="border-radius:8px;padding-top:11px;padding-right:11px;padding-bottom:11px;padding-left:11px;line-height:1.1"><span class="dashicons dashicons-arrow-left-alt"></span></a></div>
    <!-- /wp:button -->
    
    <!-- wp:button {"backgroundColor":"accent","textColor":"thirdaccent","className":"service-swiper-button-next","style":{"spacing":{"padding":{"left":"11px","right":"11px","top":"11px","bottom":"11px"}},"border":{"radius":"8px"},"elements":{"link":{"color":{"text":"var:preset|color|thirdaccent"}}}}} -->
    <div class="wp-block-button service-swiper-button-next"><a class="wp-block-button__link has-thirdaccent-color has-accent-background-color has-text-color has-background has-link-color wp-element-button" style="border-radius:8px;padding-top:11px;padding-right:11px;padding-bottom:11px;padding-left:11px"><span class="dashicons dashicons-arrow-right-alt"></span></a></div>
    <!-- /wp:button --></div>
    <!-- /wp:buttons --></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns --></div>
    <!-- /wp:group -->
    
    <!-- wp:group {"className":"service-main-section","layout":{"type":"constrained","contentSize":"90%","justifyContent":"right"}} -->
    <div class="wp-block-group service-main-section"><!-- wp:group {"className":"service-group mySwiper ","style":{"spacing":{"margin":{"top":"var:preset|spacing|40"}}},"layout":{"type":"constrained","contentSize":"100%","justifyContent":"right"}} -->
    <div class="wp-block-group service-group mySwiper" style="margin-top:var(--wp--preset--spacing--40)"><!-- wp:group {"className":"swiper-wrapper service-inner-section","layout":{"type":"constrained","contentSize":"100%","justifyContent":"right"}} -->
    <div class="wp-block-group swiper-wrapper service-inner-section"><!-- wp:group {"className":"service-slider-block swiper-slide crisis-panic","style":{"spacing":{"blockGap":"var:preset|spacing|20","padding":{"right":"var:preset|spacing|50","left":"var:preset|spacing|50","top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}},"background":{"backgroundImage":{"url":"'.esc_url(get_template_directory_uri()) .'/assets/images/crisis-panic-bg.jpg","id":15,"source":"file","title":"crisis-panic-bg"},"backgroundSize":"cover"},"dimensions":{"minHeight":"400px"},"border":{"radius":"12px"}},"backgroundColor":"white","layout":{"type":"constrained","justifyContent":"left"}} -->
    <div class="wp-block-group service-slider-block swiper-slide crisis-panic has-white-background-color has-background" style="min-height:400px;border-radius:12px;padding-top:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50)">
    <!-- wp:html -->
    <div class="crisis-icon">🚨</div>
    <!-- /wp:html -->
    
    <!-- wp:heading {"textAlign":"left","className":"service-author-name crisis-title","style":{"elements":{"link":{"color":{"text":"#ffffff"}}},"typography":{"fontStyle":"normal","fontWeight":"700","fontSize":"1.8rem"},"spacing":{"margin":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|20"}},"color":{"text":"#ffffff"}},"fontSize":"upper-heading"} -->
    <h2 class="wp-block-heading has-text-align-left service-author-name crisis-title has-text-color has-link-color has-upper-heading-font-size" style="margin-top:var(--wp--preset--spacing--30);margin-bottom:var(--wp--preset--spacing--20);font-style:normal;font-weight:700;font-size:1.8rem;color:#ffffff">'. esc_html__('RSD Panic Attack','psychotherapy').'</h2>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"align":"left","className":"crisis-description","style":{"typography":{"lineHeight":"1.6","fontStyle":"normal","fontWeight":"400","fontSize":"0.95rem"},"elements":{"link":{"color":{"text":"#ffffff"}}},"spacing":{"margin":{"bottom":"var:preset|spacing|30"}},"color":{"text":"#ffffff"}},"fontSize":"small"} -->
    <p class="has-text-align-left crisis-description has-text-color has-link-color has-small-font-size" style="margin-bottom:var(--wp--preset--spacing--30);font-style:normal;font-weight:400;line-height:1.6;font-size:0.95rem;color:#ffffff">'. esc_html__('When criticism hits you like a tsunami and you can\'t breathe. Your heart races and you feel like you\'re falling apart.','psychotherapy').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:buttons {"className":"crisis-actions"} -->
    <div class="wp-block-buttons crisis-actions">
        <!-- wp:button {"className":"start-technique","style":{"color":{"background":"#e74c3c","text":"#ffffff"},"border":{"radius":"8px"},"spacing":{"padding":{"top":"12px","bottom":"12px","left":"20px","right":"20px"}},"typography":{"fontWeight":"600","fontSize":"0.9rem"}}} -->
        <div class="wp-block-button start-technique"><a class="wp-block-button__link wp-element-button" style="border-radius:8px;color:#ffffff;background-color:#e74c3c;padding-top:12px;padding-right:20px;padding-bottom:12px;padding-left:20px;font-size:0.9rem;font-weight:600">'. esc_html__('🫁 4-7-8 Breathing','psychotherapy').'</a></div>
        <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->
    </div>
    <!-- /wp:group -->
    
    <!-- wp:group {"className":"service-slider-block swiper-slide crisis-criticism","style":{"spacing":{"blockGap":"var:preset|spacing|20","padding":{"right":"var:preset|spacing|50","left":"var:preset|spacing|50","top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}},"background":{"backgroundImage":{"url":"'.esc_url(get_template_directory_uri()) .'/assets/images/crisis-criticism-bg.jpg","id":14,"source":"file","title":"crisis-criticism-bg"},"backgroundSize":"cover"},"dimensions":{"minHeight":"400px"},"border":{"radius":"12px"}},"backgroundColor":"white","layout":{"type":"constrained","justifyContent":"left"}} -->
    <div class="wp-block-group service-slider-block swiper-slide crisis-criticism has-white-background-color has-background" style="min-height:400px;border-radius:12px;padding-top:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50)">
    <!-- wp:html -->
    <div class="crisis-icon">💔</div>
    <!-- /wp:html -->
    
    <!-- wp:heading {"textAlign":"left","className":"service-author-name crisis-title","style":{"elements":{"link":{"color":{"text":"#ffffff"}}},"typography":{"fontStyle":"normal","fontWeight":"700","fontSize":"1.8rem"},"spacing":{"margin":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|20"}},"color":{"text":"#ffffff"}},"fontSize":"upper-heading"} -->
    <h2 class="wp-block-heading has-text-align-left service-author-name crisis-title has-text-color has-link-color has-upper-heading-font-size" style="margin-top:var(--wp--preset--spacing--30);margin-bottom:var(--wp--preset--spacing--20);font-style:normal;font-weight:700;font-size:1.8rem;color:#ffffff">'. esc_html__('Criticism Paralysis','psychotherapy').'</h2>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"align":"left","className":"crisis-description","style":{"typography":{"lineHeight":"1.6","fontStyle":"normal","fontWeight":"400","fontSize":"0.95rem"},"elements":{"link":{"color":{"text":"#ffffff"}}},"spacing":{"margin":{"bottom":"var:preset|spacing|30"}},"color":{"text":"#ffffff"}},"fontSize":"small"} -->
    <p class="has-text-align-left crisis-description has-text-color has-link-color has-small-font-size" style="margin-bottom:var(--wp--preset--spacing--30);font-style:normal;font-weight:400;line-height:1.6;font-size:0.95rem;color:#ffffff">'. esc_html__('A negative comment has completely frozen you. You can\'t think clearly and feel paralyzed by emotions.','psychotherapy').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:buttons {"className":"crisis-actions"} -->
    <div class="wp-block-buttons crisis-actions">
        <!-- wp:button {"className":"start-technique","style":{"color":{"background":"#9b59b6","text":"#ffffff"},"border":{"radius":"8px"},"spacing":{"padding":{"top":"12px","bottom":"12px","left":"20px","right":"20px"}},"typography":{"fontWeight":"600","fontSize":"0.9rem"}}} -->
        <div class="wp-block-button start-technique"><a class="wp-block-button__link wp-element-button" style="border-radius:8px;color:#ffffff;background-color:#9b59b6;padding-top:12px;padding-right:20px;padding-bottom:12px;padding-left:20px;font-size:0.9rem;font-weight:600">'. esc_html__('🧘 Grounding 5-4-3-2-1','psychotherapy').'</a></div>
        <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->
    </div>
    <!-- /wp:group -->
    
    <!-- wp:group {"className":"service-slider-block swiper-slide crisis-isolation","style":{"spacing":{"blockGap":"var:preset|spacing|20","padding":{"right":"var:preset|spacing|50","left":"var:preset|spacing|50","top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}},"background":{"backgroundImage":{"url":"'.esc_url(get_template_directory_uri()) .'/assets/images/crisis-isolation-bg.jpg","id":13,"source":"file","title":"crisis-isolation-bg"},"backgroundSize":"cover"},"dimensions":{"minHeight":"400px"},"border":{"radius":"12px"}},"backgroundColor":"white","layout":{"type":"constrained","justifyContent":"left"}} -->
    <div class="wp-block-group service-slider-block swiper-slide crisis-isolation has-white-background-color has-background" style="min-height:400px;border-radius:12px;padding-top:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50)">
    <!-- wp:html -->
    <div class="crisis-icon">🌧️</div>
    <!-- /wp:html -->
    
    <!-- wp:heading {"textAlign":"left","className":"service-author-name crisis-title","style":{"elements":{"link":{"color":{"text":"#ffffff"}}},"typography":{"fontStyle":"normal","fontWeight":"700","fontSize":"1.8rem"},"spacing":{"margin":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|20"}},"color":{"text":"#ffffff"}},"fontSize":"upper-heading"} -->
    <h2 class="wp-block-heading has-text-align-left service-author-name crisis-title has-text-color has-link-color has-upper-heading-font-size" style="margin-top:var(--wp--preset--spacing--30);margin-bottom:var(--wp--preset--spacing--20);font-style:normal;font-weight:700;font-size:1.8rem;color:#ffffff">'. esc_html__('Social Isolation','psychotherapy').'</h2>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"align":"left","className":"crisis-description","style":{"typography":{"lineHeight":"1.6","fontStyle":"normal","fontWeight":"400","fontSize":"0.95rem"},"elements":{"link":{"color":{"text":"#ffffff"}}},"spacing":{"margin":{"bottom":"var:preset|spacing|30"}},"color":{"text":"#ffffff"}},"fontSize":"small"} -->
    <p class="has-text-align-left crisis-description has-text-color has-link-color has-small-font-size" style="margin-bottom:var(--wp--preset--spacing--30);font-style:normal;font-weight:400;line-height:1.6;font-size:0.95rem;color:#ffffff">'. esc_html__('You want to hide from everyone. The feeling that nobody understands you and you\'re a burden to all.','psychotherapy').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:buttons {"className":"crisis-actions"} -->
    <div class="wp-block-buttons crisis-actions">
        <!-- wp:button {"className":"start-technique","style":{"color":{"background":"#2c3e50","text":"#ffffff"},"border":{"radius":"8px"},"spacing":{"padding":{"top":"12px","bottom":"12px","left":"20px","right":"20px"}},"typography":{"fontWeight":"600","fontSize":"0.9rem"}}} -->
        <div class="wp-block-button start-technique"><a class="wp-block-button__link wp-element-button" style="border-radius:8px;color:#ffffff;background-color:#2c3e50;padding-top:12px;padding-right:20px;padding-bottom:12px;padding-left:20px;font-size:0.9rem;font-weight:600">'. esc_html__('💝 Self-Compassion','psychotherapy').'</a></div>
        <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->
    </div>
    <!-- /wp:group -->
    
    <!-- wp:group {"className":"service-slider-block swiper-slide crisis-recovery","style":{"spacing":{"blockGap":"var:preset|spacing|20","padding":{"right":"var:preset|spacing|50","left":"var:preset|spacing|50","top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}},"background":{"backgroundImage":{"url":"'.esc_url(get_template_directory_uri()) .'/assets/images/crisis-recovery-bg.jpg","id":12,"source":"file","title":"crisis-recovery-bg"},"backgroundSize":"cover"},"dimensions":{"minHeight":"400px"},"border":{"radius":"12px"}},"backgroundColor":"white","layout":{"type":"constrained","justifyContent":"left"}} -->
    <div class="wp-block-group service-slider-block swiper-slide crisis-recovery has-white-background-color has-background" style="min-height:400px;border-radius:12px;padding-top:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50)">
    <!-- wp:html -->
    <div class="crisis-icon">⚡</div>
    <!-- /wp:html -->
    
    <!-- wp:heading {"textAlign":"left","className":"service-author-name crisis-title","style":{"elements":{"link":{"color":{"text":"#ffffff"}}},"typography":{"fontStyle":"normal","fontWeight":"700","fontSize":"1.8rem"},"spacing":{"margin":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|20"}},"color":{"text":"#ffffff"}},"fontSize":"upper-heading"} -->
    <h2 class="wp-block-heading has-text-align-left service-author-name crisis-title has-text-color has-link-color has-upper-heading-font-size" style="margin-top:var(--wp--preset--spacing--30);margin-bottom:var(--wp--preset--spacing--20);font-style:normal;font-weight:700;font-size:1.8rem;color:#ffffff">'. esc_html__('Rapid Recovery','psychotherapy').'</h2>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"align":"left","className":"crisis-description","style":{"typography":{"lineHeight":"1.6","fontStyle":"normal","fontWeight":"400","fontSize":"0.95rem"},"elements":{"link":{"color":{"text":"#ffffff"}}},"spacing":{"margin":{"bottom":"var:preset|spacing|30"}},"color":{"text":"#ffffff"}},"fontSize":"small"} -->
    <p class="has-text-align-left crisis-description has-text-color has-link-color has-small-font-size" style="margin-bottom:var(--wp--preset--spacing--30);font-style:normal;font-weight:400;line-height:1.6;font-size:0.95rem;color:#ffffff">'. esc_html__('After an intense RSD episode, you need to regain your energy and stabilize your emotions quickly.','psychotherapy').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:buttons {"className":"crisis-actions"} -->
    <div class="wp-block-buttons crisis-actions">
        <!-- wp:button {"className":"start-technique","style":{"color":{"background":"#e67e22","text":"#ffffff"},"border":{"radius":"8px"},"spacing":{"padding":{"top":"12px","bottom":"12px","left":"20px","right":"20px"}},"typography":{"fontWeight":"600","fontSize":"0.9rem"}}} -->
        <div class="wp-block-button start-technique"><a class="wp-block-button__link wp-element-button" style="border-radius:8px;color:#ffffff;background-color:#e67e22;padding-top:12px;padding-right:20px;padding-bottom:12px;padding-left:20px;font-size:0.9rem;font-weight:600">'. esc_html__('⚡ Emotional Reset','psychotherapy').'</a></div>
        <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->
    </div>
    <!-- /wp:group -->
    
    <!-- wp:group {"className":"service-slider-block swiper-slide crisis-relationship","style":{"spacing":{"blockGap":"var:preset|spacing|20","padding":{"right":"var:preset|spacing|50","left":"var:preset|spacing|50","top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}},"background":{"backgroundImage":{"url":"'.esc_url(get_template_directory_uri()) .'/assets/images/crisis-relationship-bg.jpg","id":15,"source":"file","title":"crisis-relationship-bg"},"backgroundSize":"cover"},"dimensions":{"minHeight":"400px"},"border":{"radius":"12px"}},"backgroundColor":"white","layout":{"type":"constrained","justifyContent":"left"}} -->
    <div class="wp-block-group service-slider-block swiper-slide crisis-relationship has-white-background-color has-background" style="min-height:400px;border-radius:12px;padding-top:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50)">
    <!-- wp:html -->
    <div class="crisis-icon">💬</div>
    <!-- /wp:html -->
    
    <!-- wp:heading {"textAlign":"left","className":"service-author-name crisis-title","style":{"elements":{"link":{"color":{"text":"#ffffff"}}},"typography":{"fontStyle":"normal","fontWeight":"700","fontSize":"1.8rem"},"spacing":{"margin":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|20"}},"color":{"text":"#ffffff"}},"fontSize":"upper-heading"} -->
    <h2 class="wp-block-heading has-text-align-left service-author-name crisis-title has-text-color has-link-color has-upper-heading-font-size" style="margin-top:var(--wp--preset--spacing--30);margin-bottom:var(--wp--preset--spacing--20);font-style:normal;font-weight:700;font-size:1.8rem;color:#ffffff">'. esc_html__('Relationship Repair','psychotherapy').'</h2>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"align":"left","className":"crisis-description","style":{"typography":{"lineHeight":"1.6","fontStyle":"normal","fontWeight":"400","fontSize":"0.95rem"},"elements":{"link":{"color":{"text":"#ffffff"}}},"spacing":{"margin":{"bottom":"var:preset|spacing|30"}},"color":{"text":"#ffffff"}},"fontSize":"small"} -->
    <p class="has-text-align-left crisis-description has-text-color has-link-color has-small-font-size" style="margin-bottom:var(--wp--preset--spacing--30);font-style:normal;font-weight:400;line-height:1.6;font-size:0.95rem;color:#ffffff">'. esc_html__('An intense RSD reaction has affected an important relationship. You need strategies to repair and communicate constructively.','psychotherapy').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:buttons {"className":"crisis-actions"} -->
    <div class="wp-block-buttons crisis-actions">
        <!-- wp:button {"className":"start-technique","style":{"color":{"background":"#16a085","text":"#ffffff"},"border":{"radius":"8px"},"spacing":{"padding":{"top":"12px","bottom":"12px","left":"20px","right":"20px"}},"Typography":{"fontWeight":"600","fontSize":"0.9rem"}}} -->
        <div class="wp-block-button start-technique"><a class="wp-block-button__link wp-element-button" style="border-radius:8px;color:#ffffff;background-color:#16a085;padding-top:12px;padding-right:20px;padding-bottom:12px;padding-left:20px;font-size:0.9rem;font-weight:600">'. esc_html__('🤝 RSD Communication','psychotherapy').'</a></div>
        <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->
    </div>
    <!-- /wp:group --></div>
    <!-- /wp:group --></div>
    <!-- /wp:group --></div>
    <!-- /wp:group -->
    
    <!-- wp:spacer {"height":"50px"} -->
    <div style="height:50px" aria-hidden="true" class="wp-block-spacer"></div>
    <!-- /wp:spacer -->',
    );