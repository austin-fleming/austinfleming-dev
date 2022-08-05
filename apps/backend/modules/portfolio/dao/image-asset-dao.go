package dao

import (
	"backend/modules/common"
	"backend/modules/portfolio/vo"
)

type ImageAssetDAO struct {
	Type        string `json:"_type"`
	Alt         string
	Asset       ImageDAO
	Caption     []map[string]interface{}
	Attribution string
}

func (dao *ImageAssetDAO) ToVO() (vo.ImageAsset, error) {
	op := "ImageAssetDAO.ToVO"

	img := vo.ImageAsset{
		Alt:            dao.Alt,
		Caption:        dao.Caption,
		Attribution:    dao.Attribution,
		Source:         vo.Website(dao.Asset.Url),
		Provider:       "SANITY",
		Lqip:           dao.Asset.Metadata.Lqip,
		BlurHash:       dao.Asset.Metadata.BlurHash,
		Extension:      dao.Asset.Extension,
		Sha1Hash:       dao.Asset.Sha1hash,
		MaxHeight:      dao.Asset.Metadata.Dimensions.Height,
		MaxWidth:       dao.Asset.Metadata.Dimensions.Width,
		MaxAspectRatio: dao.Asset.Metadata.Dimensions.AspectRatio,
		MaxBytes:       dao.Asset.Size,
	}

	if err := img.Validate(true, "ImageAsset"); err != nil {
		return vo.ImageAsset{}, common.ApiError{
			Op:    op,
			Code:  common.EConflict,
			Inner: err,
		}
	}

	return img, nil
}
