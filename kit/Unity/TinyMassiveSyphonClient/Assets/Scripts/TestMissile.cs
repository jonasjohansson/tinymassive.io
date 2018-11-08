using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TestMissile : MonoBehaviour {

	public float speed = 0.1f;
	public float lifetime = 5.0f;

	// Use this for initialization
	IEnumerator Start () {
		yield return new WaitForSeconds(lifetime);
		Destroy(this.gameObject);
	}
	
	// Update is called once per frame
	void Update () {
		transform.localPosition += Vector3.up * speed * Time.deltaTime;
	}
}
