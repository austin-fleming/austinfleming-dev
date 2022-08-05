package service

import (
	"backend/modules/common"
	"backend/modules/portfolio/entity"
	"backend/modules/portfolio/repo"
	"context"
)

type AuthorService struct {
	authors repo.AuthorRepo
}

func NewAuthorService(repo repo.AuthorRepo) AuthorService {
	return AuthorService{
		authors: repo,
	}
}

func (service *AuthorService) Exists(ctx context.Context, id string) (bool, error) {
	op := "AuthorService.Exists"

	exists, err := service.authors.Exists(ctx, id)
	if err != nil {
		return false, common.ApiError{Op: op, Inner: err}
	}

	return exists, nil
}

func (service *AuthorService) List(ctx context.Context) ([]entity.Author, error) {
	op := "AuthorService.List"

	authors, err := service.authors.List(ctx)
	if err != nil {
		return nil, common.ApiError{Op: op, Inner: err}
	}

	return authors, nil
}

func (service *AuthorService) GetByTitle(ctx context.Context, title string) (entity.Author, error) {
	op := "AuthorService.GetByTitle"

	author, err := service.authors.GetByTitle(ctx, title)
	if err != nil {
		return author, common.ApiError{Op: op, Inner: err}
	}

	return author, nil
}
