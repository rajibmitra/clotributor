# CLOTributor

[![CI](https://github.com/cncf/clotributor/workflows/CI/badge.svg)](https://github.com/cncf/clotributor/actions?query=workflow%3ACI)

[**CLOTributor**](https://clotributor.dev) makes it easier to discover great opportunities to become a [**Cloud Native**](https://www.cncf.io) contributor.

<table>
    <tr>
        <td width="50%"><img src="docs/screenshots/home-light.png?raw=true"></td>
        <td width="50%"><img src="docs/screenshots/home-dark.png?raw=true"></td>
    </tr>
</table>

## How it works

One of the CLOTributor's goals is to surface interesting opportunities for potential contributors to [Cloud Native projects](https://www.cncf.io/projects/), allowing them to find those that suit their skills and interests best.

To achieve this, **CLOTributor** scans periodically hundreds of repositories, indexing issues that match certain criteria:

- Contain the `help wanted` label
- Their state is `OPEN`
- They are `unassigned`
- Updated within the last year

Issues that no longer match the required criteria are *removed* automatically from **CLOTributor**. This way, if an issue is assigned to someone or it is closed, it won't be displayed anymore.

In addition to some issue's details, like the *title* or *labels*, we also collect and index some metadata from the corresponding repository, like its *topics* or the *programming languages* used. In general, the more context projects can provide in their issues via labels, the better. There is a [set of labels](#labels-with-special-meaning) that have a special meaning for CLOTributor. Other labels like `frontend`, or even mentioning specific frameworks like `react` or `vue`, may also help users finding issues that suit them best.

The generated index can be searched from <https://clotributor.dev>. The following syntax can be used to narrow down the results:

- Use multiple words to refine the search. **Example:** [*gitops go*](https://clotributor.dev/search?ts_query_web=gitops+go)
- Use `-` to exclude words from the search. **Example:** [*rust -webassembly*](https://clotributor.dev/search?ts_query_web=rust+-webassembly)
- Put a phrase inside `double quotes` for an exact match. **Example:** [*"machine learning"*](https://clotributor.dev/search?ts_query_web=%22machine+learning%22)
- Use `or` to combine multiple searches. **Example:** [*networking or security*](https://clotributor.dev/search?ts_query_web=networking+or+security)

It's possible to search by project name, repository name, description, topics or programming languages, as well as issue title and labels. Prefix matching for all of them is also supported (e.g. searching for `backst` should return issues from the `Backstage` project).

## Labels with special meaning

Some of the features of **CLOTributor** are controlled by some special labels that can be set on issues:

- `help wanted`: this is the entry point for CLOTributor, as it only processes issues where help is wanted.

- `good first issue`: when this label is present on an issue, it is highlighted in the UI.

- `difficulty/easy` or `level/easy`: to set an issue's difficulty as easy.

- `difficulty/medium` or `level/medium`: to set an issue's difficulty as medium.

- `difficulty/hard` or `level/hard`: to set an issue's difficulty as hard.

- `mentor available`: to indicate that someone may be available to guide contributors with this issue.

In addition to those labels, **CLOTributor** tries to categorize issues as a `bug`, `new feature` or an `enhancement`. This kind is set based on the presence of a label that contains the string `bug`, `feature` or `enhancement`/`improvement` respectively.


## Projects and repositories

**CLOTributor's** data source for projects and repositories is [**CLOMonitor**](https://github.com/cncf/clomonitor#projects), which lists most of the projects in the [CNCF](https://www.cncf.io/projects/) and [LF AI & DATA](https://lfaidata.foundation/projects/) foundations.

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

## Code of Conduct

This project follows the [CNCF Code of Conduct](https://github.com/cncf/foundation/blob/master/code-of-conduct.md).

## License

CLOTributor is an Open Source project licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
