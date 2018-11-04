using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Events;
using TMPro;

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

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}

	public void UpdateSettings(){

		Width = int.Parse(captureWidthInput.text);
		Height = int.Parse(captureHeightInput.text);

		yOffset = int.Parse(yOffsetInput.text);

		
	}
}
