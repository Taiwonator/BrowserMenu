var first = true;
var animationSpeed = 1;
                                                                        //Click functionality//This function is assigned to the rightClickMenu components (menuComponents && menuCentre)
//Assigned to the onmouseover event
//Returns the whole element which is being hovered over

function returnId(elementClicked)
{
  console.log(elementClicked);
  clickedElement = elementClicked;
}

//This function is also assigned to rightClickMenu components
//Assigned to the onmouseout event
//Reverts the currently element clicked to being null

function noElement() {
  clickedElement = "";
}

var imageSrc;

function returnSrc(imgSrc) {
  console.log(imgSrc);
  imageSrc = imgSrc;
}

function noSrc()
{
  imageSrc = "";
}

function copyAndPaste() {
  if(imageSrc != null){
    var menuPictureFrameCanvas =  document.getElementsByClassName("menuPictureFrameCanvas")[0];
    menuPictureFrameCanvas.src = imageSrc;
  }
}

function openInNewTab() {
  if(imageSrc != null){
    window.open(imageSrc, '_blank');
  }
}

function PrintPage() {
  window.print();
}

function reloadPage() {
  location.reload();
}

function goBack() {
    window.history.back();
}


function goForward() {
    window.history.forward();
}

function changeHue() {
  //Hues the menu and the background //Allows you to change the background colour with scroller
  var hueValue = document.getElementById("scroller").value;
  var filters = document.getElementsByClassName("filter");
  for(var i = 0; i < filters.length; i++){filters[i].style.filter = "hue-rotate("+hueValue+"deg)";}
}

function changeShape(element) {
  var menuComps = document.getElementsByClassName("menuComponent");
  var menuCentre = document.getElementsByClassName("menuCentre")[0];
  for(var i = 0; i < menuComps.length; i++)
  {
    if(element.id == "button1") {
      menuComps[i].style.borderRadius = "0px";
      menuCentre.style.borderRadius = "0px";
    }
    else if(element.id == "button2") {
      menuComps[i].style.borderRadius = "20px";
      menuCentre.style.borderRadius = "20px";
    }
    else {
      menuComps[i].style.borderRadius = "100px";
      menuCentre.style.borderRadius = "100px";
    }
  }
}

//Onload so it doesn't run before the elements have loaded up

