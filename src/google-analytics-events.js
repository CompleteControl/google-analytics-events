/**
 * ...
 * @author Nigel Britton
 * @company Complete Control
 * @version 0.2.0
 *
 * Usage: GoogleAnalyticsEvents.trackGameEvent( 'PREDEFINED_EVENT_ID', { action: 'PREDEFINED_ACTION_OVERRIDE' } );
 * Usage: GoogleAnalyticsEvents.trackGameCustomEvent( { category: 'CUSTOM_APPLICATION_NAME', action: 'CUSTOM_ACTION', label: 'CUSTOM_LABEL' } );
 */

var GoogleAnalyticsEvents = {
    version: 'v0.2.0',
    debug: false,
    gameEvents: [{
        id: 'PREDEFINED_EVENT',
        category: 'PREDEFINED_APPLICATION_NAME',
        action: 'PREDEFINED_ACTION',
        label: 'PREDEFINED_LABEL',
        value: 0
    }],

    trackEvent: function (eventCategory, eventAction, eventLabel, eventValue) {
        var handlers = {
            gaq: false,
            dataLayer: false,
            ga: false
        };

        // Quit out if Google Analytics/DataLayer is not found
        if (typeof _gaq === 'undefined') { } else { handlers.gaq = true; }
        if (typeof dataLayer === 'undefined') { } else { handlers.dataLayer = true; }
        if (typeof ga === 'undefined') { } else { handlers.ga = true; }

        if (handlers.gaq == true) { _gaq.push(['_trackEvent', eventCategory, eventAction, eventLabel, eventValue]); }
        else if (handlers.dataLayer == true) { dataLayer.push({ 'event': 'GAevent', 'eventCategory': eventCategory, 'eventAction': eventAction, 'eventLabel': eventLabel, 'eventValue': eventValue }); }
        else if (handlers.ga == true) {
            ga('send', 'event', eventCategory, eventAction, eventLabel, eventValue, { 'nonInteraction': 0 });
        }
        else { if (window.console) { console.log('Google Analytics/Google Tag dataLayer: Not Found!'); } }
        GoogleAnalyticsEvents.handlers = handlers;
    },

    getEventById: function (eventID) {
        var gameEvent = false;
        for (var i = 0; i < this.gameEvents.length; i++) {
            if (eventID === this.gameEvents[i].id) {
                gameEvent = this.gameEvents[i];
                break;
            }
        }
        return gameEvent;
    },

    trackGameEvent: function (eventID, eventParams) {
        var gameEvent = this.getEventById(eventID);
        if (false === gameEvent) {
            gameEvent = {
                category: "",
                action: "",
                label: "",
                value: 0
            };
            // check for any overrides
            if (eventParams) {
                if (eventParams.hasOwnProperty('category')) { gameEvent['category'] = eventParams['category']; }
                if (eventParams.hasOwnProperty('action')) { gameEvent['action'] = eventParams['action']; }
                if (eventParams.hasOwnProperty('label')) { gameEvent['label'] = eventParams['label']; }
                if (eventParams.hasOwnProperty('value')) { gameEvent['value'] = (isNaN(parseFloat(eventParams['value'])) || 0); }
            }
        }
        this.trackEvent(gameEvent.category, gameEvent.action, gameEvent.label, gameEvent.value);
    },

    trackGameCustomEvent: function (eventParams) {
        var gameEvent = {
            category: "",
            action: "",
            label: "",
            value: 0
        };
        if (eventParams) {
            if (eventParams.hasOwnProperty('category')) { gameEvent['category'] = eventParams['category']; }
            if (eventParams.hasOwnProperty('action')) { gameEvent['action'] = eventParams['action']; }
            if (eventParams.hasOwnProperty('label')) { gameEvent['label'] = eventParams['label']; }
            if (eventParams.hasOwnProperty('value')) { gameEvent['value'] = (isNaN(parseFloat(eventParams['value'])) || 0); }
        }
        this.trackEvent(gameEvent.category, gameEvent.action, gameEvent.label, gameEvent.value);
    }
};