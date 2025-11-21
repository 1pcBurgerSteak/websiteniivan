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

    const size = 20 + Math.random() * 20;
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

        const removeOffset = 100; // distance from bottom before removing
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
// NO BUTTON TELEPORT + REDIRECT
// =============================
let noClickCount = 0;
const noBtn = document.getElementById("noBtn");

noBtn.addEventListener("click", function () {
    noClickCount++;

    if (noClickCount < 5) {
        // Define safe area: middle 50% of container/screen
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;

        const safeMinX = containerWidth * 0.25;
        const safeMaxX = containerWidth * 0.75 - noBtn.offsetWidth;
        const safeMinY = containerHeight * 0.25;
        const safeMaxY = containerHeight * 0.75 - noBtn.offsetHeight;

        const newX = safeMinX + Math.random() * (safeMaxX - safeMinX);
        const newY = safeMinY + Math.random() * (safeMaxY - safeMinY);

        noBtn.style.position = "absolute";
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;

    } else {
        // 5th click → load page
        window.location.href = "index3.html";
    }
});


// =============================
// GOOGLE FORM SUBMISSION
// =============================
var submitted = false;

$('#gform').on('submit', function(e) {
    e.preventDefault(); // prevent default redirect
    submitted = true;

    // Fade out form and show message
    $('#gform *').fadeOut(1000);
    $('#gform').prepend('<p style="color:white; font-weight:bold;">Your message has been sent! Thank you.</p>');

    // let the form submit to hidden iframe
    setTimeout(() => this.submit(), 500); // delay slightly to allow fade
});




