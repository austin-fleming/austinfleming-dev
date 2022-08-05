package dao

type ImageDAO struct {
	Id        string `json:"_id"`
	Rev       string `json:"_rev"`
	CreatedAt string `json:"_createdAt"`
	UpdatedAt string `json:"_updatedAt"`
	Type      string `json:"_type"`
	//
	AssetId   string
	Extension string
	Metadata  struct {
		Type       string `json:"_type"`
		BlurHash   string
		Dimensions struct {
			Type        string `json:"_type"`
			AspectRatio float32
			Height      uint
			Width       uint
		}
		HasAlpha bool
		IsOpaque bool
		Lqip     string
		Palette  struct {
			Type         string `json:"_type"`
			DarkVibrant  PaletteSwatch
			Dominant     PaletteSwatch
			LightMuted   PaletteSwatch
			LightVibrant PaletteSwatch
			Muted        PaletteSwatch
			Vibrant      PaletteSwatch
		}
	}
	MimeType         string
	OriginalFilename string
	Path             string
	Sha1hash         string
	Size             uint
	UploadId         string
	Url              string
}

type PaletteSwatch struct {
	Type       string `json:"_type"`
	Background string
	Foreground string
	Population float32
	Title      string
}
