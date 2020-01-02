let particles = [];
let qTree;

function setup() {
  createCanvas(800, 800);
  
  for (let i = 0; i < 1500; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(0);
  
  let boundary = new Rectangle(400, 400, 400, 400);
  qTree = new QuadTree(boundary, 4);
  
  for (let p of particles) {
    let point = new Point(p.x, p.y, p);
    qTree.insert(point);
    
    p.move();
    p.render();
    p.setHighlight(false);
  }
  
  for (let p of particles) {
    let range = new Circle(p.x, p.y, p.r * 2);
    let points = qTree.query(range);
    for (let point of points) {
      let other = point.data;
      if (p !== other && p.intersects(other)) {
        p.setHighlight(true);
      }
    }
  }
}


// Pure Quadtree visualisation
// let qTree;
//
// function setup() {
//   createCanvas(800, 800);
//
//   let boundary = new Rectangle(400, 400, 400, 400);
//   qTree = new QuadTree(boundary, 4);
//
//   for (let i = 0; i < 300; i++) {
//     let x = randomGaussian(width / 2, width / 8);
//     let y = randomGaussian(height / 2, height / 8);
//     let p = new Point(x, y);
//     qTree.insert(p);
//   }
// }
//
// function draw() {
//   background(0);
//   qTree.show();
//
//   stroke(0, 255, 0);
//   rectMode(CENTER);
//   let range = new Rectangle(mouseX, mouseY, 50, 50);
//   rect(range.x, range.y, range.w*2, range.h*2);
//   let points = [];
//   qTree.query(range, points);
//
//   for (let p of points) {
//     stroke(0, 255, 0);
//     strokeWeight(4);
//     point(p.x, p.y);
//   }
// }