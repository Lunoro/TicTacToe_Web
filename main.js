var board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

var gameActive = true;

/*

Listens to all clicks on buttons, checks if the game is active.

*/
document.addEventListener("click", function (event) {
    if(!gameActive) {
        return;
    }

    target = event.target
    if (target.id == "") {
        return
    }

    markButton(target.id);
})

var currentTurn = 0

/*

Marks the buttons and fire's the command to end the game if a winner was found.

*/
function markButton(id) {
    var button = document.getElementById(id);
    var x = id.split(",")[0], y = id.split(",")[1]
    var color = "green";

    if (board[x][y] != "") {
        return;
    }

    changeHeadline();
    if (currentTurn % 2) {
        color = "red";
    }

    board[x][y] = color;

    button.style.backgroundColor = color;
    currentTurn++;
    finishGame(color);
}

/*

Changes the h1 Headline to the turn

*/
function changeHeadline() {

    var turnOf = "Turn of: Green"
    if (!(currentTurn % 2)) {
        turnOf = "Turn of: Red"
    }
    document.getElementById("H1").innerHTML = turnOf
}

/*

Searches for winning patterns in the 2d array

*/
function findWinnerIfPresent(color) {
    // left -> right
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] != color) {
                break;
            }
            if (j == 2) {
                return color;
            }
        }
    }
    // up -> down
    for (var j = 0; j < 3; j++) {
        for (var i = 0; i < 3; i++) {
            if (board[i][j] != color) {
                break;
            }
            if (i == 2) {
                return color;
            }
        }
    }
    //across left -> right
    if (board[0][0] == color && board[1][1] == color && board[2][2] == color) {
        return color;
    }
    // across right -> left
    if (board[0][2] == color && board[1][1] == color && board[2][0] == color) {
        return color;
    }
    return null;
}

/*

Checks if a player has won the game and ends the game if so.

*/
function finishGame(color) {
    winner = findWinnerIfPresent(color);
    message = winner + " won the game. gz | Website refreshes in 3 seconds automatically.";
    console.log(allButtonsPressed())

    if(allButtonsPressed() && winner == null) {
        message = "It's a draw. | Website refreshes in 3 seconds automatically.";
        winner = "";
    }

    if (winner == null) {
        return;
    }

    gameActive = false;
    document.getElementById("H1").innerHTML = capitalizeFirstLetter(message);;
    setTimeout(refreshSite, 3000);
}

function refreshSite() {
    document.location.reload()
}

function allButtonsPressed() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] == "") {
                return false;
            }
        }
    }
    return true;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}