
    /////////////////////////////////////////////////////////////
    // Gets input transform
    //
    /////////////////////////////////////////////////////////////
    function getScale() {

      var x = 2.0000
      var y = 2.0000
      var z = 2.0000

      return new THREE.Vector3(x, y, z);
    }

    function getTranslation() {

      var x = 0.00
      var y = 0.00
      var z = 0.00

      // x = isNaN(x) ? 0.0 : x;
      // y = isNaN(y) ? 0.0 : y;
      // z = isNaN(z) ? 0.0 : z;

      return new THREE.Vector3(x, y, z);
    }

    function getRotation() {

      var x = 0.00
      var y = 0.00
      var z = 0.00

      // x = isNaN(x) ? 0.0 : x;
      // y = isNaN(y) ? 0.0 : y;
      // z = isNaN(z) ? 0.0 : z;

      var euler = new THREE.Euler(
        x * Math.PI/180,
        y * Math.PI/180,
        z * Math.PI/180,
        'XYZ');

      var q = new THREE.Quaternion();

      q.setFromEuler(euler);

      return q;
    }

    function setTranslation(pointdata) {

      var x = pointdata.point.x - 9;
      var y = pointdata.point.y - 9;
      var z = pointdata.point.z + 3.5;

      return new THREE.Vector3(x, y, z);
    }

    /////////////////////////////////////////////////////////////
    // Builds transform matrix
    //
    /////////////////////////////////////////////////////////////
    function buildTransformMatrix(points) {
      console.log('Im inside of transform', points);
      var t = setTranslation(points);
      var r = getRotation();
      var s = getScale();
      console.log('Value T', t);
      console.log('Value R', r);
      console.log('Value S', s);

      var m = new THREE.Matrix4();

      m.compose(t, r, s);
      console.log('Return M ',m);
      return m;
    }


const Transform = {
  buildTransformMatrix
};

export default Transform;