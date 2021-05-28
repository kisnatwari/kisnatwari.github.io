window.onload = function() {
getSavedImg();
switch_mode();
}


function getSavedImg() {
    if (localStorage.getItem("light_img") != null && localStorage.getItem("dark_img") != null && localStorage.getItem("img_1") != null && localStorage.getItem("img_2") != null) {
        if ($(".mode-switch").attr("mode") == "dark") {
            $(".home-img").attr("src", localStorage.getItem("dark_img"));
        } else {
            $(".home-img").attr("src", localStorage.getItem("light_img"));
        }
        $(".bg-img-1").css("backgroundImage", "url(" + localStorage.getItem("img_1") + ")");
        $(".bg-img-2").css("backgroundImage", "url(" + localStorage.getItem("img_2") + ")");
    } else{
        var img = new Image();
        img.src = "images/img-light-green-1.png";
        $(img).on("load", function(e) {
            var data_url = getDataUrl(event.currentTarget);
            localStorage.setItem("light_img", data_url);
            console.log("Image 1 loaded");
            img = new Image();
            img.src = "images/img-dark-blue.png";
            $(img).on("load", function(e) {
                data_url = getDataUrl(event.currentTarget);
                localStorage.setItem("dark_img", data_url);
                console.log("Image 2 loaded");
                img = new Image();
                img.src = "images/20210220_000849.jpg";
                $(img).on("load", function(e) {
                    data_url = getDataUrl(event.currentTarget);
                    localStorage.setItem("img_1", data_url);
                    console.log("Image 3 loaded");
                    img = new Image();
                    img.src = "images/me.jpg";
                    $(img).on("load", function(e) {
                        data_url = getDataUrl(event.currentTarget);
                        localStorage.setItem("img_2", data_url);
                        console.log("Image 4 loaded");
                        localStorage.setItem("photo_date", new Date());
                        if ($(".mode-switch").attr("mode") == "dark") {
                            $(".home-img").attr("src", localStorage.getItem("dark_img"));
                        } else {
                            $(".home-img").attr("src", localStorage.getItem("light_img"));
                        }
                        $(".bg-img-1").css("backgroundImage", "url(" + localStorage.getItem("img_1") + ")");
                        $(".bg-img-2").css("backgroundImage", "url(" + localStorage.getItem("img_2") + ")");
                    })
                })
            })
        })
    }
}


//saving images for faster experience
function getDataUrl(img) {
    // Create canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    // Set width and height
    canvas.width = img.width;
    canvas.height = img.height;
    // Draw the image
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/jpeg');
}

//smooth scrolling
$(document).ready(function() {
    $(".navbar ul li a").click(function(e) {
        e.preventDefault();
        var href_val = this.hash;
        $("html").animate({
            scrollTop: $(href_val).offset().top
        }, 700, function() {
            window.location.hash = href_val;
        })
    })
})


//home animation
$(document).ready(function() {
        setTimeout(function() {
            $(".home-img").addClass("fadeIn")
            $(".hi-text").addClass("fadeInLeft");
            setTimeout(function() {
                $(".home-bigtext").addClass("fadeInRight");
                setTimeout(function() {
                    $(".home-smalltext").addClass("fadeIn");
                    setTimeout(function() {
                        $(".more_btn").addClass("fadeInUp");
                    }, 400)
                }, 400)
            }, 700)
        }, 100)
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
$(document).ready(function() {
    var transparent_parts = ['education-container', "skill-container", "services-brand", "services-web",
        "services-software", "services-app", "services-graphics", "services-server"
    ];
    $(transparent_parts).each(function() {
        $("." + this).addClass("transparent animated");
    });
    smoothShow("education-container", "fadeInRight");
    smoothShow("skill-container", "fadeInLeft");
    smoothShow("services-brand", "jackInTheBox");
    smoothShow("services-web", "jackInTheBox");
    smoothShow("services-software", "jackInTheBox");
    smoothShow("services-app", "jackInTheBox");
    smoothShow("services-graphics", "jackInTheBox");
    smoothShow("services-server", "jackInTheBox");
})

function smoothShow(class_name, effect) {
    $(window).scroll(function() {
        var section_from_top = $("." + class_name).offset().top;
        var height = $(window).height();
        var show_time = section_from_top - height + 140;
        if (window.pageYOffset > show_time) {
            $("." + class_name).addClass(effect);
        } else {}
    })
}

function switch_mode() {
    $(".mode-switch").draggable();
    $(".mode-switch").click(function() {
        var mode = $(this).attr("mode");
        if (mode == "dark") {
            $(this).attr("mode", "light");
            $(".home-img").attr("src", localStorage.getItem("light_img"));
            $("#mode").attr("href", "style/white.css");
            $(".mode-switch i").css({
                "color": "#191623",
                "transform": "rotate(180deg)",
                "transitionDuration": "0.5s"
            });
        } else if (mode == "light") {
            $(this).attr("mode", "dark");
            $(".home-img").attr("src",  localStorage.getItem("dark_img"));
            $("#mode").attr("href", "style/dark.css");
            $(".mode-switch i").css({
                "color": "#ECFFF4",
                "transform": "rotate(0deg)",
                "transitionDuration": "0.5s"
            });
        }

    })
};
