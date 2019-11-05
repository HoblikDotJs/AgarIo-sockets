class Player {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
  }

  show() {
    stroke(0);
    fill(0);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2, 150);

  }

  grow(r) {
    let otherArea = PI * r * r;
    this.area = this.r * this.r * PI + otherArea;
    this.r = sqrt(this.area / PI);

  }

  update() {
    let vel = createVector(mouseX - width / 2, mouseY - height / 2);
    vel.setMag(map(this.r, 64, 256, 5, 2));
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, -3000, 3000);
    this.pos.y = constrain(this.pos.y, -3000, 3000);
  }
  eat(food) {
    for (let i = food.length - 1; i >= 0; i--) {
      if (dist(this.pos.x, this.pos.y, food[i].x, food[i].y) < this.r + food[i].r) {
        this.grow(food[i].r);
        food.splice(i, 1);
      }
    }
  }
}

class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
  }
  show() {
    stroke(0);
    ellipse(this.x, this.y, this.r * 2);
  }
}