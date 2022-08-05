package vo

import (
	"backend/modules/common"
	"backend/utils/validation"
)

type ImageAsset struct {
	Alt            string             `json:"alt"`
	Caption        PortableTextSimple `json:"caption,omitempty"`
	Attribution    string             `json:"attribution,omitempty"`
	Source         Website            `json:"source"`
	Provider       string             `json:"provider"`
	Lqip           string             `json:"lqip"`
	BlurHash       string             `json:"blurHash"`
	Extension      string             `json:"extension"`
	Sha1Hash       string             `json:"sha1Hash"`
	MaxHeight      uint               `json:"maxHeight"`
	MaxWidth       uint               `json:"maxWidth"`
	MaxAspectRatio float32            `json:"maxAspectRatio"`
	MaxBytes       uint               `json:"maxBytes"`
}

func (img *ImageAsset) Validate(isRequired bool, fieldName string) error {
	op := "Image.Validate"

	// TODO: should still validate field validity
	if !isRequired {
		return nil
	}

	validationError := common.ApiError{}

	if img.Alt == "" {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "alt", Reason: "is missing"})
	}

	if err := img.Caption.Validate(false, "caption"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	/* if img.Attribution == "" {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "attribution", Reason: "is missing"})
	} */

	if err := img.Source.Validate(true, "source"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	if !validation.IsStringInOptions(img.Provider, []string{"SANITY", "MUX"}) {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "provider", Reason: "is not a valid option", Value: img.Provider})
	}

	if !validation.IsDataUri(img.Lqip) {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "lqip", Reason: "is not a valid data uri", Value: img.Lqip})
	}

	if img.BlurHash == "" {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "blurHash", Reason: "is missing"})
	}

	if img.Extension == "" {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "extension", Reason: "is missing"})
	}

	if img.Sha1Hash == "" {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "sha1Hash", Reason: "is missing"})
	}

	if img.MaxHeight == 0 {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "maxHeight", Reason: "is missing"})
	}

	if img.MaxWidth == 0 {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "maxWidth", Reason: "is missing"})
	}

	if img.MaxAspectRatio == 0 {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "maxAspectRatio", Reason: "is missing"})
	}

	if img.MaxBytes == 0 {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "maxBytes", Reason: "is missing"})
	}

	if len(validationError.InvalidFields) > 0 {
		errorWithPath := common.ApiError{
			Op:   op,
			Code: common.EInvalid,
		}
		// use fieldName as path
		errorWithPath.AppendInvalidFieldsFromError(validationError, fieldName)

		return errorWithPath
	}

	return nil
}
