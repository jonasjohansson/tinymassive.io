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

	public int Width = 77;
	public int Height = 13;

	[Range(0,1024)]
	public int yOffset = 0;

	public Material croppedOutputMaterial;
	public Shader cropShader;
	public Klak.Syphon.SyphonClient syphonClient;

	public float debugNSourceTexX = 0.0f;
	public float debugNSourceTexY = 0.0f;

	public float debugNSourceTexWidth = 0.0f;
	public float debugNSourceTexHeight = 0.0f;

	
	// Use this for initialization
	IEnumerator Start () {
		croppedOutputMaterial = new Material(cropShader);
		yield return new WaitForSeconds(1.0f);
		UpdateSettings();
	}
	
	void LateUpdate () {

		croppedOutputMaterial.SetInt("sourceTexSizeWidth", sourceTexture.width);
		croppedOutputMaterial.SetInt("sourceTexSizeHeight", sourceTexture.height);

		croppedOutputMaterial.SetInt("destTexSizeWidth", targetTexture.width);
		croppedOutputMaterial.SetInt("destTexSizeHeight", targetTexture.height);

		croppedOutputMaterial.SetFloat("nSourceTexX", 0.0f);
		debugNSourceTexY = ((float)yOffset / sourceTexture.height);
		croppedOutputMaterial.SetFloat("nSourceTexY", debugNSourceTexY);

		debugNSourceTexWidth = (float)Width / sourceTexture.width;
		croppedOutputMaterial.SetFloat("nSourceTexWidth", debugNSourceTexWidth);
		debugNSourceTexHeight = (float)Height / sourceTexture.height;
		croppedOutputMaterial.SetFloat("nSourceTexHeight", debugNSourceTexHeight);


		Graphics.Blit(sourceTexture, targetTexture, croppedOutputMaterial);
		// Graphics.CopyTexture(sourceTexture, 0, 0, 0, sourceTexture.height - (Height + yOffset), Width, Height, targetTexture, 0, 0, 0, targetTexture.height-Height);

	}

	public void UpdateSettings(){

		Debug.Log("updating settings");

		Width = int.Parse(captureWidthInput.text);
		Height = int.Parse(captureHeightInput.text);

		yOffset = int.Parse(yOffsetInput.text);

		Width = Mathf.Min(sourceTexture.width, Width);
		Height = Mathf.Min(sourceTexture.height, Height);
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
