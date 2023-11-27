# Glean Development Guide

The [Glean](https://mozilla.github.io/glean/book/index.html) `metrics.yaml` file is the brain - it defines all the metrics we want to track and is used to build the necessary files and functions that we need to send events & corresponding data. I recommend reading through the [Metrics YAML Registry docs](https://mozilla.github.io/glean/book/reference/yaml/metrics.html) to get a good understanding of the different parts of the `metrics.yaml` file and what each piece of info is used for.

## Updating the `metrics.yaml` file

Currently, in an effort to keep our metrics as consistent as possible across clients, we are referencing a shared [`metrics.yaml`](https://gist.github.com/kirill-demtchouk/41a38336b61b938833fe011bda4a2001) file. Kirill owns this file and it acts as the source of truth for what metrics we are tracking for Mozilla Social.

This shared [`metrics.yaml`](https://gist.github.com/kirill-demtchouk/41a38336b61b938833fe011bda4a2001) file is intended to be used by all the client teams - web, android & iOS. However, since there are some things in the `metrics.yaml` file that aren't applicable to web and other things that web needs that the other clients don't, there are some deviations to keep in mind. Keeping the `metrics.yaml` file up to date and with the correct client-specific info is a manual process currently. We need to figure out a better solution for this long-term but for the sake of getting everyone up to speed on where we are currently, I wanted to throw something together quickly.

When this file has been updated, Kirill will notify us and we need to make changes to update it. Here's my current process:

1. Copy the raw JSON of Kirill's `metrics.yaml` [gist](https://gist.github.com/kirill-demtchouk/41a38336b61b938833fe011bda4a2001)
2. Paste that raw JSON in the [`metrics.yaml`](./metrics.yaml) file here in elk, replacing everything that was there before
3. Check git diff to make sure I understand what is changing between the previous version and this one
4. Remove the extra things in the shared [`metrics.yaml`](https://gist.github.com/kirill-demtchouk/41a38336b61b938833fe011bda4a2001) file that aren't specific to web
    - [Remove unneeded metrics](#remove-metrics-not-needed-for-web)
5. Run the `build:glean` script
6. Delete any old generated files (if needed)
    - If a category gets removed from the `metrics.yaml` file, glean does not automatically remove the old corresponding generated file, so we need to do that manually

### Remove metrics not needed for web

1. In the `identifiers` category:
    - remove `adjust_device_id` - mobile specific

2. Remove `baseline` everywhere it exists

3. Remove the `backend` category
    - the whole thing, including the `object_updated` metric

## The Spreadsheet™️

The data team has requested that we keep [this spreadsheet](https://docs.google.com/spreadsheets/d/1KX6TiyXXg2fE0a1IDKsy5O97ZrHYvjKohmIX_m8ECXY/edit#gid=1532914466) up to date as we add engagement events. It's very similar to what we were doing in Pocket - tracking the event name and all its corresponding additional metadata.
