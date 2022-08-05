package common

import (
	"errors"
	"fmt"
	"testing"
)

func TestApiError(test *testing.T) {
	testCase := ApiError{
		Code:   404,
		Detail: "A detail",
		InvalidFields: []InvalidField{
			{
				FieldName: "testField",
				Reason:    "reason",
			},
		},
		Op:       "TestPkg.TestOp",
		Internal: "internal message",
		Inner:    errors.New("Inner error."),
	}

	want := `{"status":404,"detail":"A detail","invalidFields":[{"fieldName":"testField","path":"","reason":"reason"}],"op":"TestPkg.TestOp","internal":"internal message","inner":{}}`
	got := ErrorToString(testCase)

	if want != got {
		test.Errorf("Wanted:\n'%s'\nGot:\n'%s'", want, got)
	}
}

func TestErrorCode(test *testing.T) {
	apiErrorCases := []struct {
		arg  ApiError
		want int
	}{
		{
			arg:  ApiError{Code: 404},
			want: 404,
		},
		{
			arg:  ApiError{Detail: "test"},
			want: 500,
		},
		{
			arg:  ApiError{},
			want: 500,
		},
	}

	for _, tc := range apiErrorCases {
		got := ErrorCode(tc.arg)
		if tc.want != got {
			test.Errorf("Wanted:\n'%d'\nGot:\n'%d'", tc.want, got)
		}
	}
}

func TestErrorDetail(test *testing.T) {
	testCases := []struct {
		arg  error
		want string
	}{
		{
			arg:  errors.New("standard error"),
			want: "",
		},
		{
			arg:  ApiError{Detail: "apiError"},
			want: "apiError",
		},
		{
			arg:  ApiError{Code: 400, Detail: "apiError"},
			want: "apiError",
		},
		{
			arg:  ApiError{Code: 400},
			want: "",
		},
		{
			arg:  ApiError{Code: 400, Inner: ApiError{Detail: "inner error"}},
			want: "inner error",
		},
	}

	for _, tc := range testCases {
		got := ErrorDetail(tc.arg)
		if tc.want != got {
			test.Errorf("\nWanted:\n\t%s\nGot:\n\t%s\nFor:\n\t%#v\n", tc.want, got, tc.arg)
		}
	}
}

func TestPrepareError(test *testing.T) {
	testCases := []struct {
		arg  error
		want string
	}{
		{
			arg:  errors.New("standard error"),
			want: `{"status":500,"detail":"unexpected error","inner":{}}`,
		},
		{
			arg:  ApiError{Detail: "apiError"},
			want: `{"status":500,"detail":"unexpected error","inner":{"status":0,"detail":"apiError"}}`,
		},
		{
			arg:  ApiError{Code: 400, Detail: "apiError"},
			want: `{"status":400,"detail":"apiError"}`,
		},
		{
			arg:  ApiError{Code: 400},
			want: `{"status":400}`,
		},
		{
			arg:  ApiError{Code: 400, Inner: ApiError{Detail: "inner error"}},
			want: `{"status":400,"inner":{"status":0,"detail":"inner error"}}`,
		},
	}

	for _, tc := range testCases {

		got := fmt.Sprintf("%+v", PrepareError(tc.arg))
		if tc.want != got {
			test.Errorf("Wanted:\n\t%s\nGot:\n\t%s\nFor:\n\t%#v\n", tc.want, got, tc.arg)
		}
	}
}

func TestError(test *testing.T) {
	testCases := []struct {
		arg  error
		want string
	}{
		{
			arg:  errors.New("standard error"),
			want: `{"status":500,"detail":"unexpected error","inner":{}}`,
		},
		{
			arg:  ApiError{},
			want: `{"status":500,"detail":"unexpected error","inner":{"status":0}}`,
		},
		{
			arg: ApiError{
				Code:   404,
				Detail: "not found",
				InvalidFields: []InvalidField{
					{
						FieldName: "fieldName",
						Path:      "parent1.parent2",
						Reason:    "is missing",
					},
				},
				Op:       "Test.Test",
				Internal: "internal message",
				Inner:    errors.New("inner error"),
			},
			want: `{"status":404,"detail":"not found","invalidFields":[{"fieldName":"fieldName","path":"parent1.parent2","reason":"is missing"}],"op":"Test.Test","internal":"internal message","inner":{}}`,
		},
	}

	for _, tc := range testCases {
		got := Error(tc.arg)
		if tc.want != got {
			test.Errorf("Expected:\n%s\nGot:\n%s\n", tc.want, got)
		}
	}
}

