const respawnw = 450;
const respawnh = 120;
var hasRespawnButton = false;
function CreateRespawnButton(self)
{
	if(hasRespawnButton) return;
	hasRespawnButton = true;
	var alien = self.add.sprite(canvas_width/2, canvas_height/2, 'respawn').setOrigin(0.5,0.5).setDisplaySize(450,120).setInteractive();
    alien.setScrollFactor(0);
    alien.on('pointerdown', function () {
		self.socket.emit('createPlayer');
		alien.destroy();
		hasRespawnButton = false;
	});
	
	
}
