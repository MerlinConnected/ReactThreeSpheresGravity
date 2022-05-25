import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { Physics, useSphere } from "@react-three/cannon"
import { Effects as EffectComposer, Environment, Lightformer } from "@react-three/drei"
import { SSAOPass } from "three-stdlib"
import { BeigeSpheres, BlueSpheres, GlassSpheres, LightBlueSpheres } from "./spheres.js"

extend({ SSAOPass })

export const App = () => (
  <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 25], fov: 35, near: 1, far: 40 }} linear={false}>
    <Environment>
      {/* Ceiling */}
      <Lightformer intensity={7} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      {/* Sides */}
      <Lightformer intensity={30} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
      <Lightformer intensity={10} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
    </Environment>
    <ambientLight intensity={0.5} />
    <Physics gravity={[0, 3, 0]} iterations={10}>
      <Collisions />
      <BlueSpheres />
      <BeigeSpheres />
      <LightBlueSpheres />
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
      <sSAOPass attachArray="passes" args={[scene, camera, 2048, 2048]} kernelRadius={0.5} />
    </EffectComposer>
  )
}
