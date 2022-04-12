/// <reference path="./node_modules/@types/p5/global.d.ts" />

class Ember {
    constructor(x,y,r,g,b) {
       this.x = x;
       this.y = y;
       this.dx = Math.random() * 200 - 100;
       this.dy = Math.random() * 200 - 160;
       this.r = r;
       this.g = g;
       this.b = b;
       this.lifespan = Math.random() * 500;
    }

    render() {
        fill(this.r,this.g,this.b,Math.log(this.lifespan / 20) * 100 * noise(frameCount,this.x + this.y + this.dy + this.dx));
        noStroke();
        ellipseMode(CENTER);
        ellipse(this.x,this.y,10,10);

        this.x += this.dx / frameRate();
        this.y += this.dy  / frameRate();

        this.dy += 50 / frameRate();

        this.lifespan--;

        return this.lifespan > 0;
    }
}

var embers = [];

const RAIL_DENSITY = 40;
const RAIL_OFFSET = 10;
const RAIL_WIDTH = 100;

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);
}

function draw() {
    background(20);

    if(embers.length < 500) {
        embers.push(new Ember(width/2,height/2,random(170,255),random(0,50),random(0,50)));
    }

    renderForeground();
    renderEmbers();
}

function renderForeground() {
    noStroke();
    rectMode(CENTER);
    for (var i = RAIL_DENSITY; i >= 0; i--) {
        fill((1 - i / RAIL_DENSITY) * (1 - i / RAIL_DENSITY) * 140);
        rect(RAIL_OFFSET + RAIL_WIDTH / 2, height / 2, (i / RAIL_DENSITY) * RAIL_WIDTH, height);
        rect(width - (RAIL_OFFSET + RAIL_WIDTH / 2), height / 2, (i / RAIL_DENSITY) * RAIL_WIDTH, height);


        fill((1 - i / RAIL_DENSITY) * (1 - i / RAIL_DENSITY) * 100, (1 - i / RAIL_DENSITY) * (1 - i / RAIL_DENSITY) * 60, (1 - i / RAIL_DENSITY) * (1 - i / RAIL_DENSITY) * 17);
        rect(width / 2, height, width - RAIL_WIDTH - RAIL_OFFSET * 2, 200 * (i / RAIL_DENSITY));
    }
}

function renderEmbers() {
    embers = embers.filter((ember) => ember.render());
}
