(function() {
    'use strict';
    const canvas = document.getElementById('theCanvas');
    const context = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Ants {

        constructor(size, color) {
            this.size = size;
            this.color = color;

            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.dx = randomNum();
            this.dy = randomNum();
        }
        draw() {

            this.x += this.dx;
            this.y += this.dy;

            if (this.y < this.size || this.y > canvas.height - this.size) {
                this.dy = -this.dy;
            }
            if (this.x < this.size || this.x > canvas.width - this.size) {
                this.dx = -this.dx;
            }
            context.fillStyle = this.color;
            context.beginPath();
            context.fillRect(this.x, this.y, this.size, this.size);
            context.fill();
        }
        move() {
            // this.dx = Math.round(Math.random() * 2) + 1;
            // this.dy = Math.round(Math.random() * 2) + 1;
            this.dx = randomNum();
            this.dy = randomNum();

        }
        smartAnts() {
            setInterval(() => {
                this.dx = randomNum();
                this.dy = randomNum();
                this.x += this.dx;
                this.y += this.dy;
            }, getRandomTime());

        }
    }

    function randomNum() {
        return Math.round(Math.random() * 2) - 1;

    }

    function getRandomTime() {
        return Math.floor(Math.random() * 5000 + 1000);
    }
    const ants = [];
    for (let i = 0; i < 1000; i++) {
        const moveAnts = new Ants(5, 'red');
        // moveAnts.draw();
        // moveAnts.move();
        moveAnts.smartAnts();
        ants.push(moveAnts);
    }


    setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        ants.forEach(ant => {
            ant.draw();
            // ant.move();
        });
    }, 16.6666);


    const colorInput = document.getElementById('color');
    const amountInput = document.getElementById('amount');
    document.getElementById('addAnt').addEventListener('submit', e => {
        e.preventDefault();
        for (let i = 0; i < amountInput.value; i++) {
            const newAnts = new Ants(5, colorInput.value);
            // newAnts.draw();
            // newAnts.move();
            newAnts.smartAnts();
            ants.push(newAnts);
        }
    });
}());