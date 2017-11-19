var arrayPlayers = [{
	name: "Harry",
	hp: 110,
	attackPower: 7,
	counterPower: 13,
	img: "assets/images/harry.jpg",
},	{
	name: "Ron",
	hp: 95,
	attackPower: 11,
	counterPower: 10,
	img: "assets/images/ron.jpg",
},	{
	name:"Hermione",
	hp: 98,
	attackPower: 9,
	counterPower: 11,
	img: "assets/images/hermione.jpg",
},	{
	name:"Neville",
	hp:100,
	attackPower:8,
	counterPower:12,
	img: "assets/images/neville.jpg",
}]

$(document).ready(function(){
	var characterList = $("#character-section ul")

	arrayPlayers.forEach(function(player) {
		var li = $('<li class="character"> \
						<div> \
							<h5 class="name">' + player.name + '</h5> \
							<img src="' + player.img + '"/> \
							<h5 class="hp">' + player.hp + '</h5> \
						</div> \
					</li>')
		li.data("hp", player.hp)
		li.data("attackPower", player.attackPower)
		li.data("counterPower", player.counterPower)
		characterList.append(li)
	})

	characterList.on("click", ".character", function() {

		var currentPlayer = $(this)
		var enemies = currentPlayer.siblings()

		enemies.detach();
		enemies.appendTo($("#enemies ul"));
		$("#message").text("Click an image to choose your enemy")


	})

	$("#enemies").on("click", ".character", function() {

		var defender = $(this)

		if ($("#defender ul li").length > 0) {
			return;
		}
		defender.detach();
		defender.appendTo($("#defender ul"));
		$("#message").hide();

	})

	var clicks = 0

	$("#attack").on("click", function() {
		clicks++;

		var defender = $("#defender ul li")
		var player = characterList.find("li")
		var defenderData = defender.data()
		var playerData = player.data()

		if ($("#defender ul li").length = 0) {
			return;
		}
		
		defender.data("hp", defenderData.hp - playerData.attackPower * clicks);
		defender.find(".hp").text(defender.data("hp"));

		player.data("hp", playerData.hp - defenderData.counterPower);
		player.find(".hp").text(player.data("hp"));

		if (player.data("hp") <= 0) {
			alert("Avada Kedavera");
			location.reload();
		}

		else if (defender.data("hp") <= 0) {
			defender.detach();
			if ($("#enemies li").length === 0) {
				alert("Prefect!");
				location.reload();
			}
			$("#message").show()
		}

	})

})

