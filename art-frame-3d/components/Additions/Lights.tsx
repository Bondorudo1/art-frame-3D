



export default function Lights() {
  return (
    <>
      <directionalLight
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
        position={[1, 2, 3]}
        castShadow
        intensity={5}
      />
      <ambientLight intensity={3} />
    </>
  );
}
