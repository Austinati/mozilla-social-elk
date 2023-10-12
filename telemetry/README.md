# Glean Development Guide

*This is a work in progress!*

## Updating the `metrics.yaml` file

The [Glean](https://mozilla.github.io/glean/book/index.html) `metrics.yaml` file is the brain - it defines all the metrics we want to track and is used to build the necessary files and functions that we need to send events & corresponding data. I recommend reading through the [Metrics YAML Registry docs](https://mozilla.github.io/glean/book/reference/yaml/metrics.html) to get a good understanding of the different parts of the `metrics.yaml` file and what each piece of info is used for.

Currently, in an effort to keep our metrics as consistent as possible across clients, we are referencing a shared [`metrics.yaml`](https://gist.github.com/kirill-demtchouk/41a38336b61b938833fe011bda4a2001) file. Kirill owns this file and it acts as the source of truth for what metrics we are tracking for Mozilla Social.

This shared [`metrics.yaml`](https://gist.github.com/kirill-demtchouk/41a38336b61b938833fe011bda4a2001) file is intended to be used by all the client teams - web, android & iOS. However, since there are some things in the `metrics.yaml` file that aren't applicable to web and other things that web needs that the other clients don't, there are some deviations to keep in mind. Keeping the `metrics.yaml` file up to date and with the correct client-specific info is a manual process currently. We need to figure out a better solution for this long-term but for the sake of getting everyone up to speed on where we are currently, I wanted to throw something together quickly.

When this file has been updated, Kirill will notify us and we need to make changes to update it. Here's my current process:

1. Copy the raw JSON of Kirill's `metrics.yaml` [gist](https://gist.github.com/kirill-demtchouk/41a38336b61b938833fe011bda4a2001)
2. Paste that raw JSON in the [`metrics.yaml`](./metrics.yaml) file here in elk, replacing everything that was there before
3. Check git diff to make sure I understand what is changing between the previous version and this one
4. Add back the things that the shared [`metrics.yaml`](https://gist.github.com/kirill-demtchouk/41a38336b61b938833fe011bda4a2001) file removes
    - [Add lifetime parameter back](#add-lifetime-parameter-back-to-metrics-that-arent-events)
    - [Add `no_lint` for baseline pings](#add-no_lint-for-baseline-pings)
5. Remove the extra things in the shared [`metrics.yaml`](https://gist.github.com/kirill-demtchouk/41a38336b61b938833fe011bda4a2001) file that aren't specific to web
    - [Remove uneeded metrics](#remove-metrics-not-needed-for-web)
6. Now that we've added back all the things that we need for web and removed the extraneous details that we don't need, we need to make sure that all the new additions and removals that we are trying to incorporate from the shared [`metrics.yaml`](<https://gist.github.com/kirill-demtchouk/41a38336b61b938833fe011bda4a2001>) file are included here in elk's [`metric.yaml`](./metrics.yaml) file
7. Run the `build:glean` script
8. Delete any old generated files (if needed)
  8a. If a category gets removed from the `metrics.yaml` file, glean does not automatically remove the old corresponding generated file, so we need to do that manually

## Web-specific `metrics.yaml` file information

### Remove metrics not needed for web

1. In the `identifiers` category:
    - remove `fxa_account_id` - the elk client doesn't get the FxA ID back during auth, only a token so we will never have this
    - remove `adjust_device_id` - mobile specific

2. Remove the `backend` category
    - the whole thing, including the `object_updated` metric

### Add lifetime parameter back to metrics that aren't events

For the events with a type other than `event`, we need to include the `lifetime: application` parameter to make it so that these metrics show up with every ping.

For example:

``` yaml
mastodon_account_id:
  type: string
  lifetime: application # lifetime added back here
  ...
```

Note: Aly & Daniel are to sync up on this and try to figure out if there's a different way to accomplish this without using `lifetime: application`. But for now, make sure these are added back when updating the `metrics.yaml` file.

### Add `no_lint` for baseline pings

Some of the metrics in the shared [`metrics.yaml`](https://gist.github.com/kirill-demtchouk/41a38336b61b938833fe011bda4a2001) file include `baseline` in the `send_in_pings` parameter. If we keep this, the `build:glean` script will fail to build. Rather than removing it, we have opted for adding a `no_lint` declaration instead.

For every metric that includes `baseline` in the `send_in_pings`, update it to be this instead:

``` yaml
send_in_pings:
  - events
no_lint:
  - baseline # baseline removed from `send_in_pings, added `no_lint`
```


## The Spreadsheet™️

The data team has requested that we keep [this spreadsheet](https://docs.google.com/spreadsheets/d/1KX6TiyXXg2fE0a1IDKsy5O97ZrHYvjKohmIX_m8ECXY/edit#gid=1532914466) up to date as we add engagement events. It's very similar to what we were doing in pocket - tracking the engagement event name and all its corresponding additional details.
