// blurShader.js
import { ShaderMaterial, UniformsUtils } from 'three';
import { useState, useEffect } from 'react';

const vertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float blurAmount;
  varying vec3 vNormal;
  void main() {
    vec3 color = vec3(1.0, 1.0, 1.0); 
    gl_FragColor = vec4(mix(color, vec3(blurAmount), blurAmount), 1.0);
  }
`;

export function useBlurShader(blurAmount) {
  const [shaderMaterial, setShaderMaterial] = useState(null);

  useEffect(() => {
    const uniforms = {
      blurAmount: { value: blurAmount },
    };
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: UniformsUtils.clone(uniforms),
    });
    setShaderMaterial(material);
  }, [blurAmount]);

  return shaderMaterial;
}
