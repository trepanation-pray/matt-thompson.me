<section class="o-landing-intro u-section u-chevron-bottom u-bg--white">
    <div class="u-container">
        <div class="u-row j-animate j-animate--up">
            <div class="u-col u-col--2">
                <?php the_field('about_text'); ?>
            </div>
            <div class="u-col u-col--2">
                <img class="o-landing-intro__image" src="<?php the_field('about_image'); ?>" />
            </div>
        </div>
        <div class="u-row j-animate j-animate--up">
            <div class="u-col u-col--2">
                <img class="o-landing-intro__image" src="<?php the_field('services_image'); ?>" />
            </div>
            <div class="u-col u-col--2">
                <?php the_field('services_text'); ?>
            </div>
        </div>
    </div>
</section>