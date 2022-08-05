package implementation

import (
	"backend/modules/common"
	"backend/modules/portfolio/dao"
	"backend/modules/portfolio/entity"
	"backend/modules/portfolio/repo"
	"context"

	sanity "github.com/sanity-io/client-go"
)

type SanityAuthorRepo struct {
	client *sanity.Client
}

// TODO: This can probably be made DRY
func NewSanityAuthorRepo(sanityClient *sanity.Client) (*SanityAuthorRepo, error) {
	op := "NewSanityAuthorRepo"

	if sanityClient == nil {
		return nil, common.ApiError{
			Op:       op,
			Code:     common.EInternal,
			Internal: "sanityClient == nil",
		}
	}

	return &SanityAuthorRepo{client: sanityClient}, nil
}

/*
FRAGMENTS
*/
const authorProjection = `{
	...,
	profileImage {
		...,
		asset ->
	}
}`

/*
QUERIES
*/
func (authorRepo *SanityAuthorRepo) Exists(ctx context.Context, id string) (bool, error) {
	op := "SanityAuthorRepo.Exists"

	query := "*[_type == 'author' && _id == $id][0]{_id}"

	result, queryErr := authorRepo.client.Query(query).Param("id", id).Do(ctx)
	if queryErr != nil {
		return false, common.ApiError{
			Op:     op,
			Detail: repo.ErrAuthorRepoExists,
			Code:   common.EInternal,
			Inner:  queryErr,
		}
	}

	data := map[string]string{}
	unmarshalErr := result.Unmarshal(&data)
	if unmarshalErr != nil {
		return false, common.ApiError{
			Op:     op,
			Detail: repo.ErrAuthorRepoExists,
			Code:   common.EInternal,
			Inner:  unmarshalErr,
		}
	}

	_, exists := data["_id"]

	return exists, nil
}

func (authorRepo *SanityAuthorRepo) List(ctx context.Context) ([]entity.Author, error) {
	op := "SanityAuthorRepo.List"

	query := "*[_type == 'author']" + authorProjection

	result, queryErr := authorRepo.client.Query(query).Do(ctx)
	if queryErr != nil {
		return nil, common.ApiError{
			Op:     op,
			Code:   common.EInternal,
			Detail: repo.ErrAuthorRepoList,
			Inner:  queryErr,
		}
	}

	authorDaos := []dao.AuthorDAO{}
	unmarshalErr := result.Unmarshal(&authorDaos)
	if unmarshalErr != nil {
		return nil, common.ApiError{
			Op:     op,
			Code:   common.EInternal,
			Detail: repo.ErrAuthorRepoList,
			Inner:  unmarshalErr,
		}
	}

	authors := []entity.Author{}
	for _, author := range authorDaos {
		authorEntity, err := author.ToEntity()
		if err != nil {
			return []entity.Author{}, common.ApiError{
				Op:     op,
				Code:   common.EConflict,
				Detail: repo.ErrAuthorRepoList,
				Inner:  err,
			}
		}
		authors = append(authors, authorEntity)
	}

	return authors, nil
}

func (authorRepo *SanityAuthorRepo) GetByTitle(ctx context.Context, title string) (entity.Author, error) {
	op := "SanityAuthorRepo.GetByTitle"

	query := `*[_type == 'author' && title == $title][0]` + tagProjection

	result, queryErr := authorRepo.client.Query(query).Param("title", title).Do(ctx)
	if queryErr != nil {
		return entity.Author{}, common.ApiError{
			Op:     op,
			Code:   common.EInternal,
			Detail: repo.ErrAuthorRepoGetByTitle,
			Inner:  queryErr,
		}
	}

	data := dao.AuthorDAO{}
	unmarshalErr := result.Unmarshal(&data)
	if unmarshalErr != nil {
		return entity.Author{}, common.ApiError{
			Op:     op,
			Code:   common.EInternal,
			Detail: repo.ErrAuthorRepoGetByTitle,
			Inner:  unmarshalErr,
		}
	}

	if data.Id == "" {
		return entity.Author{}, common.ApiError{
			Op:     op,
			Code:   common.ENotFound,
			Detail: repo.ErrAuthorRepoGetByTitle,
		}
	}

	authorEntity, mapErr := data.ToEntity()
	if mapErr != nil {
		return entity.Author{}, common.ApiError{
			Op:     op,
			Code:   common.EInternal,
			Detail: repo.ErrAuthorRepoGetByTitle,
			Inner:  mapErr,
		}
	}

	return authorEntity, nil
}
