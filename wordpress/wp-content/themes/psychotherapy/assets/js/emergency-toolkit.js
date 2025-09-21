/**
 * Emergency Toolkit Navigation
 * Makes the Emergency Toolkit cards clickable to navigate to dedicated pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find the Emergency Toolkit section
    const toolkitSection = document.querySelector('.specialized-section');
    
    if (toolkitSection) {
        // Add enhanced styling class
        toolkitSection.classList.add('emergency-toolkit-enhanced');
        
        // Get all the cards in the toolkit
        const cards = toolkitSection.querySelectorAll('.specialize-section-col01');
        
        if (cards.length >= 3) {
            const urls = [
                '/emergency-breathing-2',   // First card - Breathing Rescue
                '/emergency-grounding',   // Second card - Instant Grounding  
                '/emergency-mantras'      // Third card - RSD Mantras
            ];
            
            const labels = [
                'breathing techniques',
                'grounding techniques', 
                'RSD mantras'
            ];
            
            cards.forEach(function(card, index) {
                if (index < urls.length) {
                    // Make card clickable
                    card.style.cursor = 'pointer';
                    card.style.transition = 'all 0.3s ease';
                    
                    // Add click handler
                    card.addEventListener('click', function() {
                        window.location.href = urls[index];
                    });
                    
                    // Add hover effect
                    card.addEventListener('mouseenter', function() {
                        card.style.transform = 'translateY(-5px)';
                        card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    });
                    
                    card.addEventListener('mouseleave', function() {
                        card.style.transform = 'translateY(0)';
                        card.style.boxShadow = '';
                    });
                    
                    // Add accessibility attributes
                    card.setAttribute('role', 'button');
                    card.setAttribute('tabindex', '0');
                    card.setAttribute('aria-label', 'Access emergency ' + labels[index]);
                    
                    // Add keyboard support
                    card.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            card.click();
                        }
                    });
                    
                    // Add visual indicator
                    const indicator = document.createElement('div');
                    indicator.className = 'emergency-access-indicator';
                    indicator.innerHTML = 'Click for Immediate Access →';
                    indicator.style.cssText = `
                        position: absolute;
                        bottom: 15px;
                        right: 20px;
                        background: var(--wp--preset--color--accent, #667eea);
                        color: white;
                        padding: 5px 12px;
                        border-radius: 15px;
                        font-size: 12px;
                        font-weight: 600;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                        pointer-events: none;
                    `;
                    
                    // Make card position relative for absolute positioning
                    card.style.position = 'relative';
                    card.style.overflow = 'hidden';
                    card.appendChild(indicator);
                    
                    // Show indicator on hover
                    card.addEventListener('mouseenter', function() {
                        indicator.style.opacity = '1';
                    });
                    
                    card.addEventListener('mouseleave', function() {
                        indicator.style.opacity = '0';
                    });
                    
                    // Show indicator always on mobile
                    if (window.innerWidth <= 768) {
                        indicator.style.position = 'static';
                        indicator.style.opacity = '1';
                        indicator.style.textAlign = 'center';
                        indicator.style.marginTop = '15px';
                    }
                }
            });
        }
    }
});

// Handle window resize for mobile indicator positioning
window.addEventListener('resize', function() {
    const indicators = document.querySelectorAll('.emergency-access-indicator');
    indicators.forEach(function(indicator) {
        if (window.innerWidth <= 768) {
            indicator.style.position = 'static';
            indicator.style.opacity = '1';
            indicator.style.textAlign = 'center';
            indicator.style.marginTop = '15px';
        } else {
            indicator.style.position = 'absolute';
            indicator.style.opacity = '0';
            indicator.style.textAlign = '';
            indicator.style.marginTop = '';
        }
    });
});

/* Guided technique runner --------------------------------------------------*/
(function() {
    // Utility: parse steps stored as JSON in data-steps
    function parseSteps(btn) {
        const raw = btn.getAttribute('data-steps');
        try {
            if (raw) return JSON.parse(raw);
        } catch (e) {
            // ignore
        }

        // Fallback: parse inline onclick startBreathingTimer(...) calls used in post content
        const onclick = btn.getAttribute('onclick') || '';
        const m = onclick.match(/startBreathingTimer\(([^)]+)\)/);
        if (m) {
            const nums = m[1].split(',').map(s => parseInt(s.trim(),10)).filter(n => !isNaN(n));
            if (nums.length >= 3) {
                // typical: inhale, hold, exhale [, hold?]
                const steps = [];
                steps.push({ label: 'Inhale', secs: nums[0] });
                // if second is different, assume Hold
                if (nums[1] && nums[1] !== nums[0]) steps.push({ label: 'Hold', secs: nums[1] });
                // exhale (last of first three)
                steps.push({ label: 'Exhale', secs: nums[2] });
                // if there's a fourth value and it's not equal to exhale, add as Hold or pause
                if (nums[3] && nums[3] !== nums[2]) steps.push({ label: 'Hold', secs: nums[3] });
                return steps;
            } else if (nums.length === 2) {
                return [{ label: 'Inhale', secs: nums[0] }, { label: 'Exhale', secs: nums[1] }];
            }
        }

        return null;
    }

    // Create reusable panel (append to body)
    function createPanel() {
        if (document.getElementById('technique-panel')) return document.getElementById('technique-panel');

        const panel = document.createElement('div');
        panel.id = 'technique-panel';
        panel.className = 'technique-panel';
        panel.innerHTML = `
            <div class="technique-inner" role="dialog" aria-modal="true" aria-labelledby="technique-title">
                <button class="technique-close" aria-label="Close">✕</button>
                <h3 id="technique-title" class="technique-title"></h3>
                <div class="technique-body">
                    <div class="technique-step" aria-live="polite"></div>
                    <div class="technique-count"> </div>
                    <div class="technique-controls">
                        <button class="technique-pause">Pause</button>
                        <button class="technique-stop">Stop</button>
                        <button class="technique-repeat">Repeat</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
        return panel;
    }

    // Runner class
    function TechniqueRunner(options) {
        this.btn = options.btn;
        this.steps = options.steps || [];
        this.rounds = parseInt(options.rounds || 1, 10) || 1;
        this.currentRound = 0;
        this.currentStep = 0;
        this.remaining = 0;
        this.interval = null;
        this.panel = createPanel();
        this.isPaused = false;
        this.focusReturn = this.btn;
    }

    // Expose constructor for global fallback
    window.TechniqueRunner = TechniqueRunner;

    TechniqueRunner.prototype.open = function() {
        this.panel.classList.add('open');
        this.panel.querySelector('.technique-title').textContent = (this.btn && this.btn.getAttribute('data-label')) || (this.btn && this.btn.textContent.trim()) || 'Breathing Exercise';
        this.panel.querySelector('.technique-repeat').style.display = 'none';
        this.bindControls();
        this.startRound();
        // trap focus minimally
        const close = this.panel.querySelector('.technique-close');
        close.focus();
    };

    TechniqueRunner.prototype.bindControls = function() {
        const pause = this.panel.querySelector('.technique-pause');
        const stop = this.panel.querySelector('.technique-stop');
        const repeat = this.panel.querySelector('.technique-repeat');
        const close = this.panel.querySelector('.technique-close');
        const self = this;

        pause.onclick = function() {
            if (self.isPaused) { self.resume(); } else { self.pause(); }
        };

        stop.onclick = function() { self.stop(); };

        repeat.onclick = function() { self.repeat(); };

        close.onclick = function() { self.stop(); };
        // keyboard support for Esc
        this.panel.addEventListener('keydown', function(e){ if (e.key === 'Escape') self.stop(); });
    };

    TechniqueRunner.prototype.startRound = function() {
        this.currentRound += 1;
        this.currentStep = 0;
        this.showMessage(`Round ${this.currentRound} of ${this.rounds}`);
        this.startStep();
        window.dispatchEvent(new CustomEvent('technique.start', { detail: { technique: (this.btn && this.btn.getAttribute('data-technique')) || '', rounds: this.rounds } }));
    };

    TechniqueRunner.prototype.startStep = function() {
        if (this.currentStep >= this.steps.length) {
            if (this.currentRound >= this.rounds) return this.finish();
            return this.startRound();
        }
        const step = this.steps[this.currentStep];
        this.remaining = parseInt(step.secs || 3, 10) || 3;
        this.updateStepUI(step.label || '', this.remaining);
        this.isPaused = false;
        const self = this;
        // clear existing interval
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(function(){
            if (self.isPaused) return;
            self.remaining -= 1;
            if (self.remaining <= 0) {
                clearInterval(self.interval);
                self.currentStep += 1;
                self.startStep();
            } else {
                self.updateStepUI(step.label || '', self.remaining);
            }
        }, 1000);
    };

    TechniqueRunner.prototype.updateStepUI = function(label, secs) {
        this.panel.querySelector('.technique-step').textContent = label;
        this.panel.querySelector('.technique-count').textContent = secs + 's';
    };

    TechniqueRunner.prototype.showMessage = function(msg) {
        this.panel.querySelector('.technique-step').textContent = msg;
        this.panel.querySelector('.technique-count').textContent = '';
    };

    TechniqueRunner.prototype.pause = function() {
        this.isPaused = true;
        this.panel.querySelector('.technique-pause').textContent = 'Resume';
        window.dispatchEvent(new CustomEvent('technique.pause'));
    };

    TechniqueRunner.prototype.resume = function() {
        this.isPaused = false;
        this.panel.querySelector('.technique-pause').textContent = 'Pause';
        window.dispatchEvent(new CustomEvent('technique.resume'));
    };

    TechniqueRunner.prototype.stop = function() {
        if (this.interval) clearInterval(this.interval);
        this.panel.classList.remove('open');
        this.panel.querySelector('.technique-step').textContent = '';
        this.panel.querySelector('.technique-count').textContent = '';
        this.panel.querySelector('.technique-repeat').style.display = '';
        if (this.focusReturn) this.focusReturn.focus();
        window.dispatchEvent(new CustomEvent('technique.stop'));
    };

    TechniqueRunner.prototype.finish = function() {
        if (this.interval) clearInterval(this.interval);
        this.showMessage('Done. You can repeat or close.');
        this.panel.querySelector('.technique-repeat').style.display = '';
        window.dispatchEvent(new CustomEvent('technique.finish'));
    };

    TechniqueRunner.prototype.repeat = function() {
        this.currentRound = 0;
        this.startRound();
    };

    // Attach to all buttons with .start-technique
    function attachTechniqueButtons() {
        // Bind to both the new start-technique class and legacy emergency-cta buttons
        const buttons = document.querySelectorAll('.start-technique, .emergency-cta');
        buttons.forEach(function(btn){
            btn.addEventListener('click', function(e){
                e.preventDefault();
                // disable to avoid double start
                btn.disabled = true;
                const steps = parseSteps(btn) || [{label:'Breathe',secs:4},{label:'Hold',secs:7},{label:'Exhale',secs:8}];
                const rounds = btn.getAttribute('data-rounds') || 1;
                const runner = new TechniqueRunner({ btn: btn, steps: steps, rounds: rounds });
                runner.open();
                // re-enable when stopped (listen once)
                function enable() { btn.disabled = false; window.removeEventListener('technique.stop', enable); window.removeEventListener('technique.finish', enable); }
                window.addEventListener('technique.stop', enable); window.addEventListener('technique.finish', enable);
            });
        });
    }

    // Init on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachTechniqueButtons);
    } else {
        attachTechniqueButtons();
    }

})();

/* Global fallback for legacy inline onclick calls like startBreathingTimer(4,7,8) */
window.startBreathingTimer = function() {
    try {
        var nums = Array.prototype.slice.call(arguments).map(function(n){ return parseInt(n,10); }).filter(function(n){ return !isNaN(n); });
        if (!nums.length) return;

        // Build steps from numbers
        var steps = [];
        if (nums.length >= 3) {
            steps.push({ label: 'Inhale', secs: nums[0] });
            if (nums[1] && nums[1] !== nums[0]) steps.push({ label: 'Hold', secs: nums[1] });
            steps.push({ label: 'Exhale', secs: nums[2] });
            if (nums[3] && nums[3] !== nums[2]) steps.push({ label: 'Hold', secs: nums[3] });
        } else if (nums.length === 2) {
            steps.push({ label: 'Inhale', secs: nums[0] });
            steps.push({ label: 'Exhale', secs: nums[1] });
        } else {
            steps.push({ label: 'Breathe', secs: nums[0] || 4 });
        }

        // Try to find the initiating button: the activeElement if it's an .emergency-cta, or the first matching button
        var btn = document.activeElement && document.activeElement.classList && document.activeElement.classList.contains('emergency-cta') ? document.activeElement : null;
        if (!btn) {
            var candidates = document.querySelectorAll('.emergency-cta');
            for (var i=0;i<candidates.length;i++){
                var c = candidates[i];
                var onclick = c.getAttribute('onclick') || '';
                if (onclick.indexOf(nums.join(',')) !== -1) { btn = c; break; }
            }
        }

        // If still not found, create a synthetic button for focus-return
        var synthetic = false;
        if (!btn) {
            btn = document.createElement('button');
            synthetic = true;
        }

        var rounds = 1;
        // Build and start runner
        var runner = new (function(){})();
        // Use the same TechniqueRunner constructor if available
        if (window && window.TechniqueRunner) {
            runner = new window.TechniqueRunner({ btn: btn, steps: steps, rounds: rounds });
            runner.open();
        } else if (typeof TechniqueRunner !== 'undefined') {
            runner = new TechniqueRunner({ btn: btn, steps: steps, rounds: rounds });
            runner.open();
        } else {
            // As fallback, try clicking the button to let attachTechniqueButtons handle it
            if (btn && typeof btn.click === 'function') btn.click();
        }

        // If synthetic, remove after a short timeout
        if (synthetic) { setTimeout(function(){ try{ btn.remove(); }catch(e){} }, 5000); }
    } catch (e) {
        // swallow errors
        console.warn('startBreathingTimer fallback failed', e);
    }
};