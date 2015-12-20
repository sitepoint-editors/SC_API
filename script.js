$(document).ready(function () {
	// Initialization of SDK
	SC.initialize({
		client_id: "21832d295e3463208d2ed0371ae08791",
		redirect_uri: "http://mustagheesbutt.github.io/SC_API/callback.html"
	});
	
	// Login handler
	var user_perma;
	$("#login").click(function () {
		SC.connect(function () {
			SC.get("/me", function (me) {
				user_perma = me.permalink;
				setUI(me.username, me.avatar_url, me.description);
			});
			if (SC.isConnected) {
				$("header, main").addClass("loggedIn");
			}
			getTracks();
			getPlaylists();
		});
	});
	
	// set User Interface
	function setUI(userName, avatar, description) {
		$("main h2 span").html(userName);
		$("#avatar").attr("src", avatar);
		$("#description").html(description);
	}
	// function for user tracks
	var tracks = {};
	function getTracks() {
		SC.get("/me/tracks", function (resp) {
			for (var i=0; i< resp.length; i++) {
				$("#tracklist ul").append("<li class='playable'>" + resp[i].title + "</li>");
				tracks[ resp[i].title ] = resp[i].permalink;
			}
		});
	}
	// function for user playlists
	var playlists = {};
	function getPlaylists() {
		SC.get("/me/playlists", function (resp) {
			for (var i=0; i< resp.length; i++) {
				$("#playlists ul").append("<li class='playable'>" + resp[i].title + "</li>");
				playlists[ resp[i].title ] = resp[i].permalink;
			}
		});
	}
	// play something
	function play(uri) {
		url = "http://soundcloud.com/" + user_perma + "/" + uri;
		SC.oEmbed(url, {maxwidth: 200}, function (resp) {
			$("#player").html(resp.html);
		});
	}
	
	// when a track or playlist gets clicked, play it using `play()` function
	$("ul").on("click", function (e) {
		var title = e.target.innerHTML;
		if ( tracks.hasOwnProperty(title) ) {
			play(tracks[title]);
			console.log('in tracks');
		} else if (playlists.hasOwnProperty(title)) {
			play("sets/" + playlists[title]);
			console.log('in sets');
		}
	});
	
});