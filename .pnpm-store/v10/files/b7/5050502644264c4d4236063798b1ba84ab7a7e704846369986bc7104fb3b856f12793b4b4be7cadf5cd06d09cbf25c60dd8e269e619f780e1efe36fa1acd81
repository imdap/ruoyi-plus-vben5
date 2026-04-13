'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dotenv = require('dotenv');
var getGithubInfo = require('@changesets/get-github-info');

function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}

dotenv.config();

// "match what you skip, capture what you want": the left alternative
// consumes markdown links so the right alternative only matches bare refs
function linkifyIssueRefs(line, {
  serverUrl,
  repo
}) {
  return line.replace(/\[.*?\]\(.*?\)|\B#([1-9]\d*)\b/g, (match, issue) =>
  // PRs and issues are the same thing on GitHub (to some extent, of course)
  // this relies on GitHub redirecting from /issues/1234 to /pull/1234 when necessary
  issue ? `[#${issue}](${serverUrl}/${repo}/issues/${issue})` : match);
}
function readEnv() {
  const GITHUB_SERVER_URL = process.env.GITHUB_SERVER_URL || "https://github.com";
  return {
    GITHUB_SERVER_URL
  };
}
const changelogFunctions = {
  getDependencyReleaseLine: async (changesets, dependenciesUpdated, options) => {
    if (!options.repo) {
      throw new Error('Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]');
    }
    if (dependenciesUpdated.length === 0) return "";
    const changesetLink = `- Updated dependencies [${(await Promise.all(changesets.map(async cs => {
      if (cs.commit) {
        let {
          links
        } = await getGithubInfo.getInfo({
          repo: options.repo,
          commit: cs.commit
        });
        return links.commit;
      }
    }))).filter(_ => _).join(", ")}]:`;
    const updatedDepenenciesList = dependenciesUpdated.map(dependency => `  - ${dependency.name}@${dependency.newVersion}`);
    return [changesetLink, ...updatedDepenenciesList].join("\n");
  },
  getReleaseLine: async (changeset, type, options) => {
    const {
      GITHUB_SERVER_URL
    } = readEnv();
    if (!options || !options.repo) {
      throw new Error('Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]');
    }
    let prFromSummary;
    let commitFromSummary;
    let usersFromSummary = [];
    const replacedChangelog = changeset.summary.replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im, (_, pr) => {
      let num = Number(pr);
      if (!isNaN(num)) prFromSummary = num;
      return "";
    }).replace(/^\s*commit:\s*([^\s]+)/im, (_, commit) => {
      commitFromSummary = commit;
      return "";
    }).replace(/^\s*(?:author|user):\s*@?([^\s]+)/gim, (_, user) => {
      usersFromSummary.push(user);
      return "";
    }).trim();
    const [firstLine, ...futureLines] = replacedChangelog.split("\n").map(l => l.trimEnd());
    const links = await (async () => {
      if (prFromSummary !== undefined) {
        let {
          links
        } = await getGithubInfo.getInfoFromPullRequest({
          repo: options.repo,
          pull: prFromSummary
        });
        if (commitFromSummary) {
          const shortCommitId = commitFromSummary.slice(0, 7);
          links = _objectSpread2(_objectSpread2({}, links), {}, {
            commit: `[\`${shortCommitId}\`](${GITHUB_SERVER_URL}/${options.repo}/commit/${commitFromSummary})`
          });
        }
        return links;
      }
      const commitToFetchFrom = commitFromSummary || changeset.commit;
      if (commitToFetchFrom) {
        let {
          links
        } = await getGithubInfo.getInfo({
          repo: options.repo,
          commit: commitToFetchFrom
        });
        return links;
      }
      return {
        commit: null,
        pull: null,
        user: null
      };
    })();
    const users = usersFromSummary.length ? usersFromSummary.map(userFromSummary => `[@${userFromSummary}](${GITHUB_SERVER_URL}/${userFromSummary})`).join(", ") : links.user;
    const prefix = [links.pull === null ? "" : ` ${links.pull}`, links.commit === null ? "" : ` ${links.commit}`, users === null ? "" : ` Thanks ${users}!`].join("");
    return `\n\n-${prefix ? `${prefix} -` : ""} ${linkifyIssueRefs(firstLine, {
      serverUrl: GITHUB_SERVER_URL,
      repo: options.repo
    })}\n${futureLines.map(l => `  ${linkifyIssueRefs(l, {
      serverUrl: GITHUB_SERVER_URL,
      repo: options.repo
    })}`).join("\n")}`;
  }
};

exports["default"] = changelogFunctions;
