# Release Process

## Google Clould / Appengine deploy


*Deploy*
```bash
npm run gcloud-prepare appengine appengine.yaml
cd deployments/appengine/
gcloud app deploy --project betsy-229400 
```


```sh 
$ npm run release                           # Updates CHANGELOG.md, bumps version, and commits tags based on commit history.  https://www.npmjs.com/package/standard-version 
$ git push --follow-tags origin master      # Pushes to master, CI Pipeline will kick in again, acting on the tagged build
```

