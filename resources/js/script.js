$(document).ready(function () {
  /* Navigation Scroll */
  $(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
      if (
        location.pathname.replace(/^\//, '') ==
          this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash)
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
        if (target.length) {
          $('html,body').animate(
            {
              scrollTop: target.offset().top
            },
            700
          )
          return false
        }
      }
    })
  })
})

var scroll =
  window.requestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60)
  }

var elementsToShow = document.querySelectorAll('.show-on-scroll')

function loop () {
  elementsToShow.forEach(function (element) {
    if (isElementInViewport(element)) {
      element.classList.add('is-visible')
    } else {
      element.classList.remove('is-visible')
    }
  })
  scroll(loop)
}

loop()

function isElementInViewport (el) {
  // special bonus for those using jQuery
  if (typeof jQuery === 'function' && el instanceof jQuery) {
    el = el[0]
  }
  var rect = el.getBoundingClientRect()
  return (
    (rect.top <= 0 && rect.bottom >= 0) ||
    (rect.bottom >=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight)) ||
    (rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight))
  )
}

/* nav sticky on scroll up */

var didScroll, lastScrollTop, delta, navbarHeight

lastScrollTop = 0
delta = 10
navbarHeight = $('header').outerHeight()

$(window).scroll(function (e) {
  didScroll = true
})

setInterval(function () {
  if (didScroll) {
    hasScrolled()
    didScroll = false
  }
}, 250)

function hasScrolled () {
  var st = $(this).scrollTop()

  if (Math.abs(lastScrollTop - st) <= delta) return

  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $('header')
      .removeClass('Nav-Container2')
      .addClass('Nav-Container')
  } else if (st < 100) {
    $('header')
      .removeClass('Nav-Container2')
      .addClass('Nav-Container')
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $('header')
        .removeClass('Nav-Container')
        .addClass('Nav-Container2')
    }
  }
  console.log(st)
  lastScrollTop = st
}
