var SnowFlake = function(radius,wind_force){
	this.x = -50;
	this.y = -10;
	this.radius = radius;
	this.vy = 0;
	this.vx = 0;
	this.wind_force = wind_force;
	
	
	this.move = function(){
		this.y += this.vy;
		this.x += this.vx;
	};
};

var Rain = function(selector_id,image){
	var self = this;
	self.rain = [];
	self.image = image;
	self.canvas = document.getElementById(selector_id);
	self.ctx = canvas.getContext('2d');
	self.gravity = 0.1;
	self.wind_force = 0.02;
	self.let_it_snow = function(){
		self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
		var radius = self.getRandomInt(5,10);
		var wind_force = self.getRandomInt(0.01,0.09);
		var snow_flake = new SnowFlake(radius,wind_force);
		var x = self.getRandomInt(-10,800);
		var y = self.getRandomInt(-10,300);

		snow_flake.x = x;
		snow_flake.y = y;
		self.rain.push(snow_flake);
		self.animate();
	};
	self.animate = function(){
		var ctx = self.ctx;

		var image = self.image;
		for (var i = self.rain.length - 1; i >= 0; i--) {
			var snow_flake = self.rain[i];

			ctx.drawImage(image,snow_flake.x,snow_flake.y,snow_flake.radius,snow_flake.radius);
			self.move(snow_flake);
			if(snow_flake.x > self.canvas.width || snow_flake.y > self.canvas.height){
				self.rain.splice(i,1);
			}
		};
		//requestAnimationFrame(self.let_it_snow);
		setTimeout(self.let_it_snow,100);

		
	};
	self.move = function(snow_flake){
		snow_flake.vy = snow_flake.vy + 0.1;
		snow_flake.vx += snow_flake.wind_force * snow_flake.radius;
		snow_flake.move();
	};
	self.getRandomInt = function(min, max) {
	    return (Math.random() * (max - min) + min);
	};
	
}

window.requestAnimationFrame = (function(){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrane ||
	function(f){
		window.setTimeout(f,1000/60);
	}
})();