package utils

type StringSlice []string

func (slice *StringSlice) Append(str string) {
	*slice = append(*slice, str)
}
