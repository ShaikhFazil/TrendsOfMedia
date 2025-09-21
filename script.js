function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,

    // for tablet smooth
    tablet: { smooth: true },

    // for mobile
    smartphone: { smooth: true },
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}

function loadingAnimation() {
  var tl = gsap.timeline();
  tl.from("#page1", {
    opacity: 0,
    duration: 0.2,
    delay: 0.2,
  });
  tl.from("#page1", {
    transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
    borderRadius: "150px",
    duration: 2,
    ease: "expo.out",
  });
  tl.from("nav", {
    opacity: 0,
    delay: -0.2,
  });
  tl.from("#page1 h1, #page1 p, #page1 div", {
    opacity: 0,
    duration: 0.5,
    stagger: 0.2,
  });
}

function page2Animation() {
  var rightElems = document.querySelectorAll(".right-elem");

  rightElems.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      gsap.to(elem.childNodes[3], {
        opacity: 1,
        scale: 1,
      });
    });
    elem.addEventListener("mouseleave", function () {
      gsap.to(elem.childNodes[3], {
        opacity: 0,
        scale: 0,
      });
    });
    elem.addEventListener("mousemove", function (dets) {
      gsap.to(elem.childNodes[3], {
        x: dets.x - elem.getBoundingClientRect().x - 90,
        y: dets.y - elem.getBoundingClientRect().y - 215,
      });
    });
  });
}

function page3VideoAnimation() {
  var page3Center = document.querySelector(".page3-center");
  var video = document.querySelector("#page3 video");

  page3Center.addEventListener("click", function () {
    video.play();
    gsap.to(video, {
      transform: "scaleX(1) scaleY(1)",
      opacity: 1,
      borderRadius: 0,
    });
  });
  video.addEventListener("click", function () {
    video.pause();
    gsap.to(video, {
      transform: "scaleX(0.7) scaleY(0)",
      opacity: 0,
      borderRadius: "30px",
    });
  });

  var sections = document.querySelectorAll(".sec-right");

  sections.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      elem.childNodes[3].style.opacity = 1;
      elem.childNodes[3].play();
    });
    elem.addEventListener("mouseleave", function () {
      elem.childNodes[3].style.opacity = 0;
      elem.childNodes[3].load();
    });
  });
}

function page6Animations() {
  const btm6Part2 = document.querySelector("#btm6-part2");
  if (btm6Part2) {
    gsap.from("#btm6-part2 h4", {
      x: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#btm6-part2",
        scroller: "#main",
        start: "top 80%",
        end: "top 10%",
        scrub: true,
      },
    });
  }
}

window.addEventListener("load", () => {
  // wait until all animations complete
  setTimeout(() => {
    document.getElementById("loader").style.top = "-100%";
  }, 4500); // 3 animations (1s each + buffer)
});

function animateHeading() {
  const heading = document.querySelector("#animated-heading");
  const text = heading.textContent;
  heading.textContent = "";

  // Split each letter into a span
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char; // keep spaces
    heading.appendChild(span);
  });

  // Animate letters one by one
  gsap.to("#animated-heading span", {
    opacity: 1,
    x: 0,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.1, // delay per letter
  });
}

// Run once when page loads
window.addEventListener("load", animateHeading);

gsap.to("#hero-shape", {
    y: -100,
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top top",
      scrub: true
    }
  });

  // const locoScroll = new LocomotiveScroll({
  //   el: document.querySelector("#main"),
  //   smooth: true,
  //   tablet: { smooth: true },
  //   smartphone: { smooth: true }
  // });
  

locomotiveAnimation();

page2Animation();

page3VideoAnimation();

page6Animations();

loadingAnimation();

