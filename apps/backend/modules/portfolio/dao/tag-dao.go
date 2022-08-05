package dao

import (
	"backend/modules/common"
	"backend/modules/portfolio/entity"
	"backend/modules/portfolio/vo"
)

type TagDAO struct {
	Id        string `json:"_id"`
	Rev       string `json:"_rev"`
	CreatedAt string `json:"_createdAt"`
	UpdatedAt string `json:"_updatedAt"`
	Type      string `json:"_type"`
	Title     string `json:"title"`
	Count     uint   `json:"count"`
	Slug      struct {
		Current string `json:"current"`
	} `json:"slug"`
}

func (dao *TagDAO) ToEntity() (entity.Tag, error) {
	op := "TagDAO.ToEntity"

	tag := entity.Tag{
		Id:        vo.Id(dao.Id),
		Rev:       dao.Rev,
		CreatedAt: vo.Timestamp(dao.CreatedAt),
		UpdatedAt: vo.Timestamp(dao.UpdatedAt),
		Type:      dao.Type,
		Title:     dao.Title,
		Count:     dao.Count,
		Slug:      vo.Slug(dao.Slug.Current),
	}

	if err := tag.Validate(); err != nil {
		return tag, common.ApiError{
			Op:    op,
			Code:  common.EConflict,
			Inner: err,
		}
	}

	return tag, nil
}
