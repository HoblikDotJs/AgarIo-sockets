let p;
let food = [];
let zoom = 1;
let R = 64;
let database;
let imgB;
let socket;
let blobs = [];
let id;

function preload() {
	imgB = loadImage("img.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	socket = io.connect("http://localhost:3000");
	p = new Player(0, 0, R);
	/*
	for (let i = 0; i < 400; i++) {
		food.push(new Food(random(-3000, 3000), random(-3000, 3000)));
	}*/
	socket.on("position", moveAss);
	let data = {
		x: p.pos.x,
		y: p.pos.y,
		r: p.r
	}
	socket.emit("position", data);
	socket.on("heartbeat", function (data) {
		blobs = data;
	});
}

function moveAss(data) {
	stroke(130);
	fill(130);
	ellipse(data.x, data.y, data.r * 2, data.r * 2, 150);
}

function draw() {
	let newzoom = R / p.r;
	zoom = lerp(zoom, newzoom, 0.1);
	translate(width / 2, height / 2);
	scale(zoom);
	translate(-p.pos.x, -p.pos.y);
	rect(p.pos.x + 600, p.pos.y + 100, 100, 100);
	p.update();
	background(255);
	for (let i = 0; i < 3; i++) {
		image(imgB, -3000 * i, -3000, 3000, 3000);
		image(imgB, -3000 * i, 0, 3000, 3000);
	}

	p.show();
	p.eat(food);
	stroke(0);
	noFill();
	strokeWeight(4);
	rect(-3000, -3000, 6000, 6000);
	strokeWeight(1);
	fill(0);
	for (let i = food.length - 1; i >= 0; i--) {
		food[i].show();
	}
	let data = {
		x: p.pos.x,
		y: p.pos.y,
		r: p.r
	}
	socket.emit("update", data);
	for (var i = blobs.length - 1; i >= 0; i--) {
		if (blobs[i].id != socket.id) {
			console.log(blobs[i].id, socket.id);
			fill(255, 0, 0);
			ellipse(blobs[i].x, blobs[i].y, blobs[i].r * 2, blobs[i].r * 2);
			fill(0, 255, 0);
			text(blobs[i].id, blobs[i].x, blobs[i].y)
		}
	}
}