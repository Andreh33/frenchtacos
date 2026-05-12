# Modelos 3D

Coloca aquí el archivo `french-tako.glb` cuando descargues un modelo real.

Recomendado: optimiza antes de commitear.

```bash
npx gltf-transform optimize input.glb french-tako.glb --texture-compress webp
```

Después, en `components/hero/TakoCanvas.tsx`:

```tsx
import { useGLTF } from '@react-three/drei'
useGLTF.preload('/models/french-tako.glb')

function Loaded() {
  const { scene } = useGLTF('/models/french-tako.glb')
  return <primitive object={scene} scale={1.05} />
}
```

Y reemplaza `<TakoModel />` por `<Loaded />`.
