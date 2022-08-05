package vo

import (
	"backend/modules/common"
	"backend/utils/validation"
)

type Website string

func (website Website) Validate(isRequired bool, fieldName string) error {
	op := "Website.Validate"

	isMissing := isRequired && website == ""
	isInvalid := !validation.IsSecureUrl(string(website))

	if isMissing || isInvalid {
		return common.ApiError{
			Op:   op,
			Code: common.EInvalid,
			InvalidFields: []common.InvalidField{
				{
					FieldName: fieldName,
					Reason:    "is not a valid url starting with 'https'",
					Value:     website,
				},
			},
		}
	}

	return nil
}
