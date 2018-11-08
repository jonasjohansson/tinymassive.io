using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[ExecuteInEditMode]
public class HarpaLampFixture : MonoBehaviour {

	public enum Facade {
		Side,
		Front
	}

	public Facade facade = Facade.Side;

	public int x;
	public int y;

	private const int FrontFacadeOffset = 38;

	private MeshRenderer meshRenderer;
	private MaterialPropertyBlock block;


	void OnValidate(){

		// try to infer x/y coords from naming
		try {
			x = int.Parse(gameObject.name.Split('_')[2]);
		} catch(System.Exception e){
			Debug.Log("Couldn't get x-coordinate for lamp " + gameObject.name);
		}

		try {
			y = int.Parse(transform.parent.gameObject.name.Split('_')[1]);
		} catch(System.Exception e){
			Debug.Log("Couldn't get y-coordinate for lamp " + gameObject.name);
		}
		
		
	}

	void Awake()
	{
		block = new MaterialPropertyBlock();
		meshRenderer = GetComponent<MeshRenderer>();
	}

	// Use this for initialization
	void Start () {
		
		
		
	}
	
	// Update is called once per frame
	void Update () {
		if (block == null){
			block = new MaterialPropertyBlock();
		}
		if (meshRenderer == null){
			meshRenderer = GetComponent<MeshRenderer>();
		}
		
		block.SetFloat("_PixelX", x + ((facade == Facade.Front) ? FrontFacadeOffset : 0));
		block.SetFloat("_PixelY", y);
		meshRenderer.SetPropertyBlock(block);

		
	}
}
