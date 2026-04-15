const loadingSection = document.getElementById('loading');
const commandSection = document.getElementById('command-interface');
const progressBar = document.getElementById('loading-progress');
const bootLines = document.getElementById('boot-lines');
const bootPercent = document.getElementById('boot-percent');

commandSection.style.display = 'none';

const bootSequence = [
    { text: 'naveen@portfolio:~$ ./init.sh', color: 'prompt', delay: 60 },
    { text: '', color: '', delay: 300 },
    { text: '▸ Initializing portfolio server ...', color: 'purple', delay: 0 },
    { text: '', color: '', delay: 200 },
    { text: '  [runtime]    Loading JVM ..................... ✓', color: 'green', delay: 0 },
    { text: '  [database]   Connecting to database ......... ✓', color: 'green', delay: 0 },
    { text: '  [cache]      Starting cache layer ........... ✓', color: 'green', delay: 0 },
    { text: '  [queue]      Binding message brokers ........ ✓', color: 'green', delay: 0 },
    { text: '  [api]        Mounting REST endpoints ........ ✓', color: 'green', delay: 0 },
    { text: '  [auth]       Verifying token service ........ ✓', color: 'green', delay: 0 },
    { text: '  [server]     Bootstrapping framework ........ ✓', color: 'green', delay: 0 },
    { text: '', color: '', delay: 200 },
    { text: '  [service]    Permissions engine ............. loaded', color: 'cyan', delay: 0 },
    { text: '  [service]    Messaging pipeline ............. loaded', color: 'cyan', delay: 0 },
    { text: '  [service]    Notification dispatcher ........ loaded', color: 'cyan', delay: 0 },
    { text: '  [service]    Tracking framework ............. loaded', color: 'cyan', delay: 0 },
    { text: '', color: '', delay: 200 },
    { text: '  Server ready on port 8080', color: 'gray', delay: 0 },
    { text: '  Uptime: 3+ years | Status: production', color: 'gray', delay: 0 },
    { text: '', color: '', delay: 300 },
    { text: '▸ All systems operational. Welcome.', color: 'purple', delay: 0 },
];

const colorMap = {
    prompt: '#98CE00',
    green: '#98CE00',
    purple: '#6CCFF6',
    cyan: '#6CCFF6',
    gray: '#757780',
};

let lineIndex = 0;
let charIndex = 0;
let progress = 0;
let currentLineEl = null;

function typeNextChar() {
    if (lineIndex >= bootSequence.length) {
        finishBoot();
        return;
    }

    const line = bootSequence[lineIndex];

    // Create new line element if starting a new line
    if (charIndex === 0) {
        currentLineEl = document.createElement('div');
        currentLineEl.className = 'boot-line';
        if (line.color && colorMap[line.color]) {
            currentLineEl.style.color = colorMap[line.color];
        }
        bootLines.appendChild(currentLineEl);
        bootLines.scrollTop = bootLines.scrollHeight;
    }

    // Empty line = just a spacer
    if (line.text === '') {
        currentLineEl.innerHTML = '&nbsp;';
        lineIndex++;
        charIndex = 0;
        updateProgress();
        setTimeout(typeNextChar, line.delay || 100);
        return;
    }

    // Type character by character for the first prompt line
    if (line.delay > 0 && line.color === 'prompt') {
        currentLineEl.textContent = line.text.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex >= line.text.length) {
            lineIndex++;
            charIndex = 0;
            updateProgress();
            setTimeout(typeNextChar, 400);
        } else {
            setTimeout(typeNextChar, line.delay);
        }
        return;
    }

    // Instant print for other lines
    currentLineEl.textContent = line.text;
    lineIndex++;
    charIndex = 0;
    updateProgress();
    const nextDelay = line.delay || (80 + Math.random() * 100);
    setTimeout(typeNextChar, nextDelay);
}

function updateProgress() {
    progress = Math.min(Math.floor((lineIndex / bootSequence.length) * 100), 100);
    progressBar.style.width = progress + '%';
    bootPercent.textContent = progress + '%';
}

function finishBoot() {
    progressBar.style.width = '100%';
    bootPercent.textContent = '100%';
    setTimeout(() => {
        loadingSection.style.display = 'none';
        commandSection.style.display = 'inline-block';
        const input = document.getElementById('command-input');
        input.focus();
    }, 600);
}

// Start the boot sequence
setTimeout(typeNextChar, 500);
