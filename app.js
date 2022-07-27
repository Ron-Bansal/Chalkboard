const theme = document.getElementById("theme");

theme.addEventListener("click", () => {
  document.querySelector("body").classList = [
    theme.checked ? "theme-light" : "theme-dark",
  ];
});

// const textbox = document.querySelector(".textbox"),
// frame = textbox.querySelector(".frame");

// function onDrag() {
//     let getStyle = window.getComputedStyle(textbox);
//     let left = getStyle.left;
//     let top = getStyle.top;
//     console.log(left, top);
// }

// frame.addEventListener("mousedown", () => {
//     frame.addEventListener("mousemove", onDrag);
// });

// const textbox = document.querySelector(".textbox"),
// frame = textbox.querySelector(".frame");

// function onDrag({movementX, movementY}){
//   let getStyle = window.getComputedStyle(textbox);
//   let leftVal = parseInt(getStyle.left);
//   let topVal = parseInt(getStyle.top);
//   textbox.style.left = `${leftVal + movementX}px`;
//   textbox.style.top = `${topVal + movementY}px`;
// }
// frame.addEventListener("mousedown", ()=>{
//   frame.classList.add("active");
//   frame.addEventListener("mousemove", onDrag);
// });

// document.addEventListener("mouseup", ()=>{
//   frame.classList.remove("active");
//   frame.removeEventListener("mousemove", onDrag);
// });

// const textbox = document.querySelector(".textbox");
// const frame = document.querySelector(".frame");

// frame.addEventListener("mousedown", ()=>{
//     frame.classList.add("active");
//     frame.addEventListener("mousemove", update);

//     window.addEventListener("mouseup", () => {
//       frame.removeEventListener("mousemove", update);
//     })

//   });

//   function update(ev) {
//       textbox.style.setProperty("left", `${ev.x - 200}px`);
//       textbox.style.setProperty("top", `${ev.y - 25}px`);
//   }

// target elements with the "draggable" class
interact('.movable-box')
  .draggable({
    allowFrom: '.drag-handle',
  })
  .resizable({
    allowFrom: '.resize-handle',
  })
  .pointerEvents({
    allowFrom: '*',
  })


interact(".draggable").draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: "parent",
      endOnly: true,
    }),
  ],
  // enable autoScroll
  autoScroll: true,

  listeners: {
    // call this function on every dragmove event
    move: dragMoveListener,

    // call this function on every dragend event
    end(event) {
      var textEl = event.target.querySelector("p");

      textEl &&
        (textEl.textContent =
          "moved a distance of " +
          Math.sqrt(
            (Math.pow(event.pageX - event.x0, 2) +
              Math.pow(event.pageY - event.y0, 2)) |
              0
          ).toFixed(2) +
          "px");
    },
  },
});

interact('.movable-box')
  .draggable({
    allowFrom: '.drag-handle',
  })
  .resizable({
    allowFrom: '.resize-handle',
  })
  .pointerEvents({
    allowFrom: '*',
  })

function dragMoveListener(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

// ________________________________________
// UPDATE TIME NOTE

function updateTime() {
  let now = new Date();
  let hours = now.getHours();
  let mins = now.getMinutes();
  let suffix;

  if (hours > 12) {
    hours -= 12;
    suffix = "PM";
  } else {
    suffix = "AM";
  }

  let currentTime = addZero(hours) + ":" + addZero(mins) + " " + suffix;

  document.getElementById("time").innerHTML = currentTime;
  setTimeout(updateTime, 1000);
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

updateTime();
