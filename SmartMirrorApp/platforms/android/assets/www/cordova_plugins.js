cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-calendar.Calendar",
        "file": "plugins/cordova-plugin-calendar/www/Calendar.js",
        "pluginId": "cordova-plugin-calendar",
        "clobbers": [
            "Calendar"
        ]
    },
    {
        "id": "cordova-plugin-calendar.tests",
        "file": "plugins/cordova-plugin-calendar/test/tests.js",
        "pluginId": "cordova-plugin-calendar"
    },
    {
        "id": "cordova-plugin-geolocation.geolocation",
        "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
        "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.PositionError",
        "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
        "pluginId": "cordova-plugin-geolocation",
        "runs": true
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognition",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognition.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognition"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionError",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionError.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionError"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionAlternative",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionAlternative.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionAlternative"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionResult",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionResult.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionResult"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionResultList",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionResultList.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionResultList"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionEvent",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionEvent.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionEvent"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechGrammar",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechGrammar.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechGrammar"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechGrammarList",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechGrammarList.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechGrammarList"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechsynthesis.SpeechSynthesis",
        "file": "plugins/org.apache.cordova.speech.speechsynthesis/www/SpeechSynthesis.js",
        "pluginId": "org.apache.cordova.speech.speechsynthesis",
        "clobbers": [
            "window.speechSynthesis"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechsynthesis.SpeechSynthesisUtterance",
        "file": "plugins/org.apache.cordova.speech.speechsynthesis/www/SpeechSynthesisUtterance.js",
        "pluginId": "org.apache.cordova.speech.speechsynthesis",
        "clobbers": [
            "SpeechSynthesisUtterance"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechsynthesis.SpeechSynthesisEvent",
        "file": "plugins/org.apache.cordova.speech.speechsynthesis/www/SpeechSynthesisEvent.js",
        "pluginId": "org.apache.cordova.speech.speechsynthesis",
        "clobbers": [
            "SpeechSynthesisEvent"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechsynthesis.SpeechSynthesisVoice",
        "file": "plugins/org.apache.cordova.speech.speechsynthesis/www/SpeechSynthesisVoice.js",
        "pluginId": "org.apache.cordova.speech.speechsynthesis",
        "clobbers": [
            "SpeechSynthesisVoice"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechsynthesis.SpeechSynthesisVoiceList",
        "file": "plugins/org.apache.cordova.speech.speechsynthesis/www/SpeechSynthesisVoiceList.js",
        "pluginId": "org.apache.cordova.speech.speechsynthesis",
        "clobbers": [
            "SpeechSynthesisVoiceList"
        ]
    },
    {
        "id": "phonegap-nfc.NFC",
        "file": "plugins/phonegap-nfc/www/phonegap-nfc.js",
        "pluginId": "phonegap-nfc",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-compat": "1.0.0",
    "cordova-plugin-calendar": "4.5.1",
    "cordova-plugin-geolocation": "2.2.0",
    "cordova-plugin-statusbar": "2.1.4-dev",
    "cordova-plugin-whitelist": "1.2.2",
    "org.apache.cordova.speech.speechrecognition": "0.1.1",
    "org.apache.cordova.speech.speechsynthesis": "0.1.0",
    "phonegap-nfc": "0.6.6"
};
// BOTTOM OF METADATA
});