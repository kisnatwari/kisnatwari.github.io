window.onload = function() {
        //below code is for loading screen
        $("#loader-con").fadeOut();
        $("#left-slider").animate({
            'width': "0",
            'opacity': '0.3'
        }, 1000)
        $("#right-slider").animate({
            'width': "0",
            'opacity': '0.3'
        }, 1000)
    }
    //predefined players
$(document).ready(function() {
    var loc = location.href;
    if (loc.match("file:///C:/wamp/www")) {
        loc = loc.replace("file:///C:/wamp/www", "http://localhost");
        location.replace(loc);
    }
    //automatically webpage's url will be changed to localhost if it lies inside wamp www folder inside c drive
    var p1 = localStorage.getItem("custom player Player1");
    var p2 = localStorage.getItem("custom player Player2");
    if (p1 == null) {
        var dt = new Date();
        var date_string = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate() + " at " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        var player = {
            name: 'Player1',
            date: date_string
        };
        player = JSON.stringify(player);
        localStorage.setItem("custom player " + 'Player1', player);
    }
    if (p2 == null) {
        var dt = new Date();
        var date_string = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate() + " at " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        var player = {
            name: 'Player2',
            date: date_string
        };
        player = JSON.stringify(player);
        localStorage.setItem("custom player " + 'Player2', player);
    }
    loadPlayerData();
    update_player_selector();
})
$(document).ready(function() {
    $('.single-item').slick({
        dots: true,
        arrows: true,
        autoplay: true,
        prevArrow: "<button class='fa fa-arrow-circle-left prev-arrow'></button>",
        nextArrow: "<button class='fa fa-arrow-circle-right next-arrow'></button>"
    });
    loadPlayerData();
    $("#add-player-btn").click(function() {
        $(this).css("display", "none");
        $("#save-btn").css("display", 'block');
        var row = newElem("TR");
        var td_player_name = newElem("TD");
        var td_created_date = newElem("TD");
        var td_edit = newElem("TD");
        var td_del = newElem("TD");

        var player_name_inp = newElem("INPUT");
        player_name_inp.type = "text";
        player_name_inp.id = "player-name-inp";
        player_name_inp.onkeydown = function(event) {
            if (event.keyCode == 13)
                $("#save-btn").click();
        }

        var del_icn = newElem("i");
        del_icn.className = "fa fa-trash";
        $(del_icn).css({
            "text-align": "center",
            "color": "white",
            "margin": "0 auto",
            'cursor': "pointer",
            "font-size": "30px"
        })
        td_del.append(del_icn);

        var table = $("#players-table");
        table.append(row);
        row.append(td_player_name);
        row.append(td_created_date);
        row.append(td_edit);
        row.append(td_del);
        td_player_name.append(player_name_inp);
        player_name_inp.focus();
        $(del_icn).click(function() {
            row.remove();
            $("#save-btn").css("display", "none");
            $("#add-player-btn").css('display', 'block');
        })
        $("#save-btn").click(function() {
            if (player_name_inp.value != "") {
                $(this).css("display", "none");
                $("#add-player-btn").css('display', 'block');
                var dt = new Date();
                var date_string = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate() + " at " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
                var player = {
                    name: player_name_inp.value,
                    date: date_string
                };
                player = JSON.stringify(player);
                localStorage.setItem("custom player " + player_name_inp.value, player);
                loadPlayerData();
                update_player_selector();
            } else {
                alert("No Player name is available to save the player");
            }
        })
    })
});
$(document).ready(function() {
    $('.parent-closer').click(function() {
        $(this).parent().fadeOut();
    })
    $("#players-btn").click(function() {
        $("#players-con").fadeIn();
    });
    var h1 = '<h1 id="copyright-info">Copyright &copy <a href="https://www.facebook.com/profile.php?id=100008883133980">Krishna Tiwari</a></h1>';
    $("#homepage").append(h1);
    $("#goto-game-btn").click(function() {
        $("#player-chooser").fadeIn();
        $("#game-redirector").click(function() {
            var p1 = document.querySelector("#player1-options").value;
            var p2 = document.querySelector("#player2-options").value;
            if (p1 == p2) {
                alert("Please select different players and proceed");
            } else {
                var data = {
                    p1: p1,
                    p2: p2
                };
                sessionStorage.setItem('players', JSON.stringify(data));
                window.location = "game/game.html";
            }
        })
    })
    $("#history-btn").click(function() {
        $("#game-history").fadeIn();
    })
    $("#instructions").click(function() {
        $("#game-guide").fadeIn();
    })
    $(document).keyup(function(event) {
        if (event.keyCode == 80) {
            if ($("#players-con").css("display") != "block") {
                $(".parent-closer").click();
                $("#players-btn").click();
            }
        }

        if (event.keyCode == 71) {
            if ($("#players-con, #player-chooser, #game-history").css("display") != "block") {
                $(".parent-closer").click();
                $("#goto-game-btn").click();
            }
        }

        if (event.keyCode == 72) {
            if ($("#players-con, #player-chooser, #game-history").css("display") != "block") {
                $(".parent-closer").click();
                $("#history-btn").click();
            }
        }

        if (event.keyCode == 27)
            $(".parent-closer").click();

        if (event.keyCode == 13) {
            if ($("#player-chooser").css("display") == 'block') {
                $("#game-redirector").click();
            }
        }
    })
})

