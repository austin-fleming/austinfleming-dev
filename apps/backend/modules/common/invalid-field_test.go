package common

import (
	"fmt"
	"testing"
)

func TestInvalidField(test *testing.T) {
	testCases := []struct {
		arg  InvalidField
		want string
	}{
		{
			InvalidField{
				FieldName: "testField",
				Path:      "",
				Reason:    "is missing",
			},
			`{FieldName:testField Path: Reason:is missing}`,
		},
	}

	for _, tc := range testCases {
		got := fmt.Sprintf("%+v", tc.arg)
		if tc.want != got {
			test.Errorf("Expected:\n%s\nGot:\n%s", tc.want, got)
		}
	}
}

func TestPrependPaths(test *testing.T) {
	testCases := []struct {
		arg   InvalidField
		paths []string
		want  string
	}{
		{
			arg: InvalidField{
				FieldName: "test1",
			},
			want: "",
		},
		{
			arg: InvalidField{
				FieldName: "test2",
			},
			paths: []string{"path1", "path2"},
			want:  "path1.path2",
		},
		{
			arg: InvalidField{
				FieldName: "test2",
				Path:      "basePath",
			},
			paths: []string{"path1", "path2"},
			want:  "path1.path2.basePath",
		},
	}

	for _, tc := range testCases {
		tcClone := tc.arg
		tcClone.PrependPath(tc.paths...)
		got := tcClone.Path

		if tc.want != got {
			test.Errorf("Expected:\n%s\nGot:\n%s", tc.want, got)
		}
	}
}

/* func TestAddPath(test *testing.T) {
	path1 := "parent1"
	path2 := "parent2"

	testCases := []struct {
		arg FieldError
		parent []string
		want string
	}{
		{
			arg: FieldError{
				FieldName: "testField",
				Path: "",
				Reason: "is missing",
			},
			parent: []string{},
			want: `{"fieldName":"testField","path":"","reason":"is missing"}`,
		},
		{
			arg: FieldError{
				FieldName: "testField",
				Path: "",
				Reason: "is missing",
			},
			parent: []string{"parent1"},
			want: `{"fieldName":"testField","path":"","reason":"is missing"}`,
		},
		{
			arg: FieldError{
				FieldName: "testField",
				Path: "parentField",
				Reason: "is missing",
			},
			parent: []string{"parent1", "parent2"},
			want: `{"fieldName":"testField","path":"parentField","reason":"is missing"}`,
		},
	}

	for _, tc := range testCases {
		got := tc.arg.String()
		if tc.want
	}
} */
