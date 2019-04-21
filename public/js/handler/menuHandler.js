function createMenu(self){
	var startButton = self.add.sprite(canvas_width/2, canvas_height/2, 'start').setOrigin(0.5,0.5).setDisplaySize(450,120).setInteractive();
    startButton.setScrollFactor(0);
    startButton.on('pointerdown', function () {
		start(self);
		startButton.destroy();
	});
}

function start(self){
	createHealth(self);
	createScore(self);
	self.socket.emit('createPlayer');
}
