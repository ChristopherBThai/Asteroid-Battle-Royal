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
	
	var particles = self.add.particles('blue');

    var emitter = particles.createEmitter();

    emitter.setPosition(self.ship.x, self.ship.y);
	//emitter.setScale(.1);
	emitter.setScaleX(.1);
	emitter.setScaleY(.1);
    emitter.setSpeed(10);
    emitter.setBlendMode(Phaser.BlendModes.ADD);	
	emitter.start();
	
	emitter.emitParticle(2);
	emitter.explode();
	
}
