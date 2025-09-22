<?php
/**
 * Banner Section
 * 
 * slug: psychotherapy/banner
 * title: Banner
 * categories: psychotherapy
 */

return array(
    'title'      =>__( 'Banner', 'psychotherapy' ),
    'categories' => array( 'psychotherapy' ),
    'content'    => '<!-- wp:group {"className":"swiper-wrapper banner-main","style":{"spacing":{"padding":{"top":"0","bottom":"0"}}},"layout":{"type":"constrained","contentSize":"100%"}} -->
    <div class="wp-block-group swiper-wrapper banner-main" style="padding-top:0;padding-bottom:0"><!-- wp:cover {"dimRatio":0,"isUserOverlayColor":true,"minHeightUnit":"px","contentPosition":"center center","isDark":false,"sizeSlug":"large","className":"banner-section swiper-slide","style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"},"blockGap":"0","margin":{"top":"0","bottom":"0"}}},"layout":{"type":"constrained","contentSize":"100%","wideSize":""}} -->
    <div class="wp-block-cover is-light banner-section swiper-slide" style="margin-top:0;margin-bottom:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-0 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:columns {"className":"main-banner","style":{"spacing":{"padding":{"top":"0","bottom":"0"},"blockGap":{"top":"0"},"margin":{"top":"0","bottom":"0"}}}} -->
    <div class="wp-block-columns main-banner" style="margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0"><!-- wp:column {"verticalAlignment":"bottom","width":"10%"} -->
    <div class="wp-block-column is-vertically-aligned-bottom" style="flex-basis:10%"></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"verticalAlignment":"center","width":"45%","className":"banner-left fadeInLeft wow","style":{"spacing":{"blockGap":"0","padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}}} -->
    <div class="wp-block-column is-vertically-aligned-center banner-left fadeInLeft wow" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60);flex-basis:45%"><!-- wp:columns {"verticalAlignment":"center","className":"banner-col01","style":{"layout":{"selfStretch":"fit","flexSize":null},"spacing":{"margin":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"},"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50","left":"0","right":"0"}},"border":{"radius":"0px"}}} -->
    <div class="wp-block-columns are-vertically-aligned-center banner-col01" style="border-radius:0px;margin-top:var(--wp--preset--spacing--50);margin-bottom:var(--wp--preset--spacing--50);padding-top:var(--wp--preset--spacing--50);padding-right:0;padding-bottom:var(--wp--preset--spacing--50);padding-left:0"><!-- wp:column {"verticalAlignment":"center","style":{"spacing":{"padding":{"right":"0","left":"0","top":"0","bottom":"0"}}}} -->
    <div class="wp-block-column is-vertically-aligned-center" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><!-- wp:heading {"className":"banner-head","style":{"typography":{"fontStyle":"normal","fontWeight":"800"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","fontSize":"extra-large","fontFamily":"poppins"} -->
    <h2 class="wp-block-heading banner-head has-background-color has-text-color has-link-color has-poppins-font-family has-extra-large-font-size" style="font-style:normal;font-weight:800">'. esc_html__('How can I calm down NOW?','psychotherapy').'</h2>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"className":"short-para-text","style":{"typography":{"fontStyle":"normal","fontWeight":"400","lineHeight":"1.8"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","fontSize":"small","fontFamily":"poppins"} -->
    <p class="short-para-text has-background-color has-text-color has-link-color has-poppins-font-family has-small-font-size" style="font-style:normal;font-weight:400;line-height:1.8">'. esc_html__('Breathe. You are not in real danger. The overwhelming emotion you feel right now will pass. You are not alone in this RSD struggle. Every second you resist is a victory.','psychotherapy').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:buttons {"style":{"typography":{"fontStyle":"normal","fontWeight":"400"},"spacing":{"blockGap":{"top":"var:preset|spacing|20","left":"var:preset|spacing|50"}}},"fontSize":"medium","fontFamily":"rubik"} -->
    <div class="wp-block-buttons has-custom-font-size has-rubik-font-family has-medium-font-size" style="font-style:normal;font-weight:400"><!-- wp:button {"backgroundColor":"background","textColor":"accent","className":"is-style-outline slider-button01","style":{"elements":{"link":{"color":{"text":"var:preset|color|accent"}}},"spacing":{"padding":{"left":"var:preset|spacing|50","right":"var:preset|spacing|50","top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}},"border":{"radius":"8px","width":"2px"},"typography":{"fontStyle":"normal","fontWeight":"600"}},"borderColor":"background"} -->
    <div class="wp-block-button is-style-outline slider-button01"><a class="wp-block-button__link has-accent-color has-background-background-color has-text-color has-background has-link-color has-border-color has-background-border-color wp-element-button" href="/calm-now/" style="border-width:2px;border-radius:8px;padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--50);font-style:normal;font-weight:600">'. esc_html__('START HEALING','psychotherapy').'</a></div>
    <!-- /wp:button --></div>
    <!-- /wp:buttons --></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"verticalAlignment":"bottom","width":"35%","className":"banner-right fadeInRight wow","style":{"spacing":{"blockGap":"0"}}} -->
    <div class="wp-block-column is-vertically-aligned-bottom banner-right fadeInRight wow" style="flex-basis:35%"><!-- wp:image {"id":26,"sizeSlug":"full","linkDestination":"none","align":"right"} -->
    <figure class="wp-block-image alignright size-full"><img src="'.esc_url(get_template_directory_uri()) .'/assets/images/slider01-rsd.jpg" alt="Calm and breathe" class="wp-image-26"/></figure>
    <!-- /wp:image --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"verticalAlignment":"bottom","width":"10%"} -->
    <div class="wp-block-column is-vertically-aligned-bottom" style="flex-basis:10%"></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns --></div></div>
    <!-- /wp:cover -->
    
    <!-- wp:cover {"dimRatio":0,"isUserOverlayColor":true,"minHeightUnit":"px","contentPosition":"center center","isDark":false,"sizeSlug":"large","className":"banner-section swiper-slide","style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"},"blockGap":"0","margin":{"top":"0","bottom":"0"}}},"layout":{"type":"constrained","contentSize":"100%","wideSize":""}} -->
    <div class="wp-block-cover is-light banner-section swiper-slide" style="margin-top:0;margin-bottom:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-0 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:columns {"className":"main-banner","style":{"spacing":{"padding":{"top":"0","bottom":"0"},"blockGap":{"top":"0"},"margin":{"top":"0","bottom":"0"}}}} -->
    <div class="wp-block-columns main-banner" style="margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0"><!-- wp:column {"verticalAlignment":"bottom","width":"10%"} -->
    <div class="wp-block-column is-vertically-aligned-bottom" style="flex-basis:10%"></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"verticalAlignment":"center","width":"45%","className":"banner-left fadeInLeft wow","style":{"spacing":{"blockGap":"0","padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}}} -->
    <div class="wp-block-column is-vertically-aligned-center banner-left fadeInLeft wow" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60);flex-basis:45%"><!-- wp:columns {"verticalAlignment":"center","className":"banner-col01","style":{"layout":{"selfStretch":"fit","flexSize":null},"spacing":{"margin":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"},"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50","left":"0","right":"0"}},"border":{"radius":"0px"}}} -->
    <div class="wp-block-columns are-vertically-aligned-center banner-col01" style="border-radius:0px;margin-top:var(--wp--preset--spacing--50);margin-bottom:var(--wp--preset--spacing--50);padding-top:var(--wp--preset--spacing--50);padding-right:0;padding-bottom:var(--wp--preset--spacing--50);padding-left:0"><!-- wp:column {"verticalAlignment":"center","style":{"spacing":{"padding":{"right":"0","left":"0","top":"0","bottom":"0"}}}} -->
    <div class="wp-block-column is-vertically-aligned-center" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><!-- wp:heading {"className":"banner-head","style":{"typography":{"fontStyle":"normal","fontWeight":"800"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","fontSize":"extra-large","fontFamily":"poppins"} -->
    <h2 class="wp-block-heading banner-head has-background-color has-text-color has-link-color has-poppins-font-family has-extra-large-font-size" style="font-style:normal;font-weight:800">'. esc_html__('You are NOT broken. You are ENOUGH.','psychotherapy').'</h2>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"className":"short-para-text","style":{"typography":{"fontStyle":"normal","fontWeight":"400","lineHeight":"1.8"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","fontSize":"small","fontFamily":"poppins"} -->
    <p class="short-para-text has-background-color has-text-color has-link-color has-poppins-font-family has-small-font-size" style="font-style:normal;font-weight:400;line-height:1.8">'. esc_html__('Your sensitivity is a superpower, not a weakness. The world needs people who feel deeply. You deserve love, understanding, and acceptance exactly as you are.','psychotherapy').'</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:buttons {"style":{"typography":{"fontStyle":"normal","fontWeight":"400"},"spacing":{"blockGap":{"top":"var:preset|spacing|20","left":"var:preset|spacing|50"}}},"fontSize":"medium","fontFamily":"rubik"} -->
    <div class="wp-block-buttons has-custom-font-size has-rubik-font-family has-medium-font-size" style="font-style:normal;font-weight:400"><!-- wp:button {"backgroundColor":"background","textColor":"accent","className":"is-style-outline slider-button01","style":{"elements":{"link":{"color":{"text":"var:preset|color|accent"}}},"spacing":{"padding":{"left":"var:preset|spacing|50","right":"var:preset|spacing|50","top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}},"border":{"radius":"8px"},"typography":{"fontStyle":"normal","fontWeight":"600"}}} -->
    <div class="wp-block-button is-style-outline slider-button01"><a class="wp-block-button__link has-accent-color has-background-background-color has-text-color has-background has-link-color wp-element-button" href="/calm-now/" style="border-radius:8px;padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--50);font-style:normal;font-weight:600">'. esc_html__('START HEALING','psychotherapy').'</a></div>
    <!-- /wp:button --></div>
    <!-- /wp:buttons --></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"verticalAlignment":"bottom","width":"35%","className":"banner-right fadeInRight wow","style":{"spacing":{"blockGap":"0"}}} -->
    <div class="wp-block-column is-vertically-aligned-bottom banner-right fadeInRight wow" style="flex-basis:35%"><!-- wp:image {"id":27,"sizeSlug":"full","linkDestination":"none","align":"right"} -->
    <figure class="wp-block-image alignright size-full"><img src="'.esc_url(get_template_directory_uri()) .'/assets/images/slider02-rsd.jpg" alt="You are enough" class="wp-image-27"/></figure>
    <!-- /wp:image --></div>
    <!-- /wp:column -->
    
    <!-- wp:column {"verticalAlignment":"bottom","width":"10%"} -->
    <div class="wp-block-column is-vertically-aligned-bottom" style="flex-basis:10%"></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns --></div></div>
    <!-- /wp:cover --></div>
    <!-- /wp:group -->
    
    <!-- wp:columns {"verticalAlignment":"center","className":"slider-navigation"} -->
    <div class="wp-block-columns are-vertically-aligned-center slider-navigation"><!-- wp:column {"verticalAlignment":"center","width":""} -->
    <div class="wp-block-column is-vertically-aligned-center"><!-- wp:buttons {"style":{"spacing":{"blockGap":{"top":"0","left":"0"}}},"layout":{"type":"flex","justifyContent":"left","orientation":"vertical"}} -->
    <div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"background","textColor":"accent","className":"slider-button-prev","style":{"spacing":{"padding":{"left":"11px","right":"11px","top":"11px","bottom":"11px"}},"border":{"radius":"8px"},"elements":{"link":{"color":{"text":"var:preset|color|accent"}}}}} -->
    <div class="wp-block-button slider-button-prev"><a class="wp-block-button__link has-accent-color has-background-background-color has-text-color has-background has-link-color wp-element-button" style="border-radius:8px;padding-top:11px;padding-right:11px;padding-bottom:11px;padding-left:11px"><span class="dashicons dashicons-arrow-right-alt"></span></a></div>
    <!-- /wp:button -->
    
    <!-- wp:button {"backgroundColor":"background","textColor":"accent","className":"slider-button-next","style":{"spacing":{"padding":{"left":"11px","right":"11px","top":"11px","bottom":"11px"}},"typography":{"lineHeight":"1.1"},"elements":{"link":{"color":{"text":"var:preset|color|accent"}}},"border":{"radius":"8px"}}} -->
    <div class="wp-block-button slider-button-next"><a class="wp-block-button__link has-accent-color has-background-background-color has-text-color has-background has-link-color wp-element-button" style="border-radius:8px;padding-top:11px;padding-right:11px;padding-bottom:11px;padding-left:11px;line-height:1.1"><span class="dashicons dashicons-arrow-left-alt"></span></a></div>
    <!-- /wp:button --></div>
    <!-- /wp:buttons --></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns -->',
    );