document.addEventListener('DOMContentLoaded', () => {
    const spans = document.querySelectorAll('.parallax-element span');
  
    const duration = 0.5;  // seconds for each letter animation
    const gap = 0.01;       // pause between letters
  
    spans.forEach((span, i) => {
      span.style.animation = `pop ${duration}s cubic-bezier(0.22,1,0.36,1) forwards`;
      span.style.animationDelay = `${i * (duration + gap)}s`;
    });
  });

 // Replace your page1SomethingAnimation function with this:

 function page1SomethingAnimation() {
  const container = document.querySelector("#page1-something");
  
  // Create background element if it doesn't exist
  let background = document.getElementById("page1-background");
  if (!background) {
    background = document.createElement("div");
    background.id = "page1-background";
    document.getElementById("page1").prepend(background);
  }
  
  // DON'T move the content to a new container - this breaks the flex layout
  // Just add hover effects directly to the items
  
  // Add hover effect to items with data-image
  const items = container.querySelectorAll("h4[data-image]");
  items.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      const image = item.getAttribute("data-image");
      if (image) {
        background.style.backgroundImage = `url(${image})`;
        background.style.opacity = "1";
      }
    });
    
    item.addEventListener("mouseleave", function () {
      background.style.opacity = "0";
    });
  });
}
  
  
  
  
  
  page1SomethingAnimation();
  
  
  // function page1SomethingAnimation() {
  //   var container = document.querySelector("#page1-something");
  //   var fixed = document.querySelector("#fixed-preview");
    
  //   // Create the fixed image container if it doesn't exist
  //   if (!fixed) {
  //     fixed = document.createElement("div");
  //     fixed.id = "fixed-preview";
  //     document.body.appendChild(fixed);
  //   }
    
  //   container.addEventListener("mouseenter", function () {
  //     fixed.style.display = "block";
  //   });
    
  //   container.addEventListener("mouseleave", function () {
  //     fixed.style.display = "none";
  //   });
    
  //   var items = container.querySelectorAll("h4");
  //   items.forEach(function (item) {
  //     item.addEventListener("mouseenter", function () {
  //       var image = item.getAttribute("data-image");
  //       if (image) {
  //         fixed.style.backgroundImage = `url(${image})`;
  //       }
  //     });
  //   });
  // }
  
  // page1SomethingAnimation();


// === 3D Carousel ===
   // === Enhanced 3D Carousel ===
   const carousel = document.getElementById("carousel");
   const items = document.querySelectorAll(".carousel-item");
   const prevBtn = document.getElementById("prevBtn");
   const nextBtn = document.getElementById("nextBtn");
   const progressContainer = document.getElementById("progressDots");

   const itemCount = items.length;
   let currentIndex = 0;
   let angle = 0;

   // Each item angle
   const theta = 360 / itemCount;
   // Radius for proper spacing
   let radius = Math.min(window.innerWidth / 3, 400);

   // Create progress dots
   function createProgressDots() {
       progressContainer.innerHTML = '';
       for (let i = 0; i < itemCount; i++) {
           const dot = document.createElement('div');
           dot.className = 'progress-dot';
           if (i === 0) dot.classList.add('active');
           dot.addEventListener('click', () => goToSlide(i));
           progressContainer.appendChild(dot);
       }
   }

   // Setup items around circle
   function setupCarousel() {
       items.forEach((item, i) => {
           const itemAngle = theta * i;
           gsap.set(item, {
               rotationY: itemAngle,
               z: radius,
               transformOrigin: `50% 50% ${-radius}px`
           });
       });
       gsap.set(carousel, { rotationY: angle });
   }

   function updateProgressDots() {
       const dots = document.querySelectorAll('.progress-dot');
       dots.forEach((dot, i) => {
           dot.classList.toggle('active', i === currentIndex);
       });
   }

   function rotateCarousel(dir = 1) {
       currentIndex = (currentIndex + dir + itemCount) % itemCount;
       angle += theta * dir;
       
       gsap.to(carousel, {
           rotationY: angle,
           duration: 1.5,
           ease: "power2.inOut"
       });
       
       updateProgressDots();
   }

   function goToSlide(index) {
       const diff = index - currentIndex;
       if (diff !== 0) {
           for (let i = 0; i < Math.abs(diff); i++) {
               setTimeout(() => {
                   rotateCarousel(diff > 0 ? 1 : -1);
               }, i * 200);
           }
       }
   }

   prevBtn.addEventListener('click', (e) => {
       e.stopPropagation();
       rotateCarousel(-1);
   });

   nextBtn.addEventListener('click', (e) => {
       e.stopPropagation();
       rotateCarousel(1);
   });

   const circularNav = document.getElementById('circularNav');
   
   circularNav.addEventListener('mouseenter', () => {
       gsap.to('.nav-arrow', {
           scale: 1.2,
           rotation: 360,
           duration: 0.5,
           stagger: 0.1
       });
   });

   circularNav.addEventListener('mouseleave', () => {
       gsap.to('.nav-arrow', {
           scale: 1,
           rotation: 0,
           duration: 0.3
       });
   });

   let autoRotateInterval = setInterval(() => {
       rotateCarousel(1);
   }, 4000);

   carousel.addEventListener('mouseenter', () => {
       clearInterval(autoRotateInterval);
   });

   carousel.addEventListener('mouseleave', () => {
       autoRotateInterval = setInterval(() => {
           rotateCarousel(1);
       }, 4000);
   });

   document.addEventListener('keydown', (e) => {
       if (e.key === 'ArrowLeft') rotateCarousel(-1);
       if (e.key === 'ArrowRight') rotateCarousel(1);
   });

   createProgressDots();
   setupCarousel();

   // Responsive resize
   window.addEventListener("resize", () => {
       radius = Math.min(window.innerWidth / 3, 400);
       setupCarousel();
   });

   let touchStartX = 0;
   let touchEndX = 0;

   carousel.addEventListener('touchstart', (e) => {
       touchStartX = e.changedTouches[0].screenX;
   });

   carousel.addEventListener('touchend', (e) => {
       touchEndX = e.changedTouches[0].screenX;
       handleSwipe();
   });

   function handleSwipe() {
       const swipeThreshold = 50;
       const diff = touchStartX - touchEndX;
       
       if (Math.abs(diff) > swipeThreshold) {
           if (diff > 0) {
               rotateCarousel(1); 
           } else {
               rotateCarousel(-1); 
           }
       }
   }

   // GSAP Scroll Reveal
