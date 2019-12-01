 <section class="o-work u-section u-bg--light u-chevron-bottom u-text-align--center" id="#work">
 	<p class="o-work__text">Here you can view a selection of my work</p>

	<?php $portfolio_cats = get_terms("portfolio_cats", array("orderby" => "slug", "parent" => 0, "hide_empty" => false)); ?>
	
	<?php foreach($portfolio_cats as $key => $portfolio_cat) : ?>
		<h2 class="o-work__title j-animate j-animate--u"><?= $portfolio_cat->name ?></h2>
	
		<div class="o-work__list owl-carousel j-animate j-animate--up">
			<?php
				$work_query = null;

				$work_query = new WP_Query();

				$work_query->query([
					'post_type' => 'portfolio',
					'posts_per_page' => -1,
					'post_status' => 'publish',
					'ignore_sticky_posts' => 1,
					'tax_query' => array(
						array (
							'taxonomy' => 'portfolio_cats',
							'field' => 'slug',
							'terms' => $portfolio_cat->slug,
						)
					)
				]);
				
			?>
			<?php while( $work_query->have_posts() ): $work_query->the_post(); ?>
		
				<?php
					$work = [
						'title' => get_the_title(),
						'text' => get_the_excerpt(),
						'thumbnail' => get_the_post_thumbnail_url('','full')
					];

					if(get_field('full_size_image')) $work['link'] = get_field('full_size_image')['url'];
					if(get_field('video_url')) $work['link'] = get_field('video_url');
				?>

				<article class="c-work-item">
					<a class="c-work-item__link js-fancybox" data-fancybox="<?=  $portfolio_cat->slug ?>" href="<?= $work['link']?>" data-caption="<?= $work['title'] ?><?php if( $work['text']) echo ' - ' . $work['text'] ?>">
					<div class="c-work-item__image" style="background-image: url('<?= $work['thumbnail'] ?>');"></div>
					</a>

					<h3 class="c-work-item__title"><?= $work['title'] ?></h3>
					<?php if($work['text']): ?>
						<p class="c-work-item__text"><?= $work['text'] ?></p>
					<?php endif; ?>

				</article>
				
				
			<?php endwhile; wp_reset_postdata(); ?>
		</div>
		<hr>
	<?php endforeach; ?>



<a href="<?= get_field('downloadcv')['url'] ?>" target="_blank" class="c-btn c-btn-style--classic c-btn-color--secondary">Download my CV</a>

</section>