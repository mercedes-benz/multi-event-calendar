<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright (c) 2021 Daimler TSS GmbH -->
# Contributing

This document explains how to contribute to this project.
By contributing you will agree that your contribution will be put under the same license as this repository.

## Table of Contents
- Communication
- Contributions
- Quality
- Questions

## Communication
For communication please respect our [FOSS Code of Conduct](CODE_OF_CONDUCT.md).

The following communication channels exist for this project:
- Github for reporting and claiming issues: https://github.com/daimler/multi-event-calendar/issues

Transparent and open communication is important to us. Thus, all project-related communication should happen only through these channels and in English. Issue-related communication should happen within the concerned issue.

## Contributions
If you would like to contribute code you can do so through Daimler GitHub by cloning the repository and sending a pull request.

When submitting code, please make every effort to follow existing conventions and style in order to keep the code as readable as possible.

If you are new to contributing in Github, [First Contributions](https://github.com/firstcontributions/first-contributions) might be a good starting point.

**Before you can contribute**, you will need to sign our [CLA](https://github.com/Daimler/daimler-foss/blob/main/CONTRIBUTORS_LICENSE_AGREEMENT.md) and send the signed CLA to **cla-tss@daimler.com**

## Quality
Please ensure that for all contributions, the corresponding documentation is in-sync and up-to-date. All documentation should be in English language.

Make sure that:
- You have done your changes in a separate branch. Branches MUST have descriptive names that start with either the `fix/` or `feature/` prefixes. Good examples are: `fix/signin-issue` or `feature/issue-templates`.
- You have a descriptive commit message with a short title (first line).
- You have only one commit (if not, squash them into one commit). The commit message contains close #<issue no>.
- The project has been built and tested prior to the contribution. `npm run lib-test` doesn't throw any error. If it does, fix them first and amend your commit (`git commit --amend`).
- The static code analysis was performed. `npm run lib-lint` doesn't throw any error. If it does, fix them first and amend your commit (`git commit --amend`).

## Questions
For any further questions please have a look into [MAINTAINERS.md](MAINTAINERS.md) and send us a message.
