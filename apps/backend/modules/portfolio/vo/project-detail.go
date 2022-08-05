package vo

import "backend/modules/common"

type ProjectDetail struct {
	Title       string             `json:"title"`
	Description PortableTextSimple `json:"description"`
}

func (pd *ProjectDetail) Validate(isRequired bool, fieldName string) error {
	op := "ProjectDetail.Validate"

	// TODO: should still verify fields that are present
	if !isRequired {
		return nil
	}

	validationError := common.ApiError{}

	if pd.Title == "" {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "title", Reason: "is missing"})
	}

	if err := pd.Description.Validate(true, "description"); err != nil {
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
