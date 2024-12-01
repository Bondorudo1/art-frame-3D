export default interface TextureHelperProps {
   textureUrl: string;
   bumpMapUrl: string;
   bumpScale?: number; // Optional with a default
   metalness?: number; // Optional with a default
   roughness?: number; // Optional with a default
   color?: string; // Default color
   scale?: [number, number, number]; // Optional scale adjustment
   position?: [number, number, number]; // Optional position
 };