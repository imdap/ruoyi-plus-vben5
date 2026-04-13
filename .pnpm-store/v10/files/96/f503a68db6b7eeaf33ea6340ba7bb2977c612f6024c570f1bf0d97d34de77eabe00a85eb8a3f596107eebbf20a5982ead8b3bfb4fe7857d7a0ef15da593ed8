# CSpell C/C++ Dictionary

C/C++ Dictionary for cspell.

This is a pre-built dictionary for use with cspell.

<!--- @@inject: ../../static/requirements.md --->

## Requirements

| Tool                                                                                                                                 | Version |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| [cspell](https://github.com/streetsidesoftware/cspell)                                                                               | `>= 8`  |
| [Code Spell Checker - Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) | `>= 4`  |

<!--- @@inject-end: ../../static/requirements.md --->

<!--- @@inject: ./static/install.md --->

## Local Installation

**This package is bundled with CSpell.**

## Configuration

<details>
<summary>VSCode Settings</summary>

Add the following to your VSCode settings:

**`.vscode/settings.json`**

```jsonc
{
  "cSpell.dictionaries": ["cpp-legacy", "cpp", "cpp-compound-words", "cpp-refined"],
}
```

</details>

<details>
<summary>CSpell Settings <code>cspell.json</code></summary>

**`cspell.json`**

```jsonc
{
  "dictionaries": ["cpp-legacy", "cpp", "cpp-compound-words", "cpp-refined"],
}
```

</details>

<details>
<summary>CSpell Settings <code>cspell.config.yaml</code></summary>

**`cspell.config.yaml`**

```yaml
dictionaries:
  - cpp-legacy
  - cpp
  - cpp-compound-words
  - cpp-refined
```

</details>

## Local Installation using CDN

> **NOTE:** This package is bundled with CSpell.

## Dictionary Information

| Name                 | Enabled | Description                                                  |
| -------------------- | ------- | ------------------------------------------------------------ |
| `cpp-legacy`         |         | Legacy C/C++ Keywords and common library functions.          |
| `cpp`                |         | C/C++ Keywords and common library functions.                 |
| `cpp-compound-words` |         | C/C++ Common word compounds.                                 |
| `cpp-refined`        |         | Refined list of C/C++ Keywords and common library functions. |

## Language Settings

| Name                 | Locale | File Type  |
| -------------------- | ------ | ---------- |
| `cpp-legacy`         | `*`    | `c`, `cpp` |
| `cpp`                | `*`    | `c`, `cpp` |
| `cpp-compound-words` | `*`    | `c`, `cpp` |
| `cpp-refined`        | `*`    | `c`, `cpp` |

<!--- @@inject-end: ./static/install.md --->

## C/C++ Compound Words

It is very common for C/C++ code to contain word compound like `errorcode` and `hashcode`.
The `cpp-compound-words` dictionary is designed to help avoid false positives. But, this can
mean that valid errors are hidden due to the way compounds are combined.

The following configuration can be used to disable the compound dictionary:

```yaml
languageSettings:
  languageId: 'c,cpp' # '*' can be used to disable it for all file types.
  dictionaries:
    - '!cpp-compound-words'
```

<!--- @@inject: ../../static/contributing.md --->

## Contributing

Please help correct any mistakes in the dictionaries.

See: [Contributing](https://github.com/streetsidesoftware/cspell-dicts#contributing)

Special thanks to all of our amazing contributors!

### Dictionary Development

See: [How to Create a New Dictionary](https://github.com/streetsidesoftware/cspell-dicts#how-to-create-a-new-dictionary)

<!--- @@inject-end: ../../static/contributing.md --->

## License

MIT

> Some packages may have other licenses included.

<!--- @@inject: ../../static/footer.md --->

<br/>

---

<p align="center">
Brought to you by <a href="https://streetsidesoftware.com" title="Street Side Software">
<img width="16" alt="Street Side Software Logo" src="https://i.imgur.com/CyduuVY.png" /> Street Side Software
</a>
</p>

<!--- @@inject-end: ../../static/footer.md --->
