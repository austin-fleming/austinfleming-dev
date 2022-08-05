package vo

import (
	"backend/modules/common"
	"backend/utils/validation"
)

type Id string

func (id Id) Validate(isRequired bool, fieldName string) error {
	op := "Id.Validate"

	isMissing := isRequired && id == ""
	isInvalid := !validation.IsUuidV4(string(id))

	if isMissing || isInvalid {
		return common.ApiError{
			Op:   op,
			Code: common.EInvalid,
			InvalidFields: []common.InvalidField{
				{
					FieldName: fieldName,
					Reason:    "is not a valid ID",
					Value:     id,
				},
			},
		}
	}

	return nil
}

func (id Id) Equals(other string) bool {
	return string(id) == other
}
