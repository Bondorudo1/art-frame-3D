import { Euler } from "@react-three/fiber";

// Updated type for rotation
export type ModelProps = {
  angle: number; // Angle in degrees for the clipping plane
  rotation?: Euler | undefined; // Rotation in radians for the frame
  side?: "front" | "back";
  mirror?: boolean; // Side of the clipping plane
  positionY?: number; // Ensure positionY is included here
} & JSX.IntrinsicElements["group"]; // Include props for a Three.js group element
