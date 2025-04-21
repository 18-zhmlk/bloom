document.addEventListener('DOMContentLoaded', function () {
    // Форматирование номера карты (добавление пробелов после каждых 4 цифр)
    const cardNumber = document.getElementById('card_number');
    cardNumber.addEventListener('input', function (e) {
        // Удаляем все нецифровые символы
        let value = this.value.replace(/\D/g, '');

        // Добавляем пробелы после каждых 4 цифр
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }

        // Устанавливаем отформатированное значение
        this.value = formattedValue;
    });

    // Форматирование срока действия (добавление слэша между месяцем и годом)
    const expiryDate = document.getElementById('expiry_date');
    expiryDate.addEventListener('input', function (e) {
        // Удаляем все нецифровые символы
        let value = this.value.replace(/\D/g, '');

        // Форматируем MM/YY
        if (value.length > 2) {
            this.value = value.substring(0, 2) + '/' + value.substring(2, 4);
        } else {
            this.value = value;
        }
    });

    // Валидация формы перед отправкой
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', function (e) {
        // Базовая проверка (дополнительные проверки можно добавить по необходимости)
        const clientName = document.getElementById('client_name').value.trim();
        const clientPhone = document.getElementById('client_phone').value.trim();

        if (!clientName || !clientPhone) {
            e.preventDefault();
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }

        // ЗДЕСЬ БУДЕТ ОБРАБОТКА ПЛАТЕЖА
        //
    });
});