<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core';
import { Vector2, Vector3 } from 'three';

const blobRef = shallowRef();
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

const uniforms = {
	uTime: { value: 0 },
	uResolution: { value: new Vector2() },
	uMouse: { value: new Vector3() },
	uIsSmall: { value: webstate.value.mobile },
};

const vertshader = `
uniform float uTime;
uniform vec2 uResolution;
uniform bool uIsSmall;
uniform vec3 uMouse;
varying vec3 vMpos;
varying vec3 vNormal;
varying vec2 vUV;

void main() {
  vNormal = normal;
  // adjust uvs based on aspect ratio
  vUV = uv * vec2(1, uResolution.y / uResolution.x) - vec2(0, (uResolution.y / uResolution.x - 1.0) / 2.0);
  if (uIsSmall) {
    vUV *= 0.4;
    vUV += vec2(0.3, 0.3);
  }
  vMpos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const fragshader = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uMouse;
uniform bool uIsSmall;
varying vec2 vUV;

${webstate.value.globalshaderincludes}

float sdSphere( vec3 p, float s )
{
    return length(p)-s;
}
float scene( vec3 p )
{
	return clamp(sdSphere(p, fbm(p + uTime * 0.1) * 0.5 + 0.5), -0.5, 0.5);
}

float raymarch( vec3 ro, vec3 rd )
{
	float tmin = 0.001;
	float tmax = 20.0;
	float t = tmin;
	for( int i=0; i<${webstate.value.mobile ? 64 : 256}; i++ )
	{
		float h = scene(ro + rd*t);
		if( h<${webstate.value.mobile ? 0.05 : 0.001} )
		{
			return t;
		}
		t += h;
		if( t>tmax ) break;
	}
	return t;
}

void main() {

	vec3 col = vec3(0.0);
	vec3 ro = cameraPosition;
	vec2 vUV = -1.0 + 2.0 * vUV;

	vec3 rd = normalize(vec3(vUV, -1.0));
	float t = raymarch(ro, rd);
	if (t < 20.0) {
		vec3 pos = ro + rd * t;
		vec3 nor = normalize(pos);
		col = smoothstep(0.0, 1.0, length(nor.xy)) * vec3(0.8,0.0,0.0);
		
	}
	gl_FragColor = vec4(col, 1.0);
}
`;

onLoop(({ delta, elapsed }) => {
  if (blobRef.value) {
    blobRef.value.material.uniforms.uTime.value = elapsed;
    blobRef.value.material.uniforms.uResolution.value = new Vector2(
      window.innerWidth,
      window.innerHeight
    );
	if(webstate.value.mobile) {
		blobRef.value.material.uniforms.uMouse.value = new Vector3(
		Math.sin(elapsed / 2) * 0.5,
		Math.cos(elapsed / 2) * 0.5,
		0
	  );
	}else{
		blobRef.value.material.uniforms.uMouse.value = new Vector3(
        mouse.pos.x / window.innerWidth - 0.5,
        -mouse.pos.y / window.innerHeight + 0.5,
        0
      );
	}
    // resize object to match aspect ratio
    blobRef.value.scale.x = window.innerWidth / window.innerHeight;
  }
});

</script>

<template>
	<div @mousemove="(ev) => onMouseMove(ev)">
		<div class="grid h-screen place-items-center">
			<ul class="main">
				<li class="text-4xl font-lora font-medium italic text-white">hi</li>
				<br>
				<li class="text-xl font-lora font-normal italic text-white">I'm a 22 year old developer/university student
					from Germany.</li>
				<li class="text-xl font-lora font-normal italic text-white">Currently, I study at the University of Applied
					Sciences in Mittweida.</li>
				<li class="text-xl font-lora font-normal italic text-white">On other platforms I go by Minemo or MinemoTV,
					so you might know me under that name.</li>
				<br>
				<li class="text-xl font-lora font-normal italic text-white">I love experimenting with procedural or
					interactive visuals and sound.</li>
				<li class="text-xl font-lora font-normal italic text-white">Because of this, I mostly do web, shader, and
					game-development but sometimes I also do small machine-learning or OS-dev things.</li>
				<li class="text-xl font-lora font-normal italic text-white">The language I use the most is probably Python,
					although I like using TS/JS, Rust, and GLSL/HLSL quite a bit too.</li>
				<li class="text-xl font-lora font-normal italic text-white">Some of my projects include a <a
						class="underline" href="https://github.com/minemo/huion-solar-getter">Modbus interface for huion
						solar inverters</a> or a <a class="underline"
						href="https://github.com/minemo/twitch_transcription">caption generator for Twitch streams.</a></li>
				<br>
				<li class="text-xl font-lora font-normal italic text-white">That's about it. Enjoy the rest of your stay ^^
				</li>
				<br>
				<li class="text-xl font-lora font-normal italic text-white">
					<NuxtLink to="/">back</NuxtLink>
				</li>
			</ul>
		</div>
		<TresCanvas alpha window-size>
			<TresPerspectiveCamera ref="camRef" :position="[0, 0, 1]" :look-at="[0, 0, 0]" />
			<TresMesh ref="blobRef" :position="[0, 0, 0]" :rotation="[0, 0, 0]">
				<TresPlaneGeometry :args="[1, 1, 8, 8]" />
				<TresShaderMaterial :vertex-shader="vertshader" :fragment-shader="fragshader" :uniforms="uniforms" />
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