window.onload = function(){
var initalWidth = document.getElementsByClassName("menuComponent")[0].offsetWidth;
var initalHeight = document.getElementsByClassName("menuComponent")[0].offsetHeight;
//All the menuComponents are kept inside a div with the id of "rightClickMenu"
var rightClickMenu = document.getElementById("rightClickMenu");
//All of the menuComponents, not including the menuCentre
var menuComps = document.getElementsByClassName("menuComponent");
//All divs with picture in classList
var sourced =  document.getElementsByClassName("picture");
//Assigns the function noElement() to the onmouseout event to all menuComponents
for(var i = 0; i < menuComps.length; i++){menuComps[i].addEventListener("mouseout", noElement);}
for(var i = 0; i < menuComps.length; i++){menuComps[i].addEventListener("mouseover", returnId);}
//The middle menu component. If there are two menuCentre's, the second will be ignored
var menuCentre = document.getElementsByClassName("menuCentre")[0];
//Assigns the function noElement() to the onmouseout event to menuCentre
menuCentre.addEventListener("mouseout", noElement);
//Assigns the function returnId() to the onmouseover event to menuCentre
menuCentre.addEventListener("mouseover", returnId);
//Boolean expressing whether menu is showing or not
var visible = false;
//Variable to signify when the menuComponents first appear in their positions
var initialPosition = false;
var timer;
//Picture Canvas //Frame for copied picture to be pasted into
var menuPictureFrame =  document.getElementsByClassName("menuPictureFrame")[0];
//Setting onmouseover to function above
if(document.getElementsByClassName("menuPictureFrame")[0] != null){
    menuPictureFrame.addEventListener("mouseover", returnId);
    menuPictureFrame.addEventListener("mouseout", noElement);
}
//Assigns the function returnSrc() to the oncontextmenu event to all pictures
$( ".sourced" ).contextmenu(function() {
  returnSrc(this.src);
});

$( ".sourced" ).mouseleave(function() {

});

//Function which normally opens the defualt menu with a right click
  window.oncontextmenu = function ()
  {
    //As long as the menu isn't already showing, once the right mouse button has been clicked, the menu will show
    if(!visible){
      showMenu();
    }
    //If the right mouse button is clicked and the menu is showing then it will hide it agan
    else{
      hideMenu();
    }
    //Cancels the defualt menu
    return false;
  }

  //This is a left click event
  document.addEventListener("click", function(e){
    //As long as the menu is showing and none of the elements are being hovered over, then it will hide the menu
    if(visible && clickedElement == ""){
          hideMenu();
    }
 });

 if(rightClickMenu.classList.contains("animate-fast")){
   animationSpeed = 0.5;
 }
 else if(rightClickMenu.classList.contains("animate-slow")){
   animationSpeed = 2;
 }
 else {
   animationSpeed = 1;
 }

 if(document.getElementsByClassName("menuPictureFrame")[0] != null){
   if(rightClickMenu.classList.contains("canvas")){
     menuPictureFrame.style.display = "block"
   }
   else {
     menuPictureFrame.style.display = "none";
   }
}

  function showMenu() {
    positionTarget();
    //Interval(positionTarget, 10);
    //Makes the whole rightClickMenu visible
    rightClickMenu.style.visibility = "visible";
    visible = true;

  //if(rightClickMenu.classList.contains("animate")){
    TweenMax.set($('.menuComponent'), {opacity:1});
    TweenMax.set($('.menuCentre'), {opacity:1});
    if(document.getElementsByClassName("menuPictureFrame")[0] != null){
      TweenMax.set($('.menuPictureFrame'), {opacity:1});
    }
//Animation which makes menuComponents come out from the centre of the menuCentre / location of button click. Runs in 1 second
    TweenMax.from($('.menuComponent'), animationSpeed,
      {
        // left: event.pageX + "px",
        // top: event.pageY + "px",
        left: menuCentre.getBoundingClientRect().left + "px",
        autoAlpha:0,
        top: menuCentre.getBoundingClientRect().top + "px"
      }
    );
    TweenMax.from($('.menuCentre'), animationSpeed,
      {
        autoAlpha:0
      }
    );
    if(document.getElementsByClassName("menuPictureFrame")[0] != null){
      TweenMax.from($('.menuPictureFrame'), animationSpeed,
        {
          autoAlpha:0
        }
      );
    }
//  }
  }

  function hideMenu() {
    //Makes the whole rightClickMenu invisible
    // rightClickMenu.style.visibility = "hidden";
    visible = false;
    initialPosition = false;
    TweenMax.to($('.menuComponent'), animationSpeed,
      {
        // left: event.pageX + "px",
        // top: event.pageY + "px",
        left: menuCentre.getBoundingClientRect().left + "px",
        autoAlpha:0,
        top: menuCentre.getBoundingClientRect().top + "px"
      }
    );
    TweenMax.to($('.menuCentre'), 0,
      {
        autoAlpha:0
      }
    );
    if(document.getElementsByClassName("menuPictureFrame")[0] != null){
      TweenMax.to($('.menuPictureFrame'), animationSpeed,
        {
          autoAlpha:0
        }
      );
    }
  }

//Updates whenever the mouse moves position
  $(document).mousemove(function(e){
    if(!visible){
      //The menuCentre's left and top positions move to the cursors position. Jquery
    $(".menuCentre").css({left:e.pageX, top:e.pageY, transform: "translate(-50%, -50%)"});
  }
});


function positionTarget() {
                                                       //Orientation
//Defining all the variables
var radians, maxRadians, target, radius, originX, originY, inc, offset, differenceX, differenceY, height, width, sizeConstant;
//This determines how many pixels away each menuComponent will be away from the centre
radius = 150;
//Max value of radian which is possible for a circle
maxRadians = 2 * Math.PI;
//2 PI Radians is a full circle (360 degrees). Starts at 0
//radians = [0, maxRadians / 4, maxRadians / 2, 3*(maxRadians) / 4];
radians = [0];
//Checks if the rightClickMenu has offset as a class
if(rightClickMenu.classList.contains("offset") && !rightClickMenu.classList.contains("fly")){
  //This will shift each component around the circle. Changing this will change the orientation of the menuComponents. This offsets by 45 degrees
    offset = maxRadians / (2 * menuComps.length);
}
else{
  //Removes offset
   offset = 0;
}
//This makes sure no matter how many menuComponets there are, they will have equal space between each one
inc = maxRadians / (menuComps.length);
//Oribit increment
inc2 = 0.0002;
//Width and Height of menuComponents
if(first){
    height = initalHeight / (menuComps.length / 4);
    width = initalWidth / (menuComps.length / 4);
    //Makes sure size doesn't ruin position
    sizeConstant = (12.5 * menuComps.length) - 50;
    radians[0] = 0;
    first = false;
}
        //Difference between the size of the menuComponents and the menuCentre
        // differenceX = document.getElementsByClassName("menuCentre")[0].offsetWidth - document.getElementsByClassName("menuComponent")[0].offsetWidth;
        // differenceY = document.getElementsByClassName("menuCentre")[0].offsetHeight - document.getElementsByClassName("menuComponent")[0].offsetHeight;
        differenceX = 0;
        differenceY = 0;
        //Runs the amount of times equal to the number of menuComponents
        for(var i = 0; i < menuComps.length; i++){
          var x, y;
          //The x position of the menuComponents
          x = document.getElementsByClassName("menuCentre")[0].getBoundingClientRect().left + differenceX / 2 + (Math.cos(radians[0] + offset) * (radius + (differenceX / 1.5)));
          //The y position of the menuComponents
          y = document.getElementsByClassName("menuCentre")[0].getBoundingClientRect().top + differenceY / 2 + (Math.sin(radians[0] + offset) * (radius + (differenceY / 1.5)));
          //Assigning the menuComponent the positions and dimensions
          menuComps[i].style.left = x + "px";
          menuComps[i].style.top =  y + "px";
          menuComps[i].style.width = (width) + "px";
          menuComps[i].style.height = (height) + "px";
          menuComps[i].style.transform = "translate(" + sizeConstant + "%, " + sizeConstant + "%)";
          if(document.getElementsByClassName("menuPictureFrame")[0] != null){
            document.getElementsByClassName("menuPictureFrame")[0].style.left = (x - 275) + "px";
            document.getElementsByClassName("menuPictureFrame")[0].style.top =  (y - 350) + "px";
          }
          //Increases the angle for the next menuComponent to create a whole circle orientation
          radians[0] += inc;
          //So when the angle goes over 360 degrees, it just starts from 0 again
          if (radians[0] > maxRadians) {
            radians[0] -= maxRadians;
          }
        }
        if(rightClickMenu.classList.contains("fly")){
          // TweenMax.to(menuComps[0], 5, {rotation:360, transformOrigin:"-50px -50px", repeat:100, ease:Linear.easeNone});
          // TweenMax.to(menuComps[1], 5, {rotation:360, transformOrigin:"150px -50px", repeat:100, ease:Linear.easeNone});
          // TweenMax.to(menuComps[2], 5, {rotation:360, transformOrigin:"150px 150px", repeat:100, ease:Linear.easeNone});
          // TweenMax.to(menuComps[3], 5, {rotation:360, transformOrigin:"-50px 150px", repeat:100, ease:Linear.easeNone});
        }

        // TweenMax.to(menuComps[0], 10, {rotation:360, transformOrigin:"-50% -50%", repeat:-1, ease:Linear.easeNone});
        // TweenMax.to(menuComps[1], 10, {rotation:360, transformOrigin:"0px 0px", repeat:-1, ease:Linear.easeNone});
        // TweenMax.to(menuComps[2], 10, {rotation:360, transformOrigin:"0px 0px", repeat:-1, ease:Linear.easeNone});
        // TweenMax.to(menuComps[3], 10, {rotation:360, transformOrigin:"0px 0px", repeat:-1, ease:Linear.easeNone});
    }

}

