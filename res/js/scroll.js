$(document).ready(function() {
	$("a.footerlinks").click(function(event) {
		event.preventDefault(); // Prevent the site to instantly jump to defined href
		$("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top - 71.5 }, 500);
		// animated scroll: the defined id in the href --> horizontal offset from top minus the height of the navbar
	});
	// test if content has benn scrolled for 200 px --> if yes display Button #topBtn
	window.onscroll = function() {
		if (document.documentElement.scrollTop > 200) {
			document.getElementById("topBtn").style.display = "block";
		} else {
			document.getElementById("topBtn").style.display = "none";
		}
	};
	// if button #topBtn is clicked scroll to top of the page
	$("#topBtn").click(function() {
		$("html, body").animate({ scrollTop: 0 }, 500);
	});
});
