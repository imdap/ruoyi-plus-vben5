'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fetch = require('node-fetch');
var DataLoader = require('dataloader');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var fetch__default = /*#__PURE__*/_interopDefault(fetch);
var DataLoader__default = /*#__PURE__*/_interopDefault(DataLoader);

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

function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}

function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}

const _excluded = ["repo"],
  _excluded2 = ["repo"];
function readEnv() {
  const GITHUB_GRAPHQL_URL = process.env.GITHUB_GRAPHQL_URL || "https://api.github.com/graphql";
  const GITHUB_SERVER_URL = process.env.GITHUB_SERVER_URL || "https://github.com";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  return {
    GITHUB_GRAPHQL_URL,
    GITHUB_SERVER_URL,
    GITHUB_TOKEN
  };
}
const validRepoNameRegex = /^[\w.-]+\/[\w.-]+$/;
function makeQuery(repos) {
  return `
      query {
        ${Object.keys(repos).map((repo, i) => `a${i}: repository(
            owner: ${JSON.stringify(repo.split("/")[0])}
            name: ${JSON.stringify(repo.split("/")[1])}
          ) {
            ${repos[repo].map(data => data.kind === "commit" ? `a${data.commit}: object(expression: ${JSON.stringify(data.commit)}) {
            ... on Commit {
            commitUrl
            associatedPullRequests(first: 50) {
              nodes {
                number
                url
                mergedAt
                author {
                  login
                  url
                }
              }
            }
            author {
              user {
                login
                url
              }
            }
          }}` : `pr__${data.pull}: pullRequest(number: ${data.pull}) {
                    url
                    author {
                      login
                      url
                    }
                    mergeCommit {
                      commitUrl
                      abbreviatedOid
                    }
                  }`).join("\n")}
          }`).join("\n")}
        }
    `;
}

// why are we using dataloader?
// it provides use with two things
// 1. caching
// since getInfo will be called inside of changeset's getReleaseLine
// and there could be a lot of release lines for a single commit
// caching is important so we don't do a bunch of requests for the same commit
// 2. batching
// getReleaseLine will be called a large number of times but it'll be called at the same time
// so instead of doing a bunch of network requests, we can do a single one.
const GHDataLoader = new DataLoader__default["default"](async requests => {
  const {
    GITHUB_GRAPHQL_URL,
    GITHUB_SERVER_URL,
    GITHUB_TOKEN
  } = readEnv();
  if (!GITHUB_TOKEN) {
    throw new Error(`Please create a GitHub personal access token at ${GITHUB_SERVER_URL}/settings/tokens/new?scopes=read:user,repo:status&description=changesets-${new Date().toISOString().substring(0, 10)} with \`read:user\` and \`repo:status\` permissions and add it as the GITHUB_TOKEN environment variable`);
  }
  let repos = {};
  requests.forEach(_ref => {
    let {
        repo
      } = _ref,
      data = _objectWithoutProperties(_ref, _excluded);
    if (repos[repo] === undefined) {
      repos[repo] = [];
    }
    repos[repo].push(data);
  });
  let fetchResponse;
  try {
    fetchResponse = await fetch__default["default"](GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `Token ${GITHUB_TOKEN}`
      },
      body: JSON.stringify({
        query: makeQuery(repos)
      })
    });
  } catch (e) {
    throw new Error(`An error occurred when fetching data from GitHub\n${e.message}`);
  }
  let data;
  try {
    data = await fetchResponse.json();
  } catch (e) {
    throw new Error(`Failed to parse data from GitHub\n${e.message}`);
  }
  if (data.errors) {
    throw new Error(`Fetched data from GitHub returned errors\n${JSON.stringify(data.errors, null, 2)}`);
  }

  // this is mainly for the case where there's an authentication problem
  if (!data.data) {
    throw new Error(`Fetched data from GitHub has missing data\n${JSON.stringify(data)}`);
  }
  let cleanedData = {};
  Object.keys(repos).forEach((repo, index) => {
    let output = {
      commit: {},
      pull: {}
    };
    cleanedData[repo] = output;
    Object.entries(data.data[`a${index}`]).forEach(([field, value]) => {
      // this is "a" because that's how it was when it was first written, "a" means it's a commit not a pr
      // we could change it to commit__ but then we have to get new GraphQL results from the GH API to put in the tests
      if (field[0] === "a") {
        output.commit[field.substring(1)] = value;
      } else {
        output.pull[field.replace("pr__", "")] = value;
      }
    });
  });
  return requests.map(_ref2 => {
    let {
        repo
      } = _ref2,
      data = _objectWithoutProperties(_ref2, _excluded2);
    return cleanedData[repo][data.kind][data.kind === "pull" ? data.pull : data.commit];
  });
});
async function getInfo(request) {
  if (!request.commit) {
    throw new Error("Please pass a commit SHA to getInfo");
  }
  if (!request.repo) {
    throw new Error("Please pass a GitHub repository in the form of userOrOrg/repoName to getInfo");
  }
  if (!validRepoNameRegex.test(request.repo)) {
    throw new Error(`Please pass a valid GitHub repository in the form of userOrOrg/repoName to getInfo (it has to match the "${validRepoNameRegex.source}" pattern)`);
  }
  const data = await GHDataLoader.load(_objectSpread2({
    kind: "commit"
  }, request));
  let user = null;
  if (data.author && data.author.user) {
    user = data.author.user;
  }
  let associatedPullRequest = data.associatedPullRequests && data.associatedPullRequests.nodes && data.associatedPullRequests.nodes.length ? data.associatedPullRequests.nodes.sort((a, b) => {
    if (a.mergedAt === null && b.mergedAt === null) {
      return 0;
    }
    if (a.mergedAt === null) {
      return 1;
    }
    if (b.mergedAt === null) {
      return -1;
    }
    a = new Date(a.mergedAt);
    b = new Date(b.mergedAt);
    return a > b ? 1 : a < b ? -1 : 0;
  })[0] : null;
  if (associatedPullRequest) {
    user = associatedPullRequest.author;
  }
  return {
    user: user ? user.login : null,
    pull: associatedPullRequest ? associatedPullRequest.number : null,
    links: {
      commit: `[\`${request.commit.slice(0, 7)}\`](${data.commitUrl})`,
      pull: associatedPullRequest ? `[#${associatedPullRequest.number}](${associatedPullRequest.url})` : null,
      user: user ? `[@${user.login}](${user.url})` : null
    }
  };
}
async function getInfoFromPullRequest(request) {
  if (request.pull === undefined) {
    throw new Error("Please pass a pull request number");
  }
  if (!request.repo) {
    throw new Error("Please pass a GitHub repository in the form of userOrOrg/repoName to getInfo");
  }
  if (!validRepoNameRegex.test(request.repo)) {
    throw new Error(`Please pass a valid GitHub repository in the form of userOrOrg/repoName to getInfo (it has to match the "${validRepoNameRegex.source}" pattern)`);
  }
  const data = await GHDataLoader.load(_objectSpread2({
    kind: "pull"
  }, request));
  let user = data === null || data === void 0 ? void 0 : data.author;
  let commit = data === null || data === void 0 ? void 0 : data.mergeCommit;
  return {
    user: user ? user.login : null,
    commit: commit ? commit.abbreviatedOid : null,
    links: {
      commit: commit ? `[\`${commit.abbreviatedOid.slice(0, 7)}\`](${commit.commitUrl})` : null,
      pull: `[#${request.pull}](${data.url})`,
      user: user ? `[@${user.login}](${user.url})` : null
    }
  };
}

exports.getInfo = getInfo;
exports.getInfoFromPullRequest = getInfoFromPullRequest;
