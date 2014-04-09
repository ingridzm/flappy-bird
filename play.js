

var play_state = {

    // No more 'preload' function, since it is already done in the 'load' state

create: function() { 

this.bird = this.game.add.sprite(100, 245, 'bird');  

       //add gravity to mke bird fall

        this.bird.body.gravity.y = 1000;

        this.bird.anchor.setTo(-0.2, 0.5); // changes center of rotation 

// Call the 'jump' function when the spacekey is hit

    var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    space_key.onDown.add(this.jump, this);   

    this.pipes = game.add.group();  
    this.pipes.createMultiple(20, 'pipe');    

    this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);


//display a score label
    score = 0;  
    var style = { font: "30px Arial", fill: "#ffffff" };  
    this.label_score = this.game.add.text(20, 20, "0", style);  

    this.jump_sound = this.game.add.audio('jump');   
    },

   
    
    update: function() {
    // Function called 60 times per second

    // If the bird is out of the world (too high or too low), call the 'restart_game' function
    if (this.bird.inWorld == false)
        this.restart_game();

     this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);

     if (this.bird.angle < 20)  
    this.bird.angle += 1; 
},
hit_pipe:function(){
    if (this.bird.alive == false)  
    return; 

this.bird.alive = false;
this.game.time.events.remove(this.timer);
this.pipes.forEachAlive(function(p){
    p.body.velocity.x=0;
},this);

},


  jump: function(){
    if(this.bird.alive==false) return;

    this.bird.body.velocity.y = -350;// make the bird jump  

    // create an animation on the bird
var animation = this.game.add.tween(this.bird);

// Set the animation to change the angle of the sprite to -20° in 100 milliseconds
animation.to({angle: -20}, 100);

// And start the animation
animation.start(); 

this.jump_sound.play();  



  },  
// Restart the game
restart_game: function() {  
  this.game.time.events.remove(this.timer);  
    // Start the 'main' state, which restarts the game
    this.game.state.start('menu');

   

},


add_one_pipe: function(x, y) {  
    // Get the first dead pipe of our group
    var pipe = this.pipes.getFirstDead();
    // Set the new position of the pipe
    pipe.reset(x, y);
    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200; 
    // Kill the pipe when it's no longer visible 
    pipe.outOfBoundsKill = true;
},

add_row_of_pipes: function() {  
    var hole = Math.floor(Math.random()*5)+1; //randon number between 1-6

    for (var i = 0; i < 8; i++)
        if (i != hole && i != hole +1) 
            this.add_one_pipe(400, i*60+10);  

    score += 1;  
    this.label_score.content = score;   



},

};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);  
game.state.start('main'); 


 