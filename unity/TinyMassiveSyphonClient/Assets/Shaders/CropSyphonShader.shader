// Upgrade NOTE: replaced 'mul(UNITY_MATRIX_MVP,*)' with 'UnityObjectToClipPos(*)'

Shader "OKGOVR/CropSyphonShader"
{
	Properties
	{
		_MainTex ("Source Texture", 2D) = "white" {}
		_Width ("Width", float) = 0.2
		_Height ("Height", float) = 0.2
		_YOffset ("YOffset", float) = 0
	}
	SubShader
	{
		Pass
		{
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			
			#include "UnityCG.cginc"

			struct vertexInput
			{
				float4 vertex : POSITION;
				float2 texcoord : TEXCOORD0;
			};


			struct v2f
			{
				float2 uv : TEXCOORD0;
				float4 vertex : SV_POSITION;
			};

			v2f vert(vertexInput i)
			{
				v2f o;
				o.vertex = UnityObjectToClipPos(i.vertex);
				o.uv = i.texcoord;
				return o;
			}

			sampler2D _MainTex;
			float4 _MainTex_ST;

			float _Width;
			float _Height;
			float _YOffset;


			
			fixed4 frag (v2f i) : SV_Target
			{
				
				fixed4 main = tex2D(_MainTex, i.uv + );

				return main;
			}
			ENDCG
		}
	}
}