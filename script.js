document.getElementById('openButton').addEventListener('click', function() {
    const envelope = document.getElementById('envelope');
    const message = document.getElementById('message');
    const amount = document.getElementById('amount');
    const wish = document.getElementById('wish');

    // Random amount from 1k to 500k
    const randomAmount = Math.floor(Math.random() * 500000) + 1000;
    const formattedAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(randomAmount);

    // Random wish
    const wishes = [
        "Chúc bạn năm mới an khang thịnh vượng!",
        "Chúc bạn năm mới vạn sự như ý!",
        "Chúc bạn năm mới sức khỏe dồi dào!",
        "Chúc bạn năm mới hạnh phúc tràn đầy!",
        "Chúc bạn năm mới phát tài phát lộc!"
    ];
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];

    // Animation
    envelope.style.transform = 'rotateX(180deg)';
    setTimeout(() => {
        message.style.display = 'block';
        amount.textContent = formattedAmount;
        wish.textContent = randomWish;
        startFireworks();
    }, 500);
});

function startFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    let fireworks = [];

    function Firework() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = Math.random() * -10 - 5;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.radius = Math.random() * 3 + 2;
        this.gravity = 0.1;
        this.opacity = 1;

        this.update = function() {
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.opacity -= 0.01;

            if (this.opacity <= 0) {
                fireworks.splice(fireworks.indexOf(this), 1);
            }
        };

        this.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.closePath();
        };
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (Math.random() < 0.1) {
            fireworks.push(new Firework());
        }
        fireworks.forEach(firework => {
            firework.update();
            firework.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}