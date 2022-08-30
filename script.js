const grid = document.getElementById('grid');
const sizeSlider = document.getElementById('sizeSlider');

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
    square.addEventListener('click', event => {
      event.target.classList.add('painted');
    })

    grid.appendChild(square);
  }
}

grid.addEventListener('mousedown', event => {
  if (event.button === 0) {
    grid.querySelectorAll('div').forEach(square => {
      square.addEventListener('mouseover', paintSquare);
    });
  }
});

function paintSquare(event) {
  if (event.buttons === 0) {
    grid.querySelectorAll('div').forEach(square => {
      square.removeEventListener('mouseover', paintSquare);
    });
  } else {
    event.target.classList.add('painted');
  }
}

sizeSlider.addEventListener('input', event => {
  createGrid(event.target.value);
  document.querySelectorAll('#grid>div').forEach(element => {
    element.classList.add('bordered');
  });
});

sizeSlider.addEventListener('mouseup', () => {
  document.querySelectorAll('#grid>div').forEach(element => {
    element.classList.remove('bordered');
  });
});

window.addEventListener('load', () => createGrid());