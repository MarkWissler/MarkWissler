import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function Terrain (props) {
    useEffect(() => {
        const scene = new THREE.Scene();
        // renderer
        const terrainCanvas = document.getElementById("terrainCanvas");
        const renderer = new THREE.WebGLRenderer({
            canvas: terrainCanvas,
        });
        renderer.setSize( window.innerWidth, window.innerHeight );

        function render () {
            renderer.render( scene, camera );
            scene.rotation.y = Math.sin(Date.now()*0.0001);
            requestAnimationFrame(render);
        }
        const aspect = window.innerWidth / window.innerHeight;
        const d = 20;
        const camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 0.001, 1000 );
        camera.position.set( 20, 20, 20 );
		camera.rotation.order = 'YXZ';
		camera.rotation.y = - Math.PI / 4;
        camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) );
        
        const controls = new OrbitControls( camera, renderer.domElement );
        // controls.addEventListener( 'change', render );
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.maxPolarAngle = Math.PI / 2;

        scene.add( new THREE.AmbientLight( 0x444444 ) );
        
        const light = new THREE.PointLight( 0xffffff, 0.8 );
        light.position.set( 0, 50, 50 );
        scene.add( light );

        const geometry = new THREE.BoxGeometry( 10, 10, 10 );
        const material = new THREE.MeshNormalMaterial();
        const group = new THREE.Object3D();
        for (let i = -5; i < 5; i++) {
            for (let j = -5; j < 5; j++) {
                const newMesh = new THREE.Mesh( geometry, material );
                newMesh.position.set(i*12,0, j*12);
                group.add(newMesh);
            }
        }

        scene.add(group);
        
        render();
    });
    return (
        <canvas id="terrainCanvas" />
    ); 
};

export default Terrain;