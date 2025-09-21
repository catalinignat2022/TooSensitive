<?php
/**
 * Block Styles
 *
 * @link https://developer.wordpress.org/reference/functions/register_block_style/
 *
 * @package WordPress
 * @subpackage psychotherapy
 * @since psychotherapy 1.0
 */

if ( function_exists( 'register_block_style' ) ) {
	/**
	 * Register block styles.
	 *
	 * @since psychotherapy 1.0
	 *
	 * @return void
	 */
	function psychotherapy_register_block_styles() {
		

		// Image: Borders.
		register_block_style(
			'core/image',
			array(
				'name'  => 'psychotherapy-border',
				'label' => esc_html__( 'Borders', 'psychotherapy' ),
			)
		);

		
	}
	add_action( 'init', 'psychotherapy_register_block_styles' );
}