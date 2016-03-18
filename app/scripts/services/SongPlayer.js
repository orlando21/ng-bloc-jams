/**
* @function SongPlayer service
* @desc Declares a Angular SongPlayer service (factory recipe) and attaches this service to BlocJams module
* @param {{Service}} SongPlayer
*/
(function() {
    
    /**
    * @function SongPlayer
    * @desc Defines functionality for SongPlayer service and private functions setSong(), playSong()
    */
    function SongPlayer() {
        
        /**
        * @desc Empty SongPlayer object
        * @type {Object}
        */
        var SongPlayer = {};
        
        /**
        * @desc Empty currentSong object
        * @type {Object}
        */        
        var currentSong = null;
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            
            /**
            * @instantiation currentBuzzObject
            * @desc Calls setSong function and plays selected song
            * @param {Object} song
            */
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
                });

            /**
            * @desc Currently playing song
            * @type {Object}
            */
            currentSong = song;
        };
        
        /**
        * @function playSong
        * @desc Plays selected currentBuzzObject and sets global playing property to true
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
/**
* @function SongPlayer.play
* @desc Calls setSong function and plays selected song
* @param {Object} song
*/         
SongPlayer.play = function(song) {
    if (currentSong !== song) {
        setSong(song);
        playSong(song);
    }
};

/**
* @function SongPlayer.pause
* @desc Pauses currently playing song and sets global playing property to false
* @param {Object} song
*/
SongPlayer.pause = function(song) {
    currentBuzzObject.pause();
        song.playing = false;
     };
         
     return SongPlayer;
}
 
angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);

})();