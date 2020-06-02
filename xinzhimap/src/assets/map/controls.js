/**
 * maptalks controls
 * 黑音
 * 2020年4月30日09:55:56
 */

export const attribution = new maptalks.control.Attribution({
    content: '©Google Maps',
    position: {
        bottom: 5,
        left: 490
    }
});

export const imperial = new maptalks.control.Scale({
    'position': {
        'bottom': '5',
        'left': '390'
    },
    'containerClass': 'maptalks-my-scale',
    'maxWidth': 100,
    'metric': true,
    'imperial': false
});

export const attributionWebapp = new maptalks.control.Attribution({
    content: '©Google Maps',
    position: {
        bottom: 5,
        left: 5
    }
});

export const imperialWebapp = new maptalks.control.Scale({
    'position': {
        'bottom': '5',
        'left': '117'
    },
    'containerClass': 'maptalks-my-scale',
    'maxWidth': 100,
    'metric': true,
    'imperial': false
});
