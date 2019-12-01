<?php

/* =======================================================
	Custom Fuctions
======================================================= */

add_filter('wpcf7_autop_or_not', '__return_false');

/* =======================================================
	Post Types
======================================================= */


register_post_type('portfolio', array(
	'labels' => array(
		'name' => __('Portfolio'), 
		'singular_name' => __('Portfolio'),
		'add_new' => __('Add New Item'),
		'add_new_item' => __('Add New Item'),
		'edit' => __('Edit'),
		'edit_item' => __('Edit Item'),
		'new_item' => __('New Item'),
		'view' => __('View Item'),
		'view_item' => __('View Item'),
		'search_items' => __('Search Portfolio'),
		'not_found' => __('No Portfolio Items found'),
		'not_found_in_trash' => __('No Portfolio found in Trash')
	),
	'public' => true,
	'hierarchical' => true,
	'has_archive' => true,
	'publicly_queryable' => false, // Determines whether the archive is active or not
	'exclude_from_search' => true, // Determines whether the post type is shown when using internal search
	'rewrite' => array('slug' => 'portfolio', 'with_front' => false),
	'menu_icon' => 'dashicons-format-gallery',
	'supports' => array(
		'title',
		// 'editor',
		'excerpt',
		'thumbnail'
	),
	'can_export' => true
));

// Create events taxonomies
function portfolio_tax() {	
    register_taxonomy( 'portfolio_cats', 'portfolio',
        array(
            'label' => __( 'Categories' ),
            'rewrite' => array( 
                'slug' => 'portfolio/category', 
                'with_front' => false 
            ),
            'show_in_rest' => true,
            'rest_base' => 'category',
            'rest_controller_class' => 'WP_REST_Terms_Controller',
            'hierarchical' => true,
            'has_archive' => true,
            'public' => true,
            'show_admin_column' => true
        )
    );
}
add_action( 'init', 'portfolio_tax' );


/*
* Function to disable admin notice of a new WordPress version.
* Updates are controlled via Composer so not required to be shown to clients.
*/
function hide_update_notice()
{
	remove_action( 'admin_notices', 'update_nag', 3 );
	remove_filter( 'update_footer', 'core_update_footer' );
}
add_action( 'admin_head', 'hide_update_notice', 1 );

/*
* Function to add Global Options to admin
*/
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page('Global Options');
}


/**
 * Defer Javascripts Speed up loading for external js files wait till page loads
 * Defer jQuery Parsing using the HTML5 defer property
 * 	
 * Function also allows to not defer on specific pages (especially pages that utilise forminator!)
 */
if (!is_admin()) {
	function defer_parsing_of_js ( $url ) {
		if ( FALSE === strpos( $url, '.js' ) ) return $url;
		if ( strpos( $url, 'jquery.js' ) || strpos( $url, 'jquery.c.js' ) || strpos( $url, 'wpfront-notification-bar.js' ) ) return $url;
		
		$pageURL = trim($_SERVER['REQUEST_URI'], '/');

		if($pageURL == 'contact-us'){
			return $url;
		} else {
			return "$url' defer onload='";
		}
	}
  	add_filter( 'clean_url', 'defer_parsing_of_js', 11, 1 );
}


/* =======================================================
	Custom Stylesheet Functions
======================================================= */

// Custom editor stylesheet for backend
function my_theme_add_editor_styles() {
    add_editor_style( 'custom-editor-style.css' );
}
add_action( 'init', 'my_theme_add_editor_styles' );

// Works with above function
function wpb_mce_button($buttons) {
    array_unshift($buttons, 'styleselect');
    return $buttons;
}
add_filter('mce_buttons_2', 'wpb_mce_button');

/**
 * Override Default Formats Options in the Drop Down with our own options.
 */
function my_wpeditor_formats_options( $settings ){
	
	/* List all options as multi dimension array */
	$style_formats = array(
		array(
			'title'   => 'Large Text', /* Title of the option drop down */
			'inline'  => 'span', /* use "inline" or "block" as key and the element wrapper ( "div", "span", "etc" ) as value. */
			'classes' => 'large-text' /* additional classes for the element created (separated by space) */
		),
	);
	
	/* Add it in tinymce config as json data */
	$settings['style_formats'] = json_encode( $style_formats );
	return $settings;
}
add_filter( 'tiny_mce_before_init', 'my_wpeditor_formats_options' );

