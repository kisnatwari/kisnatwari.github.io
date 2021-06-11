//nav for small devices
small_nav();

function small_nav() {
    var nav_btn = document.querySelector('.sm-nav-btn');
    nav_btn.onclick = function() {
        document.querySelector(".nav-sm, .sm-nav-con").style.transitionDuration = "0.4s";
        var nav_con = document.querySelector(".sm-nav-con");
        var nav_list = document.querySelector(".nav-sm");
        nav_con.style.display = "block";
        setTimeout(function() {
            document.querySelector(".sm-nav-con").style.opacity = "1";
            nav_list.style.transform = "translateX(0)";
            document.querySelector(".nav-close-btn").onclick = function() {
                nav_list.style.transform = "translateX(-100%)";
                document.querySelector(".sm-nav-con").style.opacity = "0";
                setTimeout(function() {
                    document.querySelector(".sm-nav-con").style.display = "none";
                }, 350)
            };

            document.querySelector(".nav-sm").onblur = function() {
                nav_list.style.transform = "translateX(-100%)";
                document.querySelector(".sm-nav-con").style.opacity = "0";
                setTimeout(function() {
                    document.querySelector(".sm-nav-con").style.display = "none";
                }, 350)
            }

        }, 100)

    }
}


window.onscroll = function(){
    var elements = document.getElementsByClassName("fadeInUp");
    for(var i = 0; i<elements.length; i++){
        fadeInUp(elements[i]);
    }
    if(this.scrollY > 150)
        document.querySelector(".nav").style.height = "65px";
    else
        document.querySelector(".nav").style.height = "80px";
    increase_num();
}
function fadeInUp(element){
    var scrollY = window.scrollY+(window.innerHeight);
    if((element.offsetTop < window.scrollY+window.innerHeight)  && (element.offsetTop > window.scrollY)){
        element.style.opacity = 1;
        element.style.top = 0;
    }
}