<?php
/**
 * Customizer
 * 
 * @package WordPress
 * @subpackage psychotherapy
 * @since psychotherapy 1.0
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function psychotherapy_customize_register( $wp_customize ) {
	$wp_customize->add_section( new Psychotherapy_Upsell_Section($wp_customize,'upsell_section',array(
		'title'            => __( 'Psychotherapy Pro', 'psychotherapy' ),
		'button_text'      => __( 'Upgrade Pro', 'psychotherapy' ),
		'url'              => 'https://www.wpradiant.net/products/therapy-wordpress-theme',
		'priority'         => 0,
	)));
}
add_action( 'customize_register', 'psychotherapy_customize_register' );

/**
 * Enqueue script for custom customize control.
 */
function psychotherapy_custom_control_scripts() {
	wp_enqueue_script( 'psychotherapy-custom-controls-js', get_template_directory_uri() . '/assets/js/custom-controls.js', array( 'jquery', 'jquery-ui-core', 'jquery-ui-sortable' ), '1.0', true );
	wp_enqueue_style( 'psychotherapy-customize-controls', trailingslashit( get_template_directory_uri() ) . '/assets/css/customize-controls.css' );
}
add_action( 'customize_controls_enqueue_scripts', 'psychotherapy_custom_control_scripts' );