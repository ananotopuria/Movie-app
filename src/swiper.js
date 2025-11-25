export function initSwiper(params) {
  new Swiper(`.${params}-swiper`, {
    slidesPerView: "auto",
    slidesPerGroup: 1,
    spaceBetween: 22,
    loop: true,
    grabCursor: true,

    mousewheel: {
      forceToAxis: true,
      sensitivity: 0.3,
      releaseOnEdges: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
