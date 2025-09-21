(function(){
  const questions = [
    "I react intensely to criticism or perceived rejection.",
    "I find myself ruminating about social interactions for hours or days.",
    "Fear of being judged or rejected stops me from speaking up.",
    "Small slights feel like major betrayals to me.",
    "I avoid situations where I might be criticized.",
    "I feel physical pain (e.g., chest tightness, nausea) when I think I failed someone.",
    "Positive feedback doesn\'t erase how much negative feedback hurts.",
    "I sometimes lash out or withdraw after feeling hurt by someone\'s words.",
    "My emotional reactions interfere with my relationships or work.",
    "I rarely tell others how much criticism affects me because I\'m embarrassed."
  ];

  const labels = ["Never","Rarely","Sometimes","Often","Almost Always"];
  const startBtn = document.getElementById('start-assessment');
  const startPanel = document.getElementById('assessment-start');
  const form = document.getElementById('assessment-form');
  const qContainer = document.getElementById('question-container');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const resultsEl = document.getElementById('assessment-results');

  let answers = new Array(questions.length).fill(null);
  let index = 0;

  function renderQuestion(i){
    qContainer.innerHTML = '';
    const q = document.createElement('div');
    q.className = 'question';
    q.setAttribute('data-index', i);

    const h = document.createElement('h2');
    h.textContent = `Question ${i+1} of ${questions.length}`;
    q.appendChild(h);

    const p = document.createElement('p');
    p.className = 'question-text';
    p.textContent = questions[i];
    q.appendChild(p);

    const choices = document.createElement('div');
    choices.className = 'choices';

    labels.forEach((label, idx)=>{
      const id = `q${i}-c${idx}`;
      const wrapper = document.createElement('label');
      wrapper.className = 'choice';
      wrapper.setAttribute('for', id);

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${i}`;
      input.id = id;
      input.value = idx; // 0..4
      input.checked = (answers[i] === idx);
      input.addEventListener('change', ()=>{
        answers[i] = idx;
        // enable next when answered
        updateNav();
      });

      const span = document.createElement('span');
      span.textContent = label;

      wrapper.appendChild(input);
      wrapper.appendChild(span);
      choices.appendChild(wrapper);
    });

    q.appendChild(choices);
    qContainer.appendChild(q);
    updateNav();
  }

  function updateNav(){
    prevBtn.disabled = index === 0;
    // Next enabled only when current answered
    nextBtn.disabled = (answers[index] === null);
    // change next text to Submit on last
    nextBtn.textContent = (index === questions.length -1) ? 'Submit' : 'Next';
  }

  function showResults(){
    const total = answers.reduce((acc, v)=> acc + (v===null?0:v), 0);
    // Normalize: labels 0..4 -> weights 0..4
    const pct = Math.round((total / (questions.length * 4)) * 100);

    let message = '';
    if(pct >= 75){
      message = `<h2>High likelihood of RSD-related reactivity</h2><p>Your answers suggest that rejection sensitivity frequently impacts you. This can explain intense emotional pain after criticism or perceived rejection. Consider professional support, peer groups, and immediate techniques below.</p>`;
    } else if(pct >= 45){
      message = `<h2>Moderate signs of rejection sensitivity</h2><p>You show several patterns consistent with RSD. Learning targeted coping strategies and tracking triggers can help reduce the intensity of reactions.</p>`;
    } else {
      message = `<h2>Low to mild signs</h2><p>Your results show fewer patterns associated with RSD, but if specific situations cause intense distress, targeted strategies may still help.</p>`;
    }

    message += `<div class="result-actions">
        <button class="button is-primary start-technique" data-steps='[{"label":"Inhale","secs":4},{"label":"Hold","secs":7},{"label":"Exhale","secs":8}]' style="background: #5EAAA8; color: white; padding: 12px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; margin-right: 10px;">🌬️ Start 4-7-8 breathing</button> 
        <a class="button" href="/education" style="padding: 12px 20px; border: 1px solid #4d7a79; color: #4d7a79; text-decoration: none; border-radius: 5px; font-size: 14px;">Learn about RSD</a>
    </div>`;

    message += `<h3>Resources</h3><ul><li>Immediate: 4-7-8 breathing, grounding by naming 5 things, push-cold-water trick (if safe)</li><li>Daily: journaling triggers, pre-planned responses to criticism</li><li>When to seek help: if emotions disrupt work or relationships, consider therapy focusing on emotional regulation and ADHD-informed approaches</li></ul>`;

    resultsEl.innerHTML = message;
    form.style.display = 'none';
    form.setAttribute('aria-hidden','true');
    resultsEl.style.display = 'block';
    resultsEl.setAttribute('aria-hidden','false');

    // scroll into view
    resultsEl.scrollIntoView({behavior:'smooth'});
  }

  // Event bindings
  startBtn && startBtn.addEventListener('click', ()=>{
    startPanel.style.display = 'none';
    startPanel.setAttribute('aria-hidden','true');
    form.style.display = 'block';
    form.setAttribute('aria-hidden','false');
    renderQuestion(index);
  });

  prevBtn && prevBtn.addEventListener('click', ()=>{
    if(index > 0){ index--; renderQuestion(index); }
  });

  nextBtn && nextBtn.addEventListener('click', ()=>{
    if(index < questions.length -1){ index++; renderQuestion(index); }
    else { // submit
      // ensure all answered; if not, treat unanswered as 0
      showResults();
    }
  });

  // keyboard accessibility: left/right
  document.addEventListener('keydown', (e)=>{
    if(document.getElementById('assessment-form').style.display === 'block'){
      if(e.key === 'ArrowLeft') prevBtn.click();
      if(e.key === 'ArrowRight') nextBtn.click();
    }
  });

  // Progressive enhancement: attach start-technique handlers (assumes global TechniqueRunner exists)
  document.addEventListener('click', (e)=>{
    const t = e.target.closest('.start-technique');
    if(!t) return;
    e.preventDefault();
    // If the global runner exists, start from data-steps JSON
    try{
      const stepsAttr = t.getAttribute('data-steps');
      const steps = stepsAttr ? JSON.parse(stepsAttr) : [{label:'Inhale',secs:4},{label:'Hold',secs:7},{label:'Exhale',secs:8}];
      if(window.TechniqueRunner){
        const runner = new window.TechniqueRunner({btn:t, title:'4-7-8 Breathing',steps:steps});
        runner.open(); // CORRECTAT: folosește open() în loc de startRound()
      } else if(window.startBreathingTimer){
        window.startBreathingTimer(4,7,8);
      } else {
        alert('Start breathing: 4-7-8 (inhale 4s, hold 7s, exhale 8s)');
      }
    }catch(err){
      console.error('Could not start technique',err);
    }
  });

})();
