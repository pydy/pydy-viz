
Canvas = function(JSONObj){
    this.axes = new THREE.Object3D();
    this.cameras = new THREE.Object3D();
    this.lights = new THREE.Object3D();

    // These are defined so that buttons defined
    // in initialize do not run into errors.
    this.reset_camera = [];
    this.start_animation = [];
    this.pause_animation = [];

};

Canvas.prototype.initialize = function(){
    // Initializes a basic canvas with a renderer and a camera.

    // Create a canvas div ...
    this.canvas = $("#canvas");
    this.canvas.attr("style","background-color:rgb(104,104,104); \
                           height:"+this.height + ";width:"+this.width);

    // Add buttons to the div ...
    this.reset_button = $('<button/>').attr('style','margin-left:40px; \
                                            ').click(this.reset_camera);
    this.reset_button.append("Reset Camera");

    this.play_button = $('<button/>').attr('style', \
                                                  'margin-right:60px; \
                                                   ').click(this.start_animation);
    this.play_button.append("Play");

    this.pause_button = $('<button/>').attr('style', \
                                                  'margin-right:40px; \
                                                   ').click(this.pause_animation);
    this.pause_button.append("Pause");

    this.loop_check_box = $('<input/>').attr('type', \
                                'checkbox')

    this.canvas.append(reset_button);
    this.canvas.append(play_button);
    this.canvas.append(pause_button);
    this.canvas.append(loop_check_box);


    // Initialize a WebGL Renderer ...
    this.renderer = new THREE.WebGLRenderer();
    parent.renderer.setSize(this.width, this.height);
    this.canvas.append(this.renderer.domElement);

    // Add canvas div to other div ...
    $('#visualization').append(parent.canvas);

    //Initialize a Scene ...
    this.scene = new THREE.Scene();


    // Add Axes ...

    this.x_axis = new THREE.Mesh(
	                  new THREE.CubeGeometry(this.width, 0.1, 0.1),
                      new THREE.MeshLambertMaterial({color: 0xFFFFFF})
                                );
	this.y_axis = new THREE.Mesh(
	                  new THREE.CubeGeometry(0.1, this.height, 0.1),
                      new THREE.MeshLambertMaterial({color: 0xFFFFFF})
                                );
    this.y_axis = new THREE.Mesh(
                      new THREE.CubeGeometry(0.1, 0.1, 10),
                      new THREE.MeshLambertMaterial({color: 0xFFFFFF})
                                );
	
    this.axes.add(x_axis);
	this.axes.add(y_axis);
	this.axes.add(z_axis);
    this.scene.add(this.axes);

};

Canvas.prototype.add_cameras = function(){
    var aspect_ratio = this.width/this.height;
    for(var camera in JSONObj.cameras){
        var initialOrientation = camera.simulation_matrix[0];
        switch(camera.type)
        {
            
            case "PerspectiveCamera":
                var _camera = THREE.PerspectiveCamera(camera.fov, \
                                aspect_ratio, camera.near, camera.far);
                _camera.matrix.elements = initialOrientation;
                break;
            
            case "OrthoGraphicCamera":
                var _camera = new THREE.OrthographicCamera( \
                                           JSONObj.width / - 2, \
                                           JSONObj.width / 2, \
                                           JSONObj.height / 2, \
                                           JSONObj.height / - 2, \
                                           camera.near, camera.far );
                _camera.matrix.elements = initialOrientation;                    
                break;

        }
        this.cameras.add(_camera);
        
    }
};
