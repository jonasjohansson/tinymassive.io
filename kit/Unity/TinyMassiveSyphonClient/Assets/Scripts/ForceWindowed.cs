using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ForceWindowed : MonoBehaviour {

	public int width = 1024;
	public int height = 1024;


	// Use this for initialization
	void Start () {
		Screen.fullScreen = false;
		Screen.SetResolution(width, height, false, 30);
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
