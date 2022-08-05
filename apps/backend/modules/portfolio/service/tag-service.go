package service

import (
	"backend/modules/common"
	"backend/modules/portfolio/entity"
	"backend/modules/portfolio/repo"
	"context"
)

type TagService struct {
	tags repo.TagRepo
}

func NewTagService(repo repo.TagRepo) TagService {
	return TagService{
		tags: repo,
	}
}

func (service *TagService) Exists(ctx context.Context, id string) (bool, error) {
	op := "TagService.Exists"

	exists, err := service.tags.Exists(ctx, id)
	if err != nil {
		return false, common.ApiError{Op: op, Inner: err}
	}

	return exists, nil
}

func (service *TagService) List(ctx context.Context) ([]entity.Tag, error) {
	op := "TagService.List"

	tags, err := service.tags.List(ctx)
	if err != nil {
		return nil, common.ApiError{Op: op, Inner: err}
	}

	return tags, nil
}

func (service *TagService) GetByTitle(ctx context.Context, title string) (entity.Tag, error) {
	op := "TagService.GetByTitle"

	tag, err := service.tags.GetByTitle(ctx, title)
	if err != nil {
		return tag, common.ApiError{Op: op, Inner: err}
	}

	return tag, nil
}
