# Google Analytics Events Wrapper

**Library Usage**

```
GoogleAnalyticsEvents.trackGameEvent( 'PREDEFINED_EVENT_ID', { 
    action: 'PREDEFINED_ACTION_OVERRIDE' } );
    
GoogleAnalyticsEvents.trackGameCustomEvent({
    category: 'CUSTOM_APPLICATION_NAME', 
    action: 'CUSTOM_ACTION', 
    label: 'CUSTOM_LABEL' });
```