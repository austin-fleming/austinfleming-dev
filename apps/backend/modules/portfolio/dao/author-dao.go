package dao

import (
	"backend/modules/common"
	"backend/modules/portfolio/entity"
	"backend/modules/portfolio/vo"
)

type AuthorDAO struct {
	Id        string `json:"_id"`
	Rev       string `json:"_rev"`
	CreatedAt string `json:"_createdAt"`
	UpdatedAt string `json:"_updatedAt"`
	Type      string `json:"_type"`
	Slug      struct {
		Current string
	}
	//
	Name           string
	Occupation     string
	ProfileImage   ImageAssetDAO
	PrimaryWebsite string
	SocialHandles  []struct {
		Platform string
		Handle   string
	}
	Seo   interface{}
	Blurb string
}

func (dao *AuthorDAO) ToEntity() (entity.Author, error) {
	op := "AuthorDAO.ToEntity"

	profileImage, _ := dao.ProfileImage.ToVO()

	author := entity.Author{
		Id:             vo.Id(dao.Id),
		Rev:            dao.Rev,
		CreatedAt:      vo.Timestamp(dao.CreatedAt),
		UpdatedAt:      vo.Timestamp(dao.UpdatedAt),
		Type:           dao.Type,
		Slug:           vo.Slug(dao.Slug.Current),
		Name:           dao.Name,
		Occupation:     dao.Occupation,
		ProfileImage:   profileImage,
		PrimaryWebsite: vo.Website(dao.PrimaryWebsite),
		SocialHandles:  dao.SocialHandles,
		Seo:            dao.Seo,
		Blurb:          dao.Blurb,
	}

	if err := author.Validate(); err != nil {
		return entity.Author{}, common.ApiError{
			Op:    op,
			Code:  common.EConflict,
			Inner: err,
		}
	}

	return author, nil
}
