const grid = document.getElementById('grid');
const button = document.querySelector('button');

function createGrid(size) {
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

button.addEventListener('click', () => {
  let size = prompt('Please type in the new grid dimensions (max is 100)');
  if (size > 0 && size <= 100) createGrid(size);
})

createGrid(16);