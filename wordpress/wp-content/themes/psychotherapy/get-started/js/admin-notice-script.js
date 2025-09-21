jQuery(document).ready(function ($) {
    // Attach click event to the dismiss button
    $(document).on('click', '.notice[data-notice="get-start"] button.notice-dismiss', function () {
        // Dismiss the notice via AJAX
        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                action: 'psychotherapy_dismissed_notice',
            },
            success: function () {
                // Remove the notice on success
                $('.notice[data-notice="example"]').remove();
            }
        });
    });
});

// WordClever – AI Content Writer plugin activation
document.addEventListener('DOMContentLoaded', function () {
    const psychotherapy_button = document.getElementById('install-activate-button');

    if (!psychotherapy_button) return;

    psychotherapy_button.addEventListener('click', function (e) {
        e.preventDefault();

        const psychotherapy_redirectUrl = psychotherapy_button.getAttribute('data-redirect');

        // Step 1: Check if plugin is already active
        const psychotherapy_checkData = new FormData();
        psychotherapy_checkData.append('action', 'check_wordclever_activation');

        fetch(installWordcleverData.ajaxurl, {
            method: 'POST',
            body: psychotherapy_checkData,
        })
        .then(res => res.json())
        .then(res => {
            if (res.success && res.data.active) {
                // Plugin is already active → just redirect
                window.location.href = psychotherapy_redirectUrl;
            } else {
                // Not active → proceed with install + activate
                psychotherapy_button.textContent = 'Installing & Activating...';

                const psychotherapy_installData = new FormData();
                psychotherapy_installData.append('action', 'install_and_activate_wordclever_plugin');
                psychotherapy_installData.append('_ajax_nonce', installWordcleverData.nonce);

                fetch(installWordcleverData.ajaxurl, {
                    method: 'POST',
                    body: psychotherapy_installData,
                })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        window.location.href = psychotherapy_redirectUrl;
                    } else {
                        alert('Activation error: ' + (res.data?.message || 'Unknown error'));
                        psychotherapy_button.textContent = 'Try Again';
                    }
                })
                .catch(error => {
                    alert('Request failed: ' + error.message);
                    psychotherapy_button.textContent = 'Try Again';
                });
            }
        })
        .catch(error => {
            alert('Check request failed: ' + error.message);
        });
    });
});
