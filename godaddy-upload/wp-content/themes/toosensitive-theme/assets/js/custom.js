jQuery(document).ready(function () {
  var psychotherapy_swiper_testimonials = new Swiper(".testimonial-swiper-slider.mySwiper", {
    slidesPerView: 3,
      spaceBetween: 15,
      speed: 1000,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".testimonial-swiper-button-next",
        prevEl: ".testimonial-swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        767: {
          slidesPerView: 2,
        },
        1023: {
          slidesPerView: 3,
        }
      },
  })

  var psychotherapy_swiper_slider = new Swiper(".mySwiper.slider-main-box", {
    speed: 1000,
    navigation: {
      nextEl: ".slider-button-next",
      prevEl: ".slider-button-prev",
    },
  });

  var psychotherapy_swiper_service_slider = new Swiper(".mySwiper.service-group", {
      slidesPerView: 3.7,
      spaceBetween: 20,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".service-swiper-button-next",
        prevEl: ".service-swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2,
        },
        782: {
          slidesPerView: 1.7,
        },
        1023: {
          slidesPerView: 2.7,
        },
        1400: {
          slidesPerView: 3.7,
        }
      },
  })

});

