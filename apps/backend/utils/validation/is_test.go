package validation

import (
	"testing"
	"time"
)

func TestIsDataUri(test *testing.T) {
	cases := []struct {
		arg  string
		want bool
	}{
		{"data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAUGBwMI/8QAJRAAAgEEAQMFAQEAAAAAAAAAAQIDAAQFEQYSITEHE0FRYSIj/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgT/xAAaEQEBAAIDAAAAAAAAAAAAAAAAAQIyESEx/9oADAMBAAIRAxEAPwDrxPF4bjduqW8IfMDcEzDuYpgf5YH4BqGuuVXedyOcwt1K2LnCtJGqnXVKBogn9qP4xj83ZX3ILWErLAsPuv7+w7gHYkQeSaukMWGtHhzdtG2TybKty0pXZZNaZSPAIqu9JPXn2+x17Z3BivLeWKUjq6XGiQfmlaxz3NXsmcV5sLb3CtCjRSaLExnetkUpS0bIiOWchyT4nj+QW4MV4bT2mlj7F18aP3Vq9JMtcx+n+Zb/ADZrWXUZZdkhh3B+xSlHLU8dmS3fKMwJ3jS8dY4yVRR4UbPYflKUp8A//9k=", true},
		{"data:text/plain;base64,Vml2YW11cyBmZXJtZW50dW0gc2VtcGVyIHBvcnRhLg==", true},
		{"data:image/jpeg;key=value;base64,UEsDBBQAAAAI", true},
		{"data:,UEsDBBQAAAAI", true},
		{"image/gif;base64,U3VzcGVuZGlzc2UgbGVjdHVzIGxlbw==", false},
		// {"data:text,:;base85,U3VzcGVuZGlzc2UgbGVjdHVzIGxlbw==", false}, TODO: should be false
		// {"data:image/png;base64,12345", false}, TODO: should be false
		{"hello", false},
		{"", false},
	}

	for _, tc := range cases {
		got := IsDataUri(tc.arg)
		if tc.want != got {
			test.Errorf("Expected '%t' for '%s' but got '%t'", tc.want, tc.arg, got)
		}
	}
}

func TestIsEmail(test *testing.T) {
	cases := []struct {
		arg  string
		want bool
	}{
		{"name@example.com", true},
		{"name@.com", false},
		{"name@example", false},
		{"nameexample.com", false},
		{"", false},
	}

	for _, tc := range cases {
		got := IsEmail(tc.arg)
		if tc.want != got {
			test.Errorf("Expected '%t', but got '%t'", tc.want, got)
		}
	}
}

func TestEthAddress(test *testing.T) {
	cases := []struct {
		arg  string
		want bool
	}{
		{"0x52908400098527886E0F7030069857D2E4169EE7", true},
		{"0xde709f2102306220921060314715629080e2fb77", true},
		{"0x02F9AE5f22EA3fA88F05780B30385bECFacbf130", true},
		{"02F9AE5f22EA3fA88F05780B30385bECFacbf130", false},    // no prefix
		{"0xde709f2102306220921060314715629080e2fb7", false},   // too short
		{"0xde709f2102306220921060314715629080e2fb777", false}, // too long
		{"0xde709f2102306220921060314715629080e2fb7g", false},  // non-hex character
		{"", false},
	}

	for _, tc := range cases {
		got := IsEthAddress(tc.arg)
		if tc.want != got {
			test.Errorf("Expected '%t' for '%s', but got '%t'", tc.want, tc.arg, got)
		}
	}
}

func TestHexColor(test *testing.T) {
	cases := []struct {
		arg  string
		want bool
	}{
		{"#ffffff", true},
		{"#FFFFFF", true},
		{"#00FF00", true},
		{"00FF00", false},   // no prefix
		{"#00FF0", false},   // too short
		{"#00FF000", false}, // too long
		{"#00FF0g", false},  // non-hex character
		{"", false},
	}

	for _, tc := range cases {
		got := IsHexColor(tc.arg)
		if tc.want != got {
			test.Errorf("Expected '%t' for '%s', but got '%t'", tc.want, tc.arg, got)
		}
	}
}

func TestIsSlug(test *testing.T) {
	cases := []struct {
		arg  string
		want bool
	}{
		{"hello-world", true},
		{"hello_world", true},
		{"hello", true},
		{"hello92-world", true},
		{"-hello", false},      // '-' prefix
		{"_hello", false},      // '_' prefix
		{"hello-", false},      // '-' suffix
		{"hello_", false},      // '_' suffix
		{"hello/world", false}, // subroute
		{"", false},
	}

	for _, tc := range cases {
		got := IsSlug(tc.arg)
		if tc.want != got {
			test.Errorf("Expected '%t' for '%s', but got '%t'", tc.want, tc.arg, got)
		}
	}
}

