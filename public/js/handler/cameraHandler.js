
function createCamera(self){
	self.cameras.main.setBounds(0,0,
			self.physics.world.bounds.width, 
			self.physics.world.bounds.height);
	self.cameras.main.startFollow(self.ship);
	//this.cameras.main.setBackgroundColor('#ccccff');
}