gsap.from(".brand", {
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  scrollTrigger: {
    trigger: "#our-brands",
    start: "top 10%"
  }
});

tsParticles.load("footer-tsparticles", {
  fpsLimit: 60,
  particles: {
    number: { value: 50 },
    color: { value: "#0ba34e" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: { min: 2, max: 5 } },
    links: {
      enable: true,
      distance: 120,
      color: "#0ba34e",
      opacity: 0.3,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      outModes: "out"
    }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" }
    },
    modes: {
      repulse: { distance: 100 },
      push: { quantity: 4 }
    }
  },
  background: { color: "#111" }
});

$(document).ready(function(){
  $('.brands-carousel').slick({
      dots: true,             // keep dots
      infinite: true,
      speed: 500,
      slidesToShow: 3,        // number of slides visible in center
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '25%',   // side slides partially visible
      focusOnSelect: true,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,          // remove arrows
      responsive: [
          {
              breakpoint: 1024,
              settings: {
                  slidesToShow: 3,
                  centerPadding: '20%'
              }
          },
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 1,
                  centerPadding: '15%'
              }
          },
          {
              breakpoint: 480,
              settings: {
                  slidesToShow: 1,
                  centerPadding: '10%'
              }
          }
      ]
  });
});


// Fix GSAP errors - check if elements exist before animating
function fixGSAPErrors() {
  // Check if .brand elements exist before animating
  const brands = document.querySelectorAll('.brand');
  if (brands.length > 0) {
    gsap.from(".brand", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#our-brands",
        start: "top 10%"
      }
    });
  }

  // Fix animateHeading function
  const heading = document.querySelector("#animated-heading");
  if (heading) {
    const text = heading.textContent;
    heading.textContent = "";

    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      heading.appendChild(span);
    });

    gsap.to("#animated-heading span", {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.1,
    });
  }

  // Fix loader error
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.style.top = "-100%";
      }, 4500);
    });
  }
}

// Replace placeholder image URL with a valid one
function fixPlaceholderImage() {
  const placeholderImg = document.querySelector('img[src*="placeholder.com"]');
  if (placeholderImg) {
    placeholderImg.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40'%3E%3Crect width='120' height='40' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial' font-size='12'%3ETRENDS OF MEDIA%3C/text%3E%3C/svg%3E";
  }
}

// Call the fix functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  fixGSAPErrors();
  fixPlaceholderImage();
  
  // Your existing DOMContentLoaded code here
  const spans = document.querySelectorAll('.parallax-element span');
  const duration = 0.5;
  const gap = 0.01;

  spans.forEach((span, i) => {
    span.style.animation = `pop ${duration}s cubic-bezier(0.22,1,0.36,1) forwards`;
    span.style.animationDelay = `${i * (duration + gap)}s`;
  });
});