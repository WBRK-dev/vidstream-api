# Vidstream API
This project includes:
- An scraper for the website "vidstream.to"
- An parser for the stream provider "rabbitstream.to"

> [!IMPORTANT]
>
> 1. This API is just an unofficial api for [vidstream.to](https://vidstream.to) and is in no other way officially related to the same.
> 2. The content that this api provides is not mine, nor is it hosted by me. These belong to their respective owners. This api just demonstrates how to build an api that scrapes websites and uses their content.

## Contents

- [API Documentation](#api-documentation)
- [Contributors](#contributors)
- [Special Thanks](#thanks-to-)

## API Documentation

<details>
<summary>
    
### `GET` Home Page

</summary>

```
/home
```
```javascript
{
  spotlight: [
    {
      id: string,
      title: string,
      banner: string,
      poster: string,
      rating: string,
      year: string,
    },
    { ... }
  ],
  trending: {
    movies: [
      {
        id: string,
        title: string,
        poster: string,
        stats: {
          duration: string,
          rating: string,
          year: string,
        }
      },
      { ... }
    ],
    tvSeries: [
      {
        id: string,
        title: string,
        poster: string,
        stats: {
          seasons: string,
          rating: string,
        }
      },
      { ... }
    ]
  },
  latestMovies: [
    {
      id: string,
      title: string,
      poster: string,
      stats: {
        duration: string,
        rating: string,
        year: string,
      }
    },
    { ... }
  ],
  latestTvSeries: [
    {
      id: string,
      title: string,
      poster: string,
      stats: {
        seasons: string,
        rating: string,
      }
    },
    { ... }
  ]
}
```

</details>

<details>
  
<summary>
    
### `GET` Movie Seasons

</summary>

```
/movie/{movieId}/seasons
```
|     Parameter      |  Type  |             Description             | Required? | Default |
| :----------------: | :----: | :---------------------------------: | :-------: | :-----: |
|     `movieId`      | string | The movie id given in e.g. `/home`. |    Yes    |   --    |
```javascript
[
  {
    id: string,
    number: number,
  },
  { ... }
]
```

</details>

<details>
  
<summary>
    
### `GET` Movie Episodes

</summary>

```
/movie/{movieId}/episodes?seasonId={seasonId}
```
|      Parameter      |  Type  |                     Description                    | Required? | Default |
| :-----------------: | :----: | :------------------------------------------------: | :-------: | :-----: |
|     `movieId`       | string | The movie id given in e.g. `/home`.                |    Yes    |   --    |
|     `seasonId`      | string | The season id given in `/movie/{movieId}/seasons`. |    Yes    |   --    |
```javascript
[
  {
    id: string,
    number: number,
    title: string,
  },
  { ... }
]
```

</details>

## Contributors
None

## Thanks to ...
- [ghoshRitesh12/aniwatch-api](https://github.com/ghoshRitesh12/aniwatch-api) for providing a codebase structure I used in this project.
