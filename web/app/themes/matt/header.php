<!DOCTYPE html>

<html <?php language_attributes(); ?> class="no-js">

	<head>
		<meta charset="utf-8">

		<?php // Google Chrome Frame for IE ?>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

		<title><?php wp_title(''); ?></title>

		<?php // mobile meta (hooray!) ?>
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

		<?php // icons & favicons (for more: http://www.jonathantneal.com/blog/understand-the-favicon/) ?>
		<link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/library/images/apple-icon-touch.png">
		<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/favicon.png">
		<!--[if IE]>
			<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">
		<![endif]-->
		<?php // or, set /favicon.ico for IE10 win ?>
		<meta name="msapplication-TileColor" content="#f01d4f">
		<meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/library/images/win8-tile-icon.png">

		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

		<?php // wordpress head functions ?>
		<?php wp_head(); ?>
		<?php // end of wordpress head ?>

	</head>
	<body <?php body_class('j-animate'); ?>>
		<header class="o-site-header">
			<div class="u-container">
				<a href="/">
					<img src="<?= get_template_directory_uri(); ?>/library/images/logo.svg" class="o-site-header__logo" />
				</a>
				<nav class="o-site-navigation" role="navigation">
					<ul class="o-site-navigation__list">
						<li class="o-site-navigation__item"><a class="o-site-navigation__link" href="#about">about</a></li>
						<li class="o-site-navigation__item"><a class="o-site-navigation__link" href="#work">work</a></li>
						<li class="o-site-navigation__item"><a class="o-site-navigation__link" href="#contact">contact</a></li>
					</ul>
				</nav>
				<button class="o-mobile-navigation-button">
					<span class="o-mobile-navigation-button__text">Open menu</span>
					<span class="o-mobile-navigation-button__bar bar-1"></span>
					<span class="o-mobile-navigation-button__bar bar-2"></span>
					<span class="o-mobile-navigation-button__bar bar-3"></span>
				</button>
			</div>
		</header>