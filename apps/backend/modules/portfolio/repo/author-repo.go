package repo

import (
	"backend/modules/portfolio/entity"
	"context"
)

const (
	ErrAuthorRepoExists     = "author: could not check existence"
	ErrAuthorRepoList       = "author: could not list"
	ErrAuthorRepoGetByTitle = "author: could not get by title"
)

type AuthorRepo interface {
	Exists(ctx context.Context, id string) (bool, error)
	List(ctx context.Context) ([]entity.Author, error)
	GetByTitle(ctx context.Context, title string) (entity.Author, error)
}
