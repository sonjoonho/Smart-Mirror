//Waiting for the device to be ready before starting program
$(document).ready(function(){
    document.addEventListener("deviceready", onDeviceReady, false);
});

function onDeviceReady() {
    function clock() {
        var time = new Date();
        var h = time.getHours();
        var m = time.getMinutes();
        //Puts an '0' in front of single-digit numbers e.g 12:05
        if(m < 10) {
            m = ('0' + m);
        }
        var day = time.getDay();
        var date = time.getDate();
        var month = time.getMonth();

        //The day and month are returned as numbers, so the names must be selected from these arrays
        var dayNames = ["Saturday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"];
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var clock =  '<h1>'+ h + ':' + m +'</h1>';
        clock += '<h3>'+ dayNames[day] +' '+ date +' '+ monthNames[month]+'</h3>'; 

        //This function displays the widget
        //It works by replacing the HTML called 'clock' in the index.html file with the HTML in the brackets
        $('#clock').html(clock);
    }

    function greetings(h) {
        var time = new Date();
        var h = time.getHours();
        var greeting;

        //The greeting will change depending on the time of day
        if(5 < h && h < 12) {
            greeting = "Good morning!";
        }
        else if(h == 12) {
            greeting = "Go eat lunch!"
        }
        else if(12 < h && h < 18) {
            greeting = "Good afternoon!"
        }
        else {
            greeting = "Good evening!"
        }

        //The 'console.log(...)' function will output some text to the console
        //The console is only visible to developers and is very useful when working out which parts of the code are working
        console.log('Greeting: '+greeting);

        $('#greeting').html('<h2>'+greeting+'</h2>');
        }

    function getLocation() {
        var location;
        console.log('Getting location...');

        //Find the location of the device using GPS
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log('Geolocation Success');

            //Returns the latitude and longitude of the device which are then passed to the 'weatherWidget' function
            location = position.coords.latitude+','+position.coords.longitude;
            weatherWidget(location);
            },

            //If an error occurs, a message will display and the location will default to 'New York'
            function(error) {
                console.log('Geolocation Error: '+error.message);
                location = 'New York';
        });
    }

    function weatherWidget(location){
        console.log('Weather location: '+location);
        $.simpleWeather({
            location: location,
            unit: 'c',
            success: function(weather) {

                console.log('Weather OK')
                var weatherData = '<h1><i class="icon-'+weather.code+'"></i>'+weather.temp+'<span class="degrees">&deg;'+weather.units.temp+'</span></h1>';
                weatherData += '<h3>'+weather.currently+'</h3><p>'+weather.city+','+weather.region+'</p>';

                for(var i=0; i<3; i++) {
                    weatherData += '<div class="forecastBox"><p>'+weather.forecast[i].day+'</p><i class="icon-'+weather.forecast[i].code+'"></i>';
                    weatherData += '<p>'+weather.forecast[i].high+'&deg; <span class="low">'+weather.forecast[i].low+'&deg;</span></p></div>';
                }

                $('#weather').html(weatherData);

            },
            error: function(error) {
                $('#weather').html('<p>'+error+'</p>');
            }
        })
        
    }

    function getWeather(location) {
        $.simpleWeather({
            location: location,
            unit: 'c',
            success: function(weather) {
                console.log('Location: '+location);

                //The speak function (which is defined a bit later on) will speak the string passed to it
                speak('the weather in '+location+' is '+weather.currently);
            },
            error: function(error) {
                speak(error);
            }
        })
    }

    //This is an unused block of code that demonstrated the capability of embedding a google maps view
    function initMap() {
        var hillsRoad = new google.maps.LatLng(52.188156, 0.135181);
        var mapOptions = {
            zoom: 14,
            center: hillsRoad,
            mapTypeId: 'roadmap',
            styles: [
            {

            }
            ],
        disableDefaultUI:true
        };
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    }

    function directions(speechArr, type) {
        console.log(type);
        if(speechArr[2] == 'home') {
            origin = 'CB42WP';
        }
        else if(speechArr[2] == 'work') {
            origin == 'CB28PE';
        }
        if(speechArr[4] == 'home') {
            destination == 'CB42WP'
        }
        else if(speechArr[4] == 'work') {
            destination = 'CB28PE'
        }
        console.log('Origin: '+origin);
        console.log('Destinatation: '+destination);
        var service = new google.maps.DistanceMatrixService();
        
        service.getDistanceMatrix({
            //Here, we give the API some information about what we want to know
                origins: [origin],
                destinations: [destination],
                travelMode: 'BICYCLING'
            }, 
            function(response, status) {
                
                if(status !== 'OK') {
                    speak('Error was: '+status);
                }
                else {

                    //The API gives a response, then we have to extract just the information we want
                    console.log(response);
                    origin = response.originAddresses[0];
                    destination = response.destinationAddresses[0];
                    var results = response.rows[0].elements[0][type].text;
                    try {
                        console.log('Results: '+results);
                        speak(results);

                        $('#traveltext').html('<ul><li>'+origin+'</li><li>'+destination+'</li><li>'+results+'</li></ul>');

                    }
                    catch(err) {
                        speak('Distance Matrix Error: '+err);
                    }
                }
            });
        }   

    //This function parses the BBC news RSS feed
    function parseFeed() {
        var rssArray = [];
        $.ajax({
             type: 'GET',

             //Here, we enter whatever RSS feed you want. It could even be made to display the Hills Road news feed
             url: 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk#',
             success: function(data) {

                //The title, description, and date of each news item is taken and placed in an array
                var $xml = $(data);
                $xml.find("item").each(function() {
                    var $this = $(this),

                    item = {
                        title: $this.find("title").text(),
                        description: $this.find("description").text(),
                        pubDate: $this.find("pubDate").text(),
                    }

                    rssArray.push(item.title);
                });   

                //Then the array containing the news items is passed to another function
                loadRSS(rssArray);

             }
        });
    }

    //This function displays the parsed news feed
    function loadRSS(rssArray) {

        //Checking that the array actually contains items
        if(rssArray.length > 0 ) {
            console.log('RSS OK');           

            var rssFeed='<ul>';
            for(i=0; i < 6; i++) {
                rssFeed += '<li>'+rssArray[i]+'</li>';
            }
            rssFeed+='</ul>';
            console.log('rssFeed length: '+rssArray.length);

            $('#rss').html(rssFeed);
        }
        else {
            console.log('Error: rssArray is empty')
        }
    }

    //This is the function that synthesises speech
    function speak(text, lang) {
        var speech = new SpeechSynthesisUtterance();

        //This 'switch' statement selects the appropriate language code so that the speech will sound natural in any language
        //For now it only supports spanish (es) and korean (ko) for demonstration purposes
         switch(lang) {
            case 'es':
                speech.lang = 'es-ES';
                break;
            case 'ko':
                speech.lang = 'ko';
                break;
            default:
                speech.lang = 'en-GB';
        }

        speech.text = text;
        speechSynthesis.speak(speech);
    }
    
    //This function translates text given to it
    function translate(to_translate, to_language) {

        //Converting the language spoken by the user into Google Translate language codes
        //Again, it only supports spanish and korean in its current state
        switch(to_language) {
            case 'spanish':
                to_language = 'es';
                break;
            case 'korean':
                to_language = 'ko';
                break;
            default:
                to_translate = "I don't know that language"
                to_language = 'en'
        }

        //This actually works by querying the google translate website and then taking the translation directly from the HTML
        //This bypasses the need to mess around with more APIs
        var link = 'https://translate.google.com/m?hl='+to_language+ '&sl=en'+'&q='+to_translate.replace(' ', '+');
        console.log(link);
        $.ajax ({
            url: link,
            success: function(page) {
                var translation = $(page).get(7);
                translation = translation.innerHTML;
                console.log(translation);
                $('#translate').html('<h2>'+translation+'</h2>');
                $('#translate').slideDown('slow');
                setTimeout(function() {
                    $('#translate').slideUp('slow')}
                    , 5000);
                speak(translation, to_language);
            }
        })
    }

    //This is the function that will listen and recognise speech
    function startRecognition() {
        recognition = new SpeechRecognition();
        recognition.start();

        //This snippet of code controls the visibility of the 'recording' icon
        $('#recording').css('visibility', 'visible');
        recognition.onend = function() {
            $('#recording').css('visibility', 'hidden');
        }

        recognition.onresult = function(event) {
            if (event.results.length > 0) {
                console.log(event.results)
                var speech=event.results[0][0].transcript.toLowerCase();
                console.log(speech);

                //The speech is then passed to another function fior parsing
                parseSpeech(speech);
            }
        }
    } 

    var music = document.getElementById('player');

    //This function executes instructions based on the speech passed to it
    function parseSpeech(speech) {

        //The sentence is split into each words
        speechArr = speech.split(' ');
        if(speech == 'cancel') {
            music.muted = false;
        }

        else if(speech == 'play music') {
            music.muted = false;

            //Currently the music player only supports one .mp3
            //Spotify integration is a route I aimlessly explored, but does not seem to be possible right now
            //However, it's a possibility in the future.
            music.src='resources/music/music.mp3';
            music.play();
        }

        else if(speech == 'stop music') {
            music.pause();
        }

        //If the speech includes this phrase then...
        else if(speech.includes("what's the weather in")) {

            //Finds the fourth word (or phrase following the fourth word), which should be the location for the weather
            var location = speechArr.slice(4);
            location = location.join(' ');
            getWeather(speechArr.slice(4));
        }

        else if(speech.includes('distance from ', 'to')) {
            directions(speechArr, 'distance');
        }

        else if(speech.includes('time from ', 'to')) {
            directions(speechArr, 'duration');

            //This is a little animation that displays the duration in a window
            $('#traveldiv').slideDown('slow');
            setTimeout( function(){
                $('#traveldiv').slideUp('slow')}
                , 5000);
        }

        else if(speech == 'show me the news') {
            speak("here are today's items")
            $('#rss').slideDown('slow');
        }

        else if(speech == 'close') {
            $('#rss').slideUp('slow');
        }

        else if(speech.includes('how do i say', 'in')) {
            var to_translate = speechArr.slice(4, speechArr.indexOf('in'));
            to_translate = to_translate.join(' ');
            var to_language = speechArr[speechArr.indexOf('in')+1];
            console.log('Text: '+to_translate+' Language: '+to_language);
            translate(to_translate, to_language);
        }

        else {
            music.muted = false;
            speak("I didn't understand that");
        }

    }



    //Here, all the appropriate functions are called (run)
    console.log('Device Ready');

    //This hides the phone's status bar at the top
    StatusBar.hide();
    getLocation();

    //The setInterval function calls a function at a certain interval (milliseconds)
    //In this case, the weather widget is updated every 10 minutes
    setInterval(getLocation, 6000000)
    setInterval(clock, 1000);
    greetings();
    setInterval(greetings, 3600000);

    //The page 'listens' for a touch. When a touch is detected speech recognition begins
    document.addEventListener('touchstart', function() {
        startRecognition();

        //When this happens, any music playing is muted
        music.muted = true;
    });

    parseFeed();
}