import React from "react";
import { Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import Frame from "../Frame/Frame";
import { SizeProps } from "./SizeProps";
// import { OrthographicCamera } from "@react-three/drei";

export default function Frames({ boxHeight, boxWidth }: SizeProps) {
  const precise = (value: number) => parseFloat(value.toFixed(6)); // Precision adjustment

  // Load the bump map and front image textures
  const bumpMap = useLoader(TextureLoader, "./Textures/Brushes/brush_map.png");
  const frontTexture = useLoader(TextureLoader, "./Space.jpeg"); // Replace with your front image path

  return (
    <group>
      <Suspense fallback={null}>
        {/* Top and Right Frames */}
        <Frame
          angles={[225]} // Shared angle for all frames
          rotations={[
            [Math.PI, 0, Math.PI / 2], // Bottom frame
            [-Math.PI / 2, 0, Math.PI / 2], // Left frame
          ]}
          positions={[
            [-0.9, precise(-boxHeight / 2) - 0.85, 7.9], // Bottom frame
            [-0.9, 7.9, precise(-boxWidth / 2) - 0.85], // Left frame
          ]}
          scale={1}
          mirror={true}
        />
        <Frame
          angles={[45]} // Shared angle for all frames
          rotations={[
            [0, 0, Math.PI / 2], // Top frame
            [Math.PI / 2, 0, Math.PI / 2], // Left frame
          ]}
          positions={[
            [-0.9, precise(boxHeight / 2) + 0.85, -7.9], // Top frame
            [-0.9, -7.9, precise(boxWidth / 2) + 0.85], // Left frame
          ]}
          scale={1}
          mirror={true}
        />

        {/* Main Mesh */}
        <mesh scale={1} castShadow position={[-0.5, 0, 0]}>
          <boxGeometry args={[0.1, boxHeight, boxWidth]} />
          <meshStandardMaterial
            color={"white"}
            map={frontTexture} // Add the front texture here
            bumpMap={bumpMap} // Add the bump map here
            bumpScale={2} // Adjust the bump effect scale
            // Increase for more pronounced bump effect
            metalness={0} // Adjust for more reflective properties
            roughness={0.1}
          />
        </mesh>
      </Suspense>
      {/* <OrthographicCamera
        makeDefault
        position={[0, 0, 10]}
        zoom={50} // Adjust zoom to fit your scene
        near={0.1}
        far={1000}
      /> */}
    </group>
  );
}
