/**
 * maptalks layers
 * 黑音
 * 2020年4月30日10:00:45
 */

export const mapTool = new maptalks.VectorLayer('vector')

export const distanceTool = new maptalks.DistanceTool({
    'once': true,
    'symbol': {
        'lineColor': '#ff0',
        'lineWidth': 3
    },
    'vertexSymbol': {
        'markerType': 'ellipse',
        'markerFill': '#fff',
        'markerLineColor': '#f00',
        'markerLineWidth': 2,
        'markerWidth': 6,
        'markerHeight': 6
    },
    'labelOptions': {
        'textSymbol': {
            'textFaceName': 'monospace',
            'textFill': '#000',
            'textLineSpacing': 1,
            'textHorizontalAlignment': 'right',
            'textDx': 15,
            'markerLineColor': '#DDDD22',
            'markerFill': '#DDDD22'
        },
        'boxStyle': {
            'padding': [6, 2],
            'symbol': {
                'markerType': 'square',
                'markerFill': '#fff',
                'markerFillOpacity': 0.9,
                'markerLineColor': '#b4b3b3'
            }
        }
    },
    'clearButtonSymbol': [{
        'markerType': 'square',
        'markerFill': '#fff',
        'markerLineColor': '#b4b3b3',
        'markerLineWidth': 2,
        'markerWidth': 15,
        'markerHeight': 15,
        'markerDx': 22
    }, {
        'markerType': 'x',
        'markerWidth': 10,
        'markerHeight': 10,
        'markerLineColor': '#000',
        'markerDx': 22
    }],
    'language': 'zh-CN'
});

export const areaTool = new maptalks.AreaTool({
    'imperial': false,
    'metric': true,
    'once': true,
    'symbol': {
        'lineColor': '#f00',
        'lineWidth': 2,
        'polygonFill': '#fff',
        'polygonOpacity': 0.4
    },
    'vertexSymbol': {
        'markerType': 'ellipse',
        'markerFill': '#fff',
        'markerLineColor': '#666',
        'markerLineWidth': 2,
        'markerWidth': 6,
        'markerHeight': 6
    },
    'labelOptions': {
        'textSymbol': {
            'textFaceName': 'monospace',
            'textFill': '#000',
            'textLineSpacing': 1,
            'textHorizontalAlignment': 'right',
            'textDx': 15
        },
        'boxStyle': {
            'padding': [6, 2],
            'symbol': {
                'markerType': 'square',
                'markerFill': '#fff',
                'markerFillOpacity': 0.9,
                'markerLineColor': '#b4b3b3'
            }
        }
    },
    'clearButtonSymbol': [{
        'markerType': 'square',
        'markerFill': '#fff',
        'markerLineColor': '#b4b3b3',
        'markerLineWidth': 2,
        'markerWidth': 15,
        'markerHeight': 15,
        'markerDx': 22
    }, {
        'markerType': 'x',
        'markerWidth': 10,
        'markerHeight': 10,
        'markerLineColor': '#000',
        'markerDx': 22
    }],
    language: 'zh-CN'
});

export const pointTool = new maptalks.DrawTool({
    mode: 'Point',
})

export const posLayer = new maptalks.VectorLayer('方位图')

export const posMarker = (center) =>{
    return new maptalks.Marker(center, {
        'symbol': {
            'markerFile': 'http://xinzhi.space/static/direction.png',
            'markerWidth': 300,
            'markerHeight': 300,
            'markerDx': 0,
            'markerDy': 150,
            'markerOpacity': 1
        }
    });
}

export const posMarkerWebApp = (center) =>{
    return new maptalks.Marker(center, {
        'symbol': {
            'markerFile': 'http://xinzhi.space/static/direction.png',
            // 'markerFile': require('@/assets/img/direction-test2.png'),
            'markerWidth': 200,
            'markerHeight': 200,
            'markerDx': 0,
            'markerDy': 100,
            'markerOpacity': 1
        }
    });
}

export const luopanLayer = new maptalks.VectorLayer('罗盘')

export const luopanMarker = (center) =>{
    return new maptalks.Marker(center, {
        'symbol': {
            'markerFile': 'http://xinzhi.space/static/compass.png',
            'markerWidth': 600,
            'markerHeight': 600,
            'markerDx': 0,
            'markerDy': 300,
            'markerOpacity': 1,
            'markerRotation': 0
        }
    });
}

export const luopanMarkerWebApp = (center) =>{
    return new maptalks.Marker(center, {
        'symbol': {
            'markerFile': 'http://xinzhi.space/static/compass.png',
            'markerWidth': 300,
            'markerHeight': 300,
            'markerDx': 0,
            'markerDy': 150,
            'markerOpacity': 1,
            'markerRotation': 0
        }
    });
}

export const luopanCrossMarker = (center) =>{
    return new maptalks.Marker(center, {
        'symbol': {
            'markerFile': 'http://xinzhi.space/static/crossline.png',
            'markerWidth': 600,
            'markerHeight': 600,
            'markerDx': 0,
            'markerDy': 300,
            'markerOpacity': 1,
            'markerRotation': 0
        }
    });
}

export const luopanCrossMarkerWebApp = (center) =>{
    return new maptalks.Marker(center, {
        'symbol': {
            'markerFile': 'http://xinzhi.space/static/crossline.png',
            'markerWidth': 300,
            'markerHeight': 300,
            'markerDx': 0,
            'markerDy': 150,
            'markerOpacity': 1,
            'markerRotation': 0
        }
    });
}

// 路线规划
export const lineLayer = new maptalks.VectorLayer('lines')
export const multiLineString = (lines) =>{ 
    return new maptalks.MultiLineString(lines, {
        arrowStyle : null, // arrow-style : now we only have classic
        arrowPlacement : 'vertex-last', // arrow's placement: vertex-first, vertex-last, vertex-firstlast, point
        visible : true, 
        editable : true,
        cursor : null,
        shadowBlur : 0,
        shadowColor : 'black',
        draggable : false,
        dragShadow : false, // display a shadow during dragging
        drawOnAxis : null,  // force dragging stick on a axis, can be: x, y
        symbol: {
            'lineColor' : '#1bbc9b',
            'lineWidth' : 4,
            'lineJoin'  : 'round', //miter, round, bevel
            'lineCap'   : 'round', //butt, round, square
            'lineDasharray' : null,//dasharray, e.g. [10, 5, 5]
            'lineOpacity ' : 1
        }
      })
}
// 路线规划开始
export const splanStart = (center) =>{
    return new maptalks.Marker(center, {
        'symbol' : {
            'markerFile'   : 'http://xinzhi.space/static/start.png',
            'markerWidth'  : 28,
            'markerHeight' : 40,
            'markerDx'     : 0,
            'markerDy'     : 0,
            'markerOpacity': 1,
            'markerRotation': 0
        }
    });
}
// 路线规划终点
export const splanEnd = (center) =>{
    return new maptalks.Marker(center, {
        'symbol': {
            'markerFile': 'http://xinzhi.space/static/end.png',
            'markerWidth'  : 28,
            'markerHeight' : 40,
            'markerDx'     : 0,
            'markerDy'     : 0,
            'markerOpacity': 1,
            'markerRotation': 0
        }
    });
}

