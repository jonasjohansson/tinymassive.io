using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TestSceneControls : MonoBehaviour {
 

	public GameObject missilePrefab;

	public float moveIncrement;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKeyDown(KeyCode.W)){
			transform.localPosition += Vector3.up * moveIncrement;
		}

		if (Input.GetKeyDown(KeyCode.S)){
			transform.localPosition += Vector3.down * moveIncrement;
		}

		if (Input.GetKeyDown(KeyCode.A)){
			transform.localPosition += Vector3.left * moveIncrement;
		}

		if (Input.GetKeyDown(KeyCode.D)){
			transform.localPosition += Vector3.right * moveIncrement;
		}

		if (Input.GetKeyDown(KeyCode.Q)){
			var missile = GameObject.Instantiate(missilePrefab, new Vector3(transform.position.x, transform.position.y, 1.0f), Quaternion.identity, transform.parent);
			
		}
	}
}