/* =======================================================
	WordPress Overrides
======================================================= */

/*
* Function to remove admin bar from front end when logged into admin area
*/
function remove_admin_bar() {
	return false;
}

/*
* Function to remove comments from admin Menu
*/ 
function custom_menu_page_removing() {
    remove_menu_page( 'edit-comments.php' );
}

/*
* WordPress function to provide additional theme support
*/ 
if (function_exists('add_theme_support')) {
	// Add Menu Support
	add_theme_support('menus');

	// Add Thumbnail Theme Support
	add_theme_support('post-thumbnails');
}

/*
* Function to allow SVG's to be uploaded into Media Library
*/ 
function cc_mime_types($mimes) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}

/*
* Function to remove the <div> surrounding the dynamic navigation to cleanup markup
*/
function my_wp_nav_menu_args($args = '') {
	$args['container'] = false;
	return $args;
}

/*
* Function to remove Injected classes, ID's and Page ID's from Navigation <li> items
*/
function my_css_attributes_filter($var) {
	return is_array($var) ? array() : '';
}

/*
* Function to remove invalid rel attribute values in the categorylist
*/
function remove_category_rel_from_category_list($thelist) {
	return str_replace('rel="category tag"', 'rel="tag"', $thelist);
}

/*
* Function to remove wp_head() injected Recent Comment styles
*/
function my_remove_recent_comments_style() {
	global $wp_widget_factory;
	remove_action('wp_head', array(
		$wp_widget_factory->widgets['WP_Widget_Recent_Comments'],
		'recent_comments_style'
	));
}

/*
* Function to remove thumbnail width and height dimensions that prevent fluid images in the_thumbnail
*/
function remove_thumbnail_dimensions( $html ) {
	$html = preg_replace('/(width|height)=\"\d*\"\s/', "", $html);
	return $html;
}

/*
* Function to remove version numbers
*/
function sdt_remove_ver_css_js( $src ) {
	if ( strpos( $src, 'ver=' ) )
		$src = remove_query_arg( 'ver', $src );
	return $src;
}

/* =======================================================
	Navigation
======================================================= */

function register_site_menus() {
	register_nav_menus([
		'main-menu' => __('Main Menu', 'pblite-theme'), // Main Navigation
		'colophon-menu' => __('Colophon Menu', 'pblite-theme'), // Colophon Navigation
	]);
}

function main_menu() {
	wp_nav_menu(
		[
			'theme_location'  => 'main-menu',
			// 'link_before' => '<span>',     
			// 'link_after'  => '</span>',
			'menu_class' => 'primary-navigation__list',
		]
	);
}

function colophon_menu() {
	wp_nav_menu(
		[
			'theme_location'  => 'colophon-menu',
			'link_before' => '<span>',     
			'link_after'  => '</span>'
		]
	);
}

function wpse_remove_empty_links( $menu ) {
    return preg_replace('/<a>([^<]+)<\/a>/i', '<span class="no-link">$1</span>', $menu);
}

/* =======================================================
	Enqueuing Styles/Scripts
======================================================= */

function site_load_scripts()
{
	if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {

		wp_deregister_script('jquery');
		wp_register_script('jquery', get_template_directory_uri() . '/src/js/vendor/jquery.min.js', array(), '3.3.1', false);
		wp_enqueue_script('jquery');
		

		wp_register_script('commonjs', get_template_directory_uri() . '/dist/js/common.js', array('jquery'), '1.0.0', false);
		wp_enqueue_script('commonjs');
	}
}

function site_conditional_scripts() {
	if (is_page('Sample Page')) {
		// Specific page conditional scripts here.
	}
}

function site_styles() {

	wp_register_style('style', get_template_directory_uri() . '/dist/css/style.min.css', array(), '1.0', 'all');
	wp_enqueue_style('style');

  wp_dequeue_style( 'wp-block-library' );
  
}

