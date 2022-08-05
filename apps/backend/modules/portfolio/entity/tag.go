package entity

import (
	"backend/modules/common"
	"backend/modules/portfolio/vo"
)

type Tag struct {
	Id        vo.Id        `json:"id"`
	Rev       string       `json:"rev"`
	CreatedAt vo.Timestamp `json:"createdAt"`
	UpdatedAt vo.Timestamp `json:"updatedAt"`
	Slug      vo.Slug      `json:"slug"`
	//
	Type  string `json:"type"`
	Title string `json:"title"`
	Count uint   `json:"count"`
}

func (tag Tag) Validate() error {
	validationError := common.ApiError{
		Op:            "Tag.Validate",
		Code:          common.EInvalid,
		InvalidFields: []common.InvalidField{},
	}

	// Id
	if err := tag.Id.Validate(true, "id"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	// Rev
	if tag.Rev == "" {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "rev", Reason: "is not a valid revision id", Value: tag.Type})
	}

	// CreatedAt
	if err := tag.CreatedAt.Validate(true, "createdAt"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	// UpdatedAt
	if err := tag.UpdatedAt.Validate(true, "updatedAt"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	// Type
	if tag.Type != "tag" {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "type", Reason: "is not a valid type", Value: tag.Type})
	}

	// Title
	if tag.Title == "" {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "title", Reason: "is missing"})
	}

	// Slug
	if err := tag.Slug.Validate(true, "slug"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	if len(validationError.InvalidFields) > 0 {
		return validationError
	}

	return nil
}

func (tag Tag) IsSameAs(otherTag Tag) bool {
	return tag.Id.Equals(string(otherTag.Id))
}

func (tag Tag) IsSameRevision(otherTag Tag) bool {
	return tag.Rev == otherTag.Rev
}

/* func NewTag(id string, rev string, title string, slug string) (Tag, error) {
	op := "Tag.New"
	tag := Tag{}
	validationError := common.ApiError{}

	if id == "" {
		fieldErr := common.InvalidField{
			FieldName: "id",
			Reason:    "is missing",
		}
		validationError.AppendInvalidField(fieldErr)
	}

	validationError.AppendInvalidParams(
		tag.initId(data),
		tag.initTitle(data),
		tag.initSlug(data),
	)

	// TODO: validate here?

	if len(errorList) > 0 {
		message := errorList.CombineMessages()

		return tag, common.Error{
			Op:      op,
			Code:    common.EInvalid,
			Message: message,
		}
	}

	return tag, nil
} */

/* func (t *Tag) initId(data map[string]string) error {
	id, err := valueObject.NewId(data["id"])
	if err != nil {
		return common.Error{
			Op:    "Tag.initId",
			Code:  common.EInvalid,
			Inner: err,
		}
	}

	t.Id = id
	return nil
}

func (t *Tag) initTitle(data map[string]string) error {
	title, exists := data["title"]
	if !exists || title == "" {
		return common.Error{
			Op:      "Tag.initTitle",
			Message: "'title' is missing.",
			Code:    common.EInvalid,
		}
	}

	t.Title = title
	return nil
}

func (t *Tag) initSlug(data map[string]string) error {
	slug, err := valueObject.NewSlug(data["slug"])
	if err != nil {
		return common.Error{
			Op:    "Tag.initSlug",
			Code:  common.EInvalid,
			Inner: err,
		}
	}

	t.Slug = slug
	return nil
}

func (tag *Tag) IsValid() (bool, error) {
	op := "Tag.IsValid"
	errorMessages := []string{}

	if tag.Id.String() == "" {
		errorMessages = append(errorMessages, "Id is missing.")
	}

	if tag.Title == "" {
		errorMessages = append(errorMessages, "Title is missing.")
	}

	if tag.Slug.String() == "" {
		errorMessages = append(errorMessages, "Slug is missing.")
	}

	if len(errorMessages) > 0 {
		return false, common.Error{
			Op:      op,
			Code:    common.EInvalid,
			Message: strings.Join(errorMessages, "; "),
		}
	}

	return true, nil
}

func (t Tag) Equals(t2 Tag) bool {
	if !t.Id.EqualTo(t2.Id) {
		return false
	}

	if t.Title != t2.Title {
		return false
	}

	if t.Slug != t2.Slug {
		return false
	}

	return true
}

func (t Tag) IsSameAs(t2 Tag) bool {
	return t.Id.EqualTo(t2.Id)
} */

/*
DTO
*/

type TagDTO struct {
	id    string
	title string
	slug  string
}
