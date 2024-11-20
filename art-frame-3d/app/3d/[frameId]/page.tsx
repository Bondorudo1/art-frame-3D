'use client';



import { OrbitControls } from "@react-three/drei";
import Lights from "@/components/Additions/Lights";
import Frames from "@/components/Frames/Frames";

export default function Page1() {
  return (
    <>

      <OrbitControls makeDefault />
      <Lights />
      <Frames />
    </>
  );
}
