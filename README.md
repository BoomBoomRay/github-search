# 1. Install packages
run `npm install`

# 2. Run project
run `npm start`

# 3. Open it
go to http://localhost:3000

live:  https://github-search-application.netlify.app/login

## Gihthub API

- [Root Endpoint](https://api.github.com)
- [Get User](https://api.github.com/users/boomboomray)
- [Repos](https://api.github.com/users/boomboomray/repos?per_page=100)
- [Followers](https://api.github.com/users/boomboomray/followers)
- [Rate Limit](https://api.github.com/rate_limit)

  For unauthenticated requests, the rate limit allows for up to 60 requests per hour. Unauthenticated requests are associated with the originating IP address, and not the user making requests.
  
## Features
[Styled-Components - Main Docs](https://styled-components.com/)

[React Icons - Main Docs](https://react-icons.github.io/react-icons/)


[Fusion Charts - Main Docs](https://www.fusioncharts.com/)
[First React Chart](https://www.fusioncharts.com/dev/getting-started/react/your-first-chart-using-react)
[List Of Charts](https://www.fusioncharts.com/dev/chart-guide/list-of-charts)
[Themes](https://www.fusioncharts.com/dev/themes/introduction-to-themes)

[Auth0 - Main Docs](https://auth0.com/)


## Deployment

[Netlify](https://www.netlify.com/)

## Additional Info

#### Redirects with react-router-dom

In order for routing to work on netlify, redirects was added to the public folder

- \_redirects file in public

```

/*    /index.html   200

```

[Redirects Blog Post](https://dev.to/dance2die/page-not-found-on-netlify-with-react-router-58mc)

#### Warnings and create-react-app

package.json

```js
"build": "CI= react-scripts build",
```


