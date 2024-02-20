<script lang="ts" setup>
import { shallowRef } from 'vue';
import { TresCanvas, useRenderLoop } from '@tresjs/core';
import { Vector2, Vector3 } from 'three';

const planeRef = shallowRef();
const camRef = shallowRef();
const webstate: Ref<import('~/types/custom').WebState> = useState('config');
const { onLoop } = useRenderLoop();

let mouse = {
  pos: new Vector2(0, 0),
  prev: new Vector2(0, 0),
  vel: new Vector2(0, 0),
};

function onMouseMove(e: MouseEvent) {
  mouse.prev = mouse.pos;
  mouse.pos = new Vector2(e.clientX, e.clientY);
  mouse.vel = mouse.pos.clone().sub(mouse.prev);
}

const mobile = webstate.value.mobile;

const uniforms = {
  uTime: { value: 0 },
  uJitter: { value: 0.1 },
  uPosition: { value: new Vector3(0, 0, 0) },
  uResolution: { value: new Vector2() },
  uIsSmall: { value: mobile },
};

onLoop(({ delta, elapsed }) => {
  if (planeRef.value) {
    planeRef.value.material.uniforms.uTime.value = elapsed;
    if (mobile) {
      planeRef.value.material.uniforms.uPosition.value = new Vector3(
        Math.sin(elapsed / 2) * 0.25,
        Math.cos(elapsed / 2) * 0.25,
        0
      );
    } else {
      planeRef.value.material.uniforms.uPosition.value = new Vector3(
        mouse.pos.x / window.innerWidth - 0.5,
        -mouse.pos.y / window.innerHeight + 0.5,
        0
      );
    }
    planeRef.value.material.uniforms.uResolution.value = new Vector2(
      window.innerWidth,
      window.innerHeight
    );
    // resize object to match aspect ratio
    planeRef.value.scale.x = window.innerWidth / window.innerHeight;
  }
  mouse.vel = mouse.vel.multiplyScalar(0.9);
});

const vertshader = `
uniform float uTime,uJitter;uniform vec2 uResolution;uniform bool uIsSmall;varying vec3 vMpos,vNormal;varying vec2 vUV;
${webstate.value.globalshaderincludes}
void main(){vNormal=normal;vUV=uv*vec2(1,uResolution.y/uResolution.x)-vec2(0,(uResolution.y/uResolution.x-1.)/2.);if(uIsSmall)vUV*=.4,vUV+=vec2(.3);vMpos=position;float zdisp=fbm(position+normal*uJitter+uTime*.1)*.1;gl_Position=projectionMatrix*modelViewMatrix*vec4(position+normal*zdisp,1);}
`;
const fragshader = `
uniform float uTime;uniform vec3 uPosition;varying vec2 vUV;
${webstate.value.globalshaderincludes}
float sdSphere(vec3 p,float s){return length(p)-s;}float sdSphereNoise(vec3 p,float s){return length(p)-fbm(uPosition+p)*s;}vec3 rgbSphere(vec3 p,float t,vec3 mousePos){return vec3(step(sdSphereNoise(p-mousePos*sin(t)*.05,.2),.175),step(sdSphereNoise(p-mousePos*cos(t)*.05,.1),.175),step(sdSphereNoise(p-mousePos*.1,.1),.175));}void main(){vec3 pos=vec3(vUV.x-.5,vUV.y-.5,0),color=rgbSphere(pos,uTime,uPosition);gl_FragColor=vec4(color,1);}
`;
</script>

<template>
  <div @mousemove="(ev) => onMouseMove(ev)">
    <div class="grid h-screen place-items-center">
      <div class="main flex flex-col">
        <h1 class="text-center font-lora font-medium" :class="{ 'text-6xl': mobile, 'text-8xl': !mobile }">Works By M</h1>
        <div class="flex flex-row" :class="{ 'justify-between': mobile }">
          <NuxtLink to="/about" :class="{ 'mr-14': !mobile }">
            <p class="text-center text-4xl font-lora font-medium italic">about</p>
          </NuxtLink>
          <NuxtLink to="/links" :class="{ 'ml-14': !mobile }">
            <p class="text-center text-4xl font-lora font-medium italic">links</p>
          </NuxtLink>
        </div>
      </div>
    </div>
    <TresCanvas clear-color="#ffffff" window-size>
      <TresPerspectiveCamera ref="camRef" :position="[0, 0, 1]" :look-at="[0, 0, 0]" />
      <TresMesh ref="planeRef" :position="[0, 0, 0]" :rotation="[0, 0, 0]">
        <TresPlaneGeometry :args="[1, 1, 8, 8]" />
        <TresShaderMaterial :fragment-shader="fragshader" :vertex-shader="vertshader" :uniforms="uniforms" />
      </TresMesh>
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
</template>

<style>
canvas {
  z-index: 0;
}
.main {
  z-index: 1;
}
</style>