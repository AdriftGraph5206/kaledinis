const secret = document.querySelector('.secret');

// Funkcija generuoti atsitiktines pozicijas
function getRandomPosition() {
    const x = Math.random() * 90; // Atsitiktinė X koordinatė (0% - 90%)
    const y = Math.random() * 90; // Atsitiktinė Y koordinatė (0% - 90%)
    return { x, y };
}

// Funkcija judėti į atsitiktinę vietą
function moveRandomly() {
    const { x, y } = getRandomPosition();
    secret.style.left = `${x}%`;
    secret.style.top = `${y}%`;
}

// Judėjimas kas 2 sekundes
setInterval(moveRandomly, 500);

// Pirmas judėjimas iš karto
moveRandomly();


//snowflakes

const NOS = 300; // number of snowflakes
const MSS = 5; // snowflake size (px)
const MSSPEED = 2; // max snowflake speed
const snowflake_c = '#ddd'; // snowflake color
const snowflakes = []; // Array to store snowflakes

const canvas = document.createElement('canvas');
canvas.style.position = 'absolute'; // Fixed typo "postion"
canvas.style.top = '0px';
canvas.style.pointerEvents = 'none'; // Snowflakes won't block interaction
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas); // Fixed typo "apprendChild"

const ctx = canvas.getContext('2d');

const createSnowflake = () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.floor(Math.random() * MSS) + 1,
    colour: snowflake_c,
    speed: Math.random() * MSSPEED + 3, // speed between 3 and MSSPEED
    sway: Math.random() - 0.5,
});

const drawSnowflake = snowflake => {
    ctx.beginPath();
    ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2); // Fixed typo "math.PI"
    ctx.fillStyle = snowflake.colour; // Fixed typo "fillstyle"
    ctx.fill();
    ctx.closePath();
};

const updateSnowflake = snowflake => {
    snowflake.y += snowflake.speed;
    snowflake.x += snowflake.sway;
    if (snowflake.y > canvas.height) {
        Object.assign(snowflake, createSnowflake());
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach(snowflake => {
        updateSnowflake(snowflake);
        drawSnowflake(snowflake);
    });

    requestAnimationFrame(animate);
};

// Create snowflakes
for (let i = 0; i < NOS; i++) {
    snowflakes.push(createSnowflake());
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('scroll', () => {
    canvas.style.top = `${window.scrollY}px`; // Fixed string interpolation
});

animate();