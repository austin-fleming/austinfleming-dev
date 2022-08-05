package vo

import (
	"backend/modules/common"
)

type PortableTextSimple []map[string]interface{}

func (pt *PortableTextSimple) Validate(isRequired bool, fieldName string) error {
	op := "PortableTextSimple.Validate"

	// TODO: needs to actually check through graph
	isMissing := len(*pt) == 0 && isRequired
	isValid := pt == nil

	if isMissing || isValid {
		return common.ApiError{
			Op:   op,
			Code: common.EInvalid,
			InvalidFields: []common.InvalidField{
				{
					FieldName: fieldName,
					Reason:    "is not a valid timestamp",
					Value:     pt,
				},
			},
		}
	}

	return nil
}
