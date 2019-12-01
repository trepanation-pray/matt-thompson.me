<section class="o-contact u-section u-color--white u-bg--secondary u-chevron-bottom" id="contact">
    <div class="u-container">
        <h2 class="o-contact__title u-color--white">Get in touch</h2>
        <div class="u-row j-animate j-animate--up">

            <div class="u-col u-col--2">
                <div class="o-contact__details">
                    <p>
                        <a href="tel:<?= get_field('phone_number', 'options') ?>" class="o-contact__phone">
                            <?= get_field('phone_number', 'options') ?>
                        </a>
                    </p>
                    <p>
                        <a href="tel:<?= get_field('email_address', 'options') ?>" class="o-contact__email">
                            <?= get_field('email_address', 'options') ?>
                        </a>
                    <p>
                    <?php if( have_rows('social_links', 'options') ):?> 
                        <ul class="c-social-media">
                            <?php while ( have_rows('social_links', 'options') ) : the_row();
                                $link = get_sub_field('link');
                                $icon = get_sub_field('icon');
                                $label = get_sub_field('label');
                            ?>
                            <li class="c-social-media__item">
                                <a href="<?= $link['url'] ?>" target="<?= $link['target'] ?>" title="<?= $link['title'] ?>" class="c-social-media__link">
                                    <?= $icon ?>
                                </a>
                                <span class="c-social-media__label"><?= $label ?></span>
                            </li>
                            <?php endwhile; ?>
                        </ul>
                    <?php endif; ?>
                </div>
            </div>
            <div class="u-col u-col--2">
                <div class="o-contact__form">
                    <?= do_shortcode('[contact-form-7 id="552" title="Contact"]') ?>
                </div>
            </div>
        </div>
    </div>
</section>