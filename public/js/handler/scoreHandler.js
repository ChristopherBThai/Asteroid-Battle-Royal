var scoreText;
var highScores = {};
var highText;

function createScore(self){
	let socket = self.socket;

	scoreText = self.add.text(16, 16, 'score: 0', { fontSize: '35px', fill: '#ffffff' });
    scoreText.setScrollFactor(0);
	highText = self.add.text(canvas_width-400, 16, 'HighScores', { fontSize: '35px', fill: '#ffffff' });
    highText.setScrollFactor(0);

	socket.on('updateScore',function(data){
		if(socket.id == data.id){
			scoreText.setText('score: '+data.score);
		}
		highScores[data.id] = {score:data.score,name:data.id};
		updateBoard();
	});

	socket.on('disconnect', function (playerId) {
		delete highScores[playerId];
		updateBoard();
	});

	socket.on('currentPlayers', function (players) {
		for(let i in players){
			highScores[players[i].playerId] = {score:players[i].score,name:players[i].playerId};
		}
		updateBoard();
	});
}

function updateBoard(){
	let text = 'HighScores\n';
	let sorted = [];
	for(let i in highScores){
		sorted[sorted.length] = highScores[i];
	}
	sorted.sort(function(a,b){
		return b.score - a.score;
	});
	for(let i in sorted){
		text += /*sorted[i].name+*/i+": "+sorted[i].score+"\n";
	}
	highText.setText(text);
}
