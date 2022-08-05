package validation

import (
	"net/url"
	"time"
)

const (
	rfc3339WithoutZone = "2006-01-02T15:04:05"
)

func IsDataUri(str string) bool {
	return rxDataUri.MatchString(str)
}

func IsEmail(str string) bool {
	return rxEmail.MatchString(str)
}

func IsEthAddress(str string) bool {
	return rxEthAddress.MatchString(str)
}

func IsHexColor(str string) bool {
	return rxHexColor.MatchString(str)
}

func IsSlug(str string) bool {
	return rxSlug.MatchString(str)
}

func IsUuidV4(str string) bool {
	return rxUuidV4.MatchString(str)
}

func IsTime(str string, format string) bool {
	_, err := time.Parse(format, str)
	return err == nil
}

func IsTimeRFC3339(str string) bool {
	return IsTime(str, time.RFC3339) || IsTime(str, rfc3339WithoutZone)
}

func IsSecureUrl(str string) bool {
	parsed, err := url.ParseRequestURI(str)

	if err != nil {
		return false
	}

	if parsed.Scheme != "https" {
		return false
	}

	return true
}

func IsStringInOptions(str string, options []string) bool {
	for _, option := range options {
		if str == option {
			return true
		}
	}

	return false
}
