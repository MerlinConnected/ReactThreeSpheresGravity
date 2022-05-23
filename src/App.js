import * as THREE from "three"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { Physics, useSphere } from "@react-three/cannon"
import { Effects as EffectComposer, Environment, Lightformer } from "@react-three/drei"
import { SSAOPass } from "three-stdlib"
import { useControls } from "leva"

extend({ SSAOPass })

function Spheres({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
  const { sphereRoughness, color, sphereMetalness, envMapIntensity } = useControls({
    sphereRoughness: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.1,
    },
    sphereMetalness: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.1,
    },
    envMapIntensity: {
      value: 0,
      min: 0,
      max: 10,
      step: 0.1,
    },
    color: "#0033ce",
  })
  const baubleMaterial = new THREE.MeshPhysicalMaterial({
    color: color,
    roughness: sphereRoughness,
    metalness: sphereMetalness,
    side: THREE.DoubleSide,
    envMapIntensity: envMapIntensity,
  })
  const [ref, api] = useSphere(() => ({
    type: "Dynamic",
    args: [1],
    mass: 1,
    angularDamping: 0.01,
    linearDamping: 0.95,
    position: [THREE.MathUtils.randFloatSpread(20), THREE.MathUtils.randFloatSpread(20), THREE.MathUtils.randFloatSpread(20)],
    rotation: [THREE.MathUtils.randFloatSpread(Math.PI), THREE.MathUtils.randFloatSpread(Math.PI), THREE.MathUtils.randFloatSpread(Math.PI)],
  }))

  useFrame((state) => {
    for (let i = 0; i < 20; i++) {
      ref.current.getMatrixAt(i, mat)
      api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-50).toArray(), [0, 0, 0])
    }
  })

  return <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, 20]} geometry={sphereGeometry} material={baubleMaterial} />
}

function GlassSpheres({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
  const glassSphereGeometry = new THREE.SphereGeometry(1.25, 32, 32)
  const { transmission, roughness, thickness, ior } = useControls({
    transmission: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.1,
    },
    roughness: {
      value: 4,
      min: 0,
      max: 5,
      step: 0.1,
    },
    thickness: {
      value: 10,
      min: 0,
      max: 10,
      step: 0.1,
    },
    ior: {
      value: 1.1,
      min: 1,
      max: 10,
      step: 0.1,
    },
  })
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    roughness: roughness,
    transmission: transmission,
    thickness: thickness,
    ior: ior,
  })

  const [ref, api] = useSphere(() => ({
    type: "Dynamic",
    args: [1.25],
    mass: 1,
    angularDamping: 0.01,
    linearDamping: 0.95,
    position: [THREE.MathUtils.randFloatSpread(20), THREE.MathUtils.randFloatSpread(20), THREE.MathUtils.randFloatSpread(20)],
    rotation: [THREE.MathUtils.randFloatSpread(Math.PI), THREE.MathUtils.randFloatSpread(Math.PI), THREE.MathUtils.randFloatSpread(Math.PI)],
  }))

  useFrame((state) => {
    for (let i = 0; i < 5; i++) {
      ref.current.getMatrixAt(i, mat)
      api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-50).toArray(), [0, 0, 0])
    }
  })

  return <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, 5]} geometry={glassSphereGeometry} material={glassMaterial} />
}

export const App = () => (
  <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 25], fov: 35, near: 1, far: 40 }} linear={false}>
    <Environment>
      {/* Ceiling */}
      <Lightformer intensity={7} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      {/* Sides */}
      <Lightformer intensity={30} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
      <Lightformer intensity={10} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
      <Lightformer intensity={10} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
    </Environment>
    <ambientLight intensity={0.5} />
    <Physics gravity={[0, 3, 0]} iterations={10}>
      <Collisions />
      <Spheres />
      {/* <GlassSpheres /> */}
    </Physics>
    <Effects />
  </Canvas>
)

function Collisions() {
  const viewport = useThree((state) => state.viewport)
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [3], position: [0, 0, 0] }))
  useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0))
  return null
}

function Effects(props) {
  const { scene, camera } = useThree()
  return (
    <EffectComposer {...props}>
      <sSAOPass attachArray="passes" args={[scene, camera, 32, 32]} kernelRadius={1.2} kernelSize={5} />
    </EffectComposer>
  )
}
