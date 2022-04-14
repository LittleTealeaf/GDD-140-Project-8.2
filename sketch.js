/// <reference path="./node_modules/@types/p5/global.d.ts" />

const FRAMERATE = 60;
const CART_VELOCITY = 100;
const RAIL_DENSITY = 40;
const RAIL_OFFSET = 10;
const RAIL_WIDTH = 100;

class RockWall {
    //Constructor for a single column of rocks
    constructor(x,min,width,distCoeff,shade) {
        this.x = x;
        this.width = width;
        this.distCoeff = distCoeff;
        this.y = 0;
        this.shade = shade;
        this.min = min;

    }

    render() {
        //Increments y by the cart velocity based on distance
        this.y += CART_VELOCITY * this.distCoeff / FRAMERATE;
        //Fills with the shade specified
        fill(this.shade);

        //Begins shape
        beginShape();
        vertex(this.x - 10 * this.width,0);
        vertex(this.x,0);

        for(var y = 0; y < height; y+=10) {
            //Renders based on noise and positional arguments
            vertex(this.x + noise(this.x,(y + this.y) / 60) * (this.width - this.min) + this.min,y)
        }
        //closes
        vertex(this.x,height);
        vertex(this.x - 10 * this.width,height)
        endShape(CLOSE);
    }
}

const rocks = [];

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);
    frameRate(FRAMERATE);

    //Creates the rock walls iteratively
    const min = 0;
    const max = 100;
    const count = 40;
    for(var i = 0; i < count; i++) {
        rocks.push(
            new RockWall(
                width / 2 - 20 - (width / 70) * i ,
                min,
                max,
                i / 2,
                (i / count)* 190
            )
        );
        rocks.push(
            new RockWall(
                width / 2 + 20 + (width / 70) * i ,
                -min,
                -max,
                i / 2,
                (i / count)* 255
            )
        )
    }
}

function draw() {
    //Renders for each rock
    rocks.forEach(wall => wall.render());
    //Render the foreground
    renderForeground();
}

function renderForeground() {
    noStroke();
    rectMode(CENTER);
    for (var i = RAIL_DENSITY; i >= 0; i--) {
        //Side rails
        fill((1 - i / RAIL_DENSITY) * (1 - i / RAIL_DENSITY) * 140);
        rect(RAIL_OFFSET + RAIL_WIDTH / 2, height / 2, (i / RAIL_DENSITY) * RAIL_WIDTH, height);
        rect(width - (RAIL_OFFSET + RAIL_WIDTH / 2), height / 2, (i / RAIL_DENSITY) * RAIL_WIDTH, height);

        //Bottom rail
        fill((1 - i / RAIL_DENSITY) * (1 - i / RAIL_DENSITY) * 100, (1 - i / RAIL_DENSITY) * (1 - i / RAIL_DENSITY) * 60, (1 - i / RAIL_DENSITY) * (1 - i / RAIL_DENSITY) * 17);
        rect(width / 2, height, width - RAIL_WIDTH - RAIL_OFFSET * 2, 200 * (i / RAIL_DENSITY));
    }


}
