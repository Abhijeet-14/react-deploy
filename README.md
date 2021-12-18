# CI-CD deployment of React App

1. goto codepipeline in AWS
2. click create pipeline
3. name your pipeline
4. click next
5. choose source provider -> Github
6. connect to github (authentication)
7. choose REPO
8. choose branch
9. click NEXT
10. Buil provider > choose 'AWS codebuild'
11. click 'create project'
12. give project name
13. in Environment -> Operating System -> choose Ubuntu
14. choose Runtimes -> standard
15. choose images -> aws/codebuild/standard:4
16. go bottom -> continue to CodePipeline

> Succesfully create CodeBuild

17. click NEXT
18. Deploy provider -> choose 'Amazon S3'.... reason, bcz build will be done by codebuild... and final build files like bundle.js etc will be pushed to S3
19. goto S3, and create a bucket
20. choose unique name and create bucket.
21. return to codepipeline tab
22. choose Bucket -> 'react-deploy-1' (say)
23. next field, S3 object Key... mailny it zip the react application and put into S3.. we don't want that...
24. check the 'Extract file before deploy' -> this is extract in the root folder
25. click NEXT
26. go bottom -> click 'create pipeline'

> Successfully created CodePipeline

27. Now do configurstion setup in react-folder
28. goto project -> create buildspec.yml file
29. write:

    ```
    version: 0.2

    phases:
        install:
            commands:
                # install Node 14
                # install Yarn

        pre_build:
            commands:
                # install dependencies

        build:
            commands:
                # tests
                # build
    ```

30. try to find ubuntu method of downloading Node 14
    -> nodejs.org -> other downloads -> Installing Node.js via package manager -> Node.js binary distributions -> goto Node.js v14.x
    -> copy code .. download using ubuntu
    -> similar for yarn

    ```
    version: 0.2
    phases:
        install:
            commands:
                # install Node 14
                - echo install Node 14...
                - curl -fsSL https://deb.nodesource.com/setup_14.x |  bash -
                - apt install -y nodejs

                # install Yarn
                - echo install Yarn
                - curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
                - echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
                - apt install --no-install-recommends yarn

        pre_build:
            commands:
                # install dependencies
                - echo installing dependencies...
                - yarn

        build:
            commands:
                # tests
                - echo testing
                - yarn test

                # build
                - echo building
                - yarn build

    artifacts:
        files:
            - "**/*"
        discard-paths: no
        base-directory: dist
    ```

31. do changes in package.json -> install jest, parcel-bundler
    -> scipts: {
        "build" : "rm -rf dist && parcel build sec/index.html",
        "test": "jest",
        "watch": "parcel src/index.html" 
    }





<!-- {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
 -->