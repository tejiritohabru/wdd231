# StyleHub — WDD 231 Individual Website Project

## Pages
- `index.html` — home page
- `gallery.html` — fetches fashion items from `data/fashion.json`, renders a responsive gallery, filters/sorts, favorites, and accessible details dialog
- `contact.html` — design submission form
- `form-action.html` — displays submitted values with `URLSearchParams` (additional form-action page)
- `attributions.html` — source credits

## Run the website
1. Put the `stylehub-project` folder inside your existing `wdd231` repository.
2. Open the folder in Visual Studio Code.
3. Use the Live Server extension to open `index.html`. The Fetch API may not work if you open files directly with a `file://` URL.
4. Test the mobile navigation, gallery filters, details modal, favorites, and form submission.

## Before submitting
- Replace the demonstration-video placeholder link in every footer with your public 3–5 minute video URL.
- Update the author name if your course account requires a different name.
- Update `og:url` in `index.html` to your actual GitHub Pages URL.
- Run the WDD audit and Lighthouse mobile tests on all three main pages; fix any issues found. Scores cannot be guaranteed without testing on your published URL and browser.
- Verify your course's required folder naming and ensure the Week 1 “Final” link points to this project.

## JavaScript requirements included
- Fetch API with `async/await`, `try...catch`, HTTP response checking, and JSON parsing
- 18 generated gallery entries with multiple properties
- `map`, `filter`, `find`, `forEach`, and `sort`
- Template literals and DOM event listeners
- ES modules (`main.js`, `gallery.js`, `form-action.js`, `utils.js`)
- Local storage for favorites and gallery preferences
- Accessible `<dialog>` modal
- URL Search Params on the form-action page
