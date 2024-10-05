# Vidstream API
This project includes:
- A scraper for the website "vidstream.to"
- A parser for the stream provider "rabbitstream.net"

> [!IMPORTANT]
>
> 1. This API is just an unofficial api for [vidstream.to](https://vidstream.to) and is in no other way officially related to the same.
> 2. The content that this api provides is not mine, nor is it hosted by me. These belong to their respective owners. This api just demonstrates how to build an api that scrapes websites and uses their content.

## Contents

- [Installation](#installation)
- [API Documentation](#api-documentation)
  - [GET Home Page](#get-home-page)
  - [GET Search](#get-search)
  - [GET Movie Details](#get-movie-details)
  - [GET Movie Seasons](#get-movie-seasons)
  - [GET Movie Episodes](#get-movie-episodes)
  - [GET Movie Episode Servers](#get-movie-episode-servers)
  - [GET Movie Episode Sources](#get-movie-episode-sources)
- [Contributors](#contributors)
- [Special Thanks](#thanks-to-)

## Installation
To get this project on your local machine run the following command.
```
git clone https://github.com/WBRK-dev/vidstream-api.git
```
After that go into the new directory and install all the dependencies.
```
npm install
```
When you are done with installing run the serve command.
```
npm start
```
Now the api is accessible through `localhost:4001`.

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
    
### `GET` Search

</summary>

```
/search?q={searchQuery}&page={pageIndex}
```
|       Parameter      |  Type  |             Description               | Required? | Default |
| :------------------: | :----: | :-----------------------------------: | :-------: | :-----: |
|     `searchQuery`    | string | The search string. E.g. "family guy". |    Yes    |   --    |
|     `pageIndex`      | number | The index of the page.                |    No     |   1     |
```javascript
{
  items: [
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
  ],
  pagination: {
    current: number,
    total: number,
  }
}
```

</details>

<details>
  
<summary>
    
### `GET` Movie Details

</summary>

```
/movie/{movieId}
```

|     Parameter      |  Type  |             Description             | Required? | Default |
| :----------------: | :----: | :---------------------------------: | :-------: | :-----: |
|     `movieId`      | string | The movie id given in e.g. `/home`. |    Yes    |   --    |

<p style="background-color: red; color: white;">episodeId is only available when type is equal to movie and only has one episode.</p>

```javascript
{
  title: string,
  description: string,
  type: "movie" | "tvSeries",
  stats: { name: string, value: string | string[] }[],
  episodeId?: string,
  related: [
    {
      id: string,
      title: string,
      poster: string,
      stats: {
        seasons: string,
        rating: string,
      }
    },
    {
      id: string,
      title: string,
      poster: string,
      stats: {
        year: string,
        duration: string,
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
{
  seasons: [
    {
      id: string,
      number: number,
    },
    { ... }
  ]
}
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
{
  episodes: [
  {
    id: string,
    number: number,
    title: string,
  },
  { ... }
]
}
```

</details>

<details>

<summary>
    
### `GET` Movie Episode Servers

</summary>

```
/movie/{movieId}/servers?episodeId={episodeId}
```
|       Parameter      |  Type  |                        Description                        | Required? | Default |
| :------------------: | :----: | :-------------------------------------------------------: | :-------: | :-----: |
|      `movieId`       | string | The movie id given in e.g. `/home`.                       |    Yes    |   --    |
|      `episodeId`     | string | The episode id given in e.g. `/movie/{movieId}/episodes`. |    Yes    |   --    |
```javascript
{
  servers: [
    {
      id: string,
      name: string,
    },
    { ... }
  ]
}
```

</details>

<details>

<summary>
    
### `GET` Movie Episode Sources

</summary>

```
/movie/{movieId}/sources?serverId={serverId}
```
|      Parameter      |  Type  |                    Description                     | Required? | Default |
| :-----------------: | :----: | :------------------------------------------------: | :-------: | :-----: |
|     `movieId`       | string | The movie id given in e.g. `/home`.                |    Yes    |   --    |
|     `serverId`      | string | The server id given in `/movie/{movieId}/servers`. |    Yes    |   --    |
```javascript
{
  sources: [
    {
      src: string,
      type: string,
    },
    { ... }   
  ],
  tracks: [
    {
      file: string,
      label: string,
      kind: string,
      default?: string,
    },
    { ... }
  ]
}
```

</details>

## Contributors
None

## Thanks to ...
- [ghoshRitesh12/aniwatch-api](https://github.com/ghoshRitesh12/aniwatch-api) for providing a codebase structure I used in this project.
