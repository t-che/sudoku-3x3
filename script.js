document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const checkButton = document.getElementById('checkButton');
    const message = document.getElementById('message');

    // Создаем пустую сетку судоку (все значения 0)
    const initialGrid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    let currentGrid = initialGrid.map(row => [...row]);

    function createGrid() {
        grid.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');

                const input = document.createElement('input');
                input.type = 'number';
                input.min = '1';
                input.max = '3';
                input.addEventListener('input', (event) => {
                    const value = parseInt(event.target.value);
                    if(isNaN(value)){
                        event.target.value = "";
                        currentGrid[i][j] = 0;
                     } else if (value < 1 || value > 3) {
                          event.target.value = "";
                         currentGrid[i][j] = 0;
                     } else {
                        currentGrid[i][j] = value;
                    }
                });
                cell.appendChild(input);
                grid.appendChild(cell);
            }
        }
    }

    function checkSolution() {
        // Проверка на незаполненные клетки
        for (let row of currentGrid) {
            for (let cell of row) {
                if (cell === 0) {
                    message.textContent = 'Пожалуйста, заполните все ячейки.';
                    return false; // Если нашли пустую ячейку, сразу возвращаем false
                }
            }
        }

         // Проверка строк
        for (let row of currentGrid) {
            const numbers = row.filter(num => num !== 0);
             if (numbers.length !== new Set(numbers).size) {
                message.textContent = 'Неправильное решение! Проверьте строки.';
                return false;
            }
             if (numbers.some(num => num < 1 || num > 3)) {
                 message.textContent = 'Неправильное решение! Вводите числа от 1 до 3.';
                 return false;
            }
        }

        // Проверка столбцов
        for (let j = 0; j < 3; j++) {
             const column = currentGrid.map(row => row[j]).filter(num => num !== 0);
           if (column.length !== new Set(column).size) {
                message.textContent = 'Неправильное решение! Проверьте столбцы.';
                return false;
            }
              if (column.some(num => num < 1 || num > 3)) {
                 message.textContent = 'Неправильное решение! Вводите числа от 1 до 3.';
                   return false;
            }
        }

        message.textContent = 'Поздравляю! Вы решили судоку правильно!';
        return true;
    }

    createGrid();
    checkButton.addEventListener('click', checkSolution);
});