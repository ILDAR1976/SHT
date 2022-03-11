var d = document;
var canvas = d.createElement('canvas');
canvas.height = 8500;
canvas.width = 8500;
var ctx = canvas.getContext('2d');

class imageExtend extends Image{
	ratio = 0;
	general_ratio_width = 0;
	general_ratio_height = 0;
}

var img1 = new imageExtend();
img1.src = "./pic/1.png";

var img2 = new imageExtend();
img2.src = "./pic/2.png";

var img3 = new imageExtend();
img3.src = "./pic/3.png";

var img4 = new imageExtend();
img4.src = "./pic/4.png";

var img5 = new imageExtend();
img5.src = "./pic/5.png";

var img6 = new imageExtend();
img6.src = "./pic/5.png";

var img7 = new imageExtend();
img7.src = "./pic/2.png";

class row extends Set{
	x = 0;
	y = 0;
	height = 0;
	width = 0;
	ratio = 1;

	set (x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		for (let e of this.values()) {
			e.width = Math.round(e.ratio * width);
			e.height = height;
		}
	}


	calculate() {
		for (let e of this.values()) {
			let isImage = (e instanceof imageExtend);
			if (!isImage) e.calculate();	
			if (e.height > this.height) this.height = e.height;
		}

		this.total_calculate();
		
	}

	total_calculate() {
		for (let e of this.values()) {
			e.width = Math.round(e.width * this.height / e.height);
			this.width += e.width;
		}

		for (let e of this.values()) {
			e.ratio = e.width / this.width;
		}
		
	}

	draw() {
		let draw_index = 0;
		for (let e of this.values()) {
			if (e instanceof imageExtend){
				ctx.drawImage(e,this.x+draw_index,this.y,e.width,this.height);
			} else {
				e.set(this.x+draw_index,this.y,e.width,this.height);
				e.draw();
			}
			draw_index += e.width;
		}
	}


}

class column extends Set{
	x = 0;
	y = 0;
	height = 0;
	width = 0;
	ratio = 1;

	set (x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		for (let e of this.values()) {
			e.height = Math.round(e.ratio * height);
			e.width = width;
		}

	}
	
	calculate() {
		for (let e of this.values()) {
			let isImage = (e instanceof imageExtend);
			if (!isImage) e.calculate();	
			if (e.width > this.width) this.width = e.width;
		}
		this.total_calculate();
	}

	total_calculate() {
		for (let e of this.values()) {
			e.height = Math.round(e.height * this.width / e.width);
			this.height += e.height;
		}

		for (let e of this.values()) {
			e.ratio = e.height / this.height ;
		}
	}

	draw() {
		let draw_index = 0;
		for (let e of this.values()) {
			if (e instanceof imageExtend){
				ctx.drawImage(e,this.x,this.y+draw_index,this.width,e.height);
			} else {
				e.set(this.x,this.y+draw_index,this.width,e.height);
				e.draw();
			}
			draw_index += e.height;
		}
	}
}

function drawStoryboard(root,size) {
	root.calculate();
	root.set(30,30,size,size * 0.5);
	root.draw();
}

function initiate() {
	let r1 = new row();
	let r2 = new row();
	let c1 = new column();
	let c2 = new column();
	let c3 = new column();
	
	c3.add(img2).add(img3);
	r2.add(img4).add(c3);
	c1.add(img5).add(r2);
	r1.add(img7).add(c1).add(img1);
	
	drawStoryboard(r1,700);
	d.body.appendChild(canvas);
}

window.addEventListener("load", initiate, false);