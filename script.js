// Load products from products.json
fetch('data/products.json')
  .then(response => response.json())
  .then(products => {
    const categories = ['All', ...new Set(products.map(p => p.category))];
    const categoryMenu = document.getElementById('category-menu');
    const productList = document.getElementById('product-list');

    function displayProducts(filter) {
      productList.innerHTML = '';
      products
        .filter(p => filter === 'All' || p.category === filter)
        .forEach(p => {
          const div = document.createElement('div');
          div.className = 'product';
          div.innerHTML = `
            <img src="${p.image}" alt="${p.name}" />
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
            <p>${p.desc}</p>
          `;
          productList.appendChild(div);
        });
    }

    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.textContent = cat;
      btn.onclick = () => {
        document.querySelectorAll('#category-menu button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        displayProducts(cat);
      };
      categoryMenu.appendChild(btn);
    });

    categoryMenu.querySelector('button').classList.add('active');
    displayProducts('All');
  });
