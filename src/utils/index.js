var Hammer = require("hammerjs");
var HandtrackTouch = require("./jammer");
var reqAnimationFrame = (function() {
  return (
    window[Hammer.prefixed(window, "requestAnimationFrame")] ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

var log = document.querySelector("#log");
var el = document.querySelector("#hit");

var START_X = Math.round((window.innerWidth - el.offsetWidth) / 2);
var START_Y = Math.round((window.innerHeight - el.offsetHeight) / 2);

var ticking = false;
var transform;
var timer;

var mc = new Hammer.Manager(el, { inputClass: Hammer.TouchInput });

mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));

mc.add(new Hammer.Swipe()).recognizeWith(mc.get("pan"));
mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get("pan"));
mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([
  mc.get("pan"),
  mc.get("rotate")
]);

mc.add(new Hammer.Tap({ event: "doubletap", taps: 2 }));
mc.add(new Hammer.Tap());

mc.on("panstart panmove", onPan);
mc.on("rotatestart rotatemove", onRotate);
mc.on("pinchstart pinchmove", onPinch);
mc.on("swipe", onSwipe);
mc.on("tap", onTap);
mc.on("doubletap", onDoubleTap);

mc.on("hammer.input", function(ev) {
  if (ev.isFinal) {
    resetElement();
  }
});

function resetElement() {
  el.className = "animate";
  transform = {
    translate: { x: START_X, y: START_Y },
    scale: 1,
    angle: 0,
    rx: 0,
    ry: 0,
    rz: 0
  };

  requestElementUpdate();

  if (log.textContent.length > 2000) {
    log.textContent = log.textContent.substring(0, 2000) + "...";
  }
}

function updateElementTransform() {
  var value = [
    "translate3d(" +
      transform.translate.x +
      "px, " +
      transform.translate.y +
      "px, 0)",
    "scale(" + transform.scale + ", " + transform.scale + ")",
    "rotate3d(" +
      transform.rx +
      "," +
      transform.ry +
      "," +
      transform.rz +
      "," +
      transform.angle +
      "deg)"
  ];

  value = value.join(" ");
  el.textContent = value;
  el.style.webkitTransform = value;
  el.style.mozTransform = value;
  el.style.transform = value;
  ticking = false;
}

function requestElementUpdate() {
  if (!ticking) {
    reqAnimationFrame(updateElementTransform);
    ticking = true;
  }
}

function logEvent(str) {
  //log.insertBefore(document.createTextNode(str +"\n"), log.firstChild);
}

function onPan(ev) {
  el.className = "";
  transform.translate = {
    x: START_X + ev.deltaX,
    y: START_Y + ev.deltaY
  };

  requestElementUpdate();
  logEvent(ev.type);
}

var initScale = 1;
function onPinch(ev) {
  if (ev.type == "pinchstart") {
    initScale = transform.scale || 1;
  }

  el.className = "";
  transform.scale = initScale * ev.scale;

  requestElementUpdate();
  logEvent(ev.type);
}

var initAngle = 0;
function onRotate(ev) {
  if (ev.type == "rotatestart") {
    initAngle = transform.angle || 0;
  }

  el.className = "";
  transform.rz = 1;
  transform.angle = initAngle + ev.rotation;
  requestElementUpdate();
  logEvent(ev.type);
}

function onSwipe(ev) {
  var angle = 50;
  transform.ry = ev.direction & Hammer.DIRECTION_HORIZONTAL ? 1 : 0;
  transform.rx = ev.direction & Hammer.DIRECTION_VERTICAL ? 1 : 0;
  transform.angle =
    ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)
      ? angle
      : -angle;

  clearTimeout(timer);
  timer = setTimeout(function() {
    resetElement();
  }, 300);
  requestElementUpdate();
  logEvent(ev.type);
}

function onTap(ev) {
  transform.rx = 1;
  transform.angle = 25;

  clearTimeout(timer);
  timer = setTimeout(function() {
    resetElement();
  }, 200);
  requestElementUpdate();
  logEvent(ev.type);
}

function onDoubleTap(ev) {
  transform.rx = 1;
  transform.angle = 80;

  clearTimeout(timer);
  timer = setTimeout(function() {
    resetElement();
  }, 500);
  requestElementUpdate();
  logEvent(ev.type);
}

resetElement();

var video = document
  .getElementById("handtrackjs")
  .getElementsByTagName("video")[0];
video.width = 320;
video.height = 240;
var canvas = document
  .getElementById("handtrackjs")
  .getElementsByTagName("canvas")[0];
const context = canvas.getContext("2d");

var options = {
  transform: function(prediction, video, target) {
    return {
      x: ((prediction.bbox[0] + 0.5 * prediction.bbox[2]) / video.width) * 1920,
      y:
        ((prediction.bbox[1] + 0.5 * prediction.bbox[3]) / video.height) * 1200,
      target: target
    };
  }
};
HandtrackTouch.start(el, video, canvas, options);
