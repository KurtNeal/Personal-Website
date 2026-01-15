gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);

let smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
});

const elements = [".name", ".roles"];
const reach = [".reachout", ".email"];
const icons = document.querySelectorAll(".icons");
const scrollButton = document.querySelector('#about-me-button');
const scrollButton1 = document.querySelector('#socials-button');

window.addEventListener("load", () => {

  gsap.from('.nav-links', {duration: 3, y: '-100%', ease: 'quint'});
  gsap.from('.subtitle', {duration: 1.5, y: '-100%', ease: 'circ'});
  gsap.from('.hero-title', {duration: 1.5, y: '-100%', ease: 'circ'});

  scrollButton.addEventListener('click', () => {
      gsap.to(window, {duration: 2, scrollTo:{y:"#about-me"}})
  });

    scrollButton1.addEventListener('click', () => {
      gsap.to(window, {duration: 2, scrollTo:{y:".icons"}})
  });

  gsap.from(".about-heading", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#about-me",
      start: "top 50%",
      end: "top 20%",
      scrub: 1
    },
  });

  elements.forEach((selector) => {
    const split = new SplitText(selector, { type: "words" });

    gsap.from(split.words, {
      yPercent: 100,
      opacity: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#about-me",
        start: "top 45%",
        end: "top 15%",
        scrub: 1
      },
    });
  });

  let split1 = SplitText.create(".description", {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    onSplit: (self) => {
      return gsap.from(self.lines, {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#about-me",
          start: "top 25%",
          end: "top 1%",
          scrub: 1
        }
      });
    }
  });

  gsap.from(".divider", {
    scaleX: 0,
    opacity: 0,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".description",
      start: "top 35%",
      end: "top 18%",
      scrub: 1
    }
  });

  reach.forEach((selector) => {
    SplitText.create(selector, {
      type: "words",
      autoSplit: true,
      onSplit: (self) => {
        return gsap.from(self.words, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".divider",
            start: "top 90%",
            end: "top 80%",
            scrub: 1
          }
        });
      }
    });
  });

  gsap.from(".icons", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".divider",
      start: "top 90%",
      end: "top 80%",
      scrub: 1,
    }
  });

  icons.forEach(icon => {
    const tl = gsap.timeline({ paused: true });

    tl.to(icon, {
      scale: 1.2,
      filter: "brightness(1)",
      duration: 0.25,
      ease: "power2.out"
    });

    icon.addEventListener("mouseenter", () => tl.play());
    icon.addEventListener("mouseleave", () => tl.reverse());
  });
  
  icons.forEach(icon => {
    const strength = 20; // magnetic pull strength

    icon.addEventListener("mousemove", (e) => {
      const bounds = icon.getBoundingClientRect();
      const x = e.clientX - bounds.left - bounds.width / 2;
      const y = e.clientY - bounds.top - bounds.height / 2;

      gsap.to(icon, {
        x: x / bounds.width * strength,
        y: y / bounds.height * strength,
        duration: 0.3,
        ease: "power3.out"
      });
    });

    icon.addEventListener("mouseleave", () => {
      gsap.to(icon, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)"
      });
    });
  });

});

