package main

import "fmt"

func main() {
	a := make(map[string]string)
	fmt.Println("1")
	delete(a, "bb")
	fmt.Println(a["1"])
}