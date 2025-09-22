/**
 * Crisis Intervention Dashboard JavaScript
 * Handles crisis intervention buttons and connects to TechniqueRunner
 */

jQuery(document).ready(function($) {
    // Initialize crisis intervention functionality
    initCrisisDashboard();
    
    function initCrisisDashboard() {
        // Set up event delegation for crisis technique buttons
        $(document).on('click', '.crisis-actions .start-technique .wp-block-button__link', function(e) {
            e.preventDefault();
            
            const button = $(this);
            const crisisCard = button.closest('.service-slider-block');
            const techniqueType = getTechniqueType(crisisCard);
            
            // Add loading state
            addLoadingState(button);
            
            // Initialize and start the technique
            startCrisisTechnique(techniqueType, button);
        });
    }
    
    function getTechniqueType(crisisCard) {
        // Determine technique type based on crisis card class
        if (crisisCard.hasClass('crisis-panic')) {
            return 'breathing'; // 4-7-8 breathing
        } else if (crisisCard.hasClass('crisis-criticism')) {
            return 'grounding'; // 5-4-3-2-1 grounding
        } else if (crisisCard.hasClass('crisis-isolation')) {
            return 'compassion'; // Self-compassion
        } else if (crisisCard.hasClass('crisis-recovery')) {
            return 'reset'; // Emotional reset
        } else if (crisisCard.hasClass('crisis-relationship')) {
            return 'communication'; // RSD communication
        }
        
        return 'breathing'; // Default fallback
    }
    
    function startCrisisTechnique(techniqueType, button) {
        // Check if TechniqueRunner is available
        if (typeof TechniqueRunner === 'undefined') {
            console.error('TechniqueRunner not available');
            removeLoadingState(button);
            showError('Tehnicile de urgență nu sunt disponibile momentan.');
            return;
        }
        
        try {
            // Create technique configuration based on type
            const techniqueConfig = getTechniqueConfig(techniqueType);
            
            // Initialize TechniqueRunner with crisis-specific config
            const runner = new TechniqueRunner(button[0], techniqueConfig);
            
            // Start the technique
            runner.open();
            
            // Track crisis intervention usage
            trackCrisisIntervention(techniqueType);
            
        } catch (error) {
            console.error('Error starting crisis technique:', error);
            removeLoadingState(button);
            showError('A apărut o eroare la pornirea tehnicii. Încearcă din nou.');
        }
    }
    
    function getTechniqueConfig(techniqueType) {
        const configs = {
            breathing: {
                title: '🫁 Respirație 4-7-8 pentru Criză',
                description: 'Tehnica de respirație calmantă pentru atacurile de panică RSD',
                inhaleTime: 4000,
                holdTime: 7000,
                exhaleTime: 8000,
                cycles: 4,
                instructions: {
                    prepare: 'Găsește o poziție confortabilă și relaxează umerii.',
                    inhale: 'Inspiră prin nas timp de 4 secunde',
                    hold: 'Ține respirația 7 secunde',
                    exhale: 'Expiră prin gură 8 secunde',
                    complete: 'Excelent! Te simți mai calm acum?'
                }
            },
            grounding: {
                title: '🧘 Grounding 5-4-3-2-1',
                description: 'Tehnica de împământare pentru paralizia criticii',
                steps: [
                    'Identifică 5 lucruri pe care le poți vedea',
                    'Identifică 4 lucruri pe care le poți atinge', 
                    'Identifică 3 lucruri pe care le poți auzi',
                    'Identifică 2 lucruri pe care le poți mirosi',
                    'Identifică 1 lucru pe care îl poți gusta'
                ]
            },
            compassion: {
                title: '💝 Auto-Compasiune RSD',
                description: 'Exercițiu de auto-compasiune pentru izolarea socială',
                affirmations: [
                    'Suferința mea este validă și meritez compasiune',
                    'Nu sunt singur în această experiență',
                    'Sunt o ființă umană care merită iubire',
                    'RSD-ul nu mă definește - sunt mai mult decât asta',
                    'Pot fi îngăduitor cu mine însumi în acest moment'
                ]
            },
            reset: {
                title: '⚡ Reset Emotional Rapid',
                description: 'Tehnica de recuperare rapidă după episodul RSD',
                phases: [
                    'Recunoaște: "Am trecut prin ceva dificil"',
                    'Acceptă: "Este normal să mă simt așa"', 
                    'Reconectează: "Sunt în siguranță acum"',
                    'Reînnoiește: "Pot merge mai departe"'
                ]
            },
            communication: {
                title: '🤝 Comunicare RSD',
                description: 'Strategii pentru repararea relațiilor după un episod RSD',
                scripts: [
                    'Am trecut printr-un moment dificil și vreau să clarific...',
                    'RSD-ul mă afectează uneori, dar asta nu scuză comportamentul meu...',
                    'Îmi pare rău pentru reacția mea. Poți să mă ajuți să înțeleg...',
                    'Am nevoie de un moment să procesez. Putem vorbi mai târziu?'
                ]
            }
        };
        
        return configs[techniqueType] || configs.breathing;
    }
    
    function addLoadingState(button) {
        const originalText = button.text();
        button.data('original-text', originalText);
        button.text('⏳ Se încarcă...');
        button.prop('disabled', true);
        button.addClass('loading');
    }
    
    function removeLoadingState(button) {
        const originalText = button.data('original-text');
        if (originalText) {
            button.text(originalText);
        }
        button.prop('disabled', false);
        button.removeClass('loading');
    }
    
    function showError(message) {
        // Create error notification
        const errorDiv = $('<div class="crisis-error-notification"></div>')
            .text(message)
            .css({
                position: 'fixed',
                top: '20px',
                right: '20px',
                background: '#e74c3c',
                color: 'white',
                padding: '15px 20px',
                borderRadius: '8px',
                zIndex: 9999,
                fontSize: '14px',
                maxWidth: '300px'
            });
        
        $('body').append(errorDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            errorDiv.fadeOut(300, function() {
                $(this).remove();
            });
        }, 5000);
    }
    
    function trackCrisisIntervention(techniqueType) {
        // Track usage for analytics (optional)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'crisis_intervention_used', {
                technique_type: techniqueType,
                timestamp: new Date().toISOString()
            });
        }
        
        // Store in localStorage for user insights
        const usageData = JSON.parse(localStorage.getItem('crisis_interventions') || '[]');
        usageData.push({
            technique: techniqueType,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 50 entries
        if (usageData.length > 50) {
            usageData.shift();
        }
        
        localStorage.setItem('crisis_interventions', JSON.stringify(usageData));
    }
    
    // Add hover effects and animations
    $('.service-slider-block[class*="crisis-"]').hover(
        function() {
            $(this).addClass('crisis-card-hover');
        },
        function() {
            $(this).removeClass('crisis-card-hover');
        }
    );
    
    // Add crisis dashboard ready indicator
    $('body').addClass('crisis-dashboard-ready');
    
    console.log('🆘 Crisis Intervention Dashboard initialized successfully');
});