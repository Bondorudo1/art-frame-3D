import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import { ModelProps } from "./ModelProps";

export default function Frame({
  angle,
  rotation,
  side = "front",
  ...props
}: ModelProps) {
  const modelRef = useRef<THREE.Object3D>();
  const [size, setSize] = useState({ x: 0, y: 0, z: 0 });

  const { scene: originalScene } = useGLTF("/Models/APPLIED1.glb");

  useEffect(() => {
    if (modelRef.current) {
      const boundingBox = new THREE.Box3().setFromObject(modelRef.current);
      const newSize = new THREE.Vector3();
      boundingBox.getSize(newSize);

      setSize({ x: newSize.x, y: newSize.y, z: newSize.z });

      console.log("Width:", newSize.x);
      console.log("Height:", newSize.y);
      console.log("Depth:", newSize.z);
    }
  }, [originalScene]);

  // Clone the scene to ensure uniqueness
  const scene = useMemo(() => {
    const clone = originalScene.clone();
    clone.updateMatrixWorld();
    return clone;
  }, [originalScene]);

  const { planeYPosition } = useControls("Clipping Plane", {
    planeYPosition: {
      value: 21.74,
      min: -50,
      max: 21.74,
      step: 0.01,
    },
  });

  const planeNormal = useMemo(() => {
    const radians = (angle * Math.PI) / 180;
    return new THREE.Vector3(Math.cos(radians), 0, Math.sin(radians));
  }, [angle]);

  const adjustedPlaneYPosition = useMemo(
    () => (side === "back" ? -planeYPosition : planeYPosition),
    [planeYPosition, side]
  );

  const plane = useMemo(
    () => new THREE.Plane(planeNormal, adjustedPlaneYPosition),
    [planeNormal, adjustedPlaneYPosition]
  );

  useEffect(() => {
    // Update plane constant to follow the model's position
    const updateClippingPlane = () => {
      if (modelRef.current) {
        const modelPosition = new THREE.Vector3();
        modelRef.current.getWorldPosition(modelPosition);
        plane.constant = adjustedPlaneYPosition - planeNormal.dot(modelPosition);
      }
    };

    // Apply unique clipping plane and shadow properties to the cloned scene
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material instanceof THREE.Material) {
          mesh.material = mesh.material.clone();
          mesh.material.clippingPlanes = [plane];
          mesh.material.clipIntersection = true;
          mesh.material.needsUpdate = true;
        }
      }
    });

    updateClippingPlane(); // Initial update
  }, [scene, plane, planeNormal, adjustedPlaneYPosition]);

  return (
    <>
      <primitive
        ref={modelRef}
        object={scene}
        rotation-y={rotation}
        {...props}
      />
      <primitive
        object={new THREE.PlaneHelper(plane, 5, 0xff0000)} // 5 is the size, red is the color
      />
    </>
  );
}