function addDiv() {
  first = true;
  var elem = document.createElement('div');
  elem.className += elem.className ? ' menuComponent' : 'menuComponent';
  document.getElementById("rightClickMenu").appendChild(elem);
}

function deleteDiv()
{
  first = true;
  var rcm = document.getElementById("rightClickMenu");
  var menuComps = document.getElementsByClassName("menuComponent");
  rcm.removeChild(menuComps[0]);
}

function toggleAnimation() {
  if(animationSpeed == 1){
    animationSpeed = 0.5;
    document.getElementById("toggleButton").innerHTML = "Fast";
    document.getElementById("toggleButton").style.opacity = 1;
  }
  else if(animationSpeed == 0.5){
    animationSpeed = 2;
    document.getElementById("toggleButton").innerHTML = "Slow";
    document.getElementById("toggleButton").style.opacity = 0.34;
  }
  else{
    animationSpeed = 1;
    document.getElementById("toggleButton").innerHTML = "Default";
    document.getElementById("toggleButton").style.opacity = 0.67;
  }
  document.getElementById("toggleButton").style.transition = "opacity 0.5s";

}

function addFunctionalButtons() {
  first = true;
  var back = document.createElement('div');
  back.className += back.className ? ' menuComponent' : 'menuComponent';
  back.className += back.className ? ' goBack' : 'goBack';
  back.addEventListener("click", goBack);
  back.addEventListener("mouseout", noElement);
  back.addEventListener("mouseover", returnId);
  var tempDiv = document.getElementById("rightClickMenu").appendChild(back);
  var backImage = document.createElement('img');
  backImage.src = "http://iconshow.me/media/images/ui/free-vector-icons/png/512/back.png.png";
  backImage.className += backImage.className ? 'fitIcon' : 'fitIcon';
  tempDiv.appendChild(backImage);

  var forward = document.createElement('div');
  forward.className += forward.className ? ' menuComponent' : 'menuComponent';
  forward.className += forward.className ? ' goForward' : 'goForward';
  forward.addEventListener("click", goForward);
  forward.addEventListener("mouseout", noElement);
  forward.addEventListener("mouseover", returnId);
  var tempDiv = document.getElementById("rightClickMenu").appendChild(forward);
  var forwardImage = document.createElement('img');
  forwardImage.src = "https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/forward-512.png";
  forwardImage.className += forwardImage.className ? 'fitIcon' : 'fitIcon';
  tempDiv.appendChild(forwardImage);

  var reload = document.createElement('div');
  reload.className += reload.className ? ' menuComponent' : 'menuComponent';
  reload.className += reload.className ? ' reload' : 'reload';
  reload.addEventListener("click", reloadPage);
  reload.addEventListener("mouseout", noElement);
  reload.addEventListener("mouseover", returnId);
  var tempDiv = document.getElementById("rightClickMenu").appendChild(reload);
  var reloadImage = document.createElement('img');
  reloadImage.src = "https://openclipart.org/image/2400px/svg_to_png/171074/reload-icon.png";
  reloadImage.className += reloadImage.className ? 'fitIcon' : 'fitIcon';
  tempDiv.appendChild(reloadImage);

  var newTab = document.createElement('div');
  newTab.className += newTab.className ? ' menuComponent' : 'menuComponent';
  newTab.className += newTab.className ? ' newTab' : 'newTab';
  newTab.addEventListener("click", openInNewTab);
  newTab.addEventListener("mouseout", noElement);
  newTab.addEventListener("mouseover", returnId);
  var tempDiv = document.getElementById("rightClickMenu").appendChild(newTab);
  var newTabImage = document.createElement('img');
  newTabImage.src = "https://cdn0.iconfinder.com/data/icons/pixon-1/24/ink_link_new_tab_open_outside_url_iconsize128-512.png";
  newTabImage.className += newTabImage.className ? 'fitIcon' : 'fitIcon';
  tempDiv.appendChild(newTabImage);

}

