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
// YES / NO BUTTON LOGIC
// =============================
const yesButtons = document.querySelectorAll('.yes-btn');
const noButtons = document.querySelectorAll('.no-btn');
const noBtnTeleport = document.getElementById('noBtn'); // optional teleporting No

// Handle Yes button click
yesButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        window.location.href = "index4.html?choice=Yes";
    });
});

// Handle No button click (normal buttons)
noButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        window.location.href = "index2.html?choice=No";
    });
});

// Teleporting No button logic (index2.html)
let noClickCount = 0;
if(noBtnTeleport){
    noBtnTeleport.addEventListener('click', function(){
        noClickCount++;
        if(noClickCount < 5){
            const containerWidth = window.innerWidth;
            const containerHeight = window.innerHeight;

            const safeMinX = containerWidth * 0.25;
            const safeMaxX = containerWidth * 0.75 - noBtnTeleport.offsetWidth;
            const safeMinY = containerHeight * 0.25;
            const safeMaxY = containerHeight * 0.75 - noBtnTeleport.offsetHeight;

            const newX = safeMinX + Math.random() * (safeMaxX - safeMinX);
            const newY = safeMinY + Math.random() * (safeMaxY - safeMinY);

            noBtnTeleport.style.position = "absolute";
            noBtnTeleport.style.left = `${newX}px`;
            noBtnTeleport.style.top = `${newY}px`;
        }else{
            window.location.href = "index3.html?choice=No";
        }
    });
}

// =============================
// GET CHOICE FROM QUERY PARAM
// =============================
function getChoiceFromURL(){
    const params = new URLSearchParams(window.location.search);
    return params.get('choice') || "";
}

// =============================
// FORM / MESSAGE SUBMISSION
// =============================
const messageInput = document.getElementById('messageInput');
const gform = document.getElementById('gform');
const sendBtn = document.getElementById('sendBtn');

// Function to submit message to Google Form
function submitMessageToForm(message){
    if(!gform){
        // Create temporary form dynamically for index3.html
        const tempForm = document.createElement('form');
        tempForm.style.display = 'none';
        tempForm.method = 'POST';
        tempForm.action = "https://docs.google.com/forms/d/e/1FAIpQLSc2BeNlYTAsjrWmOeqKbxu6LHZoePtIbsoHLD_-kVIkWB_Yww/formResponse";
        tempForm.target = "hidden_iframe";

        const input = document.createElement('input');
        input.type = 'text';
        input.name = "entry.374317346";
        input.value = message;

        tempForm.appendChild(input);
        document.body.appendChild(tempForm);
        tempForm.submit();
        tempForm.remove();
    } else {
        // Use existing form on index4.html
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = messageInput.name;
        hiddenInput.value = message;
        gform.appendChild(hiddenInput);
        gform.submit();
    }
}

// Handle form submission (index4.html)
if(gform){
    gform.addEventListener('submit', function(e){
        e.preventDefault();

        const userChoice = getChoiceFromURL();
        const combinedMessage = messageInput.value
            ? messageInput.value + " - " + userChoice
            : " - " + userChoice;

        gform.style.display = 'none';
        const confirmation = document.createElement('p');
        confirmation.style.color = 'white';
        confirmation.textContent = "Your message has been sent! Thank you.";
        gform.parentNode.appendChild(confirmation);

        setTimeout(()=>submitMessageToForm(combinedMessage), 300);
    });
}

// Handle button click on index3.html
if(sendBtn && messageInput){
    sendBtn.addEventListener('click', ()=>{
        const userChoice = getChoiceFromURL();
        const combinedMessage = messageInput.value
            ? messageInput.value + " - " + userChoice
            : " - " + userChoice;

        sendBtn.style.display = 'none';
        const confirmation = document.createElement('p');
        confirmation.style.color = 'white';
        confirmation.textContent = "Your message has been sent! Thank you.";
        messageInput.parentNode.appendChild(confirmation);

        submitMessageToForm(combinedMessage);
    });
}