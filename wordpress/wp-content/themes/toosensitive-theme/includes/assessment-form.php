<?php
/**
 * RSD Assessment Form Include
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

$questions = array(
    1 => array(
        'question' => 'When someone criticizes my work or gives me feedback:',
        'options' => array(
            1 => 'I consider their input and move on relatively quickly',
            2 => 'I feel hurt for a while but eventually get over it',
            3 => 'I replay the conversation in my head for hours or days',
            4 => 'I feel devastated, like my world is falling apart'
        )
    ),
    2 => array(
        'question' => 'When I don\'t get an immediate response to a text or email:',
        'options' => array(
            1 => 'I assume they\'re busy and don\'t think much about it',
            2 => 'I wonder what they\'re doing but don\'t worry too much',
            3 => 'I start wondering if I said something wrong',
            4 => 'I convince myself they hate me or are mad at me'
        )
    ),
    3 => array(
        'question' => 'When I make a mistake in front of others:',
        'options' => array(
            1 => 'I acknowledge it, learn from it, and move on',
            2 => 'I feel embarrassed but it doesn\'t ruin my day',
            3 => 'I feel intense shame and want to hide',
            4 => 'I feel like everyone thinks I\'m incompetent or stupid'
        )
    ),
    4 => array(
        'question' => 'When someone seems disappointed in me:',
        'options' => array(
            1 => 'I try to understand their perspective and improve',
            2 => 'I feel bad but can separate their disappointment from my worth',
            3 => 'I feel guilty and replay what I could have done differently',
            4 => 'I feel crushed and like I\'m a complete failure'
        )
    ),
    5 => array(
        'question' => 'In social situations, I often worry about:',
        'options' => array(
            1 => 'Having a good time and connecting with others',
            2 => 'Whether I\'m being interesting enough',
            3 => 'Whether people really want me there',
            4 => 'Being judged, rejected, or excluded by everyone'
        )
    ),
    6 => array(
        'question' => 'When someone cancels plans with me:',
        'options' => array(
            1 => 'I\'m disappointed but understand things come up',
            2 => 'I feel let down but don\'t take it personally',
            3 => 'I wonder if they\'re avoiding me specifically',
            4 => 'I assume they don\'t actually want to spend time with me'
        )
    ),
    7 => array(
        'question' => 'People have told me I\'m "too sensitive" or need "thicker skin":',
        'options' => array(
            1 => 'Rarely or never',
            2 => 'Occasionally, usually about specific topics',
            3 => 'Frequently, across different relationships',
            4 => 'Constantly, and it makes me feel broken or wrong'
        )
    ),
    8 => array(
        'question' => 'When experiencing rejection or criticism, I sometimes feel:',
        'options' => array(
            1 => 'Mild disappointment that passes quickly',
            2 => 'Hurt feelings that take some time to heal',
            3 => 'Intense emotional pain that\'s hard to control',
            4 => 'Physical symptoms like nausea, headaches, or panic'
        )
    ),
    9 => array(
        'question' => 'I avoid certain activities or situations because:',
        'options' => array(
            1 => 'I\'m not interested in them',
            2 => 'I prefer other activities more',
            3 => 'I\'m worried about not being good enough',
            4 => 'I can\'t handle the possibility of criticism or failure'
        )
    ),
    10 => array(
        'question' => 'My emotional reactions to rejection or criticism:',
        'options' => array(
            1 => 'Are proportionate to the situation',
            2 => 'Are sometimes stronger than I\'d like',
            3 => 'Often feel too intense for the situation',
            4 => 'Are so overwhelming they interfere with my daily life'
        )
    )
);
?>

<div class="assessment-form-container">
    <form id="rsd-assessment" method="post">
        <?php wp_nonce_field('toosensitive_nonce', 'nonce'); ?>
        
        <div class="assessment-header">
            <h2>RSD Assessment</h2>
            <p>This assessment will help you understand your sensitivity to rejection and criticism. Answer honestly based on how you typically respond.</p>
            <p><strong>Note:</strong> This is not a medical diagnosis. For professional evaluation, consult a healthcare provider.</p>
        </div>

        <?php foreach ($questions as $num => $q): ?>
            <div class="question" data-question="<?php echo $num; ?>">
                <h3><?php echo $num; ?>. <?php echo esc_html($q['question']); ?></h3>
                <div class="question-options">
                    <?php foreach ($q['options'] as $value => $option): ?>
                        <label class="option">
                            <input 
                                type="radio" 
                                name="question_<?php echo $num; ?>" 
                                value="<?php echo $value; ?>"
                                required
                            >
                            <span><?php echo esc_html($option); ?></span>
                        </label>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endforeach; ?>

        <!-- Email Capture -->
        <div class="email-capture card">
            <h3>Get Your Detailed Results</h3>
            <p>Enter your email to receive your assessment results and personalized RSD resources.</p>
            <div class="email-form">
                <label for="assessment-email" class="sr-only">Email address</label>
                <input 
                    type="email" 
                    id="assessment-email"
                    name="email" 
                    placeholder="Your email address" 
                    required 
                    class="email-input"
                >
            </div>
            <p class="privacy-note">
                <small>We'll send you helpful resources based on your results. No spam, unsubscribe anytime.</small>
            </p>
        </div>

        <div class="submit-section">
            <button type="submit" class="btn btn-primary btn-large disabled" disabled>
                Get My Results
            </button>
            <p class="submit-note">
                <small>Complete all questions to see your results</small>
            </p>
        </div>
    </form>
</div>

<style>
.assessment-form-container {
    max-width: 800px;
    margin: 0 auto;
}

.assessment-header {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem;
    background: var(--light-gray);
    border-radius: 12px;
}

.assessment-header h2 {
    margin-bottom: 1rem;
    color: var(--primary-blue);
}

.assessment-header p {
    margin-bottom: 0.5rem;
}

.question {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
}

.question:hover {
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.question h3 {
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    color: var(--primary-blue);
}

.question-options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.option {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--light-gray);
    border: 2px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.option:hover {
    background: #f0f8ff;
    border-color: var(--primary-blue);
}

.option input[type="radio"] {
    margin-top: 0.25rem;
    width: 18px;
    height: 18px;
    accent-color: var(--primary-blue);
}

.option label,
.option span {
    cursor: pointer;
    flex: 1;
    line-height: 1.5;
}

.option:has(input[type="radio"]:checked) {
    background: #f0f8ff;
    border-color: var(--primary-blue);
}

.option input[type="radio"]:checked + span {
    color: var(--primary-blue);
    font-weight: 500;
}

.email-capture {
    background: linear-gradient(135deg, var(--light-gray) 0%, #f0f8ff 100%);
    border: 2px solid var(--primary-blue);
    text-align: center;
    margin: 3rem 0 2rem;
}

.email-capture h3 {
    color: var(--primary-blue);
    margin-bottom: 1rem;
}

.email-capture .email-form {
    margin: 1.5rem 0 1rem;
}

.email-capture .email-input {
    max-width: 300px;
    margin: 0 auto;
}

.privacy-note {
    color: var(--warm-gray);
    margin-top: 0.5rem;
}

.submit-section {
    text-align: center;
    margin-top: 3rem;
}

.btn-large {
    font-size: 1.25rem;
    padding: 1rem 3rem;
}

.btn.disabled {
    background: #cbd5e0;
    color: #a0aec0;
    cursor: not-allowed;
}

.btn.disabled:hover {
    background: #cbd5e0;
    transform: none;
}

.submit-note {
    margin-top: 1rem;
    color: var(--warm-gray);
}

/* Progress indicator */
.assessment-progress {
    position: sticky;
    top: 100px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
    z-index: 10;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.5rem;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-blue), var(--primary-green));
    width: 0%;
    transition: width 0.3s ease;
}

.progress-text {
    font-size: 0.875rem;
    color: var(--warm-gray);
    font-weight: 500;
}

@media (max-width: 768px) {
    .question {
        padding: 1.5rem;
    }
    
    .option {
        padding: 0.75rem;
    }
    
    .assessment-header {
        padding: 1.5rem;
    }
    
    .btn-large {
        font-size: 1rem;
        padding: 0.875rem 2rem;
    }
}
</style>