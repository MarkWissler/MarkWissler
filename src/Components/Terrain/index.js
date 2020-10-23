import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import styles from './terrain.module.css';


function Terrain (props) {
    useEffect(() => {
        const scene = new THREE.Scene();
        // renderer
        const terrainCanvas = document.getElementById("terrainCanvas");
        const renderer = new THREE.WebGLRenderer({
            canvas: terrainCanvas,
        });
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
        
        renderer.setSize( terrainCanvas.clientWidth, terrainCanvas.clientHeight  );

        function render () {
            scene.children.forEach(function (child) {
                let t = Date.now() / 500;
                let mf = 0.1;
                let dfc = Math.sqrt(Math.pow(child.position.x,2) + Math.pow(child.position.z,2))/25;
                let dy = (dfc) * mf * Math.sin(t);
                
                child.translateY(dy);
                let t2 = Date.now() / 2100;
                let omdfc = (1-dfc)/5;
                let ry = omdfc * mf * Math.sin(t2);
                child.rotateY(ry)
                if (Math.random() > 0.9) {
                    child.rotateZ(ry);
                }
                let t3 = Date.now() / 5100;
                if (child.color) {
                    child.color.r = Math.sin(t3);
                    child.color.g = Math.cos(t3);
                    child.color.b = Math.tan(t/t3);
                }
            })
            renderer.render( scene, camera );
            scene.rotation.y = Math.sin(Date.now()*0.00001);
            requestAnimationFrame(render);
        }
        const aspect = terrainCanvas.clientWidth / terrainCanvas.clientHeight;
        const d = 50;
        const camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, -100, 1000 );
        camera.position.set( 20, 20, 20 );
		camera.rotation.order = 'YXZ';
		// camera.rotation.y = 0.78539816;
        // camera.rotation.x = -0.61547971;
        // camera.zoom = 0.5688000922764596;
        // camera.left = -46.982;

        
        const controls = new OrbitControls( camera, renderer.domElement );
        // controls.addEventListener( 'change', render );
        controls.enableZoom = true;
        controls.enablePan = false;
        controls.maxPolarAngle = Math.PI / 2;

        const alight = new THREE.PointLight( 0xffffff, 0.2);
        alight.position.set( 0, 50, 0 );
        // light.castShadow = true;
        scene.add( alight );
        
        const light = new THREE.PointLight( 0xffffff, 1.0, 100);
        light.position.set( 0, 4, 0 );
        light.castShadow = true;
        scene.add( light );

        //Set up shadow properties for the light
light.shadow.mapSize.width = 512;  // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5;       // default
light.shadow.camera.far = 500      // default

// const group = new THREE.Object3D();
for (let i = -20; i < 20; i++) {
    for (let j = -20; j < 20; j++) {
        let dfc = Math.sqrt(Math.pow(i,2) + Math.pow(j,2));
                const material = new THREE.MeshStandardMaterial();
                
                const geometry = new THREE.BoxGeometry( 1+dfc, 1+dfc, 1+dfc );
                const newMesh = new THREE.Mesh( geometry, material );
                newMesh.position.set(i*12,0, j*12);
                newMesh.castShadow = true;
                newMesh.receiveShadow = true;
                // group.add(newMesh);
                scene.add(newMesh);
            }
        }

        //Create a helper for the shadow camera (optional)
// var helper = new THREE.CameraHelper( light.shadow.camera );
// scene.add( helper );
        
        render();
    });
    return (
        <canvas className={styles.canvas} id="terrainCanvas" />
    ); 
};

export default Terrain;