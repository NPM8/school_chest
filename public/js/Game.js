/*
    klasa Game
*/

class Game {

    constructor (props) {
        this.root = $("#root")
        this.pos = {x: 0,y: 200,z: 1000};
        this.width = props.width;
        this.height = props.height;
        this.threeInit();
    }

    set postition(value) {
        console.log(value)
        this.pos = value
    }

    threeInit() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
            45, // kąt patrzenia kamery (FOV - field of view)
            4/3, // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
            0.1, // minimalna renderowana odległość
            10000 // maxymalna renderowana odległość
            );
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(this.width, this.height);
        this.root.append( renderer.domElement );
        renderer.setClearColor(0xffffff);
        camera.position.set(0, 200, 1000)
        var geometry = new THREE.BoxGeometry(250, 100, 150);
        var plane = new THREE.PlaneGeometry(1000, 1000, 10, 10);
        var material = new THREE.MeshBasicMaterial({
                        color: 0x8888ff,
                        side: THREE.DoubleSide,
                        wireframe: true,
                        transparent: true, 
                        opacity: 0.5
                    });
        var material2 = new THREE.MeshNormalMaterial({
            color: 0x8888ff,
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: true, 
            opacity: 0.5
        });
        var cube1 = new THREE.Mesh(geometry, material2);
        var cube2 = new THREE.Mesh(geometry, material2);
        cube1.position.set(0, 20, 450);
        cube2.position.set(0, 20, -450);
        var meshPlanszy = new THREE.Mesh(plane,material)
        meshPlanszy.rotateX(Math.PI / 2);
        scene.add(cube1);
        scene.add(cube2);
        scene.add(meshPlanszy)
        var axes = new THREE.AxesHelper(1000)
        scene.add(axes)
        var that = this
        function render() {

            camera.position.set(that.pos.x, that.pos.y, that.pos.z);
            camera.lookAt(scene.position);
            //w tym miejscu ustalamy wszelkie zmiany w projekcie (obrót, skalę, położenie obiektów)
            //np zmieniająca się wartość rotacji obiektu
        
            //mesh.rotation.y += 0.01;
        
            //wykonywanie funkcji bez końca ok 60 fps jeśli pozwala na to wydajność maszyny
        
            requestAnimationFrame(render);
            
            //ciągłe renderowanie / wyświetlanie widoku sceny nasza kamerą
                
            renderer.render(scene, camera);
        }
        render();
    }

}