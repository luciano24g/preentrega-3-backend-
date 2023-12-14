const socket = io();


socket.on('product-list-update', (updatedProducts) => {
 
  console.log('Product list updated:', updatedProducts);

});