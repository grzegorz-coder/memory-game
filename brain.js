function shuffle(cards) {
    var len = cards.length;
    var d = len;
    var array = [];
    var k, i;
    for (i = 0; i < d; i++) {
        k = Math.floor(Math.random() * len);
        array.push(cards[k]);
        cards.splice(k, 1);
        len = cards.length;
    }
    for (i = 0; i < d; i++) {
        cards[i] = array[i];
    }
    return cards;
}

var cards = ["s0.png", "s1.png", "s1.png", "s3.png", "s4.png", "s5.png", "s3.png","s7.png", "s2.png", "s5.png", "s0.png","s7.png", "s4.png","s2.png","s6.png","s6.png"];
cards = shuffle(cards);


var c = [];
for (var i = 0; i < 16; i++) {

    (function(i) {

        c[i] = document.getElementById('c' + i);
        c[i].addEventListener("click", function() {
            revealCard(i);

        });
    }(i));
}

var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var lock = false;
var pairsLeft = 8;
var mtch = new Audio("gc.mp3");
var wow= new Audio("wow.mp3");
var win= new Audio("win.mp3");
var gameover= new Audio("gameover.mp3");

function revealCard(nr)
{
    var opacityValue = $('#c'+nr).css('opacity');

    //alert('Opacity: '+opacityValue);
    let classValue = $('#c'+nr).attr('class');
    if (opacityValue!=0.1 && lock == false&& classValue!='cardA')
    {
        lock = true;
           //alert(nr);

    var obraz= "url(img/"+ cards[nr] +")";
    $('#c'+nr).css('background-image', obraz );
    $('#c'+nr).addClass('cardA');
    $('#c'+nr).removeClass('card');

    if(oneVisible==false)
    {
        //first card
        oneVisible=true;
        visible_nr=nr;
        lock=false;
    }
    else
    {
        //second card
        if(cards[visible_nr] == cards[nr])
        {
            wow.play();
            //alert("para");
            setTimeout(function(){ hide2Cards(nr, visible_nr) }, 750)
           
        }
        else
        {
            mtch.play();
            //alert("pudło")
            setTimeout(function(){ restore2Cards(nr, visible_nr) }, 1000)
        }
        turnCounter++;
        if (turnCounter>20)
        {
            gameover.play();
            $(".board").html("<h1>Game over <br> You loose your turns! </h1>");
            
        }
        $('.score').html("Turn counter: 0"+turnCounter);
        
        oneVisible=false;
    }
}
    }
 

function hide2Cards(nr1, nr2)
{
    $('#c'+nr1).css('opacity','0');
    $('#c'+nr2).css('opacity','0');
    pairsLeft--;

    if(pairsLeft==0 )
    {
        win.play();
        $(".board").html("<h1>You win! <br> Done in "+turnCounter+" turns </h1>");
        
    }
 
    
   
    lock=false;

}

function restore2Cards(nr1, nr2)
{
    $('#c'+nr1).css('background-image', 'url(img/rewers.png)' );
    $('#c'+nr1).addClass('card');
    $('#c'+nr1).removeClass('cardA');

    $('#c'+nr2).css('background-image', 'url(img/rewers.png)' );
    $('#c'+nr2).addClass('card');
    $('#c'+nr2).removeClass('cardA');
    
    lock=false;
}

