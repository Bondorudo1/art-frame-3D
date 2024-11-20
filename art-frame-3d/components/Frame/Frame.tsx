import React, { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import { ModelProps } from "./ModelProps"; // Import the type
// import { or } from "three/webgpu";

export default function Frame({
  angle,
  rotation,
  side = "front",
  ...props
}: ModelProps) {
  const { scene: originalScene } = useGLTF("/Models/APPLIED1.glb");

  // Clone the scene to ensure uniqueness
  const scene = useMemo(() => {
    const clone = originalScene.clone();
    clone.updateMatrixWorld(); // Ensure the clone’s transforms are up-to-date
    return clone;
  }, [originalScene]);
  console.log(originalScene);
  const { planeYPosition } = useControls("Clipping Plane", {
    planeYPosition: {
      value: 0,
      min: -50,
      max: 50,
      step: 0.01,
    },
  });

  // Calculate the clipping plane's normal vector
  const planeNormal = useMemo(() => {
    const radians = (angle * Math.PI) / 180; // Convert angle to radians
    return new THREE.Vector3(Math.cos(radians), 0, Math.sin(radians));
  }, [angle]);

  // Adjust plane constant based on the side ("front" or "back")
  const adjustedPlaneYPosition = useMemo(
    () => (side === "back" ? -planeYPosition : planeYPosition),
    [planeYPosition, side]
  );

  const plane = useMemo(
    () => new THREE.Plane(planeNormal, adjustedPlaneYPosition),
    [planeNormal, adjustedPlaneYPosition]
  );

  useEffect(() => {
    // Apply unique clipping plane and shadow properties to the cloned scene
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Ensure each instance has unique material properties
        if (mesh.material instanceof THREE.Material) {
          mesh.material = mesh.material.clone();
          mesh.material.clippingPlanes = [plane];
          mesh.material.clipIntersection = true;
          mesh.material.needsUpdate = true;
        }
      }
    });
  }, [scene, plane]);

  return (
    <>
      <primitive object={scene} rotation-y={rotation} {...props} />
      <primitive
        object={new THREE.PlaneHelper(plane, 5, 0xff0000)} // 5 is the size, red is the color
      />
    </>
  );
}
