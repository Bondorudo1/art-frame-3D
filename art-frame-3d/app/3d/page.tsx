"use client";

import Lights from "@/components/Additions/Lights";
import Underframe from "@/components/Underframe/Underframe";
import Frames from "@/components/Frames/Frames";
import { OrbitControls} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

export default function page() {
  return (
    <>
      <Leva collapsed />

      <Canvas
        onCreated={(state) => (state.gl.localClippingEnabled = true)}
        dpr={[1, 2]}
        shadows
        style={{ background: "#c9c7c7" }}
      >
       <OrbitControls minDistance={0.1} maxDistance={500} />

        <Lights />
        <Underframe />
        <Frames boxWidth={56.7} boxHeight={56.7} positionY={0} />
      </Canvas>
      <Leva />
    </>
  );
}
