<?php
/*
Template Name: Assessment Page
Description: 10-question RSD assessment with interactive scoring and resources.
*/
get_header();
?>

<main id="primary" class="site-main">
  <div class="wp-block-group content-area" style="max-width: 800px; margin: 0 auto; padding: 2.5rem 1rem;">
    <div class="wp-block-group assessment-wrapper" style="background: #f5fafd; border-radius: 18px; box-shadow: 0 2px 16px rgba(77,122,121,0.08); padding: 2.5rem 2rem;">
      <h1 class="wp-block-heading" style="font-size:2.2rem; color:#4d7a79; margin-bottom:1.2rem;">Evaluare RSD rapidă (2 minute)</h1>
      <p class="lead" style="font-size:1.1rem; color:#333; margin-bottom:2rem;">Răspunde anonim la 10 afirmații scurte. Vei afla dacă sensibilitatea la respingere (RSD) poate explica reacțiile tale la critică sau respingere.</p>
      <div id="assessment-app" class="wp-block-group assessment-app" aria-live="polite">
        <div id="assessment-start" class="wp-block-group assessment-start" style="margin-bottom:2rem;">
          <p style="margin-bottom:1.2rem;">Ești gata? Pentru fiecare afirmație, alege cât de des ți se potrivește.</p>
          <div class="wp-block-button is-style-primary"><button id="start-assessment" class="wp-block-button__link" style="background:#4d7a79; color:#fff; font-size:1rem; padding:0.8em 2em; border-radius:8px;">Începe evaluarea</button></div>
        </div>
        <form id="assessment-form" class="wp-block-group assessment-form" style="display:none;" aria-hidden="true">
          <div id="question-container" class="question-container"></div>
          <div class="assessment-controls wp-block-buttons" style="margin-top:2rem; display:flex; gap:1rem;">
            <div class="wp-block-button"><button type="button" id="prev-btn" class="wp-block-button__link" style="background:#aaf1ef; color:#4d7a79; font-size:1rem; padding:0.7em 1.5em; border-radius:8px;">Înapoi</button></div>
            <div class="wp-block-button is-style-primary"><button type="button" id="next-btn" class="wp-block-button__link" style="background:#4d7a79; color:#fff; font-size:1rem; padding:0.7em 1.5em; border-radius:8px;">Următorul</button></div>
          </div>
        </form>
        <div id="assessment-results" class="wp-block-group assessment-results" style="display:none; margin-top:2rem;" aria-hidden="true"></div>
      </div>
    </div>
  </div>
</main>

<?php
get_footer();
?>