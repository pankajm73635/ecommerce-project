fetch('products.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('product-list');
    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `<h3>item.name</h3><p>₹{item.price}</p><button>Add to Cart</button>`;
      list.appendChild(div);
    });
  });
