<?php
/**
 * Testimonials Section
 * 
 * slug: psychotherapy/testimonials-section
 * title: Testimonials Section
 * categories: psychotherapy
 */

return array(
    'title'      =>__( 'Testimonials Section', 'psychotherapy' ),
    'categories' => array( 'psychotherapy' ),
    'content'    => '<!-- wp:spacer {"height":"10px"} -->
        <div style="height:10px" aria-hidden="true" class="wp-block-spacer"></div>
        <!-- /wp:spacer -->

        <!-- wp:group {"className":"testimonials-section","style":{"spacing":{"blockGap":"var:preset|spacing|20","padding":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20"}}},"layout":{"type":"constrained","contentSize":"80%"}} -->
        <div class="wp-block-group testimonials-section" style="padding-top:var(--wp--preset--spacing--20);padding-bottom:var(--wp--preset--spacing--20)"><!-- wp:spacer {"height":"60px"} -->
        <div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
        <!-- /wp:spacer -->

        <!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|accent"}}},"typography":{"fontStyle":"normal","fontWeight":"600"}},"textColor":"accent","fontSize":"small","fontFamily":"poppins"} -->
        <p class="has-text-align-center has-accent-color has-text-color has-link-color has-poppins-font-family has-small-font-size" style="font-style:normal;font-weight:600">'. esc_html__('Share Your Story','psychotherapy').'</p>
        <!-- /wp:paragraph -->

        <!-- wp:heading {"textAlign":"center","style":{"typography":{"fontStyle":"normal","fontWeight":"800","fontSize":"26px"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}},"spacing":{"margin":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}},"textColor":"primary","fontFamily":"poppins"} -->
        <h2 class="wp-block-heading has-text-align-center has-primary-color has-text-color has-link-color has-poppins-font-family" style="margin-top:var(--wp--preset--spacing--30);margin-bottom:var(--wp--preset--spacing--30);font-size:26px;font-style:normal;font-weight:800">'. esc_html__('Real Stories of RSD Recovery','psychotherapy').'</h2>
        <!-- /wp:heading -->

        <!-- wp:columns {"className":"test-prev-next"} -->
        <div class="wp-block-columns test-prev-next"><!-- wp:column -->
        <div class="wp-block-column"><!-- wp:buttons {"className":"swiper-test-button","style":{"spacing":{"blockGap":{"top":"0"}}},"layout":{"type":"flex","justifyContent":"space-between"}} -->
        <div class="wp-block-buttons swiper-test-button"><!-- wp:button {"backgroundColor":"primary","className":"testimonial-swiper-button-prev","style":{"spacing":{"padding":{"left":"17px","right":"17px","top":"13px","bottom":"13px"}},"border":{"radius":"26px"}}} -->
        <div class="wp-block-button testimonial-swiper-button-prev"><a class="wp-block-button__link has-primary-background-color has-background wp-element-button" style="border-radius:26px;padding-top:13px;padding-right:17px;padding-bottom:13px;padding-left:17px"><img class="wp-image-132" style="width: 8px;" src="'.esc_url(get_template_directory_uri()) .'/assets/images/prev.png" alt=""></a></div>
        <!-- /wp:button -->

        <!-- wp:button {"backgroundColor":"primary","className":"testimonial-swiper-button-next","style":{"spacing":{"padding":{"left":"14px","right":"14px","top":"13px","bottom":"13px"}},"border":{"radius":"26px"},"typography":{"lineHeight":"1.1"}}} -->
        <div class="wp-block-button testimonial-swiper-button-next"><a class="wp-block-button__link has-primary-background-color has-background wp-element-button" style="border-radius:26px;padding-top:13px;padding-right:14px;padding-bottom:13px;padding-left:14px;line-height:1.1"><img class="wp-image-131" style="width: 16px;" src="'.esc_url(get_template_directory_uri()) .'/assets/images/next.png" alt=""></a></div>
        <!-- /wp:button --></div>
        <!-- /wp:buttons --></div>
        <!-- /wp:column --></div>
        <!-- /wp:columns -->

        <!-- wp:group {"className":"testimonial-swiper-slider mySwiper","style":{"spacing":{"margin":{"top":"var:preset|spacing|40"}}},"layout":{"type":"constrained","contentSize":"100%"}} -->
        <div class="wp-block-group testimonial-swiper-slider mySwiper" style="margin-top:var(--wp--preset--spacing--40)"><!-- wp:group {"className":"testimonials-slider swiper-wrapper","style":{"spacing":{"margin":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"},"blockGap":"0"}},"layout":{"type":"constrained","contentSize":"100%","wideSize":"100%"}} -->
        <div class="wp-block-group testimonials-slider swiper-wrapper" style="margin-top:var(--wp--preset--spacing--50);margin-bottom:var(--wp--preset--spacing--50)"><!-- wp:group {"className":"testimonials-slider-block swiper-slide","style":{"spacing":{"blockGap":"var:preset|spacing|30","padding":{"right":"var:preset|spacing|50","left":"var:preset|spacing|50","top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
        <div class="wp-block-group testimonials-slider-block swiper-slide has-white-background-color has-background" style="padding-top:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50)"><!-- wp:paragraph {"align":"center","style":{"typography":{"lineHeight":"1.7","fontStyle":"normal","fontWeight":"400"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary","fontSize":"extra-small"} -->
        <p class="has-text-align-center has-primary-color has-text-color has-link-color has-extra-small-font-size" style="font-style:normal;font-weight:400;line-height:1.7">'. esc_html__('My boss gave me feedback and I completely shut down for three days. I could not eat, sleep, or function. I thought I was going crazy until I found TooSensitive and learned about RSD. Finally understanding what was happening to me changed everything. I am not broken - I just experience rejection differently.','psychotherapy').'</p>
        <!-- /wp:paragraph -->

        <!-- wp:heading {"textAlign":"center","className":"testimonial-author-name","style":{"elements":{"link":{"color":{"text":"var:preset|color|primary"}}},"typography":{"fontStyle":"normal","fontWeight":"600"},"spacing":{"margin":{"top":"var:preset|spacing|40","bottom":"0"}}},"textColor":"primary","fontSize":"upper-heading"} -->
        <h2 class="wp-block-heading has-text-align-center testimonial-author-name has-primary-color has-text-color has-link-color has-upper-heading-font-size" style="margin-top:var(--wp--preset--spacing--40);margin-bottom:0;font-style:normal;font-weight:600">'. esc_html__('Sarah M.','psychotherapy').'</h2>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|primary"}}},"typography":{"fontStyle":"normal","fontWeight":"500"},"spacing":{"margin":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20"}}},"textColor":"primary","fontSize":"extra-small"} -->
        <p class="has-text-align-center has-primary-color has-text-color has-link-color has-extra-small-font-size" style="margin-top:var(--wp--preset--spacing--20);margin-bottom:var(--wp--preset--spacing--20);font-style:normal;font-weight:500">'. esc_html__('Marketing Professional','psychotherapy').'</p>
        <!-- /wp:paragraph --></div>
        <!-- /wp:group -->

        <!-- wp:group {"className":"testimonials-slider-block swiper-slide","style":{"spacing":{"blockGap":"var:preset|spacing|30","padding":{"right":"var:preset|spacing|50","left":"var:preset|spacing|50","top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
        <div class="wp-block-group testimonials-slider-block swiper-slide has-white-background-color has-background" style="padding-top:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50)"><!-- wp:paragraph {"align":"center","style":{"typography":{"lineHeight":"1.7","fontStyle":"normal","fontWeight":"400"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary","fontSize":"extra-small"} -->
        <p class="has-text-align-center has-primary-color has-text-color has-link-color has-extra-small-font-size" style="font-style:normal;font-weight:400;line-height:1.7">'. esc_html__('I spent 28 years thinking I was "too emotional" and "too sensitive." My family would roll their eyes when I cried over minor criticism. Finding this community showed me that my pain is real and valid. The breathing techniques saved me during my last panic attack. I finally have tools that actually work.','psychotherapy').'</p>
        <!-- /wp:paragraph -->

        <!-- wp:heading {"textAlign":"center","className":"testimonial-author-name","style":{"elements":{"link":{"color":{"text":"var:preset|color|primary"}}},"typography":{"fontStyle":"normal","fontWeight":"600"},"spacing":{"margin":{"top":"var:preset|spacing|40","bottom":"0"}}},"textColor":"primary","fontSize":"upper-heading"} -->
        <h2 class="wp-block-heading has-text-align-center testimonial-author-name has-primary-color has-text-color has-link-color has-upper-heading-font-size" style="margin-top:var(--wp--preset--spacing--40);margin-bottom:0;font-style:normal;font-weight:600">'. esc_html__('Marcus T.','psychotherapy').'</h2>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|primary"}}},"typography":{"fontStyle":"normal","fontWeight":"500"},"spacing":{"margin":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20"}}},"textColor":"primary","fontSize":"extra-small"} -->
        <p class="has-text-align-center has-primary-color has-text-color has-link-color has-extra-small-font-size" style="margin-top:var(--wp--preset--spacing--20);margin-bottom:var(--wp--preset--spacing--20);font-style:normal;font-weight:500">'. esc_html__('Teacher','psychotherapy').'</p>
        <!-- /wp:paragraph --></div>
        <!-- /wp:group -->

        <!-- wp:group {"className":"testimonials-slider-block swiper-slide","style":{"spacing":{"blockGap":"var:preset|spacing|30","padding":{"right":"var:preset|spacing|50","left":"var:preset|spacing|50","top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
        <div class="wp-block-group testimonials-slider-block swiper-slide has-white-background-color has-background" style="padding-top:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50)"><!-- wp:paragraph {"align":"center","style":{"typography":{"lineHeight":"1.7","fontStyle":"normal","fontWeight":"400"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary","fontSize":"extra-small"} -->
        <p class="has-text-align-center has-primary-color has-text-color has-link-color has-extra-small-font-size" style="font-style:normal;font-weight:400;line-height:1.7">'. esc_html__('When my friend cancelled our plans last minute, I spiraled into believing everyone hates me. I nearly ended friendships over perceived rejection that wasn not even real. TooSensitive helped me understand that my brain interprets neutral events as rejection. Now I pause and use the grounding techniques before reacting.','psychotherapy').'</p>
        <!-- /wp:paragraph -->

        <!-- wp:heading {"textAlign":"center","className":"testimonial-author-name","style":{"elements":{"link":{"color":{"text":"var:preset|color|primary"}}},"typography":{"fontStyle":"normal","fontWeight":"600"},"spacing":{"margin":{"top":"var:preset|spacing|40","bottom":"0"}}},"textColor":"primary","fontSize":"upper-heading"} -->
        <h2 class="wp-block-heading has-text-align-center testimonial-author-name has-primary-color has-text-color has-link-color has-upper-heading-font-size" style="margin-top:var(--wp--preset--spacing--40);margin-bottom:0;font-style:normal;font-weight:600">'. esc_html__('Jordan A.','psychotherapy').'</h2>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|primary"}}},"typography":{"fontStyle":"normal","fontWeight":"500"},"spacing":{"margin":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20"}}},"textColor":"primary","fontSize":"extra-small"} -->
        <p class="has-text-align-center has-primary-color has-text-color has-link-color has-extra-small-font-size" style="margin-top:var(--wp--preset--spacing--20);margin-bottom:var(--wp--preset--spacing--20);font-style:normal;font-weight:500">'. esc_html__('Student','psychotherapy').'</p>
        <!-- /wp:paragraph --></div>
        <!-- /wp:group -->

        <!-- wp:group {"className":"testimonials-slider-block swiper-slide","style":{"spacing":{"blockGap":"var:preset|spacing|30","padding":{"right":"var:preset|spacing|50","left":"var:preset|spacing|50","top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
        <div class="wp-block-group testimonials-slider-block swiper-slide has-white-background-color has-background" style="padding-top:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50)"><!-- wp:paragraph {"align":"center","style":{"typography":{"lineHeight":"1.7","fontStyle":"normal","fontWeight":"400"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary","fontSize":"extra-small"} -->
        <p class="has-text-align-center has-primary-color has-text-color has-link-color has-extra-small-font-size" style="font-style:normal;font-weight:400;line-height:1.7">'. esc_html__('After years of therapy that never addressed my extreme sensitivity to criticism, I felt hopeless. One comment from my partner would send me into days of despair. TooSensitive was the first place that made me feel normal. The crisis intervention tools are lifesavers when RSD hits hard.','psychotherapy').'</p>
        <!-- /wp:paragraph -->

        <!-- wp:heading {"textAlign":"center","className":"testimonial-author-name","style":{"elements":{"link":{"color":{"text":"var:preset|color|primary"}}},"typography":{"fontStyle":"normal","fontWeight":"600"},"spacing":{"margin":{"top":"var:preset|spacing|40","bottom":"0"}}},"textColor":"primary","fontSize":"upper-heading"} -->
        <h2 class="wp-block-heading has-text-align-center testimonial-author-name has-primary-color has-text-color has-link-color has-upper-heading-font-size" style="margin-top:var(--wp--preset--spacing--40);margin-bottom:0;font-style:normal;font-weight:600">'. esc_html__('Riley C.','psychotherapy').'</h2>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|primary"}}},"typography":{"fontStyle":"normal","fontWeight":"500"},"spacing":{"margin":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20"}}},"textColor":"primary","fontSize":"extra-small"} -->
        <p class="has-text-align-center has-primary-color has-text-color has-link-color has-extra-small-font-size" style="margin-top:var(--wp--preset--spacing--20);margin-bottom:var(--wp--preset--spacing--20);font-style:normal;font-weight:500">'. esc_html__('Graphic Designer','psychotherapy').'</p>
        <!-- /wp:paragraph --></div>
        <!-- /wp:group -->

        <!-- wp:group {"className":"testimonials-slider-block swiper-slide","style":{"spacing":{"blockGap":"var:preset|spacing|30","padding":{"right":"var:preset|spacing|50","left":"var:preset|spacing|50","top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
        <div class="wp-block-group testimonials-slider-block swiper-slide has-white-background-color has-background" style="padding-top:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50)"><!-- wp:paragraph {"align":"center","style":{"typography":{"lineHeight":"1.7","fontStyle":"normal","fontWeight":"400"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary","fontSize":"extra-small"} -->
        <p class="has-text-align-center has-primary-color has-text-color has-link-color has-extra-small-font-size" style="font-style:normal;font-weight:400;line-height:1.7">'. esc_html__('I avoided social situations for years because any sign of disapproval would trigger hours of rumination and self-hatred. My ADHD diagnosis led me to discover RSD, and everything clicked. The self-compassion techniques here taught me to be kinder to myself when rejection hits.','psychotherapy').'</p>
        <!-- /wp:paragraph -->

        <!-- wp:heading {"textAlign":"center","className":"testimonial-author-name","style":{"elements":{"link":{"color":{"text":"var:preset|color|primary"}}},"typography":{"fontStyle":"normal","fontWeight":"600"},"spacing":{"margin":{"top":"var:preset|spacing|40","bottom":"0"}}},"textColor":"primary","fontSize":"upper-heading"} -->
        <h2 class="wp-block-heading has-text-align-center testimonial-author-name has-primary-color has-text-color has-link-color has-upper-heading-font-size" style="margin-top:var(--wp--preset--spacing--40);margin-bottom:0;font-style:normal;font-weight:600">'. esc_html__('Casey D.','psychotherapy').'</h2>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|primary"}}},"typography":{"fontStyle":"normal","fontWeight":"500"},"spacing":{"margin":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20"}}},"textColor":"primary","fontSize":"extra-small"} -->
        <p class="has-text-align-center has-primary-color has-text-color has-link-color has-extra-small-font-size" style="margin-top:var(--wp--preset--spacing--20);margin-bottom:var(--wp--preset--spacing--20);font-style:normal;font-weight:500">'. esc_html__('Software Engineer','psychotherapy').'</p>
        <!-- /wp:paragraph --></div>
        <!-- /wp:group -->

        <!-- wp:group {"className":"testimonials-slider-block swiper-slide","style":{"spacing":{"blockGap":"var:preset|spacing|30","padding":{"right":"var:preset|spacing|50","left":"var:preset|spacing|50","top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
        <div class="wp-block-group testimonials-slider-block swiper-slide has-white-background-color has-background" style="padding-top:var(--wp--preset--spacing--50);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--50);padding-left:var(--wp--preset--spacing--50)"><!-- wp:paragraph {"align":"center","style":{"typography":{"lineHeight":"1.7","fontStyle":"normal","fontWeight":"400"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary","fontSize":"extra-small"} -->
        <p class="has-text-align-center has-primary-color has-text-color has-link-color has-extra-small-font-size" style="font-style:normal;font-weight:400;line-height:1.7">'. esc_html__('My daughter has ADHD and RSD, and watching her pain broke my heart. Neither of us understood why a simple "no" could devastate her for days. TooSensitive gave us both the language and tools we needed. Now we have strategies that actually help instead of just telling her to "get over it."','psychotherapy').'</p>
        <!-- /wp:paragraph -->

        <!-- wp:heading {"textAlign":"center","className":"testimonial-author-name","style":{"elements":{"link":{"color":{"text":"var:preset|color|primary"}}},"typography":{"fontStyle":"normal","fontWeight":"600"},"spacing":{"margin":{"top":"var:preset|spacing|40","bottom":"0"}}},"textColor":"primary","fontSize":"upper-heading"} -->
        <h2 class="wp-block-heading has-text-align-center testimonial-author-name has-primary-color has-text-color has-link-color has-upper-heading-font-size" style="margin-top:var(--wp--preset--spacing--40);margin-bottom:0;font-style:normal;font-weight:600">'. esc_html__('Linda K.','psychotherapy').'</h2>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|primary"}}},"typography":{"fontStyle":"normal","fontWeight":"500"},"spacing":{"margin":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20"}}},"textColor":"primary","fontSize":"extra-small"} -->
        <p class="has-text-align-center has-primary-color has-text-color has-link-color has-extra-small-font-size" style="margin-top:var(--wp--preset--spacing--20);margin-bottom:var(--wp--preset--spacing--20);font-style:normal;font-weight:500">'. esc_html__('Parent & Advocate','psychotherapy').'</p>
        <!-- /wp:paragraph --></div>
        <!-- /wp:group --></div>
        <!-- /wp:group --></div>
        <!-- /wp:group -->

        <!-- wp:spacer {"height":"65px"} -->
        <div style="height:65px" aria-hidden="true" class="wp-block-spacer"></div>
        <!-- /wp:spacer --></div>
        <!-- /wp:group -->

        ',
);