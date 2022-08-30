const grid = document.getElementById('grid');
const sizeSlider = document.getElementById('sizeSlider');
const clearButton = document.getElementById('clearButton');
const brushModes = document.querySelector('div.mode-container');
const brushColorSelect = document.getElementById('brushColorSelect');
const backgroundColorSelect = document.getElementById('backgroundColorSelect');

const rainbowColors = 
['red', 'orange', 'yellow', 'greenyellow', 'green', 'blue', 'indigo', 'purple'];
let rainbowCounter = 0;

let brushMode = 'singleColor';
let brushColor = '#000000';

function createGrid(size = 16) {
  // Show grid size in text format
  document.querySelector('p#gridSize').textContent = `${size} x ${size}`;

  // Set nb of square per rows and columns accordingly to size
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  // Clear grid content
  grid.innerHTML = '';

  // Create squares and add to grid
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');

    square.classList.add('square');
    square.addEventListener('click', paintSquare);

    grid.appendChild(square);
  }
}

grid.addEventListener('mousedown', event => {
  if (event.button === 0) {
    grid.querySelectorAll('div').forEach(square => {
      square.addEventListener('mouseover', isDragging);
    });
  }
});

function isDragging(event) {
  if (event.buttons === 0) {
    grid.querySelectorAll('div').forEach(square => {
      square.removeEventListener('mouseover', isDragging);
    });
  } else {paintSquare(event);}
}

function paintSquare(event) {
  switch (brushMode) {
    case 'singleColor':
      event.target.style.backgroundColor = brushColor;
      break;
    case 'eraser':
      event.target.style.backgroundColor = '';
      break;
    case 'rainbow':
      if (rainbowCounter === rainbowColors.length) {
        rainbowCounter = 0;
      }
      event.target.style.backgroundColor = rainbowColors[rainbowCounter];
      rainbowCounter++;
      break;
  }
}

function clearGrid() {
  if (backgroundColorSelect.value !== '#ffffff') {
    backgroundColorSelect.value = '#ffffff';
  }
  if (grid.style.backgroundColor !== '#ffffff') {
    grid.style.backgroundColor = '#ffffff';
  }
  grid.querySelectorAll('div').forEach(square => {
    square.style.backgroundColor = '';
  })
}

sizeSlider.addEventListener('input', event => {
  createGrid(event.target.value);
  document.querySelectorAll('#grid>div').forEach(square => {
    square.classList.add('bordered');
  });
});

sizeSlider.addEventListener('mouseup', () => {
  document.querySelectorAll('#grid>div').forEach(square => {
    square.classList.remove('bordered');
  });
});

brushModes.addEventListener('change', event => brushMode = event.target.value);

brushColorSelect.addEventListener('change', event => brushColor = event.target.value);

backgroundColorSelect.addEventListener('input', event => grid.style.backgroundColor = event.target.value);

clearButton.addEventListener('click', clearGrid);

window.addEventListener('load', () => createGrid());