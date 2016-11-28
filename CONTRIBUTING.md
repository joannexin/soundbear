# Contributing

## General Workflow

1. Fork the repo
2. Cut a namespaced feature branch from master. The branch name should be a short 1-or-2 word description of what you're working on.
3. Make commits to your feature branch. See Commit Message Guidelines below.
4. When you've finished with your fix or feature, Rebase upstream changes into your branch. submit a [pull request](https://help.github.com/articles/about-pull-requests/)
   directly to master. Include a description of your changes. Your pull request will be reviewed by another maintainer.
5. Fix any issues raised by your code reviwer, and push your fixes as a single
   new commit.
6. Once the pull request has been reviewed, it will be merged by another member of the team. Do not merge your own commits.

## Detailed Workflow

Make sure that you have properly forked the repo before cloning the repo into your local workstation.

1. Clone repository onto your local workstation
2. Upon cloning make sure to add the remote for your upstream repository.
```
$ git clone https://github.com/[your_username]/hackify.git
$ git remote add upstream https://github.com/backbonebear/hackify.git
```
3. Checkout to a new branch. This is where most of your edits will be made.
```
$ git checkout -b [branch_name]
```

### Pulling from upstream

1. Before pulling down from upstream, make sure that your edits have been staged by using ```git add```.

2. Pull down using rebase
```
$ git pull upstream dev --rebase
```

### Pushing Code

Push to your [branch_name] branch.
```
$ git push origin [branch_name]
```

## Commit Message Guidelines

- Write commit messages in the present tense
- The first line of your commit message should be a brief summary of what the
  commit changes. Aim for about 70 characters max.
- Prefix each commit like so:
  - [add] add a new feature
  - [fix] fix inconsistent tests
  - [refactor] ...
  - [cleanup] ...
  - [test] ...
  - [style] ...
- Commit frequently!

[AirBnB Style Guide]: https://github.com/airbnb/javascript