function removeFunctionalButtons() {
  var rcm = document.getElementById("rightClickMenu");
  var goBacks = document.getElementsByClassName("goBack");
  var goForwards = document.getElementsByClassName("goForward");
  var reloads = document.getElementsByClassName("reload");
  var newTabs = document.getElementsByClassName("newTab");
  for(var i = 0; i < goBacks.length; i++){
    rcm.removeChild(goBacks[i]);
    rcm.removeChild(goForwards[i]);
    rcm.removeChild(reloads[i]);
    rcm.removeChild(newTabs[i]);
    addDiv();
    deleteDiv();
  }
}

function addCopyAndPasteButton() {
  first = true;
  var copy = document.createElement('div');
  copy.className += copy.className ? ' menuComponent' : 'menuComponent';
  copy.className += copy.className ? ' copy' : 'copy';
  copy.addEventListener("click", copyAndPaste);
  copy.addEventListener("mouseout", noElement);
  copy.addEventListener("mouseover", returnId);
  var tempDiv = document.getElementById("rightClickMenu").appendChild(copy);
  var copyImage = document.createElement('img');
  copyImage.src = "https://www.materialui.co/materialIcons/content/content_copy_black_192x192.png";
  copyImage.className += copyImage.className ? 'fitIcon' : 'fitIcon';
  tempDiv.appendChild(copyImage);

  var canvas = document.createElement('div');
  canvas.className += canvas.className ? ' menuPictureFrame' : 'menuPictureFrame';
  canvas.addEventListener("mouseout", noElement);
  canvas.addEventListener("mouseover", returnId);
  var tempDiv = document.getElementById("rightClickMenu").appendChild(canvas);
  var canvasImage = document.createElement('img');
  canvasImage.className += canvasImage.className ? 'menuPictureFrameCanvas' : 'menuPictureFrameCanvas';
  tempDiv.appendChild(canvasImage);

  document.getElementById("rightClickMenu").className += document.getElementById("rightClickMenu").className ? 'canvas' : 'canvas';
}

