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
    square.addEventListener('mouseover', event => {
      event.target.classList.add('painted');
    })

    grid.appendChild(square);
  }
}

sizeSlider.addEventListener('input', event => {
  createGrid(event.target.value);
});

window.addEventListener('load', () => createGrid());