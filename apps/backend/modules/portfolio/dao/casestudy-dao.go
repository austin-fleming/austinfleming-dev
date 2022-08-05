package dao

import (
	"backend/modules/common"
	"backend/modules/portfolio/entity"
	"backend/modules/portfolio/vo"
)

type CasestudyDAO struct {
	Id        string `json:"_id"`
	Rev       string `json:"_rev"`
	CreatedAt string `json:"_createdAt"`
	UpdatedAt string `json:"_updatedAt"`
	Type      string `json:"_type"`
	Title     string
	Slug      struct {
		Current string
	}
	Tags         []TagDAO
	PrimaryMedia struct {
		MediaType string
		Image     ImageAssetDAO
		Video     VideoAssetDAO
	}
	ProjectDetails []struct {
		Key         string `json:"_key"`
		Type        string `json:"_type"`
		Title       string
		Description []map[string]interface{}
	}
	Summary     []map[string]interface{}
	ArticleBody []map[string]interface{}
	Author      AuthorDAO
	Seo         interface{}
}

func (dao *CasestudyDAO) ToEntity() (entity.Casestudy, error) {
	op := "CasestudyDAO.ToEntity"

	tags := []entity.Tag{}
	for _, tagDao := range dao.Tags {
		// error check happens in validation at end of file.
		tagEntity, _ := tagDao.ToEntity()
		tags = append(tags, tagEntity)
	}

	primaryMediaImage, _ := dao.PrimaryMedia.Image.ToVO()
	primaryMediaVideo, _ := dao.PrimaryMedia.Video.ToVO()

	author, _ := dao.Author.ToEntity()

	projectDetails := []vo.ProjectDetail{}
	for _, detail := range dao.ProjectDetails {
		projectDetails = append(projectDetails, vo.ProjectDetail{
			Title:       detail.Title,
			Description: detail.Description,
		})
	}

	casestudy := entity.Casestudy{
		Id:        vo.Id(dao.Id),
		Rev:       dao.Rev,
		CreatedAt: vo.Timestamp(dao.CreatedAt),
		UpdatedAt: vo.Timestamp(dao.UpdatedAt),
		Type:      dao.Type,
		Title:     dao.Title,
		Slug:      vo.Slug(dao.Slug.Current),
		Tags:      tags,
		PrimaryMedia: vo.MediaAsset{
			MediaType: dao.PrimaryMedia.MediaType,
			Image:     primaryMediaImage,
			Video:     primaryMediaVideo,
		},
		ProjectDetails: projectDetails,
		Summary:        dao.Summary,
		Body:           dao.ArticleBody,
		Author:         author,
		Seo:            dao.Seo,
	}

	if err := casestudy.Validate(); err != nil {
		return entity.Casestudy{}, common.ApiError{
			Op:    op,
			Code:  common.EConflict,
			Inner: err,
		}
	}

	return casestudy, nil
}
