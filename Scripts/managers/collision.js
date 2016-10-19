var managers;
(function (managers) {
    var Collision = (function () {
        function Collision() {
            this.start();
        }
        Collision.prototype.start = function () {
        };
        Collision.prototype.update = function () {
        };
        Collision.prototype.boxCheck = function (coll, objColliding) {
            // Check distance between LASER and enemy
            if (coll.tr_corner.x > objColliding.tl_corner.x &&
                coll.tl_corner.x < objColliding.tr_corner.x &&
                coll.tr_corner.y < objColliding.bl_corner.y &&
                coll.br_corner.y > objColliding.tl_corner.y) {
                return true; //this.destroy(objColliding);
            }
            /*
            let tempDist = objects.Vector2.distance(obj1.position, obj2.position);

            if(tempDist < (obj1.width * 0.5 + obj2.width)) {
                if(obj1.name == "enemy") {
                    this.destroy(obj1)
                }
                if(obj2.name == "enemy") {
                    this.destroy(obj2);
                }
            }
            */
        };
        Collision.prototype.circleCheck = function (obj1, obj2) {
            var x1 = obj1.position.x;
            var y1 = obj1.position.y;
            var x2 = obj2.position.x;
            var y2 = obj2.position.y;
            var radius1 = obj1.width * 0.5;
            var radius2 = obj2.width * 0.5;
            ;
            var tempDist = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            if (tempDist < (radius1 + radius2))
                return true;
            //console.log(tempDist);
            //if(tempDist < (100)) {
            //   return true;
            //}
        };
        Collision.prototype.destroy = function (objToDestroy) {
            objToDestroy.destroy();
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map