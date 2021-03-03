module.exports = () => {
  const data = { product: [], addedProducts: [] };
// Create 1000 users
  for (let i = 0; i < 1000; i++) {
    data.product.push({ id: i, name: `product ${i}`, cost: 400 + Math.floor(Math.random() * 99) })
  }
  return data
};