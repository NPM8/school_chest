/*
    klasa Game
*/

class Game {

    constructor (props) {
        this.root = $("#root")
        this.pos = props.pos;
        this.width = props.width;
        this.height = props.height;
        this.plan = []
        for (let i = 0; i < 8; i++ ){
            this.plan.push([]);
            for ( let a = 0; a <8; a++){
                this.plan[i].push(a%2);
            }
            if(i%2 == 0) {
                this.plan[i].push(this.plan[i].shift());
            }
        }
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.pions = [
            [{ type: 0 },{type: 1 },{ type: 0 },{type: 1 },{ type: 0 },{type: 1 },{ type: 0 },{type: 1 }],
            [{type: 1 },{ type: 0 },{type: 1 },{ type: 0 },{type: 1 },{ type: 0 },{type: 1 },{ type: 0 }],
            [{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 }],
            [{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 }],
            [{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 }],
            [{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 },{ type: 0 }],
            [{ type: 0 },{ type: 2 },{ type: 0 },{ type: 2 },{ type: 0 },{ type: 2 },{ type: 0 },{ type: 2 }],
            [{ type: 2 },{ type: 0 },{ type: 2 },{ type: 0 },{ type: 2 },{ type: 0 },{ type: 2 },{ type: 0 }],
        ];
        console.log(this.plan);
        this.threeInit();
    }

    set postition(value) {
        console.log(value)
        this.pos = value
    }

    handlePlayerColor(tmpType) {
        switch (tmpType) {
            case "white":
                break;
            case "black":
                this.postition = {x: 0, y: 300, z: -1000};
                break;
        }
    }

    threeInit() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            45, // kąt patrzenia kamery (FOV - field of view)
            4/3, // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
            0.1, // minimalna renderowana odległość
            10000 // maxymalna renderowana odległość
            );
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(this.width, this.height);
        this.root.append( renderer.domElement );
        renderer.setClearColor(0xababab);
        this.camera.position.set(this.pos.x, this.pos.y, this.pos.z);
        var geometry = new THREE.BoxGeometry(100, 10, 100);
        var cylinderGeometry = new THREE.CylinderGeometry(45,45,20,90);
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
        var materialWhite = new THREE.MeshBasicMaterial({ color: 0xffffff, });
        var materialBlack = new THREE.MeshBasicMaterial({ color: 0x000000, });

        this.plan.forEach((value, index) => {
            let tmpHeight;
            if(index < 4) {
                tmpHeight = (3-index)*100+50
            } else {
                tmpHeight = -((-4+index)*100+50)
            }
            console.log(value)
            value.forEach((value2, index) => {
                let tmpCube, tmpWidth;
                if(index < 4) {
                    tmpWidth = (3-index)*100+50
                } else {
                    tmpWidth = -((-4+index)*100+50)
                }
                switch (value2) {
                    case 0:
                        tmpCube = new THREE.Mesh(geometry, material2);
                        break;
                    case 1:
                        tmpCube = new THREE.Mesh(geometry, material);
                        break;
                    // default:
                    //     tmpCube = new THREE.Mesh(geometry, material);
                }
                console.log(tmpCube, value2);
                tmpCube.position.set(tmpWidth, 10, tmpHeight);
                this.scene.add(tmpCube);
            })

        });
        this.pions.forEach((value, index) => {
            let tmpHeight;
            if(index < 4) {
                tmpHeight = (3-index)*100+50
            } else {
                tmpHeight = -((-4+index)*100+50)
            }
            console.log(value)
            value.forEach((value2, index) => {
                let tmpCube, tmpWidth;
                if(index < 4) {
                    tmpWidth = (3-index)*100+50
                } else {
                    tmpWidth = -((-4+index)*100+50)
                }
                switch (value2.type) {
                    case 1:
                        tmpCube = new THREE.Mesh(cylinderGeometry, materialWhite);
                        tmpCube.position.set(tmpWidth, 20, tmpHeight);
                        this.scene.add(tmpCube);
                        value2.obj = tmpCube;
                        console.log(value2);
                        break;
                    case 2:
                        tmpCube = new THREE.Mesh(cylinderGeometry, materialBlack);
                        tmpCube.position.set(tmpWidth, 20, tmpHeight);
                        this.scene.add(tmpCube);
                        value2.obj = tmpCube;
                        console.log(value2);
                        break;
                    case 0:
                        break;
                    // default:
                    //     tmpCube = new THREE.Mesh(geometry, material);
                }
            })

        });

        console.log(this.pions);
        // var axes = new THREE.AxesHelper(1000)
        // scene.add(axes)
        var that = this;
        function render() {

            that.camera.position.set(that.pos.x, that.pos.y, that.pos.z);
            that.camera.lookAt(that.scene.position);
            //w tym miejscu ustalamy wszelkie zmiany w projekcie (obrót, skalę, położenie obiektów)
            //np zmieniająca się wartość rotacji obiektu

            //mesh.rotation.y += 0.01;

            //wykonywanie funkcji bez końca ok 60 fps jeśli pozwala na to wydajność maszyny

            requestAnimationFrame(render);

            //ciągłe renderowanie / wyświetlanie widoku sceny nasza kamerą

            renderer.render(that.scene, that.camera);
        }
        render();
    }

    handleMouseDown(event) {
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
        console.log(this.mouse, this.scene.children);
        this.raycaster.setFromCamera( this.mouse, this.camera );

        // calculate objects intersecting the picking ray
        function search(elem) {
            if(elem.obj != null)
                if(elem.obj == intersects[0]) return elem;
        }
        var intersects = this.raycaster.intersectObjects( this.scene.children );
        let elem = null;
        this.pions.forEach(value => value.forEach(val => {
            console.log(val);
            if (val.obj == intersects[0].object){
                elem = val;
            }
        }));
        console.log(elem, intersects[0]);
    }

    initRaycaster() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        window.onmousedown = (e) => { this.handleMouseDown(e) };
    }

}