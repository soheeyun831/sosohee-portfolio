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
        textures.forEach((tex) => {
            if (tex) {
                tex.encoding = THREE.sRGBEncoding;
                tex.needsUpdate = true;
            }
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
                    // 출력 인코딩을 sRGB로 설정하면 텍스처 색과 밝기가 올바르게 보입니다
                    gl.outputEncoding = THREE.sRGBEncoding;
                    // 실제 광원 모드, 보다 현실적인 광량 계산
                    gl.physicallyCorrectLights = true;
                    // 필요하면 노출을 조절(기본 1). 더 어둡게 할 때는 0.8 같은 값 사용
                    gl.toneMappingExposure = 1;
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
