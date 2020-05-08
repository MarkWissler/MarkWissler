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
            console.log("lol");
            renderer.render( scene, camera );
        }
        const aspect = window.innerWidth / window.innerHeight;
        const d = 20;
        const camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
        camera.position.set( 20, 20, 20 );
		camera.rotation.order = 'YXZ';
		camera.rotation.y = - Math.PI / 4;
        camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) );
        
        const controls = new OrbitControls( camera, renderer.domElement );
        controls.addEventListener( 'change', render );
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.maxPolarAngle = Math.PI / 2;

        scene.add( new THREE.AmbientLight( 0x444444 ) );
        
        const light = new THREE.PointLight( 0xffffff, 0.8 );
        light.position.set( 0, 50, 50 );
        scene.add( light );

        // axes
        scene.add( new THREE.AxisHelper( 40 ) );

        // grid
        const planeGeometry = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 );
        const planeMaterial = new THREE.MeshBasicMaterial( { wireframe: true, opacity: 0.5, transparent: true } );
        const grid = new THREE.Mesh( planeGeometry, planeMaterial );
        grid.rotation.order = 'YXZ';
        grid.rotation.y = - Math.PI / 2;
        grid.rotation.x = - Math.PI / 2;
        scene.add( grid );

        // geometry
        const geometry = new THREE.BoxGeometry( 10, 10, 10 );

        // material
        const material = new THREE.MeshNormalMaterial();

        // mesh
        const mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        render();
    });
    return (
        <canvas id="terrainCanvas" />
    ); 
};

export default Terrain;