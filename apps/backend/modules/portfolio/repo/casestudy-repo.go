package repo

import (
	"backend/modules/portfolio/entity"
	"context"
)

const (
	ErrCasestudyRepoExists     = "casestudy: could not check existence"
	ErrCasestudyRepoList       = "casestudy: could not list"
	ErrCasestudyRepoGetByTitle = "casestudy: could not get by title"
)

type CasestudyRepo interface {
	Exists(ctx context.Context, id string) (bool, error)
	List(ctx context.Context) ([]entity.Casestudy, error)
	GetByTitle(ctx context.Context, title string) (entity.Casestudy, error)
}
