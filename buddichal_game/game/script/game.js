window.onload = function() {
    if (sessionStorage.getItem('players') != null) {
        var players = sessionStorage.getItem('players');
        players = JSON.parse(players);
        $("#player-names").html('p1: ' + players.p1 + "<br>p2: " + players.p2);
    } else {
        location.replace("../index.html");
    }
    $("#loader-con").fadeOut();
    $("#left-slider").animate({
        'width': "0",
        'opacity': '0.3'
    }, 700)
    $("#right-slider").animate({
        'width': "0",
        'opacity': '0.3'
    }, 700)
    window.loaded = true;
}
window.loaded = false;
// function to hide loading screen
$(document).ready(function() {
    $("#cancel-loading").click(function() {
        window.loaded = true;
        $("#loader-con").fadeOut();
        $("#left-slider").animate({
            'width': "0",
            'opacity': '0.3'
        }, 700)
        $("#right-slider").animate({
            'width': "0",
            'opacity': '0.3'
        }, 700)
    })
})
$(document).ready(function() { // coding of arrow which shows players and time and moves in gameplay
    var toggler = $("#toggler");
    var detail_con = $("#game-details");
    $(toggler).click(function() {
        var display = $("#player-names").css("display");
        if (display == "none") {
            $("#player-names,#time-move").show(300);
            $(this).css('transform', 'rotate(-180deg)');
            this.style.transitionDuration = "0.5s";
        } else {
            $("#player-names,#time-move").hide(250);
            $(this).css('transform', 'rotate(0deg)');
        }
    })
})

