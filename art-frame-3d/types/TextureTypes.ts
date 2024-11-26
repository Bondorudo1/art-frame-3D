export default interface TextureHelperProps {
  colorMapUrl: string;
  displacementMapUrl: string;
  normalMapUrl: string;
  roughnessMapUrl: string;
  aoMapUrl: string;
  displacementScale?: number; // Optional, default value is 0.2
  metalness?: number;  // Optional, default value can be 0
  roughness?: number;  // Optional, default value can be 1
}
