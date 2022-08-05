package implementation

import (
	"backend/modules/common"
	"backend/modules/portfolio/dao"
	"backend/modules/portfolio/entity"
	"backend/modules/portfolio/repo"
	"context"

	sanity "github.com/sanity-io/client-go"
)

type SanityTagRepo struct {
	client *sanity.Client
}

func NewSanityTagRepo(sanityClient *sanity.Client) (*SanityTagRepo, error) {
	if sanityClient == nil {
		panic("Missing SanityClient.")
	}

	return &SanityTagRepo{client: sanityClient}, nil
}

/*
FRAGMENTS
*/
const tagProjection = `{
  ...,
  'count': count(*[references(^._id)])
}`

/*
QUERIES
*/

func (client *SanityTagRepo) Exists(ctx context.Context, id string) (bool, error) {
	op := "SanityTagRepo.Exists"

	query := "*[_type == 'tag' && _id == $id][0]{_id}"

	result, queryErr := client.client.Query(query).Param("id", id).Do(ctx)
	if queryErr != nil {
		return false, common.ApiError{
			Op:     op,
			Detail: repo.ErrTagRepoExists,
			Code:   common.EInternal,
			Inner:  queryErr,
		}
	}

	data := map[string]string{}
	unmarshalErr := result.Unmarshal(&data)
	if unmarshalErr != nil {
		return false, common.ApiError{
			Op:     op,
			Detail: repo.ErrTagRepoExists,
			Code:   common.EInternal,
			Inner:  unmarshalErr,
		}
	}

	_, exists := data["_id"]

	return exists, nil
}

// If no results, returns empty slice
func (client SanityTagRepo) List(ctx context.Context) ([]entity.Tag, error) {
	op := "SanityTagRepo.List"

	query := "*[_type=='tag']" + tagProjection

	result, queryErr := client.client.Query(query).Do(ctx)
	if queryErr != nil {
		return nil, common.ApiError{
			Op:     op,
			Code:   common.EInternal,
			Detail: repo.ErrTagRepoList,
			Inner:  queryErr,
		}
	}

	tagDaos := []*dao.TagDAO{}
	unmarshalErr := result.Unmarshal(&tagDaos)
	if unmarshalErr != nil {
		return nil, common.ApiError{
			Op:     op,
			Code:   common.EInternal,
			Detail: repo.ErrTagRepoList,
			Inner:  unmarshalErr,
		}
	}

	tags := []entity.Tag{}
	for _, tag := range tagDaos {
		tagEntity, err := tag.ToEntity()
		if err != nil {
			return []entity.Tag{}, common.ApiError{
				Op:     op,
				Code:   common.EConflict,
				Detail: repo.ErrTagRepoList,
				Inner:  err,
			}
		}
		tags = append(tags, tagEntity)
	}

	return tags, nil
}

// BUG: If no results, returns error
func (client SanityTagRepo) GetByTitle(ctx context.Context, title string) (entity.Tag, error) {
	op := "SanityTagRepo.GetByTitle"

	query := `*[_type == 'tag' && title == $title][0]` + tagProjection

	result, queryErr := client.client.Query(query).Param("title", title).Do(ctx)
	if queryErr != nil {
		return entity.Tag{}, common.ApiError{
			Op:     op,
			Code:   common.EInternal,
			Detail: repo.ErrTagRepoGetByTitle,
			Inner:  queryErr,
		}
	}

	data := dao.TagDAO{}
	unmarshalErr := result.Unmarshal(&data)
	if unmarshalErr != nil {
		return entity.Tag{}, common.ApiError{
			Op:     op,
			Code:   common.EInternal,
			Detail: repo.ErrTagRepoGetByTitle,
			Inner:  unmarshalErr,
		}
	}

	if (data == dao.TagDAO{}) {
		return entity.Tag{}, common.ApiError{
			Op:     op,
			Code:   common.ENotFound,
			Detail: repo.ErrTagRepoGetByTitle,
		}
	}

	tagEntity, mapErr := data.ToEntity()
	if mapErr != nil {
		return entity.Tag{}, common.ApiError{
			Op:     op,
			Code:   common.EInternal,
			Detail: repo.ErrTagRepoGetByTitle,
			Inner:  mapErr,
		}
	}

	return tagEntity, nil
}
