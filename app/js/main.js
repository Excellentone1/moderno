$(function (){




  $(".rate-star").rateYo({
    rating: 5,
    readOnly: true,
    starWidth: "12px",
  });

  $(".js-range-slider").ionRangeSlider({
    type: "double",
    min: 0,
    max: 1000,
    from: 0,
    to: 600,
    prefix: "$"
  });

  $('.product-slider__inner').slick({
    dots: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
  });


  $('.menu__btn').on('click', function (){
    $('.menu__list').slideToggle();
  })

  $('.header__btn-menu').on('click', function (){
    $('.header__box').toggleClass('active');
  })

  var mixer = mixitup('.products__inner-box');





});



