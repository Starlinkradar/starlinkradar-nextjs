import Globe from 'react-globe.gl';
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(
    () => import('../components/globe'),
    { ssr: false }
  )

export default function Livemap3D() {
    return (
        <div>
            <DynamicComponentWithNoSSR />
        </div>
        
    )
}
