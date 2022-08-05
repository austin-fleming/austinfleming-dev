# Readme

## Routes

/api/v1/portfolio/collections/case-studies/
slug string
limit int
offest int

/api/v1/portfolio/collections/snippets/
slug string
limit int
offset int

/api/v1/portfolio/collections/snippets/{slug}

## Structure

- user (entity)
- comment (entity)

- member (aggregate)
  - user + comment

```TXT
  /db
    supabase.go
    sanity.go
  /modules
    /portfolio
      /article
        article.go
        article-service.go
        article-repo.go
      /snippet
        snippet.go
        snippet-service.go
        snippet-repo.go
      /settings
    /messageboard
      /user
        user.go
        user-dto.go
        user-service.go
        user-repo.go
      /comment
        comment.go
        comment-service.go
        comment-repo.go
      /member
        member.go
        member-service.go
        member-repo.go
```
