(function() {
    "use strict";

    var $$profile$$ = {
        get area() {
            return $$profile$$area;
        },

        get circumference() {
            return $$profile$$circumference;
        }
    };

    function $$profile$$area(radius) {
        return Math.PI * radius * radius;
    }
    function $$profile$$circumference(radius) {
        return 2 * Math.PI * radius;
    }
    // const f = require('./profile');
    console.log('圆面积：' + $$profile$$.area(4));
    console.log('圆周长：' + $$profile$$.circumference(14));
}).call(this);

//# sourceMappingURL=main-compile.js.map