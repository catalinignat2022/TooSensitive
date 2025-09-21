<?php
/**
 * The main template file
 */

get_header(); ?>

<main id="main" class="site-main" role="main">
    <div class="container">
        <div class="content-wrapper">
            <?php if (have_posts()) : ?>
                <?php while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                        <header class="entry-header">
                            <h1 class="entry-title"><?php the_title(); ?></h1>
                        </header>

                        <div class="entry-content">
                            <?php the_content(); ?>
                        </div>
                    </article>
                <?php endwhile; ?>
            <?php else : ?>
                <div class="no-content">
                    <h1>Nothing Found</h1>
                    <p>It looks like nothing was found at this location. Maybe try a search?</p>
                    <?php get_search_form(); ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
</main>

<?php get_footer(); ?>