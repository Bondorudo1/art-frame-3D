import { Suspense } from "react";

import Frame from "../Frame/Frame";
import { SizeProps } from "./SizeProps";

export default function Frames({ boxHeight, boxWidth }: SizeProps) {
  return (
    <>
      <group>
        <Suspense fallback={null}>
          <Frame //bottom frame
            angle={45}
            scale={1}
            position={[boxHeight/2+1.07, 0, -6]} // Directly pass the array for position
            mirror={true}
          />
          {/* <Frame //top frame
            angle={135}
            rotation={Math.PI} // Directly pass the number for rotation
            scale={0.5}
            // Directly pass the array for position
            mirror={true}
          />
          <Frame //left frame
            angle={260}
            rotation={Math.PI / 2} // Euler object is fine
            scale={0.5}
            mirror={true}
          />
          <Frame //right frame
            angle={135}
            rotation={-Math.PI / 2} // Euler object is fine
            position={[0, 0, 0]} // Directly pass the array for position
            scale={0.5}
            mirror={true}
          /> */}
          <mesh scale={1} castShadow position={[0, -0.6, 0]}>
            <boxGeometry args={[boxHeight, 1, boxWidth]} />
            <meshStandardMaterial color={"red"} />
          </mesh>
        </Suspense>
      </group>
    </>
  );
}
