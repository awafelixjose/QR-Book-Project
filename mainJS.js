particlesJS("tsparticles", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ["#ffcc70", "#ff6b9d", "#ff9a9e", "#fff176", "#ffffff"] },
        shape: {
            type: ["circle", "char"],
            character: {
                value: ["♩", "♪", "♫", "♬"],
                font: "Verdana",
                weight: "400"
            }
        },
        opacity: {
            value: 1,
            random: true,
            anim: { enable: true, speed: 0.8, opacity_min: 0.4, sync: false }
        },
        size: {
            value: 18,
            random: true,
            anim: { enable: true, speed: 3, size_min: 6, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffcc70",
            opacity: 0.35,
            width: 1.5
        },
        move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out"
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" }
        },
        modes: {
            grab: { distance: 180, line_linked: { opacity: 0.6 } },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});
