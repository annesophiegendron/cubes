import React, { useRef, useState } from 'react'

import './App.scss'

import { Canvas, useFrame } from "react-three-fiber"

import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei"

import { useSpring, a } from "react-spring/three"

softShadows()

const SpinningBox = ({ position, args, color, speed }) => {
  const mesh = useRef(null)
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  const [expand, setExpand] = useState(false)

  const props = useSpring({
    scale: expand ? [1.7, 1.7, 1.7] : [1, 1, 1]
  })

  return (
    // a.mesh to turn it as an animated component "a" from drei
    <a.mesh onClick={() => setExpand(!expand)} scale={props.scale} castShadow position={position} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial attach="material" color={color} speed={speed} factor={0.7} />
    </a.mesh> 
  )
}

function App() {
  return (
    <>
      <Canvas shadowMap colorManagement camera={{ position: [-5, 2, 10], fov: 50 }}>

        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.2} />
          </mesh>

          <SpinningBox position={[0, 1, 0]} args={[1, 2, 1]} color="#6A86D9" speed={1} />
          <SpinningBox position={[-1, 1, -6]} color="#CDA3D9" speed={7} />
          <SpinningBox position={[-3, 1, -4]} color="#62D9D9" speed={7} />
          <SpinningBox position={[8, 1, -6]} color="#272F59" speed={7} />
          <SpinningBox position={[5, 1, -4]} color="#CDA3D9" speed={7} />
        </group>

        <OrbitControls />
      </Canvas>
    </>
  )
}

export default App
