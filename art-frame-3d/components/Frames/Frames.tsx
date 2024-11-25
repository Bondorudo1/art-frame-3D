// import { Suspense } from "react";
// import Frame from "../Frame/Frame";
// import { SizeProps } from "./SizeProps";

// export default function Frames({ boxHeight, boxWidth, positionY }: SizeProps) {
//   const precise = (value: number) => parseFloat(value.toFixed(6)); // Precision adjustment

//   return (
//     <>
//       <group>
//         <Suspense fallback={null}>
//           {/* Frame 1 */}
//           <Frame
//             angle={45}
//             scale={1}
//             rotation={[0, 0, Math.PI / 2]} // Rotated by 90 degrees around Z
//             position={[-0.9, precise(boxHeight / 2 + 0.5), 0]} // Adjusted precision
//             positionY={positionY}
//             mirror={true}
//           />

//           Frame 2
//           <Frame
//             angle={45}
//             scale={1}
//             rotation={[Math.PI / 2, 0, Math.PI / 2]} // Rotated by 90 degrees around Z
//             position={[-0.9, precise(boxHeight / 2 + 0.5-10), precise(boxWidth / 2)]} // Adjusted for alignment
//             positionY={positionY}
//             mirror={true}
//           />



//           {/* Main Mesh */}
//           <mesh scale={1} castShadow position={[0, -0.6, 0]}>
//             <boxGeometry args={[1, boxHeight, boxWidth]} />
//             <meshStandardMaterial color={"red"} />
//           </mesh>
//         </Suspense>
//       </group>
//     </>
//   );
// }


import React from "react";
import { Suspense } from "react";
import Frame from "../Frame/Frame";
import { SizeProps } from "./SizeProps";

export default function Frames({ boxHeight, boxWidth }: SizeProps) {
  const precise = (value: number) => parseFloat(value.toFixed(6)); // Precision adjustment

  return (
    <group>
      <Suspense fallback={null}>
        <Frame
          angles={[45]} // Two angles
          rotations={[
            [0, 0, Math.PI / 2], // Rotation for frame 1
            [Math.PI / 2, 0, Math.PI / 2], // Rotation for frame 2
          ]}
          positions={[
            [-0.9, precise(boxHeight / 2 + 0.5), 0], // Position for frame 1
            [-0.9, precise(boxHeight / 2 + 0.5-11), precise(boxWidth / 2)+0.84], // Position for frame 2
          ]}
          scale={1}
          mirror={true}
        />

        {/* Main Mesh */}
        <mesh scale={1} castShadow position={[0, -0.6, 0]}>
          <boxGeometry args={[1, boxHeight, boxWidth]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </Suspense>
    </group>
  );
}
