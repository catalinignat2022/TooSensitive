<?php
/**
 * Template Name: Emergency Grounding
 * Template for emergency grounding techniques page
 */

get_header(); ?>

<style>
/* Emergency page specific styles */
.emergency-page {
    background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
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
    color: #48bb78;
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
    background: #f0fff4;
    border-radius: 15px;
    padding: 30px;
    margin-bottom: 25px;
    border-left: 5px solid #48bb78;
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
    border-left: 3px solid #48bb78;
    font-size: 1.1rem;
    line-height: 1.6;
}

.sensory-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-top: 20px;
}

.sensory-item {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    border: 2px solid #48bb78;
}

.sensory-number {
    font-size: 2rem;
    color: #48bb78;
    font-weight: bold;
}

.sensory-sense {
    color: #2d3748;
    font-weight: 600;
    margin-top: 10px;
}

.emergency-cta {
    background: #48bb78;
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
    background: #38a169;
    transform: translateY(-2px);
}

.back-to-toolkit {
    text-align: center;
    margin-top: 40px;
}

.back-link {
    display: inline-block;
    color: #48bb78;
    text-decoration: none;
    font-weight: 600;
    padding: 10px 20px;
    border: 2px solid #48bb78;
    border-radius: 25px;
    transition: all 0.3s ease;
}

.back-link:hover {
    background: #48bb78;
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
    
    .sensory-grid {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
}
</style>

<div class="emergency-page">
    <div class="emergency-container">
        <div class="emergency-header">
            <div class="emergency-icon">
                <i class="fa-solid fa-anchor"></i>
            </div>
            <h1 class="emergency-title">Instant Grounding</h1>
            <p class="emergency-subtitle">When emotions feel too big for your body, ground yourself in this moment</p>
        </div>

        <div class="technique-card">
            <h2 class="technique-title">5-4-3-2-1 Sensory Grounding</h2>
            <p style="margin-bottom: 20px; color: #4a5568;">Use your senses to anchor yourself in the present moment:</p>
            
            <div class="sensory-grid">
                <div class="sensory-item">
                    <div class="sensory-number">5</div>
                    <div class="sensory-sense">Things you can SEE</div>
                </div>
                <div class="sensory-item">
                    <div class="sensory-number">4</div>
                    <div class="sensory-sense">Things you can TOUCH</div>
                </div>
                <div class="sensory-item">
                    <div class="sensory-number">3</div>
                    <div class="sensory-sense">Things you can HEAR</div>
                </div>
                <div class="sensory-item">
                    <div class="sensory-number">2</div>
                    <div class="sensory-sense">Things you can SMELL</div>
                </div>
                <div class="sensory-item">
                    <div class="sensory-number">1</div>
                    <div class="sensory-sense">Thing you can TASTE</div>
                </div>
            </div>
            
            <button class="emergency-cta" onclick="startSensoryGuide()">Start Guided 5-4-3-2-1</button>
        </div>

        <div class="technique-card">
            <h2 class="technique-title">Physical Reset Methods</h2>
            <ul class="technique-steps">
                <li><strong>Ice water or cold object</strong> - Hold ice cubes or splash cold water on face</li>
                <li><strong>Progressive muscle relaxation</strong> - Tense and release each muscle group</li>
                <li><strong>Pressure point massage</strong> - Press firmly between thumb and index finger</li>
                <li><strong>Feet on ground</strong> - Feel your feet firmly planted, wiggle your toes</li>
            </ul>
            <button class="emergency-cta" onclick="startPhysicalReset()">Guide Me Through Reset</button>
        </div>

        <div class="technique-card">
            <h2 class="technique-title">Present Moment Anchoring</h2>
            <ul class="technique-steps">
                <li><strong>Name where you are</strong> - "I am in [location] on [day]"</li>
                <li><strong>Describe what's real</strong> - "My feet are on the floor, I am safe"</li>
                <li><strong>Count backwards</strong> - From 100 by 7s, or 50 by 3s</li>
                <li><strong>List categories</strong> - Colors, animals, foods, countries</li>
            </ul>
            <button class="emergency-cta" onclick="startAnchoring()">Start Anchoring Exercise</button>
        </div>

        <div class="back-to-toolkit">
            <a href="/#emergency-toolkit" class="back-link">← Back to Emergency Toolkit</a>
        </div>
    </div>
</div>

<script>
function startSensoryGuide() {
    const steps = [
        "Look around and name 5 things you can see. Take your time with each one.",
        "Find 4 things you can touch. Feel their texture, temperature, weight.",
        "Listen carefully and identify 3 things you can hear right now.",
        "Notice 2 things you can smell in your environment.",
        "Focus on 1 thing you can taste, even if it's just your mouth."
    ];
    
    let currentStep = 0;
    const button = event.target;
    
    function nextStep() {
        if (currentStep < steps.length) {
            button.innerHTML = steps[currentStep];
            currentStep++;
            setTimeout(nextStep, 15000); // 15 seconds per step
        } else {
            button.innerHTML = "Well done! Start Again?";
            button.onclick = startSensoryGuide;
        }
    }
    
    nextStep();
}

function startPhysicalReset() {
    const steps = [
        "Hold ice or cold water for 30 seconds. Feel the cold sensation.",
        "Tense your shoulders for 5 seconds, then release completely.",
        "Press firmly between your thumb and index finger for 10 seconds.",
        "Plant your feet firmly on the ground. Wiggle your toes."
    ];
    
    guideThroughSteps(steps, event.target);
}

function startAnchoring() {
    const steps = [
        "Say out loud: 'I am in [your location] on [today's date]'",
        "Say: 'My feet are on the floor. I am safe in this moment.'",
        "Count backwards from 50 by 3s: 50, 47, 44, 41...",
        "Name 5 colors you can see around you right now."
    ];
    
    guideThroughSteps(steps, event.target);
}

function guideThroughSteps(steps, button) {
    let currentStep = 0;
    
    function nextStep() {
        if (currentStep < steps.length) {
            button.innerHTML = steps[currentStep];
            currentStep++;
            setTimeout(nextStep, 12000); // 12 seconds per step
        } else {
            button.innerHTML = "Great job! Start Again?";
        }
    }
    
    nextStep();
}
</script>

<?php get_footer(); ?>