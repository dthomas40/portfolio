import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scene: null,
    };
  }
  componentDidMount() {
    var scene = this.scene;
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffaaff);
    scene.fog = new THREE.Fog(0xaaffff, 30, 100);

    const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemiLight);

    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.y = 10;
    camera.position.z = 40;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    this.mount.appendChild(renderer.domElement);

    const x = 0;
    const y = 0;

    const shape = new THREE.Shape();

    shape.moveTo(x + 5, y + 5);
    shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    const geometry = new THREE.ShapeGeometry(shape);
    geometry.scale(0.1, 0.1, 0.1);
    var material = new THREE.MeshStandardMaterial({
      color: 0xaaffff,
      wireframe: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.translateY(10);
    mesh.translateX(10);
    mesh.rotateX(Math.PI);
    scene.add(mesh);

    const loader = new GLTFLoader();

    loader.load(
      "../../tree.glb",
      function (gltf) {
        const root = gltf.scene;
        root.translateY(-10);
        scene.add(root);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff);

    scene.add(pointLight, ambientLight);

    const gridHelper = new THREE.GridHelper(500, 30);
    gridHelper.translateY(-11);
    scene.add(gridHelper);

    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 500),
      new THREE.MeshStandardMaterial({ color: 0xaaffff })
    );

    water.rotateX(-Math.PI / 2);
    water.translateZ(-11);
    scene.add(water);

    const groundTexture = new THREE.TextureLoader().load("../../ground.png");

    const plane = new THREE.Mesh(
      new THREE.BoxGeometry(20, 20, 20),
      new THREE.MeshBasicMaterial({ map: groundTexture })
      // new THREE.MeshBasicMaterial({ color: 0x442200 })
    );
    plane.rotateX(-Math.PI / 2);
    plane.translateZ(-20);

    scene.add(plane);

    function addLight() {
      const lightGeometry = new THREE.SphereGeometry(0.25, 24, 24);
      const lightMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff });
      const light = new THREE.Mesh(lightGeometry, lightMaterial);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

      light.position.set(x, y, z);
      scene.add(light);
    }

    Array(200).fill().forEach(addLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;

    var animate = function () {
      requestAnimationFrame(animate);

      mesh.rotateY(-0.1);

      controls.update();

      renderer.render(scene, camera);
    };

    animate();
  }

  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<Background />, rootElement);
