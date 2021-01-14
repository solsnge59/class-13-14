'use strict';

const renderModule = (module, mainData) =>
  `<h3><a href="${
    module.url
      ? module.url
      : `https://github.com/${module.userName || mainData.modulesUserName}/${
          module.repoName
        }`
  }" style="display: inline">${module.repoName}</a></h3>` +
  (module.project || module.milestone
    ? `  <ul><li><p>` +
      (typeof module.weeks === 'number'
        ? `    ${(module.weeks === 1 ? '1 week' : module.weeks + ' weeks') +
            ' | '} `
        : '') +
      (typeof module.weeks === 'number'
        ? `    <a href="https://github.com/${mainData.repoUserName}/${mainData.repoName}/issues?q=milestone%3A${module.repoName}+label%3Acheck-in">check-ins</a> | `
        : '') +
      (Array.isArray(module.filters)
        ? module.filters
            .map(
              filter =>
                `    <a href="https://github.com/${mainData.repoUserName}/${
                  mainData.repoName
                }/issues?q=milestone%3A${filter.milestone || module.repoName}+${
                  Array.isArray(filter.labels)
                    ? filter.labels.map(label => 'label%3A' + label).join('+')
                    : ''
                }+${
                  Array.isArray(filter.is)
                    ? filter.is.map(label => 'is%3A' + label).join('+')
                    : ''
                }">${filter.text}</a> | `
            )
            .join('')
        : '') +
      `    <a href="https://github.com/${mainData.repoUserName}/${
        mainData.repoName
      }/projects/${module.project ||
        mainData.project}?card_filter_query=label%3Aproject+milestone%3A${
        module.repoName
      }">projects</a> ` +
      (Array.isArray(module.links)
        ? module.links
            .map(link => `    <a href="${link.href}">${link.text}</a> | `)
            .join('')
        : '') +
      (module.weeks
        ? `    | <a href="https://github.com/${mainData.repoUserName}/${mainData.repoName}/issues?q=milestone%3A${module.repoName}+label%3Aroll-call">roll-calls</a> `
        : '') +
      (module.milestone
        ? `    | <a href="https://github.com/${mainData.repoUserName}/${mainData.repoName}/milestone/${module.milestone}">milestone</a> `
        : '') +
      `  </p></li></ul>`
    : '');

module.exports = renderModule;
