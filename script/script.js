//smooth scrolling
$(document).ready(function(){
	$(".navbar ul li a").click(function(e){
		e.preventDefault();
		var href_val = this.hash;
		$("html").animate({
			scrollTop: $(href_val).offset().top
		},700,function(){
			window.location.hash = href_val;
		})
	})
})


//home animation
$(document).ready(function(){
	setTimeout(function(){
		$(".home-img").addClass("fadeIn")
		$(".hi-text").addClass("fadeInLeft");
		setTimeout(function(){
			$(".home-bigtext").addClass("fadeInRight");
			setTimeout(function(){
				$(".home-smalltext").addClass("fadeIn");
			},400)
		},700)
	},100)
})
//skills coloring
$(document).ready(function() {
    $(".skill-slot").each(function() {
        var color_code = $(this).attr("class").split(" ")[2].split("-")[1];
        color_code = "#" + color_code;
        this.querySelector(".prog-bar").style.backgroundColor = color_code;
        this.querySelector(".skill-icon").style.backgroundColor = color_code;
    })
})

//skills progressing
$(document).ready(function() {

    $(window).scroll(function() {
    	var skills_from_top = $(".skills-section").offset().top - $(window).height();
        if (window.pageYOffset > skills_from_top) {

            var html = $(".skill-html").attr("skill") + "%";
            var css = $(".skill-css").attr("skill") + "%";
            var js = $(".skill-js").attr("skill") + "%";
            var bootstrap = $(".skill-bootstrap").attr("skill") + "%";
            var electron = $(".skill-electron").attr("skill") + "%";
            var php = $(".skill-php").attr("skill") + "%";
            setTimeout(function() {
                $(".skill-html .prog-value").html(html);
                $(".skill-html .prog-bar").animate({
                    "width": html,
                }, 600, function() {
                    $(".skill-css .prog-value").html(css)
                    $(".skill-css .prog-bar").animate({
                        "width": css
                    }, 600, function() {
                        $(".skill-js .prog-value").html(js)
                        $(".skill-js .prog-bar").animate({
                            "width": js
                        }, 600, function() {
                            $(".skill-bootstrap .prog-value").html(bootstrap)
                            $(".skill-bootstrap .prog-bar").animate({
                                "width": bootstrap
                            }, 600, function() {
                                $(".skill-electron .prog-value").html(electron)
                                $(".skill-electron .prog-bar").animate({
                                    "width": electron
                                }, 600, function() {
                                    $(".skill-php .prog-value").html(php)
                                    $(".skill-php .prog-bar").animate({
                                        "width": php
                                    }, 600)
                                })
                            })
                        })
                    })
                })
            }, 500)
        }
        return false;
    })

})


//showing according to window scroll
$(document).ready(function(){
	var transparent_parts = ['education-container',"skill-container","services-brand","services-web",
										"services-software","services-app","services-graphics","services-server"];
	$(transparent_parts).each(function(){
		$("."+this).addClass("transparent animated");
	});
	smoothShow("education-container","fadeInLeft");
	smoothShow("skill-container","fadeInRight");
	smoothShow("services-brand","jackInTheBox");
	smoothShow("services-web","jackInTheBox");
	smoothShow("services-software","jackInTheBox");
	smoothShow("services-app","jackInTheBox");
	smoothShow("services-graphics","jackInTheBox");
	smoothShow("services-server","jackInTheBox");
})

function smoothShow(class_name,effect){
	$(window).scroll(function(){
		var section_from_top = $("."+class_name).offset().top;
		var height = $(window).height();
		var show_time =section_from_top - height+140;
		if(window.pageYOffset > show_time){
			$("."+class_name).addClass(effect);
		}else{
		}
	})
}