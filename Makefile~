BRANCH=$(shell git branch | awk '/\*/ { print $2; }')

mergeOnMaster:
  git checkout master
  git merge $(BRANCH)
  git push
  git checkout $(BRANCH)

dev:
  meteor
