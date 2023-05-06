// Tableau représentant la grille de jeu
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// Variables pour contrôler le jeu
let currentPlayer = 'X'; // Joueur courant ('X' ou 'O')
let round = 1; // Manche en cours (1, 2 ou 3)
let scoreP1 = 0; // Score du joueur 1
let scoreP2 = 0; // Score du joueur 2

// Fonction pour gérer les clics sur les cellules
function makeMove(row, col) {
    // Si la cellule est vide et la partie n'est pas terminée
    if (board[row][col] === '' && !isGameOver()) {
        // Met à jour le tableau avec le symbole du joueur courant
        board[row][col] = currentPlayer;

        // Met à jour l'affichage de la cellule
        document.getElementById('gameBoard').children[row].children[col].innerText = currentPlayer;

        // Vérifie si le joueur courant a gagné
        if (hasWon(currentPlayer)) {
            // Met à jour le score et l'affichage
            if (currentPlayer === 'X') {
                scoreP1++;
                document.getElementById('scoreP1').innerText = scoreP1;
            } else {
                scoreP2++;
                document.getElementById('scoreP2').innerText = scoreP2;
            }

            // Passe à la manche suivante ou termine le jeu
            nextRoundOrGameOver();
        } else {
            // Change de joueur et met à jour l'affichage du tour
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('playerTurn').innerText = `Au tour de Joueur ${currentPlayer === 'X' ? '1' : '2'} (${currentPlayer})`;
        }
    }
}

// Fonction pour vérifier si un joueur a gagné
function hasWon(player) {
    // Vérifie les lignes, les colonnes et les diagonales
    for (let i = 0; i < 3; i++) {
        if (
            (board[i][0] === player && board[i][1] === player && board[i][2] === player) ||
            (board[0][i] === player && board[1][i] === player && board[2][i] === player)
        ) {
            return true;
        }
    }

    // Vérifie les diagonales
    if (
        (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
        (board[0][2] === player && board[1][1] === player && board[2][0] === player)
    ) {
        return true;
    }

    return false;
}

// Fonction pour passer à la manche suivante ou terminer le jeu
function nextRoundOrGameOver() {
    if (round < 3) {
        round++;
        document.getElementById('round').innerText = round;
        currentPlayer = 'X';
        resetBoard();
    } else {
        alert("La partie est terminée. Le score final est :\n\nJoueur 1 (X) : " + scoreP1 + "\nJoueur 2 (O) : " + scoreP2);
        resetGame();
    }
}

// Fonction pour vérifier si la partie est terminée
function isGameOver() {
    return round > 3;
}

// Fonction pour réinitialiser le tableau
function resetBoard() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }
}

// Fonction pour réinitialiser le jeu
function resetGame() {
    round = 1;
    scoreP1 = 0;
    scoreP2 = 0;
    document.getElementById('round').innerText = round;
    document.getElementById('scoreP1').innerText = scoreP1;
    document.getElementById('scoreP2').innerText = scoreP2;
    currentPlayer = 'X';
    resetBoard();
}
