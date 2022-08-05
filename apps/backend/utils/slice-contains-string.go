package utils

func SliceContainsString(slice []string, target string) bool {
	for _, current := range slice {
		if current == target {
			return true
		}
	}

	return false
}