func TestUuidV4(test *testing.T) {
	cases := []struct {
		arg  string
		want bool
	}{
		{"57b73598-8764-4ad0-a76a-679bb6640eb1", true},
		{"625e63f3-58f5-40b7-83a1-a72ad31acffb", true},
		{"xxxa987fbc9-4bed-3078-cf07-9141ba07c9f3", false},
		{"a987fbc9-4bed-5078-af07-9141ba07c9f3", false},
		{"934859", false},
		{"", false},
	}

	for _, tc := range cases {
		got := IsUuidV4(tc.arg)
		if tc.want != got {
			test.Errorf("Expected '%t' for '%s', but got '%t'", tc.want, tc.arg, got)
		}
	}
}

func TestIsTime(test *testing.T) {
	// test cases from https://github.com/asaskevich/govalidator/blob/f21760c49a8d602d863493de796926d2a5c1138d/validator_test.go
	testCases := []struct {
		time   string
		format string
		want   bool
	}{
		{"2016-12-31 11:00", time.RFC3339, false},
		{"2016-12-31 11:00:00", time.RFC3339, false},
		{"2016-12-31T11:00", time.RFC3339, false},
		{"2016-12-31T11:00:00", time.RFC3339, false},
		{"2016-12-31T11:00:00Z", time.RFC3339, true},
		{"2016-12-31T11:00:00+01:00", time.RFC3339, true},
		{"2016-12-31T11:00:00-01:00", time.RFC3339, true},
		{"2016-12-31T11:00:00.05Z", time.RFC3339, true},
		{"2016-12-31T11:00:00.05-01:00", time.RFC3339, true},
		{"2016-12-31T11:00:00.05+01:00", time.RFC3339, true},
		{"2016-12-31T11:00:00", rfc3339WithoutZone, true},
		{"2016-12-31T11:00:00Z", rfc3339WithoutZone, false},
		{"2016-12-31T11:00:00+01:00", rfc3339WithoutZone, false},
		{"2016-12-31T11:00:00-01:00", rfc3339WithoutZone, false},
		{"2016-12-31T11:00:00.05Z", rfc3339WithoutZone, false},
		{"2016-12-31T11:00:00.05-01:00", rfc3339WithoutZone, false},
		{"2016-12-31T11:00:00.05+01:00", rfc3339WithoutZone, false},
	}

	for _, tc := range testCases {
		got := IsTime(tc.time, tc.format)
		if tc.want != got {
			test.Errorf("\nExpected:\n%t\nGot:\n%t\n", tc.want, got)
		}
	}
}

func TestIsTimeRFC3339(test *testing.T) {
	// test cases from https://github.com/asaskevich/govalidator/blob/f21760c49a8d602d863493de796926d2a5c1138d/validator_test.go
	testCases := []struct {
		time string
		want bool
	}{
		{"2016-12-31 11:00", false},
		{"2016-12-31 11:00:00", false},
		{"2016-12-31T11:00", false},
		{"2016-12-31T11:00:00", true},
		{"2016-12-31T11:00:00Z", true},
		{"2016-12-31T11:00:00+01:00", true},
		{"2016-12-31T11:00:00-01:00", true},
		{"2016-12-31T11:00:00.05Z", true},
		{"2016-12-31T11:00:00.05-01:00", true},
		{"2016-12-31T11:00:00.05+01:00", true},
		{"2016-12-31T11:00:00", true},
		{"2016-12-31T11:00:00Z", true},
		{"2016-12-31T11:00:00+01:00", true},
		{"2016-12-31T11:00:00-01:00", true},
		{"2016-12-31T11:00:00.05Z", true},
		{"2016-12-31T11:00:00.05-01:00", true},
		{"2016-12-31T11:00:00.05+01:00", true},
	}

	for _, tc := range testCases {
		got := IsTimeRFC3339(tc.time)
		if tc.want != got {
			test.Errorf("\nExpected:\n%t\nGot:\n%t", tc.want, got)
		}
	}
}

func TestIsSecureUrl(test *testing.T) {
	testCases := []struct {
		arg  string
		want bool
	}{
		{
			`https://example.com`,
			true,
		},
		{
			`https://example.com/status/help?var=test`,
			true,
		},
		{
			`http://example.com`,
			false,
		},
		{
			`example.com`,
			false,
		},
	}

	for _, tc := range testCases {
		got := IsSecureUrl(tc.arg)
		if tc.want != got {
			test.Errorf("\nExpected:\n\t%t\nGot:\n\t%t", tc.want, got)
		}
	}
}
