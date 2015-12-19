$(document).ready(function () {
	// Initialization of SDK
	SC.initialize({
		client_id: "21832d295e3463208d2ed0371ae08791",
		redirect_uri: "mustagheesbutt.github.io/SC_API/callback.html"
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
		});
	});
	
});