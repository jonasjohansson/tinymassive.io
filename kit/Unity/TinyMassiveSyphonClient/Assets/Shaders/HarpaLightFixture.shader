Shader "Unlit/HarpaLightFixture"
{
	Properties
	{
		_MainTex ("Texture", 2D) = "white" {}
		_PixelX ("PixelX", float) = 0
		_PixelY ("PixelY", float) = 0
	}
	SubShader
	{
		Tags { "RenderType"="Opaque" }
		LOD 100

		Pass
		{
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			
			#include "UnityCG.cginc"

			struct appdata
			{
				float4 vertex : POSITION;
				float2 uv : TEXCOORD0;
			};

			struct v2f
			{
				float2 uv : TEXCOORD0;
				float4 vertex : SV_POSITION;
			};

			sampler2D _MainTex;
			float4 _MainTex_ST;
			float _PixelX;
			float _PixelY;
			
			v2f vert (appdata v)
			{
				v2f o;
				o.vertex = UnityObjectToClipPos(v.vertex);
				o.uv = TRANSFORM_TEX(v.uv, _MainTex);
				return o;
			}
			
			fixed4 frag (v2f i) : SV_Target
			{
				// sample the texture
				float normX = ((_PixelX+0.5) / 77.0);
				float normY = ((_PixelY+0.5) / 13.0);
				fixed4 col = tex2D(_MainTex, fixed2(normX, 1.0-normY));
				return col;
				
				// return tex2D(_MainTex, i.uv);
			}
			ENDCG
		}
	}
}
