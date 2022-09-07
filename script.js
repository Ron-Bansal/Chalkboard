// THEME SELECTOR
const theme = document.getElementById("theme");

theme.addEventListener("click", () => {
  document.querySelector("body").classList = [
    theme.checked ? "theme-light" : "theme-dark",
  ];
});

// UPDATE TIME

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

// CREATE DRAGGABLE HANDLES
// For each item with a `window` class…
var notes = document.querySelectorAll(".note");
[].forEach.call(notes, function (note) {
  // …find the title bar inside it and do something onmousedown
  var frameHandle = note.querySelector(".frame");
  frameHandle.addEventListener(
    "mousedown",
    function (evt) {
      // Record where the window started
      var real = window.getComputedStyle(note),
        noteX = parseFloat(real.left),
        noteY = parseFloat(real.top);

      // Record where the mouse started
      var mX = evt.clientX,
        mY = evt.clientY;

      // When moving anywhere on the page, drag the window
      // …until the mouse button comes up
      document.body.addEventListener("mousemove", drag, false);
      document.body.addEventListener(
        "mouseup",
        function () {
          document.body.removeEventListener("mousemove", drag, false);
        },
        false
      );

      // Every time the mouse moves, we do the following
      function drag(evt) {
        // Add difference between where the mouse is now
        // versus where it was last to the original positions
        note.style.left = noteX + evt.clientX - mX + "px";
        note.style.top = noteY + evt.clientY - mY + "px";
      }
    },
    false
  );
});

// USING INTERACT JS (for the time element only)
const position = { x: 0, y: 0 };

interact(".draggable").draggable({
  listeners: {
    start(event) {
      console.log(event.type, event.target);
    },
    move(event) {
      position.x += event.dx;
      position.y += event.dy;

      event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
    },
  },
});

//HIDE + SHOW ALL NOTES
const hideNotes = document.querySelector("#hide-notes");
let hideTxt = true;

hideNotes.addEventListener("click", () => {
  const allNoteElems = document.querySelectorAll(".note");
  for (let note of allNoteElems) {
    console.log(note);
    hideNote(note);
  }
  hideNotes.textContent = hideTxt ? "show all notes" : "hide all notes";
  hideTxt = !hideTxt;
});

function hideNote(note) {
  note.classList.toggle("hide");
}

//CREATE NOTE ELEMENT ON DOUBLE CLICK
// let allNotes =  document.getElementsByClassName('note')[0];
const main = document.querySelector("main");
let allNotes = main.children;

document.addEventListener("dblclick", (event) => {
  // checking if note element is clicked (no class name == main container)
  if (event.target.className == "") {
    let dbclickPos = returnMousePos(event);
    console.log(dbclickPos.x, dbclickPos.y);
    createNoteAtPos(dbclickPos.x - 30, dbclickPos.y - 60);
  }
});

function returnMousePos(event) {
  // console.log("clientX: " + event.clientX + " - clientY: " + event.clientY);
  return { x: event.clientX, y: event.clientY };
}

function createNoteAtPos(x_pos, y_pos) {
  const newNoteDiv = document.createElement("div");
  newNoteDiv.className = "note draggable";
  newNoteDiv.style.position = "absolute";
  newNoteDiv.style.transform = `translate(${x_pos}px, ${y_pos}px)`;

  const newFrameDiv = document.createElement("div");
  newFrameDiv.className = "frame";

  const newTextArea = document.createElement("textarea");
  newTextArea.name = "note";
  newTextArea.wrap = "soft";
  newTextArea.spellcheck = "false";
  newTextArea.className = "textbox autoresize";
  newTextArea.setAttribute(
    "oninput",
    'this.style.height = "";this.style.height = this.scrollHeight + "px"'
  );

  const colTag = document.createElement("span");
  colTag.textContent = "";
  colTag.className = "colour-tag";

  const cross = document.createElement("span");
  cross.textContent = "x";
  cross.className = "cross";
  cross.setAttribute("onclick", "remove(this)");

  newFrameDiv.appendChild(colTag);
  newFrameDiv.appendChild(cross);

  newNoteDiv.appendChild(newFrameDiv);
  newNoteDiv.appendChild(newTextArea);

  main.appendChild(newNoteDiv);
  updateNoteElems();
}

function updateNoteElems() {
  closeNoteSpans = document.querySelectorAll(".cross");
}

document.querySelectorAll("textarea").forEach((element) => {
  function autoResize(el) {
    el.style.height = el.scrollHeight + "px";
  }
  autoResize(element);
  element.addEventListener("input", () => autoResize(element));
});

// ADD + DELETE NOTE
const addNoteBtn = document.querySelector("#add-note");
let closeNoteSpans = document.querySelectorAll(".cross");

addNoteBtn.addEventListener("click", () => {
  // console.log("deprecated");
  let x_pos = window.innerWidth / 2 - 170;
  let y_pos = window.innerHeight / 2 - 90;
  createNoteAtPos(x_pos, y_pos);
});

for (closeNote of closeNoteSpans) {
  closeNote.addEventListener("click", (e) => {
    console.log(e);
  });
}

function remove(element) {
  var element = element.parentElement.parentElement;
  console.log(element);
  element.remove();
}

function deleteNote(event) {
  console.log(event.parentElement.parentElement.classList.add("hide"));
}

var resizingTextareas = [].slice.call(
  document.querySelectorAll("textarea[autoresize]")
);

resizingTextareas.forEach(function (textarea) {
  textarea.addEventListener("input", autoresize, false);
});

function autoresize() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
  this.scrollTop = this.scrollHeight;
  window.scrollTo(window.scrollLeft, this.scrollTop + this.scrollHeight);
}

//CREATE BULLET POINT •
// let textArea = document.querySelector(".textbox");
// let IndentLvl = 0;

// textArea.addEventListener("keyup", function(event) {
//   let keyCode = window.event.keyCode;

//   let key = console.log(event.key);

//   if (textArea.value == "- ") {
//     textArea.value = "\t• ";
//   }

//   if ((textArea.value).slice(-3) == "\n- ") {
//     console.log("new line");
//     textArea.value = textArea.value.slice(0, -2) + "\t• ";
//     IndentLvl = 1;
//   }

//   if (key == "Enter" && IndentLvl == 1) {
//     textArea.value += "\t• ";
//   }

//   if (key = "Tab" && IndentLvl == 1 && (textArea.value).slice(-2) == "• ") {
//     IndentLvl = 2;
//     textArea.value += "\t\t◦ ";
//   }

// });

// textArea.addEventListener('keydown', function(e) {
//   if (e.key == 'Tab') {
//     e.preventDefault();
//     var start = this.selectionStart;
//     var end = this.selectionEnd;

//     // set textarea value to: text before caret + tab + text after caret
//     this.value = this.value.substring(0, start) +
//       "\t" + this.value.substring(end);

//     // put caret at right position again
//     this.selectionStart =
//       this.selectionEnd = start + 1;
//   }
// });
