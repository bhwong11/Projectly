console.log($)
//New Board Callback for the /boards page

$("#new-board___btn").one("click", function() {
    $(".main-section___workspace").append("<main class='main-section___newboard'><form class='board-form___newboard' method='POST' action='/boards' ><label for='board-name'>Board name:</label><input type='text' name='name' id='board-name'><button type='submit'>create board</button></form></main>")
});