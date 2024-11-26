import React from "react";
import { Suspense } from "react";
import Frame from "../Frame/Frame";
import { SizeProps } from "./SizeProps";
// import { OrthographicCamera } from "@react-three/drei";

export default function Frames({ boxHeight, boxWidth }: SizeProps) {
  const precise = (value: number) => parseFloat(value.toFixed(6)); // Precision adjustment

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
            [-0.9, precise(boxHeight / 2 )+0.85, -7.9], // Top frame
            [-0.9, -7.9, precise(boxWidth / 2) + 0.85], // Left frame
          ]}
          scale={1}
          mirror={true}
        />

        {/* Main Mesh */}
        <mesh scale={1} castShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.1, boxHeight, boxWidth]} />
          <meshStandardMaterial color={"blue"} />
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
