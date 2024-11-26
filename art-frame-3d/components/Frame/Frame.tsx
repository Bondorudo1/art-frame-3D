import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

interface FrameProps {
  angles: number[]; // Array of angles for each frame
  rotations: Array<[number, number, number]>; // Array of rotation tuples
  positions: Array<[number, number, number]>; // Array of position tuples
  scale?: number;
  mirror?: boolean;
}

export default function Frame({ angles, rotations, positions }: FrameProps) {
  const modelRef = useRef<THREE.Object3D>();

  const { scene: originalScene } = useGLTF("/Models/APPLIED3.glb");

  useEffect(() => {
    if (modelRef.current) {
      const boundingBox = new THREE.Box3().setFromObject(modelRef.current);
      const newSize = new THREE.Vector3();
      boundingBox.getSize(newSize);

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
      value: 18.56,
      min: -50,
      max: 18.56,
      step: 0.01,
    },
  });

  const planes = useMemo(() => {
    return angles.map((angle) => {
      const radians = (angle * Math.PI) / 180;
      const planeNormal = new THREE.Vector3(
        0,
        Math.cos(radians),
        Math.sin(radians)
      );
      return new THREE.Plane(planeNormal, planeYPosition);
    });
  }, [angles]);

  // Ensure the planes update when `planeYPosition` changes
  useEffect(() => {
    planes.forEach((plane) => {
      plane.constant = planeYPosition;
    });
  }, [planeYPosition, planes]);

  useEffect(() => {
    planes.forEach((plane) => {
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
    });
  }, [scene, planes]);

  return (
    <>
      {rotations.map((rotation, index) => (
        <primitive
          key={index}
          ref={index === 0 ? modelRef : undefined}
          object={scene.clone()} // Clone scene for each frame
          position={positions[index]}
          rotation={rotation}
        />
      ))}
      {planes.map((plane, index) => (
        <primitive
          key={`plane-${index}`}
          object={new THREE.PlaneHelper(plane, 5, 0xff0000)} // Plane helper
        />
      ))}
    </>
  );
}
