var counter = 0;
function drop(e) {
    getDataFromEvent(e)
    containerIsActive()
    preventDrag(e)

    let targetCellOnBoard = $(e.target).attr('id')

    if (e.target.id != 'emptyBox') {
        CheckForWinner(targetCellOnBoard)
    }
}

function allowDrop(e) {
    e.preventDefault()
}

function drag(e) {
    e.dataTransfer.setData("text", e.target.id)
    containerIsActive()
}

function containerIsActive() {
    let figureBoard = $('#table')
    let board = $('#board')
    let boxIsEmpty = $('#emptyBox').children().length === 0
   
    if (boxIsEmpty) {
        $(figureBoard).css('pointer-events', '')
        $(board).css('pointer-events', 'none')
    } else {
        $(figureBoard).css('pointer-events', 'none')
        $(board).css('pointer-events', '')
    }
}

function getDataFromEvent(e) {
    e.preventDefault()
    var data = e.dataTransfer.getData("text")
    e.target.appendChild(document.getElementById(data))
}

function preventDrag(e) {
    let getAllBoardDivs = document.querySelectorAll('#board tbody div')
    for (let div of getAllBoardDivs) {
        if (div.innerHTML !== '') {
            div.firstChild.setAttribute('draggable', 'false')
            $(div).attr({ "dropOnTable": "", "ondragover": "" })
        }
    }
}

function CheckForWinner(currentCell) {
    counter++

    let firstPlayer = $('#first')
    let secondPlayer = $('#second')

    let firstPlayerOnTurn = $('#firstPick')
    let secondPlayerOnTurn = $('#secondPick')

    if (counter % 2 == 0) {
        $(secondPlayer).css('display', '')
        $(firstPlayer).css('display', 'none')
        $(secondPlayerOnTurn).css('display', 'none')
        $(firstPlayerOnTurn).css('display', '')
    }
    else {
        $(secondPlayer).css('display', 'none')
        $(firstPlayer).css('display', '')
        $(secondPlayerOnTurn).css('display', '')
        $(firstPlayerOnTurn).css('display', 'none')
    }

    let boardRows = document.querySelectorAll('#board tbody tr')

    let matrix = []
    let verticalRowChecker = []
    let winner = false
    
    let targetRowIndex = Math.floor(Number(currentCell) / 4)
    let targetCollIndex = (Number(currentCell)) % 4

    for (let currentRowIndex = 0; currentRowIndex < 4; currentRowIndex++) {
        matrix[currentRowIndex] = []
        currentRow = boardRows[currentRowIndex].getElementsByTagName('td')

        for (var currentColIndex = 0; currentColIndex < 4; currentColIndex++) {
            if (currentRow[currentColIndex].getElementsByTagName('img')[0] != undefined) {
                matrix[currentRowIndex][currentColIndex] = currentRow[currentColIndex].getElementsByTagName('img')[0].id
            }
        }
    }
    checkTotheSides()

    checkVertical()
    // TODO: checkDiagonals()
    
    if (counter == 16) {
        winner = true;
    }

    if (winner) {
        winnerEvent()
    }
    function checkDiagonals() {
        // TODO: checkDiagonalDexter()
        // TODO: checkDiagonalSinister()
    }
    function checkVertical() {
        for (let i = 0; i < 4; i++) {
            if (matrix[i][targetCollIndex] != undefined) {
                verticalRowChecker.push(matrix[i][targetCollIndex])
            }
        }

        firstPropA = []
        secondPropA = []
        thirdPropA = []
        fourthPropA = []

        for (let target of verticalRowChecker) {
            if (target != undefined) {
                firstPropA.push(target.charAt(0))
            }
        }
        for (let target of verticalRowChecker) {
            if (target != undefined) {
                secondPropA.push(target.charAt(1))
            }
        }
        for (let target of verticalRowChecker) {
            if (target != undefined) {
                thirdPropA.push(target.charAt(2))
            }
        }
        for (let target of verticalRowChecker) {
            if (target != undefined) {
                fourthPropA.push(target.charAt(3))
            }
        }
        checkForWinnerHorizontal(firstPropA)
        checkForWinnerHorizontal(secondPropA)
        checkForWinnerHorizontal(thirdPropA)
        checkForWinnerHorizontal(fourthPropA)
    }
    function checkTotheSides() {

        firstProp = []
        secondProp = []
        thirdProp = []
        fourthProp = []

        for (let target of matrix[targetRowIndex]) {
            if (target != undefined) {
                firstProp.push(target.charAt(0))
            }
        }
        for (let target of matrix[targetRowIndex]) {
            if (target != undefined) {
                secondProp.push(target.charAt(1))
            }
        }
        for (let target of matrix[targetRowIndex]) {
            if (target != undefined) {
                thirdProp.push(target.charAt(2))
            }
        }
        for (let target of matrix[targetRowIndex]) {
            if (target != undefined) {
                fourthProp.push(target.charAt(3))
            }
        }
        checkForWinnerHorizontal(firstProp)
        checkForWinnerHorizontal(secondProp)
        checkForWinnerHorizontal(thirdProp)
        checkForWinnerHorizontal(fourthProp)
    }

    function checkForWinnerHorizontal(arr) {
        if (arr.filter((value, index, arr) => {
            if (value == arr[0]) {
                return value
            }
        }).length == 4) {
            winner = true
        }
    }
}

function winnerEvent() {
   
    let container = $('#table')
    let board = $('#board')
    $(board).css('pointer-events', 'none')
    $(container).css('pointer-events', 'none')
    $("#gameEnd").click()
}

