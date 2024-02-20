<script setup lang="ts">
import {onBeforeRouteLeave} from 'vue-router'
import { TresCanvas, useRenderLoop } from '@tresjs/core';
import { Vector2, Vector3 } from 'three';

const blobRef = shallowRef();
const camRef = shallowRef();
const webstate: Ref<import('~/types/custom').WebState> = useState('config');
const { onLoop, pause, resume } = useRenderLoop();

const uniforms = {
	uTime: { value: 0 },
	uResolution: { value: new Vector2() },
	uIsSmall: { value: webstate.value.mobile },
};

const vertshader = `uniform float uTime;uniform vec2 uResolution;uniform bool uIsSmall;varying vec3 vNormal;varying vec2 vUV;void main(){vNormal=normal;vUV=uv*vec2(1,uResolution.y/uResolution.x)-vec2(0,(uResolution.y/uResolution.x-1.)/2.);if(uIsSmall)vUV*=.5,vUV+=.25;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1);}`;
const fragshader = `
uniform float uTime;uniform vec2 uResolution;varying vec2 vUV;float v(float v,float m,float f){return clamp((f-v)/(m-v),0.,1.);}vec3 v(vec3 m,vec3 f,vec3 x){return vec3(v(m.x,f.x,x.x),v(m.y,f.y,x.y),v(m.z,f.z,x.z));}float v(vec2 v){return fract(sin(dot(v.xy,vec2(12.9898,78.233)))*43758.5453123);}float f(vec2 m){vec2 f=floor(m),x=fract(m);float y=v(f),z=v(f+vec2(1,0)),i=v(f+vec2(0,1)),d=v(f+vec2(1));vec2 n=x*x*(3.-2.*x);return mix(y,z,n.x)+(i-y)*n.y*(1.-n.x)+(d-z)*n.x*n.y;}
#define OCTAVES 5
float m(vec2 v){float m=0.,x=.5;for(int r=0;r<OCTAVES;r++)m+=x*f(v),v*=2.,x*=.5;return m;}float f(vec3 v,vec3 m){vec3 f=abs(v)-m;return length(max(f,0.))+min(max(f.x,max(f.y,f.z)),0.);}float n(vec3 v){return f(v*vec3(.7,1,1),vec3(mod(m(v.xy*2.+uTime*.1)*.5+.25,.2)*5.));}float m(vec3 v,vec3 m){float f=.1;for(int r=0;r<32;r++){float i=n(v+m*f);if(i<.01)return f;f+=i;if(f>20.)break;}return f;}vec3 r(vec3 v){
#define ZERO (min(int(uTime),0))
vec3 f=vec3(0);for(int m=ZERO;m<4;m++){vec3 x=.5773*(2.*vec3(m+3>>1&1,m>>1&1,m&1)-1.);f+=x*n(v+x*.005);}return normalize(f);}void main(){vec3 v=vec3(0),f=cameraPosition;vec2 i=-1.+2.*vUV;vec3 x=normalize(vec3(i,-1));float n=m(f,x);if(n<20.){vec3 y=r(f+x*n);v=vec3(.5)+.5*y;v*=vec3(1,0,1);}gl_FragColor=vec4(v,1);}`;

onLoop(({ delta, elapsed }) => {
  if (blobRef.value) {
	if(blobRef.value.material)
    blobRef.value.material.uniforms.uTime.value = elapsed;
    blobRef.value.material.uniforms.uResolution.value = new Vector2(
      window.innerWidth,
      window.innerHeight
    );
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
	<div>
		<div class="grid h-screen place-items-center">
			<ul class="main">
				<li class="text-4xl font-lora font-semibold italic text-white" :class="{'text-center':webstate.mobile}">hi</li>
				<br>
				<div v-if="!webstate.mobile">
					<li class="text-xl font-lora font-medium italic text-white">I'm a 22 year old developer/university student
						from Germany.</li>
					<li class="text-xl font-lora font-medium italic text-white">Currently, I study at the University of Applied
						Sciences in Mittweida.</li>
					<li class="text-xl font-lora font-medium italic text-white">On other platforms I go by Minemo or MinemoTV,
						so you might know me under that name.</li>
					<br>
					<li class="text-xl font-lora font-medium italic text-white">I love experimenting with procedural or
						interactive visuals and sound.</li>
					<li class="text-xl font-lora font-medium italic text-white">Because of this, I mostly do web, shader, and
						game-development but sometimes I also do small machine-learning or OS-dev things.</li>
					<li class="text-xl font-lora font-medium italic text-white">The language I use the most is probably Python,
						although I like using TS/JS, Rust, and GLSL/HLSL quite a bit too.</li>
					<li class="text-xl font-lora font-medium italic text-white">Some of my projects include a <a
							class="underline" href="https://github.com/minemo/huion-solar-getter">Modbus interface for huion
							solar inverters</a> or a <a class="underline"
							href="https://github.com/minemo/twitch_transcription">caption generator for Twitch streams.</a></li>
					<br>
					<li class="text-xl font-lora font-medium italic text-white">That's about it. Enjoy the rest of your stay ^^
					</li>
					<br>
				</div>
				<div v-else>
					<li class="text-xl font-lora font-semibold italic text-white text-center px-4">
						I'm a 22 year old developer/university student from Germany.
						Currently, I study at the University of Applied Sciences in Mittweida.
						On other platforms I go by Minemo or MinemoTV, so you might know me under that name.
						<br>
						I love experimenting with procedural or interactive visuals and sound.
						Because of this, I mostly do web, shader, and game-development but sometimes I also do small machine-learning or OS-dev things.
						The language I use the most is probably Python, although I like using TS/JS, Rust, and GLSL/HLSL quite a bit too.
						Some of my projects include a <br>
						<a class="underline" href="https://github.com/minemo/huion-solar-getter">Modbus interface for huion solar inverters</a> <br> or a  
						<a class="underline" href="https://github.com/minemo/twitch_transcription">caption generator for Twitch streams.</a>
						That's about it. Enjoy the rest of your stay ^^
					</li>
					<br>
				</div>
				<li class="text-xl font-lora italic text-white" :class="{'font-semibold':webstate.mobile, 'text-center': webstate.mobile}">
					<NuxtLink to="/">back</NuxtLink>
				</li>
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