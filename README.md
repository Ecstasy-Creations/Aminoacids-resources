# Student Resource Index

A lightweight static website for compiling student resources. It is designed for GitHub plus Cloudflare Pages, but it can also be opened directly in a browser.

The visual direction mixes a clear public-service resource layout with an archival pixel-index feel: structured, readable, a little zine-like, and easy to update. Cofolios influenced the curated-directory layer: simple navigation, direct headline, and browseable collections.

## Files

- `index.html` controls the page structure.
- `styles.css` controls the visual design and responsive layout.
- `resources.js` is the easiest place to add, remove, or edit resources.
- `quotes.js` controls the funny quote panels and optional person images.
- `script.js` powers search, filtering, and resource card rendering.

## Add A Resource

Open `resources.js` and add a new item inside the `resources` list:

```js
{
  title: "Resource name",
  category: "Study Tools",
  description: "One clear sentence explaining why this helps students.",
  url: "https://example.com/",
  tag: "Guide"
}
```

Use one of the existing categories for now:

- `Financial Aid`
- `Study Tools`
- `Career`
- `Wellbeing`

## Deploy

For Cloudflare Pages, connect the GitHub repository and use these settings:

- Framework preset: `None`
- Build command: leave blank
- Output directory: `/`

Every time the GitHub repo is updated, Cloudflare Pages can publish the new version.

## Edit Quotes

Open `quotes.js` and edit the text, person, or image URL:

```js
{
  text: "A due date is just a jump scare with a calendar invite.",
  person: "deadline survivor",
  avatar: "images/person.jpg",
  position: "collections-left"
}
```

Leave `avatar` blank to use the built-in drawn face. Add image files to the project folder and reference them with paths like `images/person.jpg`.
