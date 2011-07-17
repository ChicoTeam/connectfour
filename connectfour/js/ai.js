var ai = {
    init: function(options){
        this.game_dimensions = options.game_dimensions;
        this.difficulty = options.difficulty;
        this.last_col = Math.floor(Math.random() * (this.game_dimensions['cols']+1));
        return this;
    },
    
    play: function(){
        var col = -1;
        
        switch(this.difficulty) {
            case 'easy':
                // randomly choose a number between 0 and the number of columns
                var col = Math.floor(Math.random() * (this.game_dimensions['cols']+1));
                break;
            case 'medium':
                var col = -1;

                // try out all possible opponent next-moves
                for(var i = 0; i <= this.game_dimensions['cols']; i++) {
                    var test_game = jQuery.extend(true, {}, game);// clone game object
                    test_game.turn = 'black';
                    test_game.play(i);
                    if(test_game.winning != '')
                        col = i;// block opponent's winning move
                }
            
                // if not blocking opponent's move, make up own move
                if(col == -1) {
                    // random number -1 to 1
                    var rando = Math.floor(Math.random() * 3) - 1;
                    
                    // move next to the last move
                    var col = this.last_col + rando;
                    
                    // keep move in-bounds
                    if(col > this.game_dimensions['cols'])
                        col = this.game_dimensions['cols'];
                    if(col < 0)
                        col = 0;
                    
                    if(!game.can_play(col)) {
                        // oops, column is full, find another...
                        this.last_col = Math.floor(Math.random() * (this.game_dimensions['cols']+1));
                        col = this.play();// recursion
                    }
                }
                break;
            case 'hard':
                break;
        }
        
        this.last_col = col;// save so we know where we went last
        
        return col;
    }
};