/* =======================================================
	Actions, Filters & ShortCodes
======================================================= */

// Add Actions
add_action('init', 'site_load_scripts'); // Add Custom Scripts to wp_head
add_action('wp_print_scripts', 'site_conditional_scripts'); // Add Conditional Page Scripts
add_action('wp_enqueue_scripts', 'site_styles'); // Add Theme Stylesheet
add_action('init', 'register_site_menus'); // Register Menus
add_action('widgets_init', 'my_remove_recent_comments_style'); // Remove inline Recent Comment Styles from wp_head()
add_action('admin_menu', 'custom_menu_page_removing'); // Removing comments from admin menu

// Add Filters
add_filter('widget_text', 'do_shortcode'); // Allow shortcodes in Dynamic Sidebar
add_filter('widget_text', 'shortcode_unautop'); // Remove <p> tags in Dynamic Sidebars (better!)
add_filter('wp_nav_menu_args', 'my_wp_nav_menu_args'); // Remove surrounding <div> from WP Navigation
add_filter('the_category', 'remove_category_rel_from_category_list'); // Remove invalid rel attribute
add_filter('the_excerpt', 'shortcode_unautop'); // Remove auto <p> tags in Excerpt (Manual Excerpts only)
add_filter('the_excerpt', 'do_shortcode'); // Allows Shortcodes to be executed in Excerpt (Manual Excerpts only)
add_filter('show_admin_bar', 'remove_admin_bar'); // Remove Admin bar
add_filter('post_thumbnail_html', 'remove_thumbnail_dimensions', 10); // Remove width and height dynamic attributes to thumbnails
add_filter('image_send_to_editor', 'remove_thumbnail_dimensions', 10); // Remove width and height dynamic attributes to post images
add_filter('style_loader_src', 'sdt_remove_ver_css_js', 9999); // Remove WP Version From Styles 
add_filter('script_loader_src', 'sdt_remove_ver_css_js', 9999); // Remove WP Version From Scripts
add_filter('upload_mimes', 'cc_mime_types'); // Adding ability to upload SVG files
add_filter('wp_nav_menu_items', 'wpse_remove_empty_links'); // Using regex to change empty <a> tags to spans

// Add Custom Images Sizes/Dimensions
add_image_size('thumbnail', '', 150); // Overriding Thumbnail (https://developer.wordpress.org/reference/functions/add_image_size/#reserved-image-size-names)
add_image_size('xlarge', 1200, ''); // Large Thumbnail
add_image_size('large', 700, ''); // Large Thumbnail
add_image_size('medium', 250, ''); // Medium Thumbnail
add_image_size('small', 120, ''); // Small Thumbnail

add_image_size('bootstrap_lg', 540, ''); // Bootstrap - Large
add_image_size('bootstrap_md', 450, ''); // Bootstrap - Medium
add_image_size('bootstrap_sm', 330, ''); // Bootstrap - Small

add_image_size('lazy-thumb', 50, 50, true); // Lazy thumbnail size
add_image_size('gallery-square', 500, 500, true); // Square preview for gallery usage

// Remove Actions
remove_action('wp_head', 'feed_links_extra', 3); // Display the links to the extra feeds such as category feeds
remove_action('wp_head', 'feed_links', 2); // Display the links to the general feeds: Post and Comment Feed
remove_action('wp_head', 'rsd_link'); // Display the link to the Really Simple Discovery service endpoint, EditURI link
remove_action('wp_head', 'wlwmanifest_link'); // Display the link to the Windows Live Writer manifest file.
remove_action('wp_head', 'index_rel_link'); // Index link
remove_action('wp_head', 'parent_post_rel_link', 10, 0); // Prev link
remove_action('wp_head', 'start_post_rel_link', 10, 0); // Start link
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0); // Display relational links for the posts adjacent to the current post.
remove_action('wp_head', 'wp_generator'); // Display the XHTML generator that is generated on the wp_head hook, WP version
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
remove_action('wp_head', 'rel_canonical');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_styles', 'print_emoji_styles');

// Remove Filters
remove_filter('the_excerpt', 'wpautop'); // Remove <p> tags from Excerpt altogether

// Do Not Remove! ?>