# Guide
-------

## DEV
------
1. Clone the repository.
2. npm install -g angular-cli

## Build For Product
--------------------
1. ng build -prod

## Commit
---------
1. 完成测试
2. ng build --env=prod && cd dist && gzip -rk . && cd -
3. git add dist
4. git commit -m "msg here"
5. git push origin dev:refs/for/dev

