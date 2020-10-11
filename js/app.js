$(document).ready(function () {
  // Dropdown menu (for mobile)
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  const body = document.querySelector('body')

  if (isMobile.any()) {
    body.classList.add('touch')
    const subMenu = document.querySelector('.sub-menu__list')
    const arrow = document.querySelector('.menu__list-link--arrow')
    const dropdown = document.querySelector('.menu__list-item:nth-child(2)')
    dropdown.addEventListener('click', () => {
      subMenu.classList.toggle('active')
      arrow.classList.toggle('active')
    })
  } else {
    body.classList.add('mouse')
  }

  // Slick slider
  $('.testimonials__slider').slick({
    arrows: false,
    dots: true
  });

  // Accordion
  document.querySelectorAll('.questions__btn').forEach(item => {
    const [...accordionBtn] = document.querySelectorAll('.questions__btn')
    item.addEventListener('click', () => {
      item.parentNode.classList.toggle('active')
      item.nextElementSibling.classList.toggle('active')
      item.classList.toggle('material-icons-remove')
      item.classList.toggle('material-icons-add')
    })
  })

  // Google map
  const mapElement = document.getElementById("map");

  if (mapElement) {
    let map = "";
    google.maps.event.addDomListener(window, "load", init);
    google.maps.event.addDomListener(window, "resize", m_res);
    function init() {
      const mapOptions = {
        zoom: 13,
        mapTypeControl: false,
        zoomControl: true,
        scrollwheel: false,
        zoomControlOptions: { position: google.maps.ControlPosition.LEFT_TOP },
        streetViewControl: false,
        center: new google.maps.LatLng(40.6607845, -73.9661575, 15),
      };

      map = new google.maps.Map(mapElement, mapOptions);

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.6607845, -73.9661575, 15),
        map: map,
        optimized: false,
      });
      m_res();
    }

    function m_res() {
      google.maps.event.trigger(map, "resize");
      map.panTo(new google.maps.LatLng(40.6607845, -73.9661575, 15));
    }
  }

  // Burger menu
  const wrapper = document.querySelector('.burger__button-wrapper')
  const burger = document.querySelector('.burger__button')
  const mobileNav = document.querySelector('.menu__list')
  const mobileLink = document.querySelectorAll('.menu__list-link:not(.menu__list-link--dropdown)')
  const subMenuLink = document.querySelectorAll('.sub-menu__link')
  const mobileHtml = document.querySelector('html')
  const mobileBody = document.querySelector('body')
  const subMenu = document.querySelector('.sub-menu__list')
  const arrow = document.querySelector('.menu__list-link--arrow')

  wrapper.addEventListener('click', (evt) => {
    evt.preventDefault();
    burger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    mobileHtml.classList.toggle('block');
    mobileBody.classList.toggle('block');
    subMenu.classList.remove('active')
    arrow.classList.remove('active')
  })

  for (let i = 0; i < mobileLink.length; i++) {
    mobileLink[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      burger.classList.toggle('active');
      mobileNav.classList.remove('active');
      mobileHtml.classList.remove('block');
      mobileBody.classList.remove('block');
      subMenu.classList.remove('active')
      arrow.classList.remove('active')
    });
  }

  for (let i = 0; i < subMenuLink.length; i++) {
    subMenuLink[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      burger.classList.toggle('active');
      mobileNav.classList.remove('active');
      mobileHtml.classList.remove('block');
      mobileBody.classList.remove('block');
      subMenu.classList.remove('active')
      arrow.classList.remove('active')
    });
  }

  //  Smooth scroll 
  $('[data-scroll]').on('click', function (event) {
    event.preventDefault();

    let elementClass = $(this).data('scroll');
    let elementOffset = $(elementClass).offset().top;

    $('html, body').animate(
      {
        scrollTop: elementOffset,
      },
      1000
    );
  });

  //  Lazy load
  const [...images] = document.querySelectorAll('img')

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  }

  function handleImg(myImg, observer) {
    myImg.forEach(myImgSingle => {
      console.log(myImgSingle.intersectionRatio)
      if (myImgSingle.intersectionRatio > 0) {
        loadImage(myImgSingle.target)
      }
    })
  }

  function loadImage(image) {
    image.src = image.getAttribute('data')
  }

  const observer = new IntersectionObserver(handleImg, options)


  images.forEach(img => {
    observer.observe(img)
  })


});