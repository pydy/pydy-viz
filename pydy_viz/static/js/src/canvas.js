
Canvas = function(JSONObj){
    this.axes = new THREE.Object3D();
    this.cameras = new THREE.Object3D();
    this.lights = new THREE.Object3D();
    this.frames = new THREE.Object3D();
    this.currentCamera = [];
    // These are defined so that buttons defined 
    // in initialize do not run into errors.
    this.resetCamera = [];
    this.startAnimation = [];
    this.pauseAnimation = [];
    
};
    
Canvas.prototype.initialize = function(){
    // Initializes a basic canvas with a renderer and a camera.
    
    // Create a canvas div ...
    this.canvas = $("#canvas");
    this.canvas.attr("style","background-color:rgb(104,104,104); \
                           height:"+this.height + ";width:"+this.width);
                               
    // Add buttons to the div ...
    this.resetButton = $('<button/>').attr('style','margin-left:40px; \
                                            ').click(this.resetCamera);
    this.resetButton.append("Reset Camera");
    
    this.playButton = $('<button/>').attr('style', \
                                                  'margin-right:60px; \
                                        ').click(this.startAnimation);
    this.playButton.append("Play");
    
    this.pauseButton = $('<button/>').attr('style', \
                                                  'margin-right:40px; \
                                         ').click(this.pauseAnimation);
    this.pauseButton.append("Pause");                                               
    
    this.loopCheckBox = $('<input/>').attr('type', \
                                'checkbox')
                                
    this.canvas.append(resetButton);
    this.canvas.append(playButton);
    this.canvas.append(pauseButton);
    this.canvas.append(loopCheckBox);
    
    // Initialize a WebGL Renderer ...
    this.renderer = new THREE.WebGLRenderer();
    parent.renderer.setSize(this.width, this.height);
    this.canvas.append(this.renderer.domElement);
    
    // Add canvas div to other div ...
    $('#visualization').append(parent.canvas);
    
    //Initialize a Scene ...
    this.scene = new THREE.Scene();
    
    
    // Add Axes ...
    
    this.xAxis = new THREE.Mesh(
	                  new THREE.CubeGeometry(this.width, 0.1, 0.1),
                      new THREE.MeshLambertMaterial({color: 0xFFFFFF})
                                );
	this.yAxis = new THREE.Mesh(
	                  new THREE.CubeGeometry(0.1, this.height, 0.1),
                      new THREE.MeshLambertMaterial({color: 0xFFFFFF})
                                );   
    this.zAxis = new THREE.Mesh(
                      new THREE.CubeGeometry(0.1, 0.1, 10),
                      new THREE.MeshLambertMaterial({color: 0xFFFFFF})
                                );                                   
	
    this.axes.add(xAxis);
	this.axes.add(yAxis);
	this.axes.add(zAxis);
    this.scene.add(this.axes);    
        
};

Canvas.prototype.addCameras = function(){
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
        this.currentCamera = this.cameras.children[0];
        
    }

    
};

Canvas.prototype.addLights = function(){

    for(var light in JSONObj.lights){
        switch(light.type)
        {
            case "PointLight":
                var _light = new THREE.PointLight( new THREE.color(light.color) );
                _light.matrix.elements = light.simulation_matrix[0];
                break;
        }
        this.lights.add(_light);
        
    }

    
};

Canvas.prototype.addFrames = function(){
    
    var material = new THREE.MeshLambertMaterial({
            wireframe:true,
            wireframeLinewidth: 0.1,
            opacity: 0.5
           })

    for(var frame in JSONObj.frames){
        var shape = frame.shape;
        switch(shape.type)
        {
            case "Cylinder":
                var _geometry = new THREE.CylinderGeometry( \
                                              shape.radius, \
                                              shape.radius, \
                                              shape.height, 50, 50);
                
                material.color = new THREE.color(shape.color);
                var _mesh = new THREE.Mesh(_geometry, material);
                _mesh.matrix.elements = frame.simulation_matrix[0];
                break;
            // TODO all shapes ...    
                
                
        }
                
                
        
        this.frames.add(_frame);
        
    }

    
};

Canvas.prototype.addTrackballControls = function(){

    this.cameraControls = new THREE.TrackballControls(this.currentCamera, \
                                              this.renderer.domElement);
                                              
    this.resetCamera = function(){ this.controls.reset(); }

};

Canvas.prototype.createScene = function(){
    this.addCameras();
    this.addLights();
    this.addFrames();
    this.scene.add(this.cameras);
    this.scene.add(this.lights);
    this.scene.add(this.frames);
};

Canvas.prototype.renderScene = function(){
    this.cameraControls.update();
    this.renderer.render(this.scene, this.currentCamera);
    requestAnimationFrame(this.renderScene);
};


