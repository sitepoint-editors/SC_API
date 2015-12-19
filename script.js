$(document).ready(function () {
	// Initialization of SDK
	SC.initialize({
		client_id: "21832d295e3463208d2ed0371ae08791",
		redirect_uri: "http://mustagheesbutt.github.io/SC_API/callback.html"
	});
	
	// Login handler
	$("#login").click(function () {
		SC.connect(function () {
			SC.get("/me", function (me) {
				$("main h2 span").html(me.username);
			});
			if (SC.isConnected) {
				$("header, main").addClass("loggedIn");
			}
			getTracks();
			getPlaylists();
		});
	});
	
	// function for user tracks
	function getTracks() {
		SC.get("/me/tracks", function (resp) {
			for (var i=0; i< resp.length; i++) {
				$("#tracklist ul").append("<li>" + resp[i].title + "</li>")
			}
		});
	}
	// function for user playlists
	function getPlaylists() {
		SC.get("/me/playlists", function (resp) {
			for (var i=0; i< resp.length; i++) {
				$("#playlists ul").append("<li>" + resp[i].title + "</li>")
			}
		});
	}
	
});