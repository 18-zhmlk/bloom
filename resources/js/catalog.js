document.addEventListener('DOMContentLoaded', function () {
    // Modal functionality
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDetails = document.getElementById('modal-details');
    const modalPrice = document.getElementById('modal-price');
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart');
    const closeBtn = document.querySelector('.close-modal');

    // Close modal when clicking the X
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Open modal with product details
    const detailsBtns = document.querySelectorAll('.details-btn');
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            const title = this.getAttribute('data-title');
            const img = this.getAttribute('data-img');
            const details = this.getAttribute('data-details');
            const price = this.getAttribute('data-price');

            modalTitle.textContent = title;
            modalImage.src = img;
            modalImage.alt = title;
            modalDetails.textContent = details;
            modalPrice.textContent = `Цена: ${price} KZT`;

            modalAddToCartBtn.setAttribute('data-id', id);
            modalAddToCartBtn.setAttribute('data-title', title);
            modalAddToCartBtn.setAttribute('data-price', price);

            modal.style.display = 'block';
        });
    });

    // Handle modal "Add to cart" button
    modalAddToCartBtn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        const title = this.getAttribute('data-title');
        const price = this.getAttribute('data-price');

        // Здесь должен быть код для добавления товара в корзину
        // Такой же, как для кнопок "В корзину" в каталоге
        console.log(`Добавлен товар в корзину: ${title}, ID: ${id}, Цена: ${price}`);

        // Закрыть модальное окно после добавления в корзину
        modal.style.display = 'none';
    });
});