$(document).ready(function() {
    var i = 0;
    var gamePlayTime = -1;
    setInterval(function() {
        if (window.loaded == true)
            gamePlayTime++;
        $("#time").html("Time: " + gamePlayTime + " sec");
    }, 1000);
    var times = 0;
    var dt = new Date();
    var date_time = dt.toLocaleDateString() + " at " + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
    var players = sessionStorage.getItem('players');
    players = JSON.parse(players);
    var game_number = 1;
    var keys = [];
    for (i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.match('buddhichal_game_')) {
            keys[keys.length] = Number(key.replace("buddhichal_game_", ''));
        }
    }
    keys = keys.sort(function(a, b) {
        return a - b
    });
    if (keys.length != 0) {
        game_number = keys[keys.length - 1] + 1;
    }
    var game_store_name = 'buddhichal_game_' + game_number;
    console.log(keys);
    var gamePlay = {
        date_time: date_time,
        players: players.p1 + " vs " + players.p2,
        winner: "Game incomplete",
        time: gamePlayTime,
        moves: times
    }
    localStorage.setItem(game_store_name, JSON.stringify(gamePlay))
    $(".places").droppable({
        accept: ".token",
        drop: function(event, ui) {
            if (this.childNodes.length == 0) {
                $(ui.draggable).css({
                    "width": "100%",
                    "height": "100%",
                    'position': "initial"
                });
                times++;
                $("#moves").html(times);
                $(this).append(ui.draggable);
                $(ui.draggable).addClass('placed');
                $(".places").droppable({
                    disabled: false
                })
                if ($(ui.draggable).hasClass("p1")) {
                    $('.p1').draggable({
                        disabled: true,
                    })
                    $('.p2').draggable({
                        disabled: false,
                    })
                } else {
                    $('.p1').draggable({
                        disabled: false,
                    })
                    $('.p2').draggable({
                        disabled: true,
                    })
                }
                if (times < 6) {
                    $(".placed").draggable({
                        disabled: true
                    })
                }
                console.log(times);
                if (times > 6) {
                    var winning_lines = [
                        '.top-left,.center-left,.bottom-left',
                        '.top-mid,.center-mid,.bottom-mid',
                        '.top-right,.center-right,.bottom-right',
                        '.top-left,.top-mid,.top-right',
                        '.center-left,.center-mid,.center-right',
                        '.bottom-left,.bottom-mid,.bottom-right',
                        '.top-left,.center-mid,.bottom-right',
                        '.top-right,.center-mid,.bottom-left'
                    ];
                    var player = $(ui.draggable).attr('class').split(" ")[1];

                    $player_class = $(ui.draggable).attr("class").split(" ")[1];
                    var player_con = $('.' + $player_class);
                    var places = '';
                    for (var i = 0; i < player_con.length; i++) {
                        places += (player_con[i].parentElement.className.split(" ")[1] + ", ");
                    }
                    setTimeout(function() {
                        for (var i = 0; i < winning_lines.length; i++) {
                            if (winning_lines[i].match(player_con[0].parentElement.className.split(" ")[1]) != null) {
                                if (winning_lines[i].match(player_con[1].parentElement.className.split(" ")[1]) != null) {
                                    if (winning_lines[i].match(player_con[2].parentElement.className.split(" ")[1]) != null) {
                                        var winner = player_con[0].className.split(" ")[1];
                                        var sessionData = sessionStorage.getItem("players");
                                        sessionData = JSON.parse(sessionData);
                                        winner = sessionData[winner];
                                        gamePlay = {
                                            date_time: date_time,
                                            players: players.p1 + " vs " + players.p2,
                                            winner: winner,
                                            time: gamePlayTime,
                                            moves: times
                                        }
                                        localStorage.setItem(game_store_name, JSON.stringify(gamePlay))
                                        game_finished(gamePlay);
                                    }
                                }
                            }
                        }
                    }, 300);
                }
            }
        }
    });
    $(".token").draggable({
        opacity: 0.7,
        disabled: false,
        snap: '.places',
        helper: function() {
            var col = $(this).css('background');
            var child = $(this).children();
            return "<div style='background: " + col + "; width: 50px; height: 50px;border-radius: 10px; " +
                "display: flex; align-items: center; justify-content: center; font-weight: bold;" +
                " user-select: none; color: " + $(this).css('color') + "'>" + this.innerHTML + "</div>"
        },
        snapMode: 'inner',
        snapTolerance: 50,
        revert: 'invalid',
        revertDuration: 400,
        start: function(event, ui) {
            if (times == 4 || times == 5) {
                //$("#player-ins").html("Remember: You cannot win directly only by putting the tokens");
                var elem = this.className.split(" ")[1];
                var similarElem = document.getElementsByClassName(elem);
                var elem1Class = [similarElem[0].parentElement.className.split(" ")[2], similarElem[0].parentElement.className.split(" ")[3]];
                var elem2Class = [similarElem[1].parentElement.className.split(" ")[2], similarElem[1].parentElement.className.split(" ")[3]];
                var elem1Place = similarElem[0].parentElement.className.split(" ")[1];
                var elem2Place = similarElem[1].parentElement.className.split(" ")[1];
                var i;
                if (elem1Class[0] == elem2Class[0]) { //aborting horizontal match on first three move
                    $("." + elem1Class[0]).droppable({
                        disabled: true
                    })
                }
                if (elem1Class[1] == elem2Class[1]) { //aborting vertical match on first three move
                    $("." + elem1Class[1]).droppable({
                        disabled: true
                    })
                }

                //diagonal checkout starts here
                var diagonal_possiblities = {
                    left_to_right: ['top-left=center-mid+bottom-right', 'center-mid=top-left+bottom-right', 'bottom-right=top-left+center-mid'],
                    right_to_left: ['top-right=center-mid+bottom-left', 'center-mid=top-right+bottom-left', 'bottom-left=top-right+center-mid']
                };
                var diagonals = [diagonal_possiblities.left_to_right, diagonal_possiblities.right_to_left];
                for (var i = 0; i < diagonals.length; i++) {
                    var array = diagonals[i];
                    for (var j = 0; j < array.length; j++) {
                        var side1 = array[j].split("=")[0];
                        var side2 = array[j].split("=")[1].split("+");

                        if (elem1Place == side1) {
                            if (elem2Place == side2[0] || elem2Place == side2[1]) {
                                $("." + side2[0] + ", ." + side2[1]).droppable({
                                    disabled: true
                                })
                            }
                        }
                    }
                }
            }
            if (times >= 6) {
                $(".places").droppable({
                    disabled: true,
                })
                var moves = {
                    top_left: ['.top-mid', '.center-left', '.center-mid'],
                    top_mid: ['.top-left', '.top-right', '.center-mid'],
                    top_right: ['.top-mid', '.center-right', '.center-mid'],
                    center_left: ['.top-left', '.bottom-left', '.center-mid'],
                    center_right: ['.top-right', '.bottom-right', '.center-mid'],
                    bottom_left: ['.bottom-mid', '.center-left', '.center-mid'],
                    bottom_mid: ['.bottom-left', '.bottom-right', '.center-mid'],
                    bottom_right: ['.bottom-mid', '.center-right', '.center-mid'],
                    center_mid: ['.top-left', '.top-mid', '.top-right', '.center-left', '.center-mid', '.center-right', '.bottom-left', '.bottom-mid', '.bottom-right']
                }
                var thisConClass = this.parentElement.className.split(" ")[1].replace("-", '_');
                var i;
                var value = moves[thisConClass];
                for (i = 0; i < value.length; i++) {
                    if (document.querySelector(value[i]).childNodes.length == 0) {
                        $(value[i]).droppable({
                            disabled: false,
                        })
                        $(value[i]).css("animation", "filter_animation 0.5s infinite forwards");
                    }
                }
            }
        },
        stop: function(event, ui) {
            $(".places").css('animation', 'none');
        }
    })
})

function game_finished(gameplay) {
    var container = $("#game-finish-alert");
    var dialogBox = $("#game-detail-dialog");
    $("#game-players").html(gameplay.players);
    $("#winner-span").html(gameplay.winner);
    $("#time-span").html(gameplay.time + " sec");
    $("#moves-span").html(gameplay.moves + " moves");
    container.fadeIn(500, function() {
        dialogBox.fadeIn(400);
    });
    $("#btn-replay").click(function() {
        window.location = location.href;
    })
    $("#btn-back").click(function() {
        sessionStorage.clear();
        location.replace("../index.html");
    })
    container.click();
    document.onkeyup = function(event) {
        if (event.keyCode == 27) {
            sessionStorage.clear();
            location.assign("../index.html");
        }
    }
}