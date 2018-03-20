/*
    klasa Game
*/

class Game {

    constructor(props) {
        this.root = $("#root")
        this.pos = props.pos;
        this.width = props.width;
        this.height = props.height;
        this.plan = [];
        this.last = [];
        for (let i = 0; i < 8; i++) {
            this.plan.push([]);
            for (let a = 0; a < 8; a++) {
                this.plan[i].push({type: a % 2});
            }
            if (i % 2 == 0) {
                this.plan[i].push(this.plan[i].shift());
            }
        }
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.pions = [
            [{type: 0}, {type: 1}, {type: 0}, {type: 1}, {type: 0}, {type: 1}, {type: 0}, {type: 1}],
            [{type: 1}, {type: 0}, {type: 1}, {type: 0}, {type: 1}, {type: 0}, {type: 1}, {type: 0}],
            [{type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}],
            [{type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}],
            [{type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}],
            [{type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}, {type: 0}],
            [{type: 0}, {type: 2}, {type: 0}, {type: 2}, {type: 0}, {type: 2}, {type: 0}, {type: 2}],
            [{type: 2}, {type: 0}, {type: 2}, {type: 0}, {type: 2}, {type: 0}, {type: 2}, {type: 0}],
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
                this.type = 1;
                break;
            case "black":
                this.type = 2;
                this.postition = {x: 0, y: 300, z: -1000};
                break;
        }
    }

    handleUpdatePlan() {
        this.plan.forEach((value) => {
            console.log(value);
            value.forEach((value2) => {
                switch (value2.type) {
                    case 0:
                        value2.obj.material.color.set(0xffffff);
                        break;
                    case 1:
                        value2.obj.material.color.set(0x000000);
                        break;
                    case 3:
                        value2.obj.material.color.set(0x9999ff);
                        break;
                    // default:
                    //     tmpCube = new THREE.Mesh(geometry, material);
                }
            })

        });
    }

