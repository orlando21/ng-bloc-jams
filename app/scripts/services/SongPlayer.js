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
    function SongPlayer(Fixtures) {
        
        /**
        * @desc Empty SongPlayer object
        * @type {Object}
        */
        var SongPlayer = {};
        
        /**
        * @desc Set currentAlbum to albumPicasso
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        
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
                stopSong(song);
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
            SongPlayer.currentSong = song;
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
        * @function stopSong
        * @desc Stop selected currentBuzzObject and sets global playing property to null
        * @param {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };       
        
        /**
        * @function getSongIndex
        * @desc Return the song number of currently playing song
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
            };
        
        /**
        * @desc Empty SongPlayer.currentSong object
        * @type {Object}
        */        
        SongPlayer.currentSong = null;
        
        /**
        * @function SongPlayer.play
        * @desc Calls setSong function and plays selected song
        * @param {Object} song
        */         
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            }
            else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /**
        * @function SongPlayer.pause
        * @desc Pauses currently playing song and sets global playing property to false
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function SongPlayer.previous
        * @desc Decrements song number of currently playing song, and plays the previous song
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(stop);
                SongPlayer.currentSong.playing = null;
                }
            else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
                }
            };

        /**
        * @function SongPlayer.next
        * @desc Increments song number of currently playing song, and plays the next song
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > (currentAlbum.songs.length - 1)) {
                stopSong(song);
                SongPlayer.currentSong.playing = null;
                }
            else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
                }
            };
         
        return SongPlayer;
    };
 
angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);

})();