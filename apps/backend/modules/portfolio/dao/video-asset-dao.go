package dao

import (
	"backend/modules/common"
	"backend/modules/portfolio/vo"
	"fmt"
)

type VideoAssetDAO struct {
	Type      string `json:"_type"`
	Title     string
	AssetData struct {
		Asset struct {
			Id         string `json:"_id"`
			Rev        string `json:"_rev"`
			CreatedAt  string `json:"_createdAt"`
			UpdatedAt  string `json:"_updatedAt"`
			Type       string `json:"_type" default:"video_asset"`
			AssetId    string
			PlaybackId string
			Status     string
			UploadId   string
			Data       struct {
				AspectRatio             string `json:"aspect_ratio"`
				CreatedAt               uint   `json:"created_at"`
				Duration                float32
				Id                      string
				MasterAccess            string      `json:"master_access"`
				MaxStoredFrameRate      uint        `json:"max_stored_frame_rate"`
				MaxStoredResolution     string      `json:"max_stored_resolution"`
				Mp4Support              string      `json:"mp4_support"`
				NonStandardInputReasons interface{} `json:"non_standard_input_reasons"`
				Passthrough             string
				PlaybackId              string
				Status                  string
				UploadId                string
				PlaybackIds             []struct {
					Id     string
					Policy string
				} `json:"playback_ids"`
				StaticRenditions struct {
					Status string
					Files  []struct {
						Bitrate  uint
						Ext      string
						Filesize uint
						Height   uint
						Name     string
						Width    uint
					}
				}
			}
		}
	} `json:"asset_data"`
}

func (dao *VideoAssetDAO) ToVO() (vo.VideoAsset, error) {
	op := "VideoDAO.ToVO"

	source := fmt.Sprintf("https://stream.mux.com/%s/high.mp4", dao.AssetData.Asset.PlaybackId)

	video := vo.VideoAsset{
		Source:   vo.Website(source),
		Provider: "MUX",
	}

	if err := video.Validate(true, "Video"); err != nil {
		return vo.VideoAsset{}, common.ApiError{
			Op:    op,
			Code:  common.EConflict,
			Inner: err,
		}
	}

	return video, nil
}
