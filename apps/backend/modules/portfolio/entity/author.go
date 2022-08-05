package entity

import (
	"backend/modules/common"
	"backend/modules/portfolio/vo"
)

type Author struct {
	Id        vo.Id        `json:"id"`
	Rev       string       `json:"rev"`
	CreatedAt vo.Timestamp `json:"createdAt"`
	UpdatedAt vo.Timestamp `json:"updatedAt"`
	Type      string       `json:"type"`
	Slug      vo.Slug      `json:"slug"`
	//
	Name           string        `json:"name"`
	Occupation     string        `json:"occupation,omitempty"`
	ProfileImage   vo.ImageAsset `json:"profileImage"`
	PrimaryWebsite vo.Website    `json:"primaryWebsite"`
	SocialHandles  interface{}   `json:"socialHandles"`
	Seo            interface{}   `json:"seo"`
	Blurb          string        `json:"blurb"`
}

func (author Author) Validate() error {
	validationError := common.ApiError{
		Op:            "Author.Validate",
		Code:          common.EInvalid,
		InvalidFields: []common.InvalidField{},
	}

	// Id
	if err := author.Id.Validate(true, "id"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	// Rev
	if author.Rev == "" {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "rev", Reason: "is not a valid revision id", Value: author.Type})
	}

	// CreatedAt
	if err := author.CreatedAt.Validate(true, "createdAt"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	// UpdatedAt
	if err := author.UpdatedAt.Validate(true, "updatedAt"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	// Type
	if author.Type != "author" {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "type", Reason: "is not a valid type", Value: author.Type})
	}

	// Slug
	if err := author.Slug.Validate(true, "slug"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	////////////////////////////

	// Name
	if author.Name == "" {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "name", Reason: "is not a valid name", Value: author.Name})
	}

	// Occupation
	// - skip

	// ProfileImage
	if err := author.ProfileImage.Validate(true, "primaryImage"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	// PrimaryWebsite
	if err := author.PrimaryWebsite.Validate(true, "primaryWebsite"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	// SocialHandles

	// Seo

	// Blurb
	if author.Blurb == "" {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "blurb", Reason: "is not a valid blurb", Value: author.Blurb})
	}

	if len(validationError.InvalidFields) > 0 {
		return validationError
	}
	return nil
}
