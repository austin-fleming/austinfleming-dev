package repo

import (
	"backend/modules/portfolio/entity"
	"context"
)

const (
	ErrTagRepoExists     = "tag: could not check existence"
	ErrTagRepoList       = "tag: could not list"
	ErrTagRepoGetByTitle = "tag: could not get by title"
	// ErrRepoNextId     = "tag: could not return next id"
	// ErrRepoFind       = "tag: could not find"
	// ErrRepoAdd        = "tag: could not add"
	// ErrRepoRemove     = "tag: could not remove"
)

type TagRepo interface {
	Exists(ctx context.Context, id string) (bool, error)
	List(ctx context.Context) ([]entity.Tag, error)
	GetByTitle(ctx context.Context, title string) (entity.Tag, error)

	// Returns next free ID
	//NextId() (uuid.UUID, error)

	// Returns a Tag
	// Find(uuid.UUID) (*Tag, error)

	// Persists a Tag
	// Add(*Tag) (*Tag, error)

	// Removes a Tag
	// Remove(uuid.UUID) (*Tag, error)

	// When some type of explicit need exists, make an explicit api, not a parameter
	// ListTitlesLongerThan10Chars() ([]*Tag, error)
}
