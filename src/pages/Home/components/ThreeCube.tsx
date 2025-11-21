// TypeScript React - src/pages/Home/components/ThreeCube.tsx
import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const CUBE_TEXTURES = [
    'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-1.2.1&auto=format&fit=crop&w=2080&q=80',
    'https://images.unsplash.com/photo-1615111784767-4d7c527f32a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80',
    'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80',
    'https://images.unsplash.com/photo-1596854273338-cbf078ec7071?ixlib=rb-1.2.1&auto=format&fit=crop&w=2080&q=80',
    'https://images.unsplash.com/photo-1520315342629-6ea920342047?ixlib=rb-1.2.1&auto=format&fit=crop&w=2080&q=80',
];

const BOX_SIZE = 200;

function RotatingBox() {
    const meshRef = useRef<THREE.Mesh | null>(null);
    const textures = useTexture(CUBE_TEXTURES);

    const materials = useMemo(() => textures.map((tex) => new THREE.MeshBasicMaterial({ map: tex })), [textures]);

    useEffect(() => {
        return () => {
            materials.forEach((m) => {
                if (m.map) m.map.dispose();
                m.dispose();
            });
        };
    }, [materials]);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={meshRef} material={materials}>
            <boxGeometry args={[BOX_SIZE, BOX_SIZE, BOX_SIZE]} />
        </mesh>
    );
}

export function ThreeCube() {
    const MIN_WIDTH = 427;
    const MIN_HEIGHT = 422;
    const MAX_WIDTH = 427;
    const MAX_HEIGHT = 422;

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                minWidth: MIN_WIDTH,
                minHeight: MIN_HEIGHT,
                maxWidth: MAX_WIDTH,
                maxHeight: MAX_HEIGHT,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'visible',
                margin: '0 auto',
            }}
        >
            <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 400], fov: 70 }}>
                <directionalLight position={[200, 200, 200]} intensity={1.5} />
                <RotatingBox />
                <OrbitControls autoRotate enableZoom={false} />
            </Canvas>
        </div>
    );
}
