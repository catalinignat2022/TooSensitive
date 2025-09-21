<?php
/**
 * FAQ Section
 * 
 * slug: psychotherapy/faq-section
 * title: FAQ Section
 * categories: psychotherapy
 */

    return array(
        'title'      =>__( 'FAQ Section', 'psychotherapy' ),
        'categories' => array( 'psychotherapy' ),
        'content'    => '<!-- wp:spacer {"height":"20px"} -->
<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"className":"faq-section","style":{"spacing":{"margin":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}},"backgroundColor":"accent","layout":{"type":"constrained","contentSize":"80%"}} -->
<div class="wp-block-group faq-section has-accent-background-color has-background" style="margin-top:var(--wp--preset--spacing--30);margin-bottom:var(--wp--preset--spacing--30)"><!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"var:preset|spacing|60"},"margin":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}}} -->
<div class="wp-block-columns" style="margin-top:var(--wp--preset--spacing--60);margin-bottom:var(--wp--preset--spacing--60)"><!-- wp:column {"className":"faq-left wow fadeInLeft","style":{"spacing":{"blockGap":"var:preset|spacing|30"}}} -->
<div class="wp-block-column faq-left wow fadeInLeft"><!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}},"typography":{"fontStyle":"normal","fontWeight":"600"}},"textColor":"background","fontSize":"medium","fontFamily":"poppins"} -->
<p class="has-background-color has-text-color has-link-color has-poppins-font-family has-medium-font-size" style="font-style:normal;font-weight:600">'. esc_html__('RSD Science & Facts','psychotherapy').'</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"800","fontSize":"26px"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","fontFamily":"poppins"} -->
<h2 class="wp-block-heading has-background-color has-text-color has-link-color has-poppins-font-family" style="font-size:26px;font-style:normal;font-weight:800">'. esc_html__('What The Research Says About RSD','psychotherapy').'</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"className":"short-para-text","style":{"typography":{"fontStyle":"normal","fontWeight":"400","lineHeight":"1.7"},"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background","fontSize":"extra-small","fontFamily":"rubik"} -->
<p class="short-para-text has-background-color has-text-color has-link-color has-rubik-font-family has-extra-small-font-size" style="font-style:normal;font-weight:400;line-height:1.7">'. esc_html__('Evidence-based information about Rejection Sensitive Dysphoria from leading ADHD researchers and clinical studies. Understanding the science behind your experience.','psychotherapy').'</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":6,"sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full"><img src="'.esc_url(get_template_directory_uri()) .'/assets/images/FAQ.png" alt="" class="wp-image-6"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column {"className":"faq-right wow fadeInRight","style":{"spacing":{"blockGap":"var:preset|spacing|40"}}} -->
<div class="wp-block-column faq-right wow fadeInRight"><!-- wp:details {"showContent":true,"className":"faq-list"} -->
<details class="wp-block-details faq-list" open><summary>'. esc_html__('Is RSD Real? What Does Science Say?','psychotherapy').'</summary><!-- wp:paragraph {"placeholder":"Type / to add a hidden block","style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background"} -->
<p class="has-background-color has-text-color has-link-color">'. esc_html__('Yes, RSD is scientifically documented. Dr. William Dodson, a leading ADHD researcher, found that 99% of teens and adults with ADHD experience RSD. Brain imaging studies show that people with ADHD have heightened emotional sensitivity in the limbic system, making rejection feel like physical pain. This is not "being dramatic" - it is measurable neurological difference.','psychotherapy').'</p>
<!-- /wp:paragraph --></details>
<!-- /wp:details -->

<!-- wp:details {"className":"faq-list"} -->
<details class="wp-block-details faq-list"><summary>'. esc_html__('How Many People Have RSD?','psychotherapy').'</summary><!-- wp:paragraph {"placeholder":"Type / to add a hidden block","style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background"} -->
<p class="has-background-color has-text-color has-link-color">'. esc_html__('Research indicates that 90-99% of people with ADHD experience RSD. Since ADHD affects 5-10% of the global population, millions of people worldwide live with RSD. However, only 12% of mental health professionals are familiar with RSD, leaving most people undiagnosed and struggling without proper support or understanding.','psychotherapy').'</p>
<!-- /wp:paragraph --></details>
<!-- /wp:details -->

<!-- wp:details {"className":"faq-list"} -->
<details class="wp-block-details faq-list"><summary>'. esc_html__('Why Does Rejection Feel Like Physical Pain?','psychotherapy').'</summary><!-- wp:paragraph {"placeholder":"Type / to add a hidden block","style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background"} -->
<p class="has-background-color has-text-color has-link-color">'. esc_html__('Neuroimaging studies reveal that social rejection activates the same brain regions as physical pain - the anterior cingulate cortex and right ventral prefrontal cortex. In people with ADHD, these areas show hyperactivity, making emotional pain 50-100 times more intense than neurotypical individuals experience. This is why rejection truly "hurts" - your brain processes it as actual injury.','psychotherapy').'</p>
<!-- /wp:paragraph --></details>
<!-- /wp:details -->

<!-- wp:details {"className":"faq-list"} -->
<details class="wp-block-details faq-list"><summary>'. esc_html__('What Treatments Actually Work for RSD?','psychotherapy').'</summary><!-- wp:paragraph {"placeholder":"Type / to add a hidden block","style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background"} -->
<p class="has-background-color has-text-color has-link-color">'. esc_html__('Clinical studies show that alpha-2 agonists (guanfacine, clonidine) can reduce RSD symptoms by 60-80%. However, immediate coping strategies are equally important: 4-7-8 breathing technique, grounding exercises, and cognitive reframing have shown significant effectiveness. Research emphasizes that understanding RSD as a neurological condition, not a character flaw, is crucial for recovery.','psychotherapy').'</p>
<!-- /wp:paragraph --></details>
<!-- /wp:details -->

<!-- wp:details {"className":"faq-list"} -->
<details class="wp-block-details faq-list"><summary>'. esc_html__('Does RSD Affect Everyone the Same Way?','psychotherapy').'</summary><!-- wp:paragraph {"placeholder":"Type / to add a hidden block","style":{"elements":{"link":{"color":{"text":"var:preset|color|background"}}}},"textColor":"background"} -->
<p class="has-background-color has-text-color has-link-color">'. esc_html__('Research shows significant variations: Women with ADHD report RSD symptoms 40% more frequently than men, likely due to socialization differences and masking behaviors. RSD typically emerges in adolescence when social dynamics become complex, peaking in severity during teens and early twenties. However, many adults remain undiagnosed until their 30s-40s when seeking help for their children with similar symptoms.','psychotherapy').'</p>
<!-- /wp:paragraph --></details>
<!-- /wp:details --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"20px"} -->
<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->',
    );