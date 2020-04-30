// Drawing with text. Ported from Generative Design book - http://www.generative-gestaltung.de - Original licence: http://www.apache.org/licenses/LICENSE-2.0

// Application variables
var position = {x: 0, y: window.innerHeight/2};
var counter = 0;
var minFontSize = 3;
var angleDistortion = 0;
var letters = "IXD has empowered me to use my design skills in a very broad range of ways. It’s allowed me to put on multiple hats, and even step into the shoes of a strategist. Learning that design can be a superpower within the world of strategy is something I will take with me throughout my career and beyond. An icon lives in a button, which lives within a module, which lives in a screen, which lives in a flow, which lives in a platform. The gestalt of a platform depends on the relationship between each individual atom of the system. The process of learning this has been a delight at IXD. I am able to foster my design skills and thinking, as well as working with some of the most talented designers I have ever met. The RISD training was nothing less than excellent. It really pushed my ability to think outside of the box, dig deeper in my mind, and all while having fun at the same time. The curriculum and the instructors were well selected and we all learned so much over the 4 weeks. IXD has encouraged me to challenge the status quo and to evaluate the possibilities of design. My career has been a blast so far, and Infosys XD played a huge role in it. As a member of the first cohort team, you provided well needed inspiration and guidance for us, especially during the times of struggle and doubt, as we ventured through various temporary workspaces, eventually settling into our permanent home at the Providence hub today. It’s given me opportunities where I get to learn from super knowledgeable folks and given me opportunities to lead/foster the younger design talent. My experience has taught me a lot of things about myself and forced me to evolve in areas where I was stagnant. Being a part of IXD has expanded the way I see the world. Instead of merely seeing a problem and its immediate context, I now see the problem and its system­; everything is interconnected in a holistic manner";
var letters2 = "Design is intelligence made visible.-- I’ll always remember that quote not only because it was on of your favorites, but also because it captures everything that I value about design and its potential to make sense of the complexity of the world around us. I’m a firm believer in “design influencing product strategy” early on and not just meant to be considered at the end of the execution process. Analysis is only half of it. What one does with information is just as important as the steps preceding it. The other half – of collaboration – is where magic happens. What I’ve learned is that good design does not come without some tension. If there aren’t sparks flying in the room, then go back to the drawing board.";
var letters3 = "Your vision of a collaborative space filled with people from a range of backgrounds and perspectives is highly appreciated. simple gesture and willingness to help is what will be dearly missed at this office. Thank you for bringing together IXD and the PVD studio, as it has connected me to many great minds. All of the co-workers I have been placed on teams with have been of a high caliber: smart, eager, professional, and pleasant to work with. I have also been impressed with the gender diversity, as there are many women in our studio, especially in positions of authority. The hub has slowly turned into a second home where I feel comfortable to be myself and empowered enough to know my opinion along with other opinions matter greatly. I love coming to work every day surrounded by innovative, creative thinkers, out of the box, soul searchers.  Scott Sorokin is best in class when it comes to all of these – and why his brain child was the PVD studio. My favorite part about being a part of the PVD hub is the never ending evolution of our hub, our designers and our studio culture."
// Drawing variables
var canvas;
var context;
var mouse = {x: 0, y: 0, down: false}

function init() {
  canvas = document.getElementById( 'canvas' );
  context = canvas.getContext( '2d' );
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup',   mouseUp,   false);
  canvas.addEventListener('mouseout',  mouseUp,  false);  
  canvas.addEventListener('dblclick', doubleClick, false);
  
  window.onresize = function(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

function mouseMove ( event ){
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  draw();
}

function draw() {
 if ( mouse.down ) {
    var d = distance( position, mouse );
    var fontSize = minFontSize + d/2;
    var letter = letters[counter];
    var stepSize = textWidth( letter, fontSize );
    
    if (d > stepSize) {
      var angle = Math.atan2(mouse.y-position.y, mouse.x-position.x);
      
      context.font = fontSize + "px Calibre";
    
      context.save();
      context.translate( position.x, position.y);
      context.rotate( angle );
      context.fillText(letter,0,0);
      context.restore();

      counter++;
      if (counter > letters.length-1) {
        counter = 0;
      }
    
    //console.log (position.x + Math.cos( angle ) * stepSize)
      position.x = position.x + Math.cos(angle) * stepSize;
      position.y = position.y + Math.sin(angle) * stepSize;

      }
  }     
}

function distance( pt, pt2 ){
  
  var xs = 0;
  var ys = 0;
 
  xs = pt2.x - pt.x;
  xs = xs * xs;
 
  ys = pt2.y - pt.y;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}

function mouseDown( event ){
  mouse.down = true;
  position.x = event.pageX;
  position.y = event.pageY;
  
  document.getElementById('info').style.display = 'none';
}

function mouseUp( event ){
    mouse.down = false;
}

function doubleClick( event ) {
  canvas.width = canvas.width; 
}

function textWidth( string, size ) {
  context.font = size + "px Calibre";
  
  if ( context.fillText ) {
    return context.measureText( string ).width;
  } else if ( context.mozDrawText) {
    return context.mozMeasureText( string );
  }
  
 };

init();