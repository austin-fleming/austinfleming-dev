package service

import (
	"backend/modules/common"
	"backend/modules/portfolio/entity"
	"backend/modules/portfolio/repo"
	"context"
)

type CasestudyService struct {
	casestudies repo.CasestudyRepo
}

func NewCasestudyService(repo repo.CasestudyRepo) CasestudyService {
	return CasestudyService{
		casestudies: repo,
	}
}

func (service *CasestudyService) Exists(ctx context.Context, id string) (bool, error) {
	op := "CasestudyService.Exists"

	exists, err := service.casestudies.Exists(ctx, id)
	if err != nil {
		return false, common.ApiError{Op: op, Inner: err}
	}

	return exists, nil
}

func (service *CasestudyService) List(ctx context.Context) ([]entity.Casestudy, error) {
	op := "CasestudyService.List"

	authors, err := service.casestudies.List(ctx)
	if err != nil {
		return nil, common.ApiError{Op: op, Inner: err}
	}

	return authors, nil
}

func (service *CasestudyService) GetByTitle(ctx context.Context, title string) (entity.Casestudy, error) {
	op := "CasestudyService.GetByTitle"

	author, err := service.casestudies.GetByTitle(ctx, title)
	if err != nil {
		return author, common.ApiError{Op: op, Inner: err}
	}

	return author, nil
}
