<span class="bigTitle">CSS for Cats</span>
## A gentle introduction to styling for beginner programmers <span class="right">![cat](images/yarn.svg)</span>
### *Because a page in Times New Roman on a white background is no way to live*

CSS stands for **Cascading Style Sheets**. If HTML is the skeleton of a page (go read [HTML for Cats](https://github.com/lucanenni/html-for-cats) first if you haven't), CSS is the fur, the color, the general vibe. It's what takes a plain list of headings and paragraphs and makes it look like an actual designed thing instead of a legal document. Colors, fonts, spacing, layout, even little animations &mdash; all CSS.

Every browser understands CSS the same way it understands HTML, which means you can take one page and give it a completely different personality just by swapping which CSS is attached to it &mdash; same skeleton, different fur. This page will teach you enough CSS to stop being afraid of it*.

\* *Real time: more than zero. You will absolutely spend fifteen of those minutes getting a shade of orange exactly right. This is normal and everyone does it.*

CSS for Cats is released under the [CC0](https://creativecommons.org/publicdomain/zero/1.0/) license &mdash; do whatever you want with it.

*This is an unofficial, original tutorial written in the style of [JavaScript for Cats](https://github.com/max-mapper/javascript-for-cats) by [@maxogden](http://twitter.com/maxogden), and a companion to [HTML for Cats](https://github.com/lucanenni/html-for-cats). Not a translation, not official &mdash; just more tribute.*

## Table of Contents

- [Don't be a scaredy cat](#scaredy-cat)
- [Attaching styles to a page](#attaching)
- [Selectors](#selectors)
- [Properties and values](#properties)
- [Classes and IDs](#classes-ids)
- [The cascade](#cascade)
- [Colors](#colors)
- [The box model](#box-model)
- [Text and fonts](#text)
- [Display](#display)
- [Flexbox, briefly](#flexbox)
- [Pseudo-classes](#pseudo-classes)
- [Responsive design](#responsive)
- [Recommended reading](#recommended-reading)

## <a id="scaredy-cat" href="#scaredy-cat">#</a> Don't be a scaredy cat

Same deal as always: nothing you do here can break anything permanently. Worst case a box turns an ugly shade of green, or your text ends up sideways, or everything overlaps into a pile like a basket of kittens. Refresh the page and it's gone. CSS mistakes are the safest mistakes in all of programming &mdash; embrace them, they're how you learn where the edges of the box actually are.

## <a id="attaching" href="#attaching">#</a> Attaching styles to a page

There are three ways to attach CSS to HTML, and you'll see all three in the wild, though one is clearly the best for anything beyond a quick experiment.

**Inline**, directly on an element, using the `style` attribute. Fast, but messy, and it only affects that one element:

```html
<p style="color: orange;">This paragraph is orange, and only this one.</p>
```

**Internal**, in a `<style>` tag inside your page's `<head>`. Affects the whole page, no separate file needed:

```html
<head>
  <style>
    p {
      color: orange;
    }
  </style>
</head>
```

**External**, in a separate `.css` file, linked from the `<head>` with a `<link>` tag. This is the one you want for anything real, because it keeps your styling separate from your structure, and one stylesheet can style *many* pages at once:

```html
<head>
  <link rel="stylesheet" href="style.css">
</head>
```

```css
/* style.css */
p {
  color: orange;
}
```

From here on, assume everything lives in an external stylesheet.

## <a id="selectors" href="#selectors">#</a> Selectors

A CSS rule has two parts: a **selector**, which says *which elements* this rule applies to, and a block of **declarations** in curly braces, which says *what to do* to them. The simplest selector is just a tag name:

```css
p {
  color: orange;
}
```

This says: "every `<p>` on the page, make the text orange." That's it. That's the whole idea of CSS, endlessly repeated with fancier selectors and fancier declarations: *select some stuff, then describe it.*

## <a id="properties" href="#properties">#</a> Properties and values

Inside the curly braces, each line is a **property** (what aspect you're changing) followed by a colon, then a **value** (what you're changing it to), and ending in a semicolon:

```css
p {
  color: orange;
  font-size: 20px;
  text-align: center;
}
```

There are hundreds of properties. You will not memorize them all, and you don't need to &mdash; not even professional cats have them memorized. You'll build up a small working vocabulary (`color`, `font-size`, `margin`, `padding`, `background`...) and look the rest up when you need them, the same way you know the sound of exactly one specific treat bag out of a whole cupboard of groceries.

## <a id="classes-ids" href="#classes-ids">#</a> Classes and IDs

Selecting *every* `<p>` on a page is often too broad. To target something more specific, HTML elements can carry a `class` or `id` attribute, and CSS can select by those instead of by tag name.

```html
<p class="warning">Do not approach the cucumber.</p>
<p id="main-headline">Local Cat Discovers Sunbeam</p>
```

```css
.warning {
  color: red;
  font-weight: bold;
}

#main-headline {
  font-size: 32px;
}
```

Note the punctuation: a `.` in front for classes, a `#` in front for IDs. The difference between them: a **class** can be reused on as many elements as you like (great for "every element that needs this particular treatment"), while an **id** should appear exactly once per page (it's a unique name for one specific element, like a microchip).

```html
<p class="warning">Do not approach the cucumber.</p>
<p class="warning">Seriously. Do not.</p>
```

Both paragraphs above get the `.warning` styling, because classes are meant to be shared.

## <a id="cascade" href="#cascade">#</a> The cascade

The "C" in CSS is for **Cascading**, which is a fancy way of describing what happens when more than one rule tries to style the same element. Rules further down a stylesheet generally win over rules further up, *but* more specific selectors generally win over less specific ones, regardless of order. An ID beats a class, a class beats a tag name:

```css
p { color: black; }
.warning { color: red; }
#main-headline { color: blue; }
```

A paragraph with `class="warning"` turns red, not black, even though `p { color: black; }` also applies &mdash; the class is more specific, so it wins. It's a bit like a household with a cat-feeding schedule taped to the fridge (the tag rule, "everyone gets the same food") and a vet's note taped over it in red pen (the class or ID rule, "*this* one cat needs the special food") &mdash; the more specific instruction wins, and everybody just knows that, somehow, without anyone fully explaining it.

This is, genuinely, the part of CSS that trips people up the most. When a style "isn't working," 90% of the time it's because something *more specific* elsewhere is quietly overruling it. Open the Inspector (same one from HTML for Cats) and click the element &mdash; it'll show you exactly which rules are competing and which one won.

## <a id="colors" href="#colors">#</a> Colors

Colors in CSS show up in a few different formats, and you'll see all of them:

```css
p {
  color: orange;               /* a named color */
  color: #ffa500;              /* hex code */
  color: rgb(255, 165, 0);     /* red, green, blue */
  color: rgba(255, 165, 0, 0.5); /* same, plus transparency (0 = invisible, 1 = solid) */
}
```

There aren't many named colors worth memorizing beyond the obvious ones (`red`, `black`, `white`, `orange`...) &mdash; for anything more specific, like the exact orange of your particular cat, you'll want a hex code or `rgb()` value, usually picked with a color picker tool rather than guessed.

`color` sets *text* color specifically. For the background of an element, there's a different property:

```css
.favorite-box {
  background-color: #d2b48c; /* cardboard */
}
```

## <a id="box-model" href="#box-model">#</a> The box model

Here's the single most important idea in all of CSS: **every element on a page is a box.** A paragraph is a box. A heading is a box. An image is a box. Even a single word wrapped in a `<span>` is a box. Cats, as it happens, already understand this instinctively &mdash; you've never once seen a cat confused about whether it fits in a container.

Every box is made of four layers, from the inside out:

```
+--------------------------------------+
|               margin                 |
|  +---------------------------------+ |
|  |            border               | |
|  |  +----------------------------+ | |
|  |  |          padding           | | |
|  |  |  +----------------------+  | | |
|  |  |  |       content        |  | | |
|  |  |  +----------------------+  | | |
|  |  +----------------------------+ | |
|  +---------------------------------+ |
+--------------------------------------+
```

- **content** is the actual text or image.
- **padding** is space *inside* the box, between the content and its border &mdash; think of it as the soft blanket lining a carrier.
- **border** is a visible (or invisible) line around the padding &mdash; the carrier itself.
- **margin** is space *outside* the box, pushing other boxes away &mdash; the amount of personal space the carrier demands from the boxes next to it.

```css
.favorite-box {
  padding: 20px;
  border: 2px solid brown;
  margin: 10px;
}
```

Each of those four sides can also be set individually &mdash; `margin-top`, `padding-left`, and so on &mdash; when you don't want all four sides to match.

## <a id="text" href="#text">#</a> Text and fonts

A handful of properties cover most of what you'll want to do with text:

```css
h1 {
  font-family: "Helvetica", "Arial", sans-serif;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;
}
```

- `font-family` is a *list* of fonts in order of preference &mdash; the browser uses the first one it actually has installed, falling back down the list. Always end the list with a generic family like `sans-serif` or `serif`, as a safety net.
- `font-size` and `font-weight` (how bold) are self-explanatory.
- `text-align` moves text left, right, or center within its box.
- `line-height` controls the space between lines of text &mdash; a little breathing room, the way a cat prefers a bit of space between itself and the edge of the box (right up until it doesn't, and folds itself in half to fit anyway).

## <a id="display" href="#display">#</a> Display

Every box has a `display` type, which controls how it behaves next to other boxes. The two you'll meet constantly:

- **block** elements (like `<div>`, `<p>`, `<h1>`) always start on a new line and take up the full width available, stacking on top of each other like boxes in a moving truck.
- **inline** elements (like `<span>`, `<a>`) sit *within* a line of text, flowing alongside other content, taking up only as much width as they need.

```css
span {
  display: block; /* now it behaves like a div, stacking on its own line */
}
```

You can override an element's default display type any time, which is a handy escape hatch when the default behavior isn't what you need.

## <a id="flexbox" href="#flexbox">#</a> Flexbox, briefly

For arranging several boxes *next to* each other, in a row or column, with even spacing, modern CSS gives you **flexbox**. Put `display: flex` on a container, and its direct children line up automatically:

```css
.cat-shelf {
  display: flex;
  justify-content: space-between; /* spread children out evenly */
  align-items: center;            /* center them vertically */
}
```

```html
<div class="cat-shelf">
  <div>Bill</div>
  <div>Tabby</div>
  <div>Ceiling Cat</div>
</div>
```

The three cats above now sit in a tidy row, evenly spaced, instead of stacking on top of one another like the block elements they'd otherwise be. Flexbox is a whole topic on its own &mdash; this is just enough to know it exists and what problem it solves. [Flexbox Froggy](https://flexboxfroggy.com/) is a genuinely excellent (and free) game for actually learning it.

## <a id="pseudo-classes" href="#pseudo-classes">#</a> Pseudo-classes

A **pseudo-class** styles an element based on a *state* it's in, rather than what it is or what class it has. The most common one is `:hover`, which applies while a mouse is pointing at something:

```css
a:hover {
  color: red;
  text-decoration: underline;
}
```

Now every link turns red while your cursor sits on top of it, and goes back to normal the moment it leaves &mdash; no JavaScript required, the browser handles the "is the mouse there right now?" bookkeeping entirely on its own. Other common ones include `:first-child` (the first element among its siblings) and `:focus` (an input currently selected for typing).

## <a id="responsive" href="#responsive">#</a> Responsive design

Not every screen is the same size &mdash; a page needs to look reasonable on a giant monitor *and* on a phone held sideways by a human whose other hand is occupied holding a cat. **Media queries** let a stylesheet apply certain rules only under certain conditions, most commonly screen width:

```css
.cat-shelf {
  display: flex;
}

@media (max-width: 600px) {
  .cat-shelf {
    display: block; /* stack vertically on narrow screens instead */
  }
}
```

The rules inside `@media (max-width: 600px) { ... }` only apply when the browser window is 600 pixels wide or less. This is the entire foundation of "responsive design" &mdash; write your normal styles first, then add narrow overrides for small screens.

## The End!

That's enough CSS to stop a page from looking like a government form. There's a lot more out there &mdash; animations, grid layout, custom properties, transforms &mdash; but you now have the actual foundation everything else is built on: selectors pick things, declarations describe them, and specificity decides who wins when two rules disagree.

Got a topic you wish this covered? Open an issue [on GitHub](https://github.com/lucanenni/css-for-cats/issues).

### <a id="recommended-reading" href="#recommended-reading">#</a> Recommended reading

- The [MDN CSS guide](https://developer.mozilla.org/en-US/docs/Web/CSS) is the best reference for every property and value that exists.
- [Flexbox Froggy](https://flexboxfroggy.com/) and [Grid Garden](https://cssgridgarden.com/) turn layout practice into actual games.
- [CSS-Tricks](https://css-tricks.com/) has excellent guides on almost every CSS topic, including [the classic Flexbox guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).
- [HTML for Cats](https://github.com/lucanenni/html-for-cats), if you haven't already, for the skeleton this fur goes on.
- [JavaScript for Cats](https://github.com/max-mapper/javascript-for-cats) by [@maxogden](http://twitter.com/maxogden), for when you want your boxes to actually *do* something.

<hr>

*CSS for Cats is an independent fan project, written for [@maxogden](http://twitter.com/maxogden)'s [JavaScript for Cats](https://github.com/max-mapper/javascript-for-cats) universe, with love and no official affiliation. Contributions and corrections are welcome on [GitHub](https://github.com/lucanenni/css-for-cats).*

*Maintenance note (2026-08-14): build dependencies (`marked`, `mustache`) updated to fix known high-severity security advisories (a ReDoS in `marked`, an XSS in `mustache`); `render.js` adjusted for the new `marked` API. Also replaced the abandoned, already-broken `gh-pages-deploy` tool with the actively maintained `gh-pages` package for `npm run deploy`. Deploys are now automatic: a GitHub Action rebuilds and republishes the site on every push to `main`. No tutorial content changed.*
