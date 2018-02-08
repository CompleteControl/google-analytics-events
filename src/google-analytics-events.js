/**
 * ...
 * @author Nigel Britton
 * @company Complete Control
 * @version 0.2.1
 *
 * Usage: GoogleAnalyticsEvents.trackGameEvent( 'PREDEFINED_EVENT_ID', { action: 'PREDEFINED_ACTION_OVERRIDE' } );
 * Usage: GoogleAnalyticsEvents.trackGameCustomEvent( { category: 'CUSTOM_APPLICATION_NAME', action: 'CUSTOM_ACTION', label: 'CUSTOM_LABEL' } );
 */


/**
 * @namespace
 */
var GoogleAnalyticsEvents = {
    version: 'v0.2.2',
    debug: false,
    gameEvents: [{
        id: 'PREDEFINED_EVENT',
        category: 'PREDEFINED_APPLICATION_NAME',
        action: 'PREDEFINED_ACTION',
        label: 'PREDEFINED_LABEL',
        value: 0
    }],

    /**
     * Sends tracking parameters to install supplier
     * @param {string} eventCategory - Google Analytics event category field
     * @param eventAction
     * @param eventLabel
     * @param eventValue
     */
    trackEvent: function (eventCategory, eventAction, eventLabel, eventValue) {
        var handlers = {
            gaq: false,
            gtag: false,
            dataLayer: false,
            ga: false
        };

        // Quit out if Google Analytics/DataLayer is not found
        if (typeof gtag === 'function') { handlers.gtag = true; }
        if (typeof _gaq === 'undefined') { } else { handlers.gaq = true; }
        if (typeof dataLayer === 'undefined') { } else { handlers.dataLayer = true; }
        if (typeof ga === 'undefined') { } else { handlers.ga = true; }

        if ( eventCategory == '' || eventAction == '' || eventLabel == '' ) {
            if (window.console && GoogleAnalyticsEvents.debug === true) { console.log('Google Analytics/Google Tag dataLayer: No category, action or label defined!'); }
        }

        if (handlers.gaq == true) { _gaq.push(['_trackEvent', eventCategory, eventAction, eventLabel, eventValue]); }
        else if (handlers.gtag == true) { gtag('event', eventAction, { 'event_category': eventCategory, 'event_label': eventLabel, 'value': eventValue }); }
        else if (handlers.ga == true) {
            ga('send', 'event', eventCategory, eventAction, eventLabel, eventValue, { 'nonInteraction': 0 }); }
        else if (handlers.dataLayer == true) { dataLayer.push({ 'event': 'GAevent', 'eventCategory': eventCategory, 'eventAction': eventAction, 'eventLabel': eventLabel, 'eventValue': eventValue });
        }
        else { if (window.console && GoogleAnalyticsEvents.debug === true) { console.log('Google Analytics/Google Tag dataLayer: Not Found!'); } }
        GoogleAnalyticsEvents.handlers = handlers;
    },

    /**
     * Get a predefined game event
     * @param {string} eventID - A predefined event id
     * @returns {boolean|object}
     */
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

    /**
     * Track a predefined event, with override parameters
     * @param {string} eventID
     * @param {object} eventParams
     */
    trackGameEvent: function (eventID, eventParams) {
        var gameEvent = this.getEventById(eventID);
        if (false === gameEvent) {
            gameEvent = {
                category: "",
                action: "",
                label: "",
                value: 0
            };
        }
        // check for any overrides
        if (eventParams) {
            if (eventParams.hasOwnProperty('category')) { gameEvent['category'] = eventParams['category']; }
            if (eventParams.hasOwnProperty('action')) { gameEvent['action'] = eventParams['action']; }
            if (eventParams.hasOwnProperty('label')) { gameEvent['label'] = eventParams['label']; }
            if (eventParams.hasOwnProperty('value')) { gameEvent['value'] = (!isNaN(parseFloat(eventParams['value'])) ? parseFloat(eventParams['value']) : 0); }
        }
        this.trackEvent(gameEvent.category, gameEvent.action, gameEvent.label, gameEvent.value);
    },

    /**
     * Track a custom event, using custom parameters
     * @param {object} eventParams
     */
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
            if (eventParams.hasOwnProperty('value')) { gameEvent['value'] = (!isNaN(parseFloat(eventParams['value'])) ? parseFloat(eventParams['value']) : 0); }
            if (window.console && GoogleAnalyticsEvents.debug === true) { console.log(eventParams); }
        }
        this.trackEvent(gameEvent.category, gameEvent.action, gameEvent.label, gameEvent.value);
    }
};