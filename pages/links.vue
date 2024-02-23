<script setup lang="ts">
import {onBeforeRouteLeave} from 'vue-router'
import { TresCanvas, useRenderLoop } from '@tresjs/core';
import { Vector2 } from 'three';

const blobRef = shallowRef();
const camRef = shallowRef();
const webstate: Ref<import('~/types/custom').WebState> = useState('config');
const { onLoop, pause, resume } = useRenderLoop();

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

const uniforms = {
	uTime: { value: 0 },
	uResolution: { value: new Vector2() },
    uMouse: { value: new Vector2() },
	uIsSmall: { value: webstate.value.mobile },
};

const prand = Math.random()*10000 + Math.random();

const vertshader = `uniform float uTime;uniform vec2 uResolution;uniform bool uIsSmall;varying vec3 vNormal;varying vec2 vUV;void main(){vNormal=normal;vUV=uv*vec2(1,uResolution.y/uResolution.x)-vec2(0,(uResolution.y/uResolution.x-1.)/2.);if(uIsSmall)vUV*=.5,vUV+=.25;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1);}`;
const fragshader = `
uniform float uTime;uniform vec2 uResolution;uniform vec2 uMouse;varying vec2 vUV;
#define PI 3.14159265359
#define PRAND ${prand}
mat2 rotate2d(float _angle){return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));}vec2 tile(vec2 _st){_st*=20.;return fract(_st);}float bx(vec2 _st,vec2 _size){_size=vec2(.5)-_size*.5;vec2 uv=smoothstep(0.,1.,(_st-_size)/(_size+vec2(.001)-_size));uv*=smoothstep(0.,1.,(vec2(1)-_st-_size)/(_size+vec2(.001)-_size));return uv.x*uv.y;}float cr(vec2 _st,float _size){return bx(_st,vec2(_size,_size/4.))+bx(_st,vec2(_size/4.,_size));}void main(){vec2 st=tile(vUV);float idc=fract(sin(dot(floor(mod(vUV*20.,20.)).xy,vec2(12.9898,78.233)))*PRAND)-distance(uMouse,vUV);st-=.5;st*=rotate2d(uTime*PI);st+=.5;vec3 v=vec3(cr(st,idc));v*=vec3(1,0,0);gl_FragColor=vec4(v,1);}`;

onLoop(({ delta, elapsed }) => {
  if (blobRef.value) {
	if(blobRef.value.material)
    blobRef.value.material.uniforms.uTime.value = elapsed;
    blobRef.value.material.uniforms.uResolution.value = new Vector2(
      window.innerWidth,
      window.innerHeight
    );
    if (!webstate.value.mobile) {
      blobRef.value.material.uniforms.uMouse.value = new Vector2(mouse.pos.x * (1 / window.innerWidth), 1 - mouse.pos.y * (1 / window.innerHeight));
    } else {
      blobRef.value.material.uniforms.uMouse.value = new Vector2(0.5, Math.sin(elapsed / 2) * 0.5);
    }
    // resize object to match aspect ratio
    blobRef.value.scale.x = window.innerWidth / window.innerHeight;
  }
});
onBeforeRouteLeave(() => {
  pause();
});
onActivated(() => {
  resume();
});
</script>

<template>
	<div @mousemove="(ev) => onMouseMove(ev)">
		<div class="grid h-screen place-items-center">
            <ul class="main">
                <li class="pb-2 text-center text-3xl font-lora font-medium italic text-white underline"><a href="https://github.com/minemo">Github</a></li>
                <li class="pt-2 pb-2 text-center text-3xl font-lora font-medium italic text-white underline"><a href="https://www.instagram.com/makingminemo/">Instagram</a></li>
                <li class="pt-2 pb-2 text-center text-3xl font-lora font-medium italic text-white underline"><a  href="https://www.twitch.tv/minemotv">Twitch</a></li>
                <li class="pt-4 text-center text-2xl font-lora  italic text-white"><NuxtLink to="/">back</NuxtLink></li>
            </ul>
        </div>
		<TresCanvas window-size>
			<TresPerspectiveCamera ref="camRef" :position="[0, 0, 2]" :look-at="[0, 0, 0]" />
			<TresMesh ref="blobRef" :position="[0, 0, 0]" :rotation="[0, 0, 0]">
				<TresPlaneGeometry :args="[2, 2]" />
				<TresShaderMaterial :vertex-shader="vertshader" :fragment-shader="fragshader" :uniforms="uniforms" />
			</TresMesh>
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