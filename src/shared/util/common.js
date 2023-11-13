
export function getRandomInt( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

export function generateProductKey() {
    var tokens = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        chars = 4,
        segments = 3,
        keyString = "";
        
    for( var i = 0; i < segments; i++ ) {
        var segment = "";
        
        for( var j = 0; j < chars; j++ ) {
            var k = getRandomInt( 0, 35 );
            segment += tokens[ k ];
        }
        
        keyString += segment;
        
        if( i < ( segments - 1 ) ) {
            keyString += "-";
        }
    }
    
    return keyString;

}

export function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}