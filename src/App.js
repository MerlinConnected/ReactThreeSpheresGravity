import * as THREE from "three"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { Physics, useSphere } from "@react-three/cannon"
import { Effects as EffectComposer, Environment, Lightformer } from "@react-three/drei"
import { SSAOPass } from "three-stdlib"

extend({ SSAOPass })

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const glassSphereGeometry = new THREE.SphereGeometry(1.25, 32, 32)
const baubleMaterial = new THREE.MeshPhysicalMaterial({
  color: "#0247e8",
  roughness: 1,
  metalness: 0,
  side: THREE.DoubleSide,
})
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: "#ffffff",
  roughness: 0.65,
  metalness: 0,
  transmission: 1,
  thickness: 0.1,
  ior: 1.5,
  side: THREE.DoubleSide,
})

function Spheres({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
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
  <Canvas shadows camera={{ position: [0, 0, 25], fov: 35, near: 1, far: 40 }}>
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
      <GlassSpheres />
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
