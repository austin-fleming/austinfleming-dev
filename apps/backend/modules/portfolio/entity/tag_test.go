package entity

import (
	"fmt"
	"testing"
)

func TestTag(test *testing.T) {
	testCases := []struct {
		arg  Tag
		want string
	}{
		{
			arg:  Tag{},
			want: `{Id: Rev: CreatedAt: UpdatedAt: Title: Slug:}`,
		},
		{
			arg: Tag{
				Id:    "id",
				Rev:   "rev",
				Title: "title",
				Slug:  "slug",
			},
			want: `{Id:id Rev:rev CreatedAt: UpdatedAt: Title:title Slug:slug}`,
		},
		{
			arg: Tag{
				Id:        "id",
				Rev:       "rev",
				CreatedAt: "2020-02-01",
				UpdatedAt: "2020-02-01",
				Title:     "title",
				Slug:      "slug",
			},
			want: `{Id:id Rev:rev CreatedAt:2020-02-01 UpdatedAt:2020-02-01 Title:title Slug:slug}`,
		},
	}

	for _, tc := range testCases {
		got := fmt.Sprintf("%+v", tc.arg)
		if tc.want != got {
			test.Errorf("\nExpected:\n\t%s\nGot:\n\t%s", tc.want, got)
		}
	}
}

func TestTagValidate(test *testing.T) {
	testCases := []struct {
		arg  Tag
		want string
	}{
		{
			arg: Tag{
				Id:        "id",
				Rev:       "rev",
				CreatedAt: "time",
				UpdatedAt: "time",
				Title:     "title",
				Slug:      "slug",
			},
			want: `{"status":400,"invalidFields":[{"fieldName":"id","path":"","reason":"is not a valid id"},{"fieldName":"createdAt","path":"","reason":"is not a valid timestamp"},{"fieldName":"updatedAt","path":"","reason":"is not a valid timestamp"}],"op":"Tag.Validate"}`,
		},
		{
			arg: Tag{
				Id:        "57b73598-8764-4ad0-a76a-679bb6640eb1",
				Rev:       "rev",
				CreatedAt: "2016-12-31T11:00:00",
				UpdatedAt: "2016-12-31T11:00:00",
				Title:     "title",
				Slug:      "slug",
			},
			want: "<nil>",
		},
		{
			arg:  Tag{},
			want: `{"status":400,"invalidFields":[{"fieldName":"id","path":"","reason":"is missing"},{"fieldName":"id","path":"","reason":"is not a valid id"},{"fieldName":"createdAt","path":"","reason":"is missing"},{"fieldName":"createdAt","path":"","reason":"is not a valid timestamp"},{"fieldName":"updatedAt","path":"","reason":"is missing"},{"fieldName":"updatedAt","path":"","reason":"is not a valid timestamp"},{"fieldName":"title","path":"","reason":"is missing"},{"fieldName":"slug","path":"","reason":"is missing"},{"fieldName":"slug","path":"","reason":"is not a valid slug"}],"op":"Tag.Validate"}`,
		},
	}

	for _, tc := range testCases {
		got := fmt.Sprintf("%+v", tc.arg.Validate())
		if tc.want != got {
			test.Errorf("\nExpected:\n\t%s\nGot:\n\t%s\n", tc.want, got)
		}
	}
}

func TestTagIsSameAs(test *testing.T) {
	testCases := []struct {
		arg1 Tag
		arg2 Tag
		want bool
	}{
		{
			arg1: Tag{
				Id:    "57b73598-8764-4ad0-a76a-679bb6640eb1",
				Rev:   "rev1",
				Title: "title1",
				Slug:  "slug1",
			},
			arg2: Tag{
				Id:    "57b73598-8764-4ad0-a76a-679bb6640eb1",
				Rev:   "rev2",
				Title: "title2",
				Slug:  "slug2",
			},
			want: true,
		},
		{
			arg1: Tag{
				Id:    "57b73598-8764-4ad0-a76a-679bb6640eb1",
				Rev:   "rev",
				Title: "title",
				Slug:  "slug",
			},
			arg2: Tag{
				Id:    "57b73598-8764-4ad0-a76a-679bb6640eb2",
				Rev:   "rev",
				Title: "title",
				Slug:  "slug",
			},
			want: false,
		},
	}

	for _, tc := range testCases {
		got := tc.arg1.IsSameAs(tc.arg2)
		if tc.want != got {
			test.Errorf("Expected:\n%t\nGot:\n%t", tc.want, got)
		}
	}
}

func TestTagIsSameRevision(test *testing.T) {
	testCases := []struct {
		arg1 Tag
		arg2 Tag
		want bool
	}{
		{
			arg1: Tag{
				Id:    "57b73598-8764-4ad0-a76a-679bb6640eb1",
				Rev:   "rev01",
				Title: "title1",
				Slug:  "slug1",
			},
			arg2: Tag{
				Id:    "57b73598-8764-4ad0-a76a-679bb6640eb1",
				Rev:   "rev01",
				Title: "title2",
				Slug:  "slug2",
			},
			want: true,
		},
		{
			arg1: Tag{
				Id:    "57b73598-8764-4ad0-a76a-679bb6640eb1",
				Rev:   "rev01",
				Title: "title1",
				Slug:  "slug1",
			},
			arg2: Tag{
				Id:    "57b73598-8764-4ad0-a76a-679bb6640eb1",
				Rev:   "rev02",
				Title: "title2",
				Slug:  "slug2",
			},
			want: false,
		},
	}

	for _, tc := range testCases {
		got := tc.arg1.IsSameRevision(tc.arg2)
		if tc.want != got {
			test.Errorf("Expected:\n%t\nGot:\n%t", tc.want, got)
		}
	}
}
