<?php
/**
 * Header Default
 * 
 * slug: psychotherapy/header-default
 * title: Header Default
 * categories: psychotherapy
 */

return array(
    'title'      =>__( 'Header Default', 'psychotherapy' ),
    'categories' => array( 'psychotherapy' ),
    'content'    => '<!-- wp:group {"className":"header-box-upper","layout":{"type":"constrained","contentSize":"100%"}} -->
<div class="wp-block-group header-box-upper"><!-- wp:group {"className":"header-box-top","style":{"spacing":{"padding":{"right":"0","left":"0","top":"0","bottom":"0"},"margin":{"top":"0","bottom":"0"},"blockGap":"0"}},"backgroundColor":"accent","layout":{"type":"constrained","contentSize":"80%"}} -->
<div class="wp-block-group header-box-top has-accent-background-color has-background" style="margin-top:0;margin-bottom:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><!-- wp:columns {"verticalAlignment":"center","className":"header-box-lower","style":{"border":{"radius":{"topLeft":"0px","topRight":"0px","bottomLeft":"0px","bottomRight":"15px"}},"spacing":{"padding":{"top":"0","bottom":"0","left":"var:preset|spacing|20","right":"var:preset|spacing|20"},"margin":{"top":"0","bottom":"0"}}}} -->
<div class="wp-block-columns are-vertically-aligned-center header-box-lower" style="border-top-left-radius:0px;border-top-right-radius:0px;border-bottom-left-radius:0px;border-bottom-right-radius:15px;margin-top:0;margin-bottom:0;padding-top:0;padding-right:var(--wp--preset--spacing--20);padding-bottom:0;padding-left:var(--wp--preset--spacing--20)"><!-- wp:column {"verticalAlignment":"center","width":"80%","className":"header-logo-section","style":{"spacing":{"padding":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20","left":"var:preset|spacing|30","right":"var:preset|spacing|30"}}}} -->
<div class="wp-block-column is-vertically-aligned-center header-logo-section" style="padding-top:var(--wp--preset--spacing--20);padding-right:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--20);padding-left:var(--wp--preset--spacing--30);flex-basis:80%"><!-- wp:html -->
<div class="toosensitive-header-logo">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 90" width="280" height="75" style="max-height: 65px;">
  <defs>
    <!-- Premium gradients -->
    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
      <stop offset="30%" style="stop-color:#f8fffe;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:1" />
    </linearGradient>
    
    <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.95" />
      <stop offset="50%" style="stop-color:#f0fffe;stop-opacity:0.9" />
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0.95" />
    </linearGradient>
    
    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:#f5fffe;stop-opacity:0.6" />
    </linearGradient>
    
    <!-- Professional shadow filters -->
    <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#4d7a79" flood-opacity="0.15"/>
    </filter>
    
    <filter id="iconShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#366E6D" flood-opacity="0.2"/>
    </filter>
  </defs>
  
  <!-- Icon section - redesigned symbol -->
  <g transform="translate(8, 18)" filter="url(#iconShadow)">
    <!-- Outer protective circle -->
    <circle cx="27" cy="27" r="25" fill="none" stroke="url(#iconGradient)" stroke-width="1.5" opacity="0.7"/>
    
    <!-- Inner therapeutic symbol -->
    <g transform="translate(27, 27)">
      <!-- Central healing symbol -->
      <path d="M-8,-12 C-12,-16 -20,-16 -20,-6 C-20,4 -8,10 -8,10 C-8,10 4,4 4,-6 C4,-16 -4,-16 -8,-12 Z" 
            fill="url(#iconGradient)" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>
      
      <!-- Protective arms extending outward -->
      <path d="M-18,-2 Q-22,-8 -16,-8 Q-12,-8 -14,-2 Q-16,4 -18,-2" fill="url(#iconGradient)" opacity="0.6"/>
      <path d="M18,-2 Q22,-8 16,-8 Q12,-8 14,-2 Q16,4 18,-2" fill="url(#iconGradient)" opacity="0.6"/>
      
      <!-- Neural connection points -->
      <circle cx="-15" cy="-8" r="1.5" fill="#ffffff" opacity="0.8"/>
      <circle cx="15" cy="-8" r="1.5" fill="#ffffff" opacity="0.8"/>
      <circle cx="0" cy="12" r="1.5" fill="#ffffff" opacity="0.8"/>
      
      <!-- Subtle connecting lines -->
      <path d="M-13,-8 L-2,-2 M13,-8 L2,-2 M0,10 L0,2" stroke="#ffffff" stroke-width="0.5" opacity="0.5"/>
    </g>
    
    <!-- Corner accent elements -->
    <circle cx="8" cy="12" r="1" fill="#ffffff" opacity="0.4"/>
    <circle cx="46" cy="16" r="1" fill="#ffffff" opacity="0.4"/>
    <circle cx="12" cy="42" r="1" fill="#ffffff" opacity="0.4"/>
    <circle cx="42" cy="38" r="1" fill="#ffffff" opacity="0.4"/>
  </g>
  
  <!-- Typography section -->
  <g filter="url(#logoShadow)">
    <!-- Main brand name -->
    <text x="75" y="38" 
          font-family="Poppins, Helvetica Neue, Arial, sans-serif" 
          font-size="26" 
          font-weight="600" 
          fill="url(#logoGradient)" 
          letter-spacing="-0.5px">
      TooSensitive
    </text>
    
    <!-- Professional subtitle -->
    <text x="75" y="56" 
          font-family="Poppins, Helvetica Neue, Arial, sans-serif" 
          font-size="11" 
          font-weight="400" 
          fill="#ffffff" 
          letter-spacing="0.5px"
          opacity="0.85">
      RSD &amp; EMOTIONAL SUPPORT
    </text>
    
    <!-- Elegant separator line -->
    <line x1="75" y1="62" x2="300" y2="62" 
          stroke="url(#accentGradient)" 
          stroke-width="1" 
          opacity="0.4"/>
    
    <!-- Professional badge element -->
    <g transform="translate(275, 20)">
      <circle cx="8" cy="8" r="6" fill="none" stroke="#ffffff" stroke-width="0.8" opacity="0.6"/>
      <path d="M4,8 L7,11 L12,5" stroke="#ffffff" stroke-width="1.2" fill="none" opacity="0.7"/>
    </g>
  </g>
  
  <!-- Subtle professional flourishes -->
  <g opacity="0.3">
    <path d="M70,25 Q72,23 74,25" stroke="#ffffff" stroke-width="0.5"/>
    <path d="M70,65 Q72,67 74,65" stroke="#ffffff" stroke-width="0.5"/>
  </g>
</svg>
</div>
<!-- /wp:html --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center","width":"20%","style":{"spacing":{"padding":{"top":"0","bottom":"0"}}}} -->
<div class="wp-block-column is-vertically-aligned-center" style="padding-top:0;padding-bottom:0;flex-basis:20%"><!-- wp:social-links {"iconColor":"secaccent","iconColorValue":"#aaf1ef","openInNewTab":true,"className":"is-style-logos-only social-icon-header","style":{"spacing":{"margin":{"right":"0","left":"0","top":"0","bottom":"0"},"blockGap":{"top":"0","left":"0"},"padding":{"top":"0","bottom":"0","left":"0","right":"0"}}},"layout":{"type":"flex","justifyContent":"right"}} -->
<ul class="wp-block-social-links has-icon-color is-style-logos-only social-icon-header" style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><!-- wp:social-link {"url":"https://web.facebook.com/profile.php?id=61580870654411","service":"facebook","opensInNewTab":true} /-->

<!-- wp:social-link {"url":"#","service":"twitter"} /-->

<!-- wp:social-link {"url":"#","service":"youtube"} /-->

<!-- wp:social-link {"url":"#","service":"instagram"} /--></ul>
<!-- /wp:social-links --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"header-box-middle","style":{"spacing":{"padding":{"right":"0","left":"0","top":"0","bottom":"0"},"margin":{"top":"0","bottom":"0"},"blockGap":"0"}},"layout":{"type":"constrained","contentSize":"80%"}} -->
<div class="wp-block-group header-box-middle" style="margin-top:0;margin-bottom:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><!-- wp:columns {"className":"menu-group","style":{"spacing":{"padding":{"top":"var:preset|spacing|20","bottom":"var:preset|spacing|20","left":"0","right":"0"},"margin":{"top":"0","bottom":"0"}},"border":{"radius":{"topLeft":"0px","bottomLeft":"10px","topRight":"0px","bottomRight":"10px"}}},"backgroundColor":"background"} -->
<div class="wp-block-columns menu-group has-background-background-color has-background" style="border-top-left-radius:0px;border-top-right-radius:0px;border-bottom-left-radius:10px;border-bottom-right-radius:10px;margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--20);padding-right:0;padding-bottom:var(--wp--preset--spacing--20);padding-left:0"><!-- wp:column {"verticalAlignment":"center","width":"20%","className":"header-logo","style":{"spacing":{"padding":{"left":"var:preset|spacing|20","right":"var:preset|spacing|20","top":"0px","bottom":"0px"}},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}},"textColor":"primary"} -->
<div class="wp-block-column is-vertically-aligned-center header-logo has-primary-color has-text-color has-link-color" style="padding-top:0px;padding-right:var(--wp--preset--spacing--20);padding-bottom:0px;padding-left:var(--wp--preset--spacing--20);flex-basis:20%"><!-- wp:site-title {"textAlign":"left","style":{"typography":{"fontStyle":"normal","fontWeight":"400","textTransform":"capitalize","fontSize":"24px","lineHeight":"1.3"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}},"spacing":{"padding":{"right":"var:preset|spacing|20","left":"var:preset|spacing|20"}}},"textColor":"primary","fontFamily":"poppins"} /--></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center","width":"60%","className":"header-inner-menu"} -->
<div class="wp-block-column is-vertically-aligned-center header-inner-menu" style="flex-basis:60%"><!-- wp:navigation {"textColor":"accent","className":"is-head-menu","style":{"typography":{"textTransform":"capitalize","fontStyle":"normal","fontWeight":"400"}},"fontSize":"medium","fontFamily":"poppins","layout":{"type":"flex","justifyContent":"center"}} --><!-- wp:navigation-link {"label":"Home","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->

    <!-- wp:navigation-link {"label":"About Us","type":"","url":"#aboutus","kind":"custom","isTopLevelLink":true} /-->
    
    <!-- wp:navigation-link {"label":"Services","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->
    
    <!-- wp:navigation-link {"label":"Pages","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->
    
    <!-- wp:navigation-link {"label":"blog","type":"","url":"#blog","kind":"custom","isTopLevelLink":true} /-->

    <!-- wp:navigation-link {"label":"Contact Us","type":"","url":"#blog","kind":"custom","isTopLevelLink":true} /-->
    <!-- wp:navigation-link {"label":"Get Pro","type":"","url":"https://www.wpradiant.net/products/therapy-wordpress-theme","kind":"custom","isTopLevelLink":true,"className":"getpro"} /-->
    <!-- /wp:navigation --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center","width":"20%","className":"search-column","layout":{"type":"default"}} -->
<div class="wp-block-column is-vertically-aligned-center search-column" style="flex-basis:20%"><!-- wp:search {"label":"Search","showLabel":false,"placeholder":"Search.....","width":100,"widthUnit":"%","buttonText":"Search","buttonPosition":"button-only","buttonUseIcon":true,"isSearchFieldHidden":true,"className":"header-search","style":{"color":{"background":"#c75b5b00"},"elements":{"link":{"color":{"text":"var:preset|color|accent"}}},"typography":{"fontStyle":"normal","fontWeight":"600"}},"textColor":"accent","fontSize":"medium"} /--></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->',
    );