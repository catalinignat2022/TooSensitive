<?php
/**
 * Template Name: Emergency Mantras
 * Template for emergency RSD mantras page
 */

get_header(); ?>

<style>
/* Emergency page specific styles */
.emergency-page {
    background: linear-gradient(135deg, #ed64a6 0%, #d53f8c 100%);
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
    color: #ed64a6;
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

.mantra-card {
    background: #fef5e7;
    border-radius: 15px;
    padding: 30px;
    margin-bottom: 25px;
    border-left: 5px solid #ed64a6;
    text-align: center;
}

.mantra-text {
    font-size: 1.5rem;
    color: #2d3748;
    font-weight: 600;
    line-height: 1.6;
    font-style: italic;
    margin-bottom: 15px;
}

.mantra-explanation {
    color: #4a5568;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 20px;
}

.mantra-category {
    background: #ed64a6;
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 15px;
}

.emergency-cta {
    background: #ed64a6;
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
    background: #d53f8c;
    transform: translateY(-2px);
}

.random-mantra {
    background: #f7fafc;
    border: 2px dashed #ed64a6;
    border-radius: 15px;
    padding: 30px;
    text-align: center;
    margin-bottom: 30px;
}

.random-mantra-text {
    font-size: 1.8rem;
    color: #2d3748;
    font-weight: 700;
    margin-bottom: 20px;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.back-to-toolkit {
    text-align: center;
    margin-top: 40px;
}

.back-link {
    display: inline-block;
    color: #ed64a6;
    text-decoration: none;
    font-weight: 600;
    padding: 10px 20px;
    border: 2px solid #ed64a6;
    border-radius: 25px;
    transition: all 0.3s ease;
}

.back-link:hover {
    background: #ed64a6;
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
    
    .mantra-card {
        padding: 20px;
    }
    
    .mantra-text {
        font-size: 1.3rem;
    }
    
    .random-mantra-text {
        font-size: 1.5rem;
    }
}
</style>

<div class="emergency-page">
    <div class="emergency-container">
        <div class="emergency-header">
            <div class="emergency-icon">
                <i class="fa-solid fa-heart"></i>
            </div>
            <h1 class="emergency-title">RSD Mantras</h1>
            <p class="emergency-subtitle">When your mind tells lies about your worth, speak these truths instead</p>
        </div>

        <div class="random-mantra">
            <div class="random-mantra-text" id="randomMantraText">
                Click below for a mantra you need right now
            </div>
            <button class="emergency-cta" onclick="showRandomMantra()">Give Me a Mantra</button>
        </div>

        <div class="mantra-card">
            <div class="mantra-category">Immediate Relief</div>
            <div class="mantra-text">"This feeling will pass. It always does."</div>
            <div class="mantra-explanation">
                RSD episodes feel eternal, but they are temporary. This mantra reminds you that the intensity will decrease.
            </div>
        </div>

        <div class="mantra-card">
            <div class="mantra-category">Self-Worth</div>
            <div class="mantra-text">"I am enough, exactly as I am."</div>
            <div class="mantra-explanation">
                RSD often makes us feel fundamentally flawed. This affirms your inherent worth, independent of others' reactions.
            </div>
        </div>

        <div class="mantra-card">
            <div class="mantra-category">Emotional Regulation</div>
            <div class="mantra-text">"I am not my emotions. I am experiencing them."</div>
            <div class="mantra-explanation">
                Creates distance between you and the overwhelming emotions, helping you remember they don't define you.
            </div>
        </div>

        <div class="mantra-card">
            <div class="mantra-category">Reality Check</div>
            <div class="mantra-text">"My brain is protecting me, but I am safe."</div>
            <div class="mantra-explanation">
                Acknowledges that RSD is your brain's way of protecting you from rejection, while affirming current safety.
            </div>
        </div>

        <div class="mantra-card">
            <div class="mantra-category">Self-Compassion</div>
            <div class="mantra-text">"I would comfort a friend feeling this. I deserve the same kindness."</div>
            <div class="mantra-explanation">
                Helps you treat yourself with the same compassion you'd show others, breaking the cycle of self-criticism.
            </div>
        </div>

        <div class="mantra-card">
            <div class="mantra-category">Perspective</div>
            <div class="mantra-text">"Their reaction is about them, not about my worth."</div>
            <div class="mantra-explanation">
                Reminds you that others' responses reflect their own state, not your value as a person.
            </div>
        </div>

        <div class="mantra-card">
            <div class="mantra-category">Grounding</div>
            <div class="mantra-text">"I am here. I am breathing. I am alive."</div>
            <div class="mantra-explanation">
                Brings you back to the present moment and the fundamental fact of your existence and safety.
            </div>
        </div>

        <div class="back-to-toolkit">
            <a href="/#emergency-toolkit" class="back-link">← Back to Emergency Toolkit</a>
        </div>
    </div>
</div>

<script>
const mantras = [
    "This feeling will pass. It always does.",
    "I am enough, exactly as I am.",
    "I am not my emotions. I am experiencing them.",
    "My brain is protecting me, but I am safe.",
    "I would comfort a friend feeling this. I deserve the same kindness.",
    "Their reaction is about them, not about my worth.",
    "I am here. I am breathing. I am alive.",
    "I have survived difficult feelings before. I will survive this too.",
    "My sensitivity is a strength, not a weakness.",
    "I choose self-compassion over self-criticism.",
    "This moment does not define my entire worth.",
    "I am learning to trust myself and my experience.",
    "My feelings are valid, even if they feel overwhelming.",
    "I can hold space for both pain and hope.",
    "I am more resilient than I realize."
];

function showRandomMantra() {
    const randomIndex = Math.floor(Math.random() * mantras.length);
    const mantraText = document.getElementById('randomMantraText');
    
    // Add fade effect
    mantraText.style.opacity = '0';
    
    setTimeout(() => {
        mantraText.textContent = `"${mantras[randomIndex]}"`;
        mantraText.style.opacity = '1';
    }, 300);
}

// Auto-cycle mantras every 30 seconds if user wants
let autoCycle = false;
let cycleInterval;

function toggleAutoCycle() {
    autoCycle = !autoCycle;
    
    if (autoCycle) {
        cycleInterval = setInterval(showRandomMantra, 30000);
        event.target.textContent = "Stop Auto Mantras";
    } else {
        clearInterval(cycleInterval);
        event.target.textContent = "Start Auto Mantras";
    }
}
</script>

<?php get_footer(); ?>