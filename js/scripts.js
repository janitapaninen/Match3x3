var guess = []
var tiles = []
var answers = []
var allTiles = []
var correctAns = 0
var resolved = 0
var OPACITY = '0.35'
var givenCorrAns = []
var sameAnsLength =0

$(document).ready(function(){
	console.log("ready")
});

function resetGame(){
	location.reload()
}

function startGame(){
	console.log("startGame")
	$('button[name=reset]').show()
	$('button[name=start]').hide(function(){
		$(this).hide()
	}
); 
	renderTiles()
	solveAnswers()	
}

function createAllTiles(){
	return[
		{id: 1, shape: 'square', backgroundColor: 'red-light', shapeColor: 'blue'},
		{id: 2, shape: 'square', backgroundColor: 'red-light', shapeColor: 'red'},
		{id: 3, shape: 'square', backgroundColor: 'red-light', shapeColor: 'green'},
		{id: 4, shape: 'square', backgroundColor: 'blue-light', shapeColor: 'blue'},
		{id: 5, shape: 'square', backgroundColor: 'blue-light', shapeColor: 'red'},
		{id: 6, shape: 'square', backgroundColor: 'blue-light', shapeColor: 'green'},
		{id: 7, shape: 'square', backgroundColor: 'green-light', shapeColor: 'blue'},
		{id: 8, shape: 'square', backgroundColor: 'green-light', shapeColor: 'red'},
		{id: 9, shape: 'square', backgroundColor: 'green-light', shapeColor: 'green'},
		
		{id: 10, shape: 'circle', backgroundColor: 'red-light', shapeColor: 'blue'},
		{id: 11, shape: 'circle', backgroundColor: 'red-light', shapeColor: 'red'},
		{id: 12, shape: 'circle', backgroundColor: 'red-light', shapeColor: 'green'},
		{id: 13, shape: 'circle', backgroundColor: 'blue-light', shapeColor: 'blue'},
		{id: 14, shape: 'circle', backgroundColor: 'blue-light', shapeColor: 'red'},
		{id: 15, shape: 'circle', backgroundColor: 'blue-light', shapeColor: 'green'},
		{id: 16, shape: 'circle', backgroundColor: 'green-light', shapeColor: 'blue'},
		{id: 17, shape: 'circle', backgroundColor: 'green-light', shapeColor: 'red'},
		{id: 18, shape: 'circle', backgroundColor: 'green-light', shapeColor: 'green'},

		{id: 19, shape: 'triangle', backgroundColor: 'red-light', shapeColor: 'blue'},
		{id: 20, shape: 'triangle', backgroundColor: 'red-light', shapeColor: 'red'},
		{id: 21, shape: 'triangle', backgroundColor: 'red-light', shapeColor: 'green'},
		{id: 22, shape: 'triangle', backgroundColor: 'blue-light', shapeColor: 'blue'},
		{id: 23, shape: 'triangle', backgroundColor: 'blue-light', shapeColor: 'red'},
		{id: 24, shape: 'triangle', backgroundColor: 'blue-light', shapeColor: 'green'},
		{id: 25, shape: 'triangle', backgroundColor: 'green-light', shapeColor: 'blue'},
		{id: 26, shape: 'triangle', backgroundColor: 'green-light', shapeColor: 'red'},
		{id: 27, shape: 'triangle', backgroundColor: 'green-light', shapeColor: 'green'}
	]
}

function generate9Tiles(){
	  console.log("generate9Tiles")
	  allTiles = createAllTiles()
	  shuffle(allTiles)
	  for (var i = 9 - 1; i >= 0; i--) {
		tiles.push(allTiles.pop())
	  }
	  for(var i=0; i<tiles.length; i++){
		console.log(tiles[i])
	}
	return tiles;
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex 
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1
		temporaryValue = array[currentIndex]
		array[currentIndex] = array[randomIndex]
		array[randomIndex] = temporaryValue
	}
		return array;
}

