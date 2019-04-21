var displayHealth;
var displayHealth1;
var displayHealth2;
const yval = 60;
const healthWidth = 33;

function createHealth(self){
	var camera = self.cameras.main;
	displayHealth = self.add.sprite(camera.x+healthWidth*1,camera.y+yval,'health').setOrigin(0.5,0.5).setDisplaySize(30,30);
        displayHealth.setScrollFactor(0);
        displayHealth1 = self.add.sprite(camera.x+healthWidth*2,camera.y+yval,'health').setOrigin(0.5,0.5).setDisplaySize(30,30);
        displayHealth1.setScrollFactor(0);
        displayHealth2 = self.add.sprite(camera.x+healthWidth*3,camera.y+yval,'health').setOrigin(0.5,0.5).setDisplaySize(30,30);
        displayHealth2.setScrollFactor(0);
}

function resetHearts(){
	displayHealth1.setVisible(true);
	displayHealth2.setVisible(true);
	displayHealth.setVisible(true);
}

function displayLocalHealth(self,health)
{
	if(health ==2){
		displayHealth2.setVisible(false);
	}else if(health == 1){
		displayHealth1.setVisible(false);
		displayHealth2.setVisible(false);
	}else if(health == 0){
		displayHealth1.setVisible(false);
		displayHealth2.setVisible(false);
		displayHealth.setVisible(false);
	}
}
