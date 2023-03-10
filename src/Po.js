import { Matrix } from "pixi.js";
import * as THREE from "three";
import gsap from "gsap";

import World from "./World";
export default class Po {
  constructor() {
    const world = new World({
      showCameraPos: true,
      setCameraPos: [5, 2.6, 8.8],
      showGrid: false,
      ambientLight: false,
      orbitControl: true,
      showFloor: false,
    });

    //*spotlight  */
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 6, 0);
    spotLight.angle = 0.9; //spreading
    spotLight.penumbra = 1; //blur in my world
    spotLight.decay = 1;
    spotLight.distance = 100;
    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 2000; // default
    spotLight.shadow.mapSize.height = 2000; // default
    spotLight.shadow.camera.near = 0.5; // default
    spotLight.shadow.camera.far = 500; // default
    spotLight.shadow.focus = 1;
    world.scene.add(spotLight);

    //*END spotlight  */

    //*CubeInfo  */
    const cubeInfo = [
      {
        texture: "assets/one.png",
        position: [2, 0.5, -3],
        rotation: -2,
      },
      {
        texture: "assets/two.png",
        position: [2, 0.5, 2],
        rotation: -2,
      },
      {
        texture: "assets/three.png",
        position: [-2, 0.5, 2],
        rotation: 2,
      },
      {
        texture: "assets/four.png",
        position: [-2, 0.5, -2.5],
        rotation: 2,
      }
    ];

    cubeInfo.forEach((item, index) => {
      const texture = new THREE.TextureLoader().load(item.texture);
      const geometryCube = new THREE.BoxGeometry(1, 1, 1);
      const materialCube = new THREE.MeshPhongMaterial({ map: texture });

      this.cube = new THREE.Mesh(geometryCube, materialCube);
      this.cube.castShadow = true;
      this.cube.receiveShadow = true;
      world.scene.add(this.cube);
      this.cube.position.set(
        item.position[0],
        item.position[1],
        item.position[2]
      );
      this.cube.rotation.y = item.rotation;

      world.InteractionManager.add(this.cube);
      this.cube.addEventListener("mousedown", (event) => {
        this.moveObj(event, world);
      });
    }); //END foreach
    //*END CubeInfo  */

    //*Loader  */
    const loader = new THREE.TextureLoader();

      const materialCube = [
        new THREE.MeshPhongMaterial({map:loader.load("assets/one.png")}),//right
        new THREE.MeshPhongMaterial({map:loader.load("assets/two.png")}),//left
        new THREE.MeshPhongMaterial({map:loader.load("assets/three.png")}),//top
        new THREE.MeshPhongMaterial({map:loader.load("assets/four.png")}),//bottom
        new THREE.MeshPhongMaterial({map:loader.load("assets/five.png")}),//front
        new THREE.MeshPhongMaterial({map:loader.load("assets/six.png")}),//backside
      ]
    //*END Loader  */

    CubeInfo.forEach((item, index)=>{
      //const texture = new THREE.TextureLoader().load(item.texture);
      const geometryCube = new THREE.BoxGeometry(1,1,1);

      //const materialCube = new THREE.MeshPhongMaterial({map: texture, alphaTest: .5, side: THREE.DoubleSide})

      this.cube = new THREE.Mesh(geometryCube, materialCube);

    })//END foreach

  } //END constructor

  moveObj(event, world) {
    gsap.to(event.target.position, {
      duration: 1,
      x: 0.5,
      z: 0.5,
      repeat: 1,
      yoyo: true,
    });

    gsap.to(event.target.rotation, {
      duration: 1,
      y: 0.5,
      repeat: 1,
      yoyo: true,
    });
  }
} //END class