function solveAnswers(){
	console.log("solveAnswers")
	for (var i = 0; i < 7; i++){
		for(var j = i+1; j < 8; j++){
			for(var k = j+1; k < 9; k++){
				if((( tiles[i].shape === tiles[j].shape && tiles[i].shape === tiles[k].shape ) || ( tiles[i].shape !== tiles[j].shape && tiles[i].shape !== tiles[k].shape &&tiles[j].shape !== tiles[k].shape )) && (( tiles[i].backgroundColor === tiles[j].backgroundColor && tiles[i].backgroundColor === tiles[k].backgroundColor ) ||( tiles[i].backgroundColor !== tiles[j].backgroundColor && tiles[i].backgroundColor !== tiles[k].backgroundColor && tiles[j].backgroundColor !== tiles[k].backgroundColor )) &&(( tiles[i].shapeColor === tiles[j].shapeColor && tiles[i].shapeColor === tiles[k].shapeColor ) ||( tiles[i].shapeColor !== tiles[j].shapeColor && tiles[i].shapeColor !== tiles[k].shapeColor && tiles[j].shapeColor !== tiles[k].shapeColor))){
						answers.push([tiles[i], tiles[j], tiles[k]])
				}
			}
		}
	}
	for (var i = answers.length - 1; i >= 0; i--) {
		answers[i].sort(function (a,b){
		return a.id-b.id;
		})
	} 
	$( "h2" ).html("<strong>Possible answers:"+answers.length+"</strong>")
}

	
function renderTiles() {
	console.log("renderTiles")
	$('#row0').empty()
	$('#row1').empty()
	$('#row2').empty()
	tiles = generate9Tiles()
	for (var i = 0; i < tiles.length; i++) {
		var shape;
		tile = tiles[i];
		if (tile.shape === 'square') {
			shape = '<rect class="shape color-' + tile.shapeColor + '" x="0" y="0" width="100" height="100"/>'
		}
		else if (tile.shape === 'triangle') {
			shape = '<polygon class="shape color-' + tile.shapeColor + '" points="50,0 0,100 100,100"/>'
		}
		else if (tile.shape === 'circle') {
			shape = '<circle class="shape color-' + tile.shapeColor + '" cx="50" cy="50" r="50"/>'
		}
		var html = '<div class="col-xs-4">' +
			'<div class="tile color-' + tile.backgroundColor + '" id="'+tile.id +'">' +
			'<svg class="shape-svg" viewBox="0 0 100 100" preserveAspectRatio="none">' +
			shape +
			'</svg>' + '</div>' + '</div>'
		$('#row' + Math.floor(i / 3)).append(html)
	}
	$('.tile').unbind('click')
	$('#no-more').unbind('click')
	$('.tile').on('click', tileClickHandler)
	console.log("done rendering")
}

function tileClickHandler(){
	var $el = this
	var id = parseInt($el.id)
	if($el.style && $el.style.opacity === OPACITY){
		$el.style.opacity=1
		var index = guess.indexOf(id)
		guess.splice(index, index+1)
	} 
	else if(guess.length < 3){
		guess.push(id)
		$el.style.opacity=OPACITY
		if (guess.length === 3){
			tiles: guess.sort(function(a,b) {
				return a-b 
			})
			tileSolver()
		}
	}
}

function tileSolver(){
	console.log("tileSolver")
	for(var i = 0; i < answers.length; i++){
		if( answers[i][0].id === guess[0] && answers[i][1].id === guess[1] && answers[i][2].id === guess[2]){
			correctAns = 1
			sameAnsLength = i
		}
	}
	if(resolved !=0 ){ 
		for(var j=0; j<resolved;j++){
			if (givenCorrAns[j][0] === guess[0] && givenCorrAns[j][1] === guess[1] && givenCorrAns[j][2] === guess[2]){
				correctAns =2
			}
		}
	}
	if(correctAns == 0){
		alert("Try again")
		guess =[]
	}
	if (correctAns == 1){
			alert("Correct!")
			givenCorrAns.push(guess)
			resolved++
			answers.splice(sameAnsLength,1)
			guess =[]
			correctAns=0
			$( "h2" ).html("<strong>Possible answers:"+answers.length+"</strong>")
	}
	if(correctAns ==2){
		alert("You've already submitted the given set")
		guess=[]
		correctAns=0
	}
}