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

    const size = 150 + Math.random() * 40;
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

        if (top > window.innerHeight) {
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
            // SAFE TELEPORT AREA (middle 50% of screen)
    const centerX = window.innerWidth * 0.25 + Math.random() * window.innerWidth * 0.5;
    const centerY = window.innerHeight * 0.25 + Math.random() * window.innerHeight * 0.5;

    noBtn.style.position = "absolute";

    // Make sure it NEVER goes off-screen
    const safeX = Math.min(centerX, window.innerWidth - noBtn.offsetWidth - 20);
    const safeY = Math.min(centerY, window.innerHeight - noBtn.offsetHeight - 20);

    noBtn.style.left = safeX + "px";
    noBtn.style.top = safeY + "px";
    } else {
        // 5th CLICK → LOAD PAGE
        window.location.href = "index3.html";
    }
});

document.getElementById("sendBtn").addEventListener("click", function () {
    const msg = document.getElementById("messageInput").value;

    if (msg.trim() === "") {
        alert("Wala kang message!");
        return;
    }

    fetch("https://discord.com/api/webhooks/1441453724231925801/UowtVk701EvMDLvhkaePCEo74uFbOF_6s8XLEsoKbHirtaBv1LZX-oxGWn8yYKEUCILj", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: msg
        })
    })
    .then(() => {
        alert("Message sent!");
        document.getElementById("messageInput").value = "";
    })
    .catch(err => {
        alert("Error sending message");
        console.error(err);
    });
});