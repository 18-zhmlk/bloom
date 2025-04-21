document.addEventListener("DOMContentLoaded", function () {
  const sliderTrack = document.querySelector(".slider-track");
  const sliderItems = document.querySelectorAll(".product-card");
  const sliderContainer = document.querySelector(".slider-container");
  const itemWidth = sliderItems[0].offsetWidth + 20; // ширина карточки + отступы
  const totalItems = sliderItems.length;

  // Дублируем элементы слайдера (например, 10 копий)
  for (let i = 0; i < 10; i++) {
    sliderItems.forEach((item) => {
      const clone = item.cloneNode(true);
      sliderTrack.appendChild(clone);
    });
  }

  let scrollAmount = 0;
  const scrollStep = itemWidth; // сколько сдвигаем за один раз
  let intervalId;

  // Функция для прокрутки слайдера
  function moveSlider() {
    scrollAmount += scrollStep;

    // Если мы дошли до конца, прокручиваем к началу
    if (scrollAmount >= itemWidth * totalItems * 10) {
      scrollAmount = 0; // сбрасываем прокрутку
      sliderTrack.style.transition = "none"; // отключаем анимацию
      sliderTrack.style.transform = `translateX(0)`; // сдвигаем в начало

      // Включаем анимацию через 50ms для плавности
      setTimeout(() => {
        sliderTrack.style.transition = "transform 0.5s ease-in-out";
      }, 50);
    } else {
      sliderTrack.style.transform = `translateX(-${scrollAmount}px)`;
    }
  }

  // Запуск прокрутки слайдера
  function startSlider() {
    intervalId = setInterval(moveSlider, 2200); // движем слайдер каждую 0.1 секунду
  }

  // Остановка прокрутки слайдера
  function stopSlider() {
    clearInterval(intervalId); // останавливаем прокрутку
  }

  // Начинаем прокрутку при загрузке страницы
  startSlider();

  // Добавляем обработчики для паузы и продолжения слайдера при наведении
  sliderContainer.addEventListener("mouseenter", stopSlider); // остановка при наведении
  sliderContainer.addEventListener("mouseleave", startSlider); // продолжение при уходе мышки
});

document.addEventListener("DOMContentLoaded", function () {
  const reviewTrack = document.querySelector(".review-track");
  const reviewCards = document.querySelectorAll(".review-card");
  const reviewContainer = document.querySelector(".review-slider-container");
  const cardWidth = reviewCards[0].offsetWidth + 20;
  const totalCards = reviewCards.length;

  // Клонируем отзывы 5 раз
  for (let i = 0; i < 5; i++) {
    reviewCards.forEach((card) => {
      const clone = card.cloneNode(true);
      reviewTrack.appendChild(clone);
    });
  }

  let scrollAmount = 0;
  const scrollStep = cardWidth;
  let intervalId;

  function moveReviewSlider() {
    scrollAmount += scrollStep;

    if (scrollAmount >= cardWidth * totalCards * 5) {
      scrollAmount = 0;
      reviewTrack.style.transition = "none";
      reviewTrack.style.transform = `translateX(0)`;

      setTimeout(() => {
        reviewTrack.style.transition = "transform 0.5s ease-in-out";
      }, 50);
    } else {
      reviewTrack.style.transform = `translateX(-${scrollAmount}px)`;
    }
  }

  function startReviewSlider() {
    intervalId = setInterval(moveReviewSlider, 2200);
  }

  function stopReviewSlider() {
    clearInterval(intervalId);
  }

  startReviewSlider();

  reviewContainer.addEventListener("mouseenter", stopReviewSlider);
  reviewContainer.addEventListener("mouseleave", startReviewSlider);
});

document.addEventListener("DOMContentLoaded", function () {
  const modalOverlay = document.querySelector(".modal-overlay");
  const modal = document.querySelector(".modal");
  const modalTitle = document.querySelector(".modal h2");
  const modalDesc = document.querySelector(".modal p");
  const closeBtn = document.querySelector(".close-btn");

  const bouquets = document.querySelectorAll(".bouquet-card");

  bouquets.forEach((bouquet, index) => {
    bouquet.addEventListener("click", () => {
      const title = bouquet.querySelector("h3").textContent;
      const composition = bouquet.getAttribute("data-composition");

      modalTitle.textContent = title;
      modalDesc.textContent = "Состав: " + composition;
      modalOverlay.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = "none";
    }
  });
});
