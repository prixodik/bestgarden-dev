
$(document).ready(function () {

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

	$(document).on("click", ".js-popup-show", function(){ 
		var href = $(this).attr("href");
		/*if(href == "/zayavka-na-zamer"){
			href = "#zamer-popup";
		}*/

		if( $(href).find('.js-timer').length ){
			var fiveMinutes = 30,
		        display = document.querySelector('.js-timer');
		    startTimer(fiveMinutes, display);
		}

		var bodyWidth = $('body').width();

		$("body").addClass("overflow");
			
			if( bodyWidth - $(document).width() < 0){
				$('body').css('padding-right',((bodyWidth - $(document).width())* -1)+'px');
			}

		//$(".mobile-menu").removeClass("active");

		if( $(href).find('.js-timer-confirmation').length > 0){
			var fiveMinutes = 180,
		        display = document.querySelector('.js-timer-confirmation');
		    startTimer(fiveMinutes, display);
		    setTimeout(function(){
		    	$(".js-popup-hide").trigger('click');
		    },180000);
		}

		$(".popup").removeClass("active");
		$(href).addClass("active");

		return false;
	});

	$(".js-popup-hide").click(function(){
		$(".popup").removeClass("active");
		$("body").css('padding-right',0).removeClass("overflow");
		return false;
	});



});


