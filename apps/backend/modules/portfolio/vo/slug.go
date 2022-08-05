package vo

import (
	"backend/modules/common"
	"backend/utils/validation"
)

type Slug string

func (slug Slug) Validate(isRequired bool, fieldName string) error {
	op := "Slug.Validate"

	isMissing := isRequired && slug == ""
	isInvalid := !validation.IsSlug(string(slug))

	if isMissing || isInvalid {
		return common.ApiError{
			Op:   op,
			Code: common.EInvalid,
			InvalidFields: []common.InvalidField{
				{
					FieldName: fieldName,
					Reason:    "is not a valid slug",
					Value:     slug,
				},
			},
		}
	}

	return nil
}
