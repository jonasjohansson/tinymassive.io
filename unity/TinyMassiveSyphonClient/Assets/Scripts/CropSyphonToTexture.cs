using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Events;
using TMPro;

[ExecuteInEditMode]
public class CropSyphonToTexture : MonoBehaviour {

	public TMP_InputField yOffsetInput;
	public TMP_InputField captureWidthInput;
	public TMP_InputField captureHeightInput;
	public TMP_InputField appNameInput;

	public RenderTexture sourceTexture;
	public RenderTexture targetTexture;

	public int Width = 77;
	public int Height = 13;

	public int yOffset = 0;

	private Material material;
	public Shader cropShader;

	// Use this for initialization
	void Start () {
		material = new Material(cropShader);

		UpdateSettings();
	}
	
	void LateUpdate () {

		material.SetInt("_Width", Width);
		material.SetInt("_Height", Height);
		material.SetInt("_YOffset", yOffset);

		Graphics.Blit(sourceTexture, targetTexture, material);
	}

	public void UpdateSettings(){

		Width = int.Parse(captureWidthInput.text);
		Height = int.Parse(captureHeightInput.text);

		yOffset = int.Parse(yOffsetInput.text);

		Width = Mathf.Min(1, Width);
		Height = Mathf.Min(1, Height);
		yOffset = Mathf.Min(Height, yOffset);



	}
}
