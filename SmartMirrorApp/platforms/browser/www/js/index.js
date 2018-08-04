$(document).ready(function(){
    document.addEventListener("deviceready", onDeviceReady, false);
});

function onDeviceReady() {
    function clock() {
        var time = new Date();
        var h = time.getHours();
        var m = time.getMinutes();
        if(m < 10) {
            m = ('0' + m);
        }
        var day = time.getDay();
        var date = time.getDate();
        var month = time.getMonth();

        var dayNames = ["Saturday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"];
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var clock =  '<h1>'+ h + ':' + m +'</h1>';
        clock += '<h3>'+ dayNames[day] +' '+ date +' '+ monthNames[month]+'</h3>'; 

        $('#clock').html(clock);
    }

    function greetings(h) {
        var time = new Date();
        var h = time.getHours();
        var greeting;
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
        console.log('Greeting: '+greeting);
        $('#greeting').html('<h2>'+greeting+'</h2>');
        }

//could potentially squish into 1 function to get weather by putting weather data into an object
    function getWeather(location) {
        $.simpleWeather({
            location: location,
            unit: 'c',
            success: function(weather) {
                console.log('Location: '+location);
                speak('the weather in '+location+' is '+weather.currently);
            },
            error: function(error) {
                speak(error);
            }
        })
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

                for(var i=0;i<3;i++) {
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

    function getLocation() {
        var location;
        console.log('Getting location...');
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log('Geolocation Success');
            location = position.coords.latitude+','+position.coords.longitude;
            weatherWidget(location);
            },
            function(error) {
                console.log('Geolocation Error: '+error.message);
                location = 'New York';
        });
    }

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
                origins: [origin],
                destinations: [destination],
                travelMode: 'BICYCLING'
            }, 
            function(response, status) {
                
                if(status !== 'OK') {
                    speak('Error was: '+status);
                }
                else {
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

    function parseFeed() {
        var rssArray = [];
        $.ajax({
             type: 'GET',
             url: 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk#',
             success: function(data) {
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
                loadRSS(rssArray);

             }
        });
    }

    function loadRSS(rssArray) {
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

    function startRecognition() {
        recognition = new SpeechRecognition();
        recognition.start();
        $('#recording').css('visibility', 'visible');
        recognition.onend = function() {
            $('#recording').css('visibility', 'hidden');
        }
        recognition.onresult = function(event) {
            if (event.results.length > 0) {
                console.log(event.results)
                var speech=event.results[0][0].transcript.toLowerCase();
                console.log(speech);
                parseSpeech(speech);
            }
        }
    } 

    function speak(text, lang) {
        var speech = new SpeechSynthesisUtterance();
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
    
    function translate(to_translate, to_language) {
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

    var music = document.getElementById('player');
    function parseSpeech(speech) {
        speechArr = speech.split(' ');
        if(speech == 'cancel') {
            music.muted = false;
        }
        else if(speech == 'play music') {
            music.muted = false;
            music.src='resources/music/music.mp3';
            music.play();
        }
        else if(speech == 'stop music') {
            music.pause();
        }
        else if(speech.includes("what's the weather in")) {
            var location = speechArr.slice(4);
            location = location.join(' ');
            getWeather(speechArr.slice(4));
        }
        else if(speech.includes('distance from ', 'to')) {
            directions(speechArr, 'distance');
        }
        else if(speech.includes('time from ', 'to')) {
            directions(speechArr, 'duration');
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

    console.log('Device Ready');
    StatusBar.hide();
    getLocation();
    setInterval(getLocation, 6000000)
    setInterval(clock, 1000);
    greetings();
    setInterval(greetings, 3600000);
    // $(window).click( function(){startRecognition()});
    document.addEventListener('touchstart', function() {
        startRecognition();
        music.muted = true;
    });
    parseFeed();
}




