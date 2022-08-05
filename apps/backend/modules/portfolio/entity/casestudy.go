package entity

import (
	"backend/modules/common"
	"backend/modules/portfolio/vo"
	"fmt"
)

type Casestudy struct {
	Id        vo.Id        `json:"id"`
	Rev       string       `json:"rev"`
	CreatedAt vo.Timestamp `json:"createdAt"`
	UpdatedAt vo.Timestamp `json:"updatedAt"`
	Type      string       `json:"type"`
	//
	Title          string                `json:"title"`
	Slug           vo.Slug               `json:"slug"`
	Tags           []Tag                 `json:"tags"`
	PrimaryMedia   vo.MediaAsset         `json:"primaryMedia"`
	ProjectDetails []vo.ProjectDetail    `json:"projectDetails"`
	Summary        vo.PortableTextSimple `json:"summary"`
	Body           interface{}           `json:"body"`
	Author         Author                `json:"author"`
	Seo            interface{}           `json:"seo"`
}

func (casestudy *Casestudy) Validate() error {
	op := "Casestudy.Validate"

	validationError := common.ApiError{
		Op:   op,
		Code: common.EInvalid,
	}

	// Id
	if err := casestudy.Id.Validate(true, "id"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	// Rev
	if casestudy.Rev == "" {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "rev", Reason: "is missing"})
	}

	// CreatedAt
	if err := casestudy.CreatedAt.Validate(true, "createdAt"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	// UpdatedAt
	if err := casestudy.UpdatedAt.Validate(true, "updatedAt"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	// Type
	if casestudy.Type != "casestudy" {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "type", Reason: "is not a valid type", Value: casestudy.Type})
	}

	// Slug
	if err := casestudy.Slug.Validate(true, "slug"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	// Tags
	if len(casestudy.Tags) == 0 {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "tags", Reason: "are missing"})
	} else {
		for idx, tag := range casestudy.Tags {
			if err := tag.Validate(); err != nil {
				validationError.AppendInvalidFieldsFromError(err, "tags", fmt.Sprint(idx))
			}
		}
	}

	// PrimaryMedia
	if err := casestudy.PrimaryMedia.Validate(true, "primaryMedia"); err != nil {
		validationError.AppendInvalidFieldsFromError(err, "primaryMedia")
	}

	// ProjectDetails
	if len(casestudy.ProjectDetails) == 0 {
		validationError.AppendInvalidField(common.InvalidField{FieldName: "projectDetails", Reason: "are missing"})
	} else {
		for idx, detail := range casestudy.ProjectDetails {
			if err := detail.Validate(true, "projectDetail"); err != nil {
				validationError.AppendInvalidFieldsFromError(err, "projectDetails", fmt.Sprint(idx))
			}
		}
	}

	// Summary
	if err := casestudy.Summary.Validate(true, "summary"); err != nil {
		validationError.AppendInvalidFieldsFromError(err)
	}

	// Body

	// Author
	if err := casestudy.Author.Validate(); err != nil {
		validationError.AppendInvalidFieldsFromError(err, "author")
	}

	// SEO

	if len(validationError.InvalidFields) > 0 {
		return validationError
	}

	return nil
}

/*
TODO:

- Casestudy validation
- Seo

*/
