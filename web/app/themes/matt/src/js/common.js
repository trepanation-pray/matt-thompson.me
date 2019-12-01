import {fez} from "@trepanation-pray/fez";
import "./config/jqueryLoad";
import "waypoints/lib/jquery.waypoints";
// import "@trepanation-pray/weasl/dist/weasl.min.js";
// "../plugins/contact-form-7/includes/js/scripts.js";
import "@fancyapps/fancybox/dist/jquery.fancybox.min";
import "owl.carousel/dist/owl.carousel";
// import "enquire.js/dist/enquire.min";
// import Instafeed from "instafeed.js/instafeed";

(function($, root, undefined) {

	fez({ offset: 80 });

	$(function() {
		"use strict";
		
		$("body").removeClass("j-animate");

		// Mobile Navigation
		$(".o-mobile-navigation-button, .o-mobile-navigation-button.active a").click(function() {
			$(this).toggleClass("active");
			$(".o-site-navigation")
				.stop()
				.toggleClass("active");
			$("body").toggleClass("j-menu-active");
		});

		// Animation trigger
		$(".j-animate, .j-animate-custom").each(function() {
			$(this).waypoint(
				function() {
					$(this.element).addClass("animate");
				},
				{
					offset: "80%"
				}
			);
		});

		// Carousel
		$(".o-work__list").after('<div class="c-slider-controls"><div class="c-slider-controls__dots"></div></div>');
		$(".o-work__list").owlCarousel({
			// loop: true,
			// autoplay: true,
			autoplaySpeed: 2000,
			autoplayTimeout: 8000,
			
			margin: 30,
			nav: false,
			dots: true,
			dotsContainer: ".o-work__list .c-slider-controls__dots",
			responsive: {
				0: {
					items: 1
				},
				567: {
					items: 2
				},
				768: {
					items: 3
				},
				1200: {
					items: 4
				}
			}
		});


		/**
		 * Fancybox object call
		 */
		$("[data-fancybox]").fancybox({
			animationEffect: "fade"
		});

		

		$('.js-fancybox').fancybox();




		/**
		 * Instagram object call
		 */
		// const accessToken =
		// 	"1539546819.d618108.67255fe985d641059bad683c0e3e4bd3";
		// const clientID = "d6181084a5654d4fb0563ebda5bce1b4";
		// const userID = "1539546819";
		// const targetElement = "instagramFeed";
		// let userFeed = new Instafeed({
		// 	filter: function(image) {
		// 		return image.type === "image";
		// 	},
		// 	get: "user",
		// 	accessToken: accessToken,
		// 	clientId: clientID,
		// 	userId: userID,
		// 	limit: 10,
		// 	target: targetElement,
		// 	resolution: "standard_resolution",
		// 	template:
		// 		'<a href="{{link}}" target="_blank"><img class="img-responsive" src="{{image}}" alt="Instagram photo"/></a>',
		// 	after: function() {
		// 		var images = $("#" + targetElement).find("a");
		// 		$(images.slice(5, images.length)).remove();
		// 	}
		// });
		// userFeed.run();
	});
})(jQuery, this);
