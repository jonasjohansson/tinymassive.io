using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Events;
using TMPro;
using Klak;

[ExecuteInEditMode]
public class CropSyphonToTexture : MonoBehaviour {

	public TMP_InputField yOffsetInput;
	public TMP_InputField captureWidthInput;
	public TMP_InputField captureHeightInput;
	public TMP_InputField appNameInput;

	public RenderTexture sourceTexture;
	public RenderTexture targetTexture;

	public UnityEngine.UI.Toggle scaleCroppedPreview;

	[Range(0.0f, 1.0f)]
	public float Width = 1.0f;
	[Range(0.0f, 1.0f)]
	public float Height = 1.0f;

	[Range(0,1024)]
	public int yOffset = 0;

	public Material croppedOutputMaterial;
	public Shader cropShader;
	public Klak.Syphon.SyphonClient syphonClient;

	public float debugNSourceTexX = 0.0f;
	public float debugNSourceTexY = 0.0f;

	
	// Use this for initialization
	IEnumerator Start () {
		croppedOutputMaterial = new Material(cropShader);
		yield return new WaitForSeconds(1.0f);
		UpdateSettings();
	}
	
	void LateUpdate () {

		croppedOutputMaterial.SetFloat("nSourceTexX", 0.0f);
		debugNSourceTexY = ((float)yOffset / sourceTexture.height);
		croppedOutputMaterial.SetFloat("nSourceTexY", debugNSourceTexY);

		
		croppedOutputMaterial.SetFloat("nSourceTexWidth", Width);
		croppedOutputMaterial.SetFloat("nSourceTexHeight", Height);


		Graphics.Blit(sourceTexture, targetTexture, croppedOutputMaterial);
		// Graphics.CopyTexture(sourceTexture, 0, 0, 0, sourceTexture.height - (Height + yOffset), Width, Height, targetTexture, 0, 0, 0, targetTexture.height-Height);

	}

	public void UpdateSettings(){

		Debug.Log("updating settings");

		Width = Mathf.Clamp01(float.Parse(captureHeightInput.text));
		Height = Mathf.Clamp01(float.Parse(captureHeightInput.text));

		yOffset = int.Parse(yOffsetInput.text);
		yOffset = Mathf.Max(0, Mathf.Min(sourceTexture.height, yOffset));

		// if (scaleCroppedPreview.isOn){
		// 	float scalePropX = (float)Width / (float)targetTexture.width;
		// 	float scalePropY = (float)Height / (float)targetTexture.height;
		// 	croppedOutputMaterial.SetTextureScale("_MainTex", new Vector2(scalePropX, scalePropY));
		// 	croppedOutputMaterial.SetTextureOffset("_MainTex", new Vector2(0.0f, 1.0f - scalePropY));
		// } else {
		// 	croppedOutputMaterial.SetTextureScale("_MainTex", Vector2.one);
		// 	croppedOutputMaterial.SetTextureOffset("_MainTex", Vector2.zero);
		// }

		syphonClient.appName = appNameInput.text;

	}
}
