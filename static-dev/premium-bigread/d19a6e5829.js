;
(function($) {

    if (typeof videojs !== 'undefined') {

        // https://medium.com/@andsens/radial-progress-indicator-using-css-a917b80c43f9
        // runs the autoplay countdown and functionality for videos in the hero of article pages
        // assumes the video is always loaded in time
        autoplay = function() {
            var $vcOverlay = $('#vcOverlay'),
                $videoWrapper = $vcOverlay.parent('.video-wrapper'),
                $vcPlay = $vcOverlay.find('#vcPlay'),
                $vcStop = $vcOverlay.find('#vcStop'),
                $vcNever = $vcOverlay.find('#vcNever'),
                $radialProgress = $vcOverlay.find('.radial-progress'),
                vcTimer = 5,
                vcTimeout,
                userAutoplay = $.cookie('apv'),
                $vcEnableAp = $('<div class="vcEnableAp" id="vcEnableAp">Enable auto play</div>'),
                windowIsActive,
                videoPlayed,
                isPaused = false,
                brightcovePlayer,
                vcPlayed = false,
                hidden;
            // function to play video with the right tracking
            var playAutoJs = function(playType) {
                // swap some tracking variables
                inlinePlayVar = 'autoplay:' + playType;
                // var waitTime = 500;
                // setTimeout(function () {
                // Resume play if the element if is paused.
                if (!vcPlayed) {
                    // play video
                    brightcovePlayer.ima3.ready(function() {
                        if ((browserDetect.browser === 'Chrome' && browserDetect.version >= 66) ||
                            (browserDetect.browser === 'Safari' && browserDetect.version >= 11)) {
                            brightcovePlayer.muted(true);
                        }

                        brightcovePlayer.play();
                    });
                    vcPlayed = true;
                }
                // }, waitTime);
            };
            // adds the player to the page
            var vcAddPlayer = function(autoplay, playType) {
                // removes the countdown
                $vcOverlay.remove();
                if (autoplay) {
                    // plays the videowith tracking
                    playAutoJs(playType);
                } else {
                    // kills the timer
                    window.clearInterval(vcTimeout);
                }
            };
            // tick down the timer
            var vcTick = function() {
                if (!isPaused) {
                    // if the timer is done
                    if (vcTimer < 0) {
                        videoPlayed = true;
                        vcAddPlayer(true, 'play');
                        window.clearInterval(vcTimeout);
                    } else {
                        // change the html which in turn alters the css
                        $radialProgress.attr('data-progress', vcTimer--);
                    }
                }
            };
            // add and play video now
            $vcPlay.click(function(e) {
                e.preventDefault();
                // adds the player with autoplay
                vcAddPlayer(true, 'manualplay');
            });
            // stop the countdown but add the video wuthout autoplay
            $vcStop.click(function(e) {
                e.preventDefault();
                // comscore tracking
                // cs.customTrack({
                //   'on_page_activity': 'autoplay:paused'
                // });
                // adds the player without autoplay
                vcAddPlayer(false);
            });
            // disable autoplay from now on
            $vcNever.click(function(e) {
                e.preventDefault();
                // comscore tracking
                // cs.customTrack({
                //   'on_page_activity': 'autoplay:disabled'
                // });
                // sets the cookie variable to stop the countdown from now on
                $.cookie("apv", false, {
                    expires: 30,
                    path: '/'
                });
                // adds the player without autoplay
                vcAddPlayer(false);
            });
            // function to see if the video is playing when auto play is disabled
            var playCheckTicker,
                checkIfPlaying = function() {
                    // if the video has loaded
                    if (brightcovePlayer !== undefined) {
                        // if the video is playing
                        if (!brightcovePlayer.paused()) {
                            // remove the button
                            $vcEnableAp.remove();
                        } else {
                            // tick over again
                            playCheckTicker = setTimeout(checkIfPlaying, 200);
                        }
                    } else {
                        // tick over again
                        playCheckTicker = setTimeout(checkIfPlaying, 200);
                    }
                };
            // if the page is shown, play the video
            function handleVisibilityChange() {
                    if (!document[hidden] && !videoPlayed) {
                        isPaused = false;
                    } else {
                        isPaused = true;
                    }
                }
                // Recalculate overlay size after window resize
            function vcOverlayResize() {
                $vcOverlay.css('height', $videoWrapper.outerHeight());
                $vcOverlay.css('width', $videoWrapper.outerWidth());
            }
            this.checkAutoplay = function(player) {
                brightcovePlayer = player;
                vcOverlayResize();
                // if the user allows auto play
                if (typeof $.cookie('apv') === 'undefined') {
                    // show the countdown
                    $vcOverlay.show();
                    // Set interval
                    vcTimeout = setInterval(vcTick, 1000);
                    // set name of hidden property and visibility change event
                    var visibilityChange;
                    if (typeof document.hidden !== "undefined") {
                        hidden = "hidden";
                        visibilityChange = "visibilitychange";
                    } else if (typeof document.mozHidden !== "undefined") {
                        hidden = "mozHidden";
                        visibilityChange = "mozvisibilitychange";
                    } else if (typeof document.msHidden !== "undefined") {
                        hidden = "msHidden";
                        visibilityChange = "msvisibilitychange";
                    } else if (typeof document.webkitHidden !== "undefined") {
                        hidden = "webkitHidden";
                        visibilityChange = "webkitvisibilitychange";
                    }
                    if (typeof visibilityChange !== 'undefined') {
                        // Add event listener if window visibility has changed
                        document.addEventListener(visibilityChange, handleVisibilityChange, false);
                        // start the countdown if window is active initially
                        if (document[hidden] || videoPlayed) {
                            isPaused = true;
                        }
                    }
                    $(window).resize(function() {
                        vcOverlayResize();
                    });
                } else {
                    // remove the countdown
                    $vcOverlay.remove();
                    // add the enable button
                    $videoWrapper.append($vcEnableAp);
                    // create the click function for the enable auto play button
                    $vcEnableAp.click(function(e) {
                        e.preventDefault();
                        // remove the button
                        $vcEnableAp.remove();
                        // sets the storage variable to allow the countdown from now on
                        $.removeCookie('apv', {
                            path: '/'
                        });
                        // adds the player with autoplay
                        vcAddPlayer(true, 'manualplay');
                    });
                    // tick over the timer so when the video is playing the button is removed
                    playCheckTicker = setTimeout(checkIfPlaying, 200);
                }
            };
        };

        // create array for player IDs
        var players = [];
        // determine the available player IDs
        for (x = 0; x < Object.keys(videojs.players).length; x++) {

            // assign the player to setPlayer
            var setPlayer = Object.keys(videojs.players)[x];
            // define the ready event for the player
            videojs(setPlayer).ready(function() {
                // assign this player to a variable
                var player = this;

                // assign an event listener for play event
                player.on('play', onPlay);
                player.one('play', attachIrisToolTips);
                player.on('timeupdate', onTimeUpdate);

                $(window).bind('focus scroll',function(e){
                    //on window focus or scroll, resume playback on non-mobile devices.
                    resumeFromAutoPause(player);
                });

                // push the player to the players array
                players.push(player);

                // Update IMA3 Server Url
                player.ima3.settings.serverUrl = nzmeads.getPrerollURL();

                if (!isMobile.any()) {
                    // Autoplay only above 810 breakpoint
                    if (window.innerWidth >= 810) {
                        if (player.el_.dataset.checkAutoplay !== undefined && player.el_.dataset.checkAutoplay == 'true') {
                            // Autoplay with autoplay overlay
                            var ap = new autoplay();
                            ap.checkAutoplay(player);
                        } else if (player.el_.dataset.autoplay !== undefined && player.el_.dataset.autoplay == 'true') {
                            // Autoplay without autoplay overlay
                            player.ima3.ready(function() {
                                if ((browserDetect.browser === 'Chrome' && browserDetect.version >= 66) ||
                                    (browserDetect.browser === 'Safari' && browserDetect.version >= 11)) {
                                    player.muted(true);
                                }
                                player.play();
                            });
                        }
                    }
                } else if (isMobile.Safari() || (browserDetect.browser === 'Safari' && browserDetect.version >= 11)) {
                    player.ima3.ready(function() {
                        player.ima3.adsLoader.getSettings().setDisableCustomPlaybackForIOS10Plus(true);
                    });
                }
            });
        }

        // event listener callback function
        function onPlay(e) {
            // determine which player the event is coming from
            var id = e.target.id;
            // go through the array of players
            for (var i = 0; i < players.length; i++) {
                // get the player(s) that did not trigger the play event
                if (players[i].id() != id) {

                    // Disable the auto-paused flag on all other players so that they dont auto-play when scrolled back into view.
                    $(players[i].el_).attr('data-auto-paused', 'false');

                    // pause other player ads if exists
                    if (typeof players[i].ima3.adsManager !== 'undefined') {
                        players[i].ima3.adsManager.pause();
                    }
                    // pause the other player(s)
                    videojs(players[i].id()).pause();
                }
            }
        }

        function attachIrisToolTips(){
            $('.vjs-thumbs-up-button').attr('title',"Like");
            $('.vjs-thumbs-down-button').attr('title',"Dislike");
            $('.vjs-skip-forward-button').attr('title',"Play Next");
            $('.vjs-skip-backward-button').attr('title',"Play Previous");
        }

        function resumeFromAutoPause(player){
            //this function resumes player playback when player is in view and document has focus.
            var bcPlayer = player;
            var jqPlayer = $(player.el_);

            //check player attribute 'data-auto-paused' exists
            if(jqPlayer.attr('data-auto-paused') !== undefined && jqPlayer.attr('data-auto-paused') == 'true'){

                //play the player if player element is in view and document has focus
                if (inView(jqPlayer,50) && document.hasFocus() ) {
                    videojs(bcPlayer.id()).play();
                    jqPlayer.attr('data-auto-paused', 'false');
                }

            }
        }

        function onTimeUpdate(e) {
            var bcPlayer = this.player_;
            var jqPlayer = $(this.player_.el_);

            //in the last 0.7s, pause video if the video is not in view or window not in focus
            if( (bcPlayer.duration() - bcPlayer.currentTime()) < 0.8) {
                if (!inView(jqPlayer,50) || !document.hasFocus() ) {
                    jqPlayer.attr('data-auto-paused','true');
                    videojs(bcPlayer.id()).pause();
                }
            }
        }
    }

})(jQuery);