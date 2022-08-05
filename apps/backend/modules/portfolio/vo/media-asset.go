package vo

import (
	"backend/modules/common"
	"backend/utils/validation"
)

type MediaAsset struct {
	MediaType string     `json:"mediaType"`
	Image     ImageAsset `json:"image"`
	Video     VideoAsset `json:"video"`
}

func (ma *MediaAsset) Validate(isRequired bool, fieldName string) error {
	op := "MediaAsset.Validate"

	// TODO: should still validate field validity
	if !isRequired {
		return nil
	}

	validationError := common.ApiError{}

	if !validation.IsStringInOptions(ma.MediaType, []string{"video", "image"}) {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "mediaType", Reason: "is not a valid type", Value: ma.MediaType})
	}

	isImageMedia := ma.MediaType == "image"
	if err := ma.Image.Validate(isImageMedia, "image"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	isVideoMedia := ma.MediaType == "video"
	if err := ma.Video.Validate(isVideoMedia, "video"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	if len(validationError.InvalidFields) > 0 {
		errorWithPath := common.ApiError{
			Op:   op,
			Code: common.EInvalid,
		}
		errorWithPath.AppendInvalidFieldsFromError(validationError, fieldName)
		return errorWithPath
	}

	return nil
}
