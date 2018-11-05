using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HarpaLampFixture : MonoBehaviour {

	public enum Facade {
		Side,
		Front
	}

	public Facade facade;

	public int x;
	public int y;


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

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
