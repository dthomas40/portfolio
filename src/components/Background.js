import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Background extends Component {
  componentDidMount() {
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.y = 10;
    camera.position.z = 20;

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
    geometry.scale(0.2, 0.2, 0.2);
    var material = new THREE.MeshStandardMaterial({
      color: 0xff00ff,
      wireframe: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.translateY(5);
    scene.add(mesh);

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff);

    scene.add(pointLight, ambientLight);

    const gridHelper = new THREE.GridHelper(10);
    scene.add(gridHelper);

    const controls = new OrbitControls(camera, renderer.domElement);

    var animate = function () {
      requestAnimationFrame(animate);

      mesh.rotation.z += 0.003;
      mesh.rotation.y += 0.1;
      mesh.rotation.z += 0.01;

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
