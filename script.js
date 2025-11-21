// =============================
// RAIN FALLING IMAGES
// =============================
const container = document.getElementById('rain-container');

const images = [
    'images/potchi.png',
    'images/kuromi.png'
];

function createRain() {
    const img = document.createElement('img');
    img.src = images[Math.floor(Math.random() * images.length)];
    img.style.left = Math.random() * window.innerWidth + 'px';

    const size = 20 + Math.random() * 20; // smaller images
    img.style.width = size + 'px';

    container.appendChild(img);

    let top = -50;
    let rotation = 0;
    const speed = 2 + Math.random() * 5;
    const rotationSpeed = Math.random() * 4 - 2;

    function fall() {
        top += speed;
        rotation += rotationSpeed;

        img.style.top = top + 'px';
        img.style.transform = `rotate(${rotation}deg)`;

        const removeOffset = 100; // disappear 100px before bottom
        if (top > window.innerHeight - removeOffset) {
            img.remove();
        } else {
            requestAnimationFrame(fall);
        }
    }

    fall();
}

setInterval(createRain, 200);


// =============================
// YES / NO BUTTONS LOGIC
// =============================

// Teleport counter for "No" buttons that move around
let noClickCount = 0;

// Handle Yes buttons
document.querySelectorAll('.yes-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        localStorage.setItem('userChoice', 'Yes'); // store choice
        // redirect handled by <a> href in HTML
    });
});

// Handle No buttons that redirect immediately
document.querySelectorAll('.no-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        localStorage.setItem('userChoice', 'No'); // store choice
        // redirect handled by <a> href in HTML
    });
});

// Handle teleporting No button (if using special one)
const teleportNoBtn = document.getElementById("noBtn");
if (teleportNoBtn) {
    teleportNoBtn.addEventListener("click", function () {
        noClickCount++;
        if (noClickCount < 5) {
            // TELEPORT INSIDE SAFE AREA (middle 50% of screen)
            const containerWidth = window.innerWidth;
            const containerHeight = window.innerHeight;

            const safeMinX = containerWidth * 0.25;
            const safeMaxX = containerWidth * 0.75 - teleportNoBtn.offsetWidth;
            const safeMinY = containerHeight * 0.25;
            const safeMaxY = containerHeight * 0.75 - teleportNoBtn.offsetHeight;

            const newX = safeMinX + Math.random() * (safeMaxX - safeMinX);
            const newY = safeMinY + Math.random() * (safeMaxY - safeMinY);

            teleportNoBtn.style.position = "absolute";
            teleportNoBtn.style.left = `${newX}px`;
            teleportNoBtn.style.top = `${newY}px`;

        } else {
            // 5th click → redirect to input page and store choice
            localStorage.setItem('userChoice', 'No');
            window.location.href = "index3.html"; // page with input message
        }
    });
}


// =============================
// PREFILL MESSAGE INPUT WITH CHOICE
// =============================
window.addEventListener('DOMContentLoaded', () => {
    const msgInput = document.getElementById('messageInput');
    const choice = localStorage.getItem('userChoice');

    if (choice && msgInput) {
        msgInput.value = choice + ': '; // add Yes: or No: prefix
    }
});


// =============================
// GOOGLE FORM SUBMISSION
// =============================
var submitted = false;

$('#gform').on('submit', function(e) {
    e.preventDefault(); // prevent redirect
    submitted = true;

    const msgInput = document.getElementById('messageInput');

    // ensure prefix exists
    const choice = localStorage.getItem('userChoice') || '';
    if (!msgInput.value.startsWith(choice)) {
        msgInput.value = choice + ': ' + msgInput.value;
    }

    // fade out form and show confirmation
    $('#gform *').fadeOut(1000);
    $('#gform').prepend('<p style="color:white; font-weight:bold;">Your message has been sent! Thank you.</p>');

    // submit to hidden iframe after short delay
    setTimeout(() => this.submit(), 500);
});
