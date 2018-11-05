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

	public int yOffset = 0;

	public Material croppedOutputMaterial;
	public Klak.Syphon.SyphonClient syphonClient;
	
	// Use this for initialization
	IEnumerator Start () {
		
		yield return new WaitForSeconds(1.0f);
		UpdateSettings();
	}
	
	void LateUpdate () {

		Graphics.CopyTexture(sourceTexture, 0, 0, 0, sourceTexture.height - (Height + yOffset), Width, Height, targetTexture, 0, 0, 0, targetTexture.height-Height);

	}

	public void UpdateSettings(){

		Width = int.Parse(captureWidthInput.text);
		Height = int.Parse(captureHeightInput.text);

		yOffset = int.Parse(yOffsetInput.text);

		Width = Mathf.Min(Mathf.Min(targetTexture.width, sourceTexture.width), Width);
		Height = Mathf.Min(Mathf.Min(targetTexture.height, sourceTexture.height), Height);
		yOffset = Mathf.Max(0, Mathf.Min(Mathf.Min(targetTexture.height, sourceTexture.height), yOffset));

		if (scaleCroppedPreview.isOn){
			float scalePropX = (float)Width / (float)targetTexture.width;
			float scalePropY = (float)Height / (float)targetTexture.height;
			croppedOutputMaterial.SetTextureScale("_MainTex", new Vector2(scalePropX, scalePropY));
			croppedOutputMaterial.SetTextureOffset("_MainTex", new Vector2(0.0f, 1.0f - scalePropY));
		} else {
			croppedOutputMaterial.SetTextureScale("_MainTex", Vector2.one);
			croppedOutputMaterial.SetTextureOffset("_MainTex", Vector2.zero);
		}

		syphonClient.appName = appNameInput.text;

	}
}