function removeCopyAndPasteButton() {
  var rcm = document.getElementById("rightClickMenu");
  var copys = document.getElementsByClassName("copy");
  var canvass = document.getElementsByClassName("menuPictureFrame");
  rcm.removeChild(canvass[0]);
  for(var i = 0; i < copys.length; i++){
    rcm.removeChild(copys[i]);
    addDiv();
    deleteDiv();
  }

  document.getElementById("rightClickMenu").className -= document.getElementById("rightClickMenu").className ? 'canvas' : 'canvas';

}

function addPrint() {
  first = true;
  var printPage = document.createElement('div');
  printPage.className += printPage.className ? ' menuComponent' : 'menuComponent';
  printPage.className += printPage.className ? ' printPage' : 'printPage';
  printPage.addEventListener("click", PrintPage);
  printPage.addEventListener("mouseout", noElement);
  printPage.addEventListener("mouseover", returnId);
  var tempDiv = document.getElementById("rightClickMenu").appendChild(printPage);
  var printPageImage = document.createElement('img');
  printPageImage.src = "https://image.flaticon.com/icons/png/128/34/34441.png";
  printPageImage.className += printPageImage.className ? 'fitIcon' : 'fitIcon';
  tempDiv.appendChild(printPageImage);
}

function removePrint() {
  var rcm = document.getElementById("rightClickMenu");
  var prints = document.getElementsByClassName("printPage");
  for(var i = 0; i < prints.length; i++){
    rcm.removeChild(prints[i]);
    addDiv();
    deleteDiv();
  }
}

var clicked = false;

function changeMenu() {
  if(!clicked){
    deleteDiv();
    deleteDiv();
    deleteDiv();
    deleteDiv();
    addFunctionalButtons();
    addCopyAndPasteButton();
    addPrint();
    animationSpeed = 0.5;
    clicked = true;
  }
  else{
    addDiv();
    addDiv();
    addDiv();
    removeFunctionalButtons();
    removeCopyAndPasteButton();
    removePrint();
    animationSpeed = 1;
    clicked = false;
  }
}
