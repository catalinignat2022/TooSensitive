/**
 * Main JavaScript for TooSensitive theme
 */

(function($) {
    'use strict';

    // DOM Ready
    $(document).ready(function() {
        initAssessment();
        initEmailSignup();
        initMobileMenu();
        initScrollEffects();
        initFormValidation();
    });

    /**
     * Assessment Form Functionality
     */
    function initAssessment() {
        const assessmentForm = $('#rsd-assessment');
        
        if (assessmentForm.length) {
            assessmentForm.on('submit', function(e) {
                e.preventDefault();
                handleAssessmentSubmission(this);
            });
        }
    }

    function handleAssessmentSubmission(form) {
        const formData = new FormData(form);
        const submitButton = $(form).find('button[type="submit"]');
        const originalText = submitButton.text();
        
        // Show loading state
        submitButton.text('Calculating Results...').prop('disabled', true);
        
        // Add AJAX action
        formData.append('action', 'rsd_assessment');
        
        $.ajax({
            url: toosensitive_ajax.ajaxurl,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                if (response.success) {
                    showAssessmentResults(response.data);
                } else {
                    showError('Sorry, there was an error processing your assessment. Please try again.');
                }
            },
            error: function() {
                showError('Network error. Please check your connection and try again.');
            },
            complete: function() {
                submitButton.text(originalText).prop('disabled', false);
            }
        });
    }

    function showAssessmentResults(data) {
        const resultsSection = $('#assessment-results');
        const formSection = $('#assessment-form');
        
        // Hide form and show results
        formSection.fadeOut(500, function() {
            populateResults(data);
            resultsSection.fadeIn(500);
            
            // Scroll to results
            $('html, body').animate({
                scrollTop: resultsSection.offset().top - 100
            }, 500);
        });
    }

    function populateResults(data) {
        const resultContent = `
            <div class="result-header text-center">
                <h2>${data.message.title}</h2>
                <div class="score-display">
                    <span class="score-number">${data.score}</span>
                    <span class="score-label">out of 40</span>
                </div>
            </div>
            
            <div class="result-description">
                <p>${data.message.description}</p>
            </div>
        `;
        
        const recommendations = data.message.recommendations.map(rec => 
            `<li>${rec}</li>`
        ).join('');
        
        $('.results-content').html(resultContent);
        $('.recommendations').html(`<ul>${recommendations}</ul>`);
        
        // Add appropriate styling based on category
        const resultColors = {
            'low': 'var(--success-green)',
            'moderate': 'var(--accent-purple)',
            'high': 'var(--primary-blue)'
        };
        
        $('.score-number').css('color', resultColors[data.category]);
    }

    /**
     * Email Signup Functionality
     */
    function initEmailSignup() {
        $('.email-form, .footer-newsletter').on('submit', function(e) {
            e.preventDefault();
            handleEmailSignup(this);
        });
    }

    function handleEmailSignup(form) {
        const email = $(form).find('input[type="email"]').val();
        const button = $(form).find('button[type="submit"]');
        const originalText = button.text();
        
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        button.text('Subscribing...').prop('disabled', true);
        
        // Simulate API call - replace with actual implementation
        setTimeout(function() {
            // Success state
            button.text('Subscribed!').css('background-color', 'var(--success-green)');
            $(form).find('input[type="email"]').val('');
            
            // Show success message
            showSuccess('Thank you! Check your email for a welcome message.');
            
            // Reset button after 3 seconds
            setTimeout(function() {
                button.text(originalText).prop('disabled', false).css('background-color', '');
            }, 3000);
        }, 1000);
    }

    /**
     * Mobile Menu
     */
    function initMobileMenu() {
        const mobileToggle = $('.mobile-menu-toggle');
        const nav = $('.main-nav');
        
        mobileToggle.on('click', function() {
            const isExpanded = $(this).attr('aria-expanded') === 'true';
            $(this).attr('aria-expanded', !isExpanded);
            nav.toggleClass('mobile-menu-open');
            $('body').toggleClass('mobile-menu-active');
        });
        
        // Close menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.main-nav, .mobile-menu-toggle').length) {
                nav.removeClass('mobile-menu-open');
                mobileToggle.attr('aria-expanded', 'false');
                $('body').removeClass('mobile-menu-active');
            }
        });
    }

    /**
     * Scroll Effects
     */
    function initScrollEffects() {
        // Back to top button
        const backToTop = $('#back-to-top');
        
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 300) {
                backToTop.fadeIn();
            } else {
                backToTop.fadeOut();
            }
        });
        
        backToTop.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 500);
        });
        
        // Fade in animations
        if (window.IntersectionObserver) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-up');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            $('.card, .hero-content').each(function() {
                observer.observe(this);
            });
        }
    }

    /**
     * Form Validation
     */
    function initFormValidation() {
        // Real-time email validation
        $('input[type="email"]').on('blur', function() {
            const email = $(this).val();
            const isValid = isValidEmail(email);
            
            $(this).toggleClass('invalid', !isValid && email.length > 0);
        });
        
        // Assessment form validation
        $('#rsd-assessment').on('submit', function(e) {
            const unansweredQuestions = [];
            
            for (let i = 1; i <= 10; i++) {
                if (!$(`input[name="question_${i}"]:checked`).length) {
                    unansweredQuestions.push(i);
                }
            }
            
            if (unansweredQuestions.length > 0) {
                e.preventDefault();
                showError(`Please answer all questions. Missing: ${unansweredQuestions.join(', ')}`);
                
                // Scroll to first unanswered question
                const firstUnanswered = $(`.question:nth-child(${unansweredQuestions[0]})`);
                $('html, body').animate({
                    scrollTop: firstUnanswered.offset().top - 100
                }, 500);
            }
        });
    }

    /**
     * Utility Functions
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(message) {
        showNotification(message, 'error');
    }

    function showSuccess(message) {
        showNotification(message, 'success');
    }

    function showNotification(message, type) {
        // Remove existing notifications
        $('.notification').remove();
        
        const notification = $(`
            <div class="notification notification-${type}">
                <div class="notification-content">
                    <span class="notification-message">${message}</span>
                    <button class="notification-close" aria-label="Close notification">&times;</button>
                </div>
            </div>
        `);
        
        $('body').append(notification);
        
        // Show notification
        setTimeout(() => notification.addClass('show'), 100);
        
        // Auto-hide after 5 seconds
        setTimeout(() => hideNotification(notification), 5000);
        
        // Manual close
        notification.find('.notification-close').on('click', () => hideNotification(notification));
    }

    function hideNotification(notification) {
        notification.removeClass('show');
        setTimeout(() => notification.remove(), 300);
    }

    /**
     * Progress Tracking
     */
    function trackAssessmentProgress() {
        let answeredQuestions = 0;
        const totalQuestions = 10;
        
        $('input[type="radio"]').on('change', function() {
            // Count answered questions
            answeredQuestions = 0;
            for (let i = 1; i <= totalQuestions; i++) {
                if ($(`input[name="question_${i}"]:checked`).length) {
                    answeredQuestions++;
                }
            }
            
            // Update progress indicator
            const progress = (answeredQuestions / totalQuestions) * 100;
            updateProgressBar(progress);
            
            // Enable submit button when all questions answered
            const submitButton = $('#rsd-assessment button[type="submit"]');
            if (answeredQuestions === totalQuestions) {
                submitButton.removeClass('disabled').prop('disabled', false);
            } else {
                submitButton.addClass('disabled').prop('disabled', true);
            }
        });
    }

    function updateProgressBar(progress) {
        let progressBar = $('.assessment-progress');
        
        if (!progressBar.length) {
            progressBar = $(`
                <div class="assessment-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <span class="progress-text">0 of 10 questions answered</span>
                </div>
            `);
            
            $('#rsd-assessment').prepend(progressBar);
        }
        
        const answeredQuestions = Math.round(progress / 10);
        progressBar.find('.progress-fill').css('width', progress + '%');
        progressBar.find('.progress-text').text(`${answeredQuestions} of 10 questions answered`);
    }

    // Initialize progress tracking
    $(document).ready(function() {
        if ($('#rsd-assessment').length) {
            trackAssessmentProgress();
        }
    });

})(jQuery);