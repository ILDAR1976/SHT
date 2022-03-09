{
var d = document;
var canvas = d.createElement('canvas');
canvas.height = 1500;
canvas.width = 1500;
var ctx = canvas.getContext('2d');

var img1 = new Image();
img1.src = "./pic/1.png";
img1.name = "1";

var img2 = new Image();
img2.src = "./pic/2.png";
img2.name = "2";

var img3 = new Image();
img3.src = "./pic/3.png";
img3.name = "3";

var img4 = new Image();
img4.src = "./pic/4.png";
img4.name = "4";

var img5 = new Image();
img5.src = "./pic/5.png";
img5.name = "5";
}

class Row extends Set{
	height = 0;
	width = 0;
	coefficients = new Set();
}

class Column extends Set{
	height = 0;
	width = 0;
	coefficients = new Set();

}

function drawStoryboard(root,size) {
	drawRow(root,size);
}

function drawRow(root,size){
	root.forEach(el => {
		if (el.height > root.height) root.height = el.height;
	});
	
	root.forEach(el => {
		let ratio_height = root.height/el.height;
		let width = Math.round(el.width * ratio_height);
		root.coefficients.add(width);
		root.width += width;
	});

	let index = 0;
	let draw_index = 0;

	root.forEach(el => {
		let ratio_width = Array.from(root.coefficients)[index]/root.width;
		let general_ratio_width;
		if (root.width > size) {
			general_ratio_width = size/root.width 
		} else {
			general_ratio_width = root.width/size;
		}
		el.width = Math.round(ratio_width * size);
		let height = general_ratio_width * root.height;
		ctx.drawImage(el,draw_index,0,el.width, height);
		index++;
		draw_index += el.width;
	});
}

function drawColumn(){
	
}

function initiate() {
	let tree = new Row();

	tree.add(img1).add(img2).add(img3).add(img4).add(img5);

	drawStoryboard(tree,800)

	d.body.appendChild(canvas);
}

window.addEventListener("load", initiate, false);