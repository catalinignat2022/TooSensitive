<?php
/**
 * About Us Section
 * 
 * slug: psychotherapy/about-us-section
 * title: About Us Section
 * categories: psychotherapy
 */

    return array(
        'title'      =>__( 'About Us Section', 'psychotherapy' ),
        'categories' => array( 'psychotherapy' ),
        'content'    => '<!-- wp:group {"className":"about-us-section","backgroundColor":"accent","layout":{"type":"constrained","contentSize":"80%"}} -->
<div id="aboutus" class="wp-block-group about-us-section has-accent-background-color has-background"><!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|60"}}}} -->
<div class="wp-block-columns are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center","className":"about-us-col01 wow fadeInLeft"} -->
<div class="wp-block-column is-vertically-aligned-center about-us-col01 wow fadeInLeft"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%"><!-- wp:image {"id":20,"sizeSlug":"full","linkDestination":"none","className":"about-img01","style":{"border":{"radius":"10px"}}} -->
<figure class="wp-block-image size-full has-custom-border about-img01"><img src="'.esc_url(get_template_directory_uri()) .'/assets/images/about01.png" alt="" class="wp-image-20" style="border-radius:10px"/></figure>
<!-- /wp:image -->

<!-- wp:image {"id":9,"sizeSlug":"full","linkDestination":"none","align":"right","className":"about-img02","style":{"border":{"radius":"10px"}}} -->
<figure class="wp-block-image alignright size-full has-custom-border about-img02"><img src="'.esc_url(get_template_directory_uri()) .'/assets/images/about02.png" alt="" class="wp-image-9" style="border-radius:10px"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center","width":"50%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:50%"><!-- wp:image {"id":10,"sizeSlug":"full","linkDestination":"none","className":"about-img03","style":{"border":{"radius":"10px"}}} -->
<figure class="wp-block-image size-full has-custom-border about-img03"><img src="'.esc_url(get_template_directory_uri()) .'/assets/images/about03.png" alt="" class="wp-image-10" style="border-radius:10px"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center","className":"about-us-col02 wow fadeInRight","style":{"spacing":{"blockGap":"var:preset|spacing|30"}}} -->
<div class="wp-block-column is-vertically-aligned-center about-us-col02 wow fadeInRight"><!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"typography":{"fontStyle":"normal","fontWeight":"600"}},"textColor":"background","fontSize":"medium","fontFamily":"poppins"} -->
<p class="has-background-color has-text-color has-link-color has-poppins-font-family has-medium-font-size" style="font-style:normal;font-weight:600">'. esc_html__('Finally, Someone Gets It','psychotherapy').'</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"800","fontSize":"28px","textTransform":"capitalize"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","fontFamily":"poppins"} -->
<h2 class="wp-block-heading has-background-color has-text-color has-link-color has-poppins-font-family" style="font-size:28px;font-style:normal;font-weight:800;text-transform:capitalize">'. esc_html__('You Are Not Too Sensitive. You Have RSD.','psychotherapy').'</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontStyle":"normal","fontWeight":"400","lineHeight":"1.8"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","fontSize":"extra-small","fontFamily":"rubik"} -->
<p class="has-background-color has-text-color has-link-color has-rubik-font-family has-extra-small-font-size" style="font-style:normal;font-weight:400;line-height:1.8">'. esc_html__('You have been told you are "too sensitive" your entire life. That rejection feels like physical pain because you are "dramatic." We are here to tell you: You are not broken. 90% of people with ADHD experience Rejection Sensitive Dysphoria, yet most have never heard of it.','psychotherapy').'</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"className":"about-col02-list","style":{"spacing":{"margin":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|30"}}}} -->
<div class="wp-block-columns about-col02-list" style="margin-top:var(--wp--preset--spacing--60);margin-bottom:var(--wp--preset--spacing--30)"><!-- wp:column {"style":{"spacing":{"blockGap":"var:preset|spacing|30"}}} -->
<div class="wp-block-column"><!-- wp:image {"id":12,"sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full"><img src="'.esc_url(get_template_directory_uri()) .'/assets/images/about-icon01.png" alt="" class="wp-image-12"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"700","fontSize":"19px","textTransform":"capitalize"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"spacing":{"margin":{"top":"var:preset|spacing|40"}}},"textColor":"background","fontFamily":"poppins"} -->
<h2 class="wp-block-heading has-background-color has-text-color has-link-color has-poppins-font-family" style="margin-top:var(--wp--preset--spacing--40);font-size:19px;font-style:normal;font-weight:700;text-transform:capitalize">'. esc_html__('Evidence-Based Understanding','psychotherapy').'</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontStyle":"normal","fontWeight":"400","lineHeight":"1.5"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","fontSize":"extra-small","fontFamily":"rubik"} -->
<p class="has-background-color has-text-color has-link-color has-rubik-font-family has-extra-small-font-size" style="font-style:normal;font-weight:400;line-height:1.5">'. esc_html__('Every technique and approach is rooted in scientific research about RSD and ADHD. No generic advice - only targeted solutions that work.','psychotherapy').'</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"style":{"spacing":{"blockGap":"var:preset|spacing|30"}}} -->
<div class="wp-block-column"><!-- wp:image {"id":13,"sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full"><img src="'.esc_url(get_template_directory_uri()) .'/assets/images/about-icon02.png" alt="" class="wp-image-13"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"700","fontSize":"19px","textTransform":"capitalize"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"spacing":{"margin":{"top":"var:preset|spacing|40"}}},"textColor":"background","fontFamily":"poppins"} -->
<h2 class="wp-block-heading has-background-color has-text-color has-link-color has-poppins-font-family" style="margin-top:var(--wp--preset--spacing--40);font-size:19px;font-style:normal;font-weight:700;text-transform:capitalize">'. esc_html__('Safe Community Space','psychotherapy').'</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontStyle":"normal","fontWeight":"400","lineHeight":"1.5"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","fontSize":"extra-small","fontFamily":"rubik"} -->
<p class="has-background-color has-text-color has-link-color has-rubik-font-family has-extra-small-font-size" style="font-style:normal;font-weight:400;line-height:1.5">'. esc_html__('Connect with others who truly understand your experience. No judgment, no "just get over it" - only validation and practical support.','psychotherapy').'</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:group -->',
    );