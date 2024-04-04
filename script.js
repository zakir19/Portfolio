function revealToSpan() {
    document.querySelectorAll(".reveal")
        .forEach(function(elem) {
            var parent = document.createElement("span");
            var child = document.createElement("span");

            parent.classList.add("parent");
            child.classList.add("child");


            child.innerHTML = elem.innerHTML;
            parent.appendChild(child);

            elem.innerHTML = "";
            elem.appendChild(parent)
        });
}
revealToSpan()

var t1 = gsap.timeline();

t1
    .from(".child .parent", {
        x: 100,
        delay: 1,
        stagger: .2,
        duration: 1,
        ease: Power3.easeInOut
    })
    .to(".parent .child", {
        y: "-100%",
        duration: 1,
        ease: Circ.easeInOut
    })
    .to("#loader", {
        height: 0,
        duration: 1,
        ease: Circ.easeInOut
    })
    .to("#grey", {
        height: "100%",
        duration: 1,
        delay: -1,
        ease: Circ.easeinOut
    })


function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}
