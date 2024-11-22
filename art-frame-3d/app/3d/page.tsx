"use client";

import Lights from "@/components/Additions/Lights";
import Frames from "@/components/Frames/Frames";
import { OrbitControls } from "@react-three/drei";
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
        <OrbitControls makeDefault />
        <Lights />
        <Frames boxWidth={50} boxHeight={50} positionY={-6} />
      </Canvas>
      <Leva />
    </>
  );
}
