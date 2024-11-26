import TextureHelper from '@/helpers/TextureHelper';
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';


// Since you're using React, we can use the React.FC (Functional Component) type here
const Underframe = () => {
  const frame = useMemo(() => {
    // Create the outer cube
    const outerCube = new THREE.Mesh(new THREE.BoxGeometry(56.7, 56.7, 1));

    // Create the inner cube to subtract
    const innerCube = new THREE.Mesh(new THREE.BoxGeometry(51, 51, 1));

    // Perform CSG subtraction
    const csgResult = CSG.subtract(outerCube, innerCube);

    return csgResult.geometry;
  }, []);

  return (
    <mesh rotation={[0, Math.PI / 2, 0]} position={[0.5, 0, 0]} geometry={frame}>
      <TextureHelper
        colorMapUrl="./Textures/Oak/textures/oak_veneer_01_diff_1k.jpg"
        displacementMapUrl="./Textures/Oak/textures/oak_veneer_01_disp_1k.png"
        normalMapUrl="./Textures/Oak/textures/oak_veneer_01_nor_gl_1k.exr"
        roughnessMapUrl="./Textures/Oak/textures/oak_veneer_01_rough_1k.exr"
        aoMapUrl="./Textures/Oak/textures/oak_veneer_01_ao_1k.jpg"
        displacementScale={0} 
    
      />
    </mesh>
  );
}

export default Underframe;