func TestAppendInvalidField(test *testing.T) {
	testCases := []struct {
		arg      ApiError
		toAppend InvalidField
		want     string
	}{
		{
			arg: ApiError{
				Code:   400,
				Detail: "base error",
				InvalidFields: []InvalidField{
					{
						FieldName: "testField",
						Reason:    "too long",
					},
				},
			},
			toAppend: InvalidField{
				FieldName: "extraField",
				Path:      "path1",
				Reason:    "is missing",
			},
			want: `{"status":400,"detail":"base error","invalidFields":[{"fieldName":"testField","path":"","reason":"too long"},{"fieldName":"extraField","path":"path1","reason":"is missing"}]}`,
		},
	}

	for _, tc := range testCases {
		argClone := tc.arg
		argClone.AppendInvalidField(tc.toAppend)

		got := argClone.Error()

		if tc.want != got {
			test.Errorf("Expected:\n%s\nGot:\n%s", tc.want, got)
		}
	}
}

func TestAppendInvalidFieldsFromError(test *testing.T) {
	testCases := []struct {
		baseArg  ApiError
		otherArg error
		paths    []string
		want     string
	}{
		// has path, adds paths
		{
			baseArg: ApiError{
				Code:   400,
				Detail: "base error",
				InvalidFields: []InvalidField{
					{
						FieldName: "testField",
						Reason:    "too long",
					},
				},
			},
			otherArg: ApiError{
				Code: 400,
				InvalidFields: []InvalidField{
					{
						FieldName: "otherField",
						Path:      "path1",
						Reason:    "is missing",
					},
				},
			},
			paths: []string{"parent1", "parent2"},
			want:  `{"status":400,"detail":"base error","invalidFields":[{"fieldName":"testField","path":"","reason":"too long"},{"fieldName":"otherField","path":"parent1.parent2.path1","reason":"is missing"}]}`,
		},
		// no path, adds paths
		{
			baseArg: ApiError{
				Code:   400,
				Detail: "base error",
				InvalidFields: []InvalidField{
					{
						FieldName: "testField",
						Reason:    "too long",
					},
				},
			},
			otherArg: ApiError{
				Code: 400,
				InvalidFields: []InvalidField{
					{
						FieldName: "otherField",
						Reason:    "is missing",
					},
				},
			},
			paths: []string{"parent1", "parent2"},
			want:  `{"status":400,"detail":"base error","invalidFields":[{"fieldName":"testField","path":"","reason":"too long"},{"fieldName":"otherField","path":"parent1.parent2","reason":"is missing"}]}`,
		},
		// No path, doesn't add paths
		{
			baseArg: ApiError{
				Code:   400,
				Detail: "base error",
				InvalidFields: []InvalidField{
					{
						FieldName: "testField",
						Reason:    "too long",
					},
				},
			},
			otherArg: ApiError{
				Code: 400,
				InvalidFields: []InvalidField{
					{
						FieldName: "otherField",
						Reason:    "is missing",
					},
				},
			},
			want: `{"status":400,"detail":"base error","invalidFields":[{"fieldName":"testField","path":"","reason":"too long"},{"fieldName":"otherField","path":"","reason":"is missing"}]}`,
		},
	}

	for _, tc := range testCases {
		baseClone := tc.baseArg
		baseClone.AppendInvalidFieldsFromError(tc.otherArg, tc.paths...)

		got := baseClone.Error()

		if tc.want != got {
			test.Errorf("Expected:\n%s\nGot:\n%s", tc.want, got)
		}
	}
}
