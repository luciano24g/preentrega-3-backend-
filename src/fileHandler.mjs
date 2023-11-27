import fs from 'fs';

function loadProductsFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al cargar productos:', err.message);
    return [];
  }
}

function saveProductsToFile(filePath, products) {
  try {
    const data = JSON.stringify(products);
    fs.writeFileSync(filePath, data);
  } catch (err) {
    console.error('Error al guardar productos:', err.message);
  }
}

export { loadProductsFromFile, saveProductsToFile };
