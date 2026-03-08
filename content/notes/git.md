+++
date =  2026-03-08
lastmod = 2026-03-08
title = 'Git'
status = "seedling"
tags = []
+++

## checkout vs. switch & restore

`git checkout` is able to create/switch branches, and restore files to previous revisions. 

It is possible to have situations in a repo where there is a file and branch with the same name, where `git checkout` usage could lead to loss of local changes. Git (>2.24.0) now warns about this ambiguity, so safe to continue using.

* switch branches  
    `git checkout some-branch`
* create new branch and switch to it  
    `git checkout -b new-branch`
* restore files to previous state  
    `git checkout some-file.md`

`git switch` & `git restore` were introduced in [Git 2.23.0](https://github.com/git/git/blob/master/Documentation/RelNotes/2.23.0.adoc) to split the functionality of `git checkout` and avoid ambiguity.

* `git switch some-branch`
* `git switch -c (--create) new-branch`
* `git restore some-file.md`
