// TypeScript React - src/pages/Home/components/ThreeCube.tsx
import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// 로컬 이미지 import (파일 위치: src/assets/images/home/cube/*)
import cube01 from '../../../assets/images/home/cube/cube-01.jpeg';
import cube02 from '../../../assets/images/home/cube/cube-02.jpeg';
import cube03 from '../../../assets/images/home/cube/cube-03.jpeg';
import cube04 from '../../../assets/images/home/cube/cube-04.jpeg';
import cube05 from '../../../assets/images/home/cube/cube-05.jpeg';
import cube06 from '../../../assets/images/home/cube/cube-06.jpeg';

const CUBE_TEXTURES = [
    cube06,
    cube05,
    cube03,
    cube04,
    cube02,
    cube01,
];

const BOX_SIZE = 200;

function RotatingBox() {
    const meshRef = useRef<THREE.Mesh | null>(null);
    const textures = useTexture(CUBE_TEXTURES);

    // 텍스처 색공간을 sRGB로 설정해 올바른 색/밝기를 보장
    useEffect(() => {
        const threeEnc = (THREE as unknown) as { sRGBEncoding?: number; SRGBColorSpace?: number };
        const sRGBEnc = threeEnc.sRGBEncoding ?? threeEnc.SRGBColorSpace;

        textures.forEach((tex) => {
            if (!tex) return;
            // Texture에 추가 프로퍼티가 있을 수 있으니 intersection으로 안전하게 단언
            const t = tex as THREE.Texture & { encoding?: number; needsUpdate?: boolean };
            if (sRGBEnc !== undefined) t.encoding = sRGBEnc;
            if (typeof t.needsUpdate !== 'undefined') t.needsUpdate = true;
        });
    }, [textures]);

    // MeshBasicMaterial -> MeshStandardMaterial 로 변경하여 라이트 영향을 받도록 함
    const materials = useMemo(
        () =>
            textures.map((tex) =>
                new THREE.MeshStandardMaterial({
                    map: tex,
                    roughness: 0.85, // 거칠게 해서 반사 줄임
                    metalness: 0.0,
                })
            ),
        [textures]
    );

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
    const MIN_WIDTH = 500;
    const MIN_HEIGHT = 422;
    const MAX_WIDTH = 500;
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
            <Canvas
                style={{ width: '100%', height: '100%' }}
                camera={{ position: [0, 0, 360], fov: 70 }}
                onCreated={({ gl }) => {
                    // gl은 런타임에 WebGLRenderer일 가능성이 크므로 안전하게 단언(unknown -> 인터섹션)
                    type MaybeRenderer = THREE.WebGLRenderer & {
                        outputEncoding?: number;
                        physicallyCorrectLights?: boolean;
                        toneMappingExposure?: number;
                    };

                    const renderer = (gl as unknown) as MaybeRenderer;
                    const threeEnc = (THREE as unknown) as { sRGBEncoding?: number; SRGBColorSpace?: number };
                    const sRGBEnc = threeEnc.sRGBEncoding ?? threeEnc.SRGBColorSpace;

                    if (sRGBEnc !== undefined) {
                        renderer.outputEncoding = sRGBEnc;
                    }

                    if ('physicallyCorrectLights' in renderer) {
                        renderer.physicallyCorrectLights = true;
                    }

                    if ('toneMappingExposure' in renderer) {
                        renderer.toneMappingExposure = 1;
                    }
                }}
            >
                {/* 약한 ambient를 추가해 너무 강한 하이라이트 완화 */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[200, 200, 200]} intensity={1.0} />
                <RotatingBox />
                <OrbitControls autoRotate enableZoom={false} />
            </Canvas>
        </div>
    );
}
