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
img6.src = "./pic/6.png";

var img7 = new imageExtend();
img7.src = "./pic/7.png";

var img8 = new imageExtend();
img8.src = "./pic/8.png";

var img9 = new imageExtend();
img9.src = "./pic/9.png";

var img10 = new imageExtend();
img10.src = "./pic/10.png";

class row extends Set{
	x = 0;
	y = 0;
	height = 0;
	width = 0;
	ratio = 1;
	paddingTop = 0; 
	paddingRight = 0; 
	paddingBottom = 0; 
	paddingLeft = 0; 

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

	set_padding(padding) {
		this.paddingLeft = padding.paddingLeft; 		
		this.paddingTop = padding.paddingTop; 
		this.paddingRight = padding.paddingRight;
		this.paddingBottom = padding.paddingBottom;
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
				ctx.fillStyle = "black";
				ctx.fillRect(this.x+draw_index,this.y,e.width,this.height);
				ctx.drawImage(e,this.x+draw_index+this.paddingLeft,this.y+this.paddingTop,
					e.width-this.paddingRight,this.height-this.paddingBottom);
			} else {
				e.set(this.x+draw_index,this.y,e.width,this.height);
				e.set_padding({ 
					paddingTop: this.paddingTop, 
					paddingLeft: this.paddingLeft, 
					paddingRight: this.paddingRight, 
					paddingBottom: this.paddingBottom 
					
				  });
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
	paddingTop = 0; 
	paddingRight = 0; 
	paddingBottom = 0; 
	paddingLeft = 0; 


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

	set_padding(padding) {
		this.paddingLeft = padding.paddingLeft; 		
		this.paddingTop = padding.paddingTop; 
		this.paddingRight = padding.paddingRight;
		this.paddingBottom = padding.paddingBottom;
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
				ctx.fillStyle = "black";
				ctx.fillRect(this.x,this.y+draw_index,this.width,e.height);
				ctx.drawImage(e,this.x+this.paddingLeft,this.y+draw_index+this.paddingTop,
					this.width-this.paddingRight,e.height-this.paddingBottom);
			} else {
				e.set(this.x,this.y+draw_index,this.width,e.height);
				e.set_padding({ 
					paddingLeft: this.paddingLeft, 
					paddingTop: this.paddingTop, 
					paddingRight: this.paddingRight, 
					paddingBottom: this.paddingBottom 
				  });
				e.draw();
			}
			draw_index += e.height;
		}
	}
}

function drawStoryboard(root,params) {
	root.calculate();
	root.set(30,30,params.width,params.width * 0.5);
	root.set_padding(params);
	root.draw();
}

function initiate() {
	let r1 = new row();
	let r2 = new row();
	let c1 = new column();
	let c2 = new column();
	let c3 = new column();
	let c4 = new column();

	c4.add(img8).add(img1);
	c3.add(img2).add(img3);
	r2.add(img4).add(img2).add(c4);
	c1.add(img5).add(img10).add(r2).add(img6);
	r1.add(c1).add(img7);
 
	drawStoryboard(r1, { 
		width: 1220, 
		paddingLeft: 4,
		paddingTop: 4, 
		paddingRight: 10, 
		paddingBottom: 10 
	}); 

	d.body.appendChild(canvas);
}

window.addEventListener("load", initiate, false);