<?php
/**
 * Email Signup Form Include
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Get attributes with defaults
$title = isset($atts['title']) ? $atts['title'] : 'Stay Updated';
$description = isset($atts['description']) ? $atts['description'] : 'Get the latest RSD resources and support.';
$button_text = isset($atts['button_text']) ? $atts['button_text'] : 'Subscribe';
$placeholder = isset($atts['placeholder']) ? $atts['placeholder'] : 'Your email address';
$form_id = isset($atts['form_id']) ? $atts['form_id'] : 'email-signup-' . uniqid();
?>

<div class="email-signup-widget">
    <div class="signup-content">
        <h3><?php echo esc_html($title); ?></h3>
        <?php if ($description): ?>
            <p><?php echo esc_html($description); ?></p>
        <?php endif; ?>
    </div>
    
    <form id="<?php echo esc_attr($form_id); ?>" class="email-signup-form" method="post" action="#">
        <?php wp_nonce_field('toosensitive_email_signup', 'email_signup_nonce'); ?>
        
        <div class="form-group">
            <label for="<?php echo esc_attr($form_id); ?>-email" class="sr-only">
                Email address
            </label>
            <input 
                type="email" 
                id="<?php echo esc_attr($form_id); ?>-email"
                name="email" 
                placeholder="<?php echo esc_attr($placeholder); ?>" 
                required 
                class="email-input"
                autocomplete="email"
            >
        </div>
        
        <div class="form-group">
            <button type="submit" class="btn btn-primary">
                <?php echo esc_html($button_text); ?>
            </button>
        </div>
        
        <div class="privacy-info">
            <p><small>
                We respect your privacy. No spam, unsubscribe at any time. 
                <a href="<?php echo home_url('/privacy-policy'); ?>">Privacy Policy</a>
            </small></p>
        </div>
    </form>
    
    <div class="signup-benefits">
        <p><small><strong>You'll receive:</strong></small></p>
        <ul>
            <li>Weekly coping strategies</li>
            <li>Latest RSD research</li>
            <li>Community stories</li>
            <li>Early access to our app</li>
        </ul>
    </div>
</div>

<style>
.email-signup-widget {
    background: linear-gradient(135deg, var(--light-gray) 0%, #f0f8ff 100%);
    border: 2px solid var(--primary-blue);
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    margin: 2rem 0;
}

.email-signup-widget h3 {
    color: var(--primary-blue);
    margin-bottom: 1rem;
}

.email-signup-widget p {
    margin-bottom: 1.5rem;
    color: var(--warm-gray);
}

.email-signup-form {
    margin-bottom: 1.5rem;
}

.form-group {
    margin-bottom: 1rem;
}

.email-input {
    width: 100%;
    max-width: 300px;
    padding: 0.875rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.email-input:focus {
    outline: none;
    border-color: var(--primary-blue);
}

.email-input.invalid {
    border-color: var(--red-alert);
}

.privacy-info {
    margin-top: 1rem;
}

.privacy-info a {
    color: var(--primary-blue);
    text-decoration: none;
}

.privacy-info a:hover {
    text-decoration: underline;
}

.signup-benefits {
    text-align: left;
    max-width: 250px;
    margin: 0 auto;
}

.signup-benefits ul {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0;
}

.signup-benefits li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
    color: var(--warm-gray);
}

.signup-benefits li:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--success-green);
    font-weight: bold;
}

/* Success and error states */
.email-signup-form.success .email-input {
    border-color: var(--success-green);
}

.email-signup-form.error .email-input {
    border-color: var(--red-alert);
}

.form-message {
    padding: 0.75rem;
    border-radius: 6px;
    margin-top: 1rem;
    font-size: 0.875rem;
}

.form-message.success {
    background: #f0fff4;
    color: var(--success-green);
    border: 1px solid var(--success-green);
}

.form-message.error {
    background: #fef5f5;
    color: var(--red-alert);
    border: 1px solid var(--red-alert);
}

/* Loading state */
.btn.loading {
    position: relative;
    color: transparent;
}

.btn.loading:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    margin: -8px 0 0 -8px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Responsive design */
@media (max-width: 480px) {
    .email-signup-widget {
        padding: 1.5rem;
    }
    
    .email-input {
        max-width: 100%;
    }
    
    .signup-benefits {
        text-align: center;
    }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    .email-signup-widget {
        background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
        border-color: var(--primary-blue);
        color: white;
    }
    
    .email-signup-widget h3 {
        color: #63b3ed;
    }
    
    .email-input {
        background: #2d3748;
        border-color: #4a5568;
        color: white;
    }
    
    .email-input::placeholder {
        color: #a0aec0;
    }
    
    .email-input:focus {
        border-color: #63b3ed;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.email-signup-form');
    
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleEmailSignup(this);
        });
    });
    
    function handleEmailSignup(form) {
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        // Clear previous messages
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Validate email
        if (!isValidEmail(email)) {
            showFormMessage(form, 'Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        button.textContent = 'Subscribing...';
        button.classList.add('loading');
        button.disabled = true;
        
        // Prepare form data
        const formData = new FormData(form);
        formData.append('action', 'email_signup');
        
        // Submit via AJAX
        fetch(toosensitive_ajax.ajaxurl, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showFormMessage(form, 'Thank you! Please check your email to confirm your subscription.', 'success');
                form.reset();
                
                // Track conversion
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'email_signup', {
                        'event_category': 'engagement',
                        'event_label': 'newsletter'
                    });
                }
            } else {
                showFormMessage(form, data.data || 'Sorry, there was an error. Please try again.', 'error');
            }
        })
        .catch(error => {
            showFormMessage(form, 'Network error. Please check your connection and try again.', 'error');
        })
        .finally(() => {
            // Reset button
            button.textContent = originalText;
            button.classList.remove('loading');
            button.disabled = false;
        });
    }
    
    function showFormMessage(form, message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        form.appendChild(messageDiv);
        
        // Add form state class
        form.classList.remove('success', 'error');
        form.classList.add(type);
        
        // Auto-remove error messages after 5 seconds
        if (type === 'error') {
            setTimeout(() => {
                messageDiv.remove();
                form.classList.remove('error');
            }, 5000);
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
</script>