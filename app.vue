<template>
    <NuxtPage keepalive/>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: 'Works By M',
  ogTitle: 'Works By M',
  description: 'The homepage of WorksByM/Minemo.',
  ogDescription: 'The homepage of WorksByM/Minemo.'
})

const headers = useRequestHeaders();
const userAgent = headers?.["user-agent"] ?? navigator.userAgent;
const webstate: Ref<import('~/types/custom').WebState> = useState('config');
const shaderinclude = `
/*
    This shader was composed using the following elements from LYGIA Shader library ( https://lygia.xyz )

        * lygia/generative/fbm.glsl

    LYGIA is dual-licensed under the [Prosperity License](https://prosperitylicense.com/versions/3.0.0) 
    and the [Patron License](https://lygia.xyz/license) for [sponsors](https://github.com/sponsors/patriciogonzalezvivo) 
    and [contributors](https://github.com/patriciogonzalezvivo/lygia/graphs/contributors).

    Those are automatically added to the [Patron License](https://lygia.xyz/license) and they (only they) 
    can ignore and any non-commercial rule of the [Prosperity License](https://prosperitylicense.com/versions/3.0.0)
    software (please take a look at the exceptions).

    It's also possible to get a permanent commercial license hooked to a single and specific version of LYGIA.
*/
// Generated with Shader Minifier 1.3.6 (https://github.com/laurentlb/Shader_Minifier/)
#ifndef FNC_MOD289
#define FNC_MOD289
float mod289(const float x){return x-floor(x*(1./289.))*289.;}vec2 mod289(const vec2 x){return x-floor(x*(1./289.))*289.;}vec3 mod289(const vec3 x){return x-floor(x*(1./289.))*289.;}vec4 mod289(const vec4 x){return x-floor(x*(1./289.))*289.;}
#endif
#ifndef FNC_PERMUTE
#define FNC_PERMUTE
float permute(const float v){return mod289((v*34.+1.)*v);}vec2 permute(const vec2 v){return mod289((v*34.+1.)*v);}vec3 permute(const vec3 v){return mod289((v*34.+1.)*v);}vec4 permute(const vec4 v){return mod289((v*34.+1.)*v);}
#endif
#ifndef FNC_TAYLORINVSQRT
#define FNC_TAYLORINVSQRT
float taylorInvSqrt(float r){return 1.79284291400159-.85373472095314*r;}vec2 taylorInvSqrt(vec2 r){return 1.79284291400159-.85373472095314*r;}vec3 taylorInvSqrt(vec3 r){return 1.79284291400159-.85373472095314*r;}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
#endif
#ifndef FNC_GRAD4
#define FNC_GRAD4
vec4 grad4(float j,vec4 ip){vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.)*ip.z-1.;p.w=1.5-dot(abs(p.xyz),vec4(1,1,1,-1).xyz);s=vec4(lessThan(p,vec4(0)));p.xyz=p.xyz+(s.xyz*2.-1.)*s.www;return p;}
#endif
#ifndef FNC_SNOISE
#define FNC_SNOISE
float snoise(vec2 v){vec2 i=floor(v+dot(v,vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439).yy)),x0=v-i+dot(i,vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439).xx),i1;i1=x0.x>x0.y?vec2(1,0):vec2(0,1);vec4 x12=x0.xyxy+vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439).xxzz;x12.xy-=i1;i=mod289(i);vec3 p=permute(permute(i.y+vec3(0,i1.y,1))+i.x+vec3(0,i1.x,1)),m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m*=m;m*=m;vec3 x=2.*fract(p*vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439).www)-1.,h=abs(x)-.5,a0=x-floor(x+.5);m*=1.79284291400159-.85373472095314*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}float snoise(vec3 v){const vec2 C=vec2(1./6.,1./3.);vec3 i=floor(v+dot(v,C.yyy)),x0=v-i+dot(i,C.xxx),g=step(x0.yzx,x0.xyz),l=1.-g,i1=min(g.xyz,l.zxy),i2=max(g.xyz,l.zxy),x1=x0-i1+C.xxx,x2=x0-i2+C.yyy,x3=x0-vec4(0,.5,1,2).yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0,i1.z,i2.z,1))+i.y+vec4(0,i1.y,i2.y,1))+i.x+vec4(0,i1.x,i2.x,1));vec3 ns=.142857142857*vec4(0,.5,1,2).wyz-vec4(0,.5,1,2).xzx;vec4 j=p-49.*floor(p*ns.z*ns.z),x_=floor(j*ns.z),x=x_*ns.x+ns.yyyy,y=floor(j-7.*x_)*ns.x+ns.yyyy,h=1.-abs(x)-abs(y),b0=vec4(x.xy,y),b1=vec4(x.zw,y.zw),sh=-step(h,vec4(0)),a0=b0.xzyw+(floor(b0)*2.+1.).xzyw*sh.xxyy,a1=b1.xzyw+(floor(b1)*2.+1.).xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x),p1=vec3(a0.zw,h.y),p2=vec3(a1.xy,h.z),p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m*=m;return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}float snoise(vec4 v){vec4 i=floor(v+dot(v,vec4(.309016994374947))),x0=v-i+dot(i,vec4(.138196601125011,.276393202250021,.414589803375032,-.447213595499958).xxxx),i0;vec3 isX=step(x0.yzw,x0.xxx),isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.-isYZ.z;vec4 i3=clamp(i0,0.,1.),i2=clamp(i0-1.,0.,1.),i1=clamp(i0-2.,0.,1.),x1=x0-i1+vec4(.138196601125011,.276393202250021,.414589803375032,-.447213595499958).xxxx,x2=x0-i2+vec4(.138196601125011,.276393202250021,.414589803375032,-.447213595499958).yyyy,x3=x0-i3+vec4(.138196601125011,.276393202250021,.414589803375032,-.447213595499958).zzzz,x4=x0+vec4(.138196601125011,.276393202250021,.414589803375032,-.447213595499958).wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1))+i.z+vec4(i1.z,i2.z,i3.z,1))+i.y+vec4(i1.y,i2.y,i3.y,1))+i.x+vec4(i1.x,i2.x,i3.x,1)),ip=vec4(1./294.,1./49.,1./7.,0),p0=grad4(j0,ip),p1=grad4(j1.x,ip),p2=grad4(j1.y,ip),p3=grad4(j1.z,ip),p4=grad4(j1.w,ip),norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 m0=max(.6-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.);vec2 m1=max(.6-vec2(dot(x3,x3),dot(x4,x4)),0.);m0*=m0;m1*=m1;return 49.*(dot(m0*m0,vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2)))+dot(m1*m1,vec2(dot(p3,x3),dot(p4,x4))));}vec2 snoise2(vec2 x){float s=snoise(vec2(x)),s1=snoise(vec2(x.y-19.1,x.x+47.2));return vec2(s,s1);}vec3 snoise3(vec3 x){float s=snoise(vec3(x)),s1=snoise(vec3(x.y-19.1,x.z+33.4,x.x+47.2)),s2=snoise(vec3(x.z+74.2,x.x-124.5,x.y+99.4));return vec3(s,s1,s2);}vec3 snoise3(vec4 x){float s=snoise(vec4(x)),s1=snoise(vec4(x.y-19.1,x.z+33.4,x.x+47.2,x.w)),s2=snoise(vec4(x.z+74.2,x.x-124.5,x.y+99.4,x.w));return vec3(s,s1,s2);}
#endif
#ifndef RANDOM_SCALE
#ifdef RANDOM_HIGHER_RANGE
#define RANDOM_SCALE vec4(.1031,.1030,.0973,.1099)
#else
#define RANDOM_SCALE vec4(443.897,441.423,.0973,.1099)
#endif
#endif
#ifndef FNC_RANDOM
#define FNC_RANDOM
float random(float x){
#ifdef RANDOM_SINLESS
x=fract(x*RANDOM_SCALE.x);x*=x+33.33;x*=x+x;return fract(x);
#else
return fract(sin(x)*43758.5453);
#endif
}float random(vec2 st){
#ifdef RANDOM_SINLESS
vec3 p3=fract(vec3(st.xyx)*RANDOM_SCALE.xyz);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);
#else
return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453);
#endif
}float random(vec3 pos){
#ifdef RANDOM_SINLESS
pos=fract(pos*RANDOM_SCALE.xyz);pos+=dot(pos,pos.zyx+31.32);return fract((pos.x+pos.y)*pos.z);
#else
return fract(sin(dot(pos.xyz,vec3(70.9898,78.233,32.4355)))*43758.5453123);
#endif
}float random(vec4 pos){
#ifdef RANDOM_SINLESS
pos=fract(pos*RANDOM_SCALE);pos+=dot(pos,pos.wzxy+33.33);return fract((pos.x+pos.y)*(pos.z+pos.w));
#else
float dot_product=dot(pos,vec4(12.9898,78.233,45.164,94.673));return fract(sin(dot_product)*43758.5453);
#endif
}vec2 random2(float p){vec3 p3=fract(vec3(p)*RANDOM_SCALE.xyz);p3+=dot(p3,p3.yzx+19.19);return fract((p3.xx+p3.yz)*p3.zy);}vec2 random2(vec2 p){vec3 p3=fract(p.xyx*RANDOM_SCALE.xyz);p3+=dot(p3,p3.yzx+19.19);return fract((p3.xx+p3.yz)*p3.zy);}vec2 random2(vec3 p3){p3=fract(p3*RANDOM_SCALE.xyz);p3+=dot(p3,p3.yzx+19.19);return fract((p3.xx+p3.yz)*p3.zy);}vec3 random3(float p){vec3 p3=fract(vec3(p)*RANDOM_SCALE.xyz);p3+=dot(p3,p3.yzx+19.19);return fract((p3.xxy+p3.yzz)*p3.zyx);}vec3 random3(vec2 p){vec3 p3=fract(vec3(p.xyx)*RANDOM_SCALE.xyz);p3+=dot(p3,p3.yxz+19.19);return fract((p3.xxy+p3.yzz)*p3.zyx);}vec3 random3(vec3 p){p=fract(p*RANDOM_SCALE.xyz);p+=dot(p,p.yxz+19.19);return fract((p.xxy+p.yzz)*p.zyx);}vec4 random4(float p){vec4 p4=fract(p*RANDOM_SCALE);p4+=dot(p4,p4.wzxy+19.19);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec4 random4(vec2 p){vec4 p4=fract(p.xyxy*RANDOM_SCALE);p4+=dot(p4,p4.wzxy+19.19);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec4 random4(vec3 p){vec4 p4=fract(p.xyzx*RANDOM_SCALE);p4+=dot(p4,p4.wzxy+19.19);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec4 random4(vec4 p4){p4=fract(p4*RANDOM_SCALE);p4+=dot(p4,p4.wzxy+19.19);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}
#endif
#ifndef FNC_SRANDOM
#define FNC_SRANDOM
float srandom(float x){return-1.+2.*fract(sin(x)*43758.5453);}float srandom(vec2 st){return-1.+2.*fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453);}float srandom(vec3 pos){return-1.+2.*fract(sin(dot(pos.xyz,vec3(70.9898,78.233,32.4355)))*43758.5453123);}float srandom(vec4 pos){return-1.+2.*fract(sin(dot(pos,vec4(12.9898,78.233,45.164,94.673)))*43758.5453);}vec2 srandom2(vec2 st){st=st*vec2(.3183099,.3678794)+vec2(.3183099,.3678794).yx;return-1.+2.*fract(16.*vec2(.3183099,.3678794)*fract(st.x*st.y*(st.x+st.y)));}vec3 srandom3(vec3 p){p=vec3(dot(p,vec3(127.1,311.7,74.7)),dot(p,vec3(269.5,183.3,246.1)),dot(p,vec3(113.5,271.9,124.6)));return-1.+2.*fract(sin(p)*43758.5453123);}vec2 srandom2(vec2 p,const float tileLength){p=mod(p,vec2(tileLength));return srandom2(p);}vec3 srandom3(vec3 p,const float tileLength){p=mod(p,vec3(tileLength));return srandom3(p);}
#endif
#ifndef FNC_CUBIC
#define FNC_CUBIC
float cubic(const float v){return v*v*(3.-2.*v);}vec2 cubic(const vec2 v){return v*v*(3.-2.*v);}vec3 cubic(const vec3 v){return v*v*(3.-2.*v);}vec4 cubic(const vec4 v){return v*v*(3.-2.*v);}float cubic(const float v,float slope0,float slope1){float v2=v*v;return(slope0+slope1-2.)*(v*v2)+(-2.*slope0-slope1+3.)*v2+slope0*v;}vec2 cubic(const vec2 v,float slope0,float slope1){vec2 v2=v*v;return(slope0+slope1-2.)*(v*v2)+(-2.*slope0-slope1+3.)*v2+slope0*v;}vec3 cubic(const vec3 v,float slope0,float slope1){vec3 v2=v*v;return(slope0+slope1-2.)*(v*v2)+(-2.*slope0-slope1+3.)*v2+slope0*v;}vec4 cubic(const vec4 v,float slope0,float slope1){vec4 v2=v*v;return(slope0+slope1-2.)*(v*v2)+(-2.*slope0-slope1+3.)*v2+slope0*v;}
#endif
#ifndef FNC_QUINTIC
#define FNC_QUINTIC
float quintic(const float v){return v*v*v*(v*(v*6.-15.)+10.);}vec2 quintic(const vec2 v){return v*v*v*(v*(v*6.-15.)+10.);}vec3 quintic(const vec3 v){return v*v*v*(v*(v*6.-15.)+10.);}vec4 quintic(const vec4 v){return v*v*v*(v*(v*6.-15.)+10.);}
#endif
#ifndef FNC_GNOISE
#define FNC_GNOISE
float gnoise(float x){float i=floor(x);return mix(random(i),random(i+1.),smoothstep(0.,1.,fract(x)));}float gnoise(vec2 st){vec2 i=floor(st);float a=random(i),b=random(i+vec2(1,0)),c=random(i+vec2(0,1)),d=random(i+vec2(1));vec2 u=cubic(fract(st));return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;}float gnoise(vec3 p){vec3 i=floor(p),u=quintic(fract(p));return-1.+2.*mix(mix(mix(random(i+vec3(0)),random(i+vec3(1,0,0)),u.x),mix(random(i+vec3(0,1,0)),random(i+vec3(1,1,0)),u.x),u.y),mix(mix(random(i+vec3(0,0,1)),random(i+vec3(1,0,1)),u.x),mix(random(i+vec3(0,1,1)),random(i+vec3(1)),u.x),u.y),u.z);}float gnoise(vec3 p,float tileLength){vec3 i=floor(p),f=fract(p),u=quintic(f);return mix(mix(mix(dot(srandom3(i+vec3(0),tileLength),f-vec3(0)),dot(srandom3(i+vec3(1,0,0),tileLength),f-vec3(1,0,0)),u.x),mix(dot(srandom3(i+vec3(0,1,0),tileLength),f-vec3(0,1,0)),dot(srandom3(i+vec3(1,1,0),tileLength),f-vec3(1,1,0)),u.x),u.y),mix(mix(dot(srandom3(i+vec3(0,0,1),tileLength),f-vec3(0,0,1)),dot(srandom3(i+vec3(1,0,1),tileLength),f-vec3(1,0,1)),u.x),mix(dot(srandom3(i+vec3(0,1,1),tileLength),f-vec3(0,1,1)),dot(srandom3(i+vec3(1),tileLength),f-vec3(1)),u.x),u.y),u.z);}vec3 gnoise3(vec3 x){return vec3(gnoise(x+vec3(123.456,.567,.37)),gnoise(x+vec3(.11,47.43,19.17)),gnoise(x));}
#endif
#ifndef FBM_OCTAVES
#define FBM_OCTAVES 4
#endif
#ifndef FBM_NOISE_FNC
#define FBM_NOISE_FNC(UV)snoise(UV)
#endif
#ifndef FBM_NOISE2_FNC
#define FBM_NOISE2_FNC(UV)FBM_NOISE_FNC(UV)
#endif
#ifndef FBM_NOISE3_FNC
#define FBM_NOISE3_FNC(UV)FBM_NOISE_FNC(UV)
#endif
#ifndef FBM_NOISE_TILABLE_FNC
#define FBM_NOISE_TILABLE_FNC(UV,TILE)gnoise(UV,TILE)
#endif
#ifndef FBM_NOISE3_TILABLE_FNC
#define FBM_NOISE3_TILABLE_FNC(UV,TILE)FBM_NOISE_TILABLE_FNC(UV,TILE)
#endif
#ifndef FBM_NOISE_TYPE
#define FBM_NOISE_TYPE float
#endif
#ifndef FBM_VALUE_INITIAL
#define FBM_VALUE_INITIAL 0.0
#endif
#ifndef FBM_SCALE_SCALAR
#define FBM_SCALE_SCALAR 2.0
#endif
#ifndef FBM_AMPLITUD_INITIAL
#define FBM_AMPLITUD_INITIAL 0.5
#endif
#ifndef FBM_AMPLITUD_SCALAR
#define FBM_AMPLITUD_SCALAR 0.5
#endif
#ifndef FNC_FBM
#define FNC_FBM
FBM_NOISE_TYPE fbm(vec2 st){FBM_NOISE_TYPE value=FBM_NOISE_TYPE(FBM_VALUE_INITIAL);float amplitud=FBM_AMPLITUD_INITIAL;for(int i=0;i<FBM_OCTAVES;i++)value+=amplitud*FBM_NOISE2_FNC(st),st*=FBM_SCALE_SCALAR,amplitud*=FBM_AMPLITUD_SCALAR;return value;}FBM_NOISE_TYPE fbm(vec3 pos){FBM_NOISE_TYPE value=FBM_NOISE_TYPE(FBM_VALUE_INITIAL);float amplitud=FBM_AMPLITUD_INITIAL;for(int i=0;i<FBM_OCTAVES;i++)value+=amplitud*FBM_NOISE3_FNC(pos),pos*=FBM_SCALE_SCALAR,amplitud*=FBM_AMPLITUD_SCALAR;return value;}FBM_NOISE_TYPE fbm(vec3 p,float tileLength){float amplitude=.5;FBM_NOISE_TYPE total=FBM_NOISE_TYPE(0.);float normalization=0.;for(int i=0;i<FBM_OCTAVES;++i){float noiseValue=FBM_NOISE3_TILABLE_FNC(p,tileLength*2.*.5)*.5+.5;total+=noiseValue*amplitude;normalization+=amplitude;amplitude*=.5;p*=2.;}return total/normalization;}
#endif
vec3 rgb2hsv(vec3 c){vec4 K=vec4(0,-1./3.,2./3.,-1),p=mix(vec4(c.zy,K.wz),vec4(c.yz,K),step(c.z,c.y)),q=mix(vec4(p.xyw,c.x),vec4(c.x,p.yzx),step(p.x,c.x));float d=q.x-min(q.w,q.y);return vec3(abs(q.z+(q.w-q.y)/(6.*d+1e-10)),d/(q.x+1e-10),q);}vec3 hsv2rgb(vec3 c){vec4 K=vec4(1,2./3.,1./3.,3);return c.z*mix(K.xxx,clamp(abs(fract(c.xxx+K.xyz)*6.-K.www)-K.xxx,0.,1.),c.y);}
`;

function isMobile() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(userAgent);
  return check;
}

await callOnce(async () => {
    webstate.value = {
        mobile: isMobile(),
        globalshaderincludes: shaderinclude,
    }
})
</script>

<style>
/* workaround for transition flashbang */
body {
  background-color: #000;
  overflow: hidden; /* Hide scrollbars for transition */
}
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  scale: 3.0;
}
</style>