function newElem(itemName) {
    itemName = itemName.toUpperCase();
    var item = document.createElement(itemName);
    return item;
}

function loadPlayerData() {
    var table = $("#players-table");
    var rows = $("#players-table TR");
    var i;
    for (i = 1; i < rows.length; i++) {
        rows[i].remove();
    }
    for (i = 0; i < localStorage.length; i++) {
        var allKeys = localStorage.key(i);
        if (allKeys.match("custom player ")) {
            var row = newElem("TR");
            var td_player_name = newElem("TD");
            var td_created_date = newElem("TD");
            var td_edit = newElem("TD");
            var td_del = newElem("TD");
            var player_name_inp = newElem("INPUT");
            var edit = newElem('I');
            edit.className = 'fa fa-pencil';
            $(edit).css('cursor', 'pointer');

            var del = newElem("I");
            del.className = 'fa fa-trash';
            $(del).css('cursor', 'pointer');

            player_name_inp.type = "text";
            player_name_inp.id = "player-name-inp";
            player_name_inp.disabled = true;

            var p_data = localStorage.getItem(allKeys);
            player_data = JSON.parse(p_data);
            player_name_inp.value = player_data.name;
            $(td_created_date).html(player_data.date);

            table.append(row);
            row.append(td_player_name);
            row.append(td_created_date);
            row.append(td_edit);
            row.append(td_del);
            td_player_name.append(player_name_inp);
            td_edit.append(edit);
            td_del.append(del);

            $(edit).click(function() {
                var input_field = this.parentElement.parentElement.getElementsByTagName('INPUT')[0];
                input_field.disabled = false;
                this.className = 'fa fa-save';
                input_field.focus();
                var prev_val = input_field.value;
                $(this).click(function() {
                    localStorage.removeItem('custom player ' + prev_val);
                    this.className = 'fa fa-pencil';
                    var value = input_field.value;
                    var new_player_data = {
                        name: input_field.value,
                        date: player_data.date
                    }
                    input_field.disabled = true;
                    localStorage.setItem("custom player " + value, JSON.stringify(new_player_data));
                    loadPlayerData();
                    update_player_selector();
                    $("#save-btn").css("display", "none");
                    $("#add-player-btn").css('display', 'block');
                })
            })

            $(del).click(function() {
                var value = this.parentElement.parentElement.getElementsByTagName('INPUT')[0].value;
                var deletedPlayer = this.parentElement.parentElement.getElementsByTagName('INPUT')[0].value;
                if (document.querySelector('#player1-options').innerHTML.match('<option value="' + deletedPlayer + '">' + deletedPlayer + '</option>')) {
                    document.querySelector('#player1-options').innerHTML = document.querySelector('#player1-options').innerHTML.replace('<option value="' + deletedPlayer + '">' + deletedPlayer + '</option>', '');
                    document.querySelector('#player2-options').innerHTML = document.querySelector('#player1-options').innerHTML;
                }
                if (localStorage.getItem("custom player " + value) != null) {
                    localStorage.removeItem("custom player " + value);
                    loadPlayerData();
                } else {
                    alert("custom player " + value + " not found so Failed to delete the player");
                }
            })
        }
    }
}
update_player_selector();

function update_player_selector() {
    var data = [],
        i, j;
    for (i = 0; i < localStorage.length; i++) {
        var all_keys = localStorage.key(i);
        if (all_keys.match('custom player ') != null) {
            var player_info = localStorage.getItem(all_keys);
            player_info = JSON.parse(player_info);
            data[data.length] = player_info.name;
        }
    }
    data = data.sort();
    var choosers = [$('#player1-options'), $('#player2-options')];
    for (i = 0; i < 2; i++) {
        $(choosers[i]).html("");
        for (j = 0; j < data.length; j++) {
            var option = newElem("option");
            option.setAttribute('value', data[j]);
            $(option).html(document.createTextNode(data[j]));
            choosers[i].append(option);
        }
        if (data.length > 1) {
            $(choosers[0]).val(data[0]);
            $(choosers[1]).val(data[1]);
        }
    }
}

game_history();

function game_history() {
    var data = [],
        i, j;
    for (i = 0; i < localStorage.length; i++) {
        var all_keys = localStorage.key(i);
        if (all_keys.match('buddhichal_game_'))
            data[data.length] = Number(all_keys.replace('buddhichal_game_', ''));
    }
    data = data.sort((a, b) => a - b);
    //above 6 lines of code is required to sort data in alphabetical order
    for (i = 0; i < data.length; i++) {
        var table = $("#history-table");
        var row = newElem("tr");
        var timeCol = newElem('td');
        var playersCol = newElem('td');
        var winnerCol = newElem('td');
        var durationCol = newElem('td');
        var movesCol = newElem('td');

        var game_storage = localStorage.getItem("buddhichal_game_" + data[i]);
        var gameData = JSON.parse(game_storage);
        $(timeCol).html(gameData.date_time);
        $(playersCol).html(gameData.players);
        $(winnerCol).html(gameData.winner);
        $(durationCol).html(gameData.time);
        $(movesCol).html(gameData.moves);

        table.append(row);
        row.append(timeCol);
        row.append(playersCol);
        row.append(winnerCol);
        row.append(durationCol);
        row.append(movesCol);
    }
}