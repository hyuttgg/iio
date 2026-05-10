// ===== SPIDER CLOCK — HALLOWEEN EDITION =====
// Hour hand  = thick purple segmented spider leg (SVG)
// Minute hand = slender green segmented spider leg (SVG)
// Second hand = glowing silk thread

(function () {
    'use strict';

    // ===== DOM ELEMENTS =====
    const hourHand    = document.getElementById('hourHand');
    const minuteHand  = document.getElementById('minuteHand');
    const secondHand  = document.getElementById('secondHand');
    const digitalTime = document.getElementById('digitalTime');
    const dateDisplay = document.getElementById('dateDisplay');
    const spookyQuote = document.getElementById('spookyQuote');
    const clockEl     = document.getElementById('clock');
    const eyeLeft     = document.getElementById('eyeLeft');
    const eyeRight    = document.getElementById('eyeRight');
    const markersContainer    = document.getElementById('markers');
    const particlesContainer  = document.getElementById('particles');
    const spiderWebSVG        = document.getElementById('spiderWeb');

    // ===== AUDIO =====
    const spiderAudio = new Audio('soulprodmusic-astral-creepy-dark-logo-254198.mp3');
    spiderAudio.preload = 'auto';

    function playSpiderSound() {
        spiderAudio.currentTime = 0;
        spiderAudio.play().catch(() => {
            // Autoplay policy: silently ignore if blocked
        });
    }

    // ===== SPOOKY QUOTES =====
    const quotes = [
        '"Come into my parlor," said the spider...',
        '"The spider\'s web is its clock of patience."',
        '"Every second spins a new thread of fate."',
        '"In the web of time, all are caught."',
        '"Tick... tock... the spider watches."',
        '"Midnight approaches... the web tightens."',
        '"Beware the hour when spiders dance."',
        '"Time flies, but the spider waits."',
        '"Eight legs, twelve hours, infinite dread."',
        '"The clock strikes fear at the witching hour."',
    ];

    // ===== CLOCK MARKERS =====
    function createMarkers() {
        const radius = clockEl.getBoundingClientRect().width / 2;

        for (let i = 0; i < 60; i++) {
            const angle   = (i * 6 - 90) * (Math.PI / 180);
            const isHour  = i % 5 === 0;
            const hourNum = i === 0 ? 12 : i / 5;

            // Tick mark
            const markerDist = radius - (isHour ? 32 : 20);
            const x = Math.cos(angle) * markerDist;
            const y = Math.sin(angle) * markerDist;

            const marker = document.createElement('div');
            marker.className = `marker ${isHour ? 'marker-major' : 'marker-minor'}`;
            marker.style.position = 'absolute';
            marker.style.left = '50%';
            marker.style.top  = '50%';
            marker.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

            const line = document.createElement('div');
            line.className = 'marker-line';
            line.style.transform = `translate(-50%, 0) rotate(${i * 6}deg)`;
            marker.appendChild(line);
            markersContainer.appendChild(marker);

            // Hour numbers
            if (isHour) {
                const numDist = radius - 58;
                const nx = Math.cos(angle) * numDist;
                const ny = Math.sin(angle) * numDist;

                const num = document.createElement('div');
                num.className = 'marker-number';
                num.textContent = hourNum;
                num.style.position  = 'absolute';
                num.style.left      = '50%';
                num.style.top       = '50%';
                num.style.transform = `translate(calc(-50% + ${nx}px), calc(-50% + ${ny}px))`;
                markersContainer.appendChild(num);
            }
        }
    }

    // ===== SPIDER WEB SVG =====
    function createSpiderWeb() {
        const cx = 250, cy = 250;
        const rings  = 9;
        const spokes = 18;
        const maxR   = 245;
        let html = '';

        // Spokes
        for (let i = 0; i < spokes; i++) {
            const angle = (i * 360 / spokes) * (Math.PI / 180);
            const ex = cx + Math.cos(angle) * maxR;
            const ey = cy + Math.sin(angle) * maxR;
            html += `<line x1="${cx}" y1="${cy}" x2="${ex.toFixed(2)}" y2="${ey.toFixed(2)}"
                stroke="rgba(255,255,255,0.07)" stroke-width="0.6"/>`;
        }

        // Rings
        for (let r = 1; r <= rings; r++) {
            const rad = (maxR / rings) * r;
            let d = '';
            for (let i = 0; i <= spokes; i++) {
                const angle = (i * 360 / spokes) * (Math.PI / 180);
                const wobble = Math.sin(i * 1.4 + r * 0.7) * (rad * 0.07);
                const px = cx + Math.cos(angle) * (rad + wobble);
                const py = cy + Math.sin(angle) * (rad + wobble);
                if (i === 0) {
                    d += `M ${px.toFixed(1)} ${py.toFixed(1)} `;
                } else {
                    const prev  = ((i - 1) * 360 / spokes) * (Math.PI / 180);
                    const mid   = (prev + angle) / 2;
                    const cpR   = rad + wobble + Math.sin(i * 2.1) * 5;
                    const cpx   = cx + Math.cos(mid) * cpR;
                    const cpy   = cy + Math.sin(mid) * cpR;
                    d += `Q ${cpx.toFixed(1)} ${cpy.toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)} `;
                }
            }
            html += `<path d="${d}" fill="none"
                stroke="rgba(255,255,255,${(0.025 + r * 0.009).toFixed(3)})" stroke-width="0.5"/>`;
        }

        spiderWebSVG.innerHTML = html;
    }

    // ===== PARTICLES =====
    function createParticles() {
        const colors = [
            'rgba(155, 48, 255, 0.65)',
            'rgba(255, 106, 0, 0.45)',
            'rgba(139, 0, 0, 0.55)',
            'rgba(57, 255, 20, 0.3)',
            'rgba(200, 80, 255, 0.4)',
        ];

        for (let i = 0; i < 22; i++) {
            const p    = document.createElement('div');
            p.className = 'particle';
            const size  = Math.random() * 4.5 + 1;
            const color = colors[Math.floor(Math.random() * colors.length)];
            p.style.width             = size + 'px';
            p.style.height            = size + 'px';
            p.style.left              = Math.random() * 100 + '%';
            p.style.animationDuration = (Math.random() * 16 + 10) + 's';
            p.style.animationDelay    = (Math.random() * 16) + 's';
            p.style.background        = `radial-gradient(circle, ${color}, transparent)`;
            particlesContainer.appendChild(p);
        }
    }

    // ===== DECORATIVE LEGS =====
    function createDecoLegs() {
        const container = document.getElementById('decoLegs');
        // 8 legs in spider-like angular positions
        const legAngles = [20, 50, 130, 160, 200, 230, 310, 340];

        legAngles.forEach((angle, i) => {
            const leg = document.createElement('div');
            leg.className = 'deco-leg';
            leg.style.setProperty('--ba', angle + 'deg');

            const inner = document.createElement('div');
            inner.className = 'deco-leg-inner';

            for (let s = 1; s <= 3; s++) {
                const seg = document.createElement('div');
                seg.className = `deco-seg s${s}`;
                inner.appendChild(seg);
            }

            leg.appendChild(inner);
            container.appendChild(leg);

            // Staggered twitching animation
            leg.style.animation =
                `legTwitch ${2.2 + Math.random() * 1.8}s ease-in-out ${Math.random() * 2}s infinite`;
        });

        // Inject keyframes using CSS variable for base angle
        const style = document.createElement('style');
        style.textContent = `
            .deco-leg {
                transform: rotate(var(--ba));
            }
            @keyframes legTwitch {
                0%, 100% { transform: rotate(var(--ba)); }
                50%       { transform: rotate(calc(var(--ba) + 3deg)); }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== UPDATE CLOCK =====
    function updateClock() {
        const now  = new Date();
        const hrs  = now.getHours() % 12;
        const mins = now.getMinutes();
        const secs = now.getSeconds();
        const ms   = now.getMilliseconds();

        // Smooth angles — second ticks in discrete steps (real clock feel)
        const secAngle  = secs * 6;
        const minAngle  = (mins + secs / 60) * 6;
        const hourAngle = (hrs  + mins / 60) * 30;

        secondHand.style.transform = `rotate(${secAngle}deg)`;
        minuteHand.style.transform = `rotate(${minAngle}deg)`;
        hourHand.style.transform   = `rotate(${hourAngle}deg)`;

        // Digital clock
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(mins).padStart(2, '0');
        const ss = String(secs).padStart(2, '0');
        digitalTime.textContent = `${hh}:${mm}:${ss}`;

        // Date
        dateDisplay.textContent = now
            .toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            .toUpperCase();

        requestAnimationFrame(updateClock);
    }

    // ===== SPIDER EYES FOLLOW CURSOR =====
    function initEyeTracking() {
        document.addEventListener('mousemove', (e) => {
            document.querySelectorAll('.spider-eye .pupil').forEach(pupil => {
                const rect = pupil.parentElement.getBoundingClientRect();
                const ecx  = rect.left + rect.width  / 2;
                const ecy  = rect.top  + rect.height / 2;
                const dx   = e.clientX - ecx;
                const dy   = e.clientY - ecy;
                const ang  = Math.atan2(dy, dx);
                const dist = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.022, 2.8);
                pupil.style.transform = `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px)`;
            });
        });

        // Periodic eye glow flare
        setInterval(() => {
            [eyeLeft, eyeRight].forEach(eye => {
                eye.style.boxShadow = '0 0 22px rgba(57,255,20,0.95), 0 0 44px rgba(57,255,20,0.7)';
                setTimeout(() => { eye.style.boxShadow = ''; }, 350);
            });
        }, 4500);
    }

    // ===== ROTATING QUOTES =====
    function initQuotes() {
        let qi = 0;
        setInterval(() => {
            spookyQuote.style.opacity = '0';
            setTimeout(() => {
                qi = (qi + 1) % quotes.length;
                spookyQuote.textContent = quotes[qi];
                spookyQuote.style.opacity = '';
            }, 500);
        }, 9000);
    }

    // ===== CLICK INTERACTIONS =====
    function initInteractions() {
        // Add shake + click-hint keyframes once
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spiderShake {
                0%,100% { transform: translate(0,0) rotate(0deg); }
                10%  { transform: translate(-2px,-1px) rotate(-1deg); }
                20%  { transform: translate(2px,1px)   rotate(1deg); }
                30%  { transform: translate(-1px,2px)  rotate(-0.5deg); }
                40%  { transform: translate(1px,-1px)  rotate(0.5deg); }
                50%  { transform: translate(-2px,1px)  rotate(-1deg); }
                60%  { transform: translate(2px,-1px)  rotate(1deg); }
                70%  { transform: translate(-1px,-2px) rotate(-0.5deg); }
                80%  { transform: translate(1px,2px)   rotate(0.5deg); }
                90%  { transform: translate(-1px,1px)  rotate(0deg); }
            }
            @keyframes spiderClickPulse {
                0%   { box-shadow: 0 0 0 0 rgba(255, 106, 0, 0.55); }
                60%  { box-shadow: 0 0 0 18px rgba(255, 106, 0, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 106, 0, 0); }
            }
            .spider-center {
                pointer-events: all !important;
                cursor: pointer;
            }
            .spider-center:hover .spider-abdomen {
                box-shadow:
                    0 0 28px rgba(255,106,0,0.45),
                    0 0 8px rgba(0,0,0,0.85),
                    inset 0 -5px 12px rgba(0,0,0,0.6);
                transition: box-shadow 0.25s ease;
            }
            .spider-body-clickable-ring {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 46px;
                height: 56px;
                border-radius: 50%;
                pointer-events: none;
                animation: spiderClickPulse 2.4s ease-out infinite;
            }
        `;
        document.head.appendChild(style);

        // Add a subtle pulse ring to hint "click me"
        const spiderCenter = document.querySelector('.spider-center');
        const pulseRing = document.createElement('div');
        pulseRing.className = 'spider-body-clickable-ring';
        spiderCenter.appendChild(pulseRing);

        // Spider body click — plays sound + visual reaction
        spiderCenter.addEventListener('click', (e) => {
            e.stopPropagation();

            // Play the creepy sound
            playSpiderSound();

            // Flash red eyes
            [eyeLeft, eyeRight].forEach(eye => {
                eye.style.background  = 'radial-gradient(circle at 30% 30%, #ff2200, #8b0000)';
                eye.style.boxShadow   = '0 0 28px rgba(255,0,0,0.9), 0 0 56px rgba(139,0,0,0.6)';
                setTimeout(() => {
                    eye.style.background = '';
                    eye.style.boxShadow  = '';
                }, 900);
            });

            // Shake the clock
            clockEl.style.animation = 'spiderShake 0.5s ease-in-out';
            setTimeout(() => { clockEl.style.animation = ''; }, 500);
        });

        // Clock face click (anywhere else) — visual only, no sound
        clockEl.addEventListener('click', (e) => {
            // Shake the clock
            clockEl.style.animation = 'spiderShake 0.5s ease-in-out';
            setTimeout(() => { clockEl.style.animation = ''; }, 500);
        });
    }

    // ===== HANGING SPIDER DESCEND =====
    function initHangingSpider() {
        const thread = document.querySelector('.spider-thread');

        function cycle() {
            const extra = 55 + Math.random() * 90;
            thread.style.height = (110 + extra) + 'px';
            setTimeout(() => { thread.style.height = '110px'; }, 4200);
            setTimeout(cycle, 12000 + Math.random() * 10000);
        }

        setTimeout(cycle, 4000);
    }

    // ===== LEGEND: HAND LABELS (tooltip-style) =====
    // Show a subtle label on first load to explain the leg hands concept
    function showHandLabels() {
        const labels = [
            { el: hourHand,   text: 'Hour Leg',   delay: 1200 },
            { el: minuteHand, text: 'Minute Leg',  delay: 1600 },
            { el: secondHand, text: 'Silk Thread', delay: 2000 },
        ];

        labels.forEach(({ el, text, delay }) => {
            const tip = document.createElement('div');
            Object.assign(tip.style, {
                position:   'absolute',
                left:       '0',
                top:        '-22px',
                fontSize:   '0.65rem',
                fontFamily: "'Creepster', cursive",
                color:      'rgba(232,213,183,0.55)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                opacity:    '0',
                transition: 'opacity 0.8s',
                letterSpacing: '2px',
            });
            tip.textContent = text;
            el.appendChild(tip);

            setTimeout(() => {
                tip.style.opacity = '1';
                setTimeout(() => {
                    tip.style.opacity = '0';
                    setTimeout(() => tip.remove(), 900);
                }, 3000);
            }, delay);
        });
    }

    // ===== INITIALIZE =====
    function init() {
        createMarkers();
        createSpiderWeb();
        createParticles();
        createDecoLegs();
        initEyeTracking();
        initQuotes();
        initInteractions();
        initHangingSpider();
        showHandLabels();
        updateClock();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
