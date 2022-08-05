package vo

import "backend/modules/common"

type VideoAsset struct {
	Source   Website `json:"source"`
	Provider string  `json:"provider"`
}

func (video *VideoAsset) Validate(isRequired bool, fieldName string) error {
	op := "Video.Validate"

	// TODO: should still validate field validity
	if !isRequired {
		return nil
	}

	validationErr := common.ApiError{}

	if err := video.Source.Validate(isRequired, "source"); err != nil {
		validationErr.AppendInvalidFieldsFromError(err)
	}

	if len(validationErr.InvalidFields) > 0 {
		errorWithPath := common.ApiError{
			Op:   op,
			Code: common.EInvalid,
		}

		errorWithPath.AppendInvalidFieldsFromError(validationErr, fieldName)

		return errorWithPath
	}

	return nil
}
