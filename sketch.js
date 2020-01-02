let qTree;

function setup() {
  createCanvas(800, 800);
  
  let boundary = new Rectangle(400, 400, 400, 400);
  qTree = new QuadTree(boundary, 4);
  
  for (let i = 0; i < 300; i++) {
    let x = randomGaussian(width / 2, width / 8);
    let y = randomGaussian(height / 2, height / 8);
    let p = new Point(x, y);
    qTree.insert(p);
  }
}

function draw() {
  background(0);
  qTree.show();
  
  stroke(0, 255, 0);
  rectMode(CENTER);
  let range = new Rectangle(mouseX, mouseY, 50, 50);
  rect(range.x, range.y, range.w*2, range.h*2);
  let points = [];
  qTree.query(range, points);
  
  for (let p of points) {
    stroke(0, 255, 0);
    strokeWeight(4);
    point(p.x, p.y);
  }
}