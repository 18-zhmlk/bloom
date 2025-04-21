// Глобальные функции для работы с куками
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
}

// Функция обновления счетчика товаров в корзине
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        // Получаем данные корзины из куки
        let count = 0;
        const cartIds = getCookie('cart_ids');
        console.log('cartIds = ' + cartIds)
        if (cartIds) {
            try {
                // Подсчитываем количество уникальных ID товаров
                const uniqueIds = JSON.parse(cartIds);
                count = uniqueIds.length;
            } catch (e) {
                console.error('Ошибка при парсинге корзины:', e);
            }
        }

        // Обновляем отображаемое количество
        cartCountElement.textContent = count;
    }
}

// Экспортируем функцию обновления, чтобы другие скрипты могли ее использовать
window.updateCartCount = updateCartCount;
updateCartCount()
console.log('updateCartCount()')

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function () {
    // Инициализация счетчика корзины
    updateCartCount();

    // Обновляем счетчик при возвращении на страницу
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') {
            updateCartCount();
        }
    });

    // Обработка кнопок "В корзину"
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            
            // Получаем текущее множество ID товаров из куки или создаем новое
            let cartIds = getCookie('cart_ids') ? JSON.parse(getCookie('cart_ids')) : [];
            
            // Проверяем, есть ли уже этот ID в множестве
            if (!cartIds.includes(productId)) {
                // Добавляем ID товара в множество, если его еще нет
                cartIds.push(productId);
                
                // Сохраняем обновленное множество ID в куки
                setCookie('cart_ids', JSON.stringify(cartIds), 7); // Сохраняем на 7 дней
                
            } else {
            }
            
            // Обновляем счетчик товаров в корзине
            updateCartCount();
        });
    });

    // Обработка кнопок удаления товара из корзины
    const removeButtons = document.querySelectorAll('.remove-item');
    if (removeButtons.length > 0) {
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                let cartIds = getCookie('cart_ids') ? JSON.parse(getCookie('cart_ids')) : [];
                
                // Удаляем ID из массива
                cartIds = cartIds.filter(id => id !== productId);
                
                // Сохраняем обновленный массив в куки
                setCookie('cart_ids', JSON.stringify(cartIds), 7);
                
                // Обновляем счетчик товаров в корзине
                updateCartCount();
                
                // Перезагружаем страницу для обновления данных
                location.reload();
            });
        });
    }

    // Обработка кнопки очистки корзины
    const clearCartButton = document.getElementById('clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', function () {
            if (confirm('Вы уверены, что хотите очистить корзину?')) {
                setCookie('cart_ids', '[]', 7);
                
                // Обновляем счетчик товаров в корзине
                updateCartCount();
                
                // Перезагружаем страницу для обновления данных
                location.reload();
            }
        });
    }
});