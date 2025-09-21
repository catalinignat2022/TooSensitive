<?php
/**
 * Template Name: Emergency Breathing
 * Template for emergency breathing techniques page
 */

get_header(); ?>

<style>
/* Emergency page specific styles */
.emergency-page {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px 0;
}

.emergency-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.1);
}

.emergency-header {
    text-align: center;
    margin-bottom: 40px;
}

.emergency-icon {
    font-size: 4rem;
    color: #667eea;
    margin-bottom: 20px;
}

.emergency-title {
    color: #2d3748;
    font-size: 2.5rem;
    margin-bottom: 15px;
    font-weight: 700;
}

.emergency-subtitle {
    color: #4a5568;
    font-size: 1.2rem;
    line-height: 1.6;
}

.technique-card {
    background: #f7fafc;
    border-radius: 15px;
    padding: 30px;
    margin-bottom: 25px;
    border-left: 5px solid #667eea;
}

.technique-title {
    color: #2d3748;
    font-size: 1.5rem;
    margin-bottom: 15px;
    font-weight: 600;
}

.technique-steps {
    list-style: none;
    padding: 0;
}

.technique-steps li {
    background: white;
    padding: 15px 20px;
    margin-bottom: 10px;
    border-radius: 10px;
    border-left: 3px solid #667eea;
    font-size: 1.1rem;
    line-height: 1.6;
}

.emergency-cta {
    background: #667eea;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    margin: 10px;
    transition: all 0.3s ease;
}

.emergency-cta:hover {
    background: #5a67d8;
    transform: translateY(-2px);
}

.back-to-toolkit {
    text-align: center;
    margin-top: 40px;
}

.back-link {
    display: inline-block;
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    padding: 10px 20px;
    border: 2px solid #667eea;
    border-radius: 25px;
    transition: all 0.3s ease;
}

.back-link:hover {
    background: #667eea;
    color: white;
}

@media (max-width: 768px) {
    .emergency-container {
        margin: 10px;
        padding: 20px;
    }
    
    .emergency-title {
        font-size: 2rem;
    }
    
    .technique-card {
        padding: 20px;
    }
}
</style>

<div class="emergency-page">
    <div class="emergency-container">
        <div class="emergency-header">
            <div class="emergency-icon">
                <i class="fa-solid fa-lungs"></i>
            </div>
            <h1 class="emergency-title">Breathing Rescue</h1>
            <p class="emergency-subtitle">When panic steals your breath, these techniques bring you back to life</p>
        </div>

        <div class="technique-card">
            <h2 class="technique-title">4-7-8 Breathing (Sleep & Calm)</h2>
            <ul class="technique-steps">
                <li><strong>Inhale</strong> through your nose for <strong>4 counts</strong></li>
                <li><strong>Hold</strong> your breath for <strong>7 counts</strong></li>
                <li><strong>Exhale</strong> through your mouth for <strong>8 counts</strong></li>
                <li><strong>Repeat</strong> 4 times, then breathe normally</li>
            </ul>
            <button class="emergency-cta" onclick="startBreathingTimer(4, 7, 8)">Start 4-7-8 Breathing</button>
        </div>

        <div class="technique-card">
            <h2 class="technique-title">Box Breathing (Focus & Control)</h2>
            <ul class="technique-steps">
                <li><strong>Inhale</strong> for <strong>4 counts</strong></li>
                <li><strong>Hold</strong> for <strong>4 counts</strong></li>
                <li><strong>Exhale</strong> for <strong>4 counts</strong></li>
                <li><strong>Hold empty</strong> for <strong>4 counts</strong></li>
            </ul>
            <button class="emergency-cta" onclick="startBreathingTimer(4, 4, 4, 4)">Start Box Breathing</button>
        </div>

        <div class="technique-card">
            <h2 class="technique-title">Triangle Breathing (Quick Reset)</h2>
            <ul class="technique-steps">
                <li><strong>Inhale</strong> for <strong>3 counts</strong></li>
                <li><strong>Hold</strong> for <strong>3 counts</strong></li>
                <li><strong>Exhale</strong> for <strong>3 counts</strong></li>
                <li><strong>Repeat</strong> until you feel calmer</li>
            </ul>
            <button class="emergency-cta" onclick="startBreathingTimer(3, 3, 3)">Start Triangle Breathing</button>
        </div>

        <div class="back-to-toolkit">
            <a href="/#emergency-toolkit" class="back-link">← Back to Emergency Toolkit</a>
        </div>
    </div>
</div>

<script>
function startBreathingTimer(inhale, hold1, exhale, hold2 = 0) {
    // Simple breathing timer implementation
    let phase = 0; // 0: inhale, 1: hold1, 2: exhale, 3: hold2
    let count = 0;
    let phases = [inhale, hold1, exhale];
    let phaseNames = ['Breathe In', 'Hold', 'Breathe Out'];
    
    if (hold2 > 0) {
        phases.push(hold2);
        phaseNames.push('Hold Empty');
    }
    
    function updateDisplay() {
        const button = event.target;
        button.innerHTML = phaseNames[phase] + ' (' + (phases[phase] - count) + ')';
        
        count++;
        if (count > phases[phase]) {
            phase = (phase + 1) % phases.length;
            count = 0;
        }
    }
    
    const interval = setInterval(updateDisplay, 1000);
    
    // Stop after 2 minutes
    setTimeout(() => {
        clearInterval(interval);
        event.target.innerHTML = 'Start Again';
    }, 120000);
}
</script>

<?php get_footer(); ?>