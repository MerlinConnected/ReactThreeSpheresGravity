import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import { useControls } from "leva"

export function BlueSpheres({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
  const { sphereRoughness, color1, sphereMetalness, envMapIntensity } = useControls({
    sphereRoughness: {
      value: 0.6,
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
      value: 1,
      min: 0,
      max: 10,
      step: 0.1,
    },
    color1: "#0033ce",
  })
  const blueMaterial = new THREE.MeshPhysicalMaterial({
    color: color1,
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
    for (let i = 0; i < 5; i++) {
      ref.current.getMatrixAt(i, mat)
      api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-50).toArray(), [0, 0, 0])
    }
  })

  return <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, 5]} geometry={sphereGeometry} material={blueMaterial} />
}

export function BeigeSpheres({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
  const { sphereRoughness, color2, sphereMetalness, envMapIntensity } = useControls({
    sphereRoughness: {
      value: 0.6,
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
      value: 1,
      min: 0,
      max: 10,
      step: 0.1,
    },
    color2: "#fcbf99",
  })
  const beigeMaterial = new THREE.MeshPhysicalMaterial({
    color: color2,
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
    for (let i = 0; i < 5; i++) {
      ref.current.getMatrixAt(i, mat)
      api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-50).toArray(), [0, 0, 0])
    }
  })

  return <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, 5]} geometry={sphereGeometry} material={beigeMaterial} />
}

export function LightBlueSpheres({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
  const { sphereRoughness, color3, sphereMetalness, envMapIntensity } = useControls({
    sphereRoughness: {
      value: 0.6,
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
      value: 1,
      min: 0,
      max: 10,
      step: 0.1,
    },
    color3: "#9ebbfe",
  })
  const beigeMaterial = new THREE.MeshPhysicalMaterial({
    color: color3,
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
    for (let i = 0; i < 5; i++) {
      ref.current.getMatrixAt(i, mat)
      api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-50).toArray(), [0, 0, 0])
    }
  })

  return <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, 5]} geometry={sphereGeometry} material={beigeMaterial} />
}

export function GlassSpheres({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
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