    threeInit() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            45, // kąt patrzenia kamery (FOV - field of view)
            4 / 3, // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
            0.1, // minimalna renderowana odległość
            10000 // maxymalna renderowana odległość
        );
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(this.width, this.height);
        this.root.append(renderer.domElement);
        renderer.setClearColor(0xababab);
        this.camera.position.set(this.pos.x, this.pos.y, this.pos.z);
        var geometry = new THREE.BoxGeometry(100, 10, 100);
        var cylinderGeometry = new THREE.CylinderGeometry(45, 45, 20, 90);
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


        this.plan.forEach((value, index) => {
            let tmpHeight;
            if (index < 4) {
                tmpHeight = (3 - index) * 100 + 50
            } else {
                tmpHeight = -((-4 + index) * 100 + 50)
            }
            console.log(value)
            value.forEach((value2, index) => {
                let tmpCube, tmpWidth;
                if (index < 4) {
                    tmpWidth = (3 - index) * 100 + 50
                } else {
                    tmpWidth = -((-4 + index) * 100 + 50)
                }
                switch (value2.type) {
                    case 0:
                        var materialWhite = new THREE.MeshBasicMaterial({color: 0xffffff,});
                        tmpCube = new THREE.Mesh(geometry, materialWhite);
                        value2.obj = tmpCube;
                        break;
                    case 1:
                        var materialBlack = new THREE.MeshBasicMaterial({color: 0x000000,});
                        tmpCube = new THREE.Mesh(geometry, materialBlack);
                        value2.obj = tmpCube;
                        break;
                    case 3:
                        var materialSpecial = new THREE.MeshBasicMaterial({color: 0x9999ff});
                        tmpCube = new THREE.Mesh(geometry, materialSpecial);
                        value2.obj = tmpCube;
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
            if (index < 4) {
                tmpHeight = (3 - index) * 100 + 50
            } else {
                tmpHeight = -((-4 + index) * 100 + 50)
            }
            console.log(value)
            value.forEach((value2, index) => {
                let tmpCube, tmpWidth;
                if (index < 4) {
                    tmpWidth = (3 - index) * 100 + 50
                } else {
                    tmpWidth = -((-4 + index) * 100 + 50)
                }
                switch (value2.type) {
                    case 1:
                        var materialWhite = new THREE.MeshBasicMaterial({color: 0xffffff,});
                        tmpCube = new THREE.Mesh(cylinderGeometry, materialWhite);
                        tmpCube.position.set(tmpWidth, 20, tmpHeight);
                        this.scene.add(tmpCube);
                        value2.obj = tmpCube;
                        console.log(value2);
                        break;
                    case 2:
                        var materialBlack = new THREE.MeshBasicMaterial({color: 0x000000,});
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

    isNotExistType3() {
        this.plan.forEach(value => value.forEach(val => {if(val.type == 3) return false}));
        return true;
    }

    handleMouseDown(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        console.log(this.mouse, this.scene.children);
        this.raycaster.setFromCamera(this.mouse, this.camera);
        var intersects = this.raycaster.intersectObjects(this.scene.children);
        let elem, coords = null;
        this.pions.forEach((value, index) => value.forEach((val, ind) => {
            console.log(val);
            if (val.obj == intersects[0].object) {
                elem = val;
                coords = {x: ind, y: index};
            }
        }));
        console.log(elem, intersects[0]);
        if (elem.type == this.type) {
            this.last = [];
            console.log(coords);
            try {
                if (this.type == 1) {
                    if (this.pions[coords.y + 1][coords.x + 1].type == 0) {
                        this.plan[coords.y + 1][coords.x + 1].type = 3;
                        this.last.push({x: coords.x + 1, y: coords.y + 1})
                    }
                } else {
                    if (this.pions[coords.y - 1][coords.x + 1].type == 0) {
                        this.plan[coords.y - 1][coords.x + 1].type = 3;
                        this.last.push({x: coords.x + 1, y: coords.y - 1})
                    }
                }
            } catch (e) {
                console.log("nie da się przesunąć" + e)
            }
            try {
                if (this.type == 1) {
                    if (this.pions[coords.y + 1][coords.x - 1].type == 0) {
                        this.plan[coords.y + 1][coords.x - 1].type = 3;
                        this.last.push({x: coords.x - 1, y: coords.y + 1})
                    }
                } else {
                    if (this.pions[coords.y - 1][coords.x - 1].type == 0) {
                        this.plan[coords.y - 1][coords.x - 1].type = 3;
                        this.last.push({x: coords.x - 1, y: coords.y - 1})
                    }
                }
            } catch (e) {
                console.log("nie da się przesunąć")
            }
            // if(this.isNotExistType3() == false) {
            //     return;
            // }
            this.handleUpdatePlan();
            window.onmousedown = (event) => {
                this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                console.log(this.mouse, this.scene.children);
                this.raycaster.setFromCamera(this.mouse, this.camera);
                var intersects = this.raycaster.intersectObjects(this.scene.children);
                if (elem.obj == intersects[0].object){
                    window.onmousedown = (e) => {
                        this.handleMouseDown(e)
                    };
                    this.last.forEach(value => {
                        this.plan[value.y][value.x].type = 0
                    });
                    this.last = [];
                    this.handleUpdatePlan();
                    return;
                }
                let elem_2, coords_2 = null;
                this.plan.forEach((value, index) => value.forEach((val, ind) => {
                    console.log(val);
                    if (val.obj == intersects[0].object) {
                        elem_2 = val;
                        coords_2 = {x: ind, y: index};
                    }
                }));
                if (elem_2.type == 3) {
                    this.pions[coords_2.y][coords_2.x] = elem;
                    elem.obj.position.x = elem_2.obj.position.x;
                    elem.obj.position.z = elem_2.obj.position.z;
                    this.pions[coords.y][coords.x] = { type: 0 };
                    this.last.forEach(value => {
                        this.plan[value.y][value.x].type = 0

                    });
                    this.last = [];
                    this.handleUpdatePlan();
                    window.onmousedown = (e) => {
                        this.handleMouseDown(e)
                    };
                }
            };
        }

    }

    initRaycaster() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        window.onmousedown = (e) => {
            this.handleMouseDown(e)
        };
    }

}