package vo

import (
	"backend/modules/common"
	"backend/utils/validation"
)

type Timestamp string

func (timestamp Timestamp) Validate(isRequired bool, fieldName string) error {
	op := "Timestamp.Validate"

	isMissing := isRequired && timestamp == ""
	isInvalid := !validation.IsTimeRFC3339(string(timestamp))

	if isMissing || isInvalid {
		return common.ApiError{
			Op:   op,
			Code: common.EInvalid,
			InvalidFields: []common.InvalidField{
				{
					FieldName: fieldName,
					Reason:    "is not a valid timestamp",
					Value:     timestamp,
				},
			},
		}
	}

	return